import React, {useEffect, useState} from 'react';
import {fetchAllParent, fetchOneParent} from "../http/parentApi";
import {Button, Container, Form, Row, Table} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import {PutParent} from "../http/AdminApi";
import {PUT_PARENT} from "../utils/consts";

const PutParentPage = observer(() => {

    const {id} = useParams()



    const [lname_,setLname_] = useState('')
    const [fname_,setFname_] = useState('')
    const [fathername_,setFarhername_] = useState('')
    const [birth_date,setBirth_date] = useState('')
    const [parent_type,setParent_type] = useState('')
    const [adress,setAdress] = useState('')
    const [work_place,setWork_place] = useState('')
    const [phone_num,setPhone_num] = useState('')
    const [email,setEmail] = useState('')

    const [parent,setParent] = useState([])


    useEffect(()=>{
        getone()
    },[])



    const getone = async () => {
        try {
            setParent(await fetchOneParent(id))
        } catch (e) {
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
    const history = useNavigate()

    const putPar = async ()=> {
        try {
            const response = await PutParent(id,lname_, fname_, fathername_, birth_date, parent_type, adress, work_place, phone_num, email)
            console.log(response)
            alert("Інформація успішно змінена!")
            history(PUT_PARENT)
        }
        catch (e){
            alert("Something went wrong")
        }
    }



    return (
        <div>

            <Row className="mt-2" >


                    <h1 className="text-center">Редагувати інформацію:</h1>
                {parent.map((par)=>{
                    const time = new Date(par.birth_date)
                    const date = time.toLocaleDateString("ja-JP")
                    if(!lname_,!fname_,!fathername_,!birth_date,!parent_type,!adress,!work_place,!phone_num,!email)
                    {
                        setLname_(par.lname_)
                        setFname_(par.fname_)
                        setFarhername_(par.fathername_)
                        setBirth_date(date)
                        setParent_type(par.parent_type)
                        setAdress(par.adress)
                        setWork_place(par.work_place)
                        setPhone_num(par.phone_num)
                        setEmail(par.email)
                    }
                    console.log(date)
                    console.log(par.birth_date)
                       return <Container key={par.parent_id}  className="d-flex justify-content-center align-content-center">

                           <Table striped bordered hover >
                               <tbody>
                               <tr>

                                   <td className="text-end " style={{fontSize:20}}>Фамілія:</td>
                                   <td><Form.Control
                                       style={{fontSize:20}}
                                       placeholder={par.lname_}
                                       value={lname_}
                                       onChange={e => setLname_(e.target.value)}
                                   /></td>

                               </tr>
                               <tr>

                                   <td className="text-end" style={{fontSize:20}}>Ім'я:</td>
                                   <td>  <Form.Control
                                       style={{fontSize:20}}
                                       placeholder={par.fname_}
                                       value={fname_}
                                       onChange={e => setFname_(e.target.value)}
                                   /></td>

                               </tr>
                               <tr>
                                   <td className="text-end" style={{fontSize:20}}>По батькові:</td>
                                   <td> <Form.Control
                                       style={{fontSize:20}}
                                       placeholder={par.fathername_}
                                       value={fathername_}
                                       onChange={e => setFarhername_(e.target.value)}
                                   /></td>
                               </tr>
                               <tr>
                                   <td className="text-end" style={{fontSize:20}}>Адреса:</td>
                                   <td><Form.Control
                                       style={{fontSize:20}}
                                       placeholder={par.adress}
                                       value={adress}
                                       onChange={e => setAdress(e.target.value)}
                                   /></td>
                               </tr>
                               <tr>
                                   <td className="text-end" style={{fontSize:20}}>Дата народження:</td>
                                   <td><Form.Control
                                       style={{fontSize:20}}
                                       placeholder={par.birth_date}
                                       value={handleDateTruncation(birth_date)}
                                       onChange={e => setBirth_date(e.target.value)}
                                   /></td>
                               </tr>
                               <tr>
                                   <td className="text-end" style={{fontSize:20}}>Тип опікуна:</td>
                                   <td><select style={{fontSize:20}} className="form-select" aria-label="Default select example" value={parent_type} onChange={e=> setParent_type(e.target.value)}>
                                       <option value="Батько">Батько</option>
                                       <option value="Мати">Мати</option>
                                       <option value="Бабуся">Бабуся</option>
                                       <option value="Дідусь">Дідусь</option>
                                       <option value="Опікун">Опікун</option>
                                       <option value="Соціальний робітник">Соціальний робітник</option>
                                   </select></td>
                               </tr>
                               <tr>
                                   <td className="text-end" style={{fontSize:20}}>Адреса:</td>
                                   <td><Form.Control
                                       style={{fontSize:20}}
                                       placeholder={par.adress}
                                       value={adress}
                                       onChange={e => setAdress(e.target.value)}
                                   /></td>
                               </tr>
                               <tr>
                                   <td className="text-end" style={{fontSize:20}}>Адреса роботи:</td>
                                   <td><Form.Control
                                       style={{fontSize:20}}
                                       placeholder={par.work_place}
                                       value={work_place}
                                       onChange={e => setWork_place(e.target.value)}
                                   /></td>
                               </tr>
                               <tr>
                                   <td className="text-end" style={{fontSize:20}}>Номер телефону:</td>
                                   <td><Form.Control
                                       style={{fontSize:20}}
                                       placeholder={par.phone_num}
                                       value={handlePhoneTruncation(phone_num)}
                                       onChange={e => setPhone_num(e.target.value)}
                                   /></td>
                               </tr>
                               <tr>
                                   <td className="text-end" style={{fontSize:20}}>Пошта:</td>
                                   <td><Form.Control
                                       style={{fontSize:20}}

                                       placeholder={par.email}
                                       value={email}
                                       onChange={e => setEmail(e.target.value)}
                                   /></td>
                               </tr>
                               <tr>
                                   <td className="text-center" colSpan={2}>
                                       <Button className="mt-3" style={{width:400}} variant={"outline-dark"} onClick={putPar} > Змінити дані:</Button>
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

export default PutParentPage;