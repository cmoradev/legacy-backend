import { Request } from 'express';

export interface RequestPayload<T = any> extends Request {
    payload: T;
}
