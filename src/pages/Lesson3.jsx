import { useState } from 'react'
import "../styles/lesson.css"
import "../styles/lesson3.css"
import { BsArrowLeft, BsArrowRight, BsBookmark, BsBookmarkCheckFill, BsThreeDotsVertical } from "react-icons/bs";
import { FiAlertCircle, FiCheck } from 'react-icons/fi';
import err_audio from "../asset/err_tone.mp3";
import win_audio from "../asset/succes_tone.mp3";
import { toast } from 'react-toastify';
import { questionOfLession3 } from "../asset/data";



const Lesson3 = () => {

    const [index, setIndex] = useState(0);

    const [questionOfLession, setQuestionOfLession] = useState(() => {
        if (localStorage.getItem("questionOfLession3")) {
            return JSON.parse(localStorage.getItem("questionOfLession3"));
        } else {
            return questionOfLession3
        }
    });

    const [userAnswear, setUserAnswear] = useState(() => {
        if (localStorage.getItem("questionOfLession3")) {
            let questionOfLession3 = JSON.parse(localStorage.getItem("questionOfLession3"));
            return questionOfLession3[0].userAnswear
        } else {
            return questionOfLession3[0].userAnswear
        }
    });

    const [dragItemIndex, setdragItemIndex] = useState()
    const [dragOverItemIndex, setdragOverItemIndex] = useState();

    //function to get data fron Localstorage
    const getDataFromLocalStorage = () => JSON.parse(localStorage.getItem("questionOfLession3")) || questionOfLession3;
    //function to store data in Localstorage
    const storeDataInLocalStorage = (questionOfLession3) => localStorage.setItem("questionOfLession3", JSON.stringify(questionOfLession3));

    function handleCheck(currobj) {

        if (currobj.noOfAttempt <= 0) {
            toast.error("not of attempt exceed!", {}); return
        }

        let questionOfLession3 = getDataFromLocalStorage()
        if (questionOfLession3[0].isSubmit) {//if quiz have submit and user click again before reset the quiz
            toast.info("Please reset the quiz to start again", {}); return
        }

        questionOfLession3 = questionOfLession3.map((obj) => {
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

        storeDataInLocalStorage(questionOfLession3);
        setQuestionOfLession(questionOfLession3)

        if (currobj.correctAnswear.join() == userAnswear.join()) {
            new Audio(win_audio).play()
        } else {
            new Audio(err_audio).play()
        }
    }

    function handleFlag(currobj) {
        let questionOfLession3 = getDataFromLocalStorage();
        questionOfLession3 = questionOfLession3.map((obj) => {
            if (obj.qId == currobj.qId) {
                return { ...obj, isFlag: obj.isFlag == true ? false : true };//toggle isFlag
            } else {
                return obj
            }
        })
        storeDataInLocalStorage(questionOfLession3);
        setQuestionOfLession(questionOfLession3)
    }

    function handlePrivousClick() {
        let questionOfLession3 = getDataFromLocalStorage();
        if (questionOfLession3[index].isSubmit) {
            setUserAnswear(questionOfLession3[index - 1].userAnswear)
            setIndex(index - 1); return;
        }

        let i = index;
        while (--i >= 0) {
            if (questionOfLession3[i].isFlag) {
                setIndex(i)
                setUserAnswear(questionOfLession3[i].userAnswear)
                return;
            }
        }

        toast.warn("You can only visit preveous when you bookmark the question!")
    }

    function handleNextClick() {
        let questionOfLession3 = getDataFromLocalStorage();
        if (questionOfLession3[index].isSubmit) {
            setUserAnswear(questionOfLession3[index + 1].userAnswear)
            setIndex(index + 1); return;
        }

        let i = index;
        console.log(i)
        while (++i < questionOfLession3.length) {
            if (questionOfLession3[i].isFlag || questionOfLession3[i].isVisited == false) {
                setIndex(i)
                setUserAnswear(questionOfLession3[i].userAnswear)
                break
            }
        }
        questionOfLession3[index].isVisited = true
        storeDataInLocalStorage(questionOfLession3);

    }

    function handleSubmitQuiz() {
        let questionOfLession3 = getDataFromLocalStorage();//questionOfLession3 is local varable here
        questionOfLession3 = questionOfLession3.map((obj) => {
            return {
                ...obj, isFlag: false,
                isVisited: false, qStatus: "notAttempt", isSubmit: true,
            }
        })
        storeDataInLocalStorage(questionOfLession3);
        setQuestionOfLession(questionOfLession3)
        setIndex(0)
        setUserAnswear(questionOfLession3[0].userAnswear)
        toast.info("Check Your Answear!", {})
    }

    function handleResetQuiz() {
        localStorage.removeItem("questionOfLession3");//remove the data from localstorage
        console.log(questionOfLession3);
        setQuestionOfLession(questionOfLession3)//from const variable 
        setIndex(0)
        setUserAnswear(questionOfLession3[0].userAnswear)
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
                        return <div className="box" key={`3-${obj.qId}`} style={{ transform: `translateX(-${index}00%)` }} >
                            <div className='equation'>
                                <h3>{`Q${obj.qId}.`} <span style={{ marginLeft: "20px" }}>{obj.equation}</span></h3>
                                <div className='flag_cont' onClick={() => handleFlag(obj)}>
                                    {obj.isFlag == 1 ? <BsBookmarkCheckFill /> : <BsBookmark />}
                                    <span>flag for later</span></div>
                            </div>

                            <div className='mid-part'>
                                <div className='mid_left'>
                                    <div className='table'>

                                        {
                                            userAnswear.map((val, i) => (
                                                <div className='table_item' key={val}>

                                                    <div className='img-cont'>
                                                        <img src={obj.images_arr[i]} />
                                                    </div>
                                                    <button
                                                        className={`${i == dragOverItemIndex ? "next_btn" : ""}`}
                                                        draggable
                                                        onDragStart={() => handleOnDragStart(i)}
                                                        onDragOver={(e) => handleOnDragOver(e, i)}
                                                        onDrop={() => handleOnDrop(i)}
                                                        onDragEnd={() => handleDragEnd()}
                                                    >{userAnswear[i]}</button>

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

export default Lesson3