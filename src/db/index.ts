import { createConnection, Connection, ConnectionManager, ConnectionOptions, getConnectionManager } from "typeorm";
import RealState from "./entity/RealState";

export default class DB {
    private connectionManager: ConnectionManager;
  
    constructor() {
      this.connectionManager = getConnectionManager();
    }
  
    async getConnection(): Promise<Connection> {
      const CONNECTION_NAME = 'default';
  
      let connection: Connection;
  
      if (this.connectionManager.has(CONNECTION_NAME)) {
        connection = await this.connectionManager.get(CONNECTION_NAME);
  
        if (!connection.isConnected) {
          connection = await connection.connect();
        }
      } else {
  
        const connectionOptions: ConnectionOptions = {
          name: CONNECTION_NAME,
          type: "mysql",
          port: 3306,
          synchronize: true,
          host: "keycashdb.ct4mvxlew6i0.us-east-1.rds.amazonaws.com",
          username: "admin",
          database: "keycashdb",
          password: "Adog#as4legs!",         
          entities: [RealState],
        };
  
        connection = await createConnection(connectionOptions);

        // TO:DO : Rearrange the folowwing statement 
        // in order to ensure that there's a database created
        if(connection?.query)
          connection.query(`CREATE DATABASE IF NOT EXISTS ${connectionOptions.database}`);
      }
      // In case something went wrong when accessing the DB,
      // lets throw an error and let middleware handle it
      if (!connection)
        throw new Error('Oops! Something went wrong when accessing the DB');

      return connection;
    }
  }