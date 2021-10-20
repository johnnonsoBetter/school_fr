
import axios from 'axios'


const publicFetch = axios.create({
    baseURL: 'https://confamsch-b.herokuapp.com/' 
})

export { publicFetch };