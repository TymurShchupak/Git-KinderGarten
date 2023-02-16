import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Modal, Row} from "react-bootstrap";
import {fetchByLname, fetchParent} from "../../http/childApi";
import {fetchbyLname} from "../../http/employeeApi";
import {CHILD_PAGE, PARENT_PAGE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";
import {deleteFamily, fetchChildbyid, fetchParentbyid, postFamily} from "../../http/AdminApi";



const FamilyModal = ({show,onHide}) => {

    const history = useNavigate()

const [ChildLastName,setChildLastName] = useState('')
    const [EmployeeLastName,setEmployeeLastName] = useState('')
    const [ChildList,setChildList] = useState([])
    const [ParList,setParList] = useState([])
    const [ParentChild,setParentChild] = useState([])
    const [ChildParent,setChildParent] = useState([])
const [ChildId,setChildId] = useState('0')
    const [ParentId,setParentId] = useState('0')
    
useEffect(()=>{
    getonechild()
},[ChildId])

    useEffect(()=>{
        getoneparent()
    },[ParentId])

console.log(ParentId)
console.log(ChildId)

    const getempbyname = async () =>{
        setParList(await fetchbyLname(EmployeeLastName))
    }

    const getbyname = async () =>{
    setChildList(await fetchByLname(ChildLastName))

    }

    const getonechild = async () => {
        try{
            setParentChild(await fetchParentbyid(ChildId))
        }
        catch (e) {
            alert("Something went wrong. Try to check inserted values")
        }

    }

    const getoneparent = async () => {
        try{
            setChildParent(await fetchChildbyid(ParentId))
        }
        catch (e) {
            alert("Something went wrong. Try to check inserted values")
        }

    }

    const postfamily = async () =>{
        try{
           const response = (await postFamily(ParentId,ChildId))
            setChildParent([])
            setParentChild([])
            setParentChild(await fetchParentbyid(ChildId))
            setChildParent(await fetchChildbyid(ParentId))
            console.log(response)
        }
        catch (e) {
            alert("Something went wrong. Try to check inserted values")
        }
    }


    const deletefamily = async () =>{
        try{
            const response = (await deleteFamily(ChildId,ParentId))
            setChildParent([])
            setParentChild([])
            setParentChild(await fetchParentbyid(ChildId))
            setChildParent(await fetchChildbyid(ParentId))
            console.log(response)
        }
        catch (e) {
            alert("Something went wrong. Try to check inserted values")
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="xl"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Зв'язки сім'ї:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
<Container>
    <Row>
        <Col md={6}>
            <p>Пошук дитини за фамілією:</p>
            <Form.Control
                style={{fontSize:20}}
                placeholder="Пошук за фамілією"
                value={ChildLastName}
                onChange={e => setChildLastName(e.target.value)}
            />
            {ChildList.map((list)=>{
                return <div key={list.child_lname}>

                        <Button value={list.child_id}  onClick={e=>setChildId(e.target.value)} variant={"outline-dark"} className="mt-2  ps-2">{list.child_lname} {list.child_fname} {list.child_fathername}</Button>

                </div>
            })}
            <Button className="mt-2" onClick={getbyname} >Пошук</Button>
        </Col>
        <Col md={6}>
            <p>Пошук опікуна за фамілією:</p>
            <Form.Control
                style={{fontSize:20}}
                placeholder="Пошук за фамілією"
                value={EmployeeLastName}
                onChange={e => setEmployeeLastName(e.target.value)}
            />
            {ParList.map((ParentList)=>{
                return <div key={ParentList.parent_id}>

                        <Button value={ParentList.parent_id} onClick={e=>setParentId(e.target.value)} variant={"outline-dark"} className="mt-2 ps-2">{ParentList.lname_} {ParentList.fname_} {ParentList.fathername_}</Button>

                </div>
            })}
            <Button className="mt-2" onClick={getempbyname} >Пошук</Button>
        </Col>
    </Row>

    {ParentChild.map((parent)=>{

        return <div key={parent.parent_type}>
            <p style={{fontSize:20}} className="mt-3">Сім'я дитини:</p>
            <Card className="mt-3">
                <Row className="row-cols-auto ms-5">
                    <Row className="mt-3 row-cols-auto" >
                        <Card style={{fontSize:20}} className="mb-3 mt-1 font-monospace" >
                            {parent.parent_type} : {parent.lname_} {parent.fname_} {parent.fathername_}
                        </Card>

                        <Button onClick={() => history(PARENT_PAGE + '/' + parent.parent_id)} className=" mb-3 ms-5 " >Перейти на сторінку</Button>
                    </Row>
                </Row>
            </Card>
        </div>
    })}
    {ChildParent.map((parchild)=>{
        return <div key={parchild.child_id}>
            <p style={{fontSize:20}} className="mt-3">Діти опікуна:</p>
            <Card className="mt-3">
                <Row className="row-cols-auto ms-5">
                    <Row className="mt-3 row-cols-auto" >
                        <Card style={{fontSize:20}} className="mb-3 mt-1 font-monospace" >
                            Дитина : {parchild.child_lname} {parchild.child_fname} {parchild.child_fathername}
                        </Card>

                        <Button onClick={() => history(CHILD_PAGE + '/' + parchild.child_id)} className=" mb-3 ms-5 " >Перейти на сторінку дитини</Button>

                    </Row>
                </Row>
            </Card>
        </div>}
    )}
    <div className="text-center">
        <Button  onClick={deletefamily} className=" mt-3 me-5" variant={"outline-danger"}> Видалити зв'язок </Button>
        <Button className="mt-3 ms-5" variant={"success"} onClick={postfamily}>Зв'язати дитину і опікуна</Button>

    </div>

</Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}> Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FamilyModal;