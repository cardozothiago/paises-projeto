# Sobre o projeto
Esse é um projeto simples de react que faz algumas consultas para uma API do IBGE que retornar diversos indicadores socio-economicos dos países-membros da ONU, e apresentam em uma interface onde é possível buscar por Países e visualizar os detalhes do Pais, como Lingua Oficial, Moeda, Área do território e todos os indicadores socio-economicos disponíveis.  


Abaixo deixo o link de documentação da API do IBGE sobre Países:

https://servicodados.ibge.gov.br/api/docs/paises

Utilizei também uma API para buscar as bandeiras dos países para montar a visualização do GRID da Página inicial. Segue o Link:

https://flagpedia.net/download/api


# Executando o projeto

Execute o comando: 

```
Yarn dev

```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).
