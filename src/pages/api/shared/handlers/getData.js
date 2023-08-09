import { QueryTypes,Op } from "sequelize";
import {parseFilterString} from '../../../../types/path-to-parse-filter-string'



const getData = async (res, sequelize, modelsTable, table, offset, limit, sortQuery, filterObject) => {
  //const dataCount = await model.tbl_BigData.count({raw:true , nest:true});
  const sortquery = {
    ...(sortQuery && {
      order: [[String(sortQuery[0].field), String(sortQuery[0].sort)]],
    }),
  };
  const dataCount = await sequelize.query(
    `SELECT Total_Rows= st.row_count FROM sys.dm_db_partition_stats st WHERE object_id = object_id('${table}') and index_id < 2`,
    { type: QueryTypes.SELECT }
  );


  // console.log('DIANADIANABefor:',filterObject);

  //  const whereClause = parseFilterString(filterObject);
  const whereClause = Object.keys(filterObject).length > 0 ? parseFilterString(filterObject) : filterObject;

  //  console.log('DIANADIANA:',whereClause);

  // console.log( "Fafar2:", whereClause);

  // const filterString2 = '{"SId":{"operator":"and","constraints":[{"value":"9999","matchMode":"contains"}]},"Well_Id":{"operator":"and","constraints":[{"value":null,"matchMode":"contains"}]},"InitMoment":{"operator":"and","constraints":[{"value":null,"matchMode":"contains"}]},"null":{"operator":"and","constraints":[{"value":null,"matchMode":"startsWith"}]}}';

  // const result = parseFilterString(filterString2);
  // console.log('resultAI:',result);


  const Data = await modelsTable.findAll({  
     where: whereClause,
    //  where: { SId: { [Op.eq]: '9999' }, Well_Id: { [Op.eq]: 8915 },InitMoment:{[Op.eq]} },
    // where: filterObject,
    offset: Number(offset),
    limit: Number(limit),
    ...sortquery,
  });








  res.json({
    totalCount: dataCount[0].Total_Rows,
    data: Data,
  });
};

export default getData;
