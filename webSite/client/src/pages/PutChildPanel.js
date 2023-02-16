import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {fetchByGroup, fetchGroups, fetchKids} from "../http/childApi";
import {PUT_CHILD_PAGE} from "../utils/consts";
import {releaseChild} from "../http/AdminApi";




const PutChildPanel = observer(() =>{

    const [AllChild,setAllChild] = useState([])
    const [AllGroups,setAllGroups] = useState([])
    const [ChooseGroup,setChooseGroup] = useState('')

    useEffect(()=>{
        getgroups(),
            filterGroup()
    },[ChooseGroup])






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
            setAllChild(await fetchByGroup())
        }
        catch (e) {
            alert("Something went wrong. Try to check inserted values")
        }
    }


    const filterGroup = async () =>{
        try{

            setAllChild(await fetchByGroup(ChooseGroup))
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
                    <Card className="border-dark mt-3 pb-4 pt-2" style={{width:250}}>
                        <h3 className="ms-4">Фільтрувати за групою:</h3>
                        <div  className="text-center">
                            <Button  variant={"outline-dark"}  style={{width:100}} onClick={showAll}>Всі діти:</Button>
                        </div>
                        {AllGroups.map((groups)=>{
                            return <div key={groups.group_id}>
                                <div  className="text-center">
                                    <Button  className="mt-2" variant={"outline-dark"}  style={{width:200}} value={groups.group_name} onClick={e=>setChooseGroup(e.target.value)} >
                                        {groups.group_name}
                                    </Button>
                                </div>
                            </div>
                        })}
                    </Card>
                </Col>
                <Col md={9} >
                    <h3 className="text-center">Список дітей:</h3>
                    {AllChild.map((childs)=>{
                        return <Row key={childs.child_id} className="d-flex mt-2" >

                            <Card  onClick={() => history(PUT_CHILD_PAGE + '/' + childs.child_id)}  style={{fontSize:16, cursor:'pointer'}} className="text-center mt-2 ms-5">
                                {childs.child_lname} {childs.child_fname} {childs.child_fathername}
                            </Card>

                       
                            </Row>

                    })}
                </Col>
            </Row>
        </Container>
    );
});

export default PutChildPanel;
