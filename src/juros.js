export function arredondar(valor) {
  return Math.round((valor + Number.EPSILON) * 100) / 100;
}

export function taxaAnualParaMensal(taxaAnual) {
  return Math.pow(1 + taxaAnual, 1 / 12) - 1;
}

export function prazoEmMeses(prazo, unidade) {
  return unidade === 'anos' ? prazo * 12 : prazo;
}

export function validarEntradas({ valorInicial, aporteMensal, taxaMensal, meses }) {
  const valores = [valorInicial, aporteMensal, taxaMensal, meses];
  if (valores.some((valor) => typeof valor !== 'number' || Number.isNaN(valor))) {
    throw new Error('Preencha todos os campos com números válidos');
  }
  if (valorInicial < 0 || aporteMensal < 0) {
    throw new Error('Valores não podem ser negativos');
  }
  if (taxaMensal < 0) {
    throw new Error('A taxa não pode ser negativa');
  }
  if (!Number.isInteger(meses) || meses < 1) {
    throw new Error('O prazo deve ser de pelo menos 1 mês');
  }
}

export function simular({ valorInicial, aporteMensal, taxaMensal, meses }) {
  validarEntradas({ valorInicial, aporteMensal, taxaMensal, meses });

  let saldo = valorInicial;
  const tabela = [];

  for (let mes = 1; mes <= meses; mes++) {
    const juros = saldo * taxaMensal;
    saldo += juros + aporteMensal;
    tabela.push({
      mes,
      aporte: arredondar(aporteMensal),
      juros: arredondar(juros),
      saldo: arredondar(saldo),
    });
  }

  const totalInvestido = valorInicial + aporteMensal * meses;

  return {
    montante: arredondar(saldo),
    totalInvestido: arredondar(totalInvestido),
    totalJuros: arredondar(saldo - totalInvestido),
    tabela,
  };
}
