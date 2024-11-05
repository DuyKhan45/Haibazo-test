import React, { useState } from "react";

import styles from './EntraceTest.module.scss';
import Point from "./Point";

export default function ListPoint(props) {
    const {
        numberPoint,
        checkValidateClick,
        checkDoneAll,
        restart,
        pointRefs,
        error,
        isStart,
        isDone
    } = props

    return (
        <div className={styles['points']}>
            {(isStart || error) && !isDone && (
                <>
                    {[...Array(numberPoint)].map((e, i) => {
                        return (
                            <Point 
                                key={i} 
                                point={i + 1} 
                                callback={checkValidateClick} 
                                error={error} 
                                checkDone={checkDoneAll} 
                                restart={restart}
                                refPoint={(el) => pointRefs.current[i] = el} 
                            />
                        )
                    })}
                </>
            )}
        </div>
    )
}