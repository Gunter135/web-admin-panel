import { Box, Typography, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import api from "../../api/axiosConfig";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import DoneIcon from '@mui/icons-material/Done';


const ShipmentList = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {code} = useParams();
    // retrieving one-to-many shipments items
    const[shipmentItem,setShipmentItem] = useState([]);
    const[shipment,setShipment] = useState([]);
    const getShipmentItem = async () =>{
        try{
          const response = await api.get("/flower_shipments/" + code);
          const response1 = await api.get("/shipments/" + code);
          //console.log(response.data);
          setShipmentItem(response.data);
          setShipment(response1.data);
        }
        catch(err){
          console.log(err);
        }
      }
      useEffect(() =>{
        getShipmentItem();
      },[])
    //console.log(shipmentItem)


    const updateStatus = async () =>{
        if(code !== undefined){
            try{
                const response = await api.get("/shipments/"+code+"/change");
                //console.log(response)
                window.location.reload();
            }
            catch(err){
                
            }
      }}

      const columns = [{
        field:"id",
        headerName:"ID",
        flex: 0.5,
    },
    {
        field:"name",
        headerName:"Name",
        flex: 0.5,
    },
    {
        field:"total_price",
        headerName:"Total Price",
        flex: 0.5,
        renderCell:(params) =>(
            <Typography color={colors.greenAccent[500]}>
                {params.row.total_price} ₽
            </Typography>

        )
    },
    {
        field:"purchase_price",
        headerName:"Purchase Price",
        flex: 0.5,
        renderCell:(params) =>(
            <Typography color={colors.greenAccent[500]}>
                {params.row.purchase_price} ₽
            </Typography>

        )
    },
    {
        field:"amount",
        headerName:"Amount",
        flex: 0.5
    },
    {
        field:"code",
        headerName:"Code",
        flex: 0.5,
        hide: true
    },
    ]

    return(
        <Box>
            <Header title="Приходная Накладная"/>
            {/* <p style={{borderBottom: "100px solid #f0ff00",
                        borderTop: "100px solid #ff0000"}}/> */}
            <Box>
                <Typography ml="10px" variant="h3">№ {shipment.code}</Typography>
            </Box>
            <Box
            m="40px 0 0 0"
            height="75vh"
            p="0 10px"
            sx={{"& .MuiDataGrid-root":{
                border: "none"
            },
            "& .MuiDataGrid-cell":{
                borderBottom: `1px solid ${colors.greenAccent[300]}`
            },
            "& .name-column-cell":{
                color: colors.greenAccent[300]
            },
            "& .MuiDataGrid-columnHeaders":{
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
                borderRadius:"0px"
            },
            "& .MuiDataGrid-virtualScroller":{
                backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer":{
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
                color: `${colors.grey[100]} !important`
            },
        }}>
             <Box backgroundColor={colors.blueAccent[700]} height="20px" borderRadius="5px 5px 0px 0px"> 
            </Box>
            <Box backgroundColor={colors.blueAccent[700]}>
                <Box pb="20px" pl="10px" display="flex" justifyContent="space-between">
                    {shipment.status ?<Button variant="contained" color="red" onClick={()=>{updateStatus()}}>Change status to opened</Button> : <Button variant="contained" color="green" onClick={()=>{updateStatus()}}>Change status to closed</Button>}
                </Box>
                <div style={{
                    borderBottom: `1px solid ${colors.primary[300]}`,
                    width : "auto",
                    maxWidth:"1520px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    }}/> 
                <Box p={"20px 0 20px 15px"} >
                    <Box display={"flex"} alignContent="space-between" alignItems="center">
                        <Typography variant="h3" fontSize={28} color={colors.grey[100]}>№ {shipment.code} arrived at {shipment.date_of_arrival}</Typography>
                        {shipment.status ? <Typography ml={"30px"} color={colors.grey[100]}><DoneIcon fontSize=""/>Carried out</Typography> : ""}
                    </Box>
                    <Box paddingTop={"20px"} display={"flex"}alignItems="center">
                        <Typography variant="h4" color={colors.grey[100]}>Provider</Typography>
                        <Typography variant="h4" ml="80px" color={colors.grey[100]}>{shipment.provider_id}</Typography>
                    </Box>
                    <Box paddingTop={"20px"} display="flex">
                        <Typography variant="h3" fontWeight={700} pr="20px" color={colors.grey[100]}>Commodities</Typography>
                        {!shipment.status ? <Button color="secondary" variant="contained" href={"/shipments/"+shipment.code+"/pricings"}>Pricings</Button>
                            : 
                            <Box backgroundColor={colors.redAccent[500]} height="40px" width="120px" borderRadius="10px 10px 10px 10px" display={"flex"} alignItems="center" justifyContent="center"> 
                                <Typography color={colors.grey[900]}>CLOSED</Typography>
                            </Box>
                        }
                    </Box>
                </Box>
            </Box>
                <DataGrid rows={shipmentItem} columns={columns} checkboxSelection/>
            </Box>
        </Box>
    )
    
}

export default ShipmentList;