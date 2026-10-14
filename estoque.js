// ===== Funções auxiliares de DOM =====
const raiz = document.getElementById('resultado');

function parte(titulo) {
  const h2 = document.createElement('h2');
  h2.textContent = titulo;
  raiz.appendChild(h2);
}

function questao(codigo, enunciado) {
  const caixa = document.createElement('section');
  caixa.className = 'questao';

  const h3 = document.createElement('h3');
  h3.textContent = 'Questão ' + codigo;
  const p = document.createElement('p');
  p.className = 'enunciado';
  p.textContent = enunciado;

  caixa.append(h3, p);
  raiz.appendChild(caixa);
  return caixa;
}

function formatar(valor) {
  if (typeof valor === 'string') return valor;
  if (Array.isArray(valor) && valor.some(v => typeof v === 'object')) {
    return '[\n  ' + valor.map(v => JSON.stringify(v)).join(',\n  ') + '\n]';
  }
  return JSON.stringify(valor);
}

// Substitui o console.log: cria <div><span/><pre/></div> dentro da questão
function exibir(caixa, rotulo, valor) {
  const linha = document.createElement('div');
  linha.className = 'linha';

  const span = document.createElement('span');
  span.className = 'rotulo';
  span.textContent = rotulo;

  const pre = document.createElement('pre');
  pre.textContent = formatar(valor);

  linha.append(span, pre);
  caixa.appendChild(linha);
}

const moeda = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// ===== Parte 1: Declaração e Modificação Básica =====
parte('Parte 1: Declaração e Modificação Básica');

const categorias = ['Eletrônicos', 'Vestuário', 'Alimentos'];
let q = questao('1.1', 'Declarar o array categorias e exibi-lo.');
exibir(q, 'categorias', categorias);

const codigosProdutos = [101, 102, 103, 104];
const fornecedores = new Array('TechSupply', 'ModaExpress', 'SuperFoods');
q = questao('1.2', 'Criar codigosProdutos com colchetes e fornecedores com new Array().');
exibir(q, 'codigosProdutos', codigosProdutos);
exibir(q, 'fornecedores', fornecedores);

q = questao('1.3', 'Acessar o primeiro elemento e trocar "Vestuário" por "Calçados".');
exibir(q, 'categorias[0]', categorias[0]);
categorias[1] = 'Calçados';
exibir(q, 'categorias atualizado', categorias);

// ===== Parte 2: Inserção, Remoção e Pesquisa =====
parte('Parte 2: Inserção, Remoção e Pesquisa');

q = questao('2.1', 'push, pop, unshift e shift em sequência.');
categorias.push('Livros');
exibir(q, "push('Livros')", categorias);
categorias.pop();
exibir(q, 'pop()', categorias);
categorias.unshift('Brinquedos');
exibir(q, "unshift('Brinquedos')", categorias);
categorias.shift();
exibir(q, 'shift()', categorias);

q = questao('2.2', 'Exibir a propriedade length do array categorias.');
exibir(q, 'categorias.length', categorias.length);

q = questao('2.3', 'Usar indexOf() e includes().');
exibir(q, "categorias.indexOf('Calçados')", categorias.indexOf('Calçados'));
exibir(q, "categorias.includes('Eletrônicos')", categorias.includes('Eletrônicos'));

// ===== Parte 3: Iteração =====
parte('Parte 3: Iteração (Laços de Repetição)');

q = questao('3.1', 'Percorrer categorias com o laço for tradicional.');
for (let i = 0; i < categorias.length; i++) {
  exibir(q, 'índice ' + i, categorias[i]);
}

q = questao('3.2', 'Percorrer categorias com for...of.');
for (const categoria of categorias) {
  exibir(q, 'categoria', categoria);
}

// ===== Parte 4: Arrays de Objetos e Métodos Avançados =====
parte('Parte 4: Arrays de Objetos e Métodos Avançados');

const produtos = [
  { nome: 'Teclado Mecânico', preco: 250.00, estoque: 15 },
  { nome: 'Mouse Gamer', preco: 120.00, estoque: 8 },
  { nome: 'Monitor Ultrawide', preco: 1200.00, estoque: 4 }
];

q = questao('4.1', 'Acessar o nome do primeiro produto.');
exibir(q, 'produtos[0].nome', produtos[0].nome);

q = questao('4.2', 'filter(): produtos baratos e múltiplos de 100.');
const produtosBaratos = produtos.filter(p => p.preco < 300.00);
exibir(q, 'produtosBaratos (preco < 300)', produtosBaratos);
const precos = [50, 150, 200, 350, 400];
const multiplosDe100 = precos.filter(preco => preco % 100 === 0);
exibir(q, 'múltiplos de 100 em [50, 150, 200, 350, 400]', multiplosDe100);

q = questao('4.3', 'reduce(): total de itens e valor imobilizado no estoque.');
const quantidades = [2, 3, 5, 10];
const totalItens = quantidades.reduce((acc, qtd) => acc + qtd, 0);
exibir(q, 'total de itens em [2, 3, 5, 10]', totalItens);
const valorTotalEstoque = produtos.reduce((acc, p) => acc + p.preco * p.estoque, 0);
exibir(q, 'valor total imobilizado', moeda(valorTotalEstoque) + '  (' + valorTotalEstoque + ')');

q = questao('4.4', 'map(): desconto de 10% e lista de nomes.');
const precosOriginais = [100, 200, 300];
const precosComDesconto = precosOriginais.map(preco => preco * 0.9);
exibir(q, 'preços com 10% de desconto', precosComDesconto);
const nomesProdutos = produtos.map(p => p.nome);
exibir(q, 'nomesProdutos', nomesProdutos);

q = questao('4.5', 'slice() para copiar e sort() por preço crescente.');
const produtosOrdenados = produtos.slice().sort((a, b) => a.preco - b.preco);
exibir(q, 'cópia ordenada por preço', produtosOrdenados);

q = questao('4.6', 'some() e find() para identificar estoque crítico.');
const temEstoqueBaixo = produtos.some(p => p.estoque < 5);
exibir(q, 'algum produto com estoque < 5?', temEstoqueBaixo);

const inventario = [
  { nome: 'Teclado', estoque: 15 },
  { nome: 'Mouse', estoque: 2 },
  { nome: 'Headset', estoque: 10 }
];
const temCritico = inventario.some(item => item.estoque < 5);
exibir(q, 'inventário possui estoque crítico?', temCritico);
const itemCritico = inventario.find(item => item.estoque < 5);
exibir(q, 'primeiro item crítico', JSON.stringify(itemCritico));