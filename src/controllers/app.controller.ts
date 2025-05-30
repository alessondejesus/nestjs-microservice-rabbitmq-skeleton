import { Controller, UsePipes } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppEntity } from 'src/entities/app.entity';
import { CreateValidationPipeDTO } from 'src/dtos/create-validation-pipe.dto';
import { MicroValidationPipe } from 'src/pipes/validation-pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('example-event-pattern')
  @UsePipes(new MicroValidationPipe())
  async getAppExamples(example: CreateValidationPipeDTO): Promise<AppEntity[]> {
    console.log(example);
    return await this.appService.getAppExamples();
  }

  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]): number {
    console.log('message patternx');
    return (data || []).reduce((a, b) => a + b);
  }
}
