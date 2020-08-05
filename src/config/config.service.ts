import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';

export interface EnvConfig {
    [key: string]: any;
}

export type NodeEnv = 'development' | 'production' | 'test' | 'staging';

export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(filePath: string) {
        console.log('varible de entorno ' + filePath);
        const config = dotenv.parse(fs.readFileSync(filePath));
        // this.envConfig = this.validateInput(config);
        this.envConfig = this.validateInput(config);
    }

    /**
     * Valida los campos por medio de Joi y ejecutará un error
     * en el caso de que no cumpla la validación
     * @return EnvConfig
     * @param envConfig
     */
    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            API_PORT: Joi.number().default(3000),
            APP_NAME: Joi.string(),
            API_HOST: Joi.string().default('0.0.0.0'),
            API_AUTH_ENABLED: Joi.boolean().default(true),
            API_SECRET: Joi.string(),
            DB_DBNAME_CONNECTION: Joi.string(),
            DB_DBNAME_COLEGIO_INGLES: Joi.string(),
            DB_USERNAME_COLEGIO_INGLES: Joi.string(),
            DB_PASSWORD_COLEGIO_INGLES: Joi.string(),
            DB_PORT_COLEGIO_INGLES: Joi.number(),
            DB_HOST_COLEGIO_INGLES: Joi.string(),
            DB_SYNCHRONIZE_COLEGIO_INGLES: Joi.boolean(),
        });
        const { error, value: validatedEnvConfig } = envVarsSchema.validate(
            envConfig,
        );

        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }

    /**
     * Obtener la variable de entorno de node.
     * @return NodeEnv
     */
    public nodeEnvironment(): NodeEnv {
        const nodeEnvSchema = Joi.string()
            .valid('development', 'production', 'desarrollo', 'test', 'staging', 'refaccionaria', 'tortilleria', 'rancho')
            .default('development');
        const { error, value: nodeEnv } = nodeEnvSchema.validate(process.env.NODE_ENV as NodeEnv);

        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return nodeEnv;
    }

    /**
     * Retorna si la plataforma está en producción
     * @return boolean
     */
    get isProduction(): boolean {
        return this.nodeEnvironment() === 'production';
    }

    /**
     * Retorna si la autenticación de la API está habilitada
     * @return boolean
     */
    get isApiAuthEnabled(): boolean {
        return Boolean(this.envConfig.API_AUTH_ENABLED);
    }

    /**
     * Retorna si la sincronización de la base de datos está habilitada
     * @return boolean
     */
    get isSynchronizeDBEnabled(): boolean {
        return Boolean(this.envConfig.DB_SYNCHRONIZE_COLEGIO_INGLES);
    }

    /**
     * Obtener un valor de las variables de entorno
     * @param key
     * @return T
     */
    public get<T = any>(key: string): T {
        return this.envConfig[key];
    }
}
