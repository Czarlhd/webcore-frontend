import axios from 'axios';

import React from 'react'

export default function ApisFunctionalities() {
// delete api
const username = "yas123"
const cdmName = "cdm1"
const API_URL = `http://127.0.0.1:8080/${username}/classdiagram/${cdmName}/removeClass`;
let id = 1;
const deleteApi = async () => {
    await axios.delete(API_URL + '/' + 1).then((res) => {
        console.log("res" + res)
    }).catch((err) => {
        console.log(err)
    });
}   
    return (
    <div><button onClick={deleteApi}>Test</button></div>
  )
}

