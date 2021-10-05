import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CFDI, Comprobante, Concepts, Emisor, Impuestos, Receptor, Relacionado, XmlReceptorAttribute } from '@signati/core';
import { BranchOffice } from '../system/branch-office/entities/branch-office.entity';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../common/databases/colegiodb.service';
import { mulQuantity } from '../common/point-of-sale/point-of-sale';
import { BranchOfficeSetting } from '../system/branch-office-setting/entities/branch-office-setting.entity';
import { CreditNoteAcademy } from './entities/credit-note-academy.entity';

export interface ConceptWithTaxes {
    ClaveProdServ: string;
    NoIdentificacion: string;
    Cantidad: number | string;
    ClaveUnidad: string;
    Unidad: string;
    Descripcion: string;
    ValorUnitario: number | string;
    Importe: number | string;
    Descuento: number | string;
    impuestosTransladados?: {
        Base?: string;
        Impuesto: string;
        TipoFactor: string;
        TasaOCuota: string;
        Importe: string;
    },
    impuestosRetenidos?: {
        Base?: string;
        Impuesto: string;
        TipoFactor: string;
        TasaOCuota: string;
        Importe: string;
    },
}

@Injectable()
export class CreditNoteAcademyService extends TypeOrmCrudService<CreditNoteAcademy> {
    constructor(
        @InjectRepository(CreditNoteAcademy, ColegioDBNameConnection) readonly repo: Repository<CreditNoteAcademy>,
        @InjectRepository(BranchOfficeSetting, ColegioDBNameConnection) readonly branchOfficeSettingRepository: Repository<BranchOfficeSetting>,
    ) {
        super(repo);
    }

