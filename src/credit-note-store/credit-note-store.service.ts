import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CFDI, Comprobante, Concepts, Emisor, Impuestos, Receptor, Relacionado, XmlCdfi, XmlReceptorAttribute } from '@signati/core';
import { PDF } from '@signati/pdf';
import { readFileSync } from 'fs';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../common/databases/colegiodb.service';
import { ConceptWithTaxes, InvoiceSat } from '../credit-note-academy/credit-note-academy.service';
import { CreditNoteSchool } from '../credit-note-school/entities/credit-note-school.entity';
import { InvoiceStatus } from '../invoice/types/invoice-status';
import { MiniStoreInvoice } from '../mini-store/store-sales/mini-store-invoices/entities/mini-store-invoice.entity';
import { InvoiceType } from '../mini-store/store-sales/mini-store-invoices/enums/invoice-type.enum';
import { A117 } from '../pdf/A117/desing/A117';
import { SchoolChargesInvoice } from '../school-colegio-ingles/charges-school/school-charges-invoice/entities/school-charges-invoice.entity';
import { BranchOfficeSetting } from '../system/branch-office-setting/entities/branch-office-setting.entity';
import { BranchOffice } from '../system/branch-office/entities/branch-office.entity';
import { User } from '../system/users/entities/user.entity';
import { StampV4 } from '../webService/FactSw';
import { CreditNoteStore } from './entities/credit-note-store.entity';

@Injectable()
export class CreditNoteStoreService extends TypeOrmCrudService<CreditNoteStore> {
    constructor(
        @InjectRepository(CreditNoteStore, ColegioDBNameConnection) repo: Repository<CreditNoteStore>,
        @InjectRepository(BranchOfficeSetting, ColegioDBNameConnection) readonly branchOfficeSettingRepository: Repository<BranchOfficeSetting>) {
        super(repo);
    }

