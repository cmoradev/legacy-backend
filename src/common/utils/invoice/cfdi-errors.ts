import {
    CfdiError,
    CfdiErrorCode,
} from '@munyaal/cfdi';
import {
    BadRequestException,
    HttpException,
    InternalServerErrorException,
} from '@nestjs/common';

/**
 * Códigos de `CfdiError` que representan datos de entrada inválidos
 * (valores faltantes o fuera de contrato). Estos se exponen al
 * consumidor como `400 Bad Request` porque la causa es corregible
 * desde el payload enviado.
 */
const CFDI_VALIDATION_CODES: string[] = [
    CfdiErrorCode.XmlRequiredAttribute,   // ERROR: 005
    CfdiErrorCode.XmlRequiredElement,     // ERROR: 006
    CfdiErrorCode.XmlInvalidAttribute,    // ERROR: 011
];

export interface CfdiErrorPayload {
    ok: boolean;
    code: string;
    process: string;
    message: string;
    suggestions: string[];
    stack?: string;
}

export const isCfdiError = (err: unknown): err is CfdiError => {
    return err instanceof CfdiError;
};

export const normalizeCfdiError = (err: unknown): CfdiErrorPayload => {
    if (isCfdiError(err)) {
        return {
            ok: false,
            code: err.code,
            process: err.process,
            message: err.message,
            suggestions: [...err.suggestions],
            stack: err.stack,
        };
    }

    return {
        ok: false,
        code: 'UNKNOWN_ERROR',
        process: 'invoice',
        message: err instanceof Error ? err.message : String(err),
        suggestions: [],
        stack: err instanceof Error ? err.stack : undefined,
    };
};

export const isCfdiValidationError = (err: unknown): boolean => {
    return (
        isCfdiError(err) &&
        CFDI_VALIDATION_CODES.includes(err.code)
    );
};

/**
 * Convierte un error (de preferencia `CfdiError`) en una excepción de
 * Nest con el status HTTP adecuado:
 *  - Errores de validación de datos (005/006/011) → `400 BadRequestException`.
 *  - Errores operativos (certificado / openssl / asset / FS / sellado) →
 *    `500 InternalServerErrorException`; el detalle se registra en logs
 *    (`console.log`) por el controller y el payload no expone `cause`.
 *  - Cualquier otro error → `500 InternalServerErrorException`.
 *
 * El payload es estable (`CfdiErrorPayload`), así todos los
 * controllers responden con la misma forma.
 */
export const cfdiErrorToHttpException = (err: unknown): HttpException => {
    if (err instanceof HttpException) {
        return err;
    }

    const payload = normalizeCfdiError(err);

    if (isCfdiValidationError(err)) {
        return new BadRequestException(payload);
    }

    return new InternalServerErrorException(payload);
};
