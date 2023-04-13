import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid, } from "@mui/x-data-grid";
import Header from "../../components/Header";
import api from "../../api/axiosConfig"
import { useState,useEffect } from "react";
import DraftsIcon from '@mui/icons-material/Drafts';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';



const Shipment = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const[item,setItem] = useState([]);
    const[open, setOpen] = useState(false);
    const[openA, setOpenA] = useState(false);
    const[invoiceId, setInvoiceId] = useState(false);
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

    console.log(item)

    const createNewInvoice = async () =>{
        try{
            const response = await api.get("/shipments/create");
            console.log(response)
        }
        catch(err){
          console.log(err);
        }
        window.location.reload()
    }
    //переделай кароче потом, тут нужно будет удалять через ссылку по айди
    const deleteInvoice = async () =>{
        try{
            const response = await api.get("/shipments/delete/" + invoiceId);
            console.log(response)
        }
        catch(err){
          console.log(err);
        }
        window.location.reload()
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
    const handleClickOpenA = (id) => {
        setOpenA(true);
        setInvoiceId(id)
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      const handleCloseA = () => {
        setOpenA(false);
      };
    const columns = [{
        field:"_id",
        headerName:"ID",
        flex: 0.5,
        hide: true
    },
    {
        field:"status",
        headerName:"Status",
        flex: 0.5,
        renderCell:(params) =>(
            params.row.status ? 
            <Typography>
                <MarkEmailReadIcon/> 
            </Typography> :
            <Typography>
                <DraftsIcon/>
            </Typography>

        )
    },
    {
        field:"code",
        headerName:"Invoice №",
        flex: 0.5,
        renderCell:(params) =>(
                <Button color="secondary" href={"/shipments/"+params.row.code}>
                    {params.row.code}
                </Button>
                
        )
    },
    {
        field:"date_of_arrival",
        headerName:"Date of arrival",
        flex: 0.5
    },
    {
        field:"total_price",
        headerName:"Price",
        flex: 0.5,
        renderCell:(params) =>(
            <Typography color={colors.greenAccent[500]}>
                {params.row.total_price} ₽
            </Typography>

        )
    },
    {
        field:"amount_of_items",
        headerName:"Amount",
        flex: 0.5
    },
    {
        field:"provider_id",
        headerName:"Provider",
        flex: 0.5
    },
    {
        field:"delete_button",
        headerName:"",
        flex: 0.15,
        renderCell:(params) =>(
            <Box>
                <IconButton title="Delete" onClick={()=>{handleClickOpenA(params.row.id)}}>
                    <RemoveCircleIcon/>
                </IconButton>
                <Box>
                    <Dialog
                        open={openA}
                        onClose={handleCloseA}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {"Delete this Invoice?"}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete Invoice?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseA} variant="contained" color="red">Disagree</Button>
                        <Button onClick={deleteInvoice} autoFocus variant="contained" color="green">
                            Agree
                        </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Box>
        )
    },
    ]

    return(
        <Box>
            <Header title="Приходные Накладные"/>
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
            <Box>
            
            </Box>
            <Box backgroundColor={colors.blueAccent[700]} height="20px" borderRadius="5px 5px 0px 0px"/> 
            <Box backgroundColor={colors.blueAccent[700]}>
                <Box pb="20px" pl="10px" display="flex" justifyContent="space-between">
                    <Button variant="contained" color="green" onClick={handleClickOpen}>Create new Invoice</Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {"Create new Invoice?"}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to create new Invoice?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose} variant="contained" color="red">Disagree</Button>
                        <Button onClick={createNewInvoice} autoFocus variant="contained" color="green">
                            Agree
                        </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
                <div style={{
                    borderBottom: `1px solid ${colors.primary[300]}`,
                    width : "auto",
                    maxWidth:"1520px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    }}/> 
            </Box>
                <DataGrid rows={item} columns={columns} getRowId={(row) => row.id}/>
            </Box>
        </Box>
    )
}


export default Shipment;



/** 
* Paste one or more documents here
*/
// {
//     "_id" : 1,
//      "flowers_list" : {
//        "$ref" : "FlowerStorage",
//        "$id" : "63cbecbb5c9a0b2fa32bd7c1",
//        "$db" : "flower_admin_db"
//      },
//     "date_of_arrival" : "10-03-2023",
//     "total_price" : 4100,
//     "amount_of_items": 50,
//     "provider" : {
//       "$ref" : "Provider",
//       "$id" " "63cbf7d7f59a176735a23125",
//       "$db" : "flower_admin_db"    
//     }
//   }

{/* <Box backgroundColor={colors.blueAccent[700]} height="20px" borderRadius="5px 5px 0px 0px"/> 
            <Box backgroundColor={colors.blueAccent[700]}>
                <Box pb="20px" pl="10px" display="flex" justifyContent="space-between">
                    <Button variant="contained" color="green" onClick={createNewInvoice}>Create new Invoice</Button>
                </Box>
                <div style={{
                    borderBottom: `1px solid ${colors.primary[300]}`,
                    width : "auto",
                    maxWidth:"1520px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    }}/> 
            </Box> */}