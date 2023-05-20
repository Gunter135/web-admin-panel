import { getToken, userLogin } from "../api/axiosConfig";
import { useState,useEffect } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import logo from "../resources/logo.png"


const LoginPage = () =>{
    const initialValues = {
        username: "",
        password: ""
    }
    const loginValidationScheme = yup.object().shape({
        username: yup.string().required("Enter your username"),
        password: yup.string().required('No password provided.') 
        // .min(8, 'Password is too short - should be 8 chars minimum.')
        // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    })
    const handleS = async (values) => {
        try{
            const response = await userLogin(values)
            localStorage.setItem('access_token', response.data.token);
            window.location.reload();
        }
        catch(err)
        {
            console.log(err)
        }
    }
    return(
            <Box width={"100%"} height={"100%"} display={"flex"} justifyContent={"center"} sx={{background:"url('https://4kwallpapers.com/images/walls/thumbs_3t/71.jpg') center center no-repeat",backgroundSize:"100%"}}>
                <Box position={"relative"} top={"192px"} bgcolor={"transparent"} borderRadius={"20px"} border={"2px solid rgba(255,255,255,0.5)"} width={"350px"} height={"400px"} sx={{backdropFilter:"blur(15px)"}}>
                    <Box display={"flex"} justifyContent={"center"} pt="20px">
                        <Typography variant="h1"> Login </Typography>
                    </Box>
                    <Formik 
                        initialValues={initialValues} 
                        validationSchema={loginValidationScheme} 
                        onSubmit={handleS}
                        >
                            {({
                                        values,
                                        errors,
                                        touched,
                                        handleBlur,
                                        handleChange,
                                        handleSubmit,
                                    }) => (
                                        <form onSubmit={handleSubmit}>
                                            <Box display={"grid"} gap="30px">
                                                <Box display={"flex"} justifyContent={"center"}>
                                                    <Box position={"relative"} top="22px" right={"5px"}>
                                                        <AccountCircleIcon/>
                                                    </Box>
                                                    <TextField
                                                    sx={{width:"290px"}}
                                                            variant="standard"
                                                            type="text"
                                                            label="Username"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.username}
                                                            name="username"
                                                            error={!!touched.username && !!errors.username}
                                                            helperText={touched.username && errors.username}
                                                        />
                                                </Box>
                                                <Box display={"flex"} justifyContent={"center"}>
                                                    <Box position={"relative"} top="22px" right={"5px"}>
                                                        <LockIcon/>
                                                    </Box>
                                                    <TextField
                                                    sx={{width:"290px"}}
                                                        variant="standard"
                                                        type="password"
                                                        label="Password"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.password}
                                                        name="password"
                                                        error={!!touched.password && !!errors.password}
                                                        helperText={touched.password && errors.password}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box display={"flex"} justifyContent={"center"}>
                                                <Button type="submit" sx={{width:"250px",mt:"20px",borderRadius:"30px"}} variant="contained"> Log In </Button>
                                            </Box>
                                        </form>
                                    )}
                    </Formik>
                    {/* later on add "Don't have an account? Register." and "Remember me checkbox" also make button white*/}
                    
                </Box>
            </Box>
            
    )
}
export default LoginPage;