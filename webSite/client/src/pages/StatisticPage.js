import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Row, Table} from "react-bootstrap";
import {childStat, empFStat, empStat, getChildAudit, getReceiptYears} from "../http/AdminApi";
import {AUDIT} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {total_count} from "../http/childApi";

const StatisticPage = () => {

    const history = useNavigate()
    let count1 = 1;
    const [AllChild,setAllChild] = useState([])
const [receipt,setReceipt] = useState([])
const [year,setYear] = useState('2000')
    const [hire,setHire] = useState([])
    const [fire,setFire] = useState([])
    const [child,setChild] = useState([])
    const [total,setTotal] = useState([])

    useEffect(()=>{
getYears()
    },[])
useEffect(()=>{
    getNames()
    console.log(total)
},[year])

    const getYears= async () =>{
        setReceipt(await getReceiptYears())
    }

    const getNames = async ()=>{
        setAllChild(await getChildAudit(year))
        setHire(await empStat(year))
        setFire(await empFStat(year))
        setChild(await childStat(year))
        setTotal(await total_count())
    }
    return (
        <Container>
            <h3 className="text-center">Загальна статистика:</h3>
            <Row>
                <Col md={3}>
                    <select style={{fontSize:20}}  className="form-select mt-3" aria-label="Default select example" value={year} onChange={e=>setYear(e.target.value)} >
                        <option value={0}>Оберіть рік:</option>
                        {receipt.map((y) =>
                            <option  value={y.receipt_year} key={y.receipt_year}>{y.receipt_year}</option>
                        )}
                    </select>
                </Col>
            <Col md={5}>
                <Card className="border-dark mt-3 pb-4">
                <h4 className="text-center">Діти що випустились:</h4>
                {AllChild.map((childs)=> {
                    return <div key={childs.child_id}>

                        <Table hover striped bordered style={{width: '80%'}} className="text-center ms-5 border-dark">
                            <tbody>
                            <tr>
                                <td style={{width: '10%'}}>
                                    {count1++}
                                </td>
                                <td onClick={() => history(AUDIT + '/' + childs.child_id)}
                                    style={{fontSize: 16, cursor: 'pointer'}} className="text-center mt-2 ms-5">
                                    {childs.child_lname} {childs.child_fname} {childs.child_fathername}
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                })}
                </Card>
            </Col>
                <Col md={4}>
                    <Card className="border-dark mt-3 pb-4 ps-3">
                        <h4 className="text-center">Загальна інформація за рік:</h4>
                        {child.map((ch)=><p>Дітей вступило: {ch.child_count}</p>)}
                        {hire.map((hi)=><p>Працівників найнято:{hi.employee_count}</p>)}
                        {fire.map((fi)=><p>Працівників звільнено:{fi.employee_firecount}</p>)}
                    </Card>
                    <Card className="border-dark mt-3 pb-2 ps-3">
                        <h4 className="text-center">Навчається на даний момент:</h4>
                        {total.map((to)=><p className="text-center" style={{fontSize:30}}>{to.count}</p>)}
                    </Card>
                </Col>
            </Row>

        </Container>

    );
};

export default StatisticPage;