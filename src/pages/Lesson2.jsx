import { useState } from 'react'
import "../styles/lesson.css"
import "../styles/lesson2.css"
import { BsArrowLeft, BsArrowRight, BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";
import { FiAlertCircle, FiCheck } from 'react-icons/fi';
import err_audio from "../asset/err_tone.mp3";
import win_audio from "../asset/succes_tone.mp3";
import { toast } from 'react-toastify';
import { questionOfLession2 } from '../asset/data';

// The sun rises in the morning sky.
// Birds can fly in the clear sky.
// I see a bird in the blue sky.
// The capital of France is Paris.
// The cat is under the table.


const Lesson2 = () => {

    const [index, setIndex] = useState(0)
    const [questionOfLession, setQuestionOfLession] = useState(() => {
        if (localStorage.getItem("questionOfLession2")) {
            return JSON.parse(localStorage.getItem("questionOfLession2"));
        } else {
            return questionOfLession2
        }
    });

    const [userAnswear, setUserAnswear] = useState(() => {
        if (localStorage.getItem("questionOfLession2")) {
            let questionOfLession2 = JSON.parse(localStorage.getItem("questionOfLession2"));
            return questionOfLession2[0].userAnswear
        } else {
            return questionOfLession2[0].userAnswear//from global arr
        }
    });


    //function to get data fron Localstorage
    const getDataFromLocalStorage = () => JSON.parse(localStorage.getItem("questionOfLession2")) || questionOfLession2;
    //function to store data in Localstorage
    const storeDataInLocalStorage = (questionOfLession2) => localStorage.setItem("questionOfLession2", JSON.stringify(questionOfLession2));

    function handleCheck(currobj) {

        console.log("rin1", userAnswear)

        for (let i = 0; i < Object.values(userAnswear).length; i++) {
            let val = Object.values(userAnswear)[i];
            if (!val) {
                toast.warn(`Pease fill the ${i > 0 ? "all" : ""} input`, {}); return;
            }
        }


        if (currobj.noOfAttempt <= 0) {
            toast.error("not of attempt exceed!", {}); return;
        }

        let questionOfLession2 = getDataFromLocalStorage()
        if (questionOfLession2[0].isSubmit) {//if quiz have submit and user click again before reset the quiz
            toast.info("Please reset the quiz to start again", {}); return;
        }

        questionOfLession2 = questionOfLession2.map((obj) => {
            if (obj.qId == currobj.qId) {
                return {
                    ...currobj,
                    qStatus: evaluateuserAnswear(currobj.correctAnswear, userAnswear) ? "correct" : "incorrect",
                    noOfAttempt: currobj.noOfAttempt - 1,
                    userAnswear: { ...userAnswear },
                }
            } else {
                return obj
            }
        })

        storeDataInLocalStorage(questionOfLession2);
        setQuestionOfLession(questionOfLession2)

        console.log(currobj.correctAnswear.join(), Object.values(userAnswear).join())
        if (currobj.correctAnswear.join() == Object.values(userAnswear).join()) {
            new Audio(win_audio).play()
        } else {
            new Audio(err_audio).play()
        }
    }

    function handleFlag(currobj) {
        let questionOfLession2 = getDataFromLocalStorage();
        questionOfLession2 = questionOfLession2.map((obj) => {
            if (obj.qId == currobj.qId) {
                return { ...obj, isFlag: obj.isFlag == true ? false : true };//toggle isFlag
            } else {
                return obj
            }
        })
        storeDataInLocalStorage(questionOfLession2);
        setQuestionOfLession(questionOfLession2)
    }

    function handlePrivousClick() {
        let questionOfLession2 = getDataFromLocalStorage();
        if (questionOfLession2[index].isSubmit) {
            setUserAnswear(questionOfLession2[index - 1].userAnswear)
            setIndex(index - 1); return;
        }

        let i = index;
        while (--i >= 0) {
            if (questionOfLession2[i].isFlag) {
                setIndex(i)
                setUserAnswear(questionOfLession2[i].userAnswear)
                return;
            }
        }

        toast.warn("You can only visit preveous when you bookmark the question!")
    }

    function handleNextClick() {
        let questionOfLession2 = getDataFromLocalStorage();
        if (questionOfLession2[index].isSubmit) {
            setUserAnswear(questionOfLession2[index + 1].userAnswear)
            setIndex(index + 1); return;
        }

        let i = index;
        console.log(i)
        while (++i < questionOfLession2.length) {
            if (questionOfLession2[i].isFlag || questionOfLession2[i].isVisited == false) {
                setIndex(i)
                setUserAnswear(questionOfLession2[i].userAnswear)
                break
            }
        }
        questionOfLession2[index].isVisited = true
        storeDataInLocalStorage(questionOfLession2);
    }

    function handleSubmitQuiz() {
        let questionOfLession2 = getDataFromLocalStorage();//questionOfLession2 is local varable here
        questionOfLession2 = questionOfLession2.map((obj) => {
            return {
                ...obj, isFlag: false,
                isVisited: false, qStatus: "notAttempt", isSubmit: true,
            }
        })
        storeDataInLocalStorage(questionOfLession2);
        setQuestionOfLession(questionOfLession2)
        setIndex(0)
        setUserAnswear({ ...questionOfLession2[0].userAnswear })
        toast.info("Check Your Answear!", {})
    }

    function handleResetQuiz() {
        localStorage.removeItem("questionOfLession2");//remove the data from localstorage

        console.log(questionOfLession2);
        setQuestionOfLession(questionOfLession2)//from const variable 
        setIndex(0)
        setUserAnswear({ ...questionOfLession2[0].userAnswear })
    }

    function handleCheckUserOnChange(key, val) {
        // console.log(key, val)
        userAnswear[key] = val;
        setUserAnswear({ ...userAnswear })
        console.log("userAnswear12", userAnswear)

    }

    function evaluateuserAnswear(correctAnswear, userAnswear) {
        userAnswear = Object.values(userAnswear)
        if (correctAnswear.join(",") != userAnswear.join(",").toLowerCase()) {
            return false
        } else {
            return true
        }
    }



    return (
        <div className='lesson lesson2'>
            <div className='box-cont'>

                {
                    questionOfLession.length > 0 && questionOfLession.map((obj) => {
                        return <div className="box" key={`2-${obj.qId}`} style={{ transform: `translateX(-${index}00%)` }} >
                            <div className='equation'>
                                <h3>{`Q${obj.qId}.`} <span style={{ marginLeft: "20px" }}>Fill in The Blank.</span></h3>
                                <div className='flag_cont' onClick={() => handleFlag(obj)}>
                                    {obj.isFlag == 1 ? <BsBookmarkCheckFill /> : <BsBookmark />}
                                    <span>flag for later</span></div>
                            </div>

                            <div className='mid-part'>




                                <div className='mid_left'>


                                    <div className='options'>
                                        <span>Options:</span>  {"["}
                                        {
                                            obj.options.map((opt, i) => (
                                                <>
                                                    {i != 0 ? "/" : ""}
                                                    <span key={i}>{opt}</span>
                                                </>
                                            ))
                                        }
                                        {"]"}
                                    </div>
                                    {console.log(Object.values(userAnswear))}
                                    <div className='fillBlnkquestion'>
                                        {

                                            obj.equation.split("").map((ch, i) => (
                                                (ch == "_" || ch == "-" || ch == "*") ?
                                                    (<input key={i} type="text" value={Object.values(userAnswear)[ch == "_" ? 0 : (ch == "-") ? 1 : 2]} onChange={(e) => {
                                                        handleCheckUserOnChange(Object.keys(userAnswear)[ch == "_" ? 0 : (ch == "-") ? 1 : 2], e.target.value)
                                                    }} />)
                                                    : (ch)
                                            ))
                                        }
                                    </div>


                                </div>






                                <div className='mid_right'>
                                    <button onClick={() => handleCheck(obj)}>Check</button>
                                    <small className='attempt'>{obj.noOfAttempt} attempt left</small>
                                </div>
                            </div>

                            {obj.qStatus == "correct" &&
                                <div className='correct-ans'>
                                    <FiCheck />
                                    <span> Note:Congrats! The answear provided is {Object.values(obj.userAnswear).join(",")} for this question is correct</span>
                                </div>
                            }

                            {obj.qStatus == "incorrect" &&
                                <div className='incorrect-ans'>
                                    <FiAlertCircle />
                                    <span>Note:Your answear provided is {Object.values(obj.userAnswear).join(",")} for this question is incorrect</span>
                                </div>
                            }

                            {obj.isSubmit &&
                                <div className={`${obj.correctAnswear.join(",") == Object.values(obj.userAnswear).join(",") ? "correct-ans" : "incorrect-ans"}`}>
                                    {obj.correctAnswear.join() == Object.values(obj.userAnswear).join() ? <FiCheck /> : <FiAlertCircle />}
                                    <span>{Object.values(obj.userAnswear).join("") != "" ? `Your Ans: ${Object.values(obj.userAnswear).join(" , ")}` : "You did not provide any answear!"}</span>
                                </div>
                            }

                            {obj.isSubmit &&
                                <div className='correct-ans'>
                                    <FiCheck />
                                    <span>Correct Ans: {obj.correctAnswear.join(" , ")}</span>
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

export default Lesson2