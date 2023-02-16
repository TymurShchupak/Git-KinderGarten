import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import {fetchAllDairy, fetchAvgDairy, fetchDairy, fetchOneKid, fetchParent} from "../http/childApi";

import {PARENT_PAGE} from "../utils/consts";



const ChildPage =  observer(() =>{


    useEffect(()=>{
        getone(),
        getavgdairy(),
        getdairy(),
            getonechild()
        console.log(id)
    },[])

    const history = useNavigate()
    const {id} = useParams()
    const [ChildOne,setChild] = useState([])
    const [Dairy,setDairy] = useState([])
    const [AvgDairy,setAvgDairy] = useState([])
    const [AllDairy,setAllDairy] = useState([])
    const [ParentChild,setParentChild] = useState([])
    const [button,setButton] = useState(true)



    const getone = async () => {
        try{
            setChild (await fetchOneKid(id))
        }
        catch (e) {
            alert("Something went wrong. Try to check inserted values")
        }

    }
    const getdairy = async () => {
        try{
            setDairy (await fetchDairy(id))
        }
        catch (e) {
            alert("Something went wrong. Try to check inserted values")
        }

    }

    const getavgdairy = async () =>{
        try{
            setAvgDairy(await fetchAvgDairy(id))
        } catch (e) {
            alert("Something went wrong. Try to check inserted values")
        }
    }
    const showAllDairy = async () => {
        try{
            setAllDairy(await fetchAllDairy(id))
            setButton(value => !value)
        } catch (e) {
            alert("Something went wrong. Try to check inserted values")
        }
    }

    const clearAllDairy = () =>{
        setAllDairy([])
        setButton(value => !value)
    }

    const handleDateTruncation = (str) => {
        if(str !== null) {
            return str.substr(0, 10);
        } else {
            return "";
        }
    }
    const getonechild = async () => {
        try{
            setParentChild(await fetchParent(id))
        }
        catch (e) {
            alert("Something went wrong. Try to check inserted values")
        }

    }



    return(
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
                    <Card>
                    <Row className="row-cols-auto ms-5" >
                    <Row className="mt-3 row-cols-auto" >
                        <h4>Дата народження:</h4>
                        <Card style={{fontSize:20}} className="mb-3 font-monospace">
                            {handleDateTruncation(birth)}
                        </Card>
                    </Row>
                    <Row className="mt-3 row-cols-auto" >
                        <h4>Дата зарахування:</h4>
                        <Card style={{fontSize:20}} className="mb-3 font-monospace">
                            {handleDateTruncation(receipt)}
                        </Card>
                    </Row>
                    <Row className="mt-3 row-cols-auto" >
                        <h4>Дата закінчення:</h4>
                        <Card style={{fontSize:20}} className="mb-3 font-monospace">
                            {handleDateTruncation(release)}
                        </Card>
                    </Row>
                    </Row>
                    </Card>
                    <Card>
                        <Row className="row-cols-auto ms-5" >
                    <Row className="mt-3 row-cols-auto" >
                        <h4>Адреса проживання:</h4>
                        <Card style={{fontSize:20}} className="mb-3 font-monospace">
                            {kid.child_adress}
                        </Card>
                    </Row>
                    <Row className="mt-3 row-cols-auto" >
                        <h4>Медичне заключення:</h4>
                        <Card style={{fontSize:20}} className="mb-3 font-monospace">
                            {kid.medical_comment}
                        </Card>
                    </Row>
                        </Row>
                    </Card>
                    <Card>
                        <Row className="row-cols-auto ms-5" >
                    <Row className="mt-3 row-cols-auto" >
                        <h4>Гендер:</h4>
                        <Card style={{fontSize:20}} className="mb-3 font-monospace">
                            {kid.gender}
                        </Card>
                    </Row>
                    <Row className="mt-3 row-cols-auto" >
                        <h4>Тип групи:</h4>
                        <Card style={{fontSize:20}} className="mb-3 font-monospace">
                            {kid.type_}
                        </Card>
                    </Row>
                    <Row className="mt-3 row-cols-auto" >
                        <h4>Назва групи:</h4>
                        <Card style={{fontSize:20}} className="mb-3 font-monospace">
                            {kid.group_name}
                        </Card>
                    </Row>
                        </Row>
                    </Card>
                    <h2 style={{color:"darkolivegreen"}} className="text-center mt-3 mb-3">Сім'я:</h2>
                    {ParentChild.map((parent)=>{

                        return <div key={parent.parent_type}>
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
                    {AvgDairy.map((avgDairy)=>{
                        return <div key={avgDairy.fk_child_id}>
                            <h2 style={{color:"darkolivegreen"}} className="text-center mt-3 mb-3" >Середні оцінки за весь час:</h2>
                            <Card>

                                <Row className="row-cols-auto ms-5" >
                                    <Row className="mt-3 row-cols-auto" >
                                        <h4>Харчування:</h4>
                                        <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                            {avgDairy.avg_nutrition}/5
                                        </Card>
                                    </Row>
                                    <Row className="mt-3 row-cols-auto" >
                                        <h4>Гурток:</h4>
                                        <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                            {avgDairy.avg_activity}/5
                                        </Card>
                                    </Row>
                                    <Row className="mt-3 row-cols-auto" >
                                        <h4>Загальний настрій:</h4>
                                        <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                            {avgDairy.avg_mood}/5
                                        </Card>
                                    </Row>
                                </Row>

                            </Card>

                        </div>
                    })}

                    {Dairy.map((dairy)=>{
                        return <div key={dairy.dairy_num}>
                            <h2 style={{color:"darkolivegreen"}} className="text-center mt-5 mb-3" >Щоденник сьогодні</h2>
                            <Card>
                                <Row className="row-cols-auto ms-5" >
                                    <Row className="mt-3 row-cols-auto" >
                                        <h4>Харчування:</h4>
                                        <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                            {dairy.nutrition}/5
                                        </Card>
                                    </Row>
                                    <Row className="mt-3 row-cols-auto" >
                                        <h4>Гурток:</h4>
                                        <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                            {dairy.activity}/5
                                        </Card>
                                    </Row>
                                    <Row className="mt-3 row-cols-auto" >
                                        <h4>Загальний настрій:</h4>
                                        <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                            {dairy.gen_mood}/5
                                        </Card>
                                    </Row>
                                </Row>

                                </Card>
                        </div>
                    })}
                    {button ? <div className="col-md-12 mt-4 mb-4 text-center">
                        <Button onClick={showAllDairy}  variant={"outline-primary"}  style={{width:200}}>Історія щоденника:</Button>
                    </div>
                        :
                        <div className="col-md-12 mt-4 mb-4 text-center">
                            <Button onClick={clearAllDairy}  variant={"outline-danger"}  style={{width:200}}>Закрити:</Button>
                        </div>
                    }

                    {AllDairy.map((Alldairy)=>{
                        const time = new Date(Alldairy.date_)
                        const date_ = time.toLocaleDateString("ja-JP")
                        return <div key={Alldairy.dairy_num}>

                            <Card className="mt-3">

                                <Row className="mt-3 row-cols-auto me-5" >
                                    <h4 className="ms-5">Дата:</h4>
                                    <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                        {handleDateTruncation(date_)}
                                    </Card>
                                </Row>
                                <Row className="row-cols-auto ms-5" >
                                    <Row className="mt-3 row-cols-auto" >
                                        <h4>Харчування:</h4>
                                        <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                            {Alldairy.nutrition}/5
                                        </Card>
                                    </Row>
                                    <Row className="mt-3 row-cols-auto" >
                                        <h4>Гурток:</h4>
                                        <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                            {Alldairy.activity}/5
                                        </Card>
                                    </Row>
                                    <Row className="mt-3 row-cols-auto" >
                                        <h4>Загальний настрій:</h4>
                                        <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                            {Alldairy.gen_mood}/5
                                        </Card>
                                    </Row>
                                </Row>

                            </Card>
                        </div>
                    })}
                </Container>
            })}
        </div>

    );
});


export default ChildPage;
