// src/types/indicators.ts

export interface Unidade {
  id: string;
  classe: string;
  multiplicador: number;
}

export interface SerieEntry {
  [ano: string]: string | null;
}

export interface Serie {
  pais: {
    id: string;
    nome: string;
  };
  serie: SerieEntry[];
}

export interface Indicador {
  id: number;
  indicador: string;
  unidade: Unidade;
  series: Serie[];
}
