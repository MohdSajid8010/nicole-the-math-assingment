import { useState } from 'react'
import "../styles/lesson.css"
import "../styles/lesson1.css"

import { BsArrowLeft, BsArrowRight, BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";
import { FiAlertCircle, FiCheck } from 'react-icons/fi';
import err_audio from "../asset/err_tone.mp3";
import win_audio from "../asset/succes_tone.mp3";
import { toast } from 'react-toastify';
import { questionOfLession1 } from "../asset/data"
import { handleFlagHelperFunc, handlePreviousHelper, handleSubmitHelper, initilizeIndex } from './commonFunction';


const Lesson1 = () => {

    //function to get data fron Localstorage
    const getDataFromLocalStorage = () => JSON.parse(localStorage.getItem("questionOfLession1")) || questionOfLession1;
    //function to store data in Localstorage
    const storeDataInLocalStorage = (questionOfLession1) => localStorage.setItem("questionOfLession1", JSON.stringify(questionOfLession1));

    const [index, setIndex] = useState(() => {
        let questionOfLession1 = getDataFromLocalStorage();
        return initilizeIndex(questionOfLession1)

    });

    const [questionOfLession, setQuestionOfLession] = useState(() => {
        return getDataFromLocalStorage()
    });

    const [userAnswear, setUserAnswear] = useState(() => {
        let questionOfLession1 = getDataFromLocalStorage();
        return questionOfLession1[index].userAnswear

    });




    function handleCheck(currobj) {
        if (!userAnswear) {
            toast.warn("Pease enter the answear!", {}); return;
        }
        if (currobj.noOfAttempt <= 0) {
            toast.error("not of attempt exceed!", {}); return
        }

        let questionOfLession1 = getDataFromLocalStorage()
        if (questionOfLession1[0].isSubmit) {//if quiz have submit and user click again before reset the quiz
            toast.info("Please reset the quiz to start again", {}); return;
        }

        questionOfLession1 = questionOfLession1.map((obj) => {
            if (obj.qId == currobj.qId) {
                return {
                    ...currobj,
                    qStatus: currobj.correctAnswear == userAnswear ? "correct" : "incorrect",
                    noOfAttempt: currobj.noOfAttempt - 1,
                    userAnswear: userAnswear,
                }
            } else {
                return obj
            }
        })

        storeDataInLocalStorage(questionOfLession1);
        setQuestionOfLession(questionOfLession1)

        if (currobj.correctAnswear == userAnswear) {
            new Audio(win_audio).play()
        } else {
            new Audio(err_audio).play()
        }
    }

    function handleFlag(currobj) {
        let questionOfLession1 = getDataFromLocalStorage();
        questionOfLession1 = handleFlagHelperFunc(questionOfLession1, currobj)
        storeDataInLocalStorage(questionOfLession1);
        setQuestionOfLession(questionOfLession1)
    }

    function handlePrivousClick() {
        let questionOfLession1 = getDataFromLocalStorage();
        handlePreviousHelper(questionOfLession1, index, setIndex, setUserAnswear)
    }

    function handleNextClick() {
        let questionOfLession1 = getDataFromLocalStorage();
        if (questionOfLession1[index].isSubmit) {
            setUserAnswear(questionOfLession1[index + 1].userAnswear)
            setIndex(index + 1); return;
        }

        let i = index;
        while (++i < questionOfLession.length) {
            if (questionOfLession1[i].isFlag || questionOfLession1[i].isVisited == false) {
                setIndex(i)
                console.log(questionOfLession1[i].userAnswear)
                setUserAnswear(questionOfLession1[i].userAnswear)
                break
            }
        }
        questionOfLession1[index].isVisited = true

        storeDataInLocalStorage(questionOfLession1);

    }

    function handleSubmitQuiz() {
        let questionOfLession1 = getDataFromLocalStorage();//questionOfLession1 is local varable here

        questionOfLession1 = handleSubmitHelper(questionOfLession1, setIndex, setUserAnswear, setQuestionOfLession)
        storeDataInLocalStorage(questionOfLession1);
    }

    function handleResetQuiz() {
        localStorage.removeItem("questionOfLession1");//remove the data from localstorage

        console.log(questionOfLession1);
        setQuestionOfLession(questionOfLession1)//from const variable 
        setIndex(0)
        setUserAnswear(questionOfLession1[0].userAnswear)
    }

    return (
        <div className='lesson lesson1'>
            <div className='box-cont'>

                {
                    questionOfLession.length > 0 && questionOfLession.map((obj) => {
                        return <div className="box" key={`1-${obj.qId}`} style={{ transform: `translateX(-${index}00%)` }} >
                            <div className='equation'>
                                <h3>{`Q${obj.qId}.`} <span style={{ marginLeft: "20px" }}>{obj.equation}=?</span></h3>
                                <div className='flag_cont' onClick={() => handleFlag(obj)}>
                                    {obj.isFlag == 1 ? <BsBookmarkCheckFill /> : <BsBookmark />}
                                    <span>flag for later</span></div>
                            </div>

                            <div className='mid-part'>


                                <div className='mid_left'>
                                    <small >Answear</small>
                                    <input type="text" placeholder='Enter Your Answear'
                                        value={userAnswear} onChange={(e) => setUserAnswear(e.target.value)} />
                                    {console.log(userAnswear)}
                                </div>


                                <div className='mid_right'>
                                    <button onClick={() => handleCheck(obj)}>Check</button>
                                    <small className='attempt'>{obj.noOfAttempt} attempt left</small>
                                </div>
                            </div>

                            {obj.qStatus == "correct" &&
                                <div className='correct-ans'>
                                    <FiCheck style={{ fontSize: "30px" }} />
                                    <span> Note:Congrats! The answear provided is [{obj.userAnswear}] for this question is correct</span>
                                </div>
                            }

                            {obj.qStatus == "incorrect" &&
                                <div className='incorrect-ans'>
                                    <FiAlertCircle style={{ fontSize: "30px" }} />
                                    <span>Note:Your answear provided is [{obj.userAnswear}] for this question is incorrect</span>
                                </div>
                            }

                            {obj.isSubmit &&
                                <div className={`${obj.correctAnswear == obj.userAnswear ? "correct-ans" : "incorrect-ans"}`}>
                                    {obj.correctAnswear == obj.userAnswear ? <FiCheck /> : <FiAlertCircle />}
                                    <span>{obj.userAnswear ? `Your Ans:${obj.userAnswear}` : "You did not provide any answear!"}</span>
                                </div>
                            }
                            {obj.isSubmit &&
                                <div className='correct-ans'>
                                    <FiCheck />
                                    <span>Correct Ans:{obj.correctAnswear}</span>
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

export default Lesson1