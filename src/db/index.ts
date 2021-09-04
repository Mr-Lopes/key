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
        connection.query(`CREATE DATABASE IF NOT EXISTS ${connectionOptions.database}`);
      }
  
      return connection;
    }
  }