import React, {useContext, useEffect, useState} from 'react';
import {Routes, Route, useNavigate, Navigate} from "react-router-dom";
import {FRONT_PAGE_ROUTE} from "../utils/consts";
import {authAdminRoutes, authEMPRoutes, authPARRoutes, publicRoutes} from "../routes";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import jwt_decode from "jwt-decode";


const AppRouter = observer(() => {
  const {user} = useContext(Context)

    const [ROLES,setROLES] = useState('')
    useEffect(() => {
        role()
        console.log(ROLES)
    });


    const role = ()=>{
        try {
            const token = localStorage.getItem("token")
            const decoded = jwt_decode(token)
            setROLES(decoded.Role)
        }
        catch (e){

        }

    }
    return (
        <Routes>
            {user.isAuthEmp && ROLES==1 && authAdminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} exact/>
            )}
            {user.isAuthEmp && ROLES==2 && authEMPRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} exact/>
            )}
            {user.isAuthEmp &&  ROLES == 3 && authPARRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />}  exact/>
            )}



        </Routes>
    );
});

export default AppRouter;