import { useState } from 'react'
import "../styles/lesson.css"
import "../styles/lesson6.css"
import { BsArrowLeft, BsArrowRight, BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";
import { FiAlertCircle, FiCheck } from 'react-icons/fi';
import err_audio from "../asset/err_tone.mp3";
import win_audio from "../asset/succes_tone.mp3";
import { toast } from 'react-toastify';
import { questionOfLession6 } from '../asset/data';

const Lesson6 = () => {
    const [index, setIndex] = useState(0)
    const [questionOfLession, setQuestionOfLession] = useState(() => {
        if (localStorage.getItem("questionOfLession6")) {
            return JSON.parse(localStorage.getItem("questionOfLession6"));
        } else {
            return questionOfLession6
        }
    });

    const [userAnswear, setUserAnswear] = useState(() => {
        if (localStorage.getItem("questionOfLession6")) {
            let questionOfLession6 = JSON.parse(localStorage.getItem("questionOfLession6"));
            return questionOfLession6[0].userAnswear
        } else {
            return []
        }
    });


    //function to get data fron Localstorage
    const getDataFromLocalStorage = () => JSON.parse(localStorage.getItem("questionOfLession6")) || questionOfLession6;
    //function to store data in Localstorage
    const storeDataInLocalStorage = (questionOfLession6) => localStorage.setItem("questionOfLession6", JSON.stringify(questionOfLession6));

    function handleCheck(currobj) {
        if (userAnswear.length == 0) {
            toast.warn("Pease choose the option!", {}); return;
        }

        if (currobj.noOfAttempt <= 0) {
            toast.error("not of attempt exceed!", {}); return;
        }

        let questionOfLession6 = getDataFromLocalStorage()
        if (questionOfLession6[0].isSubmit) {//if quiz have submit and user click again before reset the quiz
            toast.info("Please reset the quiz to start again", {}); return;
        }

        questionOfLession6 = questionOfLession6.map((obj) => {
            if (obj.qId == currobj.qId) {
                return {
                    ...currobj,
                    qStatus: evaluateuserAnswear(currobj.correctAnswear, userAnswear) ? "correct" : "incorrect",
                    noOfAttempt: currobj.noOfAttempt - 1,
                    userAnswear: [...userAnswear],
                }
            } else {
                return obj
            }
        })

        storeDataInLocalStorage(questionOfLession6);
        setQuestionOfLession(questionOfLession6)

        if (currobj.correctAnswear.sort().join() == userAnswear.sort().join()) {
            new Audio(win_audio).play()
        } else {
            new Audio(err_audio).play()
        }
    }

    function handleFlag(currobj) {
        let questionOfLession6 = getDataFromLocalStorage();
        questionOfLession6 = questionOfLession6.map((obj) => {
            if (obj.qId == currobj.qId) {
                return { ...obj, isFlag: obj.isFlag == true ? false : true };//toggle isFlag
            } else {
                return obj
            }
        })
        storeDataInLocalStorage(questionOfLession6);
        setQuestionOfLession(questionOfLession6)
    }

    function handlePrivousClick() {
        let questionOfLession6 = getDataFromLocalStorage();
        if (questionOfLession6[index].isSubmit) {
            setUserAnswear(questionOfLession6[index - 1].userAnswear)
            setIndex(index - 1); return;
        }

        let i = index;
        while (--i >= 0) {
            if (questionOfLession6[i].isFlag) {
                setIndex(i)
                setUserAnswear([])
                return;
            }
        }

        toast.warn("You can only visit preveous when you bookmark the question!")
    }

    function handleNextClick() {
        let questionOfLession6 = getDataFromLocalStorage();
        if (questionOfLession6[index].isSubmit) {
            setUserAnswear(questionOfLession6[index + 1].userAnswear)
            setIndex(index + 1); return;
        }

        let i = index;
        console.log(i)
        while (++i < questionOfLession6.length) {
            if (questionOfLession6[i].isFlag || questionOfLession6[i].isVisited == false) {
                setIndex(i)
                break
            }
        }
        questionOfLession6[index].isVisited = true
        storeDataInLocalStorage(questionOfLession6);
        setUserAnswear([])
    }

    function handleSubmitQuiz() {
        let questionOfLession6 = getDataFromLocalStorage();//questionOfLession6 is local varable here
        questionOfLession6 = questionOfLession6.map((obj) => {
            return {
                ...obj, isFlag: false,
                isVisited: false, qStatus: "notAttempt", isSubmit: true,
            }
        })
        storeDataInLocalStorage(questionOfLession6);
        setQuestionOfLession(questionOfLession6)
        setIndex(0)
        setUserAnswear(questionOfLession6[0].userAnswear)
        toast.info("Check Your Answear!", {})
    }

    function handleResetQuiz() {
        localStorage.removeItem("questionOfLession6");//remove the data from localstorage

        console.log(questionOfLession6);
        setQuestionOfLession(questionOfLession6)//from const variable 
        setIndex(0)
        setUserAnswear([])
    }

    function handleCheckBoxClick(userCheckBoxVal) {
        if (!userAnswear.includes(userCheckBoxVal)) {
            userAnswear.push(userCheckBoxVal)
        } else {
            let i = userAnswear.indexOf(userCheckBoxVal);
            userAnswear.splice(i, 1)
        }
        setUserAnswear([...userAnswear])
        console.log(userAnswear)
    }

    function evaluateuserAnswear(correctAnswear, userAnswear) {
        if (correctAnswear.length != userAnswear.length) return false;
        // console.log("evaluateuserAnswear", correctAnswear.sort().join(","), userAnswear.sort().join(","))
        if (correctAnswear.sort().join(",") != userAnswear.sort().join(",")) {
            return false
        } else {
            return true
        }
    }


    return (
        <div className='lesson lesson6'>
            <div className='box-cont'>

                {
                    questionOfLession.length > 0 && questionOfLession.map((obj) => {
                        return <div className="box" key={`6-${obj.qId}`} style={{ transform: `translateX(-${index}00%)` }} >
                            <div className='equation'>
                                <h3>{`Q${obj.qId}.`} <span style={{ marginLeft: "20px" }}>{obj.equation}</span></h3>
                                <div className='flag_cont' onClick={() => handleFlag(obj)}>
                                    {obj.isFlag == 1 ? <BsBookmarkCheckFill /> : <BsBookmark />}
                                    <span>flag for later</span></div>
                            </div>

                            <div className='mid-part'>




                                <div className='mid_left'>


                                    {
                                        obj.options.map((val, i) => (

                                            <label key={val}>
                                                <input type="checkbox" value={obj.options[i]} checked={userAnswear.includes(obj.options[i])} onChange={(e) => handleCheckBoxClick(e.target.value)} />
                                                {obj.options[i]}
                                            </label>
                                        ))
                                    }




                                </div>






                                <div className='mid_right'>
                                    <button onClick={() => handleCheck(obj)}>Check</button>
                                    <small className='attempt'>{obj.noOfAttempt} attempt left</small>
                                </div>
                            </div>

                            {obj.qStatus == "correct" &&
                                <div className='correct-ans'>
                                    <FiCheck />
                                    <span> Note:Congrats! The answear provided is {obj.userAnswear.sort().join(",")} for this question is correct</span>
                                </div>
                            }

                            {obj.qStatus == "incorrect" &&
                                <div className='incorrect-ans'>
                                    <FiAlertCircle />
                                    <span>Note:Your answear provided is {obj.userAnswear.sort().toString()} for this question is incorrect</span>
                                </div>
                            }

                            {obj.isSubmit &&
                                <div className={`${obj.correctAnswear.sort().join() == obj.userAnswear.sort().join() ? "correct-ans" : "incorrect-ans"}`}>
                                    {obj.correctAnswear.sort().join() == obj.userAnswear.sort().join() ? <FiCheck /> : <FiAlertCircle />}
                                    <span>{obj.userAnswear.length != 0 ? `Your Ans:${obj.userAnswear.sort().join()}` : "You did not provide any answear!"}</span>
                                </div>
                            }
                            {obj.isSubmit &&
                                <div className='correct-ans'>
                                    <FiCheck />
                                    <span>Correct Ans:{obj.correctAnswear.sort().join()}</span>
                                </div>
                            }

                        </div>
                    })
                }

            </div>

            <div className='btn-cont'>
                <button disabled={index == 0} style={{ background: `${index == 0 ? "#b0cae3" : "dodgerblue"}` }} onClick={handlePrivousClick}><BsArrowLeft /></button>
                {questionOfLession[0].isSubmit ? <button onClick={handleResetQuiz} style={{ background: "grey" }}>Reset Quiz</button> :
                    <button onClick={handleSubmitQuiz}>Submit Quiz</button>}

                <button disabled={index >= (questionOfLession.length - 1)}
                    style={{ background: `${(index >= (questionOfLession.length - 1)) ? "#b0cae3" : "dodgerblue"}` }} onClick={handleNextClick}><BsArrowRight /></button>
            </div>
        </div>
    )
}

export default Lesson6