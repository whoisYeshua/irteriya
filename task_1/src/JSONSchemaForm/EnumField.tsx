import { useId } from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useController } from 'react-hook-form'

import { buildValidationRules } from './buildValidationRules'

import type { FieldProps } from './types'

export const EnumField = ({ name, schema, label, required = false }: FieldProps) => {
  const resultLabel = label || name
  const rules = buildValidationRules(resultLabel, schema, required)
  const { field, fieldState } = useController({
    name,
    rules,
    defaultValue: '',
  })

  const labelId = useId()

  if (!schema.enum || !schema.enum.length) return null

  const isError = !!fieldState.error

  return (
    <Box>
      <FormControl fullWidth sx={{ minWidth: 120 }} error={isError}>
        <InputLabel id={labelId}>{resultLabel}</InputLabel>
        <Select {...field} label={resultLabel} labelId={labelId}>
          {schema.enum.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormHelperText sx={{ marginLeft: '14px' }} error={isError}>
        {fieldState?.error?.message}
      </FormHelperText>
    </Box>
  )
}
