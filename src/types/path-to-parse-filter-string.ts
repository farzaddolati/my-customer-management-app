import { Op } from 'sequelize';

interface Constraint {
  value: string | null;
  matchMode: string;
}

interface FilterObject {
  [key: string]: {
    operator: string;
    constraints: Constraint[];
  };
}

export const parseFilterString = (filterString: string): any => {
    try {
      const filterObject: FilterObject = JSON.parse(filterString);
      const whereClause: any = {};
  
      for (const field in filterObject) {
        const fieldData = filterObject[field];
        if (fieldData.constraints && fieldData.constraints.length > 0) {
          const condition: any = {};
          for (const constraint of fieldData.constraints) {
            if (constraint.value !== null) {
              switch (constraint.matchMode) {
                case 'contains':
                  condition[field] = { [Op.like]: `%${constraint.value}%` };
                  break;
                case 'startsWith':
                  condition[field] = { [Op.startsWith]: constraint.value };
                  break;
                case 'equals':
                  condition[field] = { [Op.eq]: constraint.value };
                  break;
                default:
                  throw new Error('Invalid constraint match mode');
              }
            }
          }
          if (Object.keys(condition).length > 0) {
            Object.assign(whereClause, condition);
          }
        }
      }
  
      return whereClause;
    } catch (error) {
      throw new Error('Invalid filter string');
    }
  };



//     try {
//       const filterObject: FilterObject = JSON.parse(filterString);
//       const whereClause: any = {};
  
//       for (const field in filterObject) {
//         const fieldData = filterObject[field];
//         if (fieldData.constraints && fieldData.constraints.length > 0) {
//           const condition: any = {};
//           for (const constraint of fieldData.constraints) {
//             if (constraint.value !== null) {
//               switch (constraint.matchMode) {
//                 case 'contains':
//                   condition['$like'] = `%${constraint.value}%`;
//                   break;
//                 case 'startsWith':
//                   condition['$startsWith'] = constraint.value;
//                   break;
//                 default:
//                   throw new Error('Invalid constraint match mode');
//               }
//             }
//           }
//           if (Object.keys(condition).length > 0) {
//             whereClause[field] = condition;
//           }
//         } else {
//           whereClause[field] = {};
//         }
//       }
  
//       return whereClause;
//     } catch (error) {
//       throw new Error('Invalid filter string');
//     }
//   };