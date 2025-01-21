import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mongodb: {collection: 'padelshoes'}, // Especifica la colección
    strict: false, // Permite guardar campos adicionales
  },
})
export class Padelshoe extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number',
  })
  initial_price?: number;

  @property({
    type: 'string',
  })
  percentage_discount?: string;

  @property({
    type: 'string',
  })
  color?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  sizes?: string[];

  @property({
    type: 'number',
  })
  stock_quantity?: number;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  brand: string;

  @property({
    type: 'string',
  })
  sex?: string;

  @property({
    type: 'date',
  })
  creation_date?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Padelshoe>) {
    super(data);
  }
}

export interface PadelshoeRelations {
  // describe navigational properties here
}

export type PadelshoeWithRelations = Padelshoe & PadelshoeRelations;
