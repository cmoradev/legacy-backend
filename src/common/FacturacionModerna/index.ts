import { createClientAsync } from 'soap';
import * as fs from 'fs';

const defaults = {
  user: 'UsuarioPruebasWS',
  password: 'b9ec2afa3361a59af4b4d102d3f704eabdf097d4',
  path: './comprobantes/',
};

export interface Options {
  UserPass: string;
  UserID: string;
  emisorRFC: string;
  receptorRFC?: string;
  total?: string;
}

export class FacturacionModerna {
  url: string;
  credenciales: object;
  generarCBB: boolean;
  generarPDF: boolean;
  generarTXT: boolean;
  path: string;
  public options: Options = {} as Options;
  public debug: number = 1;

  constructor(url: string, options: Options) {
    this.url = url;
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        this.options[key] = options[key];
      }
    }
  }

  public timbrar(cfdi: any, opciones: any[] = [{ 'generarCBB': false }, { 'generarTXT': false }, { 'generarPDF': false }]) {
    return new Promise(async (resolve, reject) => {
      resolve(9);
    });
  }

  public consultarSaldo() {
    return new Promise(async (resolve, reject) => {
      const cliente = await createClientAsync(this.url)
      console.log(cliente);
      resolve(9);
    });
  }

  public activarCancelacion(rfc: any, pathCer: any, pathKey: any, password: any, callback: any) {
    const amir = 0;
  }

  /**
   * Cancelar comprobante
   * @param {String} rfcEmisor
   * @param {String} uuid
   */
  cancelar(rfc: any, uuid: any, callback: any) {
    const amir = 0;
  }

  /**
   * Indicar el directorio en donde se almacenarán los archivos
   * @param {String} path
   * @return void
   */
  establecerDirectorio(path: any) {
    this.path = path;
  }

  /**
   * Indicar si se escribiran los archivos al finalizar el timbrado
   * @param {Boolean} flag
   * @return void
   */
  escribirArchivos(flag: any) {
    this.escribirArchivos = flag;
  }

  /**
   * Indicar si se guardara el archivo PDF
   * @param {Boolean} flag
   * @return void
   */
  generarpdf(flag: any) {
    this.generarPDF = flag;
  }

  /**
   * Indicar si se guardara el archivo CBB (png)
   * @param {Boolean} flag
   * @return void
   */
  generarcbb(flag) {
    this.generarCBB = flag;
  }

  /**
   * Indicar si se guardara el archivo TXT
   * @param {Boolean} flag
   * @return void
   */
  generartxt(flag: any) {
    this.generarTXT = flag;
  }

  /**
   * Decodificar los errores del soap fault
   * @param {String} body
   * @return {Object}
   */
  decodeErrors(body: any) {
    const fcode = /\<faultcode\>(.*)\<\/faultcode\>/g;
    const fstring = /\<faultstring\>(.*)\<\/faultstring\>/g;

    const matchcode: any = fcode.exec(body);
    const matchstring: any = fstring.exec(body);

    return {
      code: matchcode[0].replace('<faultcode>', '').replace('</faultcode>', ''),
      string: matchstring[0].replace('<faultstring>', '').replace('</faultstring>', ''),
    };
  }

  /**
   * Escribir archivos
   * @param {String} filename
   * @param {String} conent
   * @return void
   */
  _writeFile(filename, content) {
    if (!this.escribirArchivos) {
      return false;
    }

    fs.writeFile(this.path + filename, new Buffer(content, 'base64'), (err) => {
      if (err) {
        console.log(`Ocurrio un error al escribir el archivo ${filename}`);
      }
    });
  }

  /**
   * Leer un archivo y convertirlo a base64
   * @param {String} path
   * @return {String}
   */
  _readFile(path: any) {
    return fs.readFileSync(path).toString('base64');
  }
}
