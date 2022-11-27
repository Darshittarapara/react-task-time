import { createContext, useEffect, useState } from "react";
import { getTimeData, sentTimeData } from "../service/AuthService";

export const authContext = createContext();

const AuthContextProvider = (props) => {
    const [isAuth, setIsAuth] = useState(false);
    const [timerRecord, setTimerRecord] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));


    useEffect(() => {
        const userId = user?.userId;
        const fetchTimeData = async () => {
            const response = await getTimeData(userId);
            console.log(response)
            setTimerRecord(response);
        }
        if (userId) {
            fetchTimeData();
        }
    }, [user]);

    console.log(timerRecord)
    const getStartTime = async (timer) => {
        const userId = user?.userId;
        const newStartTime = [...timerRecord];
        newStartTime.push({ ...timer });
        setTimerRecord(newStartTime);
        const timeData = {
            timerDetails: newStartTime
        }
        const response = await sentTimeData(timeData, userId);
        console.log(response)
        if (response) {
            setTimerRecord(response?.timerDetails);
            console.log(response)
        }
    }
    const getEndTimer = async (endTime, currentId) => {
        const userId = user?.userId;
        const findItem = timerRecord.map((timer) => {
            return { ...timer }
        });
        const getTimerIndex = findItem.findIndex(({ id }) => +id === +currentId);
        findItem[getTimerIndex].endTime = endTime
        const timeData = {
            timerDetails: findItem
        }
        const response = await sentTimeData(timeData, userId);
        console.log(response)
        if (response) {
            setTimerRecord(response?.timerDetails);
            console.log(response)
        }
    }

    const logIn = () => {
        setIsAuth(true);
    }
    return (
        <authContext.Provider value={{ isAuth, onLogIn: logIn, onStartTimer: getStartTime, onEndTimer: getEndTimer }}>
            {props.children}
        </authContext.Provider>
    )
};
export default AuthContextProvider;