import React, { useEffect, useState } from 'react';
import { getTimeData } from '../../service/AuthService';

const TimeHistory = (props) => {
    const [timerHistoryList, setTimerHistoryList] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const userId = user?.userId;
        const fetchTimeData = async (userId) => {
            const response = await getTimeData(userId);
            setTimerHistoryList(response);
        }
        if (userId) {
            fetchTimeData(userId);
        }
    }, [user]);

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date) {
        return [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
        ].join('/');
    }

    return (
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Date</th>
                    <th>Start time</th>
                    <th>End time</th>
                </tr>
            </thead>
            <tbody>
                {timerHistoryList?.length > 0 ? timerHistoryList?.map((list, index) => {
                    return <tr key={`${index}`} >
                        <td>{+list.id + 1}</td>
                        <td>{formatDate(new Date(list.date))}</td>
                        <td>{list.startTime}</td>
                        <td>{list.endTime}</td>
                    </tr>
                }) : <tr>
                    <td colSpan={12} style={{ textAlign: "center" }}>Loading</td>
                </tr>}
            </tbody>

        </table>
    )
};
export default TimeHistory;