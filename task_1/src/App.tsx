import { Container, Typography } from '@mui/material'

import { JSONSchemaForm } from './JSONSchemaForm'
import { schema } from './schema'

const App = () => {
  const handleFormSubmit = (data: unknown) => {
    console.log('Данные формы:', data)
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom sx={{ my: 4 }}>
        Динамическая форма по JSON-схеме
      </Typography>
      <JSONSchemaForm schema={schema} onSubmit={handleFormSubmit} />
    </Container>
  )
}

export default App
