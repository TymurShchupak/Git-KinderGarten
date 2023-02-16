import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Container, Row} from "react-bootstrap";
import {fetchOneParent, fetchOneParentChild} from "../http/parentApi";
import {CHILD_PAGE, PARENT_PAGE} from "../utils/consts";


const ParentPage = observer(() =>{

    const history = useNavigate()
    const {id} = useParams()
    const [Parent,setParent] = useState([])
    const [ParentChild,setParentChild] = useState([])

    useEffect(()=>{
        getone(),
            getonechild(),
            console.log(id)
    },[])


    const getone = async () => {
        try {
            setParent(await fetchOneParent(id))
        } catch (e) {
            alert("Something went wrong. Try to check inserted values")
        }
    }

        const getonechild = async () => {
            try{
                setParentChild(await fetchOneParentChild(id))
            }
            catch (e) {
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

    return(
        <div>
            {Parent.map((par)=>{
                const time = new Date(par.birth_date)
                const date = time.toLocaleDateString("ja-JP")
                return <Container key={par.parent_id}>

                    <h1 style={{color:"darkolivegreen"}} className="text-center mt-3 mb-3">Інформація </h1>
                    <Card>
                        <Row className="row-cols-auto ms-5">
                            <Row className="mt-3 row-cols-auto" >
                                <h4>Фамілія:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {par.lname_}
                                </Card>
                            </Row>
                            <Row className="mt-3 row-cols-auto" >
                                <h4>Ім'я:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {par.fname_}
                                </Card>
                            </Row>
                            <Row className="mt-3 row-cols-auto" >
                                <h4>По батькові:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {par.fathername_}
                                </Card>
                            </Row>
                        </Row>
                    </Card>
                    <Card>
                        <Row className="row-cols-auto ms-5" >
                            <Row className="mt-3 row-cols-auto" >
                                <h4>Дата народження:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {date}
                                </Card>
                            </Row>
                            <Row className="mt-3 row-cols-auto" >
                                <h4>Тип:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {par.parent_type}
                                </Card>
                            </Row>
                        </Row>
                    </Card>
                    <Card>
                        <Row className="row-cols-auto ms-5" >
                            <Row className="mt-3 row-cols-auto" >
                                <h4>Адреса проживання:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {par.adress}
                                </Card>
                            </Row>
                            <Row className="mt-3 row-cols-auto" >
                                <h4>Адреса роботи:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {par.work_place}
                                </Card>
                            </Row>
                        </Row>
                    </Card>
                    <h3 className="text-center mt-2">Контакти:</h3>
                    <Card>
                        <Row className="row-cols-auto ms-5" >
                            <Row className="mt-3 row-cols-auto" >
                                <h4>Номер телефону:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {par.phone_num}
                                </Card>
                            </Row>
                            <Row className="mt-3 row-cols-auto" >
                                <h4>Пошта:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {par.email}
                                </Card>
                            </Row>
                        </Row>
                    </Card>
                    {ParentChild.map((parchild)=>{
                    return <div key={parchild.child_id}>
                        <Card className="mt-3">
                            <Row className="row-cols-auto ms-5">
                                <Row className="mt-3 row-cols-auto" >
                                    <Card style={{fontSize:20}} className="mb-3 mt-1 font-monospace" >
                                       Дитина: {parchild.child_lname} {parchild.child_fname} {parchild.child_fathername}
                                    </Card>

                                    <Button onClick={() => history(CHILD_PAGE + '/' + parchild.child_id)} className=" mb-3 ms-5 " >Перейти на сторінку дитини</Button>

                                    </Row>
                            </Row>
                        </Card>
                    </div>}
                    )}
                </Container>
            })}
        </div>
    );
});

export default ParentPage;
