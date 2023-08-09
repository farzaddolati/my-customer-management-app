// import { Customer } from './../../types/customer';
import { NextApiRequest, NextApiResponse } from "next";
import { Sequelize, Model, DataTypes, QueryTypes } from "sequelize";
import { Op } from 'sequelize';
// تنظیمات اتصال به پایگاه داده
const sequelize = new Sequelize('customer_db', 'sa', 'ifa123456sanat@', {
  host: '192.168.1.7',
  dialect: 'mssql', // می‌توانید از انواع دیگری مانند 'postgres', 'sqlite', 'mssql' استفاده کنید
});

// تعریف مدل مشتری
class Customer extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public address!: string;
}

Customer.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    // allowNull: false,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    // allowNull: false,
    // unique: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
    // allowNull: false,
  },
}, {
  sequelize,
  tableName: "Customer", // اسم جدول در پایگاه داده
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === "GET") {
    // Server-side filtering


    const { name, email, page, pageSize } = req.query;

    // Prepare filter options based on query parameters
    const filterOptions: any = {};
    if (name) {
      filterOptions.name = {
        [Op.like]: `%${name}%`,
      };
    }
    if (email) {
      filterOptions.email = {
        [Op.like]: `%${email}%`,
      };
    }

    const currentPage = parseInt(page as string) || 1;
    const itemsPerPage = parseInt(pageSize as string) || 10;
    

    try {
      // const totalCount = await Customer.count({
      //   where: filterOptions,
      // });


      const totalCount = 100;

      
      const customers = await Customer.findAll({
        where: filterOptions,
        offset: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage,
      });

      


      return res.status(200).json({ totalCount, customers });
    } catch (error) {
      return res.status(500).json({ message: "Error fetching customers1" });
    }
  } else if (method === "POST") {
    try {
      const { name, email, address } = req.body;
      const newCustomer = await Customer.create({
        name,
        email,
        address,
      });
      return res.status(201).json(newCustomer);
    } catch (error) {
      return res.status(500).json({ message: "Error creating customer" });
    }
  } else if (method === "DELETE") {
    try {
      const customerId = parseInt(req.query.id as string);

      await Customer.destroy({
        where: { id: customerId },
      });
      return res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting customer" });
    }
  }

  return res.status(405).end();
}








// import { log } from "console";
// import prisma from "../../services/prisma";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { method } = req;

//   if (method === "GET") {
//     // Server-side filtering

//     console.log(req.query);
    
//     const { name, email,page, pageSize} = req.query;

//     // Prepare filter options based on query parameters
//     const filterOptions: any = {};
//     if (name) {
//       filterOptions.name = {
//         contains: name.toString(),
//       };
//     }
//     if (email) {
//       filterOptions.email = {
//         contains: email.toString(),
//       };
//     }
//     console.log('page:',page);
    
//     const currentPage = parseInt(page as string) || 1;
//     const itemsPerPage = parseInt(pageSize as string) || 10;
//     console.log('currentPage:',currentPage);
//     console.log('itemsPerPage',itemsPerPage);
    
    
//     try {
//       const totalCount = await prisma.customer.count({
//         where: filterOptions,
//       });



//       const customers = await prisma.customer.findMany({
//         where: filterOptions,
//         skip: (currentPage - 1) * itemsPerPage,
//         take: itemsPerPage,
//       });

//       return res.status(200).json({ totalCount, customers });
//     } catch (error) {
//       return res.status(500).json({ message: "Error fetching customers" });
//     }
//   } else if (method === "POST") {
//     try {
//       const { name, email, address } = req.body;
//       const newCustomer = await prisma.customer.create({
//         data: {
//           name,
//           email,
//           address,
//         },
//       });
//       return res.status(201).json(newCustomer);
//     } catch (error) {
//       return res.status(500).json({ message: "Error creating customer" });
//     }
//   } else if (method === "DELETE") {
//     try {
//       const customerId = parseInt(req.query.id as string);

//       await prisma.customer.delete({
//         where: { id: customerId },
//       });
//       return res.status(200).json({ message: "Customer deleted successfully" });
//     } catch (error) {
//       return res.status(500).json({ message: "Error deleting customer" });
//     }
//   }

//   return res.status(405).end();
// }

/////////////////////////////////////////////////////////////////////////////////////

// import prisma from "../../services/prisma";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "GET") {   
//     // Server-side filtering
//     const { name, email } = req.query;

//     // Prepare filter options based on query parameters
//     const filterOptions: any = {};
//     if (name) {
//       filterOptions.name = {
//         contains: name.toString(),
//       };
//     }
//     if (email) {
//       filterOptions.email = {
//         contains: email.toString(),
//       };
//     }

//     const customers = await prisma.customer.findMany({
//       where: filterOptions,
//     });
//     return res.status(200).json(customers);
//   } else if (req.method === "POST") {
//     try {
     
//       const { name, email, address } = req.body;
//       const newCustomer = await prisma.customer.create({
//         data: {
//           name,
//           email,
//           address,
//         },
//       });
//       return res.status(201).json(newCustomer);
//     } catch (error) {
//       return res.status(500).json({ message: "Error creating customer" });
//     }
//   } else if (req.method === "DELETE") {
//     try {

//       const customerId = parseInt(req.query.id as string);
     
//       await prisma.customer.delete({
//         where: { id: customerId },
//       });
//       return res.status(200).json({ message: "Customer deleted successfully" });
//     } catch (error) {
//       return res.status(500).json({ message: "Error deleting customer" });
//     }
//   }

//   return res.status(405).end();
// }