import React, { useState } from "react";
import axios from "axios";

const LoginComponent = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleUser = (e) => {
        e.preventDefault();
        setUsername(e.target.value);
    }

    const handlePassword = e => {
        e.preventDefault();
        setPassword(e.target.value);
    }
    
    const onLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        axios.post("http://localhost:5000/api/login", {username, password})
        .then(res => {
            console.log(res);
            localStorage.setItem("token", res.data.payload);
            props.history.push("/friends");
        })
        .catch(err => console.log(err))


    }

    return(
        <form onSubmit={onLogin}>
            <input type="username" onChange={handleUser}></input>
            <input type="password" onChange={handlePassword}></input>
            <button>Submit</button>
            {isLoading && <p>Loading...</p>}
        </form>        
    )
}

export default LoginComponent;