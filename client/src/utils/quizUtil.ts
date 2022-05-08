import { Option } from "./types"
 
export function increaseQuestionNumber(n: number): number|string {
  if(n < 4)
    return n += 1;
  return "end"
}

export function buttonColor(showAnswer: boolean, option: Option) {
  if(showAnswer) {
    if(option.isRight)
      return {backgroundColor: "lightgreen"}
    else
      return {backgroundColor: "crimson"}
  }
  return {backgroundColor: "white"}
}

export function refreshPage(){ 
  window.location.reload(); 
}