interface CountryId {
  M49: number;
  "ISO-3166-1-ALPHA-2": string;
  "ISO-3166-1-ALPHA-3": string;
}

interface CountryName {
  abreviado: string;
  "abreviado-EN": string;
  "abreviado-ES": string;
}

interface AreaUnit {
  nome: string;
  símbolo: string;
  multiplicador: number;
}

interface Area {
  total: string;
  unidade: AreaUnit;
}

interface RegionId {
  M49: number;
}

interface Region {
  id: RegionId;
  nome: string;
}

interface Location {
  regiao: Region;
  "sub-regiao": Region;
  "regiao-intermediaria": Region;
}

interface LanguageId {
  "ISO-639-1": string;
  "ISO-639-2": string;
}

interface Language {
  id: LanguageId;
  nome: string;
}

interface Government {
  capital: {
    nome: string;
  };
}

interface CurrencyId {
  "ISO-4217-ALPHA": string;
  "ISO-4217-NUMERICO": string;
}

interface Currency {
  id: CurrencyId;
  nome: string;
}

export interface ICountry {
  id: CountryId;
  nome: CountryName;
  area: Area;
  localizacao: Location;
  linguas: Language[];
  governo: Government;
  "unidades-monetarias": Currency[];
  historico: string;
}