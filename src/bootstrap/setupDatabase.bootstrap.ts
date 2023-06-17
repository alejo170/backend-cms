import Logger from 'bunyan';
import mongoose from 'mongoose';
import { logger } from '@configs/configLogs';
import { config } from '@configs/configEnvs';

const log: Logger = logger.createLogger('setupDatabase');
/* Design pattern: Singleton: Aqui se asegura que solo se pueda crear una única 
instancia de la función de configuración de la base de datos. */
export default () => {
  const connect = () => {
    mongoose
      .connect(`${config.DATABASE_URL}`)
      .then(() => {
        log.info('succesfully connected to database.');
      })
      .catch(error => {
        log.error('error connecting to database.', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
