/* A10 · Ponteiros para structs — Exercícios A10 e A11, questões 1, 2, 7, 9, 10 + exercícios dos slides A10. */
(function () {
  var R = String.raw;
  var L = 'Exercícios A10 e A11, questão ';
  var S = 'Slides A10, ';
  (window.EXS = window.EXS || {}).a10 = [

  { id: 'a10-s01', topic: 't-ponteiro-struct', ref: S + 'exercício do ponto 2D', title: 'Apontar para a struct', type: 'drag', make: function (p) {
    return { q: 'Crie um ' + p.t + ', faça um ponteiro apontar para ele e imprima os campos pelo ponteiro.', code: R`typedef struct {
    int ${p.a};
    int ${p.b};
}
${p.t};

int main() {
    ${p.t} ${p.v} = {${p.va}, ${p.vb}};
    [[${p.t} *]]ptr = [[&${p.v}]];
    printf("%d %d\n", [[ptr->${p.a}]], ptr->${p.b});
    return 0;
}`, extra: [
      ['int *', 'O ponteiro precisa ser do tipo da struct, ' + p.t + ' *.'],
      [p.v, 'Sem `&` o ponteiro receberia a struct, não o endereço.'],
      ['ptr.' + p.a, 'ptr é ponteiro: use a seta.'],
      ['*ptr.' + p.a, 'Sem parênteses o ponto age antes do `*`.']],
      why: 'Ponteiro do tipo da struct, recebendo `&variável`, e campos lidos com `->`.' };
  }, p: [{ t: 'Ponto', a: 'x', b: 'y', v: 'pt', va: 3, vb: 7 }, { t: 'Data', a: 'dia', b: 'mes', v: 'hoje', va: 18, vb: 11 }, { t: 'Placar', a: 'casa', b: 'fora', v: 'jogo', va: 2, vb: 1 }] },

  { id: 'a10-s02', topic: 't-seta', ref: S + 'acesso aos campos', title: 'Ponto, seta ou asterisco', type: 'mc', make: function (p) {
    return { q: 'Com <code>' + p.t + ' ' + p.v + ', *' + p.ptr + ' = &amp;' + p.v + ';</code>, qual linha NÃO altera o campo <code>' + p.c + '</code> de ' + p.v + '?', opts: [
      ['`*' + p.ptr + '.' + p.c + ' = ' + p.val + ';`', 'Sem parênteses, o ponto age primeiro sobre o ponteiro: não compila.'],
      ['`' + p.ptr + '->' + p.c + ' = ' + p.val + ';`', 'Forma com seta: altera o campo de ' + p.v + '.'],
      ['`(*' + p.ptr + ').' + p.c + ' = ' + p.val + ';`', 'Desreferencia e usa o ponto: equivalente à seta.'],
      ['`' + p.v + '.' + p.c + ' = ' + p.val + ';`', 'Acesso direto pela variável struct.']] };
  }, p: [{ t: 'Agenda', v: 'contato1', ptr: 'contato2', c: 'telefone', val: 99998888 }, { t: 'Aluno', v: 'al', ptr: 'pa', c: 'nota', val: '8.5' }, { t: 'Conta', v: 'c', ptr: 'pc', c: 'saldo', val: '100.0' }] },

  { id: 'a10-q01', topic: 't-funcoes', ref: L + '1', title: 'Cadastro de um produto', type: 'drag', make: function (p) {
    return { q: 'Complete as funções que preenchem e imprimem um ' + p.t + ' recebendo o endereço da variável da main.', code: R`typedef struct {
    int ${p.a};
    double ${p.b};
    int ${p.c};
}
${p.t};

void preencher${p.t}([[${p.t} *x]]) {
    scanf("%d %lf %d", &x->${p.a}, [[&x->${p.b}]], &x->${p.c});
}

void imprimir${p.t}(${p.t} *x) {
    printf("%d %.2f %d\n", [[x->${p.a}]], x->${p.b}, x->${p.c});
}

int main() {
    ${p.t} item;
    preencher${p.t}([[&item]]);
    imprimir${p.t}(&item);
    return 0;
}`, extra: [
      [p.t + ' x', 'Por valor, o preenchimento ficaria na cópia.'],
      ['x->' + p.b, 'scanf precisa do endereço do campo: `&x->' + p.b + '`.'],
      ['x.' + p.a, 'x é ponteiro: seta, não ponto.'],
      ['item', 'A função espera um endereço: `&item`.']],
      why: 'A main envia `&item`; dentro das funções, os campos são acessados com `->`.' };
  }, p: [{ t: 'Produto', a: 'codigo', b: 'preco', c: 'quantidade' }, { t: 'Livro', a: 'codigo', b: 'preco', c: 'paginas' }, { t: 'Lote', a: 'numero', b: 'peso', c: 'caixas' }] },

  { id: 'a10-q02', topic: 't-funcoes', ref: L + '2', title: 'Atualizar a nota de um aluno', type: 'fix', make: function (p) {
    return { q: 'A função deve atualizar a nota somente se a nova nota estiver entre ' + p.min + ' e ' + p.max + '. Ache a linha errada.', code: R`typedef struct {
    int matricula;
    double nota;
} Aluno;

void atualizarNota(Aluno *a, double nova) {
    if (${p.cond})
        ${p.atr};
}`, line: p.line,
      fixes: p.line === 7 ? [['if (nova >= ' + p.min + ' && nova <= ' + p.max + ')', 'As duas condições precisam valer: `&&`.'], ['if (nova >= ' + p.min + ' || nova <= ' + p.max + ')', 'Com `||` qualquer número passa.'], ['if (' + p.min + ' <= nova <= ' + p.max + ')', 'Em C essa comparação encadeada não faz o que parece.']]
        : [['a->nota = nova;', 'a é ponteiro: seta.'], ['a.nota = nova;', 'Ponto é para variável struct, não ponteiro.'], ['*a.nota = nova;', 'Sem parênteses, o ponto vem antes do `*`.']],
      why: p.line === 7 ? 'O intervalo fechado pede `nova >= ' + p.min + ' && nova <= ' + p.max + '`.' : 'Campo via ponteiro: `a->nota`.' };
  }, p: [{ min: 0, max: 10, cond: 'nova >= 0 || nova <= 10', atr: 'a->nota = nova', line: 7 }, { min: 0, max: 10, cond: 'nova >= 0 && nova <= 10', atr: 'a.nota = nova', line: 8 }, { min: 0, max: 100, cond: '0 <= nova <= 100', atr: 'a->nota = nova', line: 7 }] },

  { id: 'a10-s03', topic: 't-funcoes', ref: S + 'exercício do retângulo', title: 'Área por ponteiro', type: 'mc', make: function (p) {
    return { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
typedef struct {
    double largura, altura;
} Retangulo;
double calcularArea(Retangulo *r) {
    return r->largura * r->altura;
}

int main() {
    Retangulo ret = {${p.l}, ${p.a}};
    Retangulo *pr = &ret;
    pr->altura = pr->altura + ${p.inc};
    printf("%.1f\n", calcularArea(&ret));
    return 0;
}`, opts: [[(p.l * (p.a + p.inc)).toFixed(1), 'pr aponta para ret, então a altura mudou antes do cálculo.'], [(p.l * p.a).toFixed(1), 'A altura foi alterada pelo ponteiro antes da chamada.'], [(p.l + p.a + p.inc).toFixed(1), 'A área multiplica largura e altura.'], ['Erro de compilação.', 'O código é válido.']] };
  }, p: [{ l: 4, a: 2.5, inc: 1 }, { l: 3, a: 3, inc: 2 }, { l: 2, a: 4, inc: 0.5 }] },

  { id: 'a10-s04', topic: 't-dinamica', ref: S + 'exercício da Pessoa', title: 'Uma Pessoa na heap', type: 'drag', make: function (p) {
    return { q: 'Aloque uma única ' + p.t + ', preencha com seta, imprima e libere.', code: R`${p.t} *p = (${p.t} *) malloc([[sizeof(${p.t})]]);
if ([[p == NULL]])
    return 1;
strcpy([[p->nome]], "${p.n}");
p->idade = ${p.i};
printf("%s %d\n", p->nome, p->idade);
[[free(p)]];`, extra: [
      ['sizeof(' + p.t + ' *)', 'Esse é o tamanho de um ponteiro, não da struct.'],
      ['sizeof(p)', 'p é um ponteiro: daria o tamanho do ponteiro.'],
      ['p.nome', 'p é ponteiro: seta.'],
      ['free(*p)', 'free recebe o ponteiro.']],
      why: 'Uma struct: `malloc(sizeof(' + p.t + '))`. Campos com `->`, e `free(p)` no fim.',
      pre: 'typedef struct { char nome[50]; int idade; } ' + p.t + ';' };
  }, p: [{ t: 'Pessoa', n: 'Marina', i: 19 }, { t: 'Cliente', n: 'Joao', i: 42 }, { t: 'Atleta', n: 'Bia', i: 23 }] },

  { id: 'a10-s05', topic: 't-dinamica', ref: S + 'exercício alocarAluno', title: 'Alocar, preencher, imprimir', type: 'fix', make: function (p) {
    return { q: 'Programa dos slides: <code>alocarAluno</code> devolve o ponteiro, as outras funções usam esse ponteiro. Ache a linha errada.', code: R`Aluno *alocarAluno() {
    Aluno *a = (Aluno *) malloc(sizeof(Aluno));
    return a;
}

int main() {
    Aluno *al = alocarAluno();
    if (al == NULL) return 1;
    preencherDados(al);
    imprimirDados(${p.bug});
    free(al);
    return 0;
}`, line: 10,
      fixes: [['imprimirDados(al);', 'al já é o ponteiro que a função espera.'], ['imprimirDados(&al);', '`&al` é o endereço do ponteiro (Aluno **).'], ['imprimirDados(*al);', '`*al` é a struct, não o ponteiro.']],
      why: 'al já guarda o endereço da struct alocada; passa-se al direto.',
      pre: 'typedef struct { int matricula; double nota; } Aluno;\nvoid preencherDados(Aluno *a) { a->matricula = 1; a->nota = 7.5; }\nvoid imprimirDados(Aluno *a) { printf("%d %.2f\\n", a->matricula, a->nota); }' };
  }, p: [{ bug: '&al' }, { bug: '*al' }, { bug: 'al->nota' }] },

  { id: 'a10-q07', topic: 't-dinamica', ref: L + '7', title: 'Reajuste salarial', type: 'mc', make: function (p) {
    return { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
#include <stdlib.h>
typedef struct {
    int matricula;
    double salario;
    double percentualReajuste;
} Funcionario;
void reajustar(Funcionario *f) {
    f->salario = f->salario * (1 + f->percentualReajuste / 100);
}

int main() {
    Funcionario *f = (Funcionario *) malloc(sizeof(Funcionario));
    if (f == NULL)
        return 1;
    f->matricula = ${p.m};
    f->salario = ${p.s};
    f->percentualReajuste = ${p.pc};
    reajustar(f);
    printf("%d %.2f\n", f->matricula, f->salario);
    free(f);
    return 0;
}`, opts: [[p.m + ' ' + (p.s * (1 + p.pc / 100)).toFixed(2), 'Salário vezes (1 + percentual/100).'], [p.m + ' ' + p.s.toFixed(2), 'reajustar recebeu o ponteiro e alterou a struct.'], [p.m + ' ' + (p.s + p.pc).toFixed(2), 'O percentual não é somado direto.'], [p.m + ' ' + (p.s * p.pc / 100).toFixed(2), 'Isso é só o valor do aumento.']] };
  }, p: [{ m: 101, s: 2000, pc: 10 }, { m: 345, s: 3500, pc: 4 }, { m: 77, s: 1800, pc: 15 }] },

  { id: 'a10-q09', topic: 't-dinamica', ref: L + '9', title: 'Consumo de energia', type: 'drag', make: function (p) {
    var v = (p.at - p.an) / p.an * 100;
    return { q: 'Residência com consumo anterior ' + p.an + ' kWh e atual ' + p.at + ' kWh. Complete o cálculo da variação percentual e da classificação (o resultado aqui é ' + v.toFixed(1) + '%, ' + (v > 0 ? 'aumento' : v < 0 ? 'redução' : 'manutenção') + ').', code: R`double variacao(Residencia *r) {
    return [[(r->consumoAtual - r->consumoAnterior)]] / r->consumoAnterior * 100;
}

void exibir(Residencia *r) {
    double v = [[variacao(r)]];
    printf("%d: %.1f%% ", r->codigo, v);
    if ([[v > 0]])
        printf("aumento\n");
    else if (v < 0)
        printf("reducao\n");
    else
        printf("manutencao\n");
}`, extra: [
      ['(r->consumoAnterior - r->consumoAtual)', 'Inverte o sinal: aumento sairia negativo.'],
      ['variacao(&r)', 'r já é ponteiro; `&r` seria Residencia **.'],
      ['v >= 0', 'Com `>=` a manutenção (0%) cairia em aumento.'],
      ['(r.consumoAtual - r.consumoAnterior)', 'r é ponteiro: use a seta.']],
      why: 'Variação = (atual − anterior) ÷ anterior × 100. Positiva é aumento, negativa é redução, zero é manutenção.',
      pre: 'typedef struct { int codigo; double consumoAnterior; double consumoAtual; } Residencia;' };
  }, p: [{ an: 200, at: 250 }, { an: 320, at: 240 }, { an: 150, at: 150 }] },

  { id: 'a10-q10', topic: 't-dinamica', ref: L + '10', title: 'Empréstimo aprovado?', type: 'mc', make: function (p) {
    var parc = p.v / p.n, ok = parc <= 0.3 * p.r;
    return { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
#include <stdlib.h>
typedef struct {
    int numero;
    double rendaMensal;
    double valorSolicitado;
    int quantidadeParcelas;
} Emprestimo;
double parcela(Emprestimo *e) {
    return e->valorSolicitado / e->quantidadeParcelas;
}

int main() {
    Emprestimo *e = (Emprestimo *) malloc(sizeof(Emprestimo));
    if (e == NULL)
        return 1;
    e->numero = 1;
    e->rendaMensal = ${p.r};
    e->valorSolicitado = ${p.v};
    e->quantidadeParcelas = ${p.n};
    double pa = parcela(e);
    printf("%.2f %s\n", pa, pa <= 0.3 * e->rendaMensal ? "aprovado" : "negado");
    free(e);
    return 0;
}`, opts: [[parc.toFixed(2) + ' ' + (ok ? 'aprovado' : 'negado'), 'Parcela = ' + p.v + ' / ' + p.n + '; limite = 30% de ' + p.r + ' = ' + (0.3 * p.r).toFixed(2) + '.'], [parc.toFixed(2) + ' ' + (ok ? 'negado' : 'aprovado'), 'Compare a parcela com 30% da renda: ' + (0.3 * p.r).toFixed(2) + '.'], [(p.v * p.n).toFixed(2) + ' negado', 'A parcela é o valor dividido pelas parcelas.'], [(p.v / p.n * 1.3).toFixed(2) + ' ' + (ok ? 'aprovado' : 'negado'), 'Não há juros no enunciado.']] };
  }, p: [{ r: 3000, v: 12000, n: 24 }, { r: 2000, v: 9000, n: 12 }, { r: 4500, v: 27000, n: 20 }] }
  ];
})();

/* Variantes V2 e V3 escritas à mão (2026-11-18): outra tarefa, outra lógica, outro erro. V1 vem dos moldes acima.
   Gerado por _tools/gerar_alt.mjs a partir de _tools/alt/a10.alt.js; null = a versão do molde continua valendo. */
(function () {
  window.ALT = window.ALT || {};
  window.ALT['a10-s01'] = [
    {
      q: "Crie um Jogador, faça um ponteiro apontar para ele, some pontos pelo ponteiro e imprima.",
      code: "typedef struct {\n    char nome[20];\n    int pontos;\n} Jogador;\n\nint main() {\n    Jogador j = {\"Ana\", 10};\n    [[Jogador *]]pj = [[&j]];\n    [[pj->pontos]] += 5;\n    printf(\"%s %d\\n\", [[pj->nome]], j.pontos);\n    return 0;\n}",
      extra: [
        ["Jogador", "Sem o asterisco é uma struct, não um ponteiro."],
        ["j", "O ponteiro precisa do endereço: `&j`."],
        ["pj.pontos", "pj é ponteiro: o acesso é com a seta."],
        ["*pj.nome", "O ponto vem antes do asterisco; a forma certa é `pj->nome`."]
      ],
      why: "O ponteiro guarda `&j`; alterar pela seta muda a variável original, e `j.pontos` já mostra 15."
    },
    {
      q: "Um vetor de três Item e um ponteiro que percorre o vetor. Complete para dobrar a quantidade do segundo item.",
      code: "typedef struct {\n    int codigo;\n    int qtd;\n} Item;\n\nint main() {\n    Item estoque[3] = {{1, 10}, {2, 20}, {3, 30}};\n    Item *p = [[estoque]];\n    [[p++]];\n    p->qtd = [[p->qtd * 2]];\n    printf(\"%d %d\\n\", [[estoque[1].qtd]], p->codigo);\n    return 0;\n}",
      extra: [
        ["&estoque", "Tem tipo ponteiro para vetor inteiro, não para Item."],
        ["p--", "Voltaria para antes do primeiro item."],
        ["p.qtd * 2", "p é ponteiro; use a seta."],
        ["estoque[2].qtd", "O segundo item é o de índice 1."]
      ],
      why: "O nome do vetor é o endereço do primeiro item; `p++` avança para o segundo, e a alteração aparece em `estoque[1]`."
    }
  ];
  window.ALT['a10-s02'] = [
    {
      q: "Com <code>Produto estoque[5]; Produto *pr;</code>, qual comando faz <code>pr</code> apontar para o produto da posição 2 do vetor?",
      opts: [
        ["`pr = &estoque[2];`", "`&estoque[2]` é o endereço do elemento de índice 2."],
        ["`pr = estoque[2];`", "Isso tentaria guardar a struct inteira num ponteiro."],
        ["`pr = *estoque[2];`", "Desreferenciar uma struct não faz sentido."],
        ["`pr->estoque[2];`", "Não é uma atribuição; pr ainda não aponta para nada."]
      ]
    },
    {
      q: "Dentro de <code>void zerar(Cliente *c)</code>, qual comando zera o campo <code>saldo</code> do cliente que a main passou?",
      opts: [
        ["`c->saldo = 0;`", "A seta acessa o campo pelo endereço recebido."],
        ["`c.saldo = 0;`", "c é ponteiro; o ponto só vale para a própria struct."],
        ["`*c.saldo = 0;`", "O ponto tem precedência: tentaria desreferenciar o campo."],
        ["`&c->saldo = 0;`", "`&c->saldo` é um endereço; não se atribui a ele."]
      ]
    }
  ];
  window.ALT['a10-q01'] = [
    {
      q: "Complete a função que devolve o ponteiro para o produto mais caro e a chamada na main.",
      code: "typedef struct {\n    char nome[20];\n    double preco;\n} Produto;\n\n[[Produto *]]maisCaro(Produto *a, Produto *b) {\n    if ([[a->preco > b->preco]])\n        return a;\n    return [[b]];\n}\n\nint main() {\n    Produto p1 = {\"caneta\", 2.5}, p2 = {\"caderno\", 18.9};\n    Produto *m = maisCaro([[&p1]], &p2);\n    printf(\"%s\\n\", [[m->nome]]);\n    return 0;\n}",
      extra: [
        ["Produto", "Devolveria uma cópia, e o `return a` não bateria com o tipo."],
        ["a.preco > b.preco", "a e b são ponteiros: use a seta."],
        ["p1", "A função recebe endereços."],
        ["m.nome", "m é ponteiro: use a seta."]
      ],
      why: "A função devolve um ponteiro (`Produto *`); a main entrega `&p1` e `&p2` e lê o nome pela seta."
    },
    {
      q: "Complete a função que soma os preços de um vetor de Produto e a chamada na main.",
      code: "typedef struct {\n    int codigo;\n    double preco;\n} Produto;\n\ndouble total([[Produto *v]], int n) {\n    double s = 0;\n    for (int i = 0; i < n; i++)\n        s += [[v[i].preco]];\n    return s;\n}\n\nint main() {\n    Produto lista[3] = {{1, 4.5}, {2, 10.0}, {3, 7.5}};\n    printf(\"%.2f\\n\", total([[lista]], [[3]]));\n    return 0;\n}",
      extra: [
        ["Produto v", "Receberia uma cópia de um único Produto, não o vetor."],
        ["v->preco", "Pegaria só o primeiro elemento, sem usar o índice."],
        ["&lista", "Tem tipo ponteiro para o vetor inteiro, não para Produto."],
        ["lista[3]", "Índice 3 está fora do vetor, e não é o vetor."]
      ],
      why: "O vetor chega como ponteiro para o primeiro elemento; cada item é `v[i]`, e o nome `lista` já é esse endereço."
    }
  ];
  window.ALT['a10-q02'] = [
    {
      q: "A função deve debitar o valor do saldo da conta (<code>c->saldo</code>), mas só se houver saldo suficiente. Ache a linha errada.",
      code: "typedef struct {\n    int numero;\n    double saldo;\n} Conta;\n\nvoid sacar(Conta *c, double valor) {\n    if (c->saldo >= valor)\n        c->saldo - valor;\n}",
      line: 8,
      fixes: [
        ["c->saldo -= valor;", "`-=` calcula e grava o novo saldo."],
        ["c->saldo == valor;", "Compara e descarta o resultado."],
        ["c->saldo = valor;", "Trocaria o saldo pelo valor sacado."]
      ],
      why: "`c->saldo - valor;` calcula e joga fora o resultado; falta gravar com `-=`."
    },
    {
      q: "A função deve atualizar a nota só do aluno cuja matrícula for igual a <code>mat</code>. Ache a linha errada.",
      code: "typedef struct {\n    int matricula;\n    double nota;\n} Aluno;\n\nvoid atualizarSe(Aluno *a, int mat, double nova) {\n    if (a->matricula = mat)\n        a->nota = nova;\n}",
      line: 7,
      fixes: [
        ["if (a->matricula == mat)", "`==` compara; é o que a condição pede."],
        ["if (a->matricula != mat)", "Atualizaria todos menos o procurado."],
        ["if (a.matricula == mat)", "a é ponteiro: o ponto não vale."]
      ],
      why: "Um único `=` atribui `mat` à matrícula (e é sempre verdadeiro se mat for diferente de 0); a comparação é `==`."
    }
  ];
  window.ALT['a10-s03'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\ntypedef struct {\n    int x, y;\n} Par;\nvoid trocar(Par *p) {\n    int t = p->x;\n    p->x = p->y;\n    p->y = t;\n}\n\nint main() {\n    Par a = {3, 8};\n    Par b = a;\n    trocar(&a);\n    b.x += 10;\n    printf(\"%d %d %d %d\\n\", a.x, a.y, b.x, b.y);\n    return 0;\n}",
      opts: [
        ["8 3 13 8", "`b` é uma cópia feita antes da troca; só `a` é trocado, e só `b.x` ganha 10."],
        ["3 8 13 8", "`trocar(&a)` altera a original: a ficou {8, 3}."],
        ["8 3 8 3", "b foi copiado antes da troca e não acompanha a."],
        ["8 3 18 3", "b é cópia de {3, 8}; b.y continua 8."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\ntypedef struct {\n    double larg, alt;\n} Ret;\nvoid f1(Ret r) {\n    r.larg = r.larg * 2;\n}\n\nvoid f2(Ret *r) {\n    r->alt = r->alt + 1;\n}\n\nint main() {\n    Ret r = {2, 3};\n    f1(r);\n    f2(&r);\n    printf(\"%.1f %.1f %.1f\\n\", r.larg, r.alt, r.larg * r.alt);\n    return 0;\n}",
      opts: [
        ["2.0 4.0 8.0", "f1 altera uma cópia (nada muda); f2 altera a original: a altura passa a 4."],
        ["4.0 4.0 16.0", "f1 recebe a struct por valor: a largura original não muda."],
        ["2.0 3.0 6.0", "f2 recebe o endereço e altera a altura."],
        ["4.0 3.0 12.0", "Trocou os papéis das duas funções."]
      ]
    }
  ];
  window.ALT['a10-s04'] = [
    {
      q: "Aloque três Pessoa de uma vez, preencha as idades com um laço, imprima a terceira e libere.",
      code: "Pessoa *v = (Pessoa *) malloc([[3 * sizeof(Pessoa)]]);\nif (v == NULL)\n    return 1;\nfor (int i = 0; i < 3; i++)\n    [[v[i].idade]] = 20 + i;\nprintf(\"%d\\n\", [[(v + 2)->idade]]);\n[[free(v)]];",
      extra: [
        ["sizeof(Pessoa)", "Reserva espaço para uma Pessoa só."],
        ["v[i]->idade", "v[i] já é a struct; com colchetes o acesso é pelo ponto."],
        ["(v + 2).idade", "`v + 2` é ponteiro: use a seta."],
        ["free(v[0])", "free recebe o endereço do bloco, não uma struct."]
      ],
      why: "Um bloco para três structs: `3 * sizeof(Pessoa)`; `v[i].idade` e `(v + 2)->idade` são duas formas de acesso.",
      pre: "typedef struct { char nome[50]; int idade; } Pessoa;"
    },
    {
      q: "A função aloca e preenche uma Pessoa e devolve o ponteiro; a main usa e libera.",
      code: "Pessoa *criar(char *nome, int idade) {\n    Pessoa *p = (Pessoa *) malloc([[sizeof(Pessoa)]]);\n    if (p == NULL)\n        return NULL;\n    strcpy([[p->nome]], nome);\n    p->idade = idade;\n    [[return p]];\n}\n\n/* na main: */\nPessoa *a = criar(\"Bia\", 22);\nif (a == NULL)\n    return 1;\nprintf(\"%s %d\\n\", a->nome, a->idade);\nfree(a);",
      extra: [
        ["sizeof(Pessoa *)", "Reserva só o tamanho de um ponteiro."],
        ["p.nome", "p é ponteiro: use a seta."],
        ["return *p", "Devolveria a struct, e o tipo da função é ponteiro."],
        ["return &p", "Devolveria o endereço do ponteiro local."]
      ],
      why: "O ponteiro devolvido continua válido porque o bloco está na memória dinâmica, não na pilha da função.",
      pre: "typedef struct { char nome[50]; int idade; } Pessoa;"
    }
  ];
  window.ALT['a10-s05'] = [
    {
      q: "Programa dos slides: <code>alocarAluno</code> devolve o ponteiro, as outras funções usam esse ponteiro. Ache a linha errada.",
      code: "Aluno *alocarAluno() {\n    Aluno *a = (Aluno *) malloc(sizeof(Aluno *));\n    return a;\n}\n\nint main() {\n    Aluno *al = alocarAluno();\n    if (al == NULL) return 1;\n    preencherDados(al);\n    imprimirDados(al);\n    free(al);\n    return 0;\n}",
      line: 2,
      fixes: [
        ["Aluno *a = (Aluno *) malloc(sizeof(Aluno));", "Reserva o tamanho de uma struct Aluno inteira."],
        ["Aluno *a = (Aluno *) malloc(sizeof(a));", "sizeof(a) também é o tamanho de um ponteiro."],
        ["Aluno *a = (Aluno *) malloc(1);", "Um byte não comporta a struct."]
      ],
      why: "`sizeof(Aluno *)` é o tamanho de um ponteiro; o bloco precisa ter o tamanho da struct: `sizeof(Aluno)`.",
      pre: "typedef struct { int matricula; double nota; } Aluno;\nvoid preencherDados(Aluno *a) { a->matricula = 1; a->nota = 7.5; }\nvoid imprimirDados(Aluno *a) { printf(\"%d %.2f\\n\", a->matricula, a->nota); }"
    },
    {
      q: "Programa dos slides: <code>alocarAluno</code> devolve o ponteiro, as outras funções usam esse ponteiro. Ache a linha errada.",
      code: "Aluno *alocarAluno() {\n    Aluno *a = (Aluno *) malloc(sizeof(Aluno));\n    return a;\n}\n\nint main() {\n    Aluno *al = alocarAluno();\n    if (al == NULL) return 1;\n    preencherDados(al);\n    imprimirDados(al);\n    free(&al);\n    return 0;\n}",
      line: 11,
      fixes: [
        ["free(al);", "free recebe o endereço do bloco, que está em al."],
        ["free(*al);", "`*al` é a struct, não o endereço."],
        ["free(al->matricula);", "Um campo não é o endereço do bloco."]
      ],
      why: "`&al` é o endereço da variável local `al`, não do bloco alocado; `free` precisa do endereço guardado em `al`.",
      pre: "typedef struct { int matricula; double nota; } Aluno;\nvoid preencherDados(Aluno *a) { a->matricula = 1; a->nota = 7.5; }\nvoid imprimirDados(Aluno *a) { printf(\"%d %.2f\\n\", a->matricula, a->nota); }"
    }
  ];
  window.ALT['a10-q07'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\n#include <stdlib.h>\ntypedef struct {\n    int id;\n    int pts;\n} Time;\nint main() {\n    Time *t = (Time *) malloc(3 * sizeof(Time));\n    if (t == NULL)\n        return 1;\n    for (int i = 0; i < 3; i++)\n        t[i].id = i + 1;\n    t[0].pts = 4;\n    t[1].pts = 9;\n    t[2].pts = 6;\n    Time *melhor = &t[0];\n    for (int i = 1; i < 3; i++)\n        if (t[i].pts > melhor->pts)\n            melhor = &t[i];\n    melhor->pts += 5;\n    printf(\"%d %d %d\\n\", melhor->id, t[1].pts, t[0].pts);\n    free(t);\n    return 0;\n}",
      opts: [
        ["2 14 4", "`melhor` aponta para t[1]; alterar por ele muda o próprio t[1]."],
        ["2 9 4", "Como melhor é ponteiro, a alteração vale para o vetor."],
        ["1 14 4", "O melhor é o time de id 2 (9 pontos)."],
        ["2 14 9", "t[0] não foi alterado: continua 4."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\n#include <stdlib.h>\ntypedef struct {\n    double saldo;\n} Conta;\nvoid aplicar(Conta *c, double taxa) {\n    c->saldo -= taxa;\n}\n\nint main() {\n    Conta *c = (Conta *) malloc(sizeof(Conta));\n    if (c == NULL)\n        return 1;\n    c->saldo = 100;\n    for (int i = 0; i < 3; i++)\n        if (c->saldo > 50)\n            aplicar(c, 30);\n    printf(\"%.1f\\n\", c->saldo);\n    free(c);\n    return 0;\n}",
      opts: [
        ["40.0", "100 → 70 → 40; na terceira volta 40 não é maior que 50."],
        ["10.0", "A terceira cobrança não acontece: o saldo já não passa de 50."],
        ["70.0", "A taxa é cobrada duas vezes, não uma."],
        ["100.0", "aplicar recebe o ponteiro e altera a conta original."]
      ]
    }
  ];
  window.ALT['a10-q09'] = [
    {
      q: "Complete o cálculo do IMC de um paciente (peso ÷ altura²) e a classificação (25 ou mais é sobrepeso).",
      code: "double imc(Paciente *p) {\n    return p->peso / [[(p->altura * p->altura)]];\n}\n\nvoid exibir(Paciente *p) {\n    double i = [[imc(p)]];\n    printf(\"%d: %.1f \", p->id, i);\n    if ([[i >= 25]])\n        printf(\"sobrepeso\\n\");\n    else if (i < 18.5)\n        printf(\"abaixo\\n\");\n    else\n        printf(\"normal\\n\");\n}",
      extra: [
        ["(p->altura * 2)", "O IMC divide pela altura ao quadrado."],
        ["imc(&p)", "p já é ponteiro; `&p` seria Paciente **."],
        ["i > 25", "Com `>` quem tem exatamente 25 cairia em \"normal\"."],
        ["(p.altura * p.altura)", "p é ponteiro: use a seta."]
      ],
      why: "IMC = peso ÷ (altura × altura); o limite de 25 inclui o próprio 25.",
      pre: "typedef struct { int id; double peso; double altura; } Paciente;"
    },
    {
      q: "Complete a conta de energia: R$ 0,80 por kWh e, acima de 200 kWh, mais R$ 0,30 por kWh excedente.",
      code: "double conta(Residencia *r) {\n    double kwh = r->consumoAtual;\n    double valor = kwh * 0.80;\n    if ([[kwh > 200]])\n        valor += [[(kwh - 200) * 0.30]];\n    return valor;\n}\n\nvoid exibir(Residencia *r) {\n    printf(\"%d: R$ %.2f\\n\", r->codigo, [[conta(r)]]);\n}",
      extra: [
        ["kwh < 200", "A faixa extra vale para quem passa de 200."],
        ["kwh - 200 * 0.30", "Sem parênteses só o 200 é multiplicado."],
        ["conta(*r)", "`*r` é a struct, e a função recebe ponteiro."],
        ["r->consumoAtual * 0.30", "Cobraria o valor extra sobre o consumo todo."]
      ],
      why: "O excedente é `(kwh - 200)`, multiplicado pela taxa extra, e só entra quando o consumo passa de 200.",
      pre: "typedef struct { int codigo; double consumoAnterior; double consumoAtual; } Residencia;"
    }
  ];
  window.ALT['a10-q10'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\n#include <stdlib.h>\ntypedef struct {\n    double saldo;\n    int saques;\n} Conta;\nint sacar(Conta *c, double v) {\n    if (v > c->saldo || c->saques >= 2)\n        return 0;\n    c->saldo -= v;\n    c->saques++;\n    return 1;\n}\n\nint main() {\n    Conta *c = (Conta *) malloc(sizeof(Conta));\n    if (c == NULL)\n        return 1;\n    c->saldo = 300;\n    c->saques = 0;\n    int ok = 0;\n    ok += sacar(c, 100);\n    ok += sacar(c, 250);\n    ok += sacar(c, 150);\n    ok += sacar(c, 40);\n    printf(\"%d %.0f %d\\n\", ok, c->saldo, c->saques);\n    free(c);\n    return 0;\n}",
      opts: [
        ["2 50 2", "Passam o saque de 100 e o de 150; o de 250 não cabe no saldo e o de 40 esbarra no limite de 2 saques."],
        ["3 10 3", "Ignorou o limite de dois saques."],
        ["2 50 3", "Saques conta só os que deram certo: 2."],
        ["3 50 2", "ok conta só os saques que retornaram 1."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\n#include <stdlib.h>\ntypedef struct {\n    double preco;\n    int qtd;\n} Item;\ndouble subtotal(Item *i) {\n    double s = i->preco * i->qtd;\n    if (i->qtd >= 10)\n        s *= 0.9;\n    return s;\n}\n\nint main() {\n    Item *a = (Item *) malloc(sizeof(Item));\n    if (a == NULL)\n        return 1;\n    a->preco = 8;\n    a->qtd = 12;\n    Item b = {5, 4};\n    double t = subtotal(a) + subtotal(&b);\n    printf(\"%.2f %s\\n\", t, t > 100 ? \"frete gratis\" : \"frete 15\");\n    free(a);\n    return 0;\n}",
      opts: [
        ["106.40 frete gratis", "a: 8 × 12 = 96, com 10% de desconto = 86,40; b: 5 × 4 = 20. Total 106,40, maior que 100."],
        ["116.00 frete gratis", "Esqueceu o desconto de 10% para 10 ou mais unidades."],
        ["106.40 frete 15", "O total passou de 100, então o frete é grátis."],
        ["86.40 frete 15", "Esqueceu de somar o subtotal de b."]
      ]
    }
  ];
})();
