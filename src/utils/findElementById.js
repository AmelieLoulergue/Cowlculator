const findElementById = ({ id, array }) => {
  return array?.find((element) => element.id === id)?.response;
};
export default findElementById;
