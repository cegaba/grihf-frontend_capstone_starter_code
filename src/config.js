const hostname = window.location.hostname;
const backendPort = "8181";
export const API_URL = `${window.location.protocol}//${hostname.replace('3000', backendPort)}`;

console.log("API_URL:", API_URL);
