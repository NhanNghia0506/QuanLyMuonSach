import axios from "axios";

const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

export default (baseURL: string) => {
    const instance = axios.create({
        baseURL,
        ...commonConfig,
    });

    // 👉 Gắn Bearer token tự động cho mọi request
    instance.interceptors.request.use((config) => {
        const token = localStorage.getItem("token"); // lấy token đã lưu

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });

    return instance;
};
