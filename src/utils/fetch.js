
import axios from 'axios'


const publicFetch = axios.create({
    baseURL: process.env.NODE_ENV === 'development'? 'http://localhost:3001' : process.env.REACT_APP_CONFAMSCH_BACKEND_API
})


export { publicFetch };