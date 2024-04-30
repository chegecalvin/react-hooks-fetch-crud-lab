import React,{useState,useEffect} from "react";
import QuestionItem from "./QuestionItem";
const url="http://localhost:4000/questions"

function QuestionList() {
  const[questions,setQuestions]=useState([])
  
  useEffect(()=>{
    fetch(url)
    .then(response=>response.json())
    .then((data)=>setQuestions(data))
  },[])

  function handleDelete(id){
    fetch(`url/${id}`,{
      method: "DELETE",
    })
    .then(response=>response.json())
    .then(() => {
      const updatedQuestions = questions.filter((q) => q.id !== id);
      setQuestions(updatedQuestions);
    })
  }

  function handleAnswerChange (id, correctIndex) {
    fetch(`url/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
    .then((response) => response.json())
    .then((updatedQuestion) => {
      const updatedQuestions = questions.map((q) => {
        if(q.id === updatedQuestion.id) return updatedQuestion;
        return q;
      });
      setQuestions(updatedQuestions);
    });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((question)=>(
        <QuestionItem key={question.id} question={question} onDelete={handleDelete} onAnswerChange={handleAnswerChange}/>
      ))}</ul>
    </section>
  );
}

export default QuestionList;
