import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { DevTool } from '@hookform/devtools'
import { FormProvider, useForm } from 'react-hook-form'

import { DynamicFormField } from './DynamicFormField'

import type { JSONSchema } from './types'

interface JSONSchemaFormProps {
  schema: JSONSchema
  onSubmit: (data: unknown) => void
}

export const JSONSchemaForm = ({ schema, onSubmit }: JSONSchemaFormProps) => {
  const methods = useForm({ defaultValues: {} })

  const handleFormSubmit = methods.handleSubmit(onSubmit)

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={handleFormSubmit}
        display="flex"
        flexDirection="column"
        gap="8px"
      >
        {schema.properties &&
          Object.entries(schema.properties).map(([key, propertySchema]) => {
            const isRequired = schema.required ? schema.required.includes(key) : false
            return (
              <DynamicFormField
                key={key}
                name={key}
                schema={propertySchema}
                label={key}
                required={isRequired}
              />
            )
          })}
        <Button variant="contained" color="primary" type="submit">
          Отправить
        </Button>
      </Box>
      <DevTool control={methods.control} />
    </FormProvider>
  )
}
