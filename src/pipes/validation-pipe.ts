import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Type,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class MicroValidationPipe implements PipeTransform<any> {
  transform(value: any, metadata: ArgumentMetadata): any {
    const { metatype } = metadata;
    console.log('chegou aqui');
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value) as Type[];
    const errors: ValidationError[] = validateSync(object);

    if (!errors) {
      return value;
    }
    const errorsObj: object = errors.reduce(
      (result: object, error: ValidationError) => {
        if (error.constraints) {
          result[error.property] = Object.values(error.constraints).join(', ');
        }
        return result;
      },
      {} as object,
    );

    console.log('euu');

    if (!errorsObj) {
      return value;
    }

    throw new RpcException({
      statusCode: 400,
      message: errorsObj,
    });
  }

  private toValidate(metatype: Type): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(
      metatype as
        | StringConstructor
        | BooleanConstructor
        | NumberConstructor
        | ArrayConstructor
        | ObjectConstructor,
    );
  }
}
