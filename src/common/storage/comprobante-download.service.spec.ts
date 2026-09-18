import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ComprobanteDownloadService } from './comprobante-download.service';
import { S3Service } from './s3.service';
import { FactSw } from '../../webService/FactSw';

describe('ComprobanteDownloadService', () => {
  let service: ComprobanteDownloadService;
  let s3Service: jest.Mocked<S3Service>;

  const noSuchKeyError = (): Error => {
    const err: any = new Error('NoSuchKey');
    err.name = 'NoSuchKey';
    err.Code = 'NoSuchKey';
    err.$metadata = { httpStatusCode: 404 };
    return err;
  };

  const notFoundError = (): Error => {
    const err: any = new Error('NotFound');
    err.name = 'NotFound';
    err.Code = 'NotFound';
    err.$metadata = { httpStatusCode: 404 };
    return err;
  };

  const http404Error = (): Error => {
    const err: any = new Error('Not Found');
    err.$metadata = { httpStatusCode: 404 };
    return err;
  };

  const permissionError = (): Error => {
    const err: any = new Error('AccessDenied');
    err.name = 'AccessDenied';
    err.Code = 'AccessDenied';
    err.$metadata = { httpStatusCode: 403 };
    return err;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComprobanteDownloadService,
        {
          provide: S3Service,
          useValue: {
            getObjectCommand: jest.fn(),
          },
        },
        {
          provide: FactSw,
          useValue: {
            getXmlByUuidValidated: jest.fn(),
            getXmlByUuid: jest.fn(),
            validateCfdi: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ComprobanteDownloadService>(ComprobanteDownloadService);
    s3Service = module.get(S3Service);
  });

  describe('tryGetObject', () => {
    it('returns null when S3 throws NoSuchKey', async () => {
      s3Service.getObjectCommand.mockRejectedValueOnce(noSuchKeyError());
      await expect(service.tryGetObject('comprobantes/colegio/abc.xml')).resolves.toBeNull();
    });

    it('returns null when S3 throws NotFound', async () => {
      s3Service.getObjectCommand.mockRejectedValueOnce(notFoundError());
      await expect(service.tryGetObject('comprobantes/colegio/abc.xml')).resolves.toBeNull();
    });

    it('returns null when S3 returns HTTP 404 without a code', async () => {
      s3Service.getObjectCommand.mockRejectedValueOnce(http404Error());
      await expect(service.tryGetObject('comprobantes/colegio/abc.xml')).resolves.toBeNull();
    });

    it('propagates non-not-found errors (e.g. permissions)', async () => {
      s3Service.getObjectCommand.mockRejectedValueOnce(permissionError());
      await expect(service.tryGetObject('comprobantes/colegio/abc.xml')).rejects.toBeDefined();
    });

    it('returns the buffer on success', async () => {
      const buf = Buffer.from('hello');
      s3Service.getObjectCommand.mockResolvedValueOnce(buf);
      await expect(service.tryGetObject('comprobantes/colegio/abc.xml')).resolves.toBe(buf);
    });
  });

  describe('getObjectCaseInsensitive', () => {
    const uuid = 'AbCdEf-1234';

    it('returns the buffer when the uuid is stored in lower case with lower suffix', async () => {
      const buf = Buffer.from('lower');
      s3Service.getObjectCommand.mockImplementation(async (key: string) => {
        if (key === `comprobantes/colegio/${uuid.toLowerCase()}.xml`) {
          return buf;
        }
        throw noSuchKeyError();
      });

      await expect(
        service.getObjectCaseInsensitive('colegio', uuid, '.xml'),
      ).resolves.toBe(buf);
    });

    it('returns the buffer when only the upper-case uuid variant exists', async () => {
      const buf = Buffer.from('upper');
      s3Service.getObjectCommand.mockImplementation(async (key: string) => {
        if (key === `comprobantes/colegio/${uuid.toUpperCase()}.xml`) {
          return buf;
        }
        throw noSuchKeyError();
      });

      await expect(
        service.getObjectCaseInsensitive('colegio', uuid, '.xml'),
      ).resolves.toBe(buf);
    });

    it('returns the buffer when only the upper-case suffix variant exists', async () => {
      const buf = Buffer.from('upper-suffix');
      s3Service.getObjectCommand.mockImplementation(async (key: string) => {
        if (key === `comprobantes/colegio/${uuid.toLowerCase()}-ACUSE.XML`) {
          return buf;
        }
        throw noSuchKeyError();
      });

      await expect(
        service.getObjectCaseInsensitive('colegio', uuid, '-acuse.xml'),
      ).resolves.toBe(buf);
    });

    it('returns the buffer when uuid is upper and suffix is upper', async () => {
      const buf = Buffer.from('upper-upper');
      s3Service.getObjectCommand.mockImplementation(async (key: string) => {
        if (key === `comprobantes/colegio/${uuid.toUpperCase()}-ACUSE.XML`) {
          return buf;
        }
        throw noSuchKeyError();
      });

      await expect(
        service.getObjectCaseInsensitive('colegio', uuid, '-acuse.xml'),
      ).resolves.toBe(buf);
    });

    it('returns null when no variant exists in S3', async () => {
      s3Service.getObjectCommand.mockRejectedValue(noSuchKeyError());

      await expect(
        service.getObjectCaseInsensitive('colegio', uuid, '.xml'),
      ).resolves.toBeNull();
      expect(s3Service.getObjectCommand).toHaveBeenCalledTimes(4);
    });

    it('avoids duplicate S3 calls when uuid or suffix is identical after case-folding', async () => {
      s3Service.getObjectCommand.mockRejectedValue(noSuchKeyError());

      await expect(
        service.getObjectCaseInsensitive('colegio', '1234', '.xml'),
      ).resolves.toBeNull();
      expect(s3Service.getObjectCommand).toHaveBeenCalledTimes(2);
    });

    it('propagates real S3 errors (not 404) and stops trying variants', async () => {
      s3Service.getObjectCommand.mockRejectedValue(permissionError());

      await expect(
        service.getObjectCaseInsensitive('colegio', uuid, '.xml'),
      ).rejects.toBeDefined();
      expect(s3Service.getObjectCommand).toHaveBeenCalledTimes(1);
    });
  });

  describe('requireObjectCaseInsensitive', () => {
    it('returns the buffer when a matching variant exists', async () => {
      const buf = Buffer.from('xml-content');
      s3Service.getObjectCommand.mockImplementation(async (key: string) => {
        if (key === 'comprobantes/tienda/abcdef-1234.XML') {
          return buf;
        }
        throw noSuchKeyError();
      });

      await expect(
        service.requireObjectCaseInsensitive('tienda', 'ABCDEF-1234', '.xml'),
      ).resolves.toBe(buf);
    });

    it('throws NotFoundException when no variant exists', async () => {
      s3Service.getObjectCommand.mockRejectedValue(noSuchKeyError());

      await expect(
        service.requireObjectCaseInsensitive('notas-credito', 'no-uuid', '-acuse.xml'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
