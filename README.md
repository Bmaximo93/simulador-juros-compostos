# Simulador de Juros Compostos

Simulador web que calcula o rendimento de um investimento com valor inicial, aportes mensais e juros compostos.

## Funcionalidades

- Valor inicial e aporte mensal
- Taxa de juros ao mês ou ao ano
- Prazo em meses ou anos
- Montante final, total investido e total em juros
- Tabela de evolução mês a mês

## Pipeline CI/CD

Cada alteração passa por lint de HTML, lint de JavaScript, SAST com Semgrep, testes unitários e DAST com OWASP ZAP antes de ser publicada no GitHub Pages.

- SAST: o Semgrep analisa o código-fonte e a pipeline falha em qualquer achado.
- DAST: o OWASP ZAP Baseline testa o site em execução e a pipeline falha em qualquer alerta novo. Os alertas de cabeçalhos HTTP, que o GitHub Pages não permite configurar, são ignorados em `.zap/rules.tsv`.

## Gitflow

- `main`: produção
- `develop`: integração
- `feature/*`, `release/*`, `hotfix/*`: desenvolvimento
