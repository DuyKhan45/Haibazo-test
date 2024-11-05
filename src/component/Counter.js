import React, { useState, useImperativeHandle } from "react";

export default function Counter(props) {
    const {
        timerRef,
        counterRef
    } = props

    const [counter, setCounter] = useState(0);

    useImperativeHandle(counterRef, () => ({
        startCount() {
            setCounter(0)
            handleStartCounter();
        }
    }))
    const handleStartCounter = () => {
        let time = 0;
        timerRef.current = setInterval(() => {
            time += 0.1
            setCounter(time);  
        }, 100);
    }

    return (
        <div>
            {counter.toFixed(1)}s
        </div>
    )
}