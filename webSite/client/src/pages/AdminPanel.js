import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import {Button, Container} from "react-bootstrap";
import RegEmployeeModal from "../components/modals/regEmployeeModal";
import RegParentModal from "../components/modals/regParentModal";
import RegChildModal from "../components/modals/regChildModal";
import AddGroupModal from "../components/modals/addGroupModal";
import DeleteGroupModal from "../components/modals/deleteGroupModal";
import {useNavigate} from "react-router-dom";
import {PUT_CHILD, PUT_EMPLOYEE, PUT_PARENT, STATISTIC} from "../utils/consts";
import AddSubjectModal from "../components/modals/addSubjectModal";
import PutSubjectModal from "../components/modals/putSubjectModal";
import AddScheduleModal from "../components/modals/addScheduleModal";
import FamilyModal from "../components/modals/familyModal";
import CreateNewsModal from "../components/modals/createNEWSmodal";
import FireEmployeeModal from "../components/modals/fireEmployeeModal";

const Admin = observer(() =>{

  const  history = useNavigate()

  const [regempVisible, setRegEmpVisible] = useState(false)
  const [regparVisible, setRegParVisible] = useState(false)
  const [regchildVisible, setRegChildVisible] = useState(false)
  const [addGroupVisible, setAddGroupVisible] = useState(false)
  const [deleteGroupVisible,setDeleteGroupVisible] = useState(false)
  const [subjectVisible,setSubject_visible] = useState(false)
  const [putSubjectVisible,setPutSubject_visible] = useState(false)
const [addSchedule,setAddSchedule] = useState(false)
  const [family,setFamily] = useState(false)
  const [news,setNews] = useState(false)
  const [fire,setFire] = useState(false)


  return(
<Container className="text-center">
  <h2>Статистика:</h2>
  <Button onClick={()=>history(STATISTIC)} style={{width:300}} className="text-center mt-3 ms-3" variant={"outline-dark"}>Статистика дитячого сада</Button>
  <h2> Реєстрація: </h2>
  <Button onClick={()=> setRegEmpVisible(true)} style={{width:300}} className="text-center mt-3 ms-3" variant={"outline-dark"}>Додати працівника</Button>
  <Button onClick={()=> setRegParVisible(true)} style={{width:300}} className="text-center mt-3 ms-3" variant={"outline-dark"}>Додати опікуна</Button>
  <Button onClick={()=> setRegChildVisible(true)} style={{width:300}} className="text-center mt-3 ms-3" variant={"outline-dark"}>Додати дитину</Button>
  <Button onClick={()=> setFamily(true)} style={{width:300}} className="text-center mt-3 ms-3" variant={"outline-dark"}>Зв'язки сім'ї</Button>

  <RegEmployeeModal show={regempVisible} onHide={()=>setRegEmpVisible(false)}/>
  <RegParentModal show={regparVisible} onHide={()=>setRegParVisible(false)}/>
  <RegChildModal show={regchildVisible} onHide={()=>setRegChildVisible(false)}/>

  <h2 className="mt-2"> Взаємодія з групами: </h2>
  <Button onClick={()=> setAddGroupVisible(true)} style={{width:300}} className="text-center mt-3 ms-3" variant={"outline-dark"}>Додати групу</Button>
    <Button onClick={()=> setDeleteGroupVisible(true)} style={{width:300}} className="text-center mt-3 ms-3" variant={"outline-dark"}>Видалити групу</Button>
  <h2 className="mt-2"> Редагування або видалення: </h2>
<Button onClick={()=>history(PUT_PARENT)} style={{width:300}} className="text-center mt-3 ms-3" variant={"outline-dark"}>Опікуни</Button>
  <Button onClick={()=>history(PUT_EMPLOYEE)} style={{width:300}} className="text-center mt-3 ms-3" variant={"outline-dark"}>Працівники</Button>
  <Button onClick={()=>history(PUT_CHILD)} style={{width:300}} className="text-center mt-3 ms-3" variant={"outline-dark"}>Діти</Button>
  <Button onClick={()=> setFire(true)} style={{width:300}} className="text-center mt-3 ms-3" variant={"outline-dark"}>Звільнити працівника</Button>
<FireEmployeeModal show={fire} onHide={()=> setFire(false)}/>
  <h2 className="mt-2"> Предмети та розклад: </h2>
  <Button onClick={()=> setSubject_visible(true)} style={{width:300}} className="text-center mt-3 ms-3" variant={"outline-dark"}>Додати предмет</Button>
  <Button onClick={()=> setPutSubject_visible(true)} style={{width:300}} className="text-center mt-3 ms-3" variant={"outline-dark"}>Редагувати  або видалити предмет</Button>
  <Button onClick={()=> setAddSchedule(true)} style={{width:300}} className="text-center mt-3 ms-3" variant={"outline-dark"}>Додати або видалити розклад</Button>
  <h2 className="mt-2"> Новини: </h2>
  <Button onClick={()=> setNews(true)} style={{width:300}} className="text-center mt-3 ms-3 mb-5" variant={"outline-dark"}>Додати новину</Button>

  <AddGroupModal show={addGroupVisible} onHide={()=> setAddGroupVisible(false)}/>
    <DeleteGroupModal show={deleteGroupVisible} onHide={()=> setDeleteGroupVisible(false)}/>
  <AddSubjectModal show={subjectVisible} onHide={()=> setSubject_visible(false)} />
<PutSubjectModal show={putSubjectVisible} onHide={()=> setPutSubject_visible(false)}/>
  <AddScheduleModal show={addSchedule} onHide={()=> setAddSchedule(false)} />
  <FamilyModal show={family} onHide={()=> setFamily(false)}/>
  <CreateNewsModal show={news} onHide={()=> setNews(false)}/>
</Container>
  );
});

export default Admin;
