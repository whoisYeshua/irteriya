import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useFieldArray, useFormState } from 'react-hook-form'

import { NumberField } from './NumberField'
import { BooleanField } from './BooleanField'
import { StringField } from './StringField'
import { EnumField } from './EnumField'
import { buildValidationRules } from './buildValidationRules'

import type { FieldProps } from './types'

const ObjectField = ({ name, schema, label }: FieldProps) => {
  return (
    <Box border={1} borderRadius={2} p="16px" gap="8px" display="flex" flexDirection="column">
      <Typography variant="h6" gutterBottom>
        {label || schema.title || name}
      </Typography>
      {schema.properties &&
        Object.entries(schema.properties).map(([propKey, propSchema]) => {
          const isRequired = schema.required ? schema.required.includes(propKey) : false
          const childName = `${name}.${propKey}`

          return (
            <DynamicFormField
              key={childName}
              name={childName}
              schema={propSchema}
              label={propKey}
              required={isRequired}
            />
          )
        })}
    </Box>
  )
}

const ArrayField = ({ name, schema, label, required = false }: FieldProps) => {
  const resultLabel = label || name
  const rules = buildValidationRules(resultLabel, schema, required)
  const { fields, append, remove } = useFieldArray({ name, rules })
  const items = schema.items

  const state = useFormState()
  const errorMessage = state.errors?.[name]?.root?.message

  const handleAdd = () => {
    append(undefined)
  }

  return (
    <Box
      border={1}
      borderRadius={2}
      p="16px"
      display="flex"
      flexDirection="column"
      gap="16px"
      borderColor={errorMessage ? 'red' : 'revert'}
    >
      <Typography variant="h6" gutterBottom>
        {resultLabel}
      </Typography>
      {errorMessage && (
        <Typography color="error" gutterBottom>
          {String(errorMessage)}
        </Typography>
      )}
      {fields.map((item, index) => {
        const title = `${resultLabel} [${index}]`
        const itemName = `${name}[${index}]`

        if (items && items.type === 'object') {
          return (
            <Box
              key={item.id}
              border={1}
              borderRadius={2}
              p="16px"
              display="flex"
              flexDirection="column"
              gap="8px"
            >
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">{title}</Typography>
                <Button variant="contained" color="warning" onClick={() => remove(index)}>
                  Удалить
                </Button>
              </Box>
              {schema.items?.properties &&
                Object.entries(schema.items.properties).map(([key, subschema]) => {
                  const childName = `${itemName}.${key}`
                  const isRequired = schema.items?.required
                    ? schema.items.required.includes(key)
                    : false
                  return (
                    <DynamicFormField
                      key={childName}
                      name={childName}
                      schema={subschema}
                      label={key}
                      required={isRequired}
                    />
                  )
                })}
            </Box>
          )
        }

        if (items) {
          return (
            <Box key={item.id} display="flex" alignItems="center" mb={2}>
              <DynamicFormField name={itemName} schema={items} label={title} required={true} />
              <Button
                variant="contained"
                color="warning"
                onClick={() => remove(index)}
                sx={{ ml: 1 }}
              >
                Удалить
              </Button>
            </Box>
          )
        }

        return null
      })}
      <Button variant="contained" color="secondary" onClick={handleAdd}>
        Добавить {resultLabel}
      </Button>
    </Box>
  )
}

export const DynamicFormField = (props: FieldProps) => {
  const { schema } = props

  if (schema.enum) return <EnumField {...props} />
  if (schema.type === 'string') return <StringField {...props} />
  else if (schema.type === 'integer') return <NumberField {...props} />
  else if (schema.type === 'boolean') return <BooleanField {...props} />
  else if (schema.type === 'object') return <ObjectField {...props} />
  else if (schema.type === 'array') return <ArrayField {...props} />
  else return null
}
