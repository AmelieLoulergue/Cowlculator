import round from "./round";
//function time
function funcTime({ startDate, endDate }) {
  let start = new Date(startDate);
  let end = new Date(endDate);
  let time = round(
    (end.getTime() - start.getTime()) / (1000 * 3600 * 24 * 7 * 52.25),
    1
  );

  return time;
}
export default funcTime;
