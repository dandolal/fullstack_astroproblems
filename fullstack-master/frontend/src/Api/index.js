import axios from 'axios'

export default axios.create({
    baseURL: ('http://35.226.66.252:8001' || 'http://localhost:8080') + '/api',
    responseType: 'json'
})
