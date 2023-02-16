import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {registrationChild} from "../../http/userApi";
import {ADMIN_ROUTE, FRONT_PAGE_ROUTE} from "../../utils/consts";
import {Button, Form, Modal} from "react-bootstrap";
import {fetchGroups} from "../../http/childApi";

const RegChildModal = ({show,onHide}) => {


    const history = useNavigate()

    const [child_lname,setChild_lname] = useState('')
    const [child_fname,setChild_fname] = useState('')
    const [child_fathername,setChild_fathername] = useState('')
    const [child_birth_date,setChild_birth_date] = useState('')
    const [receipt_date,setReceipt_date] = useState('')
    const [release_date,setRelease_date] = useState('')
    const [child_adress,setChild_adress] = useState('')
    const [medical_comment,setMedical_comment] = useState('')
    const [gender,setGender] = useState('')
    const [group_name,setGroup_name] = useState('')
    const [AllGroups,setAllGroups] = useState([])


    useEffect(()=>{
        getgroups()
    },[])


    const getgroups = async () =>{
        try{
            setAllGroups(await fetchGroups())
        } catch (e) {
            alert("Something went wrong. Try to check inserted values")
        }
    }

    const post = async ()=>{
        try {
            const  response = await registrationChild(child_lname, child_fname, child_fathername,child_birth_date, receipt_date,release_date,  child_adress, medical_comment,  gender, group_name)
          alert("Дитину успішно зареєстровано!")
        }
        catch (e) {
            alert("Сталася помилка")
        }

    }


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Реєстрація дитини:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="d-flex flex-column">
                    <Form.Control className="mt-3" placeholder="Фамілія" value={child_lname} onChange={e => setChild_lname(e.target.value)}/>
                    <Form.Control className="mt-3" placeholder="Ім'я" value={child_fname} onChange={e=>setChild_fname(e.target.value)}/>
                    <Form.Control className="mt-3" placeholder="По батькові" value={child_fathername} onChange={e=> setChild_fathername(e.target.value)}/>
                    <Form.Control className="mt-3" placeholder="Дата народження" value={child_birth_date} onChange={e=> setChild_birth_date(e.target.value)}/>
                    <Form.Control className="mt-3" placeholder="Дата зарахування" value={receipt_date} onChange={e=> setReceipt_date(e.target.value)}/>
                    <Form.Control className="mt-3" placeholder="Дата закінчення дитячого садка" value={release_date} onChange={e=> setRelease_date(e.target.value)}/>
                    <Form.Control className="mt-3" placeholder="Адреса" value={child_adress} onChange={e=> setChild_adress(e.target.value)}/>
                    <Form.Control className="mt-3" placeholder="Медичний висновок" value={medical_comment} onChange={e=> setMedical_comment(e.target.value)}/>
                    <select className="form-select mt-3" aria-label="Default select example" value={gender} onChange={e=> setGender(e.target.value)}>
                        <option>Виберіть стать дитини</option>
                        <option value="Хлопчик">Хлопчик</option>
                        <option value="Дівчинка">Дівчинка</option>
                    </select>
                    <select   className="form-select mt-3" aria-label="Default select example" value={group_name} onChange={e=>setGroup_name(e.target.value)} >
                        <option value={0}>Оберіть групу</option>
                        {AllGroups.map((groups) =>
                            <option  value={groups.group_name} key={groups.group_id}>{groups.group_name}</option>
                        )}
                    </select>
                    <div className="col-md-12 text-center">
                        <Button onClick={post} style={{width:140}} className="mt-3" variant={"outline-primary"}>Зареєструвати</Button>
                    </div>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}> Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RegChildModal;