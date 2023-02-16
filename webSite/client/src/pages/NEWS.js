import React, {useEffect, useState} from 'react';
import {Button, Card, Container, Row} from "react-bootstrap";
import {fetchNews} from "../http/scheduleApi";
import jwt_decode from "jwt-decode";
import {deleteNews} from "../http/AdminApi";

const News = () => {

    const [AllNews,setAllNews] = useState([])
const [newId,setNewId] = useState('0')
    useEffect(()=>{
        news(),
            role()
    },[]);


    useEffect(()=>{
delNew()
    },[newId]);

    const delNew = async () =>{
        try {
            const del = await(deleteNews(newId))
            console.log(del)
            setAllNews([])
            setAllNews(await fetchNews())
        }
        catch (e) {

        }
    }


console.log(newId)
    const news = async ()=>{
setAllNews(await fetchNews())
    }



    const [ROLES,setROLES] = useState('')


    const role = ()=>{
        try {
            const token = localStorage.getItem("token")
            const decoded = jwt_decode(token)
            setROLES(decoded.Role)
        }
        catch (e){

        }

    }
    return (
        <Container>
            <h4 className="text-center mt-3">Контакти:</h4>
            <Card className="border-dark mt-3 ps-3 pe-3 pt-3 pb-3" style={{fontSize:20}}>
                <Row className="row-cols-auto ms-5">

                <p className="ms-5 ps-5 me-5">Ном.телефону: +38(096)4234565  </p>
                <p className="ps-5 ms-5">Електронна пошта: timoxa.schupak@gmail.com </p>

                </Row>
            </Card>
            <h1 className="text-center mt-3">Загальна інформація про дитячий садок:</h1>
<div className="text-center">

    <Card className="border-dark mt-3 ps-3 pe-3 pt-3 pb-3" style={{fontSize:20}}>
      <p>  Заклад дошкільної освіти має всі необхідні умови, які відповідають сучасним санітарно-гігієнічним, педагогічним та естетичним вимогам.

        Будівля має централізоване отоплення, холодне та гаряче водопостачання, каналізацію, відповідно оснащені групові та службові приміщення.

        У будівлі ДНЗ розміщуються ігрові та спальні кімнати, фізкультурний та музичний зали, кімната українознавства, куточок захисників природи, куточок талановитих пальчиків.

      </p>
      </Card>
    <Card className="border-dark mt-3 ps-3 pe-3 pt-3 pb-3" style={{fontSize:20}}>
        <p>  За своїм значенням самим головним приміщенням в дитячому дошкільному виховному і освітньому закладі є групова кімната. Саме в ній дітлахи проводять більшу частину свого часу перебування в дитячому саду.

            Тому в нашому дитячому садку ігровим кімнатам приділяється особа увага. Кімнати повністю відповідають санітарним нормам, та виконують свою функцію на 100%, адже в них зібрані найрізноманітніші іграшки, як розвиваючі, так і антистресові.

            Меблі мають привабливу палітру кольорів. На стінах висять корисні плакати з алфавітом, табличкою множення, тощо. Також жодні меблі не мають гострих кутів, це зроблено для того щоб діти максимально уникали травм.
        </p>
    </Card>
</div>

            <h1 className="text-center mt-3" >Актуальні новини:</h1>
            {AllNews.map((allnews)=>{
                const time = new Date(allnews.date_)
                const date_ = time.toLocaleDateString("ja-JP")
                return <div key={allnews.news_id}>
                    <Card className="mt-3">

                        {ROLES == 1 ?
                    <div className=" text-end">
                        <Button value={allnews.news_id} onClick={e=>setNewId(e.target.value)} variant={"outline-danger"}>Видалити</Button>
                    </div>
                            : <p></p>}


                        <Row className="mt-3 row-cols-auto me-5" >
                            <h4 className="ms-5">Дата:</h4>
                            <Card style={{fontSize:20}} className="mb-3 font-monospace">
                                {date_}
                            </Card>


                        </Row>

                            <div className="text-center">
                                <p style={{fontSize:25}} className="mb-3 font-monospace">
                                    {allnews.topic}
                                </p>
                            </div>
<p className="pb-3 ps-5 pe-5">{allnews.text_}</p>
                    </Card>
                </div>
            })}
        </Container>
    );
};

export default News;