import axios from 'axios';

//url do backendu
const url = 'http://localhost:4200/api';

export const fetchPosts = () => axios.get(url);
