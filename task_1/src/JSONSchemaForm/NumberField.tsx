import TextField from '@mui/material/TextField'
import { useController } from 'react-hook-form'

import { buildValidationRules } from './buildValidationRules'
import { type FieldProps } from './types'

export const NumberField = ({ name, schema, label, required = false }: FieldProps) => {
  const resultLabel = label || name
  const rules = buildValidationRules(resultLabel, schema, required)

  const { field, fieldState } = useController({
    name,
    rules,
    defaultValue: '',
  })

  return (
    <TextField
      {...field}
      label={resultLabel}
      type="number"
      fullWidth
      error={!!fieldState.error}
      helperText={fieldState.error ? fieldState.error.message : ''}
    />
  )
}
