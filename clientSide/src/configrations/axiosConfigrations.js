import axios from "axios"

export default function configureAxios(store) {
  axios.defaults.baseURL = 'http://localhost:5000';
}