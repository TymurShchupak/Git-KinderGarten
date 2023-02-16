import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {DeleteGroup, getEmptyGroups} from "../../http/AdminApi";

const DeleteGroupModal = ({show,onHide}) => {






    const [groupName,setGroupName] = useState([])
    const [grId,setGrId] = useState('')

    useEffect(()=>{
        getGroupName()
    },[])

    const getGroupName = async () =>{
        try {
            setGroupName(await getEmptyGroups())
        }
        catch (e){
            alert(e.response.data.message)
        }
    }

    const Delgroup = async ()=>{
        try {
            const response = await DeleteGroup(grId)
            setGroupName([])
            setGroupName(await getEmptyGroups())
            console.log(response)

        }
        catch (e) {
            alert(e.response.data.message)
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
                    Видалити групу:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="d-flex flex-column">
                   
                  
                    <select className="form-select mt-3" aria-label="Default select example" value={grId} onChange={e=> setGrId(e.target.value)}>
                        <option>Виберіть порожню групу:</option>
                        {groupName.map((groups)=>
                            <option value={groups.group_id} key={groups.group_id}>{groups.group_name}</option>
                        )}
                    </select>

                    <div className="col-md-12 text-center">
                        <Button onClick={Delgroup} style={{width:140}} className="mt-3" variant={"outline-primary"}>Видалити</Button>
                    </div>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}> Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteGroupModal;