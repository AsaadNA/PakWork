import QuizForm from "./QuizForm";
import { useParams, useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";
import NavBar from "../navbar/NavBar";
import axios from "../../Api/Api";

const QuizGen = () => {
  const [result, setResult] = useState(null);
  const { jobID } = useParams();
  const navigate = useNavigate();

  const generateQuiz = async (quizData) => {
    let response = await axios.put(
      `jobs/${jobID}/quiz`,
      {
        quizData,
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("userToken"),
        },
      }
    );

    if (response.status === 200) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (result !== null) {
      generateQuiz(result);
    }
  }, [result]);

  return (
    <div>
      <NavBar></NavBar>
      <QuizForm
        onSubmit={(values) => {
          setResult(JSON.stringify(values, null, 2));
        }}
      />
    </div>
  );
};

export default QuizGen;
