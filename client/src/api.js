import axios from "axios";

const API = "http://localhost:5000/api";

export const getState = () => axios.get(`${API}/state`);
export const move = (dir) => axios.post(`${API}/move`, { direction: dir });
export const pick = () => axios.post(`${API}/pick`);
export const drop = () => axios.post(`${API}/drop`);
export const exportCSV = () => window.open(`${API}/export`, "_blank");
