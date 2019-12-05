import { Module } from '@nestjs/common';
import { SystemApplicationFormsService } from './system-application-forms.service';
import { SystemApplicationFormsController } from './system-application-forms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemApplicationForms } from './entities/system-application-forms.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemApplicationForms], 'colegiodb')],
  providers: [SystemApplicationFormsService],
  controllers: [SystemApplicationFormsController],
})
export class SystemApplicationFormsModule {
}
