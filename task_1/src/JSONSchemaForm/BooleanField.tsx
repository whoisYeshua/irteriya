import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useController } from 'react-hook-form'

import { buildValidationRules } from './buildValidationRules'
import type { FieldProps } from './types'

export const BooleanField = ({ name, schema, label, required = false }: FieldProps) => {
  const resultLabel = label || name
  const rules = buildValidationRules(resultLabel, schema, required)
  const { field } = useController({
    name,
    rules,
    defaultValue: false,
  })

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...field}
          checked={Boolean(field.value)}
          onChange={e => field.onChange(e.target.checked)}
        />
      }
      label={resultLabel}
    />
  )
}
