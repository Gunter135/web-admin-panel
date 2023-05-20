import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import api from "../../api/axiosConfig";
import { tokens } from "../../theme";
import { useState,useEffect } from "react";
import { useTheme } from "@mui/system";
import * as yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { getToken } from "../../api/axiosConfig";
import { Box, Button, Dialog, DialogContent, DialogTitle, Switch, TextField, Typography } from "@mui/material";




const BonusGroupsList = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const[bonusGroups,setBonusGroups] = useState([]);
    const[open,setOpen] = useState(false);
    const token = getToken();
    const initialValues = {
        name: "",
        status: false,
        percentage: 0,
        max_pay_percent: 0,
        entry_threshold: 0
    }
    const columns = [{
        field:"id",
        headerName:"ID",
        flex: 0.5,
        hide: true
    },
    {
        field:"name",
        headerName:" Bonus Group Name",
        flex: 0.5
    },
    {
        field:"status",
        headerName:"Status",
        flex: 0.5,
        renderCell:(params) =>(
            params.row.status ?
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
        field:"percentage",
        headerName:"Percentage",
        flex: 0.5
    },
    {
        field:"max_pay_percent",
        headerName:"Maximum pay percent",
        flex: 0.5
    },
    {
        field:"entry_threshold",
        headerName:"Entry Threshold",
        flex: 0.5
    },
]

    const clientValidationScheme = yup.object().shape({
        name: yup.string().required("required"),
        status: yup.bool().required("required"),
        percentage: yup.number().required("required"),
        max_pay_percent: yup.number().required("required"),
        entry_threshold: yup.number().required("required")
    })





    const getBonusGroups = async () => {
        try{
            // const response = await api.get("/bonus_groups")
            const response = await axios.get(`http://localhost:8080/admin/bonus_groups`, {
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              })

            setBonusGroups(response.data)
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(() =>{
        getBonusGroups();
    },[])

    const sendBonusGroup = async (data) => {
        try{
            const response = await api.post("/bonus_groups/add",data)
            window.location.reload()
        }
        catch(error){
            console.log(error)
        }
    }
    
    const handleS = (data) =>{console.log(data)}




    const handleClickOpen = () => {
        setOpen(true);
    };
      const handleClose = () => {
        setOpen(false);
    };

    return(
        <Box>
            <Header title={"Bonuses"}></Header>
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
                        {"Create new Bonus group"}
                        </DialogTitle>
                        <DialogContent>
                            <Box display={"flex"} width={"fit-content"} >
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={clientValidationScheme}
                                    onSubmit={handleS}
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
                                                <Box display={"flex"}>
                                                {/* <TextField
                                                    variant="filled"
                                                    type="text"
                                                    label="Status"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.phone}
                                                    name="status"
                                                    error={!!touched.phone && !!errors.phone}
                                                    helperText={touched.phone && errors.phone}  
                                                /> */}
                                                <Typography>
                                                    Set Bonus Group Status
                                                </Typography>
                                                    <Switch color="green" onChange={handleChange} name={"status"}/>
                                                </Box>
                                                <TextField    
                                                    variant="filled"
                                                    type="text"
                                                    label="Bonus Percentage"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.email}
                                                    name="percentage"
                                                    error={!!touched.email && !!errors.email}
                                                    helperText={touched.email && errors.email}
                                                    
                                                />
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label="Max bonus percent that can be spent on order"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.details}
                                                    name="max_pay_percent"
                                                    error={!!touched.details && !!errors.details}
                                                    helperText={touched.details && errors.details}
                                                    sx={{ gridColumn: "span 3" }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label="Entry Threshold"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.details}
                                                    name="entry_threshold"
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
                                    <Button variant="contained" color="secondary" onClick={handleClickOpen}>Add new Bonus Group</Button>
                                </Box>
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
                <DataGrid rows={bonusGroups} columns={columns}/>
            </Box>
        </Box>
    )
}

export default BonusGroupsList;