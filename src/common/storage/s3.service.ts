import {
  GetObjectCommand,
  GetObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Readable } from 'stream';
import { ConfigService } from '../config/config.service';
import { PutObjectOptions, StoredFile } from './types';

@Injectable()
export class S3Service {
  private readonly _s3Client: S3Client;
  private readonly _bucketName: string;
  private readonly _s3Folder: string;

  constructor(private readonly _config: ConfigService) {
    this._s3Client = new S3Client({
      credentials: {
        accessKeyId: this._config.getS3AccessKeyId(),
        secretAccessKey: this._config.getS3SecretAccessKey(),
      },
      region: this._config.getS3Region(),
    });

    this._bucketName = this._config.getS3BucketName();
    this._s3Folder = this._config.getS3Folder();
  }

  get client(): S3Client {
    return this._s3Client;
  }

  get bucketName(): string {
    return this._bucketName;
  }

  private _buildKey(key: string): string {
    return this._s3Folder ? `${this._s3Folder}/${key}` : key;
  }

  public async putObjectCommand(
    options: PutObjectOptions,
  ): Promise<StoredFile> {
    if (!this._s3Folder) {
      throw new BadRequestException(
        'S3_FOLDER no está configurado. No se pueden subir archivos sin un folder destino.',
      );
    }
    const { type, buffer, key } = options;
    const fullKey = this._buildKey(key);
    const params: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Key: fullKey,
      Body: buffer,
      ContentType: type,
    };
    const command = new PutObjectCommand(params);
    try {
      await this.client.send(command);
      return { key, type, size: buffer.length };
    } catch (error) {
      throw new HttpException(
        `Failed to upload file: ${key}-${type}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getObjectCommand(filename: string): Promise<Buffer> {
    try {
      const params: GetObjectCommandInput = {
        Bucket: this.bucketName,
        Key: this._buildKey(filename),
      };
      const command = new GetObjectCommand(params);
      const object = await this.client.send(command);
      if (object.Body instanceof Readable) {
        return this._streamToBuffer(object.Body);
      } else {
        throw new Error(`Unexpected response body type ${filename}`);
      }
    } catch (error) {
      console.error(`Error retrieving file from S3: ${filename}`, error);
      throw error;
    }
  }

  private async _streamToBuffer(stream: Readable): Promise<Buffer> {
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  }
}