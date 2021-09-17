import { parse } from 'dotenv';
import { existsSync, readFileSync } from 'fs';

export interface EnvConfig {
    [key: string]: any;
}

export type NodeEnv = 'development' | 'production' | 'staging';

export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(filePath: string) {
        const envFilePath = __dirname + `/../../../${process.env.NODE_ENV}.env`;
        const existPath = existsSync(envFilePath);
        if (!existPath) {
            throw new Error(`${envFilePath} file do not exist`);
        }
        this.envConfig = parse(readFileSync(filePath));
    }

    /**
     * Obtener un valor de las variables de entorno
     * @param key
     * @return T
     */
    public get<T = any>(key: string): T {
        return this.envConfig[key];
    }

    public getPath(): string {
        return this.envConfig.INVOICES_PATH as string;
    }
}
