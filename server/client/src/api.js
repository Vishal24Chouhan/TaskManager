import axios from "axios";

export const createTask = async (name) => {
    try {
        const res = await axios.post('/api/v1/tasks', {name});
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
};