    async saveCreditNote(
        cfdi: XmlCdfi,
        timbrado: StampV4,
        invoices: MiniStoreInvoice[],
        branchOfficeId: string | number,
        branchOfficeModuleId: string | number,
        userCreatorId: string | number,
        workPath: string
    ) {
        const invoicesId = invoices.map((invoice) => {
            return invoice.id;
        })
        const creditNoteAcademy: Partial<CreditNoteSchool> = {
            folio: `${cfdi['cfdi:Comprobante']._attributes.Serie}-${cfdi['cfdi:Comprobante']._attributes.Folio}`,
            uuid: timbrado.data.uuid,
            businessName: cfdi['cfdi:Comprobante']['cfdi:Receptor']._attributes.Nombre,
            rfc: cfdi['cfdi:Comprobante']['cfdi:Receptor']._attributes.Rfc,
            total: +cfdi['cfdi:Comprobante']._attributes.Total,
            invoiceType: InvoiceType.expenses,
            status: InvoiceStatus.billed,
            invoiceBranchOffice: { id: branchOfficeId } as BranchOffice,
            agentBilling: { id: userCreatorId } as User,
            invoiceSchool: invoicesId as unknown as SchoolChargesInvoice[],
        }
        await this.repo.save(creditNoteAcademy);
        const settingsBranchOffice = await this.branchOfficeSettingRepository.createQueryBuilder('setting').leftJoin('setting.invoiceCampus', 'branchOffice').where('branchOffice.id = :branchOfficeId', { branchOfficeId: branchOfficeId }).andWhere('setting.id = :settingsId', { settingsId: branchOfficeModuleId }).getOne();
        const pathXml = `${workPath}comprobantes/notas-credito/` + timbrado.data.uuid.toUpperCase() + '.xml';
        const logo = readFileSync(`${workPath}logos/academiaslogo.png`);
        const desingpdf = new A117(pathXml, {
            lugarExpedicion: settingsBranchOffice.address,
            logo: `data:image/png;base64, ${logo.toString('base64')}`,
        });
        const pdf = new PDF<A117>(desingpdf);
        await pdf.save(`${workPath}comprobantes/notas-credito/` + timbrado.data.uuid.toUpperCase());
    }
    async createCreditNote(
        invoice: InvoiceSat,
        receiver: Partial<XmlReceptorAttribute>,
        concepts: ConceptWithTaxes[],
        relations: MiniStoreInvoice[],
        branchOfficeId: string | number,
        branchOfficeModuleId: string | number,
        workPath: string,
    ): Promise<any> {
        // @cfdiv4
        // try {
        //     const settingsBranchOffice = await this.branchOfficeSettingRepository.createQueryBuilder('setting').leftJoin('setting.invoiceCampus', 'branchOffice').where('branchOffice.id = :branchOfficeId', { branchOfficeId: branchOfficeId }).andWhere('setting.id = :settingsId', { settingsId: branchOfficeModuleId }).getOne();
        //     console.log('settingsBranchOffice', settingsBranchOffice)
        //     const cerSAT = `${workPath}CSD/` + settingsBranchOffice.cerCSD;
        //     const keySAT = `${workPath}CSD/` + settingsBranchOffice.keyCSD;
        //     let totalImpuestosTrasladados = 0;
        //     let totalImpuestosRetenidos = 0;
        //     const cfdiAttributes: Comprobante = {
        //         Serie: invoice.Serie,
        //         Folio: invoice.Folio,
        //         Fecha: invoice.Fecha,
        //         Sello: '',
        //         FormaPago: invoice.FormaPago,
        //         NoCertificado: '',
        //         Certificado: '',
        //         SubTotal: invoice.SubTotal,
        //         Descuento: invoice.Descuento,
        //         Moneda: invoice.Moneda,
        //         Total: invoice.Total,
        //         TipoDeComprobante: invoice.TipoDeComprobante,
        //         MetodoPago: invoice.MetodoPago,
        //         LugarExpedicion: invoice.LugarExpedicion,
        //     }
        //     const cfdi = new CFDI(cfdiAttributes, { debug: true });
        //     await cfdi.setAttributesXml({ version: '1.0', encoding: 'utf-8' });
        //     const receptor = new Receptor({
        //         Nombre: receiver.Nombre,
        //         Rfc: receiver.Rfc,
        //         UsoCFDI: receiver.UsoCFDI,
        //     })
        //     const emisor = new Emisor({
        //         Rfc: settingsBranchOffice.rfc,
        //         Nombre: settingsBranchOffice.businessName,
        //         RegimenFiscal: settingsBranchOffice.regime,
        //     });
        //     await cfdi.emisor(emisor);
        //     await cfdi.receptor(receptor);
        //     concepts.map(async (concept) => {
        //         const concepto = new Concepts({
        //             ClaveProdServ: concept.ClaveProdServ,
        //             NoIdentificacion: concept.NoIdentificacion,
        //             Cantidad: concept.Cantidad,
        //             ClaveUnidad: concept.ClaveUnidad,
        //             Descripcion: concept.Descripcion,
        //             Descuento: concept.Descuento,
        //             Importe: concept.Importe,
        //             Unidad: concept.Unidad,
        //             ValorUnitario: concept.ValorUnitario,
        //         });
        //         if (typeof concept.impuestosTransladados !== 'undefined') {
        //             totalImpuestosTrasladados += Number(concept.impuestosTransladados.Importe);
        //             concepto.traslado({
        //                 Importe: concept.impuestosTransladados.Importe,
        //                 Impuesto: concept.impuestosTransladados.Impuesto,
        //                 TasaOCuota: concept.impuestosTransladados.TasaOCuota,
        //                 TipoFactor: concept.impuestosTransladados.TipoFactor,
        //                 Base: concept.impuestosTransladados.Base,
        //             });
        //         }
        //         if (typeof concept.impuestosRetenidos !== 'undefined') {
        //             totalImpuestosRetenidos += Number(concept.impuestosRetenidos.Importe);
        //             concepto.retencion({
        //                 Importe: concept.impuestosRetenidos.Importe,
        //                 Impuesto: concept.impuestosRetenidos.Impuesto,
        //                 TasaOCuota: concept.impuestosRetenidos.TasaOCuota,
        //                 TipoFactor: concept.impuestosRetenidos.TipoFactor,
        //                 Base: concept.impuestosRetenidos.Base,
        //             });
        //         }
        //         await cfdi.concepto(concepto);
        //     })
        //     if (totalImpuestosTrasladados > 0) {
        //         const impuestosTransladados = new Impuestos({
        //             TotalImpuestosTrasladados: totalImpuestosTrasladados > 0 ? totalImpuestosTrasladados.toString() : ''
        //         });
        //         await impuestosTransladados.traslados({
        //             Impuesto: invoice.Impuesto,
        //             TasaOCuota: invoice.TasaOCuota,
        //             TipoFactor: invoice.TipoFactor,
        //             Importe: totalImpuestosTrasladados.toString(),
        //         });
        //         await cfdi.impuesto(impuestosTransladados);
        //     }
        //     if (totalImpuestosRetenidos > 0) {
        //         const impuestosRetenidos = new Impuestos({
        //             TotalImpuestosRetenidos: totalImpuestosRetenidos > 0 ? totalImpuestosRetenidos.toString() : '',
        //         });
        //         await impuestosRetenidos.retenciones({
        //             Impuesto: invoice.Impuesto,
        //             TasaOCuota: invoice.TasaOCuota,
        //             TipoFactor: invoice.TipoFactor,
        //             Importe: totalImpuestosRetenidos.toString(),
        //         });
        //         await cfdi.impuesto(impuestosRetenidos);
        //     }
        //     if (totalImpuestosRetenidos > 0 && totalImpuestosTrasladados > 0) {
        //         const impuestosRetenidosTransladados = new Impuestos({
        //             TotalImpuestosRetenidos: totalImpuestosRetenidos > 0 ? totalImpuestosRetenidos.toString() : '',
        //             TotalImpuestosTrasladados: totalImpuestosTrasladados > 0 ? totalImpuestosTrasladados.toString() : ''
        //         });
        //         impuestosRetenidosTransladados.traslados({
        //             Impuesto: invoice.Impuesto,
        //             TasaOCuota: invoice.TasaOCuota,
        //             TipoFactor: invoice.TipoFactor,
        //             Importe: totalImpuestosTrasladados.toString(),
        //         });
        //         impuestosRetenidosTransladados.retenciones({
        //             Impuesto: invoice.Impuesto,
        //             TasaOCuota: invoice.TasaOCuota,
        //             TipoFactor: invoice.TipoFactor,
        //             Importe: totalImpuestosRetenidos.toString(),
        //         });
        //         await cfdi.impuesto(impuestosRetenidosTransladados);
        //     }
        //     const relation = new Relacionado({ TipoRelacion: '01' })
        //     relations.map(async (document) => {
        //         await relation.addRelation(document.uuid);
        //     })
        //     await cfdi.relacionados(relation);
        //     await cfdi.certificar(cerSAT);
        //     await cfdi.sellar(keySAT, settingsBranchOffice.password);
        //     return await cfdi.getXmlCdfi();

        // } catch (err) {
        //     return err.message;
        // }
    }

    async getLastFolio() {
        return await this.repo.createQueryBuilder('creditNote')
            .select('MAX(creditNote.id)', 'last')
            .getRawOne();
    }
}
