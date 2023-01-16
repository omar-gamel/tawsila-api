const createClientSchema = {
  title: 'client Schema',
  type: 'object',
  additionalProperties: false,
  required: ['location', 'image'],
  properties: {
    location: {
      type: 'string',
    },
    image: {
      type: 'string',
      format: 'binary',
    },
  },
};

const updateClientSchema = {
  title: 'client Schema',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    location: {
      type: 'string',
    },
    image: {
      type: 'string',
      format: 'binary',
    },
  },
};

const favotiteSchema = {
  title: 'favotite Schema',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    provider: {
      type: 'string',
    },
  },
};

module.exports = {
  paths: {
    '/clients': {
      post: {
        tags: ['Clients'],
        description: 'Register as a new client',
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: createClientSchema,
            },
          },
        },
        responses: {
          201: {
            description: 'client response',
            content: {
              'application/json': {},
            },
          },
        },
      },
      get: {
        tags: ['Clients'],
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
        description: 'get all clients',
        responses: {
          201: {
            description: 'client response',
            content: {
              'application/json': {},
            },
          },
        },
      },
    },
    '/clients/{id}': {
      get: {
        tags: ['Clients'],
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
            description: 'client ID',
          },
        ],

        responses: {
          200: {
            description: 'Client response',
          },
          404: {
            description: 'Clients Not Found',
          },
        },
      },
      delete: {
        tags: ['Clients'],
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
            description: 'client ID',
          },
        ],

        responses: {
          200: {
            description: 'Client response',
          },
          404: {
            description: 'Clients Not Found',
          },
        },
      },
      patch: {
        tags: ['Clients'],
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
            description: 'client ID',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: updateClientSchema,
            },
          },
        },
        responses: {
          200: {
            description: 'Client response',
          },
          404: {
            description: 'Clients Not Found',
          },
        },
      },
    },
    '/clients/{clientId}/addTofavorite': {
      post: {
        tags: ['Favorites'],
        description: 'add provider to client favorites',
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
            name: 'clientId',
            in: 'path',
            required: true,
            schema: {
              type: 'number',
            },
            description: 'client ID',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: favotiteSchema,
            },
          },
        },
        responses: {
          201: {
            description: 'client response',
            content: {
              'application/json': {},
            },
          },
        },
      },
    },
    '/clients/{clientId}/removefavorite': {
      post: {
        tags: ['Favorites'],
        description: 'remove provider from client favorites',
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
            name: 'clientId',
            in: 'path',
            required: true,
            schema: {
              type: 'number',
            },
            description: 'client ID',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: favotiteSchema,
            },
          },
        },
        responses: {
          201: {
            description: 'favorite response',
            content: {
              'application/json': {},
            },
          },
        },
      },
    },
    '/clients/{clientId}/get-all-favorites': {
      get: {
        tags: ['Favorites'],
        description: 'get all favorites providers',
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
            name: 'clientId',
            in: 'path',
            required: true,
            schema: {
              type: 'number',
            },
            description: 'client ID',
          },
        ],
        // requestBody: {
        //     required: true,
        //     content: {
        //         'application/json': {
        //             schema: favotiteSchema
        //         }
        //     }
        // },
        responses: {
          201: {
            description: 'favorite response',
            content: {
              'application/json': {},
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      createClientSchemaAssignment: createClientSchema,
    },
  },
};
