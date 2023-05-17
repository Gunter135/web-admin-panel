import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import api from "../../api/axiosConfig";
import { tokens } from "../../theme";
import { useState,useEffect } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import { Buffer } from "buffer";
import * as yup from "yup";
import SearchIcon from "@mui/icons-material/Search"
import InputBase from "@mui/material/InputBase";


var value = "";

const CustomizedInputBase = ({searchFilter}) =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return(
        <Box 
            mr="20px"
            display="flex" 
            backgroundColor={colors.primary[400]} 
            borderRadius="5px"
            >
            <InputBase 
                sx={{ml:2,flex: 1}} 
                
                placeholder="Enter phone,email,name" 
                inputProps={{ 'aria-label': 'search google maps' }}
                value={value}
                onChange={event=>{value = event.target.value;searchFilter()}}
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


const ClientsList = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const[clients,setClients] = useState([]);
    const[open, setOpen] = useState(false);
    const[filterArray,setFilterArray] = useState([]);
    var customArrayBuffer = [];
    const initialValues = {
        name: "",
        phone: "",
        email: "",
        details: ""
    }
    const columns = [{
        field:"id",
        headerName:"ID",
        flex: 0.5,
        hide: true
    },
    {
        field:"name",
        headerName:"Name",
        flex: 0.5
    },
    {
        field:"phone",
        headerName:"Phone",
        flex: 0.5
    },
    {
        field:"email",
        headerName:"Email",
        flex: 0.5
    },
    {
        field:"avg_check",
        headerName:"Average Purchase",
        flex: 0.25
    },
    {
        field:"orders_price_sum",
        headerName:"Total purchases sum",
        flex: 0.25
    },
    {
        field:"bonuses",
        headerName:"Bonuses",
        flex: 0.25
    },
    {
        field:"bonusGroup",
        headerName:"Bonus %",
        flex: 0.25,
        renderCell:(params) =>(
            <Typography>
                {params.row.bonusGroup} %
            </Typography>
        )
    },
]
    // next step to modify client purchases i've got to make another app that works something like cashbox?

    const getClients = async () => {
        try{
            const response = await api.get("/clients")
            setClients(response.data)
            setFilterArray(response.data)
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(() =>{
        getClients();
    },[])


    const sendClient = async (data) => {
        try{
            const response = await api.post("/clients/add",data)
            window.location.reload()
        }
        catch(error){
            console.log(error)
        }
    }

    const searchFilter = () => {
        if ((value !== undefined) && (value !== null) && (value !== "")){
            for(let i = 0;i<clients.length;i++){
                if(clients[i].name.includes(value) || (clients[i].phone.includes(value)) || (clients[i].email.includes(value))){
                    customArrayBuffer.push(clients[i])
                    //console.log(customArrayBuffer)
                }
            }
            setFilterArray(customArrayBuffer)
            
        }else{
            customArrayBuffer = []
            setFilterArray(clients)
        }
    }

    const downloadXLS = async () =>{
        try{
            // const outputFilename = `${Date.now()}.xlsx`;
            const outputFilename = `Clients.xlsx`;
            const response = await api.get("/clients/download/excel");
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



    const handleClickOpen = () => {
        setOpen(true);
    };
      const handleClose = () => {
        setOpen(false);
    };
    const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
    const clientValidationScheme = yup.object().shape({
        name: yup.string().required("required"),
        phone: yup.string().matches(phoneRegExp,"Enter valid phone number").required("required"),
        email: yup.string().email("Enter valid email").required("required"),
        details: yup.string().required("required")
    })


    return(
        <Box>
            <Header title={"Clients"}></Header>
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
                '& .MuiDataGrid-cell--editing': {
                    
                  },
                  '& .MuiDataGrid-editInputCell':{
                    color:colors.greenAccent[300],
                    padding: "20px",
                    display:"flex",
                    alignContent:"center",
                    justifyContent:"center",
                    bgcolor: colors.primary[400]
                  },
                }}>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        maxWidth={"1080px"}
                    >
                        <DialogTitle id="alert-dialog-title">
                        {"Add new Client"}
                        </DialogTitle>
                        <DialogContent>
                            <Box display={"flex"} width={"fit-content"} >
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={clientValidationScheme}
                                    onSubmit={sendClient}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleBlur,
                                        handleChange,
                                        handleSubmit,
                                    }) => (
                                        <form onSubmit={handleSubmit}>
                                            <Box
                                                display="grid"
                                                gap="30px"
                                                gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                                            >
                                                <TextField  
                                                    variant="filled"
                                                    type="text"
                                                    label="Name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.name}
                                                    name="name"
                                                    error={!!touched.name && !!errors.name}
                                                    helperText={touched.name && errors.name}
                                                />
                                                <TextField
                                                    variant="filled"
                                                    type="text"
                                                    label="Phone Number"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.phone}
                                                    name="phone"
                                                    error={!!touched.phone && !!errors.phone}
                                                    helperText={touched.phone && errors.phone}
                                                    
                                                />
                                                <TextField    
                                                    variant="filled"
                                                    type="text"
                                                    label="Email"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.email}
                                                    name="email"
                                                    error={!!touched.email && !!errors.email}
                                                    helperText={touched.email && errors.email}
                                                    
                                                />
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label="Details"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.details}
                                                    name="details"
                                                    error={!!touched.details && !!errors.details}
                                                    helperText={touched.details && errors.details}
                                                    sx={{ gridColumn: "span 3" }}
                                                />
                                                <Button color="red" variant="contained" onClick={handleClose}>
                                                    Dismiss
                                                </Button>
                                                <Box>
                                                </Box>
                                                <Button type="submit" color="secondary" variant="contained">
                                                    Add
                                                </Button>
                                            </Box>
                                        </form>
                                        )
                                    }
                                </Formik>
                            </Box>
                        </DialogContent>
                    </Dialog>
                    <Box backgroundColor={colors.blueAccent[700]} height="20px" borderRadius="5px 5px 0px 0px"> 
                    </Box>
                    <Box backgroundColor={colors.blueAccent[700]}>
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <Box display={"flex"}>
                                <Box pb="20px" pl="10px" display="flex" justifyContent="space-between">
                                    <Button variant="contained" color="secondary" onClick={handleClickOpen}>Add new client</Button>
                                </Box>
                                <Box pb="20px" pl="10px" display="flex" justifyContent="space-between">
                                    <Button variant="contained" color="secondary" onClick={downloadXLS}>Export to excel</Button>
                                </Box>
                            </Box>
                            <Box pb={"20px"} display={"flex"} justifyContent={"flex-end"}>
                                <CustomizedInputBase searchFilter={searchFilter}/>
                            </Box>
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
            </Box>
        </Box>
    )
}
export default ClientsList;