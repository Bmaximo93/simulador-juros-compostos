import {
  arredondar,
  taxaAnualParaMensal,
  prazoEmMeses,
  simular,
} from '../../src/juros.js';

describe('arredondar', () => {
  test('arredonda para duas casas decimais', () => {
    expect(arredondar(1126.8250301)).toBe(1126.83);
    expect(arredondar(1.005)).toBe(1.01);
  });
});

describe('taxaAnualParaMensal', () => {
  test('12% ao ano equivale a aproximadamente 0,9489% ao mês', () => {
    expect(taxaAnualParaMensal(0.12)).toBeCloseTo(0.0094888, 6);
  });
});

describe('prazoEmMeses', () => {
  test('converte anos e mantém meses', () => {
    expect(prazoEmMeses(2, 'anos')).toBe(24);
    expect(prazoEmMeses(18, 'meses')).toBe(18);
  });
});

describe('simular', () => {
  test('valor inicial e aportes com 1% ao mês por 12 meses', () => {
    const resultado = simular({ valorInicial: 1000, aporteMensal: 100, taxaMensal: 0.01, meses: 12 });
    expect(resultado.montante).toBe(2395.08);
    expect(resultado.totalInvestido).toBe(2200);
    expect(resultado.totalJuros).toBe(195.08);
    expect(resultado.tabela).toHaveLength(12);
  });

  test('taxa zero resulta apenas na soma dos aportes', () => {
    const resultado = simular({ valorInicial: 500, aporteMensal: 50, taxaMensal: 0, meses: 10 });
    expect(resultado.montante).toBe(1000);
    expect(resultado.totalJuros).toBe(0);
  });

  test('rejeita entradas inválidas', () => {
    const base = { valorInicial: 100, aporteMensal: 0, taxaMensal: 0.01, meses: 12 };
    expect(() => simular({ ...base, valorInicial: -1 })).toThrow('Valores não podem ser negativos');
    expect(() => simular({ ...base, taxaMensal: -0.01 })).toThrow('A taxa não pode ser negativa');
    expect(() => simular({ ...base, meses: 0 })).toThrow('O prazo deve ser de pelo menos 1 mês');
    expect(() => simular({ ...base, valorInicial: NaN })).toThrow('Preencha todos os campos com números válidos');
  });
});
