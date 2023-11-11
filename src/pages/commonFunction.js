import { toast } from "react-toastify";

export function initilizeIndex(questionOfLession1) {
  if (questionOfLession1[0].isSubmit) return 0;
  let i = 0;
  while (i < questionOfLession1.length) {
    if (questionOfLession1[i].isFlag || questionOfLession1[i].isVisited == false) {
      return i;
    }
    i++
  }
  return 0;
}


export function handleFlagHelperFunc(questionOfLession, currobj) {
  questionOfLession = questionOfLession.map((obj) => {
    if (obj.qId == currobj.qId) {
      return { ...obj, isFlag: obj.isFlag == true ? false : true };//toggle isFlag
    } else {
      return obj
    }
  })
  return questionOfLession
}


export function handlePreviousHelper(questionOfLession, index, setIndex, setUserAnswear) {
  if (questionOfLession[index].isSubmit) {
    setUserAnswear(questionOfLession[index - 1].userAnswear)
    setIndex(index - 1);
    return;
  }

  let i = index;
  while (--i >= 0) {
    if (questionOfLession[i].isFlag) {
      setIndex(i)
      setUserAnswear(questionOfLession[i].userAnswear)
      return;
    }
  }

  toast.warn("You can only visit preveous when you bookmark the question!")
}

export function handleSubmitHelper(questionOfLession, setIndex, setUserAnswear, setQuestionOfLession) {

  questionOfLession = questionOfLession.map((obj) => {
    return {
      ...obj, isFlag: false,
      isVisited: false, qStatus: "notAttempt", isSubmit: true,
    }
  })
  setQuestionOfLession(questionOfLession)
  setIndex(0)
  setUserAnswear(questionOfLession[0].userAnswear);
  toast.info("Check Your Answear!", {});
  return questionOfLession

}


