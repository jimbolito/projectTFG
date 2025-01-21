import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Padelball, PadelballRelations} from '../models';

export class PadelballRepository extends DefaultCrudRepository<
  Padelball,
  typeof Padelball.prototype.id,
  PadelballRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Padelball, dataSource);
  }
}
