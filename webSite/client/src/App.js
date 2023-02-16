import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Spinner} from "react-bootstrap";
import {check,checkpar} from "./http/userApi";
import {Context} from "./index";

const App = observer(() => {
  const {user,userPAR} = useContext(Context)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        check().then((data) => {
            user.setUser(true)
            user.setIsAuthEmp(true)
            setLoading(false)
        }).finally(() => setLoading(false))
    }, []);
    if (loading) {
        return <Spinner animation={"grow"}/>
    }






    return (
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
  );
});

export default App;