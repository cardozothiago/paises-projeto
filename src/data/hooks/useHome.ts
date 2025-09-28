import {ApiService}  from "../services/ApiService";
import { useState } from "react";
import type { ICountry } from "../../utils/interfaces/iCountry";

export const useHome = () => {
  const [response, setResponse] = useState<ICountry[]>([]);
  const getAllCountries = async () => {
    try {
      const { data } = await ApiService.get("/all");
      setResponse(data);
      return true;
    } catch (error) {
      return false;
    }
  };

  return { getAllCountries, response };
};