import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PadelClothing, PadelClothingRelations} from '../models';

export class PadelClothingRepository extends DefaultCrudRepository<
  PadelClothing,
  typeof PadelClothing.prototype.id,
  PadelClothingRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(PadelClothing, dataSource);
  }
}
