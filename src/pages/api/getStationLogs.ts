import { Sequelize} from "sequelize";
import initModels from "../../models/init-models"
import { NextApiRequest, NextApiResponse } from "next";
import getData from "./shared/handlers/getData";

const sequelize = new Sequelize('customer_db', 'sa', 'ifa123456sanat@', {
  host: '192.168.1.7',
  dialect: 'mssql', // می‌توانید از انواع دیگری مانند 'postgres', 'sqlite', 'mssql' استفاده کنید
});
interface Filter {
  [key: string]: {
    operator: string;
    value: any;
    matchMode: string; // اضافه کردن matchMode به تعریف Filter
    constraints?: Filter[];
  };
}

var model = initModels(sequelize);
export default async function getStationLogs(req: NextApiRequest, res: NextApiResponse) {

    const parametrs = req.query;
    const { page,pageSize } = parametrs;
    
    const currentPage = parseInt(page as string) || 1;
    const itemsPerPage = parseInt(pageSize as string) || 10;

const filters: Filter = JSON.parse(JSON.stringify(parametrs['filters[filters]'] || {}, null, 2)) as Filter;
console.log("Diana1:",filters);

    var sortQuery:any;

    try {
        getData(res, sequelize, model.StationLogs, "StationLogs", (currentPage - 1) * itemsPerPage, itemsPerPage, sortQuery,filters);

    } catch (error) {
        res.send({ message: `Error with Data = ${error}` });
    }
};
