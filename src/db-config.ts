import { Sequelize } from 'sequelize';

const dbName = 'tembo' as string;
const dbUser = 'postgres' as string;
const dbHost = process.env.DBHOST || 'postgres';
const dbDriver = 'postgres' ;
const dbPassword = 'password';

const connection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
});

export default connection;
