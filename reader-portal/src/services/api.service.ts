import axios from "axios";

const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};
export default (baseURL: string) => {
    return axios.create({
        baseURL,
        ...commonConfig,
    });
};