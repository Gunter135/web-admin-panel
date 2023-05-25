import { ColorModeContext,useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar"
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import { useEffect, useState } from "react";
import Dashboard from "./scenes/dashboard";
import Warehouse from "./scenes/warehouse";
import Shipment from "./scenes/invoice";
import ShipmentList from "./scenes/invoiceEdit";
import ShipmentListEdit from "./scenes/invoiceEditPricing";
import WarehouseItem from "./scenes/warehouseItem";
import Showcase from "./scenes/showcase";
import ClientsList from "./scenes/clients";
import BonusGroupsList from "./scenes/bonuses";
import LoginPage from "./login/loginPage";
import { getToken } from "./api/axiosConfig";
import api from "../src/api/axiosConfig"
import { fetchUserData } from "./api/axiosConfig";
import axios from "axios";


let loggedIn = false;
// let responseResult = false;
// there is no language worse than JS
function App() {
    const [theme,colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState();
    const [obj,setObj] = useState(false);

    if(getToken()!== null && getToken()!== "null"){
        loggedIn = true;
    }
    // const fetchUserData = async () => {
    //     try{
    //         const response = await axios.post("http://localhost:8080/auth/check_token",localStorage.getItem("access_token"))
    //         setObj(response.data)
    //         if(obj === true){
    //             console.log(obj,loggedIn)
    //             loggedIn = obj
    //             console.log(obj,loggedIn)
    //         }
    //     }
    //     catch(err)
    //     {
    //         console.log(err)
    //     }
    // }
    // useEffect(() =>{
    //     fetchUserData();
    // },[])
    


    return (<ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
                {loggedIn ? 
                <div className="app" style={{display: "flex", alignItems: "flex-start"}}>
                        <Sidebar isSidebar={isSidebar}/>
                    <main className="content" style={{position:"relative",paddingLeft:"350px"}}>
                        <Topbar setIsSidebar={setIsSidebar}/>
                        <Routes>
                            <Route path="*" element={<Navigate to='/'/>}/>
                            <Route path="/" element={<Dashboard/>}/> 
                            <Route path="/warehouse" element={<Warehouse/>}/>
                            <Route path="/shipments" element={<Shipment/>}/>
                            <Route path="/showcase" element={<Showcase/>}/>
                            <Route path="/clients" element={<ClientsList/>}/>
                            <Route path="/bonuses" element={<BonusGroupsList/>}/>
                            <Route path="/warehouse/:id" element={<WarehouseItem/>}/>
                            <Route path="/shipments/:code" element={<ShipmentList/>}/>
                            <Route path="/shipments/:code/pricings" element={<ShipmentListEdit/>}/>
                        </Routes>
                    </main>
                </div>
                :
                <Routes>
                    <Route path="*" element={<Navigate to='/auth/login'/>}/>
                    <Route path="/auth/login" element={<LoginPage/>}/>
                </Routes>
                }
        </ThemeProvider>
    </ColorModeContext.Provider>
    
  );
}

export default App;
