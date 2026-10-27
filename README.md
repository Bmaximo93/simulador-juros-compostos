# Simulador de Juros Compostos

Simulador web que calcula o rendimento de um investimento com valor inicial, aportes mensais e juros compostos.

## Funcionalidades

- Valor inicial e aporte mensal
- Taxa de juros ao mês ou ao ano
- Prazo em meses ou anos
- Montante final, total investido e total em juros
- Tabela de evolução mês a mês

## Pipeline CI/CD

Cada alteração passa por lint de HTML, lint de JavaScript e testes unitários antes de ser publicada no GitHub Pages.

## Gitflow

- `main`: produção
- `develop`: integração
- `feature/*`, `release/*`, `hotfix/*`: desenvolvimento
