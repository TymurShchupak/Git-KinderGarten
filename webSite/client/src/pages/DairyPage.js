import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {createDairy, fetchDairy, fetchOneKid} from "../http/childApi";
import {Button, Card, Container, Row} from "react-bootstrap";
import {CHILD_ROUTE} from "../utils/consts";

const DairyPage = () => {

    const history = useNavigate()
    const {id} = useParams()
const [ChildOne,setChild] = useState([])


    const [nutrition,setNutrition] = useState('')
    const [activity,setActivity] = useState('')
    const [gen_mood,setGen_mood] = useState('')

    const [Dairy,setDairy] = useState([])
    useEffect(()=>{
        getone(),
            getdairy()
        console.log(id)

    },[])

    const getone = async () => {
        try{
            setChild(await fetchOneKid(id))
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

    const postDairy = async () => {
        try{
            const post =(await createDairy(id,nutrition,activity,gen_mood))
            console.log(post)
            alert("Добовий звіт успішно створений!")
            history(CHILD_ROUTE)
        }
        catch (e) {
            alert("Something went wrong. Try to check inserted values")
        }

    }



    return (
        <div>
            {ChildOne.map((kid)=>{

             return   <Container key={kid.child_id}>

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
                 {Dairy.map((dairy)=>{

                     return <div key={dairy.dairy_num}>
                         <h2 style={{color:"darkolivegreen"}} className="text-center mt-5 mb-3" >Сьогоднішній звіт уже створено</h2>
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
                 <Row className="text-center">
                     <h3 className=" mt-3">Створення добового звіту:</h3>
                     <select className="form-select mt-3" aria-label="Default select example" value={nutrition} onChange={e=> setNutrition(e.target.value)}>
                         <option>Виберіть оцінку від 1 до 5 як Ви оцінили харчування дитини</option>
                         <option value="1">1</option>
                         <option value="2">2</option>
                         <option value="3">3</option>
                         <option value="4">4</option>
                         <option value="5">5</option>
                     </select>
                     <select className="form-select mt-3" aria-label="Default select example" value={activity} onChange={e=> setActivity(e.target.value)}>
                         <option>Виберіть оцінку від 1 до 5 як Ви оцінили активність дитини</option>
                         <option value="1">1</option>
                         <option value="2">2</option>
                         <option value="3">3</option>
                         <option value="4">4</option>
                         <option value="5">5</option>
                     </select>
                     <select className="form-select mt-3" aria-label="Default select example" value={gen_mood} onChange={e=> setGen_mood(e.target.value)}>
                         <option>Виберіть оцінку від 1 до 5 як Ви оцінили загальний настрій дитини</option>
                         <option value="1">1</option>
                         <option value="2">2</option>
                         <option value="3">3</option>
                         <option value="4">4</option>
                         <option value="5">5</option>
                     </select>
                     <div className="mt-3 text-center">
                     <Button onClick={postDairy} variant={"outline-dark"} style={{width:200}}>Створити добовий звіт</Button>
                     </div>
                 </Row>
             </Container>
            })}
        </div>
    );
};

export default DairyPage;