import { ColorModeContext,useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar"
import { Route, Routes } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import { useState } from "react";
import Dashboard from "./scenes/dashboard";
import Warehouse from "./scenes/warehouse";
import Shipment from "./scenes/invoice";
import ShipmentList from "./scenes/invoiceEdit";
import ShipmentListEdit from "./scenes/invoiceEditPricing";
import WarehouseItem from "./scenes/warehouseItem";
import Showcase from "./scenes/showcase";


function App() {
    const [theme,colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState();

    return (<ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
                <div className="app" style={{display: "flex", alignItems: "flex-start"}}>
                        <Sidebar isSidebar={isSidebar}/>
                    <main className="content" style={{position:"relative",paddingLeft:"350px"}}>
                        <Topbar setIsSidebar={setIsSidebar}/>
                        <Routes>
                            <Route path="/" element={<Dashboard/>}/>
                            <Route path="/warehouse" element={<Warehouse/>}/>
                            <Route path="/shipments" element={<Shipment/>}/>
                            <Route path="/showcase" element={<Showcase/>}/>
                            <Route path="/warehouse/:id" element={<WarehouseItem/>}/>
                            <Route path="/shipments/:code" element={<ShipmentList/>}/>
                            <Route path="/shipments/:code/pricings" element={<ShipmentListEdit/>}/>
                        </Routes>
                    </main>
                </div>
        </ThemeProvider>
    </ColorModeContext.Provider>
    
  );
}

export default App;
