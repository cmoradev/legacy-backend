import { Test, TestingModule } from '@nestjs/testing';
import { ResponsiveLettersController } from './responsive-letters.controller';

describe('ResponsiveLetters Controller', () => {
  let controller: ResponsiveLettersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResponsiveLettersController],
    }).compile();

    controller = module.get<ResponsiveLettersController>(ResponsiveLettersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
