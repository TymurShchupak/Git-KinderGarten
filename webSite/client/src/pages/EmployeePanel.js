import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {fetchAllFiredEmployee, fetchAllWorkingEmployee, ranking} from "../http/employeeApi";
import {Row, Card, Container, Button, Col, Table} from "react-bootstrap";
import {EMPLOYEE_PAGE} from "../utils/consts";
import {useNavigate} from "react-router-dom";



const Employee = observer(() =>{
  const history = useNavigate()
  useEffect(()=>{
    getAll()
  },[])

  const [AllEmployee,setAllEmployee] = useState([])
  const [button,setButton] = useState(false)
const [number,setNumber]=useState('1')
  const [rank,setRank] = useState([])
  let count = 1;
  let count1 = 1;
  useEffect(()=>{
    getRank()
  },[number])

  const getAll = async () =>{
    try{
      setAllEmployee([])
    setAllEmployee(await fetchAllWorkingEmployee())
      setButton(value => !value)
  } catch (e) {
    alert("Something went wrong. Try to check inserted values")
  }}

  const getRank = async () =>{
    try{
      setRank(await ranking(number))
    }
    catch (e) {
      alert("Сталася помилка!")
    }
  }
  const getFired = async () =>{
    try{
      setButton(value => !value)
      setAllEmployee([])
      setAllEmployee(await fetchAllFiredEmployee())
    } catch (e) {
      alert("Something went wrong. Try to check inserted values")
    }
  }

  return(

<div>
  <Row>
  <Col md={6}>
    <h1 className="text-center mt-2 mb-3">Список викладачів:</h1>
  {button ?
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <Button onClick={getFired}>Відобразити звільнених працівників:</Button>
  </div>
  :
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Button onClick={getAll}>Відобразити працюючих працівників:</Button>
      </div>
  }



  {AllEmployee.map((allemployee)=>{
    return <Container key={allemployee.employee_id}>
      <Row className="d-flex mt-2" onClick={() => history(EMPLOYEE_PAGE + '/' + allemployee.employee_id)}>
        <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

            }}
        >
          <Table  hover striped bordered style={{width:'80%'}}  className="text-center ms-5 border-dark">
            <tbody>
            <tr>
              <td style={{width:'10%'}}>
                {count1++}
              </td>
              <td>
                {allemployee.lname_} {''} {allemployee.fname_} {''} {allemployee.fathername_}
              </td>

            </tr>
            </tbody>
          </Table>
        </div>
      </Row>
    </Container>
  })}
  </Col>
  <Col md={6}>
    <h3 className="mt-3 ms-5">Рейтинг викладачів:</h3>
    <Row className="row-cols-auto ms-5" >
      <Button variant={"outline-dark"} value={1} onClick={e=> setNumber(e.target.value)} >За кількістю дітей в групі</Button>
      <Button  variant={"outline-dark"} value={2} onClick={e=> setNumber(e.target.value)} className="ms-2">За кількістю предметів</Button>
      <Button variant={"outline-dark"} value={3} onClick={e=> setNumber(e.target.value)} className="ms-2">За віком</Button>
    </Row>
      {rank.map((score)=>{
        return <div key={score.lname_}>

        <Table bordered style={{width:'80%'}}  className="text-center ms-5 mt-3 border-dark">
          <tbody>
          <tr>
<td style={{width:'10%'}}>
  {count++}
</td>
            <td style={{width:'50%'}} className="text-start ">
              {score.lname_} {score.fname_} {score.fathername_}
            </td>
            { number == 1  ? <td style={{width:'20%'}}>Дітей: {score.kids_count}</td>
                :number ==2? <td style={{width:'20%'}}>Предметів: {score.subject_count}</td>
                    :<td style={{width:'20%'}}>Вік: {score.employee_age}</td>  }

          </tr>
          </tbody>
        </Table>
        </div>
      })}


  </Col>
  </Row>
</div>

  );
});

export default Employee;
