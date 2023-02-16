import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {DeleteGroup, fireEmployee, getEmptyGroups} from "../../http/AdminApi";
import {allowedtofire, fetchAllWorkingEmployee} from "../../http/employeeApi";

const FireEmployeeModal = ({show,onHide}) => {



const [toFire,setToFire] = useState([])
    const [empId,setEmpId] = useState('')
    useEffect(()=>{
        getToFire()
    },[])



    const getToFire = async () =>{
        try {
            setToFire(await allowedtofire())
        }
        catch (e){
            alert(e.response.data.message)
        }
    }

    const fireEmp = async () =>{
        const del = await fireEmployee(empId)
        setToFire([])
        setToFire(await allowedtofire())
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
                    Працівники доступні для звільнення:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="d-flex flex-column">


                    <select className="form-select mt-3" aria-label="Default select example" value={empId} onChange={e=> setEmpId(e.target.value)}>
                        <option>Виберіть працівника:</option>
                        {toFire.map((fire)=>
                            <option value={fire.employee_id} key={fire.employee_id}>{fire.lname_} {fire.fname_} {fire.fathername_}</option>
                        )}
                    </select>

                    <div className="col-md-12 text-center">
                        <Button onClick={fireEmp} style={{width:140}} className="mt-3" variant={"outline-primary"}>Видалити</Button>
                    </div>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}> Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FireEmployeeModal;