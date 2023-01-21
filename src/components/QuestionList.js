import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestionData(data));
  }, []);

  const questionList = questionData.map((questionObj) => {
    return (
      <QuestionItem
        onUpdateQuestion={handleUpdate}
        key={questionObj.id}
        question={questionObj}
        onDeleteQuestion={handleDeleteQuestion}
      />
    );
  });
  function handleUpdate(updatedAnswer) {
    const updatedQuestions = questionData.map((question) => {
      if (question.correctIndex === updatedAnswer.correctIndex) {
        return question;
      } else {
        return updatedAnswer;
      }
    });
    setQuestionData(updatedQuestions);
  }

  function handleDeleteQuestion(question) {
    const afterDeleteData = questionData.filter(
      (obj) => obj.id !== question.id
    );
    setQuestionData(afterDeleteData);
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionList}</ul>
    </section>
  );
}

export default QuestionList;
