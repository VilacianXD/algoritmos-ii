/* A11 · Funções que retornam ponteiro — Exercícios A10 e A11, questões 3, 4, 5, 6, 8 + exercícios dos slides A11. */
(function () {
  var R = String.raw;
  var L = 'Exercícios A10 e A11, questão ';
  var S = 'Slides A11, ';
  (window.EXS = window.EXS || {}).a11 = [

  { id: 'a11-s01', topic: 't-motivacao', ref: S + '“Imagine a seguinte situação”', title: 'Valor ou endereço', type: 'mc', make: function (p) {
    return { q: 'A função <code>' + p.f + '</code> devolve o ' + p.o + ' de um vetor, e depois é preciso <strong>alterar exatamente esse elemento</strong>. Qual cabeçalho permite isso?', opts: [
      ['`' + p.t + ' *' + p.f + '(' + p.t + ' v[], int n)`', 'Devolve o endereço do elemento; com ele dá para alterar no lugar.'],
      ['`' + p.t + ' ' + p.f + '(' + p.t + ' v[], int n)`', 'Devolve só uma cópia do valor; não se sabe onde ele está.'],
      ['`void ' + p.f + '(' + p.t + ' v[], int n)`', 'Sem retorno nenhum.'],
      ['`' + p.t + ' ' + p.f + '(' + p.t + ' *v[], int n)`', 'Isso muda o parâmetro (vetor de ponteiros), não o retorno.']] };
  }, p: [{ f: 'menorNota', o: 'menor valor', t: 'float' }, { f: 'maiorIdade', o: 'maior valor', t: 'int' }, { f: 'maiorPreco', o: 'maior preço', t: 'double' }] },

  { id: 'a11-q03', topic: 't-sintaxe', ref: L + '3', title: 'Ponteiro para o maior', type: 'drag', make: function (p) {
    return { q: 'Complete <code>int *maiorValor(int *a, int *b)</code> (empate devolve o primeiro) e o uso na main, que troca o maior por um novo número.', code: R`[[int *]]maiorValor(int *a, int *b) {
    if ([[*a >= *b]])
        return [[a]];
    return b;
}

int main() {
    int ${p.x} = ${p.xv}, ${p.y} = ${p.yv};
    int *m = maiorValor(&${p.x}, &${p.y});
    printf("Maior: %d\n", [[*m]]);
    *m = ${p.novo};
    printf("%d %d\n", ${p.x}, ${p.y});
    return 0;
}`, extra: [
      ['int', 'O retorno é um endereço: `int *`.'],
      ['*a > *b', 'Com `>` o empate devolveria b, mas o enunciado pede o primeiro.'],
      ['&a', 'a já é um endereço; `&a` seria int **.'],
      ['m', 'Sem `*` imprime o endereço.']],
      why: 'Depois de `*m = ' + p.novo + '`, a saída final é "' + (p.xv >= p.yv ? p.novo + ' ' + p.yv : p.xv + ' ' + p.novo) + '".' };
  }, p: [{ x: 'a', xv: 10, y: 'b', yv: 20, novo: 0 }, { x: 'n1', xv: 8, y: 'n2', yv: 8, novo: 1 }, { x: 'p', xv: 42, y: 'q', yv: 7, novo: 5 }] },

  { id: 'a11-q04', topic: 't-sintaxe', ref: L + '4', title: 'Conta com maior saldo', type: 'mc', make: function (p) {
    return { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
typedef struct {
    int numero;
    double saldo;
} Conta;
Conta *contaMaiorSaldo(Conta *c1, Conta *c2) {
    if (c1->saldo >= c2->saldo)
        return c1;
    return c2;
}

int main() {
    Conta a = {${p.na}, ${p.sa}}, b = {${p.nb}, ${p.sb}};
    Conta *sel = contaMaiorSaldo(&a, &b);
    sel->saldo += ${p.dep};
    printf("%d:%.0f %d:%.0f\n", a.numero, a.saldo, b.numero, b.saldo);
    return 0;
}`, opts: [[p.ok, 'O depósito foi feito pelo ponteiro na conta escolhida.'], [p.w1, p.y1], [p.w2, p.y2], [p.w3, p.y3]] };
  }, p: [
    { na: 1, sa: 500, nb: 2, sb: 800, dep: 100, ok: '1:500 2:900', w1: '1:600 2:800', y1: 'A conta 2 tem o maior saldo.', w2: '1:500 2:800', y2: 'sel aponta para b; o depósito altera b.', w3: '1:600 2:900', y3: 'Só uma conta recebe o depósito.' },
    { na: 7, sa: 300, nb: 9, sb: 300, dep: 50, ok: '7:350 9:300', w1: '7:300 9:350', y1: 'No empate a função devolve o primeiro (c1).', w2: '7:300 9:300', y2: 'O depósito altera a conta apontada.', w3: '7:350 9:350', y3: 'Só uma conta recebe o depósito.' },
    { na: 4, sa: 1200, nb: 5, sb: 90, dep: 10, ok: '4:1210 5:90', w1: '4:1200 5:100', y1: 'A conta 4 tem o maior saldo.', w2: '4:1200 5:90', y2: 'sel->saldo altera a conta original.', w3: '4:1210 5:100', y3: 'Só uma conta recebe o depósito.' }] },

  { id: 'a11-q05', topic: 't-null', ref: L + '5', title: 'Localizar um funcionário', type: 'fix', make: function (p) {
    return { q: 'A função devolve o funcionário com a matrícula procurada ou NULL. Ache a linha errada.', code: R`Funcionario *buscarFuncionario(Funcionario *f1, Funcionario *f2, int matricula) {
    if (f1->matricula == matricula) return f1;
    if (f2->matricula == matricula) return f2;
    ${p.bug};
}`, line: 4,
      fixes: [['return NULL;', 'Sem resultado, devolve-se o ponteiro nulo.'], ['return 0.0;', 'O retorno é um ponteiro, não um número real.'], ['return f1;', 'Devolveria um funcionário errado.']],
      why: 'Quando não encontra, a função devolve `NULL`, e a main testa antes de usar `->`.',
      pre: 'typedef struct { int matricula; double salario; int idade; } Funcionario;' };
  }, p: [{ bug: 'return -1' }, { bug: 'return' }, { bug: 'return &matricula' }] },

  { id: 'a11-q05b', topic: 't-null', ref: L + '5 (uso na main)', title: 'Testar antes de usar', type: 'mc', make: function (p) {
    return { q: 'Com <code>Funcionario *f = buscarFuncionario(&amp;a, &amp;b, ' + p.m + ');</code>, a matrícula ' + p.m + ' ' + (p.achou ? 'é a de b' : 'não existe') + '. O que a main deve fazer?', opts: p.achou ? [
      ['Testar `f != NULL` e, como é verdade, mostrar `f->salario`, que é o salário de b.', 'f aponta para b.'],
      ['Mostrar `f.salario`.', 'f é ponteiro: seta.'],
      ['Mostrar `*f->salario`.', 'salario já é um double; `*` sobre ele não compila.'],
      ['Mostrar `b->salario`.', 'b é a struct; usa ponto: `b.salario`.']] : [
      ['Testar `f != NULL`; como é NULL, avisar que não foi encontrado e não usar `f->`.', 'Acessar campo de NULL derruba o programa.'],
      ['Mostrar `f->salario` direto.', 'f é NULL aqui.'],
      ['Fazer `f = &a` e mostrar.', 'Mostraria o funcionário errado.'],
      ['Chamar `free(f)`.', 'Nada foi alocado.']] };
  }, p: [{ m: 2031, achou: true }, { m: 9999, achou: false }, { m: 1500, achou: false }] },

  { id: 'a11-s02', topic: 't-null', ref: S + 'exercício localizar', title: 'Primeira ocorrência ou NULL', type: 'drag', make: function (p) {
    return { q: 'Complete <code>' + p.t + ' *localizar(' + p.t + ' *' + p.v + ', int N, ' + p.t + ' ' + p.x + ')</code>: ponteiro para a primeira ocorrência de ' + p.x + ', ou NULL.', code: R`${p.t} *localizar(${p.t} *${p.v}, int N, ${p.t} ${p.x}) {
    for (int i = 0; [[i < N]]; i++)
        if (${p.v}[i] == ${p.x})
            return [[&${p.v}[i]]];
    return [[NULL]];
}`, extra: [[p.v + '[i]', 'Isso é o valor; a função devolve um endereço.'], ['i <= N', p.v + '[N] está fora do vetor.'], ['-1', '-1 é para índices; aqui o retorno é ponteiro.'], ['&i', 'Endereço da variável local i: inválido depois do return.']],
      why: 'Achou: `&' + p.v + '[i]`. Não achou: `NULL`.' };
  }, p: [{ t: 'int', v: 'vet', x: 'X' }, { t: 'float', v: 'notas', x: 'alvo' }, { t: 'char', v: 'texto', x: 'letra' }] },

  { id: 'a11-s03', topic: 't-vetor', ref: S + 'exercício trocar com NULL', title: 'Trocar se os índices forem válidos', type: 'fix', make: function (p) {
    return { q: '<code>int *trocar(int *vet, int N, int A, int B)</code> troca as posições A e B se forem válidas e devolve o vetor; senão devolve NULL sem alterar nada. Ache a linha errada.', code: R`int *trocar(int *vet, int N, int A, int B) {
    if (${p.cond})
        return NULL;
    int aux = vet[A];
    vet[A] = vet[B];
    vet[B] = aux;
    return ${p.ret};
}`, line: p.line,
      fixes: p.line === 2 ? [['if (A < 0 || A >= N || B < 0 || B >= N)', 'Inválido se qualquer índice sair de 0..N-1.'], ['if (A < 0 && A >= N && B < 0 && B >= N)', 'Nunca é verdade: um índice não pode ser negativo e maior que N ao mesmo tempo.'], ['if (A > N || B > N)', 'N já é inválido, e negativos passariam.']]
        : [['return vet;', 'vet já é o endereço do vetor.'], ['return &vet;', '`&vet` é o endereço do parâmetro (int **).'], ['return *vet;', 'Isso é o primeiro valor, um int.']],
      why: p.line === 2 ? 'Índices válidos vão de 0 a N-1.' : 'Devolve-se o próprio ponteiro recebido.' };
  }, p: [{ cond: 'A < 0 || A > N || B < 0 || B > N', ret: 'vet', line: 2 }, { cond: 'A < 0 || A >= N || B < 0 || B >= N', ret: '&vet', line: 7 }, { cond: 'A < 0 || A >= N || B < 0 || B >= N', ret: '*vet', line: 7 }] },

  { id: 'a11-s04', topic: 't-vetor', ref: S + 'menorNota com &notas[pos]', title: 'Corrigir a menor nota no lugar', type: 'mc', make: function (p) {
    return { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
float *menorNota(float notas[], int n) {
    int pos = 0;
    for (int i = 1; i < n; i++)
        if (notas[i] < notas[pos])
            pos = i;
    return &notas[pos];
}

int main() {
    float notas[4] = {${p.v.join(', ')}};
    float *m = menorNota(notas, 4);
    *m = *m + 1;
    printf("%.1f %.1f %.1f %.1f\n", notas[0], notas[1], notas[2], notas[3]);
    return 0;
}`, opts: [p.ok, p.a, p.b, p.c].map(function (o, i) { return [o, ['A menor nota recebeu +1 direto no vetor.', 'A função devolveu o endereço; a alteração aparece no vetor.', 'Só a menor nota muda.', 'Confira qual é a menor.'][i]]; }) };
  }, p: [
    { v: ['7.5', '5.0', '8.5', '6.0'], ok: '7.5 6.0 8.5 6.0', a: '7.5 5.0 8.5 6.0', b: '8.5 6.0 9.5 7.0', c: '7.5 5.0 8.5 7.0' },
    { v: ['3.0', '9.0', '4.5', '2.5'], ok: '3.0 9.0 4.5 3.5', a: '3.0 9.0 4.5 2.5', b: '4.0 10.0 5.5 3.5', c: '4.0 9.0 4.5 2.5' },
    { v: ['6.0', '6.5', '9.5', '7.0'], ok: '7.0 6.5 9.5 7.0', a: '6.0 6.5 9.5 7.0', b: '7.0 7.5 10.5 8.0', c: '6.0 7.5 9.5 7.0' }] },

  { id: 'a11-q06', topic: 't-alocar', ref: L + '6', title: 'Cadastro dinâmico de um livro', type: 'drag', make: function (p) {
    return { q: 'Complete a função que aloca um ' + p.t + ' e devolve seu endereço, e o uso na main.', code: R`[[${p.t} *]]alocar${p.t}() {
    ${p.t} *x = (${p.t} *) malloc([[sizeof(${p.t})]]);
    return [[x]];
}

/* na main: */
${p.t} *item = alocar${p.t}();
if ([[item == NULL]])
    return 1;
item->codigo = ${p.c};
strcpy(item->titulo, "${p.n}");
free(item);`, extra: [[p.t, 'O retorno é um endereço: `' + p.t + ' *`.'], ['&x', 'x já guarda o endereço do bloco.'], ['sizeof(x)', 'Tamanho do ponteiro, não da struct.'], ['item != NULL', 'O programa encerra quando a alocação falha.']],
      why: 'A memória do malloc continua viva depois do return, por isso devolver x é seguro.',
      pre: 'typedef struct { int codigo; char titulo[81]; double preco; } ' + p.t + ';' };
  }, p: [{ t: 'Livro', c: 7, n: 'Dom Casmurro' }, { t: 'Filme', c: 12, n: 'Central do Brasil' }, { t: 'Album', c: 3, n: 'Clube da Esquina' }] },

  { id: 'a11-q08', topic: 't-alocar', ref: L + '8', title: 'Produto de menor preço', type: 'fix', make: function (p) {
    return { q: 'Dois produtos alocados dinamicamente; a função devolve o de menor preço (empate: o primeiro). Ache a linha errada.', code: R`Produto *menorPreco(Produto *a, Produto *b) {
    if (${p.cond})
        return a;
    return b;
}
/* na main: */
Produto *p1 = (Produto *) malloc(sizeof(Produto));
Produto *p2 = (Produto *) malloc(sizeof(Produto));
if (p1 == NULL || p2 == NULL) return 1;
p1->preco = 9.9; p2->preco = 4.5;
Produto *sel = menorPreco(p1, p2);
printf("%d %.2f\n", sel->codigo, sel->preco);
${p.free};
free(p2);`, line: p.line,
      fixes: p.line === 2 ? [['if (a->preco <= b->preco)', 'Menor ou igual: no empate fica o primeiro.'], ['if (a->preco >= b->preco)', 'Escolheria o mais caro.'], ['if (a.preco <= b.preco)', 'a e b são ponteiros: seta.']]
        : [['free(p1);', 'Cada malloc tem seu free.'], ['free(sel);', 'sel aponta para p1 ou p2; liberar sel e depois p2 pode liberar o mesmo bloco duas vezes.'], ['free(*p1);', 'free recebe o ponteiro.']],
      why: p.line === 2 ? 'Menor preço com empate para o primeiro: `<=`.' : 'Os dois blocos alocados precisam de free, um cada.',
      pre: 'typedef struct { int codigo; double preco; int quantidade; } Produto;' };
  }, p: [{ cond: 'a->preco >= b->preco', free: 'free(p1)', line: 2 }, { cond: 'a->preco <= b->preco', free: 'free(sel)', line: 13 }, { cond: 'a->preco < b->preco', free: 'free(p1)', line: 2 }] }
  ];
})();

