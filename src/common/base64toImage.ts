import * as fs from 'fs';

export function base64ToImage(base64Str: string, path: string, optionalObj: any = {}) {

    if (!base64Str || !path) {
        throw new Error('Missing mandatory arguments base64 string and/or path string');
    }
    const imageBuffer = decodeBase64Image(base64Str);
    let imageType: string = optionalObj.type || imageBuffer.type || 'png';
    let fileName: string = optionalObj.fileName || 'img-' + Date.now();
    let abs;
    fileName = '' + fileName;

    if (fileName.indexOf('.') === -1) {
        imageType = imageType.replace('image/', '');
        fileName = fileName + '.' + imageType;
    }

    abs = path + fileName;
    fs.writeFile(abs, imageBuffer.data, 'base64', (err) => {
        if (err && optionalObj.debug) {
            // tslint:disable-next-line:no-console
        }

    });
    return {
        'imageType': imageType,
        'fileName': fileName,
    };
}

interface ImageDecodedB64 {
    type: string;
    data: Buffer;
}

function decodeBase64Image(base64Str: string): ImageDecodedB64 {
    const matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const image: ImageDecodedB64 = {} as ImageDecodedB64;
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string');
    }

    image.type = matches[1];
    image.data = Buffer.from(matches[2], 'base64');

    return image;
}
