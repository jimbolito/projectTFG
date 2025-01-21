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
import {Padelball} from '../models';
import {PadelballRepository} from '../repositories';

export class PadelBallController {
  constructor(
    @repository(PadelballRepository)
    public padelballRepository : PadelballRepository,
  ) {}

  @post('/padelballs')
  @response(200, {
    description: 'Padelball model instance',
    content: {'application/json': {schema: getModelSchemaRef(Padelball)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Padelball, {
            title: 'NewPadelball',
            exclude: ['id'],
          }),
        },
      },
    })
    padelball: Omit<Padelball, 'id'>,
  ): Promise<Padelball> {
    return this.padelballRepository.create(padelball);
  }

  @get('/padelballs/count')
  @response(200, {
    description: 'Padelball model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Padelball) where?: Where<Padelball>,
  ): Promise<Count> {
    return this.padelballRepository.count(where);
  }

  @get('/padelballs')
  @response(200, {
    description: 'Array of Padelball model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Padelball, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Padelball) filter?: Filter<Padelball>,
  ): Promise<Padelball[]> {
    return this.padelballRepository.find(filter);
  }

  @patch('/padelballs')
  @response(200, {
    description: 'Padelball PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Padelball, {partial: true}),
        },
      },
    })
    padelball: Padelball,
    @param.where(Padelball) where?: Where<Padelball>,
  ): Promise<Count> {
    return this.padelballRepository.updateAll(padelball, where);
  }

  @get('/padelballs/{id}')
  @response(200, {
    description: 'Padelball model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Padelball, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Padelball, {exclude: 'where'}) filter?: FilterExcludingWhere<Padelball>
  ): Promise<Padelball> {
    return this.padelballRepository.findById(id, filter);
  }

  @patch('/padelballs/{id}')
  @response(204, {
    description: 'Padelball PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Padelball, {partial: true}),
        },
      },
    })
    padelball: Padelball,
  ): Promise<void> {
    await this.padelballRepository.updateById(id, padelball);
  }

  @put('/padelballs/{id}')
  @response(204, {
    description: 'Padelball PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() padelball: Padelball,
  ): Promise<void> {
    await this.padelballRepository.replaceById(id, padelball);
  }

  @del('/padelballs/{id}')
  @response(204, {
    description: 'Padelball DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.padelballRepository.deleteById(id);
  }


  //Filtrar bolas por marca:
  @get('/padelballs/brand/{brand}')
  @response(200, {
    description: 'Array of Padelracket model instances filtered by brand',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Padelball, {includeRelations: true}),
        },
      },
    },
  })
  async findByBrand(
    @param.path.string('brand') brand: string,
  ): Promise<Padelball[]> {
    return this.padelballRepository.find({
      where: {
        brand: brand, // Aseguramos que el filtro sea exacto
      },
    });
  }
}
