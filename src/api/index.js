import axios from "axios"

// let domain = "https://b-cc-hub.herokuapp.com" 
let domain = "http://localhost:5000"


const login = async (path, data) => {
    try {
        const req = await fetch(domain + path, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            data
        })

        const res = await req.text();
        return JSON.parse(res);
    } catch (error) {
        return {
            error: error.message,
        };
    }

}


const read = async (path) => {
    const resp = await axios.get(domain + path);
    return resp.data


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


const remove = async (path, data) => {
    try {
        const req = await fetch(domain + path,
            data, {
                method: "DELETE",
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
    login,
    read,
    remove,
}