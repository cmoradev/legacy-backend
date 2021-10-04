import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CFDI, Comprobante, Concepts, Emisor, Impuestos, Receptor, XmlEmisorAttribute, XmlReceptorAttribute } from '@signati/core';
import { mulQuantity } from '../common/point-of-sale/point-of-sale';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../common/databases/colegiodb.service';
import { BranchOfficeSetting } from '../system/branch-office-setting/entities/branch-office-setting.entity';
import { CreditNoteAcademy } from './entities/credit-note-academy.entity';
import { ConfigService } from '../common/config/config.service';
import { readFileSync } from 'fs';

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
        issuer: Partial<XmlEmisorAttribute>,
        concepts: ConceptWithTaxes[],
        cfdiRelations: string[],
        branchOfficeId: string | number,
        branchOfficeModuleId: string | number,
        workPath: string,
    ) {
        const settingsBranchOffice = await this.branchOfficeSettingRepository.createQueryBuilder('setting').leftJoin('setting.invoiceCampus', 'branchOffice').where('branchOffice.id = :branchOfficeId', { branchOfficeId: branchOfficeId }).andWhere('setting.id = :settingsId', {settingsId: branchOfficeModuleId}).getOne();
        const cerSAT =  readFileSync(`${workPath}CSD/` + settingsBranchOffice.cerCSD).toString('base64');
        const keySAT =  readFileSync(`${workPath}CSD/` + settingsBranchOffice.keyCSD).toString('base64');
        console.log(cerSAT);
        console.log(keySAT);
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
        const cfdi = new CFDI(cfdiAttributes);
        await cfdi.setAttributesXml({ version: '1.0', encoding: 'utf-8' });
        const receptor = new Receptor({
            Nombre: receiver.Nombre,
            Rfc: receiver.Rfc,
            UsoCFDI: receiver.UsoCFDI,
        })
        const emisor = new Emisor({
            Rfc: issuer.Rfc,
            Nombre: issuer.Nombre,
            RegimenFiscal: issuer.RegimenFiscal,
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
        const impuestos = new Impuestos({
            TotalImpuestosRetenidos: totalImpuestosRetenidos > 0 ? totalImpuestosRetenidos.toString() : '',
            TotalImpuestosTrasladados: totalImpuestosTrasladados > 0 ? totalImpuestosTrasladados.toString() : ''
        });
        if (totalImpuestosTrasladados > 0) {
            impuestos.traslados({
                Base: totalImpuestosTrasladados.toString(),
                Impuesto: '002',
                TasaOCuota: 'Tasa',
                TipoFactor: '0.16',
                Importe: mulQuantity(totalImpuestosTrasladados, 0.16, -2).toString(),
            });
        }
        if (totalImpuestosRetenidos > 0) {
            impuestos.retenciones({
                Base: totalImpuestosRetenidos.toString(),
                Impuesto: '002',
                TasaOCuota: 'Tasa',
                TipoFactor: '0.16',
                Importe: mulQuantity(totalImpuestosRetenidos, 0.16, -2).toString(),
            });
        }
        await cfdi.impuesto(impuestos);
        return await cfdi.getXmlCdfi();
    }
}