/* Variantes V2 e V3 escritas à mão (2026-11-18): outra tarefa, outra lógica, outro erro. V1 vem dos moldes acima.
   Gerado por _tools/gerar_alt.mjs a partir de _tools/alt/a11.alt.js; null = a versão do molde continua valendo. */
(function () {
  window.ALT = window.ALT || {};
  window.ALT['a11-s01'] = [
    {
      q: "A função <code>buscar</code> procura um aluno pela matrícula num vetor de <code>Aluno</code>, e a main precisa <strong>alterar a nota desse mesmo aluno</strong> no vetor. Qual cabeçalho permite isso?",
      opts: [
        ["`Aluno *buscar(Aluno v[], int n, int mat)`", "Devolver o endereço do elemento permite alterá-lo no lugar."],
        ["`Aluno buscar(Aluno v[], int n, int mat)`", "Devolve uma cópia: mudar a cópia não muda o vetor."],
        ["`void buscar(Aluno v[], int n, int mat)`", "Não devolve nada que a main possa usar."],
        ["`Aluno buscar(Aluno *v[], int n, int mat)`", "Continua devolvendo uma cópia."]
      ]
    },
    {
      q: "Com <code>float *menorNota(float v[], int n)</code>, qual linha guarda o que a função devolve de um jeito que depois permite alterar o elemento no vetor?",
      opts: [
        ["`float *m = menorNota(notas, 4);`", "m guarda o endereço do elemento; `*m = ...` altera o vetor."],
        ["`float m = menorNota(notas, 4);`", "Não compila como o esperado: um ponteiro não cabe num float comum."],
        ["`float *m = *menorNota(notas, 4);`", "Desreferenciaria o resultado antes de guardar."],
        ["`float m = &menorNota(notas, 4);`", "Não se toma o endereço do retorno de uma função."]
      ]
    }
  ];
  window.ALT['a11-q03'] = [
    {
      q: "Complete <code>int *posMenor(int *v, int n)</code>, que devolve o endereço do menor elemento, e o uso na main.",
      code: "[[int *]]posMenor(int *v, int n) {\n    int *m = [[v]];\n    for (int i = 1; i < n; i++)\n        if ([[v[i] < *m]])\n            m = [[&v[i]]];\n    return m;\n}\n\nint main() {\n    int notas[4] = {7, 3, 9, 5};\n    int *p = posMenor(notas, 4);\n    *p = [[*p + 10]];\n    printf(\"%d %d %d %d\\n\", notas[0], notas[1], notas[2], notas[3]);\n    return 0;\n}",
      extra: [
        ["*v", "Isso é o valor do primeiro elemento, não o endereço."],
        ["v[i] > *m", "Procuraria o maior."],
        ["v[i]", "m guarda um endereço, não um valor."],
        ["p + 10", "Avançaria o ponteiro, sem alterar o elemento."]
      ],
      why: "m começa no primeiro elemento e passa a apontar para qualquer um menor; `*p` altera o elemento original."
    },
    {
      q: "Complete <code>int *maior(int *a, int *b)</code> e use o resultado dentro de outra chamada na main.",
      code: "[[int *]]maior(int *a, int *b) {\n    return [[*a > *b]] ? a : b;\n}\n\nint main() {\n    int x = 4, y = 9, z = 6;\n    int *g = maior([[maior(&x, &y)]], &z);\n    *g = [[0]];\n    printf(\"%d %d %d\\n\", x, y, z);\n    return 0;\n}",
      extra: [
        ["int", "Devolveria um número, mas a função devolve ponteiros."],
        ["*a < *b", "Devolveria o menor."],
        ["maior(x, y)", "A função espera endereços."],
        ["&maior(&x, &y)", "Não se toma o endereço do retorno de uma função."]
      ],
      why: "A chamada de dentro devolve `&y`; a de fora compara `y` com `z` e devolve `&y` de novo, então `y` vira 0."
    }
  ];
  window.ALT['a11-q04'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\ntypedef struct {\n    int numero;\n    double saldo;\n} Conta;\nConta *maisRica(Conta *v, int n) {\n    int pos = 0;\n    for (int i = 1; i < n; i++)\n        if (v[i].saldo > v[pos].saldo)\n            pos = i;\n    return &v[pos];\n}\n\nint main() {\n    Conta cs[3] = {{1, 300}, {2, 900}, {3, 900}};\n    Conta *r = maisRica(cs, 3);\n    r->saldo -= 400;\n    printf(\"%d:%.0f %d:%.0f %d:%.0f\\n\", cs[0].numero, cs[0].saldo, cs[1].numero, cs[1].saldo, cs[2].numero, cs[2].saldo);\n    return 0;\n}",
      opts: [
        ["1:300 2:500 3:900", "O `>` estrito mantém a primeira das duas contas empatadas (a número 2)."],
        ["1:300 2:900 3:500", "Com empate, o `>` não troca: fica a conta 2, não a 3."],
        ["1:300 2:500 3:500", "Só uma conta é alterada: a apontada por r."],
        ["1:-100 2:900 3:900", "A conta 1 tem o menor saldo, não o maior."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\ntypedef struct {\n    int numero;\n    double saldo;\n} Conta;\nConta *buscar(Conta *v, int n, int num) {\n    for (int i = 0; i < n; i++)\n        if (v[i].numero == num)\n            return &v[i];\n    return NULL;\n}\n\nint main() {\n    Conta cs[3] = {{1, 100}, {2, 200}, {3, 300}};\n    Conta *c1 = buscar(cs, 3, 2), *c2 = buscar(cs, 3, 5);\n    if (c1 != NULL)\n        c1->saldo *= 2;\n    printf(\"%.0f %s %.0f\\n\", cs[1].saldo, c2 == NULL ? \"NULL\" : \"ok\", cs[2].saldo);\n    return 0;\n}",
      opts: [
        ["400 NULL 300", "A conta 2 existe e dobra; a 5 não existe, então c2 é NULL."],
        ["200 NULL 300", "c1 aponta para cs[1], que dobrou."],
        ["400 ok 300", "Não há conta número 5: c2 é NULL."],
        ["400 NULL 600", "Só a conta apontada por c1 foi alterada."]
      ]
    }
  ];
  window.ALT['a11-q05'] = [
    {
      q: "A função devolve o funcionário com a matrícula procurada ou NULL. Ache a linha errada.",
      code: "Funcionario *buscarFuncionario(Funcionario *f1, Funcionario *f2, int matricula) {\n    if (f1->matricula = matricula) return f1;\n    if (f2->matricula == matricula) return f2;\n    return NULL;\n}",
      line: 2,
      fixes: [
        ["if (f1->matricula == matricula) return f1;", "`==` compara a matrícula; é o que a busca pede."],
        ["if (f1->matricula != matricula) return f1;", "Devolveria o funcionário errado."],
        ["if (f1.matricula == matricula) return f1;", "f1 é ponteiro: o ponto não vale."]
      ],
      why: "Um único `=` atribui a matrícula procurada ao campo, e a condição passa a valer sempre que ela não for zero.",
      pre: "typedef struct { int matricula; double salario; int idade; } Funcionario;"
    },
    {
      q: "A função devolve o endereço do funcionário com a matrícula procurada no vetor, ou NULL. Ache a linha errada.",
      code: "Funcionario *buscar(Funcionario *v, int n, int matricula) {\n    for (int i = 0; i <= n; i++)\n        if (v[i].matricula == matricula)\n            return &v[i];\n    return NULL;\n}",
      line: 2,
      fixes: [
        ["for (int i = 0; i < n; i++)", "As posições válidas vão de 0 a n-1."],
        ["for (int i = 1; i <= n; i++)", "Ainda lê v[n] e ignora v[0]."],
        ["for (int i = 0; i < n - 1; i++)", "Deixaria o último funcionário sem verificar."]
      ],
      why: "Com `i <= n` o laço lê `v[n]`, fora do vetor.",
      pre: "typedef struct { int matricula; double salario; int idade; } Funcionario;"
    }
  ];
  window.ALT['a11-q05b'] = [
    {
      q: "O trecho abaixo trava o programa quando a matrícula não existe. Qual é o problema?",
      nocc: true,
      code: "Funcionario *f = buscarFuncionario(&a, &b, 9999);\nprintf(\"%.2f\\n\", f->salario);",
      opts: [
        ["Não testa se `f` é NULL antes de usar `f->salario`.", "Se a busca falhar, f é NULL e acessar um campo dele derruba o programa."],
        ["`f->salario` deveria ser `f.salario`.", "f é ponteiro; a seta está certa."],
        ["`buscarFuncionario` não pode receber endereços.", "Receber `&a` e `&b` é exatamente o esperado."],
        ["Falta um `free(f)` antes do printf.", "Nada foi alocado com malloc aqui."]
      ]
    },
    {
      q: "Qual condição testa corretamente se a busca encontrou o funcionário?",
      nocc: true,
      code: "Funcionario *f = buscarFuncionario(&a, &b, 1500);",
      opts: [
        ["`if (f != NULL)`", "A função devolve NULL quando não encontra; qualquer outro valor é um funcionário."],
        ["`if (f->salario != NULL)`", "Se f for NULL, essa condição já acessa memória inválida; e salario é double."],
        ["`if (*f != NULL)`", "`*f` é a struct, que não se compara com NULL."],
        ["`if (f == 0.0)`", "Ponteiros não se comparam com números reais."]
      ]
    }
  ];
  window.ALT['a11-s02'] = [
    {
      q: "Complete <code>int *maiorElem(int *vet, int N)</code>: ponteiro para o maior elemento, ou NULL se o vetor estiver vazio.",
      code: "int *maiorElem(int *vet, int N) {\n    if ([[N <= 0]])\n        return [[NULL]];\n    int *m = vet;\n    for (int i = 1; i < N; i++)\n        if ([[vet[i] > *m]])\n            m = [[&vet[i]]];\n    return m;\n}",
      extra: [
        ["N < 0", "Um vetor com N = 0 também é vazio."],
        ["vet[i] > m", "Compara um valor com um endereço."],
        ["vet[i]", "m guarda o endereço, não o valor."],
        ["-1", "Um ponteiro vazio é NULL."]
      ],
      why: "Vazio devolve NULL; senão m começa no primeiro e passa a apontar para cada elemento maior."
    },
    {
      q: "Complete <code>int *buscar(int *ini, int *fim, int x)</code>, que percorre com ponteiro de <code>ini</code> até antes de <code>fim</code> e devolve o endereço de x, ou NULL.",
      code: "int *buscar(int *ini, int *fim, int x) {\n    for (int *p = ini; [[p < fim]]; [[p++]])\n        if ([[*p == x]])\n            return [[p]];\n    return NULL;\n}",
      extra: [
        ["p <= fim", "`fim` está fora da região a percorrer."],
        ["p--", "Andaria para trás."],
        ["p == x", "Compara um endereço com um valor."],
        ["*p", "Devolveria o valor, e a função devolve ponteiro."]
      ],
      why: "p percorre a região; `*p` é o valor atual e `p` é o endereço a devolver."
    }
  ];
  window.ALT['a11-s03'] = [
    {
      q: "<code>int *zerar(int *vet, int N, int pos)</code> zera a posição <code>pos</code> se ela for válida e devolve o endereço dela; senão devolve NULL. Ache a linha errada.",
      code: "int *zerar(int *vet, int N, int pos) {\n    if (pos < 0 || pos >= N)\n        return NULL;\n    vet[pos] == 0;\n    return &vet[pos];\n}",
      line: 4,
      fixes: [
        ["vet[pos] = 0;", "Atribuição grava o zero na posição."],
        ["vet[pos] = pos;", "Gravaria o índice, não zero."],
        ["*vet = 0;", "Zeraria o primeiro elemento, não o da posição pedida."]
      ],
      why: "`==` só compara e descarta o resultado; para zerar é preciso `=`."
    },
    {
      q: "<code>int *ultimo(int *vet, int N)</code> devolve o endereço do último elemento, ou NULL se o vetor for vazio. Ache a linha errada.",
      code: "int *ultimo(int *vet, int N) {\n    if (N <= 0)\n        return NULL;\n    return vet + N;\n}",
      line: 4,
      fixes: [
        ["return vet + N - 1;", "O último elemento está N-1 posições à frente do início."],
        ["return vet + N + 1;", "Passaria ainda mais do fim."],
        ["return *(vet + N - 1);", "Devolveria o valor, e a função devolve ponteiro."]
      ],
      why: "`vet + N` é o endereço logo depois do fim do vetor; o último elemento está em `vet + N - 1`."
    }
  ];
  window.ALT['a11-s04'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint *ultimoPar(int v[], int n) {\n    int *r = NULL;\n    for (int i = 0; i < n; i++)\n        if (v[i] % 2 == 0)\n            r = &v[i];\n    return r;\n}\n\nint main() {\n    int v[5] = {3, 8, 5, 6, 7};\n    int *p = ultimoPar(v, 5);\n    *p = *p / 2;\n    p = ultimoPar(v, 3);\n    *p += 1;\n    printf(\"%d %d %d %d %d\\n\", v[0], v[1], v[2], v[3], v[4]);\n    return 0;\n}",
      opts: [
        ["3 9 5 3 7", "Primeira chamada: último par é 6 (vira 3). Segunda, só nas 3 primeiras posições: o par é 8 (vira 9)."],
        ["3 8 5 3 7", "A segunda chamada altera o 8 para 9."],
        ["3 9 5 6 7", "A primeira chamada achou o 6 e o dividiu por 2."],
        ["4 8 5 3 7", "O 3 é ímpar e não é apontado em nenhuma das chamadas."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nfloat *primeiroAcima(float v[], int n, float lim) {\n    for (int i = 0; i < n; i++)\n        if (v[i] > lim)\n            return &v[i];\n    return NULL;\n}\n\nint main() {\n    float t[4] = {18.5, 22.0, 30.5, 25.0};\n    float *p = primeiroAcima(t, 4, 24.0);\n    float *q = primeiroAcima(t, 4, 40.0);\n    if (p != NULL)\n        *p -= 10;\n    if (q != NULL)\n        *q = 0;\n    printf(\"%.1f %.1f %.1f %.1f\\n\", t[0], t[1], t[2], t[3]);\n    return 0;\n}",
      opts: [
        ["18.5 22.0 20.5 25.0", "O primeiro acima de 24 é 30.5 (vira 20.5); acima de 40 não há, q é NULL e nada é gravado."],
        ["18.5 22.0 30.5 25.0", "p aponta para t[2] e `*p -= 10` altera o vetor."],
        ["18.5 22.0 30.5 15.0", "O primeiro acima de 24 é o 30.5, não o 25.0."],
        ["18.5 22.0 20.5 0.0", "q é NULL: o `if` impede a gravação."]
      ]
    }
  ];
  window.ALT['a11-q06'] = [
    {
      q: "Complete a função que aloca um acervo com <code>n</code> livros e devolve seu endereço, e o uso na main.",
      code: "[[Livro *]]alocarAcervo(int n) {\n    Livro *x = (Livro *) malloc([[n * sizeof(Livro)]]);\n    return x;\n}\n\n/* na main: */\nLivro *acervo = alocarAcervo(3);\nif (acervo == NULL)\n    return 1;\n[[acervo[1].codigo]] = 5;\nstrcpy(acervo[1].titulo, \"Iracema\");\nprintf(\"%d %s\\n\", acervo[1].codigo, acervo[1].titulo);\n[[free(acervo)]];",
      extra: [
        ["Livro", "Devolveria uma struct, e a função devolve o endereço do bloco."],
        ["sizeof(Livro)", "Reserva um único livro."],
        ["acervo->codigo[1]", "A ordem está trocada: o índice vem antes do campo."],
        ["free(acervo[0])", "free recebe o endereço do bloco, não um elemento."]
      ],
      why: "O bloco tem `n * sizeof(Livro)` bytes; `acervo[1].codigo` é o campo do segundo livro; um único `free` libera tudo.",
      pre: "typedef struct { int codigo; char titulo[81]; double preco; } Livro;"
    },
    {
      q: "Complete a função que aloca um Livro, lê o código e devolve o endereço (ou NULL se faltar memória), e o uso na main.",
      code: "Livro *lerLivro() {\n    Livro *x = (Livro *) malloc(sizeof(Livro));\n    if ([[x == NULL]])\n        return [[NULL]];\n    scanf(\"%d\", [[&x->codigo]]);\n    scanf(\"%80s\", x->titulo);\n    return x;\n}\n\n/* na main: */\nLivro *l = lerLivro();\nif (l != NULL) {\n    printf(\"%d %s\\n\", l->codigo, l->titulo);\n    [[free(l)]];\n}",
      extra: [
        ["x != NULL", "Retornaria NULL justamente quando a alocação deu certo."],
        ["-1", "A função devolve ponteiro; o sinal de falha é NULL."],
        ["x->codigo", "scanf precisa do endereço do campo."],
        ["free(&l)", "free recebe o endereço do bloco, que está em l."]
      ],
      why: "Falha de malloc vira NULL para quem chamou; `&x->codigo` é o endereço do campo; ao final, `free(l)`.",
      pre: "typedef struct { int codigo; char titulo[81]; double preco; } Livro;"
    }
  ];
  window.ALT['a11-q08'] = [
    {
      q: "Dois produtos alocados dinamicamente; a função devolve o de menor preço e o programa aumenta esse preço em 10%. Ache a linha errada.",
      code: "Produto *menorPreco(Produto *a, Produto *b) {\n    if (a->preco <= b->preco)\n        return a;\n    return b;\n}\n\n/* na main: */\nProduto *p1 = (Produto *) malloc(sizeof(Produto));\nProduto *p2 = (Produto *) malloc(sizeof(Produto));\nif (p1 == NULL || p2 == NULL) return 1;\np1->preco = 9.9;\np2->preco = 4.5;\nProduto *sel = menorPreco(p1, p2);\nsel->preco * 1.1;\nprintf(\"%.2f %.2f\\n\", p1->preco, p2->preco);\nfree(p1);\nfree(p2);",
      line: 14,
      fixes: [
        ["sel->preco *= 1.1;", "`*=` calcula e grava o novo preço no produto apontado."],
        ["sel->preco == 1.1;", "Só compara."],
        ["sel = sel->preco * 1.1;", "Atribuiria um número a um ponteiro."]
      ],
      why: "`sel->preco * 1.1;` calcula e descarta; é preciso gravar com `*=`.",
      pre: "typedef struct { int codigo; double preco; int quantidade; } Produto;"
    },
    {
      q: "Dois produtos alocados dinamicamente; a função devolve o de menor preço. O programa deve parar se <strong>qualquer</strong> alocação falhar. Ache a linha errada.",
      code: "Produto *menorPreco(Produto *a, Produto *b) {\n    if (a->preco <= b->preco)\n        return a;\n    return b;\n}\n\n/* na main: */\nProduto *p1 = (Produto *) malloc(sizeof(Produto));\nProduto *p2 = (Produto *) malloc(sizeof(Produto));\nif (p1 == NULL && p2 == NULL) return 1;\np1->preco = 9.9;\np2->preco = 4.5;\nProduto *sel = menorPreco(p1, p2);\nprintf(\"%d %.2f\\n\", sel->codigo, sel->preco);\nfree(p1);\nfree(p2);",
      line: 10,
      fixes: [
        ["if (p1 == NULL || p2 == NULL) return 1;", "Basta uma das duas falhar para o programa parar."],
        ["if (p1 != NULL || p2 != NULL) return 1;", "Pararia quando a alocação dá certo."],
        ["if (p1 == NULL) return 1;", "Ignora a falha de p2."]
      ],
      why: "Com `&&` o programa só para se as duas falharem; se só uma falhar ele segue e acessa NULL.",
      pre: "typedef struct { int codigo; double preco; int quantidade; } Produto;"
    }
  ];
})();
