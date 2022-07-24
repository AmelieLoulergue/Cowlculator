import React from "react";
import listOfQuestions from "../utils/listOfQuestions";
import "./NewForm.css";
import RenderQuestion from "./NewForm/RenderQuestion";
import SubQuestions from "./NewForm/SubQuestions";
const NewForm = () => {
  console.log(listOfQuestions.formQuestions);
  return (
    <div className="form_container">
      {listOfQuestions.formQuestions.map((bloc) => (
        <>
          <div className="form_bloc">{bloc.bloc_id}</div>
          {bloc.questions.map((question) => (
            <>
              <RenderQuestion question={question} />
              {question.sub_questions &&
                question.sub_questions.length > 0 &&
                question.sub_questions.map((sub_question) => (
                  <SubQuestions
                    question={question}
                    sub_question={sub_question}
                  />
                ))}
            </>
          ))}
        </>
      ))}
    </div>
  );
};

export default NewForm;

// <>
//   <div className="form_bloc">
//     {capitalize(bloc.bloc_id.replace("_", " "))}
//   </div>
//   {bloc.questions.map((question) => (
//     <div className="form_question">
//       <div className="form_id">{question.id}</div>
//       <div>{question.question}</div>
//       {/* conditionnement de l'input selon question.formInput.type // JE VAIS CREER UN COMPOSANT EN DEHORS POUR TRAITER LE TYPE D'INPUT POUR NE PAS SURCHARGER LE CODE*/}
//       {question.formInput.type === "date" && <>Input Date</>}
//       {question.formInput.type === "number" && <>Input Number</>}
//       {question.formInput.type === "checkbox" && <>Input Checkbox</>}
//       {question.formInput.type === "select" &&
//         question.formInput.options !== "multiple" && <>Input Select</>}
//       {question.formInput.type === "select" &&
//         question.formInput.options === "multiple" && (
//           <>Input Select Multiple</>
//         )}
//     </div>
//   ))}
// </>
