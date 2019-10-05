import { Module } from '@nestjs/common';
import { FixedAssetsAssignmentsService } from './fixed-assets-assignments.service';
import { FixedAssetsAssignmentsController } from './fixed-assets-assignments.controller';

@Module({
  providers: [FixedAssetsAssignmentsService],
  controllers: [FixedAssetsAssignmentsController]
})
export class FixedAssetsAssignmentsModule {}
