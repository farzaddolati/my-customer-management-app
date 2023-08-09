import React, { useEffect, useState } from "react";
import { Stationlogs } from "../types/stationlogs";
import axios from "axios";
import "primereact/resources/themes/lara-light-indigo/theme.css";    
import "primereact/resources/primereact.min.css";  
import 'primeicons/primeicons.css';
import StationlogsTable from "@/components/StationLogsTable";

import { locale,addLocale} from 'primereact/api';
import {fa} from '../models/lan.json'


addLocale('fa', fa);
locale('fa')

interface HomeProps {
  initialStationlogs: Stationlogs[];
}

const Home: React.FC<HomeProps> = ({ initialStationlogs }) => {

  const [stationlogs, setStationlogs] = useState<Stationlogs[]>(initialStationlogs);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const fetchData = async (filters?:object, page?:number, pageSize?:number) => {
    try {
      const response = await axios.get("/api/getStationLogs", { params: { filters, page,pageSize } });
      // const response = await axios.get("/api/customers", { params: {name, email,page,pageSize } });
      
      setTotalRecords(response.data.totalCount)
      setStationlogs(response.data.data);
    } catch (error) {
      console.error("Error fetching customers", error);
    }
  };

  useEffect(() => {
    fetchData();
    
  }, []);
  
  
  return (
    <div>
      <h1>Customer Management App</h1>
      {/* <CustomerForm /> */}
      {/* <CustomerTable customers={customers} fetchData={fetchData} totalCount = {totalRecords} /> */}
      <StationlogsTable stationlogs={stationlogs} fetchData={fetchData} totalCount = {totalRecords} />
    </div>
  );
};



export default Home;