import axios from "axios";

const API = "http://localhost:5000/api";

// Fetch the current state of the game
export const getState = () => axios.get(`${API}/state`);
// Send commands to the server
export const move = (dir) => axios.post(`${API}/move`, { 
    direction: dir 
});
// Pick up an item
export const pick = () => axios.post(`${API}/pick`);
//  Drop an item
export const drop = () => axios.post(`${API}/drop`);
// Export game data as CSV
export const exportCSV = () => window.open(`${API}/export`, "_blank");
