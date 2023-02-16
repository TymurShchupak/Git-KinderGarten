import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {fetchOneEmployee} from "../http/employeeApi";
import {Card, Container, Row} from "react-bootstrap";

const EmployeePage = observer(() =>{


    const {id} = useParams()
    const [Employee,setEmployee] = useState([])

    useEffect(()=>{
        getone(),
        console.log(id)
    },[])


    const getone = async () => {
        try{
            setEmployee(await fetchOneEmployee(id))
        }
        catch (e) {
            alert("Something went wrong. Try to check inserted values")
        }

    }
    const handleDateTruncation = (str) => {
        if(str !== null) {
            return str.substr(0, 10);
        } else {
            return "";
        }
    }

    return(
        <div>
            {Employee.map((emp)=>{
                const time1 = new Date(emp.birth_date)
                const birth = time1.toLocaleDateString("ja-JP")
                const time2 = new Date(emp.hiring_date)
                const hiring = time2.toLocaleDateString("ja-JP")
                const time3 = new Date(emp.contract_expiration)
                const expiration = time3.toLocaleDateString("ja-JP")
                return <Container key={emp.employee_id}>

                    <h1 style={{color:"darkolivegreen"}} className="text-center mt-3 mb-3">Інформація про робітника</h1>
                    <Card>
                        <Row className="row-cols-auto ms-5">
                            <Row className="mt-3 row-cols-auto" >
                                <h4>Фамілія:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {emp.lname_}
                                </Card>
                            </Row>
                            <Row className="mt-3 row-cols-auto" >
                                <h4>Ім'я:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {emp.fname_}
                                </Card>
                            </Row>
                            <Row className="mt-3 row-cols-auto" >
                                <h4>По батькові:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {emp.fathername_}
                                </Card>
                            </Row>
                        </Row>
                    </Card>
                    <Card>
                        <Row className="row-cols-auto ms-5" >
                            <Row className="mt-3 row-cols-auto" >
                                <h4>Дата народження:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {birth}
                                </Card>
                            </Row>
                            <Row className="mt-3 row-cols-auto" >
                                <h4>Дата найму:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {hiring}
                                </Card>
                            </Row>
                            <Row className="mt-3 row-cols-auto" >
                                <h4>Дата закінчення контракту:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {expiration}
                                </Card>
                            </Row>
                        </Row>
                    </Card>
                    <Card>
                        <Row className="row-cols-auto ms-5" >
                            <Row className="mt-3 row-cols-auto" >
                                <h4>Адреса проживання:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {emp.adress}
                                </Card>
                            </Row>

                            <Row className="mt-3 row-cols-auto" >
                                <h4>Посада:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {emp.position_}
                                </Card>
                            </Row>
                        </Row>
                    </Card>
                    <h3 className="text-center mt-2">Контакти:</h3>
                    <Card>
                        <Row className="row-cols-auto ms-5" >
                            <Row className="mt-3 row-cols-auto" >
                                <h4>Номер телефону:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {emp.phone_num}
                                </Card>
                            </Row>
                            <Row className="mt-3 row-cols-auto" >
                                <h4>Пошта:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {emp.email}
                                </Card>
                            </Row>
                        </Row>
                    </Card>
                </Container>
            })}
        </div>
    );
});

export default EmployeePage;
