import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import api from "../../api/axiosConfig"
import { useState,useEffect } from "react";
import { Buffer } from "buffer";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search"



const Warehouse = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    var customArrayBuffer = [];
    const[item,setItem] = useState([]);
    const[newItem,setNewItem] = useState(
        {name: "",
        amount : 0,
        price : 0,
        on_sale : false,
        total_price : 0}
    );
    const[open,setOpen] = useState(false);
    const[filterArray,setFilterArray] = useState([]);
    //const[globalInputValue,setGlobalInputValue] = useState();
    const getFlowers = async () =>{
        try{
          const response = await api.get("/warehouse");
          //console.log(response.data);
          // DONT FORGET TO MAP ALL THE DATA YOU GET FROM API CALL, EITHER WAY IT WILL BREAK
          setItem(response.data);
          setFilterArray(response.data);
        }
        catch(err){
          console.log(err);
        }
      }
      useEffect(() =>{
        getFlowers();
      },[])
    
    //
    //
    const downloadXLS = async () =>{
        try{//🍌🍌🍌
            // const outputFilename = `${Date.now()}.xlsx`;
            const outputFilename = `Storage review.xlsx`;
            const response = await api.get("/warehouse/download/excel");
            // console.log(response.data)
            //We recieve string response from rest api and decode it with Buffer with base64
            const byteCharacters = Buffer.from(response.data,'base64')
            // const byteCharacters = atob(response.data) <- deprecated
            const byteArrays = [];
            var sliceSize = 512;
            for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                // const slice = byteCharacters.slice(offset, offset + sliceSize); <- deprecated
                const slice = byteCharacters.subarray(offset, offset + sliceSize);
                
                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice[i];
                }

                const byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }
            const blob = new Blob(byteArrays, {type: "xlsx"});
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', outputFilename);
            document.body.appendChild(link);
            link.click();
            // console.log(blob)
        }
        catch(err){
            console.log(err)
        }
    }

    const CustomizedInputBase = () =>{
        const[value,setValue] = useState();
        //console.log(value)
        // const handleSearch = (event) =>{
        //     props.click(value);
        // }
        const searchFilter = () => {
            //setGlobalInputValue(value)
            if ((value !== undefined) && (value !== null) && (value !== "")){
                for(var i = 0;i<item.length;i++){
                    if(item[i].name.includes(value)){
                        customArrayBuffer.push(item[i])
                        console.log(customArrayBuffer)
                    }
                }
                setFilterArray(customArrayBuffer)
                
            }else{
                customArrayBuffer = []
                setFilterArray(item)
            }
        }
        return(
            <Box 
                mr="20px"
                display="flex" 
                backgroundColor={colors.primary[400]} 
                borderRadius="5px"
                >
                <InputBase 
                    sx={{ml:2,flex: 1}} 
                    placeholder="Search" 
                    value={value ? value : ""}
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange={event=>{setValue(event.target.value)}}
                    onKeyDown={event=>{if(event.key === 'Enter'){searchFilter()}}}
                />
                <Button 
                    color="secondary" 
                    onClick={()=>{searchFilter()}} 
                    
                >
                    <SearchIcon/>
                </Button>
            </Box>
        )
    }

    const handleCreateItem = async () => {
        try{
            const response = await api.post("/warehouse/create",newItem);
            console.log(response)
            handleClose();
            window.location.reload();
        }
        catch(err){
          console.log(err);
        }
    }



    const handleClickOpen = () => {
        setOpen(true);
    };
      const handleClose = () => {
        setOpen(false);
    };
    //console.log(item)
    const columns = [{
        field:"_id",
        headerName:"ID",
        flex: 0.5,
        hide:true
    },
    {
        field:"name",
        headerName:"Name",
        flex: 0.5,
        renderCell:(params) =>(
            <Box>
                <Button variant="text" color="white" href={"/warehouse/"+params.row.id}>{params.row.name}</Button>
            </Box>
        )
    },
    {
        field:"amount",
        headerName:"Amount",
        flex: 0.5
    },
    {
        field:"price",
        headerName:"Price",
        flex: 0.5,
        renderCell:(params) =>(
            <Typography color={colors.greenAccent[500]}>
                {params.row.price} ₽
            </Typography>

        )
    },
    {
        field:"on_sale",
        headerName:"On sale",
        flex: 0.5,
        renderCell:(params) =>(
            params.row.on_sale ? 
            <Typography
                height = "17px"
                width = "17px"
                backgroundColor="#228b22"
                borderRadius ="50%"
                ml="20px"
            /> :
            <Typography
                height = "17px"
                width = "17px"
                backgroundColor="#ff0000"
                borderRadius ="50%"
                ml="20px"
            /> 
        )
    },
    {
        field:"total_price",
        headerName:"Total price",
        flex: 0.5,
        renderCell:(params) =>(
            <Typography color={colors.greenAccent[500]}>
                {params.row.total_price} ₽
            </Typography>

        )
    },
]

    return(
        <Box>
            <Header title="Обзор Склада"/>
            <Box
            m="40px 0 0 0"
            height="70vh"
            p="0 10px"
            sx={{"& .MuiDataGrid-root":{
                border: "none"
            },
            "& .MuiDataGrid-cell":{
                borderBottom: "none"
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
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        maxWidth={"31px"}
                    >
                        <DialogTitle id="alert-dialog-title">
                        {"Create new Item"}
                        </DialogTitle>
                        <DialogContent>
                            <Box display={"flex"} width={"fit-content"} >
                                <InputBase placeholder="Name?" onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{newItem.name = event.target.value}}></InputBase>
                                <InputBase placeholder="Price?"onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{newItem.price = event.target.value}}></InputBase>
                                <InputBase placeholder="Amount?"onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{newItem.amount = event.target.value}}></InputBase>
                                <InputBase placeholder="On sale?"onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{newItem.on_sale = event.target.value}}></InputBase>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose} variant="contained" color="red">Disagree</Button>
                        <Button onClick={handleCreateItem} autoFocus variant="contained" color="green">
                            Agree
                        </Button>
                        </DialogActions>
                    </Dialog>
            <Box backgroundColor={colors.blueAccent[700]} height="20px" borderRadius="5px 5px 0px 0px"> 
            </Box>
            <Box backgroundColor={colors.blueAccent[700]}>
                <Box pb="20px" pl="10px" display="flex" justifyContent="space-between">
                    <Button variant="contained" color="secondary" onClick={downloadXLS}>Export to Excel</Button>
                    <Button variant="contained" color="secondary" onClick={handleClickOpen} sx={{mr:"700px"}}>Create new Item</Button>
                    <CustomizedInputBase/>
                </Box>
                <div style={{
                    borderBottom: `1px solid ${colors.primary[300]}`,
                    width : "auto",
                    maxWidth:"1520px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    }}/>  
            </Box>
                <DataGrid rows={filterArray} columns={columns}/>
                {/* (filterArray === undefined || filterArray.length === 0) ? item : filterArray */}
            </Box>
            
        </Box>
    )
}


export default Warehouse;