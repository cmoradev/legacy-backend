import { StampService, Authentication, CancelationService } from 'sw-sdk-nodejs';

export class FactSw {
  private tokenProd: string = 'T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbXB3YVZxTHdOdHAwVXY2NTdJb1hkREtXTzE3dk9pMmdMdkFDR2xFWFVPUXpTUm9mTG1ySXdZbFNja3FRa0RlYURqbzdzdlI2UUx1WGJiKzViUWY2dnZGbFloUDJ6RjhFTGF4M1BySnJ4cHF0YjUvbmRyWWpjTkVLN3ppd3RxL0dJPQ.T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbFlVcU92YUJTZWlHU3pER1kySnlXRTF4alNUS0ZWcUlVS0NhelhqaXdnWTRncklVSWVvZlFZMWNyUjVxYUFxMWFxcStUL1IzdGpHRTJqdS9Zakw2UGRZc1hLcDVaMVNtMmJ3L2xhMEdHVzdWZHV1QXJ6V0JjSjhvSEhwY1VtcHA3L1hoSDFvWlhzVSt5cjh4Z3M4VWxuWmRXV05Cb1ZjR3ova2R5Sko1anhQSXNmZXFGTjFic043NzdFUTBPTFdINmsxRnJRa0VTVFI3UTBKb3EybkR3aDhSOGF2c2g1UHU2RHFRVy9Pb3MvVEt3dWN6SHo5azhzWFcrU0dxTGFHK29neSt0aG80NlpqY2d2VklBMDlPUmZmOEVrbUVVcHY2Nk9vOHN5QVpVZVVYY0tvblFlUWZWMklyTGNXRFozUXBLTWJWSGZWVjlpY0owanRiVGVNNENkcUdOdW5lYks1b1BPREF5V1pnNGMrOXU5UTVXNHcvNStkYnorYW00M2M0OFpEZXBZa2VYSUhlUDh1eUdvemlGODhXNEJTa3ZRNVQ2bXFvUVYrencwamZrczBoM0Z2UEsxS3kzZHo1YTAvbkJtaWwxeW1jRjVRNFhSaWNOS2xKUDUwM01mS1hzcHBrYmxkTWFHMDhXa25RPT0.VfgUe8ZmsEsT7KhwCxjaEk80k1xucBX9BiWODKhrbxc';
  private tokenDev: string = 'T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbXB3YVZxTHdOdHAwVXY2NTdJb1hkREtXTzE3dk9pMmdMdkFDR2xFWFVPUXpTUm9mTG1ySXdZbFNja3FRa0RlYURqbzdzdlI2UUx1WGJiKzViUWY2dnZGbFloUDJ6RjhFTGF4M1BySnJ4cHF0YjUvbmRyWWpjTkVLN3ppd3RxL0dJPQ.T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbFlVcU92YUJTZWlHU3pER1kySnlXRTF4alNUS0ZWcUlVS0NhelhqaXdnWTRncklVSWVvZlFZMWNyUjVxYUFxMWFxcStUL1IzdGpHRTJqdS9Zakw2UGQ5cytTOVNTYWUwRUhQQVZBOVZ6QWVXdlAzTkhuOGdldExTNDlsWC9vR1cyR2JUWlg0L3dFa3FHeWhwam5mcGxWRHFSTUYzNCsrNXBKcHFpY3NRTTNKSnJ4Nm51c2pLVDMwclFYMTB0NmViTUFiTStVaFVzZ3lJWnIwUDB0TUQ2WjN2YXRMdUR6Nzlwckt3b09MNlgvNnJnVk5nNE84VzhVNmR5ODRTc2JvOHIxYmRKelR0M3NOdStUK2VWaStWeW4wUGxhVDdONWFuSWRibW9oOGNiYTkwRmMxaWhsUVNpSE1YcjMzUUJuRlBod3VPaVdzUVRSR29CQVRMOGpFNk5talQzS21kc1BaY1FNVjNtcDZrY3JFUjdJWnVyZWhDWlcwRE82Z1BFbUFndHJvQVRvdWtFVnppODFSdzhxSkZncHRIeDd1UkRxQWIwVzlkY2lOWGJreitEc1VQNTdXRStNcVFBTXVKYlluT0hPUWJPcXc2a2NaMnJBaDF2S21ZMzQyeDFYcll0Q1pSbkh3K2hiSy9kUjlBPT0.FwcVM47f9GR_009Nw4mLxYJnf__DHO04PwEaJrAAzy8';
  private url = process.env.NODE_ENV === 'desarrollo' || process.env.NODE_ENV === 'development' ? 'http://services.test.sw.com.mx' : 'https://services.sw.com.mx';
  private user = process.env.NODE_ENV === 'desarrollo' || process.env.NODE_ENV === 'development' ? 'amisael.amir.misael@gmail.com' : 'developers@colegioinglesplaya.com';
  private password = process.env.NODE_ENV === 'desarrollo' || process.env.NODE_ENV === 'development' ? 'sw.amir' : 'S0p0rt3.01';
  private token = process.env.NODE_ENV === 'desarrollo' || process.env.NODE_ENV === 'development' ? this.tokenDev : this.tokenProd;

  constructor() {
    //  this.factura = new FacturacionModerna(this.option);
  }

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
      console.log(xml);
      const obj = {
        url: this.url,
        user: this.user,
        password: this.password,
      };
      const stamp = StampService.Set(obj);
      stamp.StampV4(xml, (err, data) => {
        if (err) {
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

  public async cancelarCSD(options: {
    uuid: string,
    password: string,
    rfc: string,
    cer: string,
    key: string,
  }): Promise<Cancelacion> {
    return new Promise((resolve, reject) => {
      const params = {
        url: this.url,
        token: this.token,
        uuid: options.uuid,
        password: options.password,
        rfc: options.rfc,
        b64Cer: options.cer,
        b64Key: options.key,
      };

      const cancelation = CancelationService.Set(params);
      cancelation.CancelationByCSD((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
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
