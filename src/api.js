import axios from "axios";

const api = axios.create ({
    baseURL:import.meta.env.VITE_API_URL
})


api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("accessToken");
    if(token) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;

});


api.interceptors.response.use((response)=>response,

async(error)=>{
    const originalRequest = error.config;

    if(
        error.response?.status === 401 &&
        !originalRequest._retry
    ){
        originalRequest._retry = true;

        const refreshToken = localStorage.getItem("refreshToken");

        try{
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/refresh`,{refreshToken}
            );

            const newAccessToken = res.data.accessToken;
            localStorage.setItem("accessToken",newAccessToken);

            api.defaults.headers.common.Authorization =
            "Bearer " + newAccessToken;

            return api(originalRequest);
        } catch(error){
            localStorage.removeItem("accessToken");
            localStorage.removeItem("accessToken");
            window.location.href ="/"
            return Promise.reject(err);
        }
    }
    return Promise.reject(error);
});

export default api;