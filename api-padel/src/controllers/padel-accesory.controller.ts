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
import {PadelAccesory} from '../models';
import {PadelAccesoryRepository} from '../repositories';

export class PadelAccesoryController {
  constructor(
    @repository(PadelAccesoryRepository)
    public padelAccesoryRepository : PadelAccesoryRepository,
  ) {}

  @post('/padel-accesories')
  @response(200, {
    description: 'PadelAccesory model instance',
    content: {'application/json': {schema: getModelSchemaRef(PadelAccesory)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PadelAccesory, {
            title: 'NewPadelAccesory',
            exclude: ['id'],
          }),
        },
      },
    })
    padelAccesory: Omit<PadelAccesory, 'id'>,
  ): Promise<PadelAccesory> {
    return this.padelAccesoryRepository.create(padelAccesory);
  }

  @get('/padel-accesories/count')
  @response(200, {
    description: 'PadelAccesory model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PadelAccesory) where?: Where<PadelAccesory>,
  ): Promise<Count> {
    return this.padelAccesoryRepository.count(where);
  }

  @get('/padel-accesories')
  @response(200, {
    description: 'Array of PadelAccesory model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PadelAccesory, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PadelAccesory) filter?: Filter<PadelAccesory>,
  ): Promise<PadelAccesory[]> {
    return this.padelAccesoryRepository.find(filter);
  }

  @patch('/padel-accesories')
  @response(200, {
    description: 'PadelAccesory PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PadelAccesory, {partial: true}),
        },
      },
    })
    padelAccesory: PadelAccesory,
    @param.where(PadelAccesory) where?: Where<PadelAccesory>,
  ): Promise<Count> {
    return this.padelAccesoryRepository.updateAll(padelAccesory, where);
  }

  @get('/padel-accesories/{id}')
  @response(200, {
    description: 'PadelAccesory model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PadelAccesory, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PadelAccesory, {exclude: 'where'}) filter?: FilterExcludingWhere<PadelAccesory>
  ): Promise<PadelAccesory> {
    return this.padelAccesoryRepository.findById(id, filter);
  }

  @patch('/padel-accesories/{id}')
  @response(204, {
    description: 'PadelAccesory PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PadelAccesory, {partial: true}),
        },
      },
    })
    padelAccesory: PadelAccesory,
  ): Promise<void> {
    await this.padelAccesoryRepository.updateById(id, padelAccesory);
  }

  @put('/padel-accesories/{id}')
  @response(204, {
    description: 'PadelAccesory PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() padelAccesory: PadelAccesory,
  ): Promise<void> {
    await this.padelAccesoryRepository.replaceById(id, padelAccesory);
  }

  @del('/padel-accesories/{id}')
  @response(204, {
    description: 'PadelAccesory DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.padelAccesoryRepository.deleteById(id);
  }
}
