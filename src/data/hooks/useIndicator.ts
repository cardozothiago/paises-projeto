import { useState } from "react";
import {ApiService}  from "../services/ApiService";
import type { Indicador } from "../../utils/interfaces/Indicators";



export function useIndicators() {
  const [dados, setDados] = useState<Indicador[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getIndicators = async (code:string) => {
    setLoading(true);
    try {
      const { data } = await ApiService.get<Indicador[]>(code+"/indicadores");
      setDados(data);
      setError(null);
    } catch (err) {
      setError("Erro ao carregar indicadores");
    } finally {
      setLoading(false);
    }
  };

  return { dados, loading, error, getIndicators}
};