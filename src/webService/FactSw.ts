import { StampService, Authentication } from 'sw-sdk-nodejs';

export class FactSw {

    private url = 'http://services.test.sw.com.mx';
    private user = 'demo';
    private password = '123456789';

    constructor() {
        //  this.factura = new FacturacionModerna(this.option);
    }

    getToken() {
        return new Promise((resolve, reject) => {


            const obj = {
                url: 'http://services.test.sw.com.mx',
                user: 'demo',
                password: '123456789',
            };

            const auth = Authentication.auth(obj);
            auth.Token((err, data) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log(data);
                    resolve(data);
                }
            });
        });
    }

    public async facturar(xml: string): Promise<StampV4> {
        return new Promise((resolve, reject) => {
            // console.log(xml);
            const obj = {
                url: this.url,
                user: 'amisael.amir.misael@gmail.com',
                password: 'sw.amir',
            };
            const stamp = StampService.Set(obj);
            stamp.StampV4(xml, (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    // console.log(data);
                    resolve(data);
                }
            });
        });
    }
}

interface StampV4 {
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
