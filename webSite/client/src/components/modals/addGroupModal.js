import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {AddGroup, fetchEmployee} from "../../http/AdminApi";
import {registration} from "../../http/userApi";
import {ADMIN_ROUTE} from "../../utils/consts";

const AddGroupModal = ({show,onHide}) => {



    const history = useNavigate()

    const [group_name,setGroup_name] = useState('')
    const [group_type,setGroup_type] = useState('')
    const [employee_id,setEmployee_id] = useState('')
    const [employee,setEmployee] = useState([])

useEffect(()=>{
    getEmployee()
},[])

const getEmployee = async () =>{
        try {
            setEmployee(await fetchEmployee())
        }
        catch (e){
            alert(e.response.data.message)
        }
}

    const group = async ()=>{
        try {
            const response = await AddGroup(group_name,group_type,employee_id)
            alert("Нова група успішно створена!")
        }
        catch (e) {
            alert("Сталася помилка")
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
                    Додати нову групу:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form className="d-flex flex-column">
                    <Form.Control className="mt-3" placeholder="Назва групи:" value={group_name} onChange={e => setGroup_name(e.target.value)}/>
                    <select className="form-select mt-3" aria-label="Default select example" value={group_type} onChange={e=> setGroup_type(e.target.value)}>
                        <option>Тип групи</option>
                        <option value="Старша">Старша</option>
                        <option value="Молодша">Молодша</option>
                        <option value="Підготовча">Підготовча</option>
                    </select>
                    <select className="form-select mt-3" aria-label="Default select example" value={employee_id} onChange={e=> setEmployee_id(e.target.value)}>
                        <option>Вибрати керівника групи:</option>
                        {employee.map((keriv)=>
                            <option value={keriv.employee_id} key={keriv.employee_id}>{keriv.lname_} {keriv.fname_} {keriv.fathername_}</option>
                        )}
                    </select>

                    <div className="col-md-12 text-center">
                        <Button onClick={group} style={{width:140}} className="mt-3" variant={"outline-primary"}>Зареєструвати</Button>
                    </div>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}> Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddGroupModal;