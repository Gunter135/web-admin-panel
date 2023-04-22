import { useState } from "react";
import { ProSidebar,Menu,MenuItem, SidebarHeader, SidebarContent, SidebarFooter, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import StoreIcon from '@mui/icons-material/Store';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';


import TodayIcon from '@mui/icons-material/Today';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import HelpIcon from '@mui/icons-material/Help';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SettingsIcon from '@mui/icons-material/Settings';
import DraftsIcon from '@mui/icons-material/Drafts';
import BarChartIcon from '@mui/icons-material/BarChart';
import TableChartIcon from '@mui/icons-material/TableChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';



const Item =({title, icon, to, selected, setSelected,setSelectedSubMenu}) =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return(
        <MenuItem 
        active={selected===title} 
        style={{color:colors.grey[100]}} 
        onClick={()=>{setSelected(title);setSelectedSubMenu(title)}}
        icon={icon}
        >
            <Typography variant="h6">{title}</Typography>
            <Link to={to}/>
        </MenuItem>
    )
}





const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected,setSelected] = useState("Dashboard");
    const [selectedSubMenu,setSelectedSubMenu] = useState("Точки продаж");
    return (
        <Box
            sx={{
                "& .pro-sidebar-inner":{
                    background: `${colors.primary[400]} !important`
                },
                "& .pro-icon-wrapper":{
                    backgroundColor: "transparent !important"
                },
                "& .pro-inner-item":{
                    padding: "5px 35px 5px 20px !important"
                },
                "& .pro-inner-item:hover":{
                    color: "#868dfb !important"
                },
                "& .pro-menu-item.active":{
                    color: "#6870fa !important"
                }
            }}>
            <ProSidebar collapsed={isCollapsed} width="350px" style={{position:"fixed"}}> 
                <SidebarHeader>
                    <Menu iconShape="square">
                        {/* LOGO AND MENU ICON */}
                        <MenuItem
                        // onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed? <MenuOutlinedIcon onClick={() => setIsCollapsed(!isCollapsed)}/> : undefined}
                        style={{
                            margin: "10px -20px 20px 0",
                            color: colors.grey[100],
                        }}>
                            {!isCollapsed &&(<Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            ml ="15px"
                            >
                                <Box display="flex" justifyContent="space-between" alignItems="center" ml ="-15px">
                                    <img
                                    alt="profile-user"
                                    width="60px"
                                    height="60px"
                                    src={`../../assets/logo.png`}
                                    style={{cursor: "pointer",borderRadius: "50%"}}
                                    />
                                    <Link to="/"/>
                                </Box>
                                <Typography variant="h5" color={colors.grey[100]}>
                                    ADMPANELV2
                                    <Link to="/"/>
                                </Typography>
                                <IconButton onClick={() => {setIsCollapsed(!isCollapsed)}}>
                                    <MenuOutlinedIcon/>
                                </IconButton>
                            </Box>)}
                        </MenuItem>
                    </Menu>
                </SidebarHeader>
                        {/* MENU ITEMS */}
                <SidebarContent>
                    <Menu>
                        <Box paddingLeft={isCollapsed ? undefined : "10px"} selectedsubmenu={selectedSubMenu}>
                            <SubMenu 
                                style={{color:colors.grey[100]}} 
                                title="Точки продаж" 
                                icon={<StoreIcon/>}
                                open={selectedSubMenu==="Точки продаж" ? true : false}
                                onClick={()=>{selectedSubMenu==="Точки продаж" ? setSelectedSubMenu("Точки продаж") : setSelectedSubMenu("Точки продаж")}}
                                >
                                <Item
                                    title="Карточка точки продаж"
                                    to="/retail-stores"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Устройства"
                                    to="/retail-stores"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </SubMenu>
                            <SubMenu 
                                style={{color:colors.grey[100]}} 
                                title="Витрина" 
                                icon={<EmojiNatureIcon/>}
                                open={selectedSubMenu==="Витрина" ? true : false}
                                onClick={()=>{selectedSubMenu==="Витрина" ? setSelectedSubMenu("Витрина") : setSelectedSubMenu("Витрина")}}
                                >
                                <Item
                                    title="Букеты на витрине"
                                    to="/showcase"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Аналитика"
                                    to="/team"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </SubMenu>
                            <Item
                                    title="Заказы"
                                    to="/"
                                    icon={<TodayIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                    setSelectedSubMenu={setSelectedSubMenu}
                                />
                                <Item
                                    title="Рабочие Смены"
                                    to="/"
                                    icon={<AttachMoneyIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                    setSelectedSubMenu={setSelectedSubMenu}
                                />
                                <SubMenu 
                                style={{color:colors.grey[100]}} 
                                title="Склад" 
                                icon={<AccountBalanceIcon/>}
                                open={selectedSubMenu==="Склад" ? true : false}
                                onClick={()=>{selectedSubMenu==="Склад" ? setSelectedSubMenu("Склад") : setSelectedSubMenu("Склад")}}
                                >
                                <Item
                                    title="Обзор склада"
                                    to="/warehouse"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Аналитика"
                                    to="/team"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Акты уценки"
                                    to="/team"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Акты пересорта"
                                    to="/team"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Приходные накладные"
                                    to="/shipments"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Накладные на списание"
                                    to="/team"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Акты инвентаризации"
                                    to="/team"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Акты перемещений"
                                    to="/team"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Поставщики"
                                    to="/team"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Экспорт товара"
                                    to="/team"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </SubMenu>
                            <Item
                                    title="Рецепты"
                                    to="/"
                                    icon={<LocalFloristIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                    setSelectedSubMenu={setSelectedSubMenu}
                                />
                             <SubMenu 
                                style={{color:colors.grey[100]}} 
                                title="Продукты" 
                                icon={<ShoppingBasketIcon/>}
                                open={selectedSubMenu==="Продукты" ? true : false}
                                onClick={()=>{selectedSubMenu==="Продукты" ? setSelectedSubMenu("Продукты") : setSelectedSubMenu("Продукты")}}
                                >
                                <Item
                                    title="Каталог товаров и услуг"
                                    to="/team"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Категории"
                                    to="/team"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Импорт"
                                    to="/team"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </SubMenu>
                            <SubMenu 
                                style={{color:colors.grey[100]}} 
                                title="Клиенты" 
                                icon={<AccountCircleIcon/>}
                                open={selectedSubMenu==="Клиенты" ? true : false}
                                onClick={()=>{selectedSubMenu==="Клиенты" ? setSelectedSubMenu("Клиенты") : setSelectedSubMenu("Клиенты")}}
                                >
                                <Item
                                    title="Список клиентов"
                                    to="/team"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Аналитика"
                                    to="/team"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Импорт клиентов"
                                    to="/team"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Календарь событий"
                                    to="/team"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </SubMenu>
                            <Item
                                    title="Сотрудники"
                                    to="/"
                                    icon={<PersonIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                    setSelectedSubMenu={setSelectedSubMenu}
                                />
                            <SubMenu 
                                style={{color:colors.grey[100]}} 
                                title="Справочник" 
                                icon={<HelpIcon/>}
                                open={selectedSubMenu==="Справочник" ? true : false}
                                onClick={()=>{selectedSubMenu==="Справочник" ? setSelectedSubMenu("Справочник") : setSelectedSubMenu("Справочник")}}
                                >
                                <Item
                                    title="Теги заказов"
                                    to="/team"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Причины скидок"
                                    to="/team"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Праздничные события"
                                    to="/team"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Предпочтения клиентов"
                                    to="/team"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Откуда узнали про нас"
                                    to="/team"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Причины изъятий/внесений"
                                    to="/team"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Источники сделок"
                                    to="/team"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Единицы измерения"
                                    to="/team"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </SubMenu>
                            <SubMenu 
                                style={{color:colors.grey[100]}} 
                                title="Система лояльности" 
                                icon={<LocalOfferIcon/>}
                                open={selectedSubMenu==="Система лояльности" ? true : false}
                                onClick={()=>{selectedSubMenu==="Система лояльности" ? setSelectedSubMenu("Система лояльности") : setSelectedSubMenu("Система лояльности")}}
                                >
                                <Item
                                    title="Бонусы"
                                    to="/retail-stores"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Скидки"
                                    to="/retail-stores"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </SubMenu>
                            <Item
                                    title="Интернет магазин"
                                    to="/"
                                    icon={<SettingsIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                    setSelectedSubMenu={setSelectedSubMenu}
                                />
                            <SubMenu 
                                style={{color:colors.grey[100]}} 
                                title="Рассылки" 
                                icon={<DraftsIcon/>}
                                open={selectedSubMenu==="Рассылки" ? true : false}
                                onClick={()=>{selectedSubMenu==="Рассылки" ? setSelectedSubMenu("Рассылки") : setSelectedSubMenu("Рассылки")}}
                                >
                                <Item
                                    title="СМС рассылки"
                                    to="/retail-stores"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Заказы"
                                    to="/retail-stores"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </SubMenu>
                            <Item
                                    title="Финансовый учет"
                                    to="/"
                                    icon={<BarChartIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                    setSelectedSubMenu={setSelectedSubMenu}
                                />
                            <Item
                                    title="Отчёты"
                                    to="/"
                                    icon={<TableChartIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                    setSelectedSubMenu={setSelectedSubMenu}
                                />
                            <Item
                                    title="Перейти в Биллинг"
                                    to="/"
                                    icon={<AccountBalanceWalletIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                    setSelectedSubMenu={setSelectedSubMenu}
                                />
                        </Box>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                    <Typography pl="15px">SUBSCRIBE TO TECHNOBLADE</Typography>
                </SidebarFooter>
            </ProSidebar>
        </Box>
    )
}

export default Sidebar;