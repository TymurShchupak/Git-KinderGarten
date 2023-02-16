import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Row, Card, Container, Button, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {CHILD_PAGE, PARENT_PAGE} from "../utils/consts";
import {fetchAllParent} from "../http/parentApi";



const Parent = observer(() =>{
  const history = useNavigate()
  useEffect(()=>{
    getAll()
  },[])

  const [AllParent,setAllParent] = useState([])



  const getAll = async () =>{
    try{
      setAllParent(await fetchAllParent())
    } catch (e) {
      alert("Something went wrong. Try to check inserted values")
    }}

let count1 = 1;

  return(


      <div><h1 className="text-center mt-2 mb-3">Список батьків та опікунів:</h1>
        {AllParent.map((allparent)=>{
          return <Container key={allparent.parent_id}>

            <Table hover striped bordered style={{width:'80%'}}  className="text-center ms-5 border-dark">
              <tbody>
              <tr>
                <td style={{width:'20%'}}>
                  {count1++}
                </td>
                <td  onClick={() => history(PARENT_PAGE + '/' + allparent.parent_id)}  style={{fontSize:16, cursor:'pointer'}} className="text-center mt-2 ms-5">
                  {allparent.lname_} {''} {allparent.fname_} {''} {allparent.fathername_}
                </td>
              </tr>
              </tbody>
            </Table>

          </Container>
        })}
      </div>
  );
});

export default Parent;
