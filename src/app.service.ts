import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { getRepository } from 'typeorm';
import { ConfigService } from './common/config/config.service';
import { ColegioDBNameConnection } from './common/databases/colegiodb.service';
import { BranchOfficeSetting } from './system/branch-office-setting/entities/branch-office-setting.entity';

@Injectable()
export class AppService {
  // constructor(private readonly configService: ConfigService) {
  // }

  async getHello(): Promise<string> {
    return 'Hello World! ' // + this.configService.get('APP_NAME');
  }

  private readonly logger = new Logger(AppService.name);

  @Cron('15 * 2 * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 45');
    // axios({
    //   url: 'https://version.muunyal.app/api/version/download/files?file=SaxonHE10-2J.zip', //your url
    //   method: 'GET',
    //   responseType: 'blob',
    //   onDownloadProgress: (d) => {

    //   },// important
    // }).then((response) => {
    //   const path = Path.resolve(__dirname, 'public', '..', '..', '..', 'amir.zip');
    //   const writer = fs.createWriteStream(path);
    //   return new Promise((resolve, reject) => {
    //     response.data.pipe(writer);
    //     writer.on('finish', resolve);
    //     writer.on('error', reject);
    //   });
    // });
  }

  public async generateFactura() {
    const branchOfficeSEttingsRepository = getRepository(BranchOfficeSetting, ColegioDBNameConnection);
  }
}
