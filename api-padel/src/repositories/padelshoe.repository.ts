import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Padelshoe, PadelshoeRelations} from '../models';

export class PadelshoeRepository extends DefaultCrudRepository<
  Padelshoe,
  typeof Padelshoe.prototype.id,
  PadelshoeRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Padelshoe, dataSource);
  }
}
