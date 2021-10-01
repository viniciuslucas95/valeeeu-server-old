import { randomUUID } from 'crypto';
import { BaseModel } from '../entities/models';
import { IRepository } from '../repositories/interfaces';

export abstract class BaseService<T extends BaseModel> {
  constructor(private readonly baseRepository: IRepository<T>) {}

  protected async generateBaseModel() {
    const newId = await this.generateNewIdAsync();
    const currentDate = this.getCurrentDate();
    return { newId, currentDate };
  }

  protected getCurrentDate() {
    return new Date();
  }

  protected generateNewId() {
    return randomUUID().replace(/[-]/gm, '');
  }

  private async generateNewIdAsync() {
    let newId = this.generateNewId();
    while (await this.baseRepository.checkExistanceByIdAsync(newId))
      newId = this.generateNewId();
    return newId;
  }
}
