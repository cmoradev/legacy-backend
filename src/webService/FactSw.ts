import { StampService, Authentication, CancelationService } from 'sw-sdk-nodejs';
import * as CancelationRequest from 'sw-sdk-nodejs/lib/SWServices/Cancelation/CancelationRequest';
import * as https from 'https';

export class FactSw {
  private tokenProd: string = 'T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbXB3YVZxTHdOdHAwVXY2NTdJb1hkREtXTzE3dk9pMmdMdkFDR2xFWFVPUXpTUm9mTG1ySXdZbFNja3FRa0RlYURqbzdzdlI2UUx1WGJiKzViUWY2dnZGbFloUDJ6RjhFTGF4M1BySnJ4cHF0YjUvbmRyWWpjTkVLN3ppd3RxL0dJPQ.T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbFlVcU92YUJTZWlHU3pER1kySnlXRTF4alNUS0ZWcUlVS0NhelhqaXdnWTRncklVSWVvZlFZMWNyUjVxYUFxMWFxcStUL1IzdGpHRTJqdS9Zakw2UGRZc1hLcDVaMVNtMmJ3L2xhMEdHVzdWZHV1QXJ6V0JjSjhvSEhwY1VtcHA3L1hoSDFvWlhzVSt5cjh4Z3M4VWxuWmRXV05Cb1ZjR3ova2R5Sko1anhQSXNmZXFGTjFic043NzdFUTBPTFdINmsxRnJRa0VTVFI3UTBKb3EybkR3aDhSOGF2c2g1UHU2RHFRVy9Pb3MvVEt3dWN6SHo5azhzWFcrU0dxTGFHK29neSt0aG80NlpqY2d2VklBMDlPUmZmOEVrbUVVcHY2Nk9vOHN5QVpVZVVYY0tvblFlUWZWMklyTGNXRFozUXBLTWJWSGZWVjlpY0owanRiVGVNNENkcUdOdW5lYks1b1BPREF5V1pnNGMrOXU5UTVXNHcvNStkYnorYW00M2M0OFpEZXBZa2VYSUhlUDh1eUdvemlGODhXNEJTa3ZRNVQ2bXFvUVYrencwamZrczBoM0Z2UEsxS3kzZHo1YTAvbkJtaWwxeW1jRjVRNFhSaWNOS2xKUDUwM01mS1hzcHBrYmxkTWFHMDhXa25RPT0.VfgUe8ZmsEsT7KhwCxjaEk80k1xucBX9BiWODKhrbxc';
  private tokenDev: string = 'T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbXB3YVZxTHdOdHAwVXY2NTdJb1hkREtXTzE3dk9pMmdMdkFDR2xFWFVPUXpTUm9mTG1ySXdZbFNja3FRa0RlYURqbzdzdlI2UUx1WGJiKzViUWY2dnZGbFloUDJ6RjhFTGF4M1BySnJ4cHF0YjUvbmRyWWpjTkVLN3ppd3RxL0dJPQ.T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbFlVcU92YUJTZWlHU3pER1kySnlXRTF4alNUS0ZWcUlVS0NhelhqaXdnWTRncklVSWVvZlFZMWNyUjVxYUFxMWFxcStUL1IzdGpHRTJqdS9Zakw2UGRmdmNpWlVpNkY5VXhHb3RRZDBnd2hMRm1HSWtmUGloSk5mbjdpNlZnVUp6RmhzemtFUVh4b2FnS3poTFBTU1Q0YmEvSVM2RHU1V0svWGdHWmdPWFBjcjhXeFdOVTNsSnFZM0drREJQb2NWTDdyNHhlTDJicnp6NEVaUDB4YzJBeHFHVDZsR2IwTXFXOHRmU2s2SFNzbnhpeCt6UFhRc2x1ZDFBVytiUHpJUUM1WndNZTlsNVdjYWlrUjRaYWY4SmtBQktWNFNsazVybG8zNkwwV3g0Y29aakZ5M29EZzVlOXBwTWpVM1FJUmpOeWhGVnpxSzRsVjBiVjlybFJDditPc2hzZHlrVEN0aWkwOThhUmVVdVJTWk8yUmpyeDlnQTMvZm1ldG5za2VNMlVLTjU1MlFJVDNXU09aK0J0VWd4NzRIM0Qvd1BxUk4yNlFJWmdJZWRCdEoyUjNoT1VmN2IxUnFjYjM4ajM4YXFYMjFWME1DV0pJK1g4b205ODdUaDc.K5KzDuUZw_IhYh78F8uA-Aj80cKiT15w_wS9sEFJXmI';
  private url = process.env.NODE_ENV === 'development' ? 'https://services.test.sw.com.mx' : 'https://services.sw.com.mx';
  private urlapi = process.env.NODE_ENV === 'development' ? 'https://api.test.sw.com.mx' : 'https://api.sw.com.mx';
  private user = process.env.NODE_ENV === 'development' ? 'caleb@munyaal.app' : 'developers@colegioinglesplaya.com';
  private password = process.env.NODE_ENV === 'development' ? 'Munyaal+SW' : 'S0p0rt3.01';
  private token = process.env.NODE_ENV === 'development' ? this.tokenDev : this.tokenProd;

