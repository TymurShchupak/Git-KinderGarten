import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {fetchAllFiredEmployee, fetchAllWorkingEmployee} from "../http/employeeApi";
import {Row, Card, Container, Button} from "react-bootstrap";
import {PUT_EMPLOYEE_PAGE, PUT_PARENT_PAGE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {delPar, fireEmployee} from "../http/AdminApi";
import {fetchAllParent} from "../http/parentApi";



const PutEmployee = observer(() =>{
    const history = useNavigate()
    useEffect(()=>{
        getAll()
    },[])

    const [AllEmployee,setAllEmployee] = useState([])
    const [button,setButton] = useState(false)



    const getAll = async () =>{
        try{
            setAllEmployee([])
            setAllEmployee(await fetchAllWorkingEmployee())
            setButton(value => !value)
        } catch (e) {
            alert("Something went wrong. Try to check inserted values")
        }}

    const getFired = async () =>{
        try{
            setButton(value => !value)
            setAllEmployee([])
            setAllEmployee(await fetchAllFiredEmployee())
        } catch (e) {
            alert("Something went wrong. Try to check inserted values")
        }
    }




    return(
        <div><h1 className="text-center mt-2 mb-3">Список працюючих викладачів:</h1>
            {button ?
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Button onClick={getFired}>Відобразити звільнених працівників:</Button>
                </div>
                :
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Button onClick={getAll}>Відобразити працюючих працівників:</Button>
                </div>
            }



            {AllEmployee.map((allemployee)=>{
                return <Container key={allemployee.employee_id}>
                    <Row className="d-flex mt-2" >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',

                            }}
                        >
                            <Card
                                className="mt-1" style={{width:500, cursor:'pointer' ,fontSize:20 }}
                            >
                                ПІБ: {allemployee.lname_} {''} {allemployee.fname_} {''} {allemployee.fathername_}
                            </Card>

                            <Button onClick={() => history(PUT_EMPLOYEE_PAGE + '/' + allemployee.employee_id)} className="ms-2"  variant={"outline-dark"}>Редагувати:</Button>
                        </div>
                    </Row>
                </Container>
            })}
        </div>
    );
});

export default PutEmployee;
