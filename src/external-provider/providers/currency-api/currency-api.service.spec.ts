import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyApiService } from './currency-api.service';

describe('CurrencyApiService', () => {
  let service: CurrencyApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyApiService],
    }).compile();

    service = module.get<CurrencyApiService>(CurrencyApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
