import axios from "axios"
import {domain} from "../Utils"




const read = async (path) => {
    try {
        const resp = await axios.get(domain + path);
        return resp.data
        } catch (error) {
        return {
            error: error.message
        };
    }
}


const create = async (path, data) => {
    try {
        const req = await fetch(domain + path,
            data, {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        const res = await req.text();
        return JSON.parse(res);
    } catch (error) {
        return {
            error: error.message,
        };
    }
}


export default {
    create,
    read,
}