import axios from "axios";

const url = "https://servicodados.ibge.gov.br/api/v1/paises/";


export const ApiService = axios.create({
  baseURL: url,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});