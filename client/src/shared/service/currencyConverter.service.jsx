import axios from 'axios';
const API_URL = 'https://free.currconv.com/api/';
const access_key = "8f00ec6afddcb8d95da8";

export default function makeRequest(from, to) {
   const resp= axios.get(`${API_URL}v7/convert?q=${from}_${to}&compact=ultra&apiKey=${access_key}`,
   { headers: { 'Content-Type': 'application/json' } }
)
    return resp
}

