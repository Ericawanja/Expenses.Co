import mssql from "mssql";
import { sqlConfig } from "../config";

class Connection {
  private pool: Promise<mssql.ConnectionPool>;
  constructor() {
    this.pool = mssql.connect(sqlConfig);
  }
  createRequest = (
    request: mssql.Request,
    data: { [x: string]: string | Boolean | number} ={}
  ) => {
    const keys = Object.keys(data);

    keys.map((keyname) => {
      request.input(keyname, data[keyname]);
    });
    return request;
  };
  execute = async (
    storedProcedure: string,
    data: { [x: string]: string | Boolean | number } ={}
  ) => {
    let request = await (await this.pool).request();
    let requestObj = this.createRequest(request, data);
    let result = await (await requestObj.execute(storedProcedure)).recordset;
    return result;
  };
}

export const db = new Connection();
