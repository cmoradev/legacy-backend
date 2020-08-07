import { StampService, Authentication, CancelationService } from 'sw-sdk-nodejs';

export class FactSw {

    private url = process.env.NODE_ENV === 'desarrollo' || process.env.NODE_ENV === 'development' ? 'http://services.test.sw.com.mx' : 'https://services.sw.com.mx';
    private user = process.env.NODE_ENV === 'desarrollo' || process.env.NODE_ENV === 'development' ? 'amisael.amir.misael@gmail.com' : 'developers@colegioinglesplaya.com';
    private password = process.env.NODE_ENV === 'desarrollo' || process.env.NODE_ENV === 'development' ? 'sw.amir' : 'Web/1507*deV';

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
            // console.log(xml);
            const obj = {
                url: this.url,
                user: this.user,
                password: this.password,
            };
            console.log(obj);
            const stamp = StampService.Set(obj);
            stamp.StampV4(xml, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    // console.log(data);
                    resolve(data);
                }
            });
        });
    }

    public async cancelarCSD(options: {
        token: string,
        uuid: string,
        password: string,
        rfc: string,
        cer: string,
        key: string,
    }): Promise<Cancelacion> {
        return new Promise((resolve, reject) => {
            const params = {
                url: this.url,
                token: options.token,
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
