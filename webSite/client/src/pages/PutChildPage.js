import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {fetchGroups, fetchOneKid} from "../http/childApi";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Container, Form, Row, Table} from "react-bootstrap";
import {putChild, releaseChild} from "../http/AdminApi";
import {PUT_CHILD} from "../utils/consts";

const PutChildPage =observer(() => {

    const history = useNavigate()

    const {id} = useParams()
   

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
    const [ChildOne,setChild] = useState([])
    
    useEffect(()=>{
        getone(),
            getgroups()
        console.log(id)
    },[])

    
    const getone = async () => {
        try{
            setChild (await fetchOneKid(id))
        }
        catch (e) {
            alert("Something went wrong. Try to check inserted values")
        }
    }

    const putChildren = async () =>{
try{
    const response = await putChild(id,child_lname, child_fname, child_fathername,child_birth_date, receipt_date,release_date,  child_adress, medical_comment,  gender, group_name)
    console.log(response)
    alert("Інформація успішно змінена!")
    history(PUT_CHILD)
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
    const getgroups = async () =>{
        try{
            setAllGroups(await fetchGroups())
        } catch (e) {
            alert("Something went wrong. Try to check inserted values")
        }
    }

    const delChild = async () =>{
        const del = (await releaseChild(id))
        console.log(del)
history(PUT_CHILD)
    }

    return (
        <div>

            <Row className="mt-2" >


                <h3 className="text-center">Редагувати інформацію:</h3>
                {ChildOne.map((child)=>{
                    const time1 = new Date(child.child_birth_date)
                    const birth = time1.toLocaleDateString("ja-JP")
                    const time2 = new Date(child.receipt_date)
                    const receipt = time2.toLocaleDateString("ja-JP")
                    const time3 = new Date(child.release_date)
                    const release = time3.toLocaleDateString("ja-JP")
                    if(!child_lname,!child_fname,!child_fathername,!child_birth_date,!receipt_date,!release_date,!child_adress,!medical_comment,!gender,!group_name)
                    {
                        setChild_lname(child.child_lname)
                        setChild_fname(child.child_fname)
                        setChild_fathername(child.child_fathername)
                        setChild_birth_date(birth)
                        setReceipt_date(receipt)
                        setRelease_date(release)
                        setChild_adress(child.child_adress)
                        setMedical_comment(child.medical_comment)
                        setGender(child.gender)
                        setGroup_name(child.group_name)
                    }
                    return <Container key={child.child_id}  className="d-flex justify-content-center align-content-center">

                        <Table striped bordered hover >
                            <tbody>
                            <tr>

                                <td className="text-end " style={{fontSize:30}}>Фамілія:</td>
                                <td> <Form.Control
                                    style={{fontSize:20}}
                                    placeholder={child.child_lname}
                                    value={child_lname}
                                    onChange={e => setChild_lname(e.target.value)}
                                /></td>

                            </tr>
                            <tr>

                                <td className="text-end" style={{fontSize:30}}>Ім'я:</td>
                                <td>  <Form.Control
                                    style={{fontSize:20}}
                                    placeholder={child.child_fname}
                                    value={child_fname}
                                    onChange={e => setChild_fname(e.target.value)}
                                /></td>

                            </tr>
                            <tr>
                                <td className="text-end" style={{fontSize:30}}>По батькові:</td>
                                <td><Form.Control
                                    style={{fontSize:20}}
                                    placeholder={child.child_fathername}
                                    value={child_fathername}
                                    onChange={e => setChild_fathername(e.target.value)}
                                /></td>
                            </tr>
                            <tr>
                                <td className="text-end" style={{fontSize:30}}>Дата народження:</td>
                                <td><Form.Control
                                    style={{fontSize:20}}
                                    placeholder={child.birth_date}
                                    value={handleDateTruncation(child_birth_date)}
                                    onChange={e => setChild_birth_date(e.target.value)}
                                /></td>
                            </tr>
                            <tr>
                                <td className="text-end" style={{fontSize:30}}>Дата зарахування:</td>
                                <td><Form.Control
                                    style={{fontSize:20}}
                                    placeholder={child.receipt_date}
                                    value={handleDateTruncation(receipt_date)}
                                    onChange={e => setReceipt_date(e.target.value)}
                                /></td>
                            </tr>
                            <tr>
                                <td className="text-end" style={{fontSize:30}}> Дата випуску:</td>
                                <td><Form.Control
                                    style={{fontSize:20}}
                                    placeholder={child.release_date}
                                    value={handleDateTruncation(release_date)}
                                    onChange={e => setRelease_date(e.target.value)}

                                /></td>
                            </tr>
                            <tr>
                                <td className="text-end" style={{fontSize:30}}>Адреса:</td>
                                <td><Form.Control
                                    style={{fontSize:20}}
                                    placeholder={child.child_adress}
                                    value={child_adress}
                                    onChange={e => setChild_adress(e.target.value)}
                                /></td>
                            </tr>
                            <tr>
                                <td className="text-end" style={{fontSize:30}}>Пошта:</td>
                                <td><Form.Control
                                    style={{fontSize:20}}
                                    placeholder={child.medical_comment}
                                    value={medical_comment}
                                    onChange={e => setMedical_comment(e.target.value)}
                                /></td>
                            </tr>
                            <tr>
                                <td className="text-end" style={{fontSize:30}}>Стать:</td>
                                <td>
                                    <select style={{fontSize:20}} className="form-select" aria-label="Default select example" value={gender} onChange={e=> setGender(e.target.value)}>
                                    <option value="Хлопчик">Хлопчик</option>
                                    <option value="Дівчинка">Дівчинка</option>
                                </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-end" style={{fontSize:30}}>Група:</td>
                                <td>
                                    <select style={{fontSize:20}}  className="form-select" aria-label="Default select example" value={group_name} onChange={e=>setGroup_name(e.target.value)} >
                                        <option value={0}>Оберіть групу</option>
                                        {AllGroups.map((groups) =>
                                            <option  value={groups.group_name} key={groups.group_id}>{groups.group_name}</option>
                                        )}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-center">
                                    <Button className="mt-3 " onClick={delChild} style={{width:400}}  variant={"outline-danger"}>Випустити:</Button>
                                </td>
                                <td className="text-center" >

                                    <Button className="mt-3" style={{width:400}} variant={"outline-dark"} onClick={putChildren}> Змінити дані:</Button>
                                </td>
                            </tr>
                            </tbody>
                        </Table>

















                    </Container>
                })}

            </Row>


        </div>
    );
});

export default PutChildPage;


