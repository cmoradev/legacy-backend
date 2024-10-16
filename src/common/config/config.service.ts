import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';
import { connections } from './config.env';

export interface EnvConfig {
  [key: string]: any;
}

export type NodeEnv = 'development' | 'production' | 'test' | 'staging';

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
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
      API_AUTH_ENABLED: Joi.boolean().default(true),
      API_SECRET: Joi.string(),
      DB_DBNAME_CONNECTION: Joi.string(),
      DB_DBNAME: Joi.string(),
      DB_USERNAME: Joi.string(),
      DB_PASSWORD: Joi.string(),
      DB_PORT: Joi.number(),
      DB_HOST: Joi.string(),
      DB_SYNCHRONIZE: Joi.boolean(),
      API_MAIL: Joi.string(),
      API_MAIL_PASSWORD: Joi.string(),
      INVOICES_PATH: Joi.string(),
      XSLT: Joi.string(),
      ASSETS_PATH: Joi.string(),
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
  public nodeEnvironment(): { isProduction: boolean; env: NodeEnv } {
    const nodeEnvSchema = Joi.string()
      .valid(...connections)
      .default('development');
    const { error, value: nodeEnv } = nodeEnvSchema.validate(
      process.env.NODE_ENV as NodeEnv,
    );

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    const resultado = {
      isProduction: false,
      env: nodeEnv,
    };
    if (
      nodeEnv === 'development' ||
      nodeEnv === 'test' ||
      nodeEnv === 'desarrollo' ||
      nodeEnv === 'staging'
    ) {
      resultado.isProduction = false;
    } else {
      resultado.isProduction = true;
    }
    return resultado;
  }

  /**
   * Retorna si la plataforma está en producción
   * @return boolean
   */
  get isProduction(): boolean {
    return this.nodeEnvironment().isProduction === true;
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
    return Boolean(this.envConfig.DB_SYNCHRONIZE);
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

  public getXsltPath(): string {
    return this.envConfig.XSLT as string;
  }
}
