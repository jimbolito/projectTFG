import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Padelracket, PadelracketRelations} from '../models';

export class PadelracketRepository extends DefaultCrudRepository<
  Padelracket,
  typeof Padelracket.prototype.id,
  PadelracketRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Padelracket, dataSource);
  }
}
