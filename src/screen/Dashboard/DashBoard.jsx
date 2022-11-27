import React, { useContext, useEffect, useState } from 'react';
import Card from '../../components/UI/Card';
import { ProgressBar } from "baseui/progress-bar";
import Button from '../../components/Button/Button';
import { authContext } from '../../context/AuthContext';
let clearTimer = '';
const DashBoard = (props) => {
    const { onStartTimer, onEndTimer } = useContext(authContext);
    const [isUserStartTimer, setIsUserStartTimer] = useState(false);
    const [dropWidth, setDropWidth] = useState(0);
    const [dropBackgroundColor, setDropBackgroundColor] = useState("");
    const [timerId, setTimerId] = useState(0);

    useEffect(() => {
        const width = JSON.parse(localStorage.getItem("width"));
        const previewTimerId = localStorage.getItem("timerId")
        if (width) {
            setIsUserStartTimer(width.isUserStartTimer);
            setDropWidth(width?.dropWidth)
            setTimerId(+previewTimerId);
        }
    }, []);

    useEffect(() => {
        if (isUserStartTimer) {
            clearTimer = setInterval(() => {
                setDropWidth((previewState) => previewState + 1);
            }, 100);
        }
        if (!isUserStartTimer) {
            clearTimeout(clearTimer)
        }
        return () => {
            clearTimeout(clearTimer)
        }
    }, [isUserStartTimer]);

    useEffect(() => {
        if (dropWidth > 0) {
            localStorage.setItem("width", JSON.stringify({ dropWidth, isUserStartTimer }))
        }
        if (dropWidth < 270) {
            setDropBackgroundColor("red")
        }
        else if (dropWidth > 270 && dropWidth < 480) {
            setDropBackgroundColor("orange")
        }
        else if (dropWidth > 480 && dropWidth < 540) {
            setDropBackgroundColor("blue")
        }
        else if (dropWidth >= 540) {
            setDropBackgroundColor("green")
        }

    }, [dropWidth, isUserStartTimer, timerId]);

    const startTimerHandler = () => {
        const date = new Date()
        if (dropWidth > 540) {
            setDropWidth(0);
            localStorage.removeItem("width");
        }
        const startTime = date.toLocaleTimeString();
        const timeDetails = {
            id: timerId,
            startTime,
            date: date.toLocaleDateString(),
            endTime: ""
        }
        onStartTimer(timeDetails);
        setIsUserStartTimer(true);
    }

    const endTimerHandler = () => {
        setIsUserStartTimer(false);
        const endTime = new Date().toLocaleTimeString();
        onEndTimer(endTime, timerId);
        setTimerId((preViewState) => +preViewState + 1);
        localStorage.setItem('timerId', timerId + 1);
    };

    return <Card className="dashboard">
        <ProgressBar
            value={(+dropWidth / 540) * 100}
            overrides={{
                BarProgress: {
                    style: ({ $theme }) => ({
                        outline: `2px solid silver`,
                        backgroundColor: dropBackgroundColor
                    })
                }
            }}
        />
        {isUserStartTimer ? <Button type='button' onClick={endTimerHandler} className='button btn bg-danger text-white'>Stop timer</Button> : <Button type='button' onClick={startTimerHandler} className='button btn btn-success'>Start timer</Button>}
    </Card>

};
export default DashBoard;