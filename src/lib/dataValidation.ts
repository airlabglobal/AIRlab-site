export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface DataValidator<T> {
  validate(data: unknown): T;
  isValid(data: unknown): boolean;
  getErrors(data: unknown): ValidationError[];
}

export class ValidationResult<T> {
  constructor(
    public readonly isValid: boolean,
    public readonly data?: T,
    public readonly errors: ValidationError[] = []
  ) {}

  static success<T>(data: T): ValidationResult<T> {
    return new ValidationResult(true, data, []);
  }

  static failure<T>(errors: ValidationError[]): ValidationResult<T> {
    return new ValidationResult(false, undefined, errors);
  }
}

export function createValidator<T>(
  schema: Record<string, (value: any) => ValidationError | null>
): DataValidator<T> {
  return {
    validate(data: unknown): T {
      const result = this.validateData(data);
      if (!result.isValid) {
        throw new Error(`Validation failed: ${result.errors.map(e => e.message).join(', ')}`);
      }
      return result.data!;
    },

    isValid(data: unknown): boolean {
      return this.validateData(data).isValid;
    },

    getErrors(data: unknown): ValidationError[] {
      return this.validateData(data).errors;
    },

    validateData(data: unknown): ValidationResult<T> {
      if (!data || typeof data !== 'object') {
        return ValidationResult.failure([{
          field: 'root',
          message: 'Data must be an object',
          code: 'INVALID_TYPE'
        }]);
      }

      const errors: ValidationError[] = [];
      const obj = data as Record<string, any>;

      for (const [field, validator] of Object.entries(schema)) {
        const error = validator(obj[field]);
        if (error) {
          errors.push(error);
        }
      }

      if (errors.length > 0) {
        return ValidationResult.failure(errors);
      }

      return ValidationResult.success(data as T);
    }
  };
}

// Common validation functions
export const validators = {
  required: (field: string) => (value: any): ValidationError | null => {
    if (value === undefined || value === null || value === '') {
      return {
        field,
        message: `${field} is required`,
        code: 'REQUIRED'
      };
    }
    return null;
  },

  string: (field: string) => (value: any): ValidationError | null => {
    if (value !== undefined && typeof value !== 'string') {
      return {
        field,
        message: `${field} must be a string`,
        code: 'INVALID_TYPE'
      };
    }
    return null;
  },

  number: (field: string) => (value: any): ValidationError | null => {
    if (value !== undefined && typeof value !== 'number') {
      return {
        field,
        message: `${field} must be a number`,
        code: 'INVALID_TYPE'
      };
    }
    return null;
  },

  array: (field: string) => (value: any): ValidationError | null => {
    if (value !== undefined && !Array.isArray(value)) {
      return {
        field,
        message: `${field} must be an array`,
        code: 'INVALID_TYPE'
      };
    }
    return null;
  },

  url: (field: string) => (value: any): ValidationError | null => {
    if (value !== undefined && typeof value === 'string') {
      try {
        new URL(value);
      } catch {
        return {
          field,
          message: `${field} must be a valid URL`,
          code: 'INVALID_URL'
        };
      }
    }
    return null;
  },

  oneOf: (field: string, allowedValues: any[]) => (value: any): ValidationError | null => {
    if (value !== undefined && !allowedValues.includes(value)) {
      return {
        field,
        message: `${field} must be one of: ${allowedValues.join(', ')}`,
        code: 'INVALID_VALUE'
      };
    }
    return null;
  },

  combine: (...validators: ((value: any) => ValidationError | null)[]): ((value: any) => ValidationError | null) => {
    return (value: any): ValidationError | null => {
      for (const validator of validators) {
        const error = validator(value);
        if (error) return error;
      }
      return null;
    };
  }
};

// Utility function to safely parse JSON with validation
export function safeJsonParse<T>(
  jsonString: string,
  validator?: DataValidator<T>
): ValidationResult<T> {
  try {
    const parsed = JSON.parse(jsonString);
    
    if (validator) {
      const errors = validator.getErrors(parsed);
      if (errors.length > 0) {
        return ValidationResult.failure(errors);
      }
      return ValidationResult.success(validator.validate(parsed));
    }
    
    return ValidationResult.success(parsed);
  } catch (error) {
    return ValidationResult.failure([{
      field: 'json',
      message: `Invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}`,
      code: 'INVALID_JSON'
    }]);
  }
}