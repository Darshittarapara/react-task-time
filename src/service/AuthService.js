import axios from "axios"

export const sentUserData = async (url, userData) => {
    console.log(url, userData)
    try {
        const response = await axios.post(url, userData)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const sentTimeData = async (timerData, userId) => {
    const endPoint = "tasktime" + userId + ".json"
    const response = await axios.put(`https://react-authecation-default-rtdb.firebaseio.com/${endPoint}`, timerData)
    console.log(response)
    return response?.data?.timerDetails
};

export const getTimeData = async (userId) => {
    const endPoint = "tasktime" + userId + ".json";
    const response = await axios.get(`https://react-authecation-default-rtdb.firebaseio.com/${endPoint}`)
    return response?.data?.timerDetails
};
