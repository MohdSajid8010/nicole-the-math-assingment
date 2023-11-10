import React, { useState } from 'react'
import "../styles/lesson3.css";
import { BsThreeDotsVertical } from "react-icons/bs";

const img_arr = [
    "https://cdn-icons-png.flaticon.com/512/732/732212.png",
    "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
    "https://cdn-icons-png.flaticon.com/128/482/482216.png",
]
const options = ["PDF", "CSS", "HTML"]
const DragAndDrop2 = () => {
    const [options, setoptions] = useState(["PDF", "CSS", "HTML"]);
    const [dragItemIndex, setdragItemIndex] = useState()
    const [dragOverItemIndex, setdragOverItemIndex] = useState();//whrere drag item will bw placed

    function handleOnDragStart(i) {
        console.log(`start moved item from index ${i} to`);
        setdragItemIndex(i)//as soon user start the drag{jaha s drag karna start kiya}
    }



    //whose element index will be acces on whic item is above 
    function handleOnDragOver(e, i) {
        e.preventDefault()
        // By default, data/elements cannot be dropped in other elements. To allow a onDrop, we must prevent the default handling of the element. This is done by calling the event preventDefault.
        //it is enabling the onDrop event,by default onDrop event is disable by browser
        setdragOverItemIndex(i)
        console.log(`drag  moved item over index ${i} `);
    }

    //{jis par drag kiya final wala item ki indix acces hogi,and function will call when final drop the el}
    function handleOnDrop(i) {//it capture drag over index
        console.log(`moved item from ${dragItemIndex} to index ${i}`)
        let removeItem = options.splice(dragItemIndex, 1);
        options.splice(i, 0, removeItem[0])
        setoptions([...options]);
    }

    function handleDragEnd() {
        setdragItemIndex(undefined)
        setdragOverItemIndex(undefined)
    }
    function handleSubmit() {
        console.log(options)
    }
    return (
        <div className='DragAndDrop2'>
            <h2>DragAndDrop2</h2>
            <div className='table'>

                {
                    options.map((val, i) => (
                        <div className='table_item' key={val}>

                            <div className='img-cont'>
                                <img src={img_arr[i]} />
                            </div>
                            <button
                                className={`${i == dragOverItemIndex ? "next_btn" : ""}`}
                                draggable
                                onDragStart={() => handleOnDragStart(i)}
                                onDragOver={(e) => handleOnDragOver(e, i)}
                                onDrop={() => handleOnDrop(i)}
                                onDragEnd={() => handleDragEnd()}
                            >{options[i]}</button>

                        </div>
                    ))
                }

            </div>

            <button onClick={handleSubmit}>submit</button>
        </div>
    )
}

export default DragAndDrop2



