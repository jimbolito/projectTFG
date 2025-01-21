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
import {Padelshoe} from '../models';
import {PadelshoeRepository} from '../repositories';

export class PadelShoeController {
  constructor(
    @repository(PadelshoeRepository)
    public padelshoeRepository : PadelshoeRepository,
  ) {}

  @post('/padelshoes')
  @response(200, {
    description: 'Padelshoe model instance',
    content: {'application/json': {schema: getModelSchemaRef(Padelshoe)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Padelshoe, {
            title: 'NewPadelshoe',
            exclude: ['id'],
          }),
        },
      },
    })
    padelshoe: Omit<Padelshoe, 'id'>,
  ): Promise<Padelshoe> {
    return this.padelshoeRepository.create(padelshoe);
  }

  @get('/padelshoes/count')
  @response(200, {
    description: 'Padelshoe model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Padelshoe) where?: Where<Padelshoe>,
  ): Promise<Count> {
    return this.padelshoeRepository.count(where);
  }

  @get('/padelshoes')
  @response(200, {
    description: 'Array of Padelshoe model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Padelshoe, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Padelshoe) filter?: Filter<Padelshoe>,
  ): Promise<Padelshoe[]> {
    return this.padelshoeRepository.find(filter);
  }

  @patch('/padelshoes')
  @response(200, {
    description: 'Padelshoe PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Padelshoe, {partial: true}),
        },
      },
    })
    padelshoe: Padelshoe,
    @param.where(Padelshoe) where?: Where<Padelshoe>,
  ): Promise<Count> {
    return this.padelshoeRepository.updateAll(padelshoe, where);
  }

  @get('/padelshoes/{id}')
  @response(200, {
    description: 'Padelshoe model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Padelshoe, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Padelshoe, {exclude: 'where'}) filter?: FilterExcludingWhere<Padelshoe>
  ): Promise<Padelshoe> {
    return this.padelshoeRepository.findById(id, filter);
  }

  @patch('/padelshoes/{id}')
  @response(204, {
    description: 'Padelshoe PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Padelshoe, {partial: true}),
        },
      },
    })
    padelshoe: Padelshoe,
  ): Promise<void> {
    await this.padelshoeRepository.updateById(id, padelshoe);
  }

  @put('/padelshoes/{id}')
  @response(204, {
    description: 'Padelshoe PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() padelshoe: Padelshoe,
  ): Promise<void> {
    await this.padelshoeRepository.replaceById(id, padelshoe);
  }

  @del('/padelshoes/{id}')
  @response(204, {
    description: 'Padelshoe DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.padelshoeRepository.deleteById(id);
  }

    //Filtrar zapatillas por marca:
    @get('/padelballs/brand/{brand}')
    @response(200, {
      description: 'Array of Padelracket model instances filtered by brand',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(Padelshoe, {includeRelations: true}),
          },
        },
      },
    })
    async findByBrand(
      @param.path.string('brand') brand: string,
    ): Promise<Padelshoe[]> {
      return this.padelshoeRepository.find({
        where: {
          brand: brand, // Aseguramos que el filtro sea exacto
        },
      });
    }
}
