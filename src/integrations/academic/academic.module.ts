import { HttpModule, Module } from '@nestjs/common';
import { AcademicService } from './academic.service';

@Module({
  imports: [ HttpModule ],
  providers: [AcademicService],
  exports: [ AcademicService ],

})
export class AcademicModule {}
