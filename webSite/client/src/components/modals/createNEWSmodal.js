import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {AddGroup, addNews, fetchEmployee} from "../../http/AdminApi";

import {ADMIN_ROUTE, NEWS} from "../../utils/consts";

const CreateNewsModal = ({show,onHide}) => {



    const history = useNavigate()

    const [topic,setTopic] = useState('')
    const [text_,setText_] = useState('')




    const news = async ()=>{
        try {
            const response = await addNews(topic,text_)
            console.log(response)
            history(NEWS)
        }
        catch (e) {
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
                    Додати нову новину:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form className="d-flex flex-column">
                    <Form.Control className="mt-3" placeholder="Тема новини" value={topic} onChange={e => setTopic(e.target.value)}/>
                    <Form.Control className="mt-3" placeholder="Зміст новини" value={text_} onChange={e => setText_(e.target.value)}/>


                    <div className="col-md-12 text-center">
                        <Button onClick={news} style={{width:180}} className="mt-3" variant={"outline-primary"}>Добавити новину:</Button>
                    </div>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}> Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateNewsModal;