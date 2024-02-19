import { useEffect,useState } from "react";
import Auth from "./Auth";
// import jwt, { JwtPayload } from 'jsonwebtoken';

export default function Dashboard(){
    const {endPoint} = Auth();
    const [answers, setAnswers] = useState({});
    const [questions, setQuestions] = useState();
    const [result,setResult] = useState(-1);

    const handleOptionSelect = (questionId, option) => {
        setAnswers({
          ...answers,
          [questionId]: option,
        });
      };

    const handleSubmit = async () => {
        try {
        const getHints = document.getElementsByClassName('hint');
        Object.keys(getHints).forEach((e) => {
            let hint = getHints[e];
            hint.textContent = '';
            const siblingH3 = hint.previousElementSibling;
            if (siblingH3 && siblingH3.tagName.toLowerCase() === 'h3') {
            siblingH3.style.backgroundColor = 'white';
            }
        })
        console.log(answers);
        let incorrectResult = {}
        let c =0;
        Object.keys(questions).forEach((e)=>{
            if(answers[questions[e].question_id] == questions[e].correct_option){
                c++;
            }else{
                incorrectResult[questions[e].question_id] = questions[e].correct_option;
            }
        })
        console.log(incorrectResult);
        // let res = await axios.post(`question`, answers);
        // res = res.data;
        // if (res) {
            Object.keys(incorrectResult).forEach((e) => {
            const element = document.getElementById(`grid_res_${e}`);
            if (element) {
                const siblingH3 = element.previousElementSibling;
                if (siblingH3 && siblingH3.tagName.toLowerCase() === 'h3') {
                siblingH3.style.backgroundColor = 'red';
                }
                element.textContent = 'Correct Answer - ' + incorrectResult[e];
            }
            })
            setResult((c/ Object.keys(questions).length) * 100);
        // }
        } catch (error) {
        console.error('Error submitting answers:', error);
        }
    };

    useEffect(()=>{
        const fetchQuiz = async () => {
            try {
                const response = await endPoint.get('quiz');
                console.log(response.data,typeof response.data);
                if(response){
                    setQuestions(response.data)
                    console.log(questions);
                }
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };
    
        fetchQuiz();
    },[])
    
    return <div>
        {questions && Object.keys(questions).length > 0 ? questions.map((question) => {
            return <div key={question.question_id}>
                <div>
                <h3>{question.question_text}</h3>
                <p className={'hint'} id={`grid_res_${question.question_id}`} style={{ fontWeight: 'bold' }}></p>
                <ul>
                    <li style={{ listStyleType: 'none' }}>
                        <label>
                            a. <input
                            type="radio"
                            name={`question_${question.question_id}`}
                            value="a"
                            onChange={() => handleOptionSelect(question.question_id, 'a')}
                        />
                        {" " + question.option_a}
                        </label>
                    </li>
                    <li style={{ listStyleType: 'none' }}>
                        <label>
                        b. <input
                            type="radio"
                            name={`question_${question.question_id}`}
                            value="b"
                            onChange={() => handleOptionSelect(question.question_id, 'b')}
                        />
                        {" " + question.option_b}
                        </label>
                    </li>
                    <li style={{ listStyleType: 'none' }}>
                        <label>
                        c. <input
                            type="radio"
                            name={`question_${question.question_id}`}
                            value="c"
                            onChange={() => handleOptionSelect(question.question_id, 'c')}
                        />
                        {" " + question.option_c}
                        </label>
                    </li>
                    <li style={{ listStyleType: 'none' }}>
                        <label>
                        d. <input
                            type="radio"
                            name={`question_${question.question_id}`}
                            value="d"
                            onChange={() => handleOptionSelect(question.question_id, 'd')}
                        />
                        {" " + question.option_d}
                        </label>
                    </li>
                </ul>
                </div>
            </div>    
        }):''}
        <button
        style={{
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            marginTop: '20px',
            cursor: 'pointer',
        }}
        onClick={handleSubmit}
        >
        Submit
        </button>
        {result !== -1 && <h3><div id='result' style={{ paddingTop: '20px' }}>Result : {result}%</div></h3>}
    </div>
}