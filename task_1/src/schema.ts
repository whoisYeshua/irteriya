export const schema = {
  type: 'object',
  properties: {
    streetAddress: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string' },
    gender: {
      enum: ['male', 'female', 'else'],
    },
    phones: {
      type: 'array',
      maxItems: 3,
      minItems: 1,
      items: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
    },
    parents: {
      type: 'array',
      minItems: 0,
      maxItems: 2,
      items: {
        type: 'object',
        properties: {
          relation: {
            enum: ['mother', 'father'],
          },
          age: { type: 'integer' },
          name: { type: 'string' },
          secondName: { type: 'string' },
          grandFather: {
            type: 'object',
            properties: {
              // properties Пропущен в изначальном JSON
              name: { type: 'string' },
              age: { type: 'integer' },
              secondName: { type: 'string' },
              retired: { type: 'boolean' },
            },
          },
          grandMother: {
            type: 'object',
            properties: {
              // properties Пропущен в изначальном JSON
              name: { type: 'string' },
              age: { type: 'integer' },
              secondName: { type: 'string' },
              retired: { type: 'boolean' },
            },
          },
        },
      },
    },
  },
  required: ['streetAddress', 'city', 'state', 'gender'],
} as const
