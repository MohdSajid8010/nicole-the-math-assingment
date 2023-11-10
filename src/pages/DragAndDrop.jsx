import React, { useState } from 'react'
import "../styles/lesson4.css";
import { BsThreeDotsVertical } from "react-icons/bs";


const DragAndDrop = () => {
    const [sport, setSport] = useState(["B", "A", "D", "C"]);
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
    function handleOnDrop(i) {
        console.log(`moved item from ${dragItemIndex} to index ${i}`)
        let removeItem = sport.splice(dragItemIndex, 1);
        sport.splice(i, 0, removeItem[0])
        setSport([...sport]);
    }

    function handleDragEnd() {
        setdragItemIndex(undefined)
        setdragOverItemIndex(undefined)
    }
    function handleSubmit() {
        console.log(sport)
    }
    return (
        <div className='DragAndDrop'>
            <h2>DragAndDrop2</h2>
            <div className='list'>
                {
                    sport.length > 0 && (
                        sport.map((val, i) => (
                            <div key={i} className={`${i == dragOverItemIndex ? "next_list_item" : 'list_item'}`}
                                draggable
                                onDragStart={() => handleOnDragStart(i)}
                                onDragOver={(e) => handleOnDragOver(e, i)}
                                onDrop={() => handleOnDrop(i)}
                                onDragEnd={handleDragEnd}
                            >
                                <span>{i}</span>
                                <span>{val}</span>
                                <BsThreeDotsVertical />
                            </div>
                        ))
                    )
                }

            </div>

            <button onClick={handleSubmit}>submit</button>
        </div>
    )
}

export default DragAndDrop