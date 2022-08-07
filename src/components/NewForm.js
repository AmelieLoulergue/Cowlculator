import React, { useEffect, useState } from "react";
import listOfQuestions from "../utils/listOfQuestions";
// import "./NewForm.css";
import RenderQuestion from "./NewForm/RenderQuestion";
import SubQuestions from "./NewForm/SubQuestions";
import "./Form_design.css";
import back_arrow from "../assets/svg/back-arrow.svg";
import Lottie from "lottie-react";
import form_begin from "../assets/anim/form-begin.json";
import home from "../assets/svg/home.svg";
import send from "../assets/svg/send.svg";
import menu from "../assets/svg/burger.svg";
import Bg from "./Bg";
import counterQuestions from "../utils/counterQuestions";
const NewForm = () => {
  const [numberOfResponse, setNumberOfResponse] = useState(0);
  const [blocIndex, setBlocIndex] = useState(0);
  let counter = 0;
  const [totalCounterBloc, setTotalCounterBloc] = useState(0);

  const [numberOfResponseBloc, setNumberOfResponseBloc] = useState(0);
  const [counterBlocLimits, setCounterBlocLimits] = useState(
    listOfQuestions.formQuestions.map((bloc, bloc_index) =>
      counterQuestions({ bloc, bloc_index })
    )
  );
  const startForm = () => {};
  useEffect(() => {
    const sum = counterBlocLimits
      .filter((element) => Number(element.id.split("bloc_")[1]) <= blocIndex)
      .reduce((accumulator, object) => {
        return accumulator + object.counter;
      }, 0);
    setTotalCounterBloc(sum);
  }, [numberOfResponse, blocIndex]);
  useEffect(() => {
    if (blocIndex !== 0) {
      setNumberOfResponseBloc(0);
    }
  }, [totalCounterBloc]);

  return (
    <div className="">
      <div className="formChat">
        <div className="beginin">
          <div className="LottieContainer">
            <Lottie animationData={form_begin} loop={true} />
          </div>
          <div>
            <h3>Are you ready ?</h3>
            <h1>Start filling the form today</h1>
          </div>
          <div className="btns">
            <img src={back_arrow} alt=""></img>
            <button className="btn" onClick={startForm}>
              Let's get started
            </button>
            <img src={home} alt=""></img>
          </div>
        </div>
        <div className="questions">
          {listOfQuestions.formQuestions.map((bloc, key_bloc) => (
            <div
              key={`${key_bloc}`}
              id={`bloc_${key_bloc}`}
              className={key_bloc <= blocIndex ? "" : "is-hidden"}
            >
              <div className="nav">
                <img src={menu} alt=""></img>
                <h1>{bloc.bloc_id}</h1>
                <img src={home} alt=""></img>
              </div>
              {bloc.questions.map((question, key_question) => {
                counter += 1;
                return (
                  <div key={`range_1_${counter}`}>
                    <div key={`question_${counter}`} id={`question_${counter}`}>
                      <RenderQuestion
                        counterBlocLimits={counterBlocLimits}
                        numberOfResponse={numberOfResponse}
                        setNumberOfResponse={setNumberOfResponse}
                        question={question}
                        range={0}
                        bloc_id={key_bloc}
                        questionIndex={key_question}
                        blocIndex={blocIndex}
                        counter={counter}
                        totalCounterBloc={totalCounterBloc}
                        setBlocIndex={setBlocIndex}
                        numberOfResponseBloc={numberOfResponseBloc}
                        setNumberOfResponseBloc={setNumberOfResponseBloc}
                      />
                    </div>
                    {question.sub_questions &&
                      question.sub_questions.length > 0 &&
                      question.sub_questions.map(
                        (sub_question_1, key_sub_question_1) => {
                          counter += 1;
                          return (
                            <div key={`range_2_${counter}`}>
                              {" "}
                              <div
                                key={`question_${counter}`}
                                id={`question_${counter}`}
                              >
                                <RenderQuestion
                                  counterBlocLimits={counterBlocLimits}
                                  numberOfResponse={numberOfResponse}
                                  setNumberOfResponse={setNumberOfResponse}
                                  sup_question={question}
                                  question={sub_question_1}
                                  range={1}
                                  totalCounterBloc={totalCounterBloc}
                                  bloc_id={key_bloc}
                                  questionIndex={
                                    key_question + key_sub_question_1
                                  }
                                  blocIndex={blocIndex}
                                  counter={counter}
                                  setBlocIndex={setBlocIndex}
                                  numberOfResponseBloc={numberOfResponseBloc}
                                  setNumberOfResponseBloc={
                                    setNumberOfResponseBloc
                                  }
                                />
                              </div>
                              {sub_question_1.sub_questions &&
                                sub_question_1.sub_questions.length > 0 &&
                                sub_question_1.sub_questions.map(
                                  (sub_question_2, key_sub_question_2) => {
                                    counter += 1;
                                    return (
                                      <div key={`range_3_${counter}`}>
                                        {" "}
                                        <div
                                          key={`question_${counter}`}
                                          id={`question_${counter}`}
                                        >
                                          <RenderQuestion
                                            counterBlocLimits={
                                              counterBlocLimits
                                            }
                                            numberOfResponse={numberOfResponse}
                                            setNumberOfResponse={
                                              setNumberOfResponse
                                            }
                                            sup_question={sub_question_1}
                                            question={sub_question_2}
                                            range={2}
                                            bloc_id={key_bloc}
                                            questionIndex={
                                              key_question +
                                              key_sub_question_1 +
                                              key_sub_question_2
                                            }
                                            totalCounterBloc={totalCounterBloc}
                                            blocIndex={blocIndex}
                                            counter={counter}
                                            setBlocIndex={setBlocIndex}
                                            numberOfResponseBloc={
                                              numberOfResponseBloc
                                            }
                                            setNumberOfResponseBloc={
                                              setNumberOfResponseBloc
                                            }
                                          />
                                        </div>
                                        {sub_question_2.sub_questions &&
                                          sub_question_2.sub_questions.length >
                                            0 &&
                                          sub_question_2.sub_questions.map(
                                            (
                                              sub_question_3,
                                              key_sub_question_3
                                            ) => {
                                              counter += 1;
                                              return (
                                                <div key={`range_4_${counter}`}>
                                                  {" "}
                                                  <div
                                                    key={`question_${counter}`}
                                                    id={`question_${counter}`}
                                                  >
                                                    <RenderQuestion
                                                      totalCounterBloc={
                                                        totalCounterBloc
                                                      }
                                                      counterBlocLimits={
                                                        counterBlocLimits
                                                      }
                                                      numberOfResponse={
                                                        numberOfResponse
                                                      }
                                                      setNumberOfResponse={
                                                        setNumberOfResponse
                                                      }
                                                      sup_question={
                                                        sub_question_2
                                                      }
                                                      question={sub_question_3}
                                                      range={3}
                                                      bloc_id={key_bloc}
                                                      questionIndex={
                                                        key_question +
                                                        key_sub_question_1 +
                                                        key_sub_question_2 +
                                                        key_sub_question_3
                                                      }
                                                      blocIndex={blocIndex}
                                                      counter={counter}
                                                      setBlocIndex={
                                                        setBlocIndex
                                                      }
                                                      numberOfResponseBloc={
                                                        numberOfResponseBloc
                                                      }
                                                      setNumberOfResponseBloc={
                                                        setNumberOfResponseBloc
                                                      }
                                                    />
                                                  </div>
                                                </div>
                                              );
                                            }
                                          )}
                                      </div>
                                    );
                                  }
                                )}
                            </div>
                          );
                        }
                      )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <Bg />
    </div>
  );
};

export default NewForm;
