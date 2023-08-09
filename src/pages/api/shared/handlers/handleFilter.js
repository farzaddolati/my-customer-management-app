import getData from "./getData";
import { Op, QueryTypes } from "sequelize";

const handleFilter = async (res, sequelize, modelsTable, table, offset, limit, sortQuery, filterQuery) => {
  const filter_query = { ...filterQuery.items[0] };
  const field = filter_query.field;
  const filter_operator = filter_query.operator;
  const value = filter_query.value;
  let operator;
  let rowQueryOp;
  let rowQueryValue;


  try {
    switch (filter_operator) {
      case "equals":
        operator = Op.eq;
        rowQueryOp = "=";
        rowQueryValue = `'${value}'`;
        break;

      case "contains":
        operator = Op.substring;
        rowQueryOp = "LIKE";
        rowQueryValue = `'%${value}%'`;
        break;

      case "startsWith":
        operator = Op.substring;
        rowQueryOp = "LIKE";
        rowQueryValue = `'${value}%'`;
        break;

      case "endsWith":
        operator = Op.substring;
        rowQueryOp = "LIKE";
        rowQueryValue = `'%${value}'`;
        break;

      default:
        getData(sequelize, modelsTable, table, offset, limit, sortQuery);
        break;
    }

    const filterquery = {
      where: { [field]: { [operator]: [value] } },
    };

    const sortquery = {
      ...(sortQuery && {
        order: [[String(sortQuery[0].field), String(sortQuery[0].sort)]],
      }),
    };

    const dataCount = await sequelize.query(
      `SELECT Count(*) AS Total_Rows From ${table} where ${Object.keys(filterquery.where)} ${rowQueryOp} ${rowQueryValue}`,
      { type: QueryTypes.SELECT }
    );

    const Data = await modelsTable.findAll({
      ...filterquery,
      offset: Number(offset),
      limit: Number(limit),
      ...sortquery,
    });

    res.json({
      totalCount: dataCount[0].Total_Rows,
      data: Data,
    });
  } catch (error) {
    getData(sequelize, modelsTable, table, offset, limit, sortQuery);
  }
};

export default handleFilter;
