import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CFDI, Comprobante, Concepts, Emisor, Impuestos, Receptor, Relacionado, XmlCdfi, XmlReceptorAttribute } from '@signati/core';
import { Repository } from 'typeorm';
import { AcademyChargeInvoice } from '../academy/charges-academy/academy-charge-invoice/entities/academy-charge-invoice.entity';
import { ColegioDBNameConnection } from '../common/databases/colegiodb.service';
import { mulQuantity } from '../common/point-of-sale/point-of-sale';
import { InvoiceStatus } from '../invoice/types/invoice-status';
import { InvoiceType } from '../mini-store/store-sales/mini-store-invoices/enums/invoice-type.enum';
import { BranchOfficeSetting } from '../system/branch-office-setting/entities/branch-office-setting.entity';
import { BranchOffice } from '../system/branch-office/entities/branch-office.entity';
import { User } from '../system/users/entities/user.entity';
import { StampV4 } from '../webService/FactSw';
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

    async saveCreditNote(cfdi: XmlCdfi, timbrado: StampV4, invoicesAcademy: AcademyChargeInvoice[], branchOfficeId: string | number, userCreatorId: string | number) {
        const academyInvoicesId = invoicesAcademy.map((invoice) => {
            return invoice.id;
        })
        const creditNoteAcademy: Partial<CreditNoteAcademy> = {
            folio: `${cfdi['cfdi:Comprobante']._attributes.Serie}-${cfdi['cfdi:Comprobante']._attributes.Folio}`,
            uuid: timbrado.data.uuid,
            businessName: cfdi['cfdi:Comprobante']['cfdi:Receptor']._attributes.Nombre,
            rfc: cfdi['cfdi:Comprobante']['cfdi:Receptor']._attributes.Rfc,
            total: +cfdi['cfdi:Comprobante']._attributes.Total,
            invoiceType: InvoiceType.expenses,
            status: InvoiceStatus.billed,
            invoiceBranchOffice: { id: branchOfficeId } as BranchOffice,
            agentBilling: { id: userCreatorId } as User,
            invoicesAcademy: academyInvoicesId as unknown as AcademyChargeInvoice[],
        }
        await this.repo.save(creditNoteAcademy);
    }
    async createCreditNote(
        invoice: Partial<Comprobante>,
        receiver: Partial<XmlReceptorAttribute>,
        concepts: ConceptWithTaxes[],
        relations: AcademyChargeInvoice[],
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
            const cfdi = new CFDI(cfdiAttributes, { debug: true });
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
                if (typeof concept.impuestosTransladados !== 'undefined') {
                    totalImpuestosTrasladados += Number(concept.impuestosTransladados.Importe);
                    concepto.traslado({
                        Importe: concept.impuestosTransladados.Importe,
                        Impuesto: concept.impuestosTransladados.Impuesto,
                        TasaOCuota: concept.impuestosTransladados.TasaOCuota,
                        TipoFactor: concept.impuestosTransladados.TipoFactor,
                        Base: concept.impuestosTransladados.Base,
                    });
                }
                if (typeof concept.impuestosRetenidos !== 'undefined') {
                    totalImpuestosRetenidos += +concept.impuestosRetenidos.Importe;
                    concepto.retencion({
                        Importe: concept.impuestosRetenidos.Importe,
                        Impuesto: concept.impuestosRetenidos.Impuesto,
                        TasaOCuota: concept.impuestosRetenidos.TasaOCuota,
                        TipoFactor: concept.impuestosRetenidos.TipoFactor,
                        Base: concept.impuestosRetenidos.Base,
                    });
                }
                await cfdi.concepto(concepto);
            })
            if (totalImpuestosTrasladados > 0) {
                console.log(totalImpuestosTrasladados, totalImpuestosTrasladados > 0)
                const impuestosTransladados = new Impuestos({
                    TotalImpuestosTrasladados: totalImpuestosTrasladados > 0 ? totalImpuestosTrasladados.toString() : ''
                });
                await impuestosTransladados.traslados({
                    Impuesto: '002',
                    TasaOCuota: '0.160000',
                    TipoFactor: 'Tasa',
                    Importe: totalImpuestosTrasladados.toString(),
                });
                await cfdi.impuesto(impuestosTransladados);
            }
            if (totalImpuestosRetenidos > 0) {
                const impuestosRetenidos = new Impuestos({
                    TotalImpuestosRetenidos: totalImpuestosRetenidos > 0 ? totalImpuestosRetenidos.toString() : '',
                });
                await impuestosRetenidos.retenciones({
                    Impuesto: '002',
                    TasaOCuota: '0.160000',
                    TipoFactor: 'Tasa',
                    Importe: totalImpuestosRetenidos.toString(),
                });
                await cfdi.impuesto(impuestosRetenidos);
            }
            if (totalImpuestosRetenidos > 0 && totalImpuestosTrasladados > 0) {
                const impuestosRetenidosTransladados = new Impuestos({
                    TotalImpuestosRetenidos: totalImpuestosRetenidos > 0 ? totalImpuestosRetenidos.toString() : '',
                    TotalImpuestosTrasladados: totalImpuestosTrasladados > 0 ? totalImpuestosTrasladados.toString() : ''
                });
                impuestosRetenidosTransladados.traslados({
                    Impuesto: '002',
                    TasaOCuota: '0.160000',
                    TipoFactor: 'Tasa',
                    Importe: totalImpuestosTrasladados.toString(),
                });
                impuestosRetenidosTransladados.retenciones({
                    Impuesto: '002',
                    TasaOCuota: '0.160000',
                    TipoFactor: 'Tasa',
                    Importe: totalImpuestosRetenidos.toString(),
                });
                await cfdi.impuesto(impuestosRetenidosTransladados);
            }
            const relation = new Relacionado({ TipoRelacion: '01' })
            relations.map(async (document) => {
                await relation.addRelation(document.uuid);
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
