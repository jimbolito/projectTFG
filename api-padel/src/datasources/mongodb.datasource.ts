import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

// const config = {
//   name: 'mongodb',
//   connector: 'mongodb',
//   url: 'mongodb://localhost:27017',
//   // host: '',
//   // port: 0,
//   // user: '',
//   // password: '',
//   database: 'padelmarketdb',
//   useNewUrlParser: true
// };


//funciona en localhost:
// const config = {
//   name: 'mongodb',
//   connector: 'mongodb',
//   url: 'mongodb://localhost:27017/padelmarketdb',
//   useUnifiedTopology: true
// };

//Cambiada segun el docker: 
const config = {
  name: 'mongodb',
  connector: 'mongodb',
  url: 'mongodb://mongodb:27017/padelmarketdb', // Cambiar localhost o 127.0.0.1 por mongodb
  useUnifiedTopology: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongodbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongodb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongodb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
