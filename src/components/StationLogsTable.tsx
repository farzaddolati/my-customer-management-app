import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column} from "primereact/column";
import { Stationlogs } from "../types/stationlogs";
import axios from "axios";
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { Calendar,CalendarChangeEvent  } from 'primereact/calendar';
import { Json } from "sequelize/types/utils";

interface StationlogsTableProps {
    stationlogs: Stationlogs[];
  fetchData: ( filters?:object, page?: number, pageSize?: number) => void;
  totalCount:number;
}

const StationlogsTable: React.FC<StationlogsTableProps> = ({ stationlogs, fetchData,totalCount }) => {
  const [selectedStationlogs, setSelectedStationlogs] = useState<Stationlogs | undefined>(undefined);
  const [filters, setFilters] = useState<{ [key: string]: any }>({});
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  useEffect(() => {    
    fetchData( filters, currentPage, pageSize);        
  }, [filters,currentPage, pageSize]);



  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setCurrentPage(event.page + 1);
    setPageSize(event.rows);
};
  const [date, setDate] = useState<string | Date | Date[] | null>(null);
  const handleDelete = async (stationlogId: number) => {
    try {
      await axios.delete("/api/getStationLogs", { params: { id: stationlogId } });
      setSelectedStationlogs(undefined);
      
      fetchData(filters, currentPage, pageSize);
    } catch (error) {
      console.error("Error deleting stationlogs", error);
    }
  };
  const onFilter = (e: any) => {
    console.log("e.filters:",e.filters);
    // setFilters({filters:  e.filters});
    setFilters({ filters: JSON.stringify(e.filters) });
    console.log("filtersfilters:",filters);
  };
  
  return (
    <>
          <div className="card flex justify-content-center">
            <Calendar value={date}  locale="fa" />
        </div>
    <DataTable onFilter={onFilter}
     
    tableStyle={{ minWidth: '50rem' }}
      value={stationlogs}
      rows={pageSize}
      totalRecords={totalCount}
      dataKey="Id"
      selectionMode="single"
      selection={selectedStationlogs}
      onSelectionChange={(e) => {
        if (Array.isArray(e.value)) {
          setSelectedStationlogs(e.value[0]);
        } else {
          setSelectedStationlogs(undefined);
        }
      }}
    >
      <Column field="SId" header="SId" filter  filterMatchMode="contains"   />
      <Column field="Well_Id" header="Well Id" filter filterMatchMode="contains"   />
      <Column field="InitMoment" header="initialmoment" filter filterMatchMode="contains"  />
      <Column
        header="Actions"
        body={(rowData: Stationlogs) => {
          return (
            <div>
              <button onClick={() => handleDelete(rowData.Id)}>Delete</button>
            </div>
          );
        }}
      />
    
    </DataTable>    
    <Paginator first={(currentPage * pageSize) - pageSize < 0 ? 0 :(currentPage * pageSize) - pageSize } rows={pageSize} totalRecords={totalCount} rowsPerPageOptions={[5,10, 20, 30,100,1000]} onPageChange={onPageChange} />
    </>
  );
};
export default StationlogsTable;











