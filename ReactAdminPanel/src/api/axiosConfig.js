import axios from "axios";

export default axios.create({
        baseURL:'http://localhost:8080/admin',
        //headers: {"ngrok-skip-browser-warning": "true"}
    });