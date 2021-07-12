import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getConnection } from 'typeorm';

export function NotExists(
  entityClass: any,
  field = 'id',
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'NotExists',
      constraints: [entityClass, field],
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: NotExistsRule,
    });
  };
}

@ValidatorConstraint({ name: 'NotExists', async: true })
export class NotExistsRule implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    if (!value) {
      return false;
    }
    try {
      const [entityClass, field] = args.constraints;
      const conn = getConnection('default');
      const repository = conn.getRepository(entityClass);
      const result = await repository.findOne({
        where: {
          [field]: value,
        },
      });
      return result ? false : true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  defaultMessage(args: ValidationArguments) {
    return `${args.property} already exists`;
  }
}
