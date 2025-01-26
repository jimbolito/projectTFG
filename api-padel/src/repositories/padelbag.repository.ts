import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Padelbag, PadelbagRelations} from '../models';

export class PadelbagRepository extends DefaultCrudRepository<
  Padelbag,
  typeof Padelbag.prototype.id,
  PadelbagRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Padelbag, dataSource);
  }
}
