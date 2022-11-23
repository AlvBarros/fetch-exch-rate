import { HttpService } from "@nestjs/axios";

export interface IExternalProvider {
    httpService: HttpService;
    
    getCurrentExchangeRate(from: string, to: string);
}