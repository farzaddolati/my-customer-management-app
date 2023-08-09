import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Customer } from "../types/customer";
import axios from "axios";
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
interface CustomerTableProps {
  customers: Customer[];
  fetchData: (name?: string, email?: string, page?: number, pageSize?: number) => void;
  totalCount:number;
}

const CustomerTable: React.FC<CustomerTableProps> = ({ customers, fetchData,totalCount }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>(undefined);
  const [filters, setFilters] = useState<{ [key: string]: any }>({});
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  useEffect(() => {
    fetchData(filters["name"], filters["email"], currentPage, pageSize);
    
  }, [filters, currentPage, pageSize]);




  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setCurrentPage(event.page + 1);
    setPageSize(event.rows);
};

  const handleDelete = async (customerId: number) => {
    try {
      await axios.delete("/api/customers", { params: { id: customerId } });
      setSelectedCustomer(undefined);
      fetchData(filters["name"], filters["email"], currentPage, pageSize);
    } catch (error) {
      console.error("Error deleting customer", error);
    }
  };

  const onFilter = (e: any) => {
    setFilters((prevFilters) => ({ ...prevFilters, [e.field]: e.value }));
  };

  return (
    <>
   
    <DataTable
    tableStyle={{ minWidth: '50rem' }}
      value={customers}
      rows={pageSize}
      totalRecords={totalCount}
      dataKey="id"
      selectionMode="single"
      selection={selectedCustomer}
      onSelectionChange={(e) => {
        if (Array.isArray(e.value)) {
          setSelectedCustomer(e.value[0]);
        } else {
          setSelectedCustomer(undefined);
        }
      }}
    >
      <Column field="name" header="Name" filter filterMatchMode="contains" filterFunction={onFilter} />
      <Column field="email" header="Email" filter filterMatchMode="contains" filterFunction={onFilter} />
      <Column field="address" header="Address" filter filterMatchMode="contains" filterFunction={onFilter} />
      <Column
        header="Actions"
        body={(rowData: Customer) => {
          return (
            <div>
              <button onClick={() => handleDelete(rowData.id)}>Delete</button>
            </div>
          );
        }}
      />
     
    </DataTable>
    <Paginator first={currentPage} rows={pageSize} totalRecords={120} rowsPerPageOptions={[5,10, 20, 30]} onPageChange={onPageChange} />
    </>
  );
};

export default CustomerTable;









// import React, { useState, useEffect } from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Customer } from "../types/customer";
// import axios from "axios";
// import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
// interface CustomerTableProps {
//   customers: Customer[];
//   fetchData: (name?: string, email?: string, page?: number, pageSize?: number) => void;
//   totalCount:number;
// }

// const CustomerTable: React.FC<CustomerTableProps> = ({ customers, fetchData,totalCount }) => {
//   const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>(undefined);
//   const [filters, setFilters] = useState<{ [key: string]: any }>({});
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [pageSize, setPageSize] = useState<number>(10);
//   const [totalRecords, setTotalRecords] = useState<number>(0);
//   useEffect(() => {
//     fetchData(filters["name"], filters["email"], currentPage, pageSize);
    
//   }, [filters, currentPage, pageSize]);


//   const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedPageSize = parseInt(event.target.value);
//     setPageSize(selectedPageSize);
//   };
//   const handlePageChange = (event: any) => {
//     setCurrentPage(event.page + 1);
//   };

//   const onPageChange = (event: PaginatorPageChangeEvent) => {
//     setCurrentPage(event.first);
//     setPageSize(event.rows);
// };

//   const handleDelete = async (customerId: number) => {
//     try {
//       await axios.delete("/api/customers", { params: { id: customerId } });
//       setSelectedCustomer(undefined);
//       fetchData(filters["name"], filters["email"], currentPage, pageSize);
//     } catch (error) {
//       console.error("Error deleting customer", error);
//     }
//   };

//   const onFilter = (e: any) => {
//     setFilters((prevFilters) => ({ ...prevFilters, [e.field]: e.value }));
//   };



//   return (
//     <>
//     <select value={pageSize} onChange={handlePageSizeChange}>
//     <option value={2}>2</option>
//     <option value={10}>10</option>
//     <option value={20}>20</option>
//     <option value={50}>50</option>
//     <option value={100}>100</option>
//     <option value={500}>500</option>
//     <option value={1000}>1000</option>
//   </select>
//     <DataTable
//     tableStyle={{ minWidth: '50rem' }}
//       value={customers}

      
      
//       // paginator
//       // paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
//       rows={pageSize}
//       rowsPerPageOptions={[5, 10,  25, 50]} 
//       totalRecords={totalCount}
//       // onPage={(event) => setCurrentPage(event.first / event.rows + 1)}
//       onPage={handlePageChange}
//       dataKey="id"
//       selectionMode="single"
//       selection={selectedCustomer}
//       onSelectionChange={(e) => {
//         if (Array.isArray(e.value)) {
//           setSelectedCustomer(e.value[0]);
//         } else {
//           setSelectedCustomer(undefined);
//         }
//       }}
//     >
//       <Column field="name" header="Name" filter filterMatchMode="contains" filterFunction={onFilter} />
//       <Column field="email" header="Email" filter filterMatchMode="contains" filterFunction={onFilter} />
//       <Column field="address" header="Address" filter filterMatchMode="contains" filterFunction={onFilter} />
//       <Column
//         header="Actions"
//         body={(rowData: Customer) => {
//           return (
//             <div>
//               <button onClick={() => handleDelete(rowData.id)}>Delete</button>
//             </div>
//           );
//         }}
//       />
     
//     </DataTable>
//     <Paginator first={currentPage} rows={pageSize} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
//     </>
//   );
// };

// export default CustomerTable;



