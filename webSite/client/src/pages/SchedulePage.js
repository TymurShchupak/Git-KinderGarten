import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Row, Table} from "react-bootstrap";
import {fetchGroups} from "../http/childApi";
import {fetchSchedule1, fetchSchedule2, fetchSchedule3, fetchSchedule4, fetchSchedule5} from "../http/scheduleApi";

const SchedulePage = () => {

    const [AllGroups,setAllGroups] = useState([])

    const [day1,setDay1] = useState([])
    const [day2,setDay2] = useState([])
    const [day3,setDay3] = useState([])
    const [day4,setDay4] = useState([])
    const [day5,setDay5] = useState([])


    const [ChooseGroup,setChooseGroup] = useState('')

    useEffect(()=>{
        getgroups(),
        getSchedule()
    },[ChooseGroup])


    const getgroups = async () =>{
        try{
            setAllGroups(await fetchGroups())
        } catch (e) {
            alert("Something went wrong. Try to check inserted values")
        }
    }

    const getSchedule = async () => {
        try{
            setDay1(await fetchSchedule1(ChooseGroup))
            setDay2(await fetchSchedule2(ChooseGroup))
            setDay3(await fetchSchedule3(ChooseGroup))
            setDay4(await fetchSchedule4(ChooseGroup))
            setDay5(await fetchSchedule5(ChooseGroup))
        }
        catch (e) {
            alert("Something went wrong. Try to check inserted values")
        }
    }

    return (
        <Container>
            <h2 className="text-center mb-5">Розклад:</h2>
            <Row>


            <Col md={4}>
                <Row >
                    <h4>Оберіть групу:</h4>
                {AllGroups.map((groups)=>{
                    return <div key={groups.group_id}>
                        <div  className="text-start">
                            <Button  className="mt-2" variant={"outline-dark"}  style={{width:200}} value={groups.group_name} onClick={e=>setChooseGroup(e.target.value)} >
                                {groups.group_name}
                            </Button>
                        </div>
                    </div>
                })}
</Row>
            </Col>
            <Col md={8}>
                <Table>
                    <tbody>
                    <tr>
                    <td colSpan={2} style={{fontSize:25}}>Понеділок:</td>
                        </tr>
                    <tr>
                        <td>
                            {day1.map((d1)=>
                                <p key={d1.schedule_id}>[ {d1.time_} {d1.subject_name}] Викладач: {d1.lname_} {d1.fname_} {d1.fathername_}</p>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{fontSize:25}}>Вівторок:</td>
                    </tr>
                    <tr>
                        <td>
                            {day2.map((d2)=>
                                <p key={d2.schedule_id}>[ {d2.time_} {d2.subject_name}] Викладач: {d2.lname_} {d2.fname_} {d2.fathername_}</p>
                            )}
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2} style={{fontSize:25}}>Середа:</td>
                    </tr>
                    <tr>
                        <td>
                            {day3.map((d3)=>
                                <p key={d3.schedule_id}>[ {d3.time_} {d3.subject_name}] Викладач: {d3.lname_} {d3.fname_} {d3.fathername_}</p>
                            )}
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2} style={{fontSize:25}}>Четвер:</td>
                    </tr>
                    <tr>
                        <td>
                            {day4.map((d4)=>
                                <p key={d4.schedule_id}>[ {d4.time_} {d4.subject_name}] Викладач: {d4.lname_} {d4.fname_} {d4.fathername_}</p>
                            )}
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2} style={{fontSize:25}}>П'ятниця:</td>
                    </tr>
                    <tr>
                        <td>
                            {day5.map((d5)=>
                                <p key={d5.schedule_id}>[ {d5.time_} {d5.subject_name}] Викладач: {d5.lname_} {d5.fname_} {d5.fathername_}</p>
                            )}
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </Col>


</Row>
        </Container>
    );
};

export default SchedulePage;