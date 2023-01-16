const createProviderSchema = {
  title: 'provider Schema',
  type: 'object',
  additionalProperties: false,
  required: ['transferFees', 'busy', 'gender'],
  properties: {
    transferFees: {
      type: 'number',
    },
    busy: {
      type: 'boolean',
    },
    gender: {
      type: 'string',
      enum: ['MALE', 'FEMALE'],
      required: true,
    },
  },
};

const updateProvidertSchema = {
  title: 'provider Schema',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    transferFees: {
      type: 'number',
    },
    busy: {
      type: 'boolean',
    },
    gender: {
      type: 'string',
      enum: ['MALE', 'FEMALE'],
      required: true,
    },
  },
};

module.exports = {
  paths: {
    '/providers': {
      post: {
        tags: ['providers'],
        description: 'Register as a new provider',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: createProviderSchema,
            },
          },
        },
        responses: {
          201: {
            description: 'provider response',
            content: {
              'application/json': {},
            },
          },
        },
      },
      get: {
        tags: ['providers'],
        parameters: [
          {
            name: 'page',
            in: 'query',
            required: false,
            type: 'number',
            default: 1,
          },
          {
            name: 'limit',
            in: 'query',
            required: false,
            type: 'number',
            default: 20,
          },
        ],
        description: 'get all providers',
        responses: {
          201: {
            description: 'providers response',
            content: {
              'application/json': {},
            },
          },
        },
      },
    },
    '/providers/{id}': {
      get: {
        tags: ['providers'],
        parameters: [
          {
            name: 'Accept-Language',
            in: 'header',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'number',
            },
            description: 'provider ID',
          },
        ],

        responses: {
          200: {
            description: 'provider response',
          },
          404: {
            description: 'provider Not Found',
          },
        },
      },
      delete: {
        tags: ['providers'],
        parameters: [
          {
            name: 'Accept-Language',
            in: 'header',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'number',
            },
            description: 'provider ID',
          },
        ],

        responses: {
          200: {
            description: 'providers response',
          },
          404: {
            description: 'providers Not Found',
          },
        },
      },
      patch: {
        tags: ['providers'],
        parameters: [
          {
            name: 'Accept-Language',
            in: 'header',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'number',
            },
            description: 'provider ID',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: updateProvidertSchema,
            },
          },
        },
        responses: {
          200: {
            description: 'provider response',
          },
          404: {
            description: 'providers Not Found',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      createProviderSchemaAssignment: createProviderSchema,
    },
  },
};
