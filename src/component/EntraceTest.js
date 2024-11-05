import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import styles from './EntraceTest.module.scss';

import Point from "./Point";
import Counter from "./Counter";
import ListPoint from "./ListPoint";

export default function EntraceTest() {

    const [numberPoint, setNumberPoint] = useState(5);
    const [isStart, setIsStart] = useState(false);

    const [numberNext, setNumberNext] = useState(1);
    const [error, setError] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [showNext, setShowNext] = useState(false)
    const [restart, setRestart] = useState(false)
    const [autoPlay, setAutoPlay] = useState(false)
    const timerRef = useRef(null);
    const counterRef = useRef();
    const pointRefs = useRef([]);

    const onPlay = () => {
        setIsStart(true);
        counterRef?.current?.startCount();
        setIsDone(false);
        setShowNext(true)
    }
    const handleRestart = () => {
        setRestart(!restart)
        if (timerRef.current) {
            clearInterval(timerRef.current); 
        }
        setIsStart(true);
        setError(false)
        setNumberNext(1)
        setIsDone(false)
        setShowNext(true);
        setAutoPlay(false)

        counterRef?.current?.startCount();
    }

    const handleInputChange = (event) => {
        const newValue = event.target.value;

        if (newValue === '' || /^[0-9]*$/.test(newValue)) {
            setNumberPoint(Number(newValue));  
        } 
    };

    const checkValidateClick = (point) => {
        if(point == numberNext) {
            if(point == numberPoint) {
                setShowNext(false)
            } else {
                setNumberNext(point + 1)
            }
        } else {
            setError(true)
            clearInterval(timerRef.current);
            setIsStart(false)
            setShowNext(false)
        }
    }
    const checkDoneAll = (point) => {
        if(point == numberPoint) {
            setIsDone(true);
            clearInterval(timerRef.current);
            setIsStart(false)
            setAutoPlay(false)
        }
    }

    useEffect(() => {
        return () => {
           clearInterval(timerRef.current); 
        };
    }, []);

    useEffect(() => {
        let checkAutoPlay = null;
        if (autoPlay) {
            checkAutoPlay = setInterval(() => {
                pointRefs?.current[numberNext - 1]?.startAutoClick();
            }, 1000);
        } else {
            clearInterval(checkAutoPlay);
        }

        return () => clearInterval(checkAutoPlay);
    }, [autoPlay, numberNext])

    const Button = ({onClick, title, style}) => {
        return (
            <div className={classNames(styles['button'])} onClick={onClick} style={style}>
                {title}
            </div>
        )
    }
    return (
        <div className={styles['entrace-test']}> 
            <div>
                <div className={styles['title']}>
                    {isDone ? 
                        <div style={{color: 'green'}}>ALL CLEARED</div> : 
                        !error ? "LET'S PLAY" : <div style={{color: 'orange'}}>GAMEOVER</div>}
                </div>
                <div className={styles['row']}>
                    <div>
                        Point:
                    </div>
                    <div>
                        <input onChange={handleInputChange} value={numberPoint}/>
                    </div>
                </div>
                <div className={styles['row']}>
                    <div>
                        Time:
                    </div>
                    <Counter timerRef={timerRef} counterRef={counterRef}/>
                </div>
                <div>
                    {isStart ? (
                        <div className={styles['row']}>
                            <Button onClick={handleRestart} title='Restart' style={{marginRight: '20px'}}/> 
                            <Button onClick={() => setAutoPlay(!autoPlay)} title={!autoPlay ? 'Auto Play ON' : 'Auto Play OFF'}/> 
                            
                        </div>
                    ) : (
                        <div>{(error || isDone) ? <Button onClick={handleRestart} title='Restart'/> : <Button onClick={onPlay} title='Play'/>}</div>
                    )}
                    
                    
                </div>
            </div>
            <ListPoint 
                numberPoint={numberPoint}
                checkValidateClick={checkValidateClick}
                checkDoneAll={checkDoneAll}
                restart={restart}
                pointRefs={pointRefs}
                error={error}
                isStart={isStart}
                isDone={isDone}
            />
            {showNext && (
                <div>
                    Next: {numberNext}
                </div>
            )}
        </div>
    )
}