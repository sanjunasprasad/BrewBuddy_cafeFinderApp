import axios from 'axios';
import { apiURl } from '../../utils/constants';
function createAxiosInstance(token ,role ) { 
    const instance = axios.create({
        baseURL: apiURl,
    });
    if( token && token.trim()){
    instance.interceptors.request.use(
        
        (config) => {
            config.headers.Authorization = `Bearer ${localStorage.getItem(token)}`; 
            config.headers.role = role;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
      );
    }
    return instance;
}



const axiosUserInstance = createAxiosInstance("token" );
const axiosAdminInstance = createAxiosInstance("adminToken");
const axiosInstance = createAxiosInstance(null , null)


export {
    axiosUserInstance,
    axiosAdminInstance,
    axiosInstance
};