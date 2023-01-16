const createUSerSchema = {
  title: 'user Schema',
  type: 'object',
  additionalProperties: false,
  required: ['nameAr', 'nameEn', 'email', 'password', 'profileImage'],
  properties: {
    nameAr: {
      type: 'string',
      isNotEmpty: true,
    },
    nameEn: {
      type: 'string',
      isNotEmpty: true,
    },
    email: {
      type: 'string',
      format: 'email',
      isNotEmpty: true,
    },
    password: {
      type: 'string',
    },
    profileImage: {
      type: 'string',
      format: 'binary',
    },
  },
};

const loginSchema = {
  title: 'login Schema',
  type: 'object',
  additionalProperties: false,
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
      isNotEmpty: true,
    },
    password: {
      type: 'string',
    },
  },
};

const updateSchema = {
  title: 'login Schema',
  type: 'object',
  additionalProperties: false,
  required: ['email'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
      isNotEmpty: true,
    },
  },
};

const UpdateUserBodySchema = {
  title: 'user Schema',
  type: 'object',
  additionalProperties: false,
  required: ['nameAr', 'nameEn', 'email', 'password', 'profileImage'],
  properties: {
    nameAr: {
      type: 'string',
    },
    nameEn: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
    },
    profileImage: {
      type: 'string',
      format: 'binary',
    },
  },
};

module.exports = {
  paths: {
    '/user': {
      post: {
        tags: ['User'],
        description: 'Register as a new user',
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: createUSerSchema,
            },
          },
        },
        responses: {
          201: {
            description: 'user response',
            content: {
              'application/json': {},
            },
          },
        },
      },
    },
    '/user/login': {
      post: {
        tags: ['User'],
        description: 'login to your account',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: loginSchema,
            },
          },
        },
        responses: {
          201: {
            description: 'user response',
            content: {
              'application/json': {},
            },
          },
        },
      },
    },
    '/user/{userId}/email': {
      patch: {
        tags: ['User'],
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            schema: {
              type: 'number',
            },
            description: 'user ID',
          },
        ],
        description: 'update user email',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: updateSchema,
            },
          },
        },
        responses: {
          200: {
            description: 'user response',
            content: {
              'application/json': {
                schema: {
                  //  $ref: '#/components/schemas/Pet'
                },
              },
            },
          },
          404: {
            description: ' user Not Found ',
          },
        },
      },
    },
    '/user/{userId}': {
      patch: {
        tags: ['User'],
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            schema: {
              type: 'number',
            },
            description: 'user ID',
          },
        ],
        description: 'Update user',
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: UpdateUserBodySchema,
            },
          },
        },
        responses: {
          200: {
            description: 'user response',
            content: {
              'application/json': {
                schema: {
                  //  $ref: '#/components/schemas/Pet'
                },
              },
            },
          },
          404: {
            description: ' user Not Found ',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      createUSerSchemaAssignment: createUSerSchema,
    },
  },
};
