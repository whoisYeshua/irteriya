export interface JSONSchema {
  readonly type?: JSONSchemaType
  title?: string
  properties?: {
    readonly [key: string]: JSONSchema
  }
  enum?: readonly string[]
  items?: JSONSchema
  required?: readonly string[]
  // для строк
  minLength?: number
  maxLength?: number
  pattern?: string
  // для чисел
  minimum?: number
  maximum?: number
  // для массивов
  minItems?: number
  maxItems?: number
}

export type JSONSchemaType = 'string' | 'integer' | 'boolean' | 'array' | 'object'

export interface FieldProps {
  name: string
  schema: JSONSchema
  label?: string
  required?: boolean
}
