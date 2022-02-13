import React from "react";
let LoginContext = React.createContext({
    isLoggedIn: false,
    setIsLoggedIn: (isLoggedIn) => {
        isLoggedIn = isLoggedIn;
    },
    user : "",
    setUser: (user)=>{
        user = user;
    }

});
export default LoginContext;
