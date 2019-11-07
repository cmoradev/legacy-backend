import { createClientAsync } from 'soap';
import * as fs from 'fs';
import * as path from 'path';
// import * as moment from 'moment';
import * as moment from 'moment-timezone';
import { WriteStream } from 'fs';
import * as os from 'os';

const defaults = {
  user: 'UsuarioPruebasWS',
  password: 'b9ec2afa3361a59af4b4d102d3f704eabdf097d4',
  path: './comprobantes/',
};

export interface Options {
  UserPass: string;
  UserID: string;
  emisorRFC?: string;
  receptorRFC?: string;
  UUID?: string;
  RFC?: string;
  uuid?: string;
  total?: string;
}

interface SaldoXml {
  key: {
    '$value': 'status';
  };
  value: {
    '$value': '1';
  };
}

interface ObjecErroreCacelar {
  faultcode: string;
  faultstring: string;
}

interface Saldo {
  status: number;
  timbres_asignados: number;
  fecha_alta: string;
  consumidos: number;
  restante: number;
}

export class FacturacionModerna {
  url: string;
  credenciales: object;
  generarCBB: boolean;
  generarPDF: boolean;
  generarTXT: boolean;
  path: string;
  public options: Options = {} as Options;
  public debug: number = 0;

  constructor(url: string, options: Options, debug: number = 0) {
    this.url = url;
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        this.options[key] = options[key];
      }
    }
    this.debug = debug;
  }

  public consultarSaldo(rfc: string) {
    return new Promise(async (resolve, reject) => {
      const cliente = await createClientAsync(this.url);
      try {
        this.options.RFC = rfc;
        const le = await cliente.consultarSaldoAsync({ parameter: this.options });
        const saldo: SaldoXml[] = le[0].return.item;
        const obj: Saldo | any = {} as Saldo;
        for (const dato of saldo) {
          obj[dato.key.$value] = dato.value.$value;
        }
        obj.restante = obj.timbres_asignados - obj.consumidos;
        resolve(obj);
      } catch (e) {
        if (this.debug === 1) {
          this.log('SOAP request:\t' + cliente.lastRequest.toString('utf8'));
          this.log('SOAP response:\t' + cliente.lastResponse.toString('utf8'));
        }
        reject(e);
      }
    });
  }

  /**
   * Cancelar comprobante
   * @param {String} rfcEmisor
   * @param {String} uuid
   */
  cancelar(emisorRFC: string, uuid: string): Promise<{ Code, Message }> {
    return new Promise(async (resolve, reject) => {
      const cliente = await createClientAsync(this.url);
      try {
        this.options.emisorRFC = emisorRFC;
        this.options.uuid = uuid;
        const resultado = await cliente.requestCancelarCFDIAsync({ parameter: this.options });
        const data = resultado[0].return;
        const result: any = {};
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            result[key] = data[key].$value;
          }
        }
        resolve(result);
      } catch (e) {
        if (this.debug === 1) {
          this.log('SOAP request:\t' + cliente.lastRequest.toString('utf8'));
          this.log('SOAP response:\t' + cliente.lastResponse.toString('utf8'));
        }
        let error: any;

        if (e.root) {
          error = e.root;
          error = error.Envelope;
          error = error.Body;
          error = error.Fault;
        } else {
          error = 'desconocido';
        }
        reject({ message: error });
      }
    });
  }

  async estadoCancelacion(emisorRFC: string, receptorRFC: string, UUID: string, total: string): Promise<{ http_code, estado, esCancelable, estatusCancelacion, EstatusFM }> {
    return new Promise(async (resolve, reject) => {
      const cliente = await createClientAsync(this.url);
      try {
        this.options.emisorRFC = emisorRFC;
        this.options.receptorRFC = receptorRFC;
        this.options.UUID = UUID;
        this.options.total = total;
        const resultado: any[] = await cliente.consultarEstatusCFDIAsync({ parameter: this.options });
        const data = resultado[0].return;
        const result: any = {};
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            result[key] = data[key].$value ? data[key].$value : 'No disponible';
          }
        }
        resolve(result);
      } catch (error) {
        if (this.debug === 1) {
          this.log('SOAP request:\t' + cliente.lastRequest.toString('utf8'));
          this.log('SOAP response:\t' + cliente.lastResponse.toString('utf8'));
        }
        reject({ message: error });
      }
    });
  }

  async log(text: string) {
    const log = path.join(__dirname, '..', '..', '..', 'src', 'common', 'FacturacionModerna', 'log.log');
    if (!fs.existsSync(log)) {
      const fullPath = path.join(os.tmpdir(), `amir.xml`);
      fs.writeFileSync(log, '', 'utf8');
    }
    const fecha = moment().tz('America/Mexico_City').format('YYYY-MM-DDThh:mm:ss') + '\t' + text + '\n\n';
    fs.appendFileSync(log, fecha);
  }

}
