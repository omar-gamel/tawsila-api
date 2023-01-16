const createSettingsSchema = {
  title: 'settings Schema',
  type: 'object',
  additionalProperties: false,
  required: ['kmPrice', 'deliveryType'],
  properties: {
    kmPrice: {
      type: 'number',
    },
    deliveryType: {
      type: 'string',
    },
  },
};

const updateSettingsSchema = {
  title: 'settings Schema',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    kmPrice: {
      type: 'number',
    },
    deliveryType: {
      type: 'string',
    },
    recieveUpdates: {
      type: 'boolean',
    },
  },
};

module.exports = {
  paths: {
    '/settings': {
      post: {
        tags: ['settings'],
        description: 'create setting',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: createSettingsSchema,
            },
          },
        },
        responses: {
          201: {
            description: 'setting response',
            content: {
              'application/json': {},
            },
          },
        },
      },
      get: {
        tags: ['settings'],
        // parameters: [
        //     {
        //         name: 'page',
        //         in: 'query',
        //         required: false,
        //         type: 'number',
        //         default: 1

        //     },
        //     {
        //         name: 'limit',
        //         in: 'query',
        //         required: false,
        //         type: 'number',
        //         default: 20

        //     }
        // ],
        description: 'get all settings',
        responses: {
          201: {
            description: 'settings response',
            content: {
              'application/json': {},
            },
          },
        },
      },
    },
    '/settings/{id}': {
      get: {
        tags: ['settings'],
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
            description: 'settings ID',
          },
        ],

        responses: {
          200: {
            description: 'settings response',
          },
          404: {
            description: 'settings Not Found',
          },
        },
      },
      delete: {
        tags: ['settings'],
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
            description: 'settings ID',
          },
        ],

        responses: {
          200: {
            description: 'settings response',
          },
          404: {
            description: 'settings Not Found',
          },
        },
      },
      patch: {
        tags: ['settings'],
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
            description: 'settings ID',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: updateSettingsSchema,
            },
          },
        },
        responses: {
          200: {
            description: 'settings response',
          },
          404: {
            description: 'settings Not Found',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      createSettingsSchemaAssignment: createSettingsSchema,
    },
  },
};
