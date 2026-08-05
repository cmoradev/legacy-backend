export interface PutObjectOptions {
  type: string;
  buffer: Buffer;
  key: string;
}

export interface StoredFile {
  key: string;
  type: string;
  size: number;
}