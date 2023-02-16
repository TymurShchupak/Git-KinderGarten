import React, {useContext, useEffect, useState} from "react";
import jwt_decode from 'jwt-decode'
import { useNavigate} from "react-router-dom";
import { Context } from "../index";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
    ADMIN_ROUTE,
    CHILD_ROUTE, EMPLOYEE_ROUTE,
    FRONT_PAGE_ROUTE,
    LOGIN_EMPLOYEE_ROUTE, NEWS,
    PARENT_ROUTE, SCHEDULE
} from '../utils/consts'
import {Button, NavDropdown} from "react-bootstrap";
import { observer } from "mobx-react-lite";


const NavBar = observer(() =>{
    const navigate = useNavigate();
  const {user} = useContext(Context)
    const logOut = () => {
        user.setUser({})
        user.setIsAuthEmp(false)
        localStorage.setItem('token',null)
        setUserEmail('')
        navigate(FRONT_PAGE_ROUTE)
    }
    
    const [Position,setPosition] = useState('')
const [userEmail,setUserEmail] = useState('')
const [ROLES,setROLES] = useState('')
    useEffect(() => {
role()

      
    });

    const role = ()=>{
        try {
            const token = localStorage.getItem("token")
            const decoded = jwt_decode(token)
            setROLES(decoded.Role)
            setUserEmail(decoded.EMAIL)
            setPosition(decoded.position_)

        }
        catch (e){

        }

    }





  return(
<Navbar bg="dark" variant="dark">
        <Container>

          <Nav.Link style={{color:'whitesmoke'}} href={FRONT_PAGE_ROUTE}>BAMBI</Nav.Link>


          {user.isAuthEmp && ROLES == 1   ?

          <Nav className="ml-auto" style={{color:'White'}}>
              <Nav.Link className="me-4" style={{color:'whitesmoke'}} href={NEWS}>Новини</Nav.Link>

              <NavDropdown style={{fontSize:16}} title="Навігація:" id="basic-nav-dropdown" className="me-2">
                  <NavDropdown.Item onClick={()=> navigate(CHILD_ROUTE)}>Діти</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=> navigate(PARENT_ROUTE)}>Опікуни</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=> navigate(EMPLOYEE_ROUTE)}>Працівники</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={()=> navigate(SCHEDULE)}>Розклад</NavDropdown.Item>

              </NavDropdown>
              <Nav.Link className="ms-2" style={{color:'whitesmoke'}}>{Position}: {userEmail}</Nav.Link>
          <Button variant={"outline-primary"} onClick={() => navigate(ADMIN_ROUTE)} className="me-2">Адмін панель</Button>
          <Button variant={"outline-primary"}  onClick={logOut}>Вийти</Button>
        </Nav>
        :user.isAuthEmp && ROLES == 2   ?
                <Nav className="ml-auto" style={{color:'White'}}>
                    <Nav.Link className="me-4" style={{color:'whitesmoke'}} href={NEWS}>Новини</Nav.Link>
                    <NavDropdown style={{fontSize:16}} title="Навігація:" id="basic-nav-dropdown" className="me-2">
                        <NavDropdown.Item onClick={()=> navigate(CHILD_ROUTE)}>Діти</NavDropdown.Item>
                        <NavDropdown.Item onClick={()=> navigate(PARENT_ROUTE)}>Опікуни</NavDropdown.Item>
                        <NavDropdown.Item onClick={()=> navigate(EMPLOYEE_ROUTE)}>Працівники</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={()=> navigate(SCHEDULE)}>Розклад</NavDropdown.Item>

                    </NavDropdown>
                    <Nav.Link className="ms-2" style={{color:'whitesmoke'}}>{Position}: {userEmail}</Nav.Link>
                    <Button variant={"outline-primary"}  onClick={logOut}>Вийти</Button>
                </Nav>

            :user.isAuthEmp && ROLES == 3   ?

                <Nav className="ml-auto" style={{color:'White'}}>
                    <Nav.Link className="me-4" style={{color:'whitesmoke'}} href={NEWS}>Новини</Nav.Link>
                    <NavDropdown style={{fontSize:16}} title="Навігація:" id="basic-nav-dropdown" className="me-2">
                        <NavDropdown.Item onClick={()=> navigate(CHILD_ROUTE)}>Діти</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={()=> navigate(SCHEDULE)}>Розклад</NavDropdown.Item>

                    </NavDropdown>
                    <Nav.Link className="ms-2" style={{color:'whitesmoke'}}>{Position}: {userEmail}</Nav.Link>
                    <Button variant={"outline-primary"}  onClick={logOut}>Вийти</Button>
                </Nav>
                :
                <Nav className="ml-auto" style={{color:'White'}}>
                    <Nav.Link className="me-4" style={{color:'whitesmoke'}} href={NEWS}>Новини</Nav.Link>
                    <Button variant={"outline-primary"} onClick={() => navigate(LOGIN_EMPLOYEE_ROUTE)}>Авторизація</Button>
                </Nav>
            }
        </Container>
      </Navbar>
  );

});

export default NavBar