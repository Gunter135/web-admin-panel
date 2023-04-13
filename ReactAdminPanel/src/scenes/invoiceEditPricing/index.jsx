import { Box, Typography, Button, useTheme, IconButton} from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import api from "../../api/axiosConfig";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const ShipmentListEdit = () =>{


    // const initialTodos = [
    //     { name: "Роза"},
    //     { name: "Тюльпан"},
    //     { name: "Альстрамерия"},
    //   ];

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {code} = useParams();
    const[shipmentItem,setShipmentItem] = useState([]);
    const[shipment,setShipment] = useState([]);
    const[temporaryShipmentItem,setTemporaryShipmentItem] = useState([]);
    const[tempId,setTempId] = useState(0);
    // const[name,setName] = useState('');


    const getShipmentItem = async () =>{
        try{
            const response = await api.get("/flower_shipments/" + code);
            const response1 = await api.get("/shipments/" + code);
            //console.log(response.data);
            setShipmentItem(response.data);
            setShipment(response1.data);
            //setShipmentItem(convertObjArrayToMapArray(response.data))
        }
        catch(err){
          console.log(err);
        }
      }
      useEffect(() =>{
        getShipmentItem();
    },[])
    // for (let i = 0;shipmentItem.length;i++){
    //     shipmentItem[i].set("new_purchase_price",shipmentItem[i].purchase_price)
    //     shipmentItem[i].set("new_amount",shipmentItem[i].amount)
    // }
    // console.log(shipmentItem)
    const convertObjArrayToMapArray = (objArray) =>{
        const result = new Array();
        for(let i = 0;objArray.length > i;i++){
            const map = new Map(Object.entries(objArray[i]));
            map.set("old_total_price",objArray[i].purchase_price*objArray[i].amount)
            map.set("price_difference",0)
            map.set("old_purchase_price",objArray[i].purchase_price)
            result.push(Object.fromEntries(map))
            //console.log(map)
        }
        console.log(result)
        return result
    }
    //console.log(shipmentItem)
    //convertObjArrayToMapArray(shipmentItem)

    // var s = new Map([["key1",3],["key2",10]]);
    // if (shipmentItem[0] !== undefined){
    //     const map = new Map(Object.entries(shipmentItem[0]));
    //     console.log(map.get("name"))
    // }
    // console.log(s)
    // console.log(shipmentItem[0])
    const getTempShip = async () =>{
        try{
            const response = await api.get("/flower_shipments/" + code);
            setTemporaryShipmentItem(convertObjArrayToMapArray(response.data))
            //setTemporaryShipmentItem(response.data)
        }
        catch(err){
          console.log(err);
        }
      }
      useEffect(() =>{
        getTempShip();
    },[])

    const postPricings = async (data) =>{
        try{
            delete data.price_difference
            delete data.old_purchase_price
            delete data.old_total_price
            console.log(data)
            const response = await api.post("/flower_shipments/update",data);
            console.log(response)
        }
        catch(err){
          console.log(err);
        }
      }
    
    const handleAddRow = () => {
        setShipmentItem((prevRows) => [...prevRows, 
            {
                id: tempId,
                name: "",
                total_price: 0,
                purchase_price: 0,
                amount: 0,
                code: shipment.code,
            }]);
        setTemporaryShipmentItem((prevRows) => [...prevRows, 
                {
                    id: tempId,
                    name: "",
                    total_price: 0,
                    purchase_price: 0,
                    amount: 0,
                    code: shipment.code,
                }]);
        handleIncrement();
    };


    const handleDeleteRow = (itemId) => {
        setShipmentItem(shipmentItem.filter(s => s.id !== itemId));
        setTemporaryShipmentItem(shipmentItem.filter(s => s.id !== itemId));
    };

    const handleIncrement = () =>{
        setTempId(a=> a+1)
    }



    //
    // const handleCellEdit = useCallback(
    //     (params) => {
    //         for (let i = 0;i < temporaryShipmentItem.length;i++){
    //             if (temporaryShipmentItem[i].id === params.id){
    //                 temporaryShipmentItem[i].amount = params.new_purchase_price;
    //                 if(temporaryShipmentItem[i].amount !== undefined && temporaryShipmentItem[i].amount !== "" && temporaryShipmentItem[i].amount !== 0){
    //                     temporaryShipmentItem[i].total_price = temporaryShipmentItem[i].amount * temporaryShipmentItem[i].purchase_price
    //                 }
    //                 //console.log(value)
    //             }
    //         }
    //     },[]
    // )
    //

    //

    //
    //console.log(temporaryShipmentItem)
    // const handleName=(event)=>{
    //     setName(event.target.value)
    // }
    //
    //console.log(shipmentItem)
    //console.log(temporaryShipmentItem)
      const columns: GridColDef[] = [{
        field:"id",
        headerName:"ID",
        flex: 0.5,
        hide: true
    },
    {
        field:"delete_button",
        headerName:"",
        flex: 0.15,
        renderCell:(params) =>(
            <IconButton title="Delete" onClick={()=>{handleDeleteRow(params.row.id)}}>
                <DeleteForeverIcon/>
            </IconButton>
            
        )
    },
    {
        field:"name",
        headerName:"Name",
        flex: 0.5,
        editable: true,
        // renderCell:(params) =>(
        //     <Box sx={{ minWidth: 120 }}>
        //         <FormControl fullWidth>
        //             <InputLabel id="demo-simple-select-label">Name</InputLabel>
        //             <Select
        //             labelId="demo-simple-select-label"
        //             id="demo-simple-select"
        //             value={name}
        //             label="Name"
        //             onChange={handleName}
        //             >
        //                 <MenuItem value={params.row.name}>{}</MenuItem>
        //             </Select>
        //         </FormControl>
        //     </Box>

        // )
        valueParser: (value: any, params: GridCellParams) => {
            if (value !== undefined && value !== null && value !== ""){
                //console.log(temporaryShipmentItem)
                for (let i = 0;i < temporaryShipmentItem.length;i++){
                    if (temporaryShipmentItem[i].id === params.row.id && value !== undefined && value !== ""){
                        temporaryShipmentItem[i].name = value;
                        //console.log(value)
                    }
                }
            }
            return value;
        },
    },
    {
        field:"total_price",
        headerName:"Prevoius Total Price",
        flex: 0.5,
        renderCell:(params) =>(
            <Typography color={colors.greenAccent[500]}>
                {params.row.total_price} ₽
            </Typography>

        )
    },
    {
        field:"purchase_price",
        headerName:"Prevoius Purchase Price",
        flex: 0.5,
        renderCell:(params) =>(
            <Typography color={colors.greenAccent[500]}>
                {params.row.purchase_price} ₽
            </Typography>
        )
    },
    {
        field:"amount",
        headerName:"Prevoius Amount",
        flex: 0.5
    },
    {
        field:"code",
        headerName:"Code",
        flex: 0.5,
        hide: true,
    },
    {
        field:"new_total_price",
        headerName:"New Total Price",
        flex: 0.5, 
        renderCell:(params) =>(
            <Typography color={colors.greenAccent[500]}>
                {temporaryShipmentItem.map(val => val.id === params.row.id ? val.purchase_price*val.amount:"")} ₽
                {/* {params.row.new_amount === undefined || params.row.new_purchase_price === undefined ? "" : (params.row.new_purchase_price * params.row.new_amount) + " ₽"}  */}
            </Typography>
        ),
        valueParser: (value: any) => {
            //console.log(value)
            return value.toLowerCase();
        },
        
    },
    {
        field:"new_purchase_price",
        headerName:"New Purchase Price",
        flex: 0.5, 
        editable: true,
        type:'number',
        renderCell:(params) =>(
            <Box 
            backgroundColor={"#e9ffdb"} 
            borderRadius="10px" 
            width="140px" 
            height="40px" 
            display={"flex"} 
            alignItems="center" 
            justifyContent={"center"}
            boxShadow="2px 2px 3px #444444"
            border={`solid 2px ${colors.primary[900]}`}>>
                <Typography color={colors.greenAccent[800]}>
                    {/* {params.row.new_purchase_price === undefined ? 0: params.row.new_purchase_price}₽ */}
                    {temporaryShipmentItem.map(val => val.id === params.row.id ? val.purchase_price:"")} ₽
                    {/* {temporaryShipmentItem.map(val => val.get("id") === params.row.id ? val.get("purchase_price"):"")} */}
                </Typography>
            </Box>
        ),
        //честно, очень плохая практика на прямую редактировать значения, лучше бы через useState но я глупенький(((((
        valueParser: (value: any, params: GridCellParams) => {
            if (value !== undefined && value !== null && value !== ""){
                //console.log(temporaryShipmentItem)
                for (let i = 0;i < temporaryShipmentItem.length;i++){
                    if (temporaryShipmentItem[i].id === params.row.id && value !== undefined && value !== ""){
                        temporaryShipmentItem[i].purchase_price = Number(value);
                        temporaryShipmentItem[i].price_difference = Math.floor(((temporaryShipmentItem[i].purchase_price / temporaryShipmentItem[i].old_purchase_price - 1) * 100));
                        if(temporaryShipmentItem[i].amount !== undefined && temporaryShipmentItem[i].amount !== "" && temporaryShipmentItem[i].amount !== 0){
                            temporaryShipmentItem[i].total_price = temporaryShipmentItem[i].amount * temporaryShipmentItem[i].purchase_price
                        }
                        //console.log(value)
                    }
                }
            }
            
            console.log(temporaryShipmentItem)
            // console.log("^^^temp shipment^^^")
            // console.log(shipmentItem)
            // console.log("^^^shipment item^^^")
            return value.toLowerCase();
        },
        
        
    },
    {
        field:"new_amount",
        headerName:"New Amount",
        flex: 0.5, 
        editable: true,
        type:'number',
        renderCell:(params) =>(
            <Box  
                backgroundColor={"#e9ffdb"} 
                borderRadius="10px" 
                width="140px" 
                height="40px" 
                display={"flex"} 
                alignItems="center" 
                justifyContent={"center"}
                boxShadow="2px 2px 3px #444444"
                //у меня нет чувства вкуса, это выглядит уродливо
                border={`solid 2px ${colors.primary[900]}`}>
                <Typography color={colors.primary[900]}>
                {temporaryShipmentItem.map(val => val.id === params.row.id ? val.amount:"")}
                    {/* {params.row.new_amount === undefined ? 0 : params.row.new_amount} */}
                </Typography>
            </Box>
        ),
        valueParser: (value: any, params: GridCellParams) => {
            if (value !== undefined && value !== null && value !== ""){
                //console.log(temporaryShipmentItem)
                for (let i = 0;i < temporaryShipmentItem.length;i++){
                    if (temporaryShipmentItem[i].id === params.row.id && value !== undefined && value !== ""){
                        temporaryShipmentItem[i].amount = Number(value);
                        if(temporaryShipmentItem[i].amount !== undefined && temporaryShipmentItem[i].amount !== "" && temporaryShipmentItem[i].amount !== 0){
                            temporaryShipmentItem[i].total_price = temporaryShipmentItem[i].amount * temporaryShipmentItem[i].purchase_price
                        }
                        //console.log(value)
                    }
                }
            }
            //console.log(temporaryShipmentItem)
            return value.toLowerCase();
        },
    },
    {
        field:"price_difference",
        headerName:"Price Difference",
        flex: 0.5, 
        renderCell:(params) =>(
            <Box pr="60px">
                {
                    temporaryShipmentItem.map(val => val.id === params.row.id ? 
                        val.price_difference !== undefined &&
                        val.price_difference !== null &&
                        val.price_difference !== 0 ?
                        val.price_difference > 0 ? 
                        <Typography color={colors.greenAccent[400]}>
                            {temporaryShipmentItem.map(val => val.id === params.row.id ? 
                                val.price_difference + "% ↑"
                                :"")}
                            {/* {("+" +Math.floor(((params.row.new_purchase_price / params.row.purchase_price - 1) * 100)) + "% ↑")} */}
                        </Typography> 
                        : 
                        <Typography color={colors.redAccent[400]}>
                            {temporaryShipmentItem.map(val => val.id === params.row.id ? 
                                (Math.floor(((val.purchase_price / val.old_purchase_price - 1) * 100)) + "% ↓")
                                :"")}
                            {/* {(Math.floor(((params.row.new_purchase_price / params.row.purchase_price - 1) * 100)) + "% ↓")} */}
                        </Typography>
                        : ""
                        :"")

            }
            </Box>
        ),
        valueParser: (value: any) => {
            return value.toLowerCase();
        },
    },
    ]
    return(
        <Box>
            <Header title="Приходная Накладная Pricings"/>
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
                    <Box backgroundColor={colors.blueAccent[700]} height="20px" borderRadius="5px 5px 0px 0px"> 
                    </Box>
                    <Box backgroundColor={colors.blueAccent[700]}>
                        <Box pb="20px" pl="10px" display="flex" justifyContent="space-between">
                            <Button variant="contained" color="secondary" onClick={()=>{postPricings(temporaryShipmentItem)}} href={"/shipments/"+code}>Submit Prices</Button>
                        </Box>
                        <Box pb="20px" pl="10px" display="flex" justifyContent="space-between">
                            <Button variant="contained" color="secondary" onClick={()=>{handleAddRow()}}>Add row</Button>
                        </Box>
                        <div style={{
                            borderBottom: `1px solid ${colors.primary[300]}`,
                            width : "auto",
                            maxWidth:"1520px",
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}/> 
                    </Box>
                <DataGrid rows={shipmentItem} columns={columns}/>
            </Box>
            
        </Box>
    )
}
export default ShipmentListEdit;
//IMPLEMENT SNACKBOX AND DIALOGUE TO CHECK IF CLIENT REALLY WANTS TO CONFIRM HIS ACTION