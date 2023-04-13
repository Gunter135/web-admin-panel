import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid, } from "@mui/x-data-grid";
import Header from "../../components/Header";
import api from "../../api/axiosConfig"
import { useState,useEffect } from "react";



const initialValues = {
    date_of_arrival: "01.01.1970, 7:30",
    contact: "",
    address1: "",
    address2: "",
}

const Form = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const[item,setItem] = useState([]);
    const getShipment = async () =>{
        try{
          const response = await api.get("/shipments");
          //console.log(response.data);
          setItem(response.data);
        }
        catch(err){
          console.log(err);
        }
      }
      useEffect(() =>{
        getShipment();
      },[])
    return (
        <Box>
            <Header title="New Invoice"/>
        </Box>
    )
}
export default Form;