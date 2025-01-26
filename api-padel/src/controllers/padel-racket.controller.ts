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
import { Padelracket } from '../models';
import { PadelracketRepository } from '../repositories';

export class PadelRacketController {
  constructor(
    @repository(PadelracketRepository)
    public padelracketRepository: PadelracketRepository,
  ) { }

  @post('/padelrackets')
  @response(200, {
    description: 'Padelracket model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Padelracket) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Padelracket, {
            title: 'NewPadelracket',
            exclude: ['id'],
          }),
        },
      },
    })
    padelracket: Omit<Padelracket, 'id'>,
  ): Promise<Padelracket> {
    return this.padelracketRepository.create(padelracket);
  }

  @get('/padelrackets/count')
  @response(200, {
    description: 'Padelracket model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Padelracket) where?: Where<Padelracket>,
  ): Promise<Count> {
    return this.padelracketRepository.count(where);
  }

  @get('/padelrackets')
  @response(200, {
    description: 'Array of Padelracket model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Padelracket, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(Padelracket) filter?: Filter<Padelracket>,
  ): Promise<Padelracket[]> {
    return this.padelracketRepository.find(filter);
  }

  @patch('/padelrackets')
  @response(200, {
    description: 'Padelracket PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Padelracket, { partial: true }),
        },
      },
    })
    padelracket: Padelracket,
    @param.where(Padelracket) where?: Where<Padelracket>,
  ): Promise<Count> {
    return this.padelracketRepository.updateAll(padelracket, where);
  }

  @get('/padelrackets/{id}')
  @response(200, {
    description: 'Padelracket model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Padelracket, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Padelracket, { exclude: 'where' }) filter?: FilterExcludingWhere<Padelracket>
  ): Promise<Padelracket> {
    return this.padelracketRepository.findById(id, filter);
  }

  @patch('/padelrackets/{id}')
  @response(204, {
    description: 'Padelracket PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Padelracket, { partial: true }),
        },
      },
    })
    padelracket: Padelracket,
  ): Promise<void> {
    await this.padelracketRepository.updateById(id, padelracket);
  }

  @put('/padelrackets/{id}')
  @response(204, {
    description: 'Padelracket PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() padelracket: Padelracket,
  ): Promise<void> {
    await this.padelracketRepository.replaceById(id, padelracket);
  }

  @del('/padelrackets/{id}')
  @response(204, {
    description: 'Padelracket DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.padelracketRepository.deleteById(id);
  }

  //Filtrar palas por marca:
  @get('/padelrackets/category/{brand}')
  @response(200, {
    description: 'Array of Padelracket model instances filtered by brand',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Padelracket, {includeRelations: true}),
        },
      },
    },
  })
  async findByBrand(
    @param.path.string('brand') brand: string,
  ): Promise<Padelracket[]> {
    return this.padelracketRepository.find({
      where: {
        brand: brand, // Aseguramos que el filtro sea exacto
      },
    });
  }

}
