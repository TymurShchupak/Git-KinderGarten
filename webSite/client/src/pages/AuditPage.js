import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchOneKid} from "../http/childApi";
import {oneAudit} from "../http/AdminApi";
import {Card, Container, Row} from "react-bootstrap";

const AuditPage = () => {


    const {id} = useParams()
    const [ChildOne,setChild] = useState([])

    useEffect(()=>{
        getone()
    },[])

    const getone = async () => {
        try {
            setChild(await oneAudit(id))
        } catch (e) {
            alert("Something went wrong. Try to check inserted values")
        }
    }
    return (
        <div>
            {ChildOne.map((kid)=>{
                const time1 = new Date(kid.child_birth_date)
                const birth = time1.toLocaleDateString("ja-JP")
                const time2 = new Date(kid.receipt_date)
                const receipt = time2.toLocaleDateString("ja-JP")
                const time3 = new Date(kid.release_date)
                const release = time3.toLocaleDateString("ja-JP")
                return <Container key={kid.child_id}>

                    <h1 style={{color:"darkolivegreen"}} className="text-center mt-3 mb-3">Інформація про дитину:</h1>
                    <Card>
                        <Row className="row-cols-auto ms-5">
                            <Row className="mt-3 row-cols-auto" >
                                <h4>Фамілія:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {kid.child_lname}
                                </Card>
                            </Row>
                            <Row className="mt-3 row-cols-auto" >
                                <h4>Ім'я:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {kid.child_fname}
                                </Card>
                            </Row>
                            <Row className="mt-3 row-cols-auto" >
                                <h4>По батькові:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {kid.child_fathername}
                                </Card>
                            </Row>
                        </Row>
                    </Card>
                    <Card className="mt-2">
                        <Row className="row-cols-auto ms-5" >
                            <Row className="mt-3 row-cols-auto" >
                                <h4>Дата народження:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {birth}
                                </Card>
                            </Row>
                            <Row className="mt-3 row-cols-auto" >
                                <h4>Дата зарахування:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {receipt}
                                </Card>
                            </Row>
                            <Row className="mt-3 row-cols-auto" >
                                <h4>Дата закінчення:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {release}
                                </Card>
                            </Row>
                        </Row>
                    </Card>

                    <Card className="mt-3">
                        <h1 className="text-center">Атестат:</h1>
                        <Row className="row-cols-auto ms-5" >

                            <Row className="mt-3 row-cols-auto" >
                                <h4>Середній настрій:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {kid.avg_gen_mood}
                                </Card>
                                <h4>Середня активність:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {kid.avg_activity}
                                </Card>
                                <h4>Середнє харчування:</h4>
                                <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                    {kid.avg_nutrition}
                                </Card>
                            </Row>
                        </Row>
                    </Card>
                </Container>
                })}
        </div>
    );
};

export default AuditPage;