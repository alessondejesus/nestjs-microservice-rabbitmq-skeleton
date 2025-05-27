import { Controller } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { EventPattern } from '@nestjs/microservices';
import { AppEntity } from 'src/entities/app.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('example-event-pattern')
  async getAppExamples(): Promise<AppEntity[]> {
    console.log('chegou ca');
    return await this.appService.getAppExamples();
  }
}
