import {ApiService}  from "../services/ApiService";
import { useState } from "react";
import type { ICountry } from "../../utils/interfaces/iCountry";

export const useDetails = () => {
  const [response, setResponse] = useState<ICountry[]|null>(null);
  const getDetails = async (code:string) => {
    try {
      const { data } = await ApiService.get("/"+code);
      setResponse(data);
      return true;
    } catch (error) {
      return false;
    }
  };

  return { getDetails, response };
};