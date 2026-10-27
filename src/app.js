import { simular, taxaAnualParaMensal, prazoEmMeses } from './juros.js';

const formulario = document.getElementById('formulario');
const erro = document.getElementById('erro');
const resultado = document.getElementById('resultado');
const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

function lerNumero(id) {
  return document.getElementById(id).valueAsNumber;
}

function lerEntradas() {
  const taxa = lerNumero('taxa') / 100;
  const unidadeTaxa = document.getElementById('unidade-taxa').value;
  const unidadePrazo = document.getElementById('unidade-prazo').value;

  return {
    valorInicial: lerNumero('valor-inicial'),
    aporteMensal: lerNumero('aporte-mensal'),
    taxaMensal: unidadeTaxa === 'ano' ? taxaAnualParaMensal(taxa) : taxa,
    meses: prazoEmMeses(lerNumero('prazo'), unidadePrazo),
  };
}

function criarLinha({ mes, aporte, juros, saldo }) {
  const linha = document.createElement('tr');
  for (const valor of [mes, moeda.format(aporte), moeda.format(juros), moeda.format(saldo)]) {
    const celula = document.createElement('td');
    celula.textContent = valor;
    linha.append(celula);
  }
  return linha;
}

function mostrarResultado({ montante, totalInvestido, totalJuros, tabela }) {
  document.getElementById('montante').textContent = moeda.format(montante);
  document.getElementById('total-investido').textContent = moeda.format(totalInvestido);
  document.getElementById('total-juros').textContent = moeda.format(totalJuros);
  document.getElementById('tabela').replaceChildren(...tabela.map(criarLinha));
}

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  try {
    mostrarResultado(simular(lerEntradas()));
    erro.hidden = true;
    resultado.hidden = false;
  } catch (falha) {
    erro.textContent = falha.message;
    erro.hidden = false;
    resultado.hidden = true;
  }
});
