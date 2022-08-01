const counterQuestions = ({ bloc, bloc_index }) => {
  let counter_level_1 = 0;
  let counter_level_2 = 0;
  let counter_level_3 = 0;
  let counter_level_4 = 0;
  let counter_level_5 = 0;

  counter_level_1 += bloc.questions.length;
  let nivel_1 = bloc.questions.filter((element) => element.sub_questions);
  if (nivel_1.length > 0) {
    let nivel_2 = nivel_1.map((element) => element.sub_questions);
    counter_level_2 += nivel_2[0].length;
    let nivel_3 = nivel_2[0]
      .map((element) => element.sub_questions)
      .flat()
      .filter((element) => element !== undefined);
    if (nivel_3.length > 0) {
      counter_level_3 += nivel_3.length;
      let nivel_4 = nivel_3
        .map((element) => element.sub_questions)
        .filter((element) => element !== undefined)
        .flat();
      if (nivel_4.length > 0) {
        counter_level_4 += nivel_4.length;
        let nivel_5 = nivel_4
          .map((element) => element.sub_questions)
          .filter((element) => element != undefined)
          .flat();
        if (nivel_5.length > 0) {
          counter_level_5 += nivel_5.length;
          return {
            id: `bloc_${bloc_index}`,
            counter:
              counter_level_1 +
              counter_level_2 +
              counter_level_3 +
              counter_level_4 +
              counter_level_5,
            counters: [
              { range: 1, counter: counter_level_1 },
              { range: 2, counter: counter_level_2 },
              { range: 3, counter: counter_level_3 },
              { range: 4, counter: counter_level_4 },
              { range: 5, counter: counter_level_5 },
            ],
          };
        } else {
          return {
            id: `bloc_${bloc_index}`,
            counter:
              counter_level_1 +
              counter_level_2 +
              counter_level_3 +
              counter_level_4,
            counters: [
              { range: 1, counter: counter_level_1 },
              { range: 2, counter: counter_level_2 },
              { range: 3, counter: counter_level_3 },
              { range: 4, counter: counter_level_4 },
            ],
          };
        }
      } else {
        return {
          id: `bloc_${bloc_index}`,
          counter: counter_level_1 + counter_level_2 + counter_level_3,
          counters: [
            { range: 1, counter: counter_level_1 },
            { range: 2, counter: counter_level_2 },
            { range: 3, counter: counter_level_3 },
          ],
        };
      }
    } else {
      return {
        id: `bloc_${bloc_index}`,
        counter: counter_level_1 + counter_level_2,
        counters: [
          { range: 1, counter: counter_level_1 },
          { range: 2, counter: counter_level_2 },
        ],
      };
    }
  } else {
    return {
      id: `bloc_${bloc_index}`,
      counter: counter_level_1,
      counters: [{ range: 1, counter: counter_level_1 }],
    };
  }
};
export default counterQuestions;
