import  React, {useContext, useState} from "react";
import {Button, Card, Container, Form} from "react-bootstrap";
import {Login} from "../http/userApi";
import {useNavigate} from "react-router-dom";
import {FRONT_PAGE_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AuthEmp = observer( () =>{


    const {user} =useContext(Context)
    const history = useNavigate()

    const [email,setEmail] = useState('')
    const [password_,setPassword_] = useState('')

    const loginEMP = async ()=>{
try{
    let data;
    data = await Login(email,password_)
    user.setUser(user)
    user.setIsAuthEmp(true)
    history(FRONT_PAGE_ROUTE)
    console.log(user)
} catch (e) {
    alert("Введені данні некоректні. Перевірте та введіть ще раз!")
}


    }
  return(
      <Container
          className="d-flex justify-content-center align-items-center"
      style={{height: window.innerHeight - 54}}>
        <Card style={{width: 500}} className="p-5">
          <h2 className="m-auto">Авторизація</h2>
          <Form className="d-flex flex-column">
            <Form.Control className="mt-3" placeholder="Введіть вашу електронну пошту" value={email} onChange={e=>setEmail(e.target.value) }/>
            <Form.Control type="password" className="mt-3" placeholder="Введіть ваш пароль" value={password_} onChange={e=>setPassword_(e.target.value)}/>
            <div className="col-md-12 text-center">
              <Button onClick={loginEMP} style={{width:120}} className="mt-3" variant={"outline-primary"}>Увійти</Button>
            </div>
        </Form>
        </Card>
      </Container>
    );
});

export default AuthEmp;