import { create } from "apisauce";

const api = create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export default api;
