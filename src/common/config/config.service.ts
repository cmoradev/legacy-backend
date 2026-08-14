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
    if (filePath && fs.existsSync(filePath)) {
      const config = dotenv.parse(fs.readFileSync(filePath));
      this.envConfig = this.validateInput(config);
    } else {
      this.envConfig = this.validateInput(process.env as EnvConfig);
    }
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
      API_MAIL: Joi.string(),
      API_MAIL_PASSWORD: Joi.string(),
      INVOICES_PATH: Joi.string(),
      S3_ACCESS_KEY_ID: Joi.string().required(),
      S3_SECRET_ACCESS_KEY: Joi.string().required(),
      S3_REGION: Joi.string().required(),
      S3_BUCKET_NAME: Joi.string().required(),
      S3_FOLDER: Joi.string().allow('').default(''),
    }).unknown(true);
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

  /**
   * Retorna el Access Key ID de AWS S3
   * @return string
   */
  public getS3AccessKeyId(): string {
    return this.envConfig.S3_ACCESS_KEY_ID as string;
  }

  /**
   * Retorna el Secret Access Key de AWS S3
   * @return string
   */
  public getS3SecretAccessKey(): string {
    return this.envConfig.S3_SECRET_ACCESS_KEY as string;
  }

  /**
   * Retorna la región de AWS S3
   * @return string
   */
  public getS3Region(): string {
    return this.envConfig.S3_REGION as string;
  }

  /**
   * Retorna el nombre del bucket de S3
   * @return string
   */
  public getS3BucketName(): string {
    return this.envConfig.S3_BUCKET_NAME as string;
  }

  /**
   * Retorna el folder/prefijo dentro del bucket de S3
   * @return string
   */
  public getS3Folder(): string {
    return this.envConfig.S3_FOLDER as string;
  }
}
