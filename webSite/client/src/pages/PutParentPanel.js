import React, {useEffect, useState} from 'react';
import {fetchAllParent} from "../http/parentApi";
import {Button, Card, Col, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {delPar, GetOneParent} from "../http/AdminApi";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {PARENT_PAGE, PUT_PARENT_PAGE} from "../utils/consts";

const PutParentPanel = observer(() => {
    const history = useNavigate()

    const [AllParent,setAllParent] = useState([])
    const [parentid,setParentid] = useState('0')

    useEffect(()=>{
        getAll()
    },[])



    useEffect(()=>{
        deleteParent()
    },[parentid])
    const getAll = async () =>{
        try{
            setAllParent(await fetchAllParent())
        } catch (e) {
            alert("Something went wrong. Try to check inserted values")
        }}

     const deleteParent = async () =>{
      const del = await delPar(parentid)
         setAllParent([])
         setAllParent(await fetchAllParent())
         console.log(del)
     }

let count1=1;
console.log(parentid)

    return(
        <div><h1 className="text-center mt-2 mb-3">Список батьків та опікунів:</h1>


            {AllParent.map((allparent)=>{
                return <Container key={allparent.parent_id}>
                    <Row className="d-flex mt-2" >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',

                            }}
                        >
                            <Table hover striped bordered style={{width:'80%'}}  className="text-center ms-5 border-dark">
                                <tbody>
                                <tr>
                                    <td style={{width:'15%'}}>
                                        {count1++}
                                    </td>
                                    <td  onClick={() => history(PARENT_PAGE + '/' + allparent.parent_id)}  style={{fontSize:16, cursor:'pointer'}} className="text-center mt-2 ms-5">
                                        {allparent.lname_} {''} {allparent.fname_} {''} {allparent.fathername_}
                                    </td>
                                    <td style={{width:'15%'}}>
                                        <Button className="ms-2" value={allparent.parent_id} onClick={e=>setParentid(e.target.value)} variant={"outline-danger"}>Видалити:</Button>
                                    </td>
                                    <td style={{width:'15%'}}>
                                        <Button onClick={() => history(PUT_PARENT_PAGE + '/' + allparent.parent_id)} className="ms-2"  variant={"outline-dark"}>Редагувати:</Button>

                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Row>
                </Container>
            })}
        </div>

    );
});

export default PutParentPanel;