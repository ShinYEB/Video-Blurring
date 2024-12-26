import axios from "axios";

class Network {
    //url = "http://127.0.0.1:8000/testapp";
    url = "https://a2b1.store";

    post = (data, path) => {
        const link = this.url + path

        const config = {"Content-Type": 'application/json'};

        return axios.post(link, data, {headers: config})
        .then((response) => response.data)
        .catch((error) => {console.log(error); throw error;})
    }

    post_with_token = (data, path, token) => {
        const link = this.url + path

        const config = { "Content-Type": 'application/json', "Authorization": token };

        return axios.post(link, data, {headers: config})
        .then((response) => response.data)
        .catch((error) => {console.log(error); throw error;})
    }

    post_multi = (data, path, token) => {
        const link = this.url + path

        const config = { "Content-Type": 'multipart/form-data', "Authorization": token };

        return axios.post(link, data, {headers: config})
        .then((response) => response.data)
        .catch((error) => {console.log(error); throw error;})
    }

    get_with_token = (path, token) => {
        const link = this.url + path;

        const config = { "Content-Type": 'application/json', "Authorization": token };

        return axios.get(link, { headers: config })
        .then((response) => response.data)
        .catch((error) => {console.log(error); throw error;})
    }

    delete_with_token = (path, token) => {
        const link = this.url + path;
    
        const config = { "Content-Type": 'application/json', "Authorization": token };
    
        return axios.delete(link, { headers: config })
        .then((response) => response.data)
        .catch((error) => {console.log(error); throw error;})
    }
    
    patch_with_token = (data, path, token) => {
        const link = this.url + path;
    
        const config = { "Content-Type": 'application/json', "Authorization": token };
    
        return axios.patch(link, data, { headers: config })
        .then((response) => response.data)
        .catch((error) => {console.log(error); throw error;})
    }
}

export default Network;