import Header from "../../components/Header";
import api from "../../api/axiosConfig";
import { tokens } from "../../theme";
import { useState,useEffect } from "react";
import { useTheme } from "@emotion/react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';




const Showcase = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const [image,setImage] = useState("");
    const [bouquets,setBouquets] = useState([]);
    const[open, setOpen] = useState(false);
    const[selectedBouquet,setSelectedBouquet] = useState({
        id:"",
        price: 45000,
        name: "Blue Lagoon",
        date: "10-04-2023",
        code: "№00001",
        image_id: "64401b30c6a8ba0d2354ba7f",
        bouqFlowerCompleteList : []
    });
    const navigate = useNavigate();

    const handleClickOpen = () => {
        console.log(selectedBouquet);
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };



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
    
    const sendImage = async () => {
        //fix image uploading, js needs image to be stored somewhere,
        //also, i think it's better to stick with normal image saving
        //rather than using gridFs
        //4k image is like 8mbs~
        try{
            fetch("")
                .then(function(response) {
                    return response.blob()
                })
                .then(function(blob) {
                    setImage(blob);
                });
            console.log(image)
            const response = await api.post("/showcase/save_image",image);
            console.log(response)
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
            console.log(response.data)
        }
        catch(err){
          console.log(err);
        }
    }

    useEffect(() =>{
        getBouquets();
    },[])

    const getImage = async ({code}) => {
        try{
            const response = await api.get("/showcase/get_image/"+code);
            //console.log(response)
            setImage(response.data)
            console.log(response)
            console.log(image)
        }
        catch(err){
          console.log(err);
        }
    } 
    

    return(
        <Box>
            <Header title={"Bouquets"}></Header>
            <Box backgroundColor={colors.blueAccent[700]} height="50px" borderRadius="5px 5px 0px 0px" m="40px 10px 0px 10px"/>
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
                                <Button variant="contained" color="red">Delete Bouquet</Button>
                                <Button variant="contained" color="yellow">Disassemble</Button>  
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
                    <DialogActions>
                    </DialogActions>
            </Dialog>
        </Box>
    )
}

export default Showcase;