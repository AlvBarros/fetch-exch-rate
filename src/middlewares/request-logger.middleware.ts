import { Injectable, NestMiddleware, Logger } from "@nestjs/common";

import { Request, Response, NextFunction } from "express";

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger("HTTP");

  use(request: Request, response: Response, next: NextFunction): void {
    response.on("finish", () => {
      const { statusCode, req } = response;

      this.logger.log(
        `${req.method} @ ${req.url} : ${statusCode}`
      );
    });
    next();
  }
}
