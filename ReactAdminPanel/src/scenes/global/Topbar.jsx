import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, Select, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import api, { getToken, userLogout } from "../../api/axiosConfig";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import PersonOffIcon from '@mui/icons-material/PersonOff';
import SearchIcon from "@mui/icons-material/Search"
import axios from "axios";


const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const[open,setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };
      const handleClose = () => {
        setOpen(false);
    };

    const logout = async () => {
        try{
            // const response = await axios.post("http://localhost:8080/auth/logout", {
            //     headers: {
            //       'Content-Type': 'application/json',
            //       Accept: 'application/json',
            //       Authorization: `Bearer ${getToken()}`,
            //     },
            //   })
            const response = await userLogout()
            console.log(response)
            window.location.reload();
        }
        catch(err)
        {
            console.log(err)
        }
    }

    return (<Box display="flex" justifyContent="flex-end" p={2}>
        {/* ICONS */}
        <Box display="flex">
            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode==='dark'?
                (<DarkModeOutlinedIcon/>):(<LightModeOutlinedIcon/>)}
            </IconButton>
            <IconButton>
                <NotificationsOutlinedIcon/>
            </IconButton>
            <IconButton>
                <SettingsOutlinedIcon/>
            </IconButton>
            <IconButton onClick={handleClickOpen}>
                <PersonOffIcon/>
            </IconButton>
        </Box>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={"31px"}
        >
            <DialogTitle id="alert-dialog-title">
            {"Logout"}
            </DialogTitle>
            <DialogContent>
                <Typography variant="h3"> Do you really want to logout? </Typography>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} variant="contained" color="red">Disagree</Button>
            <Button onClick={logout} autoFocus variant="contained" color="green">
                Agree
            </Button>
            </DialogActions>
        </Dialog>
    </Box>
    )
}

export default Topbar;