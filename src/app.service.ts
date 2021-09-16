import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from './common/config/config.service';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import * as Path from 'path';
import * as fs from 'fs';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {
  }

  getHello(): string {
    return 'Hello World! ' + this.configService.get('APP_NAME');
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
    //     console.log(d);
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
}
