import { useState } from 'react'
import "../styles/lesson.css"
import "../styles/lesson4.css"
import { BsArrowLeft, BsArrowRight, BsBookmark, BsBookmarkCheckFill, BsThreeDotsVertical } from "react-icons/bs";
import { FiAlertCircle, FiCheck } from 'react-icons/fi';
import err_audio from "../asset/err_tone.mp3";
import win_audio from "../asset/succes_tone.mp3";
import { toast } from 'react-toastify';
import { questionOfLession4 } from "../asset/data"



const Lesson4 = () => {

    const [index, setIndex] = useState(0)

    const [questionOfLession, setQuestionOfLession] = useState(() => {
        if (localStorage.getItem("questionOfLession4")) {
            return JSON.parse(localStorage.getItem("questionOfLession4"));
        } else {
            return questionOfLession4
        }
    });

    const [userAnswear, setUserAnswear] = useState(() => {
        if (localStorage.getItem("questionOfLession4")) {
            let questionOfLession4 = JSON.parse(localStorage.getItem("questionOfLession4"));
            return questionOfLession4[0].userAnswear
        } else {
            return questionOfLession4[0].userAnswear
        }
    });

    const [dragItemIndex, setdragItemIndex] = useState()
    const [dragOverItemIndex, setdragOverItemIndex] = useState();

    //function to get data fron Localstorage
    const getDataFromLocalStorage = () => JSON.parse(localStorage.getItem("questionOfLession4")) || questionOfLession4;
    //function to store data in Localstorage
    const storeDataInLocalStorage = (questionOfLession4) => localStorage.setItem("questionOfLession4", JSON.stringify(questionOfLession4));

    function handleCheck(currobj) {

        if (currobj.noOfAttempt <= 0) {
            toast.error("not of attempt exceed!", {}); return
        }

        let questionOfLession4 = getDataFromLocalStorage()
        if (questionOfLession4[0].isSubmit) {//if quiz have submit and user click again before reset the quiz
            toast.info("Please reset the quiz to start again", {}); return
        }

        questionOfLession4 = questionOfLession4.map((obj) => {
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

        storeDataInLocalStorage(questionOfLession4);
        setQuestionOfLession(questionOfLession4)

        if (currobj.correctAnswear.join() == userAnswear.join()) {
            new Audio(win_audio).play()
        } else {
            new Audio(err_audio).play()
        }
    }

    function handleFlag(currobj) {
        let questionOfLession4 = getDataFromLocalStorage();
        questionOfLession4 = questionOfLession4.map((obj) => {
            if (obj.qId == currobj.qId) {
                return { ...obj, isFlag: obj.isFlag == true ? false : true };//toggle isFlag
            } else {
                return obj
            }
        })
        storeDataInLocalStorage(questionOfLession4);
        setQuestionOfLession(questionOfLession4)
    }

    function handlePrivousClick() {
        let questionOfLession4 = getDataFromLocalStorage();
        if (questionOfLession4[index].isSubmit) {
            setUserAnswear(questionOfLession4[index - 1].userAnswear)
            setIndex(index - 1); return;
        }

        let i = index;
        while (--i >= 0) {
            if (questionOfLession4[i].isFlag) {
                setIndex(i)
                setUserAnswear(questionOfLession4[i].userAnswear)
                return;
            }
        }

        toast.warn("You can only visit preveous when you bookmark the question!")
    }

    function handleNextClick() {
        let questionOfLession4 = getDataFromLocalStorage();
        if (questionOfLession4[index].isSubmit) {
            setUserAnswear(questionOfLession4[index + 1].userAnswear)
            setIndex(index + 1); return;
        }

        let i = index;
        console.log(i)
        while (++i < questionOfLession4.length) {
            if (questionOfLession4[i].isFlag || questionOfLession4[i].isVisited == false) {
                setIndex(i)
                setUserAnswear(questionOfLession4[i].userAnswear)
                break
            }
        }
        questionOfLession4[index].isVisited = true
        storeDataInLocalStorage(questionOfLession4);

    }

    function handleSubmitQuiz() {
        let questionOfLession4 = getDataFromLocalStorage();//questionOfLession4 is local varable here
        questionOfLession4 = questionOfLession4.map((obj) => {
            return {
                ...obj, isFlag: false,
                isVisited: false, qStatus: "notAttempt", isSubmit: true,
            }
        })
        storeDataInLocalStorage(questionOfLession4);
        setQuestionOfLession(questionOfLession4)
        setIndex(0)
        setUserAnswear(questionOfLession4[0].userAnswear)
        toast.info("Check Your Answear!", {})
    }

    function handleResetQuiz() {
        localStorage.removeItem("questionOfLession4");//remove the data from localstorage
        console.log(questionOfLession4);
        setQuestionOfLession(questionOfLession4)//from const variable 
        setIndex(0)
        setUserAnswear(questionOfLession4[0].userAnswear)
    }


    function evaluateuserAnswear(correctAnswear, userAnswear) {
        console.log("correctAnswear,userAnswear", correctAnswear.join(","), userAnswear.join(","))
        if (correctAnswear.join(",") != userAnswear.join(",")) {
            return false;
        } else {
            return true;
        }
    }

    //drag and drop functionalty


    function handleOnDragStart(i) {
        setdragItemIndex(i);
    }
    function handleOnDragOver(e, i) {
        e.preventDefault()
        setdragOverItemIndex(i)
        // console.log("handleOnDragOver", i)
    }

    function handleOnDrop(i) {
        // console.log("handleOnDrop", i)
        let removItems = userAnswear.splice(dragItemIndex, 1);
        userAnswear.splice(i, 0, removItems[0]);
        setUserAnswear([...userAnswear])
        console.log("userAnswear", userAnswear)
    }
    function handleDragEnd() {
        setdragItemIndex(undefined)
        setdragOverItemIndex(undefined)
    }


    return (
        <div className='lesson lesson6'>
            <div className='box-cont'>

                {
                    questionOfLession.length > 0 && questionOfLession.map((obj) => {
                        return <div className="box" key={`4-${obj.qId}`} style={{ transform: `translateX(-${index}00%)` }} >
                            <div className='equation'>
                                <h3>{`Q${obj.qId}.`} <span style={{ marginLeft: "20px" }}>{obj.equation}</span></h3>
                                <div className='flag_cont' onClick={() => handleFlag(obj)}>
                                    {obj.isFlag == 1 ? <BsBookmarkCheckFill /> : <BsBookmark />}
                                    <span>flag for later</span></div>
                            </div>

                            <div className='mid-part'>
                                <div className='mid_left'>
                                    <div className='list'>
                                        {
                                            userAnswear.map((val, i) => (
                                                <div key={i}
                                                    className={`${i == dragOverItemIndex ? "next_list_item" : 'list_item'}`}
                                                    draggable
                                                    onDragStart={() => handleOnDragStart(i)}
                                                    onDragOver={(e) => handleOnDragOver(e, i)}
                                                    onDrop={() => handleOnDrop(i)}
                                                    onDragEnd={handleDragEnd}
                                                >
                                                    <span>{val}</span>
                                                    <BsThreeDotsVertical />
                                                </div>
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
                                    <span> Note:Congrats! The answear provided is {obj.userAnswear.join(",")} for this question is correct</span>
                                </div>
                            }

                            {obj.qStatus == "incorrect" &&
                                <div className='incorrect-ans'>
                                    <FiAlertCircle />
                                    <span>Note:Your answear provided is {obj.userAnswear.toString()} for this question is incorrect</span>
                                </div>
                            }

                            {obj.isSubmit &&
                                <div className={`${obj.correctAnswear.join() == obj.userAnswear.join() ? "correct-ans" : "incorrect-ans"}`}>
                                    {obj.correctAnswear.join() == obj.userAnswear.join() ? <FiCheck /> : <FiAlertCircle />}
                                    <span>{obj.noOfAttempt != 7 ? `Your Ans:${obj.userAnswear.join()}` : "You did not provide any answear!"}</span>
                                </div>
                            }
                            {obj.isSubmit &&
                                <div className='correct-ans'>
                                    <FiCheck />
                                    <span>Correct Ans:{obj.correctAnswear.join()}</span>
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

export default Lesson4