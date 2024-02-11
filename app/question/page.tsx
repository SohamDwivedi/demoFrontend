'use client'; 

import { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar, Button, Container, Grid, Toolbar, Typography } from '@mui/material';
import jwt, { JwtPayload } from 'jsonwebtoken';
const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result,setResult] = useState(-1);
  const apiUrl = 'http://localhost:3000'; // Your API URL

    function isTokenExpired(token: any) {
        if (token) {
            try {
                const decodedToken = jwt.decode(token) as JwtPayload | null;
                if (decodedToken && typeof decodedToken === 'object' && decodedToken.exp) {
                    const currentTime = Math.floor(Date.now() / 1000);
                    console.log(decodedToken.exp, currentTime, '---tok');
                    return decodedToken.exp < currentTime;
                }
                return true;
            } catch (error) {
                console.error('Error decoding token:', error);
                return true;
            }
        }
        return true; 
    }
  useEffect(() => {
    if(localStorage.getItem('user') && !isTokenExpired(localStorage.getItem('user'))){

        const fetchQuestions = async () => {
            try {
              const response = await axios.get(`${apiUrl}/question`);
              setQuestions(response.data);
            } catch (error) {
              alert('Error fetching questions:'+error);
            }
          };
      
          fetchQuestions();    
    }else{
        window.location.href = '/login';
    }
    
  }, []);

  const handleOptionSelect = (questionId:any, option:any) => {
    setAnswers({
      ...answers,
      [questionId]: option,
    });
  };

  const handleSubmit = async () => {
    if(!isTokenExpired(localStorage.getItem('user'))){
        try {
            const getHints = document.getElementsByClassName('hint');
            Object.keys(getHints).forEach((e:any)=>{
              let hint = getHints[e];
              hint.textContent = '';
              const siblingH3 = hint.previousElementSibling as HTMLHeadingElement;
              if (siblingH3 && siblingH3.tagName.toLowerCase() === 'h3') {
                  siblingH3.style.backgroundColor = 'white';
              }
            })
            let res:any = await axios.post(`${apiUrl}/question`, answers);
            res = res.data;
            if(res){
              Object.keys(res.incorrectResult).forEach((e:any)=>{
                  const element = document.getElementById(`grid_res_${e}`);
                  if(element){
                      const siblingH3 = element.previousElementSibling as HTMLHeadingElement;
                      if (siblingH3 && siblingH3.tagName.toLowerCase() === 'h3') {
                          siblingH3.style.backgroundColor = 'red';
                      }
                      element.textContent = 'Correct Answer - ' + res.incorrectResult[e];
                  }
              })
              setResult((res.result/Object.keys(questions).length)*100);
            }
            // Handle successful submission
          } catch (error) {
            console.error('Error submitting answers:', error);
            // Handle submission error
          }
    }else{
        window.location.href = '/login';
    }
   
  };

  return (
    <Container style={{ minHeight: '100vh' }}>
      <>
      <AppBar position="static" color='transparent'>
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Quiz
            </Typography>
            <Button style={{
                backgroundColor: 'grey',
              }} variant="contained" color="primary" onClick={()=>{setResult(-1);window.location.href = '/login';}}>Logout</Button>
        </Toolbar>
        </AppBar>
      </>
      <div style={{ padding: '20px', backgroundColor:'white'}}>
      <Grid container spacing={2} style={{ height: '100%' }}>
        {Object.keys(questions).length>0 ? questions.map((question:any) => (
          <Grid item xs={12} key={question.Question_Id}>
            <div style={{ height: '100%' }}>
              <h3>{question.Question_Text}</h3>
              <p className={'hint'} id={`grid_res_${question.Question_Id}`} style={{ fontWeight: 'bold' }}></p>
              <ul>
                <li>
                  <label>
                    A. <input
                      type="radio"
                      name={`question_${question.Question_Id}`}
                      value="A"
                      onChange={() => handleOptionSelect(question.Question_Id, 'A')}
                    />
                    {" "+question.Option_A}
                  </label>
                </li>
                <li>
                  <label>
                  B. <input
                      type="radio"
                      name={`question_${question.Question_Id}`}
                      value="B"
                      onChange={() => handleOptionSelect(question.Question_Id, 'B')}
                    />
                    {" "+question.Option_B}
                  </label>
                </li>
                <li>
                  <label>
                  C. <input
                      type="radio"
                      name={`question_${question.Question_Id}`}
                      value="C"
                      onChange={() => handleOptionSelect(question.Question_Id, 'C')}
                    />
                    {" "+question.Option_C}
                  </label>
                </li>
                <li>
                  <label>
                  D. <input
                      type="radio"
                      name={`question_${question.Question_Id}`}
                      value="D"
                      onChange={() => handleOptionSelect(question.Question_Id, 'D')}
                    />
                    {" "+question.Option_D}
                  </label>
                </li>
              </ul>
            </div>
          </Grid>
        )):<div>Please Wait ...</div>}
      </Grid>
      </div>
      <Button variant="contained" color="primary" onClick={handleSubmit} style={{
                backgroundColor: 'blue',
                marginTop:'20px'
              }}>
        Submit
      </Button>
      {result!=-1 && <div id='result' style={{paddingTop:'20px'}}>Result : {result}%</div>}
    </Container>
  );
};

export default QuestionsPage;
