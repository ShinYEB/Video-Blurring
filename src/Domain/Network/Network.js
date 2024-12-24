import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

class Network {
    url = "http://127.0.0.1:8000/testapp";

    post = (data, path) => {
        const link = this.url + path

        const config = {"Content-Type": 'application/json'};

        axios.post(link, data, {headers: config})
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error))
    }


    
}

export default Network;