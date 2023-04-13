import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";



const Header = ({title,subtitle}) =>{
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    return(
        <Box>
            <Typography 
            variant="h2"
            color={colors.grey[100]} 
            fontWeight="bold"
            sx={{mb:"5px"}}
            ml="10px">{title}</Typography>
            <Typography 
            variant="h4" 
            color={colors.grey[100]} 
            fontWeight="italic"
            sx={{mb:"5px"}}
            ml="10px">{subtitle}</Typography>
        </Box>
    )
}

export default Header;