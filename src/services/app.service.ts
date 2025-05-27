import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppEntity } from 'src/entities/app.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AppEntity)
    private repository: Repository<AppEntity>,
  ) {}

  async getAppExamples(): Promise<AppEntity[]> {
    const entity = this.repository.create();
    await this.repository.save(entity);
    return this.repository.find();
  }
}
