import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {delSchedule, getSubjects, postSchedule} from "../../http/AdminApi";
import {ADMIN_ROUTE} from "../../utils/consts";
import {fetchGroups} from "../../http/childApi";
import {fetchSchedule1, fetchSchedule2, fetchSchedule3, fetchSchedule4, fetchSchedule5} from "../../http/scheduleApi";

const AddScheduleModal = ({show,onHide}) => {

    const [AllGroups,setAllGroups] = useState([])

    const [day1,setDay1] = useState([])
    const [day2,setDay2] = useState([])
    const [day3,setDay3] = useState([])
    const [day4,setDay4] = useState([])
    const [day5,setDay5] = useState([])

    const [subject_name,setSubject_name] = useState([])

    const [subName,setSubName] = useState('')
    const [DayWeek,setDayWeek] = useState('')
    const [Time_,setTime_] = useState('')
    const [ScheId,setScheId] = useState('0')

    const [ChooseGroup,setChooseGroup] = useState('')

    useEffect(()=>{
        getgroups(),
            getSchedule(),
            getSubject()
    },[ChooseGroup])

    useEffect(()=>{
        delSche()
    },[ScheId])



    const addSche = async () =>{
        try{
            const response =(await postSchedule(DayWeek,Time_,subName,ChooseGroup))

            setDay1([])
            setDay2([])
            setDay3([])
            setDay4([])
            setDay5([])

            setDay1(await fetchSchedule1(ChooseGroup))
            setDay2(await fetchSchedule2(ChooseGroup))
            setDay3(await fetchSchedule3(ChooseGroup))
            setDay4(await fetchSchedule4(ChooseGroup))
            setDay5(await fetchSchedule5(ChooseGroup))
            console.log(response)
            alert("Розклад успішно додано!")
        } catch (e) {
            alert("Something went wrong. Try to check inserted values")
        }
    }

    const delSche = async () =>{
        try{
            const response = (await delSchedule(ScheId))

            setDay1([])
            setDay2([])
            setDay3([])
            setDay4([])
            setDay5([])

            setDay1(await fetchSchedule1(ChooseGroup))
            setDay2(await fetchSchedule2(ChooseGroup))
            setDay3(await fetchSchedule3(ChooseGroup))
            setDay4(await fetchSchedule4(ChooseGroup))
            setDay5(await fetchSchedule5(ChooseGroup))

            console.log(response)
        } catch (e) {
            alert("Something went wrong. Try to check inserted values")
        }
    }

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

    const getSubject = async () =>{
        try {
            setSubject_name(await getSubjects())
        }
        catch (e){
            alert(e.response.data.message)
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
                    Додати або видалити розклад:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Container>
                    <h2 className="text-center mb-5">Розклад:</h2>
                    <Row>


                        <Col md={3}>
                            <Row >
                                <h4>Оберіть групу:</h4>
                                {AllGroups.map((groups)=>{
                                    return <div key={groups.group_id}>
                                        <div  className="text-start">
                                            <Button  className="mt-2" variant={"outline-dark"}  style={{width:170}} value={groups.group_name} onClick={e=>setChooseGroup(e.target.value)} >
                                                {groups.group_name}
                                            </Button>
                                        </div>
                                    </div>
                                })}
                            </Row>
                        </Col>
                        <Col md={5}>
                            <Table>
                                <tbody>
                                <tr>
                                    <td colSpan={2} style={{fontSize:25}}>Понеділок:</td>
                                </tr>
                                <tr>
                                    <td>
                                        {day1.map((d1)=> {
                                            return <div key={d1.schedule_id}>[ {d1.time_} {d1.subject_name}]
                                                Викладач: {d1.lname_} {d1.fname_} {d1.fathername_}
                                            <Button className="ms-3" variant={"outline-danger"} onClick={e=>setScheId(e.target.value)}  value={d1.schedule_id}> Видалити </Button>
                                            </div>
                                        })}


                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2} style={{fontSize:25}}>Вівторок:</td>
                                </tr>
                                <tr>
                                    <td>
                                        {day2.map((d2)=> {
                                            return <div key={d2.schedule_id}>[ {d2.time_} {d2.subject_name}]
                                                Викладач: {d2.lname_} {d2.fname_} {d2.fathername_}
                                                <Button className="ms-3" variant={"outline-danger"} onClick={e=>setScheId(e.target.value)}  value={d2.schedule_id}> Видалити </Button>
                                            </div>
                                        })}
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={2} style={{fontSize:25}}>Середа:</td>
                                </tr>
                                <tr>
                                    <td>
                                        {day3.map((d3)=> {
                                            return <div key={d3.schedule_id}>[ {d3.time_} {d3.subject_name}]
                                                Викладач: {d3.lname_} {d3.fname_} {d3.fathername_}
                                                <Button className="ms-3" variant={"outline-danger"} onClick={e=>setScheId(e.target.value)}  value={d3.schedule_id}> Видалити </Button>
                                            </div>
                                        })}
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={2} style={{fontSize:25}}>Четвер:</td>
                                </tr>
                                <tr>
                                    <td>
                                        {day4.map((d4)=> {
                                            return <div key={d4.schedule_id}>[ {d4.time_} {d4.subject_name}]
                                                Викладач: {d4.lname_} {d4.fname_} {d4.fathername_}
                                                <Button className="ms-3" variant={"outline-danger"} onClick={e=>setScheId(e.target.value)}  value={d4.schedule_id}> Видалити </Button>
                                            </div>
                                        })}
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={2} style={{fontSize:25}}>П'ятниця:</td>
                                </tr>
                                <tr>
                                    <td>
                                        {day5.map((d5)=> {
                                            return <div key={d5.schedule_id}>[ {d5.time_} {d5.subject_name}]
                                                Викладач: {d5.lname_} {d5.fname_} {d5.fathername_}
                                                <Button className="ms-3" variant={"outline-danger"} onClick={e=>setScheId(e.target.value)}  value={d5.schedule_id}> Видалити </Button>
                                            </div>
                                        })}
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                      <Col md={4}>
                          <h4>Додати розклад:</h4>
                          <select className="form-select mt-3" aria-label="Default select example" value={DayWeek} onChange={e=> setDayWeek(e.target.value)}>
                              <option>Виберіть день тижня</option>
                              <option value="1">Понеділок</option>
                              <option value="2">Вівторок</option>
                              <option value="3">Середа</option>
                              <option value="4">Четвер</option>
                              <option value="5">П'ятниця</option>
                          </select>
                          <select className="form-select mt-3" aria-label="Default select example" value={Time_} onChange={e=> setTime_(e.target.value)}>
                              <option>Виберіть час </option>
                              <option value="09:00">09:00</option>
                              <option value="11:00">11:00</option>
                              <option value="13:00">13:00</option>
                              <option value="15:00">15:00</option>
                          </select>
                          <select className="form-select mt-3" aria-label="Default select example" value={subName} onChange={e=> setSubName(e.target.value)}>
                              <option>Виберіть предмет:</option>
                              {subject_name.map((subname)=>{
                                  if(!subname){setSubName(subname.subject_name)}
                                  return   <option value={subname.subject_name} key={subname.subject_id}>{subname.subject_name}</option>
                              })}
                          </select>
                          <Card className="mt-3 pt-1 pb-1 ps-2" style={{fontSize:20}}>Група: {ChooseGroup}</Card>
                          <div className="text-center">
                          <Button className="mt-3" onClick={addSche} variant={"outline-dark"}>Додати розклад</Button>
                          </div>
                      </Col>

                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}> Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddScheduleModal;