import React, {useContext, useEffect, useState} from "react";
import {Button, Card, Col, Container, Row, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {fetchByGroup, fetchGroups, fetchKids, group_info} from "../http/childApi";
import {CHILD_PAGE, DAIRY} from "../utils/consts";
import jwt_decode from "jwt-decode";




const Child = observer(() =>{



    const [AllChild,setAllChild] = useState([])
    const [AllGroups,setAllGroups] = useState([])
    const [ChooseGroup,setChooseGroup] = useState('')
    const [groupInfo, setGroupInfo] =useState([])

    useEffect(()=>{
        getgroups(),
            filterGroup()
    },[ChooseGroup])



    const [ROLES,setROLES] = useState('')
    useEffect(() => {
        role()

    });

    const role = ()=>{
        try {
            const token = localStorage.getItem("token")
            const decoded = jwt_decode(token)
            setROLES(decoded.Role)
        }
        catch (e){

        }

    }

let count1 = 1;

const getgroups = async () =>{
    try{
        setAllGroups(await fetchGroups())
    } catch (e) {
        alert("Something went wrong. Try to check inserted values")
    }
}

const showAll = async () => {
    try{
        setAllChild([])
        setGroupInfo([])
        setAllChild(await fetchByGroup())
    }
    catch (e) {
        alert("Something went wrong. Try to check inserted values")
    }
}


    const filterGroup = async () =>{
        try{

            setAllChild(await fetchByGroup(ChooseGroup))
            setGroupInfo(await group_info(ChooseGroup))
        }
        catch (e) {
            alert("Something went wrong. Try to check inserted values")
        }
    }

    const history = useNavigate()
    return(
        <Container>
            <Row className="mt-2" >
                <Col md={3}>
                    <Card className="border-dark mt-3 pb-4" >
                    <h3 className="ms-4">Фільтрувати за групою:</h3>
                        <div  className="text-center">
                        <Button  variant={"outline-dark"}  onClick={showAll}>Всі діти:</Button>
                        </div>
                        {AllGroups.map((groups)=>{
                            return <div key={groups.group_id}>
                                <div  className="text-center">
                                    <Button  className="mt-2 ps-5 pe-5" variant={"outline-dark"}  value={groups.group_name} onClick={e=>setChooseGroup(e.target.value)} >
                                        {groups.group_name}
                                    </Button>
                                </div>
                            </div>
                        })}
                    </Card>
                </Col>
                <Col md={5} >
                    <h3 className="text-center">Список дітей:</h3>
                    {AllChild.map((childs)=>{
                        return <div key={childs.child_id}>

                            <Table hover striped bordered style={{width:'80%'}}  className="text-center ms-5 border-dark">
                                <tbody>
                                <tr>
                                    <td style={{width:'10%'}}>
                                        {count1++}
                                    </td>
                                    <td  onClick={() => history(CHILD_PAGE + '/' + childs.child_id)}  style={{fontSize:16, cursor:'pointer'}} className="text-center mt-2 ms-5">
                                {childs.child_lname} {childs.child_fname} {childs.child_fathername}
                                    </td>
                                </tr>
                                </tbody>
                            </Table>

                            {ROLES == 2 ? <Button variant={"outline-dark"} onClick={() => history(DAIRY + '/' + childs.child_id)} className="mb-4 ms-5">Зробити добовий звіт</Button>
                                :
                                <p></p>}

                        </div>
                    })}
                </Col>
                <Col md={4} >


                    {groupInfo.map((info)=>{
                        return <div key={info.lname_}>
                            <h3  className="ms-4 text-center">Інформація про групу:</h3>
                            <Card className="border-dark">
                               <p className="ps-4 mt-3">Викладач: {info.lname_} {info.fname_} {info.fathername_}</p>
                                <p className="ps-4 pe-4">Тип: {info.type_} &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; Всього дітей: {info.overall}</p>
                                <p className="ps-4 pe-4">Дівчат: {info.girls} &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;   Хлопців: {info.boys} </p>
                            </Card>
                        </div>
                    })}
                </Col>
            </Row>
        </Container>
    );
});

export default Child;
