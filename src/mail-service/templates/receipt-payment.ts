// @ts-ignore
import * as mjml2html from 'mjml';

interface MJMLParseError {
    line: number;
    message: string;
    tagName: string;
    formattedMessage: string;
}

interface MJMLParseResults {
    html: string;
    errors: MJMLParseError[];
}

export const receiptPayment = (): MJMLParseResults => {
    return mjml2html(`
<mjml>
  <mj-body background-color="#ccd3e0" font-size="13px">
    <mj-section background-color="#fff" padding-bottom="20px" padding-top="20px">
      <mj-column width="100%">
        <mj-image src="https://ci-control.telweb.app/img/logotienda.876b2cb8.png" alt="" align="center" border="none" width="100px" padding-left="0px" padding-right="0px" padding-bottom="10px" padding-top="10px" />
        <mj-text align="center" font-size="20px">Tienda Escolar del Colegio Inglés</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#356cc7" padding-bottom="5px" padding-top="0">
      <mj-column width="100%">
        <mj-divider border-color="#ffffff" border-width="2px" border-style="solid" padding-left="20px" padding-right="20px" padding-bottom="0px" padding-top="0"></mj-divider>
        <mj-text align="center" color="#FFF" font-size="13px" font-family="Helvetica" padding-left="25px" padding-right="25px" padding-bottom="28px" padding-top="28px"><span style="font-size:20px; font-weight:bold">Muchas gracias por su pago</span>
          <br/>
          <span style="font-size:15px">Adjuntos a este correo le enviamos su factura electrónica y archivo XML</span></mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#568feb" padding-bottom="15px">
      <mj-column>
        <mj-text align="center" color="#FFF" font-size="15px" font-family="Ubuntu, Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" padding-bottom="0px"><strong>Folio de pago</strong></mj-text>
        <mj-text align="center" color="#FFF" font-size="13px" font-family="Helvetica" padding-left="25px" padding-right="25px" padding-bottom="20px" padding-top="10px">{{OrderNumber}}</mj-text>
      </mj-column>
      <mj-column>
        <mj-text align="center" color="#FFF" font-size="15px" font-family="Ubuntu, Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" padding-bottom="0px"><strong>Fecha de pago</strong></mj-text>
        <mj-text align="center" color="#FFF" font-size="13px" font-family="Helvetica" padding-left="25px" padding-right="25px" padding-bottom="20px" padding-top="10px">{{OrderDate}}</mj-text>
      </mj-column>
      <mj-column>
        <mj-text align="center" color="#FFF" font-size="15px" font-family="Ubuntu, Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" padding-bottom="0px"><strong>Monto total</strong></mj-text>
        <mj-text align="center" color="#FFF" font-size="13px" font-family="Helvetica" padding-left="25px" padding-right="25px" padding-bottom="20px" padding-top="10px">{{TotalPrice}}</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#356cc7" padding-bottom="5px" padding-top="0">
      <mj-column width="100%">
        <mj-divider border-color="#ffffff" border-width="2px" border-style="solid" padding-left="20px" padding-right="20px" padding-bottom="10px" padding-top="0"></mj-divider>
    </mj-section>
  </mj-body>
</mjml>
`);
};
