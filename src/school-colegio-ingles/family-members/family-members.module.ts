import { Module } from '@nestjs/common';
import { FamilyMembersService } from './family-members.service';
import { FamilyMembersController } from './family-members.controller';

@Module({
  providers: [FamilyMembersService],
  controllers: [FamilyMembersController]
})
export class FamilyMembersModule {}
