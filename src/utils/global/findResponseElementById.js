const findResponseElementById = (array, id) => {
  return array?.find((element) => element.id === id)?.response;
};
export default findResponseElementById;
