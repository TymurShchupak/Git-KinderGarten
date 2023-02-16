import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {registrationPar} from "../../http/userApi";
import {Button, Form, Modal} from "react-bootstrap";

const RegParentModal = ({show,onHide}) => {

    const history = useNavigate()

    const [lname_,setLname_] = useState('')
    const [fname_,setFname_] = useState('')
    const [fathername_,setFarhername_] = useState('')
    const [birth_date,setBirth_date] = useState('')
    const [parent_type,setParent_type] = useState('')
    const [adress,setAdress] = useState('')
    const [work_place,setWork_place] = useState('')
    const [phone_num,setPhone_num] = useState('')
    const [email,setEmail] = useState('')
    const [password_,setPassword_] = useState('')



    const signIn = async ()=>{
        try{const  response = await registrationPar(lname_, fname_, fathername_, birth_date, parent_type,adress,work_place,phone_num,email,password_)
            alert("Опікуна успішно зареєстровано!")
        }

        catch (e) {
            alert(e.response.message)
        }

    }



    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Реєстрація опікуна:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="d-flex flex-column">
                    <Form.Control className="mt-3" placeholder="Фамілія" value={lname_} onChange={e => setLname_(e.target.value)}/>
                    <Form.Control className="mt-3" placeholder="Ім'я" value={fname_} onChange={e=>setFname_(e.target.value)}/>
                    <Form.Control className="mt-3" placeholder="По батькові" value={fathername_} onChange={e=> setFarhername_(e.target.value)}/>
                    <Form.Control className="mt-3" placeholder="Дата народження" value={birth_date} onChange={e=> setBirth_date(e.target.value)}/>
                    <select className="form-select mt-3" aria-label="Default select example" value={parent_type} onChange={e=> setParent_type(e.target.value)}>
                        <option>Тип користувача</option>
                        <option value="Батько">Батько</option>
                        <option value="Мати">Мати</option>
                        <option value="Бабуся">Бабуся</option>
                        <option value="Дідусь">Дідусь</option>
                        <option value="Опікун">Опікун</option>
                        <option value="Соціальний робітник">Соціальний робітник</option>
                    </select>
                    <Form.Control className="mt-3" placeholder="Адреса" value={adress} onChange={e=> setAdress(e.target.value)}/>
                    <Form.Control className="mt-3" placeholder="Місце роботи" value={work_place} onChange={e=> setWork_place(e.target.value)}/>
                    <Form.Control className="mt-3" placeholder="Номер телефону" value={phone_num} onChange={e=> setPhone_num(e.target.value)}/>
                    <Form.Control className="mt-3" placeholder="Електронна пошта" value={email} onChange={e=>setEmail(e.target.value) }/>
                    <Form.Control type="password" className="mt-3" placeholder="Пароль" value={password_} onChange={e=> setPassword_(e.target.value)}/>
                    <div className="col-md-12 text-center">
                        <Button onClick={signIn} style={{width:140}} className="mt-3" variant={"outline-primary"}>Зареєструвати</Button>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}> Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RegParentModal;