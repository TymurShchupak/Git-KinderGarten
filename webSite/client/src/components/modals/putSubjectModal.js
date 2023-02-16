import React, {useEffect, useState} from 'react';
import {Button, Card, Form, Modal} from "react-bootstrap";
import {delSubject, fetchEmployee, getEmpBySubject, getSubjects, postSubject, putSubject} from "../../http/AdminApi";
import {fetchAllWorkingEmployee} from "../../http/employeeApi";


const PutSubjectModal = ({show,onHide}) => {



    const [employee_id,setEmployee_id] = useState('')
    const [subName,setSubName] = useState('')
    const [subject_name,setSubject_name] = useState([])
    const [employee,setEmployee] = useState([])
    const [empName, setEmpName] = useState([])


    useEffect(()=>{
        getEmployee(),
            getSubject()
    },[])

    useEffect(()=>{
        getEmpName()
    },[subName])

    const getEmployee = async () =>{
        try {
            setEmployee(await fetchAllWorkingEmployee())
        }
        catch (e){
            alert(e.response.data.message)
        }
    }
    const getSubject = async () =>{
        try {
            setSubject_name(await getSubjects())
        }
        catch (e){
            alert(e.response.data.message)
        }
    }

    const getEmpName = async () =>{
        try {
            setEmpName(await getEmpBySubject(subName))
        }
        catch (e){
            alert(e.response.data.message)
        }
    }
    const deleteSubject = async () =>{
        try {
           const response = await delSubject(subName)
            setSubject_name([])
            setEmpName([])
            setSubject_name(await getSubjects())

            console.log(response)
            alert("Предмет успішно видалений")
        }
        catch (e){
            alert(e.response.data.message)
        }
    }

    const putsubject = async ()=>{
        try {
            const response = await putSubject(subName,employee_id)
            setEmpName([])
            setEmpName(await getEmpBySubject(subName))
            console.log(response)
            alert("Викладач предмету був успішно замінений!")
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
                    Редагувати предмет:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form className="d-flex flex-column">
                    <select className="form-select mt-3" aria-label="Default select example" value={subName} onChange={e=> setSubName(e.target.value)}>
                        <option>Виберіть предмет:</option>
                        {subject_name.map((subname)=>{
                            if(!subname){setSubName(subname.subject_name)}
                            return   <option value={subname.subject_name} key={subname.subject_id}>{subname.subject_name}</option>
                        })}
                    </select>

                    {empName.map((name)=>{
                        return <Card className="mt-4" key={name.employee_id}>

                           <p style={{fontSize:18}}> Викладач що веде: {name.lname_} {name.fname_} {name.fathername_}</p>
                        </Card>
                    })}
                    <select className="form-select mt-3" aria-label="Default select example" value={employee_id} onChange={e=> setEmployee_id(e.target.value)}>
                        <option>Обрати нового викладача предмету:</option>
                        {employee.map((keriv)=>{
                            return   <option value={keriv.employee_id} key={keriv.employee_id}>{keriv.lname_} {keriv.fname_} {keriv.fathername_}</option>
                        })}
                    </select>
                    <div className="col-md-12 text-center">

                        <Button onClick={deleteSubject} style={{width:200}} className="mt-3 me-5" variant={"outline-danger"}>Видалити предмет</Button>
                        <Button onClick={putsubject} style={{width:200}} className="mt-3 ms-5" variant={"outline-primary"}>Змінити викладача</Button>

                    </div>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}> Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PutSubjectModal;