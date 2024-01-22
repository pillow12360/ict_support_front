import axios from '../../node_modules/axios/index';

const instance = axios.create({
  baseURL: '',
  params: {
    api_key: '',
    language: 'ko-KR',
  },
});

export default instance;
