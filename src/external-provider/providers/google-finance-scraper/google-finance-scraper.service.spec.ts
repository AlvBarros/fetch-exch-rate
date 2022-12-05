import { Test, TestingModule } from '@nestjs/testing';
import GoogleFinanceScraperService from './google-finance-scraper.service';

describe('GoogleFinanceScraperService', () => {
  let service: GoogleFinanceScraperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleFinanceScraperService],
    }).compile();

    service = module.get<GoogleFinanceScraperService>(GoogleFinanceScraperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
