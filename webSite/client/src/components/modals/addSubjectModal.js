import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {fetchEmployee, postSubject} from "../../http/AdminApi";
import {fetchAllWorkingEmployee} from "../../http/employeeApi";


const AddSubjectModal = ({show,onHide}) => {




    const [subject_name,setSubject_name] = useState('')
    const [employee_id,setEmployee_id] = useState('')
    const [employee,setEmployee] = useState([])

    useEffect(()=>{
        getEmployee()
    },[])

    const getEmployee = async () =>{
        try {
            setEmployee(await fetchAllWorkingEmployee())
        }
        catch (e){
            alert(e.response.data.message)
        }
    }

    const subject = async ()=>{
        try {
            const response = await postSubject(subject_name,employee_id)
            console.log(response)
            alert("Новий предмет успішно добавлено!")
        }
        catch (e) {
            alert(e.response.data.message)
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
                    Додати новий предмет:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form className="d-flex flex-column">
                    <Form.Control className="mt-3" placeholder="Назва предмету:" value={subject_name} onChange={e => setSubject_name(e.target.value)}/>
                    <select className="form-select mt-3" aria-label="Default select example" value={employee_id} onChange={e=> setEmployee_id(e.target.value)}>
                        <option>Вибрати викладача предмету:</option>
                        {employee.map((keriv)=>{
                         return   <option value={keriv.employee_id} key={keriv.employee_id}>{keriv.lname_} {keriv.fname_} {keriv.fathername_}</option>
                            })}
                    </select>
                    <div className="col-md-12 text-center">
                        <Button onClick={subject} style={{width:140}} className="mt-3" variant={"outline-primary"}>Зареєструвати</Button>
                    </div>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}> Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddSubjectModal;