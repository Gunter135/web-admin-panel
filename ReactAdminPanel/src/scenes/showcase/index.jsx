import Header from "../../components/Header";
import api from "../../api/axiosConfig";
import { tokens } from "../../theme";
import { useState,useEffect } from "react";
import { useTheme } from "@emotion/react";
import { Box, Button, Dialog, DialogActions, DialogContent, IconButton, InputAdornment, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import UploadImage from '../../resources/uploadImage.png'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


let nextId = 0;

const Showcase = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const [bouquets,setBouquets] = useState([]);
    const[open, setOpen] = useState(false);
    const[totalPrice,setTotalPrice] = useState(0);
    const[openCreateBouquetDialog, setOpenCreateBouquetDialog] = useState(false);
    const[uploadedImage,setUploadedImage] = useState(null);
    const[flowersForSelect, setFlowersForSelect] = useState([]);
    const[selectedFlowers,setSelectedFlowers] = useState([]);
    const[blank,setBlank] = useState()
    const[selectedBouquet,setSelectedBouquet] = useState({
        id:"",
        price: 45000,
        name: "Blue Lagoon",
        date: "10-04-2023",
        code: "№00001",
        image_id: "64401b30c6a8ba0d2354ba7f",
        bouqFlowerCompleteList : []
    });
    const[newBouquet,setNewBouquet] = useState({
        price: 0,
        name : "",
        imgb64 : "a",
        flowItemList : []
    })
    //const navigate = useNavigate();

    const handleClickOpen = () => {
        console.log(selectedBouquet);
        setOpen(true);
    };
      const handleClose = () => {
        setOpen(false);
    };
      const handleClickOpenCreateBouquetDialog = () => {
        setOpenCreateBouquetDialog(true);
    };
      const handleCloseCreateBouquetDialog = () => {
        setOpenCreateBouquetDialog(false);
    };
    
    const addEmptyItemToSelectedFlowers = () =>{
        setSelectedFlowers([...selectedFlowers,{
            id: nextId++,
            name: "",
            price: 0,
            amount: 0,
            total: 0,
        }])
        console.log(selectedFlowers)
    }
    const handleSelectedFlowerInfoUpdate = (value,id) =>{
        let flow_obj = {};
        for(let i = 0;i<flowersForSelect.length;i++){
            if (value === flowersForSelect[i].name){
                flow_obj = flowersForSelect[i]
            }
        }
        for(let i = 0;i<selectedFlowers.length;i++){
            if(id === selectedFlowers[i].id){
                selectedFlowers[i].name = flow_obj.name
                selectedFlowers[i].price = flow_obj.price
            }
        }
        //React will ignore your update if the next state is equal to the previous state,
        //and i've a workaround for this issue, implement another hook const[blank,setBlank] = useState()
        // console.log(selectedFlowers)
        // console.log("meow")
        setBlank(value)
    }

    function checkIfSelected(item){
        for(let i = 0;i < selectedFlowers.length;i++){
            if(selectedFlowers[i].name === item.name){
                return true;
            }
        }
        return false;
    }

    const calculateTotalPrice = () =>{
        var temp_var = 0
        for(let i = 0;i < selectedFlowers.length;i++){
            temp_var += selectedFlowers[i].price * selectedFlowers[i].amount
        }
        setTotalPrice(temp_var)
    }

    const updateAmountAndTotal = (value,id) => {
        for(let i = 0;i<selectedFlowers.length;i++){
            if(id === selectedFlowers[i].id){
                selectedFlowers[i].amount = value
                selectedFlowers[i].total = selectedFlowers[i].amount * selectedFlowers[i].price
            }
        }
        setBlank(value)
    }


    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setUploadedImage(URL.createObjectURL(event.target.files[0]));
            getBase64(event.target.files[0],function callbackFunc(result){
                var stripped_res = result.replace(/^data:image\/[a-z]+;base64,/, "");
                setNewBouquet({...newBouquet, imgb64: stripped_res})
            })
        }
       }
    
    function getBase64(file,callback) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            callback(reader.result)
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
    }
//     function getByteArray(file) {
//         return new Promise(function(resolve, reject) {
//             let fileReader = new FileReader();
//             var blob = new Blob([file],{type:"image/png"})
//             fileReader.readAsDataURL(blob);
//             fileReader.onload = function(ev) {
//                 // const array = new Uint8Array(ev.target.result);
//                 // const fileByteArray = [];
//                 // for (let i = 0; i < array.length; i++) {
//                 //     fileByteArray.push(array[i]);
//                 // }
//                 resolve(ev.target.result);  // successful
//                 console.log(ev.target.result)
//             }
//             fileReader.onerror = reject; // call reject if error
//     })
// }
    // const handleCreateNewBouquet = () =>{
    //     //setNewBouquet({...newBouquet,price: totalPrice,flowItemList: selectedFlowers})
    // }
    const sendNewBouquet = async () => {
        try{
            //setNewBouquet({...newBouquet,flowlist: selectedFlowers})
            // newBouquet.flowlist = selectedFlowers
            // setNewBouquet({...newBouquet,price: totalPrice,flowlist: selectedFlowers})
            //handleCreateNewBouquet()
            newBouquet.price = totalPrice;
            newBouquet.flowItemList = selectedFlowers;
            console.log(newBouquet)
            const response = await api.post("/showcase/save_new_bouquet",newBouquet)
            console.log(response)
            window.location.reload()
        }
        catch(err){
          console.log(err);
        }
    }

    const getBouquets = async () =>{
        try{
            const response = await api.get("/bouquets");
            
            //console.log(response)
            setBouquets(response.data)
            //console.log(response.data)
        }
        catch(err){
          console.log(err);
        }
    }

    const deleteBouquet = async () =>{
        try{
            const response = await api.get("/showcase/delete_bouquet/" + selectedBouquet.id);
            console.log(response)
            window.location.reload()
        }
        catch(err){
          console.log(err);
        }
    }
    const disassembleBouquet = async () =>{
        try{
            const response = await api.get("/showcase/disassemble_bouquet/" + selectedBouquet.id);
            console.log(response)
            window.location.reload()
        }
        catch(err){
          console.log(err);
        }
    }
    const getFlowersForSelect = async () =>{
        try{
            const response = await api.get("/warehouse_dto");
            //console.log(response)
            setFlowersForSelect(response.data)
            //console.log(response.data)
        }
        catch(err){
          console.log(err);
        }
    }

    useEffect(() =>{
        getBouquets();
        getFlowersForSelect();
    },[])

    
    return(
        <Box>
            <Header title={"Bouquets"}></Header>
            <Box backgroundColor={colors.blueAccent[700]} height="60px" borderRadius="5px 5px 0px 0px" m="40px 10px 0px 10px">
                <Box p="10px 0 0 10px">
                    <Button variant="contained" color="green" onClick={handleClickOpenCreateBouquetDialog}>
                        Create new bouquet
                    </Button>
                </Box>
            </Box>
            <Box 
                m="0px 10px 0 10px"
                height={Math.ceil(bouquets.length/5)*410+"px"}
                p="20px 20px"
                bgcolor={colors.primary[400]}>
                    <Box display={"grid"} sx={{gridTemplateColumns:`1fr 1fr 1fr 1fr 1fr`}}>
                        {bouquets.map(item => (
                        <div key={item.id} onClick={()=>{setSelectedBouquet(item);handleClickOpen()}}>
                            <Box pl="16px" pt={"16px"}
                            sx={{":hover":{boxShadow:`0px 0px 10px 2px ${colors.primary[700]}`},transition: "box-shadow 0.1s ease-out",cursor:"pointer"}}>
                                <img height={"270px"}  style={{objectFit: "cover",width: "clamp(90px, 100%, 270px)"}} src={`http://localhost:8080/admin/showcase/get_image/`+item.image_id} alt={item.name}/>
                                <Box
                                    position={"relative"} 
                                    bottom={"40px"} 
                                    left={"15px"} 
                                    bgcolor={colors.blueAccent[400]} 
                                    display={"flex"}
                                    justifyContent={"center"}
                                    borderRadius="100px"
                                    m={"0 75% 0 -10px"}
                                    >
                                    <Typography>{item.price} ₽</Typography>
                                </Box>
                                <Box position={"relative"} bottom="30px">
                                    <Typography fontWeight={900} fontSize={20}>{item.name}</Typography>
                                    <Typography>{item.date}</Typography>
                                    <Typography>{item.code}</Typography>
                                </Box>
                            </Box>
                        </div>
                        ))}
                    </Box>
            </Box>
            {/* <Button variant="contained" color="secondary" onClick={sendImage}>NAZHMI</Button> */}
            {/* Showcase info Dialog window */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"1000px"}
                >
                <DialogContent style={{overflowY:"auto", overflowX:"clip"}}>
                    <Box display={"flex"}>
                        <Box width={"360px"} position="relative" right={"24px"} bottom={"24px"}>
                        <img
                        height={"360px"} 
                        style={{objectFit: "cover",width: "clamp(90px, 100%, 360px)"}} src={`http://localhost:8080/admin/showcase/get_image/`+selectedBouquet.image_id} 
                        alt={selectedBouquet.name}/>
                        </Box>
                        <Box>
                            <Box>
                                <Typography variant="h1">{selectedBouquet.name}</Typography>
                                <Typography variant="h4">{selectedBouquet.date}</Typography>
                                <Typography variant="h4">{selectedBouquet.code}</Typography>
                            </Box>
                            <Box display={"flex"}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell></TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell align="right">Price</TableCell>
                                                <TableCell align="right">Amount</TableCell>
                                                <TableCell align="right">Total</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {selectedBouquet.bouqFlowerCompleteList.map((item) =>(
                                                <TableRow key={item.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell></TableCell>
                                                    <TableCell>{item.name}</TableCell>
                                                    <TableCell align="right">{item.price}</TableCell>
                                                    <TableCell align="right">{item.amount}</TableCell>
                                                    <TableCell align="right">{item.price * item.amount}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                            <Box display={"flex"} justifyContent="right" pt={"10px"} pr="10px">
                                <Typography>Total price: {selectedBouquet.price}</Typography>
                            </Box>
                            <Box display={"flex"} justifyContent="space-between" pt="20px">
                                <Button variant="contained" color="red" onClick={deleteBouquet}>Delete Bouquet</Button>
                                <Button variant="contained" color="yellow" onClick={disassembleBouquet}>Disassemble</Button>  
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
                    <DialogActions>
                    </DialogActions>
            </Dialog>
            {/* Create bouquet Dialog window */}
            <Dialog
                open={openCreateBouquetDialog}
                onClose={handleCloseCreateBouquetDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"1000px"}
                >
                <DialogContent style={{overflowY:"auto", overflowX:"clip"}}>
                    <Box display={"flex"}>
                    {/* <img alt="preview" src={uploadedImage} width="400px"/>
                         <div style={{height:"400px"}}>
                            <input type="file" accept="image/*" onChange={onImageChange}
                            style={{opacity:0}}
                            /> 
                         </div> */}
                        <div style={{display:"inline-block",position:"relative"}}>
                            <img src={uploadedImage === null ? UploadImage : uploadedImage} width="400px" alt="Photo"/>
                            <input type="file" onChange={onImageChange} style={{
                                opacity:0,
                                position:"absolute",
                                top:0,
                                left:0,
                                right:0,
                                bottom:0,
                            }}/>
                        </div>
                        <Box>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell width={"10px"}>
                                                <IconButton size="small" onClick={addEmptyItemToSelectedFlowers}>
                                                    <AddCircleIcon/>
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="right">Price</TableCell>
                                            <TableCell align="right">Amount</TableCell>
                                            <TableCell align="right">Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {selectedFlowers.map((flower) =>(
                                            <TableRow key={flower.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell >
                                                        <IconButton sx={{right: "3px"}} onClick={()=>{setSelectedFlowers(selectedFlowers.filter(item => item !== flower));calculateTotalPrice()}}>
                                                            <RemoveCircleIcon/>
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Select
                                                        label="Flower"
                                                        value={flower.name}
                                                        onChange={event=>{handleSelectedFlowerInfoUpdate(event.target.value,flower.id)}}>
                                                            {flowersForSelect.map((item)=>(
                                                                <MenuItem 
                                                                    value={item.name} 
                                                                    key={item.name}
                                                                    disabled={checkIfSelected(item)}
                                                                >
                                                                    {item.name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </TableCell>
                                                    <TableCell align="right">{flower.price}</TableCell>
                                                    <TableCell align="right">
                                                        <TextField
                                                            id="standard-number"
                                                            type="number"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            variant="standard"
                                                            onChange={
                                                                event=>{updateAmountAndTotal(event.target.value,flower.id);calculateTotalPrice()}
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell align="right">{flower.total}</TableCell>
                                                </TableRow>
                                    ))}
                                    
                                    </TableBody>
                                </Table>
                                <Box pt="10px" pb="10px" ml="10px" display={"flex"} alignItems="center">
                                    <TextField
                                        variant="standard"
                                        focused
                                        color="yellow"
                                        onChange={event=>{setNewBouquet({...newBouquet,name: event.target.value})}}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">Bouquet Name: </InputAdornment>,
                                          }}
                                        />
                                </Box>
                            </TableContainer>
                            <Box display={"flex"} justifyContent={"flex-end"} mr={"10px"} mt={"10px"}>
                                <Box>
                                    <Typography>Total price: {totalPrice}</Typography>
                                </Box>
                            </Box>
                        </Box>
                        
                    </Box>
                </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="green" size="large" onClick={()=>{sendNewBouquet()}}>Create Bouquet</Button>
                    </DialogActions>
            </Dialog>
        </Box>
    )
}

export default Showcase;