  constructor() {}

  getToken() {
    return new Promise((resolve, reject) => {

      const obj = {
        url: this.url,
        user: this.user,
        password: this.password,
      };

      const auth = Authentication.auth(obj);
      auth.Token((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  public async facturar(xml: string): Promise<StampV4> {
    return new Promise((resolve, reject) => {
      const stamp = StampService.Set({
        url: this.url,
        user: this.user,
        password: this.password,
        token: this.token
      });

      stamp.StampV4(xml, (err, data) => {
        if (err) {

          console.info(xml)

          const errRes = {
            status: 'error',
            message: err.message,
            messageDetail: err.messageDetail
          }
          reject(errRes);
        } else {
          resolve(data);
        }
      });
    });
  }

  public async getDatawarehouseByUuid(uuid: string): Promise<DatawarehouseResponse> {
    
    const body = await this.httpsGet(`${this.urlapi}/datawarehouse/v1/live/${uuid}`, {
      Authorization: `Bearer ${this.token}`,
    });

    return JSON.parse(body);
  }

  public async getXmlByUuid(uuid: string): Promise<XmlByUuid> {

    const response = await this.getDatawarehouseByUuid(uuid);

    const record = response.data && response.data.records[0];

    if (!record) {
      const errRes = {
        status: 'error',
        message: 'No se encontró el CFDI',
        messageDetail: `No se encontró ningún comprobante con el uuid ${uuid}`,
      };
      throw errRes;
    }

    const xml = await this.httpsGet(record.urlXml);

    return {
      xml,
      record,
    };
  }

  public async validateCfdi(xml: string): Promise<ValidateCfdiResponse> {
    const body = await this.httpsPostMultipart(`${this.url}/validate/cfdi`, { xml });
    return JSON.parse(body);
  }

  public async getXmlByUuidValidated(uuid: string): Promise<ValidatedCfdiByUuid> {

    const { xml } = await this.getXmlByUuid(uuid);

    const validated = await this.validateCfdi(xml);

    return {
      xml,
      uuid: validated.uuid,
      statusSat: validated.statusSat,
      cadenaOriginalSAT: validated.cadenaOriginalSAT,
    };
  }

  private httpsPostMultipart(
    url: string,
    fields: { [name: string]: string },
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const boundary = '-----------------' + Date.now().toString(16);

      let data = '';
      Object.keys(fields).forEach((name) => {
        data += `--${boundary}\r\n`;
        data += `Content-Disposition: form-data; name="${name}"; `;
        data += `filename="${name}"\r\n`;
        data += 'Content-Type: text/xml\r\n\r\n';
        data += fields[name] + '\r\n';
      });
      data += `--${boundary}--\r\n`;

      const request = https.request(
        url,
        {
          method: 'POST',
          headers: {
            'Content-Type': `multipart/form-data; boundary=${boundary}`,
            'Content-Length': Buffer.byteLength(data, 'utf8'),
            Authorization: `Bearer ${this.token}`,
          },
        },
        (res) => {
          let body = '';

          res.setEncoding('utf8');

          res.on('data', (d) => {
            body += d;
          });

          res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(body);
            } else {
              const errRes = {
                status: 'error',
                message: res.statusCode,
                messageDetail: res.statusMessage,
              };
              reject(errRes);
            }
          });
        },
      );

      request.on('error', (e) => {
        const errRes = {
          status: 'error',
          message: e['code'],
          messageDetail: e.message,
        };
        reject(errRes);
      });

      request.write(data);
      request.end();
    });
  }

  private httpsGet(url: string, headers?: { [key: string]: string }): Promise<string> {
    return new Promise((resolve, reject) => {
      const request = https.get(url, { headers }, (res) => {

        let body = '';

        res.setEncoding('utf8');
        
        res.on('data', (d) => {
          body += d;
        });

        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(body);
          } else {
            const errRes = {
              status: 'error',
              message: res.statusCode,
              messageDetail: res.statusMessage,
            };
            reject(errRes);
          }
        });
      });

      request.on('error', (e) => {
        const errRes = {
          status: 'error',
          message: e['code'],
          messageDetail: e.message,
        };
        reject(errRes);
      });
    });
  }

  public async cancelarCSD(options: {
    uuid: string,
    password: string,
    rfc: string,
    cer: string,
    key: string,
    motivo: '01' | '02' | '03' | '04',
    folioSustitucion?: string
  }): Promise<Cancelacion | any> {
    return new Promise((resolve, reject) => {
      const params = {
        uuid: options.uuid,
        password: options.password,
        rfc: options.rfc,
        b64Cer: options.cer,
        b64Key: options.key,
        motivo: options.motivo,
      };
      if (options.folioSustitucion) {
        Object.assign(params, { folioSustitucion: options.folioSustitucion })
      }
      CancelationRequest.sendReqCSD(this.url, this.token, params, (err, data) => {
        if (data) {
          resolve(data);
        } else {
          reject(err);
        }
      })
    });
  }
}

export interface StampV4 {
  data: TDF;
  status: string;
}

export interface TDF {
  cadenaOriginalSAT: string;
  noCertificadoSAT: string;
  noCertificadoCFDI: string;
  uuid: string;
  selloSAT: string;
  selloCFDI: string;
  fechaTimbrado: string;
  qrCode: string;
  cfdi: string;
}

export interface Cancelacion {
  data: DataCancelacion;
  status: string;
}

interface DataCancelacion {
  acuse: string;
  uuid: AnyData;
}

interface AnyData {
  [key: string]: string;
}

export interface DatawarehouseResponse {
  data: {
    metaData: DatawarehouseMetaData;
    records: DatawarehouseRecord[];
  };
  status: string;
}

export interface DatawarehouseMetaData {
  page: number;
  perPage: number;
  pageCount: number;
  totalCount: number;
  links: {
    current: string;
  };
}

export interface DatawarehouseRecord {
  status: string;
  urlPDF: string | null;
  urlAckCfdi: string | null;
  hasAddenda: boolean;
  addenda: string | null;
  urlAddenda: string | null;
  fechaGeneracionPdf: string | null;
  idDealer: string;
  idUser: string;
  version: string;
  serie: string;
  folio: string;
  fecha: string;
  numeroCertificado: string;
  subTotal: number;
  descuento: number;
  total: number;
  moneda: string;
  tipoCambio: number;
  tipoDeComprobante: string;
  metodoPago: string;
  formaPago: string;
  condicionesPago: string;
  luegarExpedicion: string;
  emisorRfc: string;
  emisorNombre: string;
  regimenFiscal: string;
  receptorRfc: string;
  receptorNombre: string;
  residenciaFiscal: string;
  numRegIdTrib: string;
  usoCFDI: string;
  totalImpuestosTraslados: number;
  totalImpuestosRetencion: number;
  trasladosIVA: number;
  trasladosIEPS: number;
  retencionesISR: number;
  retencionesIVA: number;
  retencionesIEPS: number;
  totalImpuestosLocalesTraslados: number;
  totalImpuestosLocalesRetencion: number;
  complementos: string;
  uuid: string;
  fechaTimbrado: string;
  rfcProvCertif: string;
  selloCFD: string;
  urlXml: string;
  yearMonth: number;
}

export interface XmlByUuid {
  xml: string;
  record: DatawarehouseRecord;
}

export interface ValidateCfdiResponse {
  status: string;
  detail: any[];
  cadenaOriginalSAT: string;
  cadenaOriginalComprobante: string;
  uuid: string;
  statusSat: string;
  statusCodeSat: string;
  isCancelable: string;
  statusCancelation: string;
}

export interface ValidatedCfdiByUuid {
  xml: string;
  uuid: string;
  statusSat: string;
  cadenaOriginalSAT: string;
}
