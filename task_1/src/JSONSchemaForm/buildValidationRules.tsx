import type { RegisterOptions } from 'react-hook-form'

import type { JSONSchema } from './types'

export const buildValidationRules = (
  fieldKey: string,
  schema: JSONSchema,
  required: boolean = false
) => {
  const rules: RegisterOptions = {}
  if (required) {
    rules.required = `${fieldKey} обязателен`
  }
  if (schema.minLength !== undefined) {
    rules.minLength = {
      value: schema.minLength,
      message: `${fieldKey} должен содержать минимум ${schema.minLength} символов`,
    }
  }
  if (schema.maxLength !== undefined) {
    rules.maxLength = {
      value: schema.maxLength,
      message: `${fieldKey} должен содержать максимум ${schema.maxLength} символов`,
    }
  }
  if (schema.pattern !== undefined) {
    rules.pattern = {
      value: new RegExp(schema.pattern),
      message: `${fieldKey} имеет неверный формат`,
    }
  }
  if (schema.minimum !== undefined) {
    rules.min = {
      value: schema.minimum,
      message: `${fieldKey} не должен быть меньше ${schema.minimum}`,
    }
  }
  if (schema.maximum !== undefined) {
    rules.max = {
      value: schema.maximum,
      message: `${fieldKey} не должен быть больше ${schema.maximum}`,
    }
  }
  if (schema.minItems !== undefined) {
    rules.minLength = {
      value: schema.minItems,
      message: `Количество ${fieldKey} должно быть больше ${schema.minItems}`,
    }
  }
  if (schema.maxItems !== undefined) {
    rules.maxLength = {
      value: schema.maxItems,
      message: `Количество ${fieldKey} не должно быть больше ${schema.maxItems}`,
    }
  }
  return rules
}
