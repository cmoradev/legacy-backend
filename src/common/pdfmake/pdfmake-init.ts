import { pdfMake } from 'pdfmake/build/vfs_fonts';

/**
 * Inicialización única de `pdfMake.vfs` y `pdfMake.fonts`.
 *
 * `pdfmake/build/vfs_fonts` únicamente expone los TTF en base64, pero
 * `createPdf(...)` resuelve los nombres de familia tipográfica desde un
 * objeto `pdfMake` global. Sin estas asignaciones las variantes
 * bold/italics caen silenciosamente a la cara regular (o lanzan un
 * error no controlado en tiempo de renderizado).
 *
 * Este módulo se ejecuta al importarse gracias a la IIFE inferior, lo
 * que evita depender del orden en que cada consumidor de `pdfmake` sea
 * cargado por el bundler/runtime de Nest. Basta con que cualquier
 * consumidor pdfmake relevante haga `import './pdfmake-init';` (o que
 * el módulo raíz lo cargue una vez) para que el resto del código
 * pueda confiar en `global.pdfMake.vfs` y `global.pdfMake.fonts`.
 */

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface Global {
            pdfMake: {
                vfs?: { [file: string]: string };
                fonts?: unknown;
            };
        }
    }
}

(function initPdfMake(): void {
    const w = global as any;
    w.pdfMake = w.pdfMake || {};
    w.pdfMake.vfs = pdfMake.vfs;
    w.pdfMake.fonts = {
        Roboto: {
            normal: 'Roboto-Regular.ttf',
            bold: 'Roboto-Medium.ttf',
            italics: 'Roboto-Italic.ttf',
            bolditalics: 'Roboto-MediumItalic.ttf',
        },
    };
})();

export {};
