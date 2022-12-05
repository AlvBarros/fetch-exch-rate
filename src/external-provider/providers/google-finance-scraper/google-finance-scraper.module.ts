import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GoogleFinanceScraperService } from './google-finance-scraper.service';

@Module({
  imports: [HttpModule],
  providers: [GoogleFinanceScraperService]
})
export class GoogleFinanceScraperModule {}
