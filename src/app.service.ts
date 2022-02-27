import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CFDI, Comprobante, Concepts, Emisor, ExportacionEnum, FormaPago, Impuestos, MetodoPago, ObjetoImpEnum, Receptor, Relacionado } from '@signati/core';
import { getRepository } from 'typeorm';
import { ConfigService } from './common/config/config.service';
import { ColegioDBNameConnection } from './common/databases/colegiodb.service';
import { BranchOfficeSetting } from './system/branch-office-setting/entities/branch-office-setting.entity';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {
  }

  async getHello(): Promise<string> {
    return 'Hello World! ' + this.configService.get('APP_NAME');
  }

  private readonly logger = new Logger(AppService.name);

  @Cron('15 * 2 * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 45');
    // axios({
    //   url: 'https://version.muunyal.app/api/version/download/files?file=SaxonHE10-2J.zip', //your url
    //   method: 'GET',
    //   responseType: 'blob',
    //   onDownloadProgress: (d) => {

    //   },// important
    // }).then((response) => {
    //   const path = Path.resolve(__dirname, 'public', '..', '..', '..', 'amir.zip');
    //   const writer = fs.createWriteStream(path);
    //   return new Promise((resolve, reject) => {
    //     response.data.pipe(writer);
    //     writer.on('finish', resolve);
    //     writer.on('error', reject);
    //   });
    // });
  }

  public async generateFactura() {
    const branchOfficeSEttingsRepository = getRepository(BranchOfficeSetting, ColegioDBNameConnection);
    const settings = await branchOfficeSEttingsRepository.findOne({
      where: {
        id: 1,
      },
    })
    /*const cer = readFileSync(`${this.configService.getPath()}CSD/` + branchOfficeSett.cerCSD).toString('base64');
    const key = readFileSync(`${this.configService.getPath()}CSD/` + branchOfficeSett.keyCSD).toString('base64');*/
    const comprobanteAttribute: Comprobante = {
      Serie: 'E',
      Folio: 'ACACUN-27',
      Fecha: '2014-07-08T12:16:50',
      Sello: '',
      FormaPago: FormaPago.EFECTIVO,
      NoCertificado: '',
      Certificado: '',
      condicionesDePago: 'Contado',
      SubTotal: '16148.04',
      Descuento: '645.92',
      Moneda: 'MXN',
      Total: '17207.35',
      TipoDeComprobante: 'I',
      MetodoPago: MetodoPago.PAGO_EN_UNA_EXHIBICION,
      LugarExpedicion: 'México',
      Exportacion: ExportacionEnum.NoAplica
    };
    const comprobante = new CFDI(comprobanteAttribute, { debug: true });

    const emisor = new Emisor({
      Nombre: 'ALBA XKARAJAM MENDEZ',
      Rfc: 'XAMA620210DQ5',
      RegimenFiscal: 612
    });
    await comprobante.emisor(emisor);
    const receptor = new Receptor({
      Nombre: 'PUBLICO EN GENERAL',
      Rfc: 'XAXX010101000',
      UsoCFDI: 'G02',
      DomicilioFiscalReceptor: '77728',
      RegimenFiscalReceptor: '601'
    });
    await comprobante.receptor(receptor);

    const concepto = new Concepts({
      ClaveProdServ: '',
      NoIdentificacion: '',
      Cantidad: '',
      ClaveUnidad: '',
      Unidad: '',
      Descripcion: '',
      ValorUnitario: '',
      Importe: '',
      Descuento: '',
      ObjetoImp: ObjetoImpEnum.SíObjetoDeImpuesto
    });
    concepto.traslado({
      Base: '',
      Impuesto: '',
      TipoFactor: '',
      TasaOCuota: '',
      Importe: '',
    });
    concepto.retencion({
      Base: '',
      Impuesto: '',
      TipoFactor: '',
      TasaOCuota: '',
      Importe: '',
    });
    await comprobante.concepto(concepto);
    const impuesto: Impuestos = new Impuestos({ TotalImpuestosRetenidos: '', TotalImpuestosTrasladados: '' });

    impuesto.traslados({
      Impuesto: '',
      TipoFactor: '',
      TasaOCuota: '',
      Importe: '',
      Base: '',
    });
    impuesto.retenciones({
      Impuesto: '',
      Importe: '',
    });
    await comprobante.impuesto(impuesto);
    const relation = new Relacionado({ TipoRelacion: '01' });
    relation.addRelation('4A1B43E2-1183-4AD4-A3DE-C2DA787AE56A');
    await comprobante.relacionados(relation);
  }
}
