import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => {
    return (
      <option key={index} value={index}>
        {answer}
      </option>
    );
  });

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json)
      .then(() => onDeleteQuestion(question));
  }
  function handleUpdate(e) {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: parseInt(e.target.value, 10),
      }),
    })
      .then((r) => r.json())
      .then((data) => onUpdateQuestion(question.id));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleUpdate} defaultValue={correctIndex}>
          {options}
        </select>
      </label>
      <button onClick={() => handleDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
