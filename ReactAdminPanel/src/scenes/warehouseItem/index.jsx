import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputBase, Switch, useTheme } from "@mui/material"
import { tokens } from "../../theme";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import Header from "../../components/Header";
import api from "../../api/axiosConfig";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const WarehouseItem = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {id} = useParams();
    const [inEditMode,setInEditMode] = useState(false);
    const [checked,setChecked] = useState(true);
    const [amountState,setAmountState] = useState(0);
    const [priceState,setPriceState] = useState(0);
    const[open, setOpen] = useState(false);
    const[openDiscard, setOpenDiscard] = useState(false);
    const[openDelete, setOpenDelete] = useState(false);
    const [item,setItem] = useState(
        {
            id: "",
            name: "",
            amount: 0,
            price: 0,
            on_sale: true,
            total_price: 0,
        }
    );
    const getFlowerStorageItem = async () => {
        try{
            const response = await api.get("/warehouse/" + id)
            setItem(response.data)
            setChecked(response.data.on_sale)
            setPriceState(response.data.price)
            setAmountState(response.data.amount)
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(() =>{
        getFlowerStorageItem();
    },[])


    const handleDeleteItem = async () => {
        try{
            const response = await api.post("/warehouse/delete",item);
            console.log(response)
            handleCloseDelete()
        }
        catch(err){
          console.log(err);
        }
    }

    const handleSubmitChange = async () => {
        try{
            item.amount = amountState;
            item.price = priceState;
            item.on_sale = checked;
            item.total_price = item.price * item.amount;
            console.log(item)
            const response = await api.post("/warehouse/update",item);
            console.log(response)
            handleClose();
            handleInEditMode();
        }
        catch(err){
          console.log(err);
        }

    }
    const handleInEditMode = () => {
        setInEditMode(!inEditMode);
        
    }
    const handleExitEditMode = () =>{
        setInEditMode(item.on_sale)
        handleCloseDiscard();
        window.location.reload()
    }
    const handleChecked = () => {
        setChecked(!checked)
    }
    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
      const handleClickOpenDiscard = () => {
        setOpenDiscard(true);
      };
      const handleCloseDiscard = () => {
        setOpenDiscard(false);
      };
      const handleClickOpenDelete = () => {
        setOpenDelete(true);
      };
      const handleCloseDelete = () => {
        setOpenDelete(false);
      };
    return(
        <Box>
            <Box pb={"50px"}>
                <Header title={item.name}/>
            </Box>
            <Box backgroundColor={colors.blueAccent[700]} height="50px" borderRadius="5px 5px 0px 0px" m="0 10px 0px 10px" display={"flex"} justifyContent="space-between">
                <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {"Submit Changes?"}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose} variant="contained" color="red">Disagree</Button>
                        <Button onClick={handleSubmitChange} autoFocus variant="contained" color="green">
                            Agree
                        </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={openDiscard}
                        onClose={handleCloseDiscard}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {"Discard Changes?"}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseDiscard} variant="contained" color="red">Disagree</Button>
                        <Button onClick={handleExitEditMode} autoFocus variant="contained" color="green">
                            Agree
                        </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={openDelete}
                        onClose={handleCloseDelete}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {"Delete this Item?"}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseDelete} variant="contained" color="red">Disagree</Button>
                        <Button onClick={handleDeleteItem} href={"/warehouse"} autoFocus variant="contained" color="green">
                            Agree
                        </Button>
                        </DialogActions>
                    </Dialog>
                <Box pl="10px" pt={"5px"}>
                    {inEditMode ? <Button color="secondary" variant="contained" sx={{height:"40px"}} onClick={handleClickOpen}>Submit Change</Button> : <Button color="secondary" variant="contained" sx={{height:"40px"}} onClick={handleInEditMode}>Edit Mode</Button>}
                </Box>
                <Box pr="10px" pt={"5px"}>
                    {inEditMode ? <Button color="red" variant="contained" sx={{height:"40px"}} onClick={handleClickOpenDiscard} >Discard Changes</Button> : <Button color="red" variant="contained" sx={{height:"40px"}} onClick={handleClickOpenDelete}>Delete Item</Button>}
                </Box>
            </Box>
            <Box bgcolor={colors.primary[400]} height="70vh"sx={{ minHeight: 350 }} m="0 10px 0px 10px">
                <Box bgcolor={colors.blueAccent[700]} 
                    height="140px" 
                    display={"flex"} 
                    top="80px" 
                    position={"relative"} 
                    marginLeft="40px" 
                    marginRight="40px"
                    boxShadow={"4px 4px 10px black"}>
                    {/* ПОМЕНЯТЬ ПРОСТО TABLE CELL НА TABLE CELL с INPUTBASE с теринарным оператором и кнопкой Edit чтобы включить часть с inputbase */}
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow sx={{bgcolor: colors.blueAccent[700]}}>
                                <TableCell>Name</TableCell>
                                <TableCell >Amount&nbsp;</TableCell>
                                <TableCell >Price&nbsp;</TableCell>
                                <TableCell >On sale&nbsp;</TableCell>
                                <TableCell >Total price&nbsp;</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody sx={{bgcolor: colors.primary[400]}}>
                                <TableRow
                                key={item.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {item.name}
                                    </TableCell>
                                    <TableCell>{inEditMode ? <InputBase onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setAmountState(event.target.value)}} defaultValue={item.amount}/> : item.amount}</TableCell>
                                    <TableCell>{inEditMode ? <InputBase onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setPriceState(event.target.value)}} defaultValue={item.price}/> : item.price}</TableCell>
                                    <TableCell>
                                        {inEditMode ? 
                                            <Switch onChange={handleChecked} color="green" checked={checked !== undefined ? checked:checked}/> : 
                                            <Switch color="green" disabled checked={checked !== undefined ? checked:checked}/>}
                                    </TableCell>
                                    <TableCell>{item.total_price}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
            <Box backgroundColor={colors.blueAccent[700]} height="40px" borderRadius="0px 0px 5px 5px" m="0 10px 0px 10px"/>
        </Box>
    )
}

export default WarehouseItem;