import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PadelAccesory, PadelAccesoryRelations} from '../models';

export class PadelAccesoryRepository extends DefaultCrudRepository<
  PadelAccesory,
  typeof PadelAccesory.prototype.id,
  PadelAccesoryRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(PadelAccesory, dataSource);
  }
}
