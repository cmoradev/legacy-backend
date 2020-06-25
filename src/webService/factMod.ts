import { FacturacionModerna } from 'invoice-modern';
import { OptionsFactMod } from 'invoice-modern/lib/interfaces/FactMod';

export class FactMod {
    option: OptionsFactMod = {
        UserPass: 'b9ec2afa3361a59af4b4d102d3f704eabdf097d4',
        UserID: 'UsuarioPruebasWS',
        debug: 1,
        develoment: true,
    };
    factura: FacturacionModerna;

    constructor() {
        this.factura = new FacturacionModerna(this.option);
    }

    public async facturar(xml: any, rfc: string) {
        try {

            const res = await this.factura.timbrar({
                emisorRFC: 'XAMA620210DQ5',
                generarCBB: true,
                generarPDF: true,
                generarTXT: true,
                text2CFDI: xml,
            });
            const dirPath = '/var/www/pdc/comprobantes/tienda/';
            await this.factura.saveFile(res.xml, dirPath, `${res.uuid}.xml`);
            await this.factura.saveFile(res.pdf, dirPath, `${res.uuid}.pdf`);
            await this.factura.saveFile(res.png, dirPath, `${res.uuid}.png`);
            await this.factura.saveFile(res.txt, dirPath, `${res.uuid}.txt`);
            return res;
        } catch (e) {
            console.log(e);
            return e;
        }
    }
}