    async getFolio() {
        const folio = await this.repo.createQueryBuilder('creditNote').select('MAX(creditNote.id)', 'folio').getRawOne();
        console.log(folio);
        return 1;
    }
    async createCreditNote(
        invoice: Partial<Comprobante>,
        receiver: Partial<XmlReceptorAttribute>,
        concepts: ConceptWithTaxes[],
        cfdiRelations: string[],
        branchOfficeId: string | number,
        branchOfficeModuleId: string | number,
        workPath: string,
    ) {
        try {
            const settingsBranchOffice = await this.branchOfficeSettingRepository.createQueryBuilder('setting').leftJoin('setting.invoiceCampus', 'branchOffice').where('branchOffice.id = :branchOfficeId', { branchOfficeId: branchOfficeId }).andWhere('setting.id = :settingsId', { settingsId: branchOfficeModuleId }).getOne();
            const cerSAT = `${workPath}CSD/` + settingsBranchOffice.cerCSD;
            const keySAT = `${workPath}CSD/` + settingsBranchOffice.keyCSD;
            let totalImpuestosTrasladados = 0;
            let totalImpuestosRetenidos = 0;
            const cfdiAttributes: Comprobante = {
                Serie: invoice.Serie,
                Folio: invoice.Folio,
                Fecha: invoice.Fecha,
                Sello: '',
                FormaPago: invoice.FormaPago,
                NoCertificado: '',
                Certificado: '',
                SubTotal: invoice.SubTotal,
                Descuento: invoice.Descuento,
                Moneda: invoice.Moneda,
                Total: invoice.Total,
                TipoDeComprobante: invoice.TipoDeComprobante,
                MetodoPago: invoice.MetodoPago,
                LugarExpedicion: invoice.LugarExpedicion,
            }
            const cfdi = new CFDI(cfdiAttributes, {debug: true});
            await cfdi.setAttributesXml({ version: '1.0', encoding: 'utf-8' });
            const receptor = new Receptor({
                Nombre: receiver.Nombre,
                Rfc: receiver.Rfc,
                UsoCFDI: receiver.UsoCFDI,
            })
            const emisor = new Emisor({
                Rfc: settingsBranchOffice.rfc,
                Nombre: settingsBranchOffice.businessName,
                RegimenFiscal: settingsBranchOffice.regime,
            });
            await cfdi.emisor(emisor);
            await cfdi.receptor(receptor);
            concepts.map(async (concept) => {
                const concepto = new Concepts({
                    ClaveProdServ: concept.ClaveProdServ,
                    NoIdentificacion: concept.NoIdentificacion,
                    Cantidad: concept.Cantidad,
                    ClaveUnidad: concept.ClaveUnidad,
                    Descripcion: concept.Descripcion,
                    Descuento: concept.Descuento,
                    Importe: concept.Importe,
                    Unidad: concept.Unidad,
                    ValorUnitario: concept.ValorUnitario,
                });
                if (concept.impuestosTransladados) {
                    await concepto.traslado({
                        Importe: concept.impuestosTransladados.Importe,
                        Impuesto: concept.impuestosTransladados.Impuesto,
                        TasaOCuota: concept.impuestosTransladados.TasaOCuota,
                        TipoFactor: concept.impuestosTransladados.TipoFactor,
                        Base: concept.impuestosTransladados.Base,
                    });
                    totalImpuestosTrasladados += +concept.impuestosTransladados.Importe;
                }
                if (concept.impuestosRetenidos) {
                    await concepto.retencion({
                        Importe: concept.impuestosRetenidos.Importe,
                        Impuesto: concept.impuestosRetenidos.Impuesto,
                        TasaOCuota: concept.impuestosRetenidos.TasaOCuota,
                        TipoFactor: concept.impuestosRetenidos.TipoFactor,
                        Base: concept.impuestosRetenidos.Base,
                    });
                    totalImpuestosRetenidos += +concept.impuestosRetenidos.Importe;
                }
                await cfdi.concepto(concepto);
            })


            if (totalImpuestosTrasladados > 0) {
                const impuestosTransladados = new Impuestos({
                    TotalImpuestosTrasladados: totalImpuestosTrasladados > 0 ? totalImpuestosTrasladados.toString() : ''
                });
                console.log(totalImpuestosTrasladados)
                impuestosTransladados.traslados({
                    Base: totalImpuestosTrasladados.toString(),
                    Impuesto: '002',
                    TasaOCuota: 'Tasa',
                    TipoFactor: '0.16',
                    Importe: mulQuantity(totalImpuestosTrasladados, 0.16, -2).toString(),
                });
                await cfdi.impuesto(impuestosTransladados);
            }
            if (totalImpuestosRetenidos > 0) {
                const impuestosRetenidos = new Impuestos({
                    TotalImpuestosRetenidos: totalImpuestosRetenidos > 0 ? totalImpuestosRetenidos.toString() : '',
                    TotalImpuestosTrasladados: totalImpuestosTrasladados > 0 ? totalImpuestosTrasladados.toString() : ''
                });
                impuestosRetenidos.retenciones({
                    Base: totalImpuestosRetenidos.toString(),
                    Impuesto: '002',
                    TasaOCuota: 'Tasa',
                    TipoFactor: '0.16',
                    Importe: mulQuantity(totalImpuestosRetenidos, 0.16, -2).toString(),
                });
                await cfdi.impuesto(impuestosRetenidos);
            }
            if (totalImpuestosRetenidos > 0 && totalImpuestosTrasladados > 0) {
                const impuestosRetenidosTransladados = new Impuestos({
                    TotalImpuestosRetenidos: totalImpuestosRetenidos > 0 ? totalImpuestosRetenidos.toString() : '',
                    TotalImpuestosTrasladados: totalImpuestosTrasladados > 0 ? totalImpuestosTrasladados.toString() : ''
                });
                impuestosRetenidosTransladados.traslados({
                    Base: totalImpuestosTrasladados.toString(),
                    Impuesto: '002',
                    TasaOCuota: 'Tasa',
                    TipoFactor: '0.16',
                    Importe: mulQuantity(totalImpuestosTrasladados, 0.16, -2).toString(),
                });
                impuestosRetenidosTransladados.retenciones({
                    Base: totalImpuestosRetenidos.toString(),
                    Impuesto: '002',
                    TasaOCuota: 'Tasa',
                    TipoFactor: '0.16',
                    Importe: mulQuantity(totalImpuestosRetenidos, 0.16, -2).toString(),
                });
                console.log(totalImpuestosRetenidos, totalImpuestosTrasladados)
                await cfdi.impuesto(impuestosRetenidosTransladados);
            }
            const relation = new Relacionado({ TipoRelacion: '01' })
            cfdiRelations.map(async (document) => {
                relation.addRelation(document);
            })
            await cfdi.relacionados(relation);
            await cfdi.certificar(cerSAT);
            await cfdi.sellar(keySAT, settingsBranchOffice.password);
            return await cfdi.getXmlCdfi();

        } catch (err) {
            return err.message;
        }
    }
}
