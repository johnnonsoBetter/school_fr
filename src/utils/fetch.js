
import axios from 'axios'


// const publicFetch = axios.create({
//     baseURL: 'https://confamsch-b.herokuapp.com/' 
// })


const publicFetch = axios.create({
    baseURL: 'http://localhost:3001' 
})
export { publicFetch };