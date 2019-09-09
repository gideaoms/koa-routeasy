'use strict';

const FValidator = require('fastest-validator');

const HTTP_STATUS_BAD_REQUEST = 400;

class Validator {
  constructor() {
    this._validator = new FValidator();
  }

  run(validations) {
    const validationMiddleware = async (ctx, next) => {
      try {
        this._getAllValidations(ctx, validations).forEach(
          ({ dataSource, validationRules }) => {
            const ValidationResult = this._validator.validate(
              dataSource,
              validationRules
            );

            const isThereErrors = ValidationResult.length;
            if (isThereErrors) {
              throw ValidationResult;
            }
          }
        );

        await next();
      } catch (validationErrors) {
        ctx.status = HTTP_STATUS_BAD_REQUEST;
        ctx.body = validationErrors;
      }
    };

    return validationMiddleware;
  }

  _getAllValidations(ctx, validations) {
    return Object.keys(validations).map(validationFrom => {
      return {
        validationRules: validations[validationFrom] || {},
        dataSource: ctx[validationFrom] || ctx.request[validationFrom] || {},
      };
    });
  }
}

module.exports = Validator;
