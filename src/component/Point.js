import React, { useEffect, useRef, useState, useImperativeHandle, useCallback } from "react";

import styles from './Point.module.scss';

export default function Point(props) {
    const {
        point,
        callback,
        error,
        checkDone, 
        restart,
        refPoint,
    } = props;
    const [showPoint, setShowPoint] = useState(true);

    const [count, setCount] = useState(3);
    const [showCounter, setShowCounter] = useState(false);

    const [top, setTop] = useState(Math.random() * 410)
    const [left, setLeft] = useState(Math.random() * 420)
    const [zIndex, setZIndex] = useState(10000 - point)

    const [buttonColor, setButtonColor] = useState('rgba(209, 97, 17, 1)');

    const timerRef = useRef(null);

    useEffect(() => {
        clearInterval(timerRef.current); 
        timerRef.current = null;
        setTop(Math.random() * 410)
        setLeft(Math.random() * 420)
        setCount(3)
        setShowCounter(false)
        setShowPoint(true)
        setButtonColor('rgba(209, 97, 17, 1)')
    }, [restart])
    useImperativeHandle(refPoint, () => ({
        startAutoClick() {
            handleClick();
        },
    }))

    const handleClick = () => {
        if(error) {
            return;
        }
        callback(point)
        setShowCounter(true)

        let remainTime = 3;
        if(!timerRef.current) {
            timerRef.current = setInterval(() => {
                remainTime -= 0.1;
                if (remainTime < 0) {
                    remainTime = 0
                    setShowCounter(false)
                    setShowPoint(false)
                    checkDone(point)
                    clearInterval(timerRef.current)
                    timerRef.current = null;
                    return;
                } else {
                    setCount(remainTime.toFixed(1))
                    const alpha = remainTime / 3; 
                    setButtonColor(`rgba(209, 97, 17, ${alpha.toFixed(2)})`);
                }
            }, 100);
        }

        return () => {
            if(timerRef.current) {
                clearInterval(timerRef.current)
            }
        }

    }
    useEffect(() => {
        return () => {
           clearInterval(timerRef.current); 
           timerRef.current = null;

        };
    }, []);
    useEffect(() => {
        if(error) {
            clearInterval(timerRef.current);
            timerRef.current = null;

        }
    }, [error])
    return showPoint && (
        <div 
            className={styles['point']} 
            onClick={handleClick} 
            style={{
                background: showCounter && buttonColor, 
                borderColor: buttonColor,
                transition: 'background-color 0.1s ease',
                top: `${top}px`, 
                left: `${left}px`, 
                zIndex: zIndex
            }}
        >
            <div>
                {point}
            </div>
            {showCounter && (
                <div className={styles['second']}>
                    {count}s
                </div>
            )}
        </div>
    )
}