import { useParams, useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";
import NavBar from "../navbar/NavBar";
import axios from "../../Api/Api";
import Quiz from "react-quiz-component";

//Disabled right click
//Detecting switch tab

const QuizTaker = () => {
  const [quizData, setQuizData] = useState(null);
  const { jobID } = useParams();
  const [switchTab, setSwitchTab] = useState(false);
  const [isQuizFinished, setQuizFinished] = useState(false);
  const navigate = useNavigate();

  //This fetches the quiz
  const fetchQuizData = async () => {
    let response = await axios.get(`/jobs/${jobID}/quiz`, {
      headers: {
        "x-access-token": localStorage.getItem("userToken"),
      },
    });

    if (response.status === 200) {
      setQuizData(JSON.parse(response.data));
    }
  };

  // User has switched back to the tab
  const onFocus = () => {
    //
  };

  // User has switched away from the tab (AKA tab is hidden)
  const onBlur = () => {
    //console.log("Tab is blurred");
    if (isQuizFinished === false) {
      setSwitchTab(true);
    }
  };

  //This attaches the function to the focus blur window events
  useEffect(() => {
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    // Calls onFocus when the window first loads
    onFocus();
    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  //This prevent the right click from being presssed
  useEffect(() => {
    const handleContextmenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextmenu);
    return function cleanup() {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);

  useEffect(() => {
    setSwitchTab(false);
    fetchQuizData();
  }, []);

  //Update freelancer's quiz status at the backend
  const updateQuizStatus = async () => {
    let response = await axios.put(`/jobs/${jobID}/quiz-passed`, {
      freelancerID: JSON.parse(localStorage.getItem("user"))["freelancer_id"],
    });

    if (response.status === 200) {
      console.log("OK test passed");
    }
  };

  //Renders the custom quiz finished page or the resultPage
  const renderCustomResultPage = (obj) => {
    const {
      numberOfCorrectAnswers,
      numberOfQuestions,
      correctPoints,
      totalPoints,
    } = obj;

    setQuizFinished(true); //This is for not giving tab switch error when the quiz finished

    //If the quiz if finished and all the answers are correct
    //update freelancer's Quiz Status
    if (numberOfCorrectAnswers === numberOfQuestions) {
      updateQuizStatus();
    }

    return (
      <div>
        <h2>
          You have completed the quiz. You Got {numberOfCorrectAnswers} out of{" "}
          {numberOfQuestions} questions.
        </h2>
        <h2>
          You scored {correctPoints} out of {totalPoints}
        </h2>
        <button
          onClick={() => {
            navigate("/dashboard/available-jobs");
          }}
          className={
            correctPoints === totalPoints
              ? "mt-5 btn btn-lg btn-success container d-flex align-items-center justify-content-center"
              : "mt-5 btn btn-lg btn-danger container d-flex align-items-center justify-content-center"
          }
        >
          {correctPoints === totalPoints ? "You Passed :)" : "You Failed :("}
        </button>
      </div>
    );
  };

  return (
    <div>
      {switchTab === true && isQuizFinished === false ? (
        <div className="pt-5 mt-5 container d-flex align-items-center justify-content-center">
          <h2>
            Your Test Has Been Void. Since Window focus is lost. Kindly Refresh
            Page and refrain from doing the same mistake
          </h2>
        </div>
      ) : quizData !== null ? (
        <div className="pt-5 mt-5 container d-flex align-items-center justify-content-center">
          <Quiz
            showDefaultResult={false}
            customResultPage={renderCustomResultPage}
            quiz={quizData}
            shuffle={true}
          ></Quiz>
        </div>
      ) : null}
    </div>
  );
};

export default QuizTaker;
