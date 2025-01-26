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
import {PadelClothing} from '../models';
import {PadelClothingRepository} from '../repositories';

export class PadelClothingController {
  constructor(
    @repository(PadelClothingRepository)
    public padelClothingRepository : PadelClothingRepository,
  ) {}

  @post('/padel-clothings')
  @response(200, {
    description: 'PadelClothing model instance',
    content: {'application/json': {schema: getModelSchemaRef(PadelClothing)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PadelClothing, {
            title: 'NewPadelClothing',
            exclude: ['id'],
          }),
        },
      },
    })
    padelClothing: Omit<PadelClothing, 'id'>,
  ): Promise<PadelClothing> {
    return this.padelClothingRepository.create(padelClothing);
  }

  @get('/padel-clothings/count')
  @response(200, {
    description: 'PadelClothing model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PadelClothing) where?: Where<PadelClothing>,
  ): Promise<Count> {
    return this.padelClothingRepository.count(where);
  }

  @get('/padel-clothings')
  @response(200, {
    description: 'Array of PadelClothing model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PadelClothing, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PadelClothing) filter?: Filter<PadelClothing>,
  ): Promise<PadelClothing[]> {
    return this.padelClothingRepository.find(filter);
  }

  @patch('/padel-clothings')
  @response(200, {
    description: 'PadelClothing PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PadelClothing, {partial: true}),
        },
      },
    })
    padelClothing: PadelClothing,
    @param.where(PadelClothing) where?: Where<PadelClothing>,
  ): Promise<Count> {
    return this.padelClothingRepository.updateAll(padelClothing, where);
  }

  @get('/padel-clothings/{id}')
  @response(200, {
    description: 'PadelClothing model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PadelClothing, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PadelClothing, {exclude: 'where'}) filter?: FilterExcludingWhere<PadelClothing>
  ): Promise<PadelClothing> {
    return this.padelClothingRepository.findById(id, filter);
  }

  @patch('/padel-clothings/{id}')
  @response(204, {
    description: 'PadelClothing PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PadelClothing, {partial: true}),
        },
      },
    })
    padelClothing: PadelClothing,
  ): Promise<void> {
    await this.padelClothingRepository.updateById(id, padelClothing);
  }

  @put('/padel-clothings/{id}')
  @response(204, {
    description: 'PadelClothing PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() padelClothing: PadelClothing,
  ): Promise<void> {
    await this.padelClothingRepository.replaceById(id, padelClothing);
  }

  @del('/padel-clothings/{id}')
  @response(204, {
    description: 'PadelClothing DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.padelClothingRepository.deleteById(id);
  }
}
