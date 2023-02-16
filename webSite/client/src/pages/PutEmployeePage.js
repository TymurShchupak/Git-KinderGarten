import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import {fetchOneEmployee} from "../http/employeeApi";
import {PutEmployee, PutParent} from "../http/AdminApi";
import {PUT_EMPLOYEE} from "../utils/consts";

const PutEmployeePage = observer(() => {

    const [lname_,setLname_] = useState('')
    const [fname_,setFname_] = useState('')
    const [fathername_,setFarhername_] = useState('')
    const [adress,setAdress] = useState('')
    const [phone_num,setPhone_num] = useState('')
    const [birth_date,setBirth_date] = useState('')
    const [hiring_date,setHiring_date] = useState('')
    const [contract_expiration,setContract_expiration] = useState('')
    const [position_,setPosition_] = useState('')
    const [email,setEmail] = useState('')
const history = useNavigate()
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
    const handlePhoneTruncation = (str) => {
        if(str !== null) {
            return str.substr(0, 15);
        } else {
            return "";
        }
    }

    const putEmp = async ()=> {
        try {
            const response = await PutEmployee(id,lname_, fname_, fathername_,  adress,phone_num, birth_date, hiring_date, contract_expiration, position_, email)
            console.log(response)
            alert("Інформація успішно змінена!")
            history(PUT_EMPLOYEE)
        }
        catch (e){
            alert("Something went wrong")
        }
    }


    
    return (
        <div>

            <Row className="mt-2" >


                <h3 className="text-center">Редагувати інформацію:</h3>
                {Employee.map((emp)=>{
                    const time1 = new Date(emp.birth_date)
                    const birth = time1.toLocaleDateString("ja-JP")
                    const time2 = new Date(emp.hiring_date)
                    const hiring = time2.toLocaleDateString("ja-JP")
                    const time3 = new Date(emp.contract_expiration)
                    const expiration = time3.toLocaleDateString("ja-JP")
                    if(!lname_,!fname_,!fathername_,!birth_date,!adress,!hiring_date,!contract_expiration,!position_,!phone_num,!email)
                    {
                        setLname_(emp.lname_)
                        setFname_(emp.fname_)
                        setFarhername_(emp.fathername_)
                        setBirth_date(birth)
                        setAdress(emp.adress)
                        setHiring_date(hiring)
                        setContract_expiration(expiration)
                        setPosition_(emp.position_)
                        setPhone_num(emp.phone_num)
                        setEmail(emp.email)
                    }
                    return <Container key={emp.employee_id}  className="d-flex justify-content-center align-content-center">

    <Table striped bordered hover >
        <tbody>
        <tr>

            <td className="text-end " style={{fontSize:30}}>Фамілія:</td>
            <td> <Form.Control
                style={{fontSize:20}}
                placeholder={emp.lname_}
                value={lname_}
                onChange={e => setLname_(e.target.value)}
            /></td>

        </tr>
        <tr>

            <td className="text-end" style={{fontSize:30}}>Ім'я:</td>
            <td>  <Form.Control
                style={{fontSize:20}}
                placeholder={emp.fname_}
                value={fname_}
                onChange={e => setFname_(e.target.value)}
            /></td>

        </tr>
        <tr>
                <td className="text-end" style={{fontSize:30}}>По батькові:</td>
                <td><Form.Control
                    style={{fontSize:20}}
                    placeholder={emp.fathername_}
                    value={fathername_}
                    onChange={e => setFarhername_(e.target.value)}
                /></td>
        </tr>
        <tr>
            <td className="text-end" style={{fontSize:30}}>Адреса:</td>
            <td><Form.Control
                style={{fontSize:20}}
                placeholder={emp.adress}
                value={adress}
                onChange={e => setAdress(e.target.value)}
            /></td>
        </tr>
        <tr>
            <td className="text-end" style={{fontSize:30}}>Номер телефону:</td>
            <td> <Form.Control
                style={{fontSize:20}}
                placeholder={emp.phone_num}
                value={handlePhoneTruncation(phone_num)}
                onChange={e => setPhone_num(e.target.value)}
            /></td>
        </tr>
        <tr>
            <td className="text-end" style={{fontSize:30}}>Дата народження:</td>
            <td><Form.Control
                style={{fontSize:20}}
                placeholder={emp.birth_date}
                value={handleDateTruncation(birth_date)}
                onChange={e => setBirth_date(e.target.value)}
            /></td>
        </tr>
        <tr>
            <td className="text-end" style={{fontSize:30}}>Дата найму:</td>
            <td><Form.Control
                style={{fontSize:20}}
                placeholder={emp.hiring_date}
                value={handleDateTruncation(hiring_date)}
                onChange={e => setHiring_date(e.target.value)}
            /></td>
        </tr>
        <tr>
            <td className="text-end" style={{fontSize:30}}> Дата закінчення контракту:</td>
            <td><Form.Control
                style={{fontSize:20}}
                placeholder={emp.contract_expiration}
                value={handleDateTruncation(contract_expiration)}
                onChange={e => setContract_expiration(e.target.value)}
            /></td>
        </tr>
        <tr>
            <td className="text-end" style={{fontSize:30}}>Посада:</td>
            <td><select style={{fontSize:20}} className="form-select" aria-label="Default select example" value={position_} onChange={e=> setPosition_(e.target.value)}>
                <option value="Викладач">Викладач</option>
                <option value="Адміністратор">Адміністратор</option>
            </select></td>
        </tr>
        <tr>
            <td className="text-end" style={{fontSize:30}}>Пошта:</td>
            <td><Form.Control
                style={{fontSize:20}}
                placeholder={emp.email}
                value={email}
                onChange={e => setEmail(e.target.value)}
            /></td>
        </tr>
        <tr>
            <td className="text-center" colSpan={2}>
                <Button className="mt-3" style={{width:400}} variant={"outline-dark"} onClick={putEmp} > Змінити дані:</Button>
            </td>
        </tr>
        </tbody>
    </Table>

















                    </Container>
                })}

            </Row>


        </div>
    );
});

export default PutEmployeePage;