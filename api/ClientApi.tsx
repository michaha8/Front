import { create } from "apisauce";
import { newIP } from "../constants";
const apiClient = create({
  baseURL: newIP,
  headers: { Accept: "application/vnd.github.v3+json" },
});

export default apiClient;
