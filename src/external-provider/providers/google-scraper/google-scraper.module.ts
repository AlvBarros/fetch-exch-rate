import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { GoogleScraperService } from "./google-scraper.service";

@Module({
  imports: [HttpModule],
  providers: [GoogleScraperService],
})
export class GoogleScraperModule {}
