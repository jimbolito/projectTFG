import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Padelbag} from '../models';
import {PadelbagRepository} from '../repositories';

export class PadelbagController {
  constructor(
    @repository(PadelbagRepository)
    public padelbagRepository : PadelbagRepository,
  ) {}

  @post('/padelbags')
  @response(200, {
    description: 'Padelbag model instance',
    content: {'application/json': {schema: getModelSchemaRef(Padelbag)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Padelbag, {
            title: 'NewPadelbag',
            exclude: ['id'],
          }),
        },
      },
    })
    padelbag: Omit<Padelbag, 'id'>,
  ): Promise<Padelbag> {
    return this.padelbagRepository.create(padelbag);
  }

  @get('/padelbags/count')
  @response(200, {
    description: 'Padelbag model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Padelbag) where?: Where<Padelbag>,
  ): Promise<Count> {
    return this.padelbagRepository.count(where);
  }

  @get('/padelbags')
  @response(200, {
    description: 'Array of Padelbag model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Padelbag, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Padelbag) filter?: Filter<Padelbag>,
  ): Promise<Padelbag[]> {
    return this.padelbagRepository.find(filter);
  }

  @patch('/padelbags')
  @response(200, {
    description: 'Padelbag PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Padelbag, {partial: true}),
        },
      },
    })
    padelbag: Padelbag,
    @param.where(Padelbag) where?: Where<Padelbag>,
  ): Promise<Count> {
    return this.padelbagRepository.updateAll(padelbag, where);
  }

  @get('/padelbags/{id}')
  @response(200, {
    description: 'Padelbag model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Padelbag, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Padelbag, {exclude: 'where'}) filter?: FilterExcludingWhere<Padelbag>
  ): Promise<Padelbag> {
    return this.padelbagRepository.findById(id, filter);
  }

  @patch('/padelbags/{id}')
  @response(204, {
    description: 'Padelbag PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Padelbag, {partial: true}),
        },
      },
    })
    padelbag: Padelbag,
  ): Promise<void> {
    await this.padelbagRepository.updateById(id, padelbag);
  }

  @put('/padelbags/{id}')
  @response(204, {
    description: 'Padelbag PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() padelbag: Padelbag,
  ): Promise<void> {
    await this.padelbagRepository.replaceById(id, padelbag);
  }

  @del('/padelbags/{id}')
  @response(204, {
    description: 'Padelbag DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.padelbagRepository.deleteById(id);
  }
}
