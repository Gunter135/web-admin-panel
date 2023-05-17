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
        onClick={()=>{setSelected(title);if(setSelectedSubMenu){setSelectedSubMenu(title)}}}
        icon={icon}
        >
            <Typography variant="h6">{title}</Typography>
            <Link to={to}/>
        </MenuItem>
    )
}
const CustomSubMenu = ({title,selectedSubMenu,setSelectedSubMenu,icon,children}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return(
        <Box>
            {/* <Box position={"relative"} width={"300px"} height="20px" ml={"-5px"} top="32px" mt={"-32px"} overflow="visible" zIndex={"100"} >
                <div style={{width: "300px",height: "20px",backgroundColor: "#Fff"}} onClick={()=>{console.log("yes")}}></div>
            </Box> */}
            <SubMenu 
            style={{color:colors.grey[100]}} 
            title={title}
            icon={icon}
            open={selectedSubMenu === title}
            onClick={()=>{selectedSubMenu === title ? setSelectedSubMenu("") : setSelectedSubMenu(title)}}
        >
            {children}
            </SubMenu>
        </Box>
    )
}





const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected,setSelected] = useState("Dashboard");
    const [selectedSubMenu,setSelectedSubMenu] = useState("");
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
                        icon={isCollapsed ? <MenuOutlinedIcon onClick={() => setIsCollapsed(!isCollapsed)}/> : undefined}
                        style={{
                            margin: "10px -20px 20px 0",
                            color: colors.grey[100],
                        }}>
                            {!isCollapsed &&(<Box
                            display="flex"
                            
                            alignItems="center"
                            ml ="15px"
                            >
                                <Box display="flex" justifyContent="space-between" alignItems="center" ml ="-15px">
                                    <img
                                    alt="profile-user"
                                    width="60px"
                                    height="60px"
                                    src={`../../assets/logo.png`}
                                    style={{cursor: "pointer",borderRadius: "50%",objectFit: "cover"}}
                                    />
                                    <Link to="/"/>
                                </Box>
                                <Typography ml={"50px"} variant="h5" color={colors.grey[100]}>
                                    ADMPANELV2
                                    <Link to="/"/>
                                </Typography>
                                {/* <IconButton onClick={() => {setIsCollapsed(!isCollapsed)}}>
                                    <MenuOutlinedIcon/>
                                </IconButton> */}
                            </Box>)}
                        </MenuItem>
                    </Menu>
                </SidebarHeader>
                        {/* MENU ITEMS */}
                <SidebarContent>
                    <Menu>
                        <Box paddingLeft={isCollapsed ? undefined : "10px"} selectedsubmenu={selectedSubMenu}>
                            <CustomSubMenu
                                style={{color:colors.grey[100]}} 
                                title="Точки продаж" 
                                icon={<StoreIcon/>}
                                setSelectedSubMenu={setSelectedSubMenu}
                                selectedSubMenu={selectedSubMenu}
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
                            </CustomSubMenu>
                            <CustomSubMenu
                                style={{color:colors.grey[100]}} 
                                title="Витрина" 
                                icon={<EmojiNatureIcon/>}
                                setSelectedSubMenu={setSelectedSubMenu}
                                selectedSubMenu={selectedSubMenu}
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
                            </CustomSubMenu>
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
                            <CustomSubMenu
                                style={{color:colors.grey[100]}} 
                                title="Склад" 
                                icon={<AccountBalanceIcon/>}
                                setSelectedSubMenu={setSelectedSubMenu}
                                selectedSubMenu={selectedSubMenu}
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
                            </CustomSubMenu>
                            <Item
                                    title="Рецепты"
                                    to="/"
                                    icon={<LocalFloristIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                    setSelectedSubMenu={setSelectedSubMenu}
                                />
                            {/* <CustomSubMenu
                                style={{color:colors.grey[100]}} 
                                title="Продукты" 
                                icon={<ShoppingBasketIcon/>}
                                setSelectedSubMenu={setSelectedSubMenu}
                                selectedSubMenu={selectedSubMenu}
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
                            </CustomSubMenu> */}
                            <CustomSubMenu
                                style={{color:colors.grey[100]}} 
                                title="Клиенты" 
                                icon={<AccountCircleIcon/>}
                                setSelectedSubMenu={setSelectedSubMenu}
                                selectedSubMenu={selectedSubMenu}
                                >
                                <Item
                                    title="Список клиентов"
                                    to="/clients"
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
                            </CustomSubMenu>
                            <Item
                                title="Сотрудники"
                                to="/"
                                icon={<PersonIcon/>}
                                selected={selected}
                                setSelected={setSelected}
                                setSelectedSubMenu={setSelectedSubMenu}
                            />
                            {/* <CustomSubMenu
                                style={{color:colors.grey[100]}} 
                                title="Справочник" 
                                icon={<HelpIcon/>}
                                setSelectedSubMenu={setSelectedSubMenu}
                                selectedSubMenu={selectedSubMenu}
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
                            </CustomSubMenu> */}
                            <CustomSubMenu
                                style={{color:colors.grey[100]}} 
                                title="Система лояльности" 
                                icon={<LocalOfferIcon/>}
                                setSelectedSubMenu={setSelectedSubMenu}
                                selectedSubMenu={selectedSubMenu}
                                >
                                <Item
                                    title="Бонусы"
                                    to="/bonuses"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Скидки"
                                    to="/retail-stores"
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </CustomSubMenu>
                            <Item
                                    title="Интернет магазин"
                                    to="/"
                                    icon={<SettingsIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                    setSelectedSubMenu={setSelectedSubMenu}
                                />
                            <CustomSubMenu
                                style={{color:colors.grey[100]}} 
                                title="Рассылки" 
                                icon={<DraftsIcon/>}
                                setSelectedSubMenu={setSelectedSubMenu}
                                selectedSubMenu={selectedSubMenu}
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
                            </CustomSubMenu>
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
                    <Typography pl="15px"></Typography>
                </SidebarFooter>
            </ProSidebar>
        </Box>
    )
}

export default Sidebar;