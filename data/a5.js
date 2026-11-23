/* A5 · Structs — “Exercícios 1 Structs” (14) + “Exercícios 2 Structs” (24, com os dados fixos da lista). */
(function () {
  var R = String.raw;
  var E1 = 'Exercícios 1 Structs, questão ';
  var E2 = 'Exercícios 2 Structs, questão ';

  /* ---------- Dados da lista 2 (iguais aos da main do professor) ---------- */
  var DADOS = R`typedef struct { int id; char nome[50]; int idade; } Aluno;
typedef struct { int id; char nome[50]; } Professor;
typedef struct { int idAluno; float nota1; float nota2; float nota3; } Nota;
typedef struct { int id; int idProfessor; char disciplina[50]; int alunosTurma[50]; int qtdAlunos; Nota notas[50]; int qtdNotas; } Turma;
Professor professores[500] = {{1, "Carlos Silva"}, {2, "Maria Oliveira"}, {3, "Joao Pereira"}, {4, "Fernanda Gomes"}, {5, "Ricardo Almeida"}};
int qtdProfessores = 5;
Aluno alunos[10000] = {{101, "Ana Souza", 20}, {102, "Bruno Lima", 19}, {103, "Clara Mendes", 22}, {104, "Daniel Costa", 18}, {105, "Eduarda Ramos", 21}, {106, "Felipe Martins", 20}, {107, "Gabriela Torres", 23}, {108, "Henrique Dias", 19}, {109, "Isabela Rocha", 20}, {110, "Joao Santos", 18}, {111, "Karen Azevedo", 21}, {112, "Lucas Barbosa", 22}};
int qtdAlunos = 12;
Turma turmas[100] = {
 {1001, 1, "Algoritmos", {101, 102, 103, 104}, 4, {{101, 8.5, 10.0, 9.0}, {102, 6.0, 5.5, 7.0}, {103, 9.0, 8.0, 10.0}, {104, 7.5, 6.0, 8.0}}, 4},
 {1002, 2, "Estruturas de Dados", {105, 106, 107, 108}, 4, {{105, 4.0, 3.5, 2.5}, {106, 5.0, 6.0, 7.0}, {107, 0.0, 5.5, 5.5}, {108, 10.0, 7.0, 7.5}}, 4},
 {1003, 4, "Banco de Dados", {109, 110, 111, 112}, 4, {{109, 9.5, 9.0, 10.0}, {110, 7.0, 6.5, 7.5}, {111, 8.0, 8.5, 8.5}, {112, 6.0, 5.5, 7.0}}, 4}};
int qtdTurmas = 3;
char *nomeAluno(int id) { for (int i = 0; i < qtdAlunos; i++) if (alunos[i].id == id) return alunos[i].nome; return "?"; }
int idadeAluno(int id) { for (int i = 0; i < qtdAlunos; i++) if (alunos[i].id == id) return alunos[i].idade; return 0; }`;
  window.A5_DADOS = DADOS;  // usado pelas variantes escritas à mão (bloco ALT, no fim do arquivo)
  var AL = { 101: ['Ana Souza', 20], 102: ['Bruno Lima', 19], 103: ['Clara Mendes', 22], 104: ['Daniel Costa', 18], 105: ['Eduarda Ramos', 21], 106: ['Felipe Martins', 20], 107: ['Gabriela Torres', 23], 108: ['Henrique Dias', 19], 109: ['Isabela Rocha', 20], 110: ['Joao Santos', 18], 111: ['Karen Azevedo', 21], 112: ['Lucas Barbosa', 22] };
  var PR = { 1: 'Carlos Silva', 2: 'Maria Oliveira', 3: 'Joao Pereira', 4: 'Fernanda Gomes', 5: 'Ricardo Almeida' };
  var T = [
    { id: 1001, prof: 1, disc: 'Algoritmos', n: [[101, 8.5, 10, 9], [102, 6, 5.5, 7], [103, 9, 8, 10], [104, 7.5, 6, 8]] },
    { id: 1002, prof: 2, disc: 'Estruturas de Dados', n: [[105, 4, 3.5, 2.5], [106, 5, 6, 7], [107, 0, 5.5, 5.5], [108, 10, 7, 7.5]] },
    { id: 1003, prof: 4, disc: 'Banco de Dados', n: [[109, 9.5, 9, 10], [110, 7, 6.5, 7.5], [111, 8, 8.5, 8.5], [112, 6, 5.5, 7]] }];
  var med = function (r) { return (r[1] + r[2] + r[3]) / 3; };
  var nome = function (id) { return AL[id][0]; };
  var f2 = function (x) { return x.toFixed(2); };
  var TUR = ['turma 1001 (Algoritmos)', 'turma 1002 (Estruturas de Dados)', 'turma 1003 (Banco de Dados)'];
  /* Questão de saída sobre a turma t: monta o programa com a função mostrada + main que chama para turmas[t]. */
  function saida2(fn, call, calc, wrong) {
    return function (p) {
      var ok = p.ok || calc(p);
      var opts = [[ok, p.why || 'Resultado com os dados da ' + TUR[p.t] + '.']].concat(wrong(p, ok));
      return { q: (p.q || 'Com os dados da lista, qual a saída para a ' + TUR[p.t] + '?'), saida: true, pre: DADOS, code: fn + '\nint main() {\n    ' + (p.mod ? p.mod + '\n    ' : '') + call(p) + '\n    return 0;\n}', opts: opts };
    };
  }
  var uniq = function (arr) { var s = {}; return arr.filter(function (o) { if (s[o[0]]) return false; s[o[0]] = 1; return true; }); };

  (window.EXS = window.EXS || {}).a5 = [

  /* ===== Lista 1 ===== */
  { id: 'a5-l101', topic: 't-definicao', ref: E1 + '1', title: 'Ler e mostrar um registro', type: 'drag', make: function (p) {
    return { q: 'Complete a struct ' + p.t + ' e a leitura dos campos.', code: R`typedef struct {
    char ${p.s}[50];
    int ${p.i};
    float ${p.f};
}
${p.t};

int main() {
    ${p.t} [[x]];
    scanf(" %49[^\n]", [[x.${p.s}]]);
    scanf("%d %f", [[&x.${p.i}]], &x.${p.f});
    printf("%s %d %.1f\n", x.${p.s}, x.${p.i}, [[x.${p.f}]]);
    return 0;
}`, extra: [[p.t + '.' + p.s, 'O ponto vai na variável, não no tipo.'], ['&x.' + p.s, 'O campo string já é endereço (vetor de char).'], ['x.' + p.i, 'scanf de número precisa do & no campo.'], ['&x.' + p.f, 'printf recebe o valor, sem &.']],
      why: 'variavel.campo; & só em campos numéricos no scanf.' };
  }, p: [{ t: 'Aluno', s: 'nome', i: 'matricula', f: 'media' }, { t: 'Livro', s: 'titulo', i: 'ano_publicacao', f: 'preco' }, { t: 'Produto', s: 'nome', i: 'codigo', f: 'preco' }] },

  { id: 'a5-l102', topic: 't-campos', ref: E1 + '2', title: 'Preencher meu_livro', type: 'fix', make: function (p) {
    return { q: 'Preencher os campos de <code>meu_livro</code>. Ache a linha errada.', code: R`typedef struct {
    char titulo[80];
    char autor[60];
    int ano_publicacao;
} Livro;

int main() {
    Livro meu_livro;
    ${p.l5};
    ${p.l6};
    ${p.l7};
    printf("%s, %s (%d)\n", meu_livro.titulo, meu_livro.autor, meu_livro.ano_publicacao);
    return 0;
}`, line: p.line, fixes: p.fx, why: p.why };
  }, p: [
    { l5: 'meu_livro.titulo = "Dom Casmurro"', l6: 'strcpy(meu_livro.autor, "Machado de Assis")', l7: 'meu_livro.ano_publicacao = 1899', line: 9, fx: [['strcpy(meu_livro.titulo, "Dom Casmurro");', 'String se copia com strcpy.'], ['meu_livro.titulo == "Dom Casmurro";', 'Comparação, não atribuição.'], ['Livro.titulo = "Dom Casmurro";', 'Livro é o tipo.']], why: 'Vetor de char não recebe `=`.' },
    { l5: 'strcpy(meu_livro.titulo, "Vidas Secas")', l6: 'strcpy(meu_livro.autor, "Graciliano Ramos")', l7: 'scanf("%d", meu_livro.ano_publicacao)', line: 11, fx: [['scanf("%d", &meu_livro.ano_publicacao);', 'Campo numérico precisa de &.'], ['scanf("%d", &meu_livro);', 'Endereço da struct inteira, não do campo.'], ['scanf("%s", meu_livro.ano_publicacao);', 'ano é int, não string.']], why: 'scanf de int precisa do endereço do campo.' },
    { l5: 'strcpy(meu_livro.titulo, "Iracema")', l6: 'strcpy(Livro.autor, "Jose de Alencar")', l7: 'meu_livro.ano_publicacao = 1865', line: 10, fx: [['strcpy(meu_livro.autor, "Jose de Alencar");', 'Usa a variável.'], ['strcpy(autor, "Jose de Alencar");', 'autor sozinho não existe fora da struct.'], ['meu_livro.autor = "Jose de Alencar";', 'Vetor de char não recebe `=`.']], why: 'O ponto vai na variável (meu_livro), não no tipo (Livro).' }] },

  { id: 'a5-l103', topic: 't-campos', ref: E1 + '3', title: 'Produto formatado', type: 'mc', make: function (p) {
    return { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
#include <string.h>
typedef struct {
    int codigo;
    char nome[40];
    float preco;
} Produto;
int main() {
    Produto p;
    p.codigo = ${p.c};
    strcpy(p.nome, "${p.n}");
    p.preco = ${p.p};
    printf("Codigo: %d, Nome: %s, Preco: %.2f\n", p.codigo, p.nome, p.preco);
    return 0;
}`, opts: [['Codigo: ' + p.c + ', Nome: ' + p.n + ', Preco: ' + p.p.toFixed(2), 'Cada campo no seu formato.'], ['Codigo: ' + p.c + ', Nome: ' + p.n + ', Preco: ' + p.p, '%.2f mostra duas casas.'], ['Codigo: ' + p.n + ', Nome: ' + p.c + ', Preco: ' + p.p.toFixed(2), 'A ordem dos argumentos segue a do formato.'], ['Codigo: ' + p.c + ', Nome: p.nome, Preco: ' + p.p.toFixed(2), 'p.nome é a variável, não o texto.']] };
  }, p: [{ c: 12, n: 'Caderno', p: 15.5 }, { c: 7, n: 'Caneta', p: 2.5 }, { c: 301, n: 'Mochila', p: 89.9 }] },

  { id: 'a5-l104', topic: 't-vetor', ref: E1 + '4', title: 'Vetor de clientes', type: 'drag', make: function (p) {
    return { q: 'Complete a leitura e a listagem de ' + p.n + ' registros ' + p.t + '.', code: R`typedef struct {
    int codigo;
    char nome[50];
}
${p.t};

int main() {
    ${p.t} [[v[${p.n}]]];
    for (int i = 0; i < ${p.n}; i++)
        scanf("%d %49s", [[&v[i].codigo]], v[i].nome);
    for (int i = 0; [[i < ${p.n}]]; i++)
        printf("%s (%d)\n", [[v[i].nome]], v[i].codigo);
    return 0;
}`, extra: [['v', 'Precisa ser um vetor de ' + p.n + ' posições.'], ['&v.codigo[i]', 'O índice vai no vetor: v[i].codigo.'], ['i <= ' + p.n, 'v[' + p.n + '] não existe.'], ['v.nome[i]', 'O índice vai no vetor, não no campo.']],
      why: 'vetor[i].campo.' };
  }, p: [{ t: 'Cliente', n: 5 }, { t: 'Fornecedor', n: 3 }, { t: 'Paciente', n: 8 }] },

  { id: 'a5-l105', topic: 't-vetor', ref: E1 + '5', title: 'Média da turma de estudantes', type: 'mc', make: function (p) {
    var m = (p.v[0] + p.v[1] + p.v[2]) / 3;
    return { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
typedef struct {
    char nome[30];
    float nota;
} Estudante;
int main() {
    Estudante e[3] = {{"${p.n[0]}", ${p.v[0]}}, {"${p.n[1]}", ${p.v[1]}}, {"${p.n[2]}", ${p.v[2]}}};
    float soma = 0;
    for (int i = 0; i < 3; i++)
        soma += e[i].nota;
    printf("%.2f\n", soma / 3);
    return 0;
}`, opts: [[m.toFixed(2), 'Soma das três notas dividida por 3.'], [(p.v[0] + p.v[1] + p.v[2]).toFixed(2), 'Faltou dividir.'], [p.v[2].toFixed(2), 'Isso é só a última nota.'], [((p.v[0] + p.v[1]) / 2).toFixed(2), 'São três estudantes.']] };
  }, p: [{ n: ['Ana', 'Rui', 'Lia'], v: [7, 8, 9] }, { n: ['Bia', 'Caio', 'Davi'], v: [5.5, 6.5, 10] }, { n: ['Eva', 'Gil', 'Ian'], v: [4, 9, 8] }] },

  { id: 'a5-l106', topic: 't-vetor', ref: E1 + '6', title: 'Produto mais caro', type: 'fix', make: function (p) {
    return { q: 'Entre 10 produtos, mostrar o nome e o preço do mais caro. Ache a linha errada.', code: R`int pm = 0;
for (int i = 1; i < 10; i++)
    if (${p.c})
        ${p.a};
printf("%s %.2f\n", prod[pm].nome, prod[pm].preco);`, line: p.line,
      fixes: p.line === 3 ? [['if (prod[i].preco > prod[pm].preco)', 'Compara preços.'], ['if (prod[i] > prod[pm])', 'Structs não se comparam com `>`.'], ['if (prod[i].preco > pm)', 'pm é índice.']] : [['pm = i;', 'Guarda o índice do mais caro.'], ['pm = prod[i].preco;', 'Guardaria o preço como índice.'], ['prod[pm] = prod[i];', 'Estragaria o vetor.']],
      why: 'Compara o campo preço e guarda o índice.', pin: 'typedef struct { int codigo; char nome[30]; float preco; } Produto; Produto prod[10] = {0};' };
  }, p: [{ c: 'prod[i] > prod[pm]', a: 'pm = i', line: 3 }, { c: 'prod[i].preco > prod[pm].preco', a: 'pm = prod[i].preco', line: 4 }, { c: 'prod[i].preco > pm', a: 'pm = i', line: 3 }] },

  { id: 'a5-l107', topic: 't-vetor', ref: E1 + '7', title: 'Procurar pela matrícula', type: 'drag', make: function (p) {
    return { q: 'Complete a busca do aluno pela ' + p.k + ' num vetor de 5 alunos.', code: R`int achou = 0;
for (int i = 0; i < 5; i++)
    if ([[al[i].${p.k} == procurada]]) {
        printf("%s %.1f\n", [[al[i].nome]], al[i].media);
        [[achou = 1]];
        break;
    }
if ([[!achou]])
    printf("Nao encontrado\n");`, extra: [['al.' + p.k + '[i] == procurada', 'O índice vai no vetor.'], ['al[i] == procurada', 'Compara-se o campo, não a struct.'], ['achou', 'A mensagem é para quando NÃO achou.'], ['al.nome', 'Faltou o índice.']],
      why: 'Busca sequencial (A4) comparando um campo.', pin: 'typedef struct { char nome[50]; int ' + p.k + '; float media; } Aluno; Aluno al[5] = {0}; int procurada = 1;' };
  }, p: [{ k: 'matricula' }, { k: 'codigo' }, { k: 'ra' }] },

  { id: 'a5-l108', topic: 't-vetor', ref: E1 + '8', title: 'Livros para repor', type: 'mc', make: function (p) {
    var lis = p.l.filter(function (x) { return x[1] < p.lim; }).map(function (x) { return x[0] + ' ' + x[1]; });
    return { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
typedef struct {
    char titulo[40];
    char autor[40];
    int quantidade;
} Livro;
int main() {
    Livro v[4] = {${p.l.map(function (x) { return '{"' + x[0] + '", "?", ' + x[1] + '}'; }).join(', ')}};
    for (int i = 0; i < 4; i++)
        if (v[i].quantidade < ${p.lim})
            printf("%s %d\n", v[i].titulo, v[i].quantidade);
    return 0;
}`, opts: uniq([[lis.join('\n') || '(nada)', 'Só os com quantidade menor que ' + p.lim + '.'], [p.l.filter(function (x) { return x[1] <= p.lim; }).map(function (x) { return x[0] + ' ' + x[1]; }).join('\n') + '\n(com o igual)', 'Pede-se menor que ' + p.lim + ', não menor ou igual.'], [p.l.map(function (x) { return x[0] + ' ' + x[1]; }).join('\n'), 'Há um filtro.'], [p.l.filter(function (x) { return x[1] >= p.lim; }).map(function (x) { return x[0] + ' ' + x[1]; }).join('\n') || 'nenhum', 'Esses são os que NÃO precisam de reposição.']]) };
  }, p: [{ lim: 5, l: [['Cortico', 3], ['Iracema', 7], ['Macunaima', 5], ['Quincas', 1]] }, { lim: 5, l: [['Ensaio', 9], ['Sagarana', 4], ['Capitaes', 6], ['Memorias', 2]] }, { lim: 5, l: [['Gabriela', 0], ['Mayombe', 5], ['Lavoura', 12], ['Til', 4]] }] },

  { id: 'a5-l109', topic: 't-vetor', ref: E1 + '9', title: 'Ler e imprimir 5 alunos', type: 'fix', make: function (p) {
    return { q: 'Ler nome, matrícula e curso de 5 alunos num vetor e imprimir. Ache a linha errada.', code: R`Aluno v[5];
for (int i = 0; i < 5; i++)
    scanf("%49s %d %29s", ${p.l3});
for (int i = 0; i < 5; i++)
    printf("%s %d %s\n", ${p.l5});`, line: p.line,
      fixes: p.line === 3 ? [['scanf("%49s %d %29s", v[i].nome, &v[i].matricula, v[i].curso);', 'Strings sem &, int com &.'], ['scanf("%49s %d %29s", &v[i].nome, v[i].matricula, &v[i].curso);', 'Inverteu os &.'], ['scanf("%49s %d %29s", v.nome, &v.matricula, v.curso);', 'Faltou o índice.']]
        : [['printf("%s %d %s\\n", v[i].nome, v[i].matricula, v[i].curso);', 'Cada aluno pelo índice.'], ['printf("%s %d %s\\n", v[0].nome, v[0].matricula, v[0].curso);', 'Imprimiria só o primeiro, 5 vezes.'], ['printf("%s %d %s\\n", v[i]);', 'printf não sabe imprimir uma struct inteira.']],
      why: 'vetor[i].campo, com & só no campo numérico do scanf.', pin: 'typedef struct { char nome[50]; int matricula; char curso[30]; } Aluno;' };
  }, p: [{ l3: 'v[i].nome, v[i].matricula, v[i].curso', l5: 'v[i].nome, v[i].matricula, v[i].curso', line: 3 }, { l3: 'v[i].nome, &v[i].matricula, v[i].curso', l5: 'v[0].nome, v[0].matricula, v[0].curso', line: 5 }, { l3: 'v.nome, &v.matricula, v.curso', l5: 'v[i].nome, v[i].matricula, v[i].curso', line: 3 }] },

  { id: 'a5-l110', topic: 't-vetor', ref: E1 + '10', title: 'Três provas, cinco alunos', type: 'mc', make: function (p) {
    return { q: 'Para os 5 alunos abaixo, o programa mostra: quem tem a maior nota na prova 1, a maior média, a menor média e quantos foram aprovados (média ≥ 6.0). Qual a saída?', saida: true, code: R`#include <stdio.h>
typedef struct {
    int matricula;
    char nome[20];
    float p1, p2, p3;
} Aluno;
float media(Aluno a) {
    return (a.p1 + a.p2 + a.p3) / 3;
}

int main() {
    Aluno v[5] = {${p.d}};
    int mp1 = 0, mx = 0, mn = 0, ap = 0;
    for (int i = 0; i < 5; i++) {
        if (v[i].p1 > v[mp1].p1)
            mp1 = i;
        if (media(v[i]) > media(v[mx]))
            mx = i;
        if (media(v[i]) < media(v[mn]))
            mn = i;
        if (media(v[i]) >= 6.0)
            ap++;
    }
    printf("%s %s %s %d\n", v[mp1].nome, v[mx].nome, v[mn].nome, ap);
    return 0;
}`, opts: p.opts };
  }, p: [
    { d: '{1, "Ana", 9, 5, 6}, {2, "Beto", 7, 8, 9}, {3, "Caio", 4, 5, 3}, {4, "Duda", 8, 6, 7}, {5, "Eli", 6, 6, 6}', opts: [['Ana Beto Caio 4', 'Ana tem 9 na P1; Beto média 8; Caio média 4; Ana, Beto, Duda e Eli passam.'], ['Beto Beto Caio 4', 'Na prova 1 quem tem mais é Ana (9).'], ['Ana Beto Caio 3', 'Eli tem média 6.0, que já aprova (≥ 6.0).'], ['Ana Duda Caio 4', 'Beto tem a maior média (8).']] },
    { d: '{1, "Ana", 5, 5, 5}, {2, "Beto", 6, 7, 2}, {3, "Caio", 10, 2, 3}, {4, "Duda", 7, 7, 7}, {5, "Eli", 8, 9, 4}', opts: [['Caio Duda Ana 2', 'Caio tem 10 na P1; Duda e Eli empatam em 7 e fica a primeira; Ana, Beto e Caio empatam em 5 e fica Ana.'], ['Caio Eli Ana 2', 'Com `>` o empate não troca: fica Duda.'], ['Caio Duda Caio 2', 'Ana (5.0) vem antes de Caio com a mesma média.'], ['Eli Duda Ana 2', 'Na prova 1 Caio tem 10.']] },
    { d: '{1, "Ana", 6, 6, 6}, {2, "Beto", 9, 9, 9}, {3, "Caio", 9, 4, 5}, {4, "Duda", 3, 3, 3}, {5, "Eli", 7, 5, 6}', opts: [['Beto Beto Duda 4', 'Beto tem 9 na P1 (Caio empata, mas vem depois); Ana, Beto, Caio e Eli têm média ≥ 6.'], ['Caio Beto Duda 4', 'Com `>` o empate não troca.'], ['Beto Beto Duda 3', 'Caio tem média 6.0, que já aprova.'], ['Beto Caio Duda 4', 'Beto tem a maior média.']] }] },

  { id: 'a5-l111', topic: 't-vetor', ref: E1 + '11', title: 'Média ponderada', type: 'mc', make: function (p) {
    var m = (p.a * 1 + p.b * 2) / 3;
    return { q: 'nota1 tem peso 1 e nota2 peso 2. Qual a saída?', saida: true, code: R`#include <stdio.h>
typedef struct {
    int matricula;
    char nome[20];
    int codigo_disciplina;
    float nota1, nota2;
} Aluno;
int main() {
    Aluno a = {${p.m}, "${p.n}", 10, ${p.a}, ${p.b}};
    printf("%s %.2f\n", a.nome, (a.nota1 * 1.0 + a.nota2 * 2.0) / 3.0);
    return 0;
}`, opts: [[p.n + ' ' + m.toFixed(2), '(nota1 + 2 × nota2) / 3.'], [p.n + ' ' + ((p.a + p.b) / 2).toFixed(2), 'Isso é a média simples.'], [p.n + ' ' + ((p.a * 2 + p.b) / 3).toFixed(2), 'Inverteu os pesos.'], [p.n + ' ' + ((p.a + p.b * 2) / 2).toFixed(2), 'Divide-se pela soma dos pesos, 3.']] };
  }, p: [{ m: 1, n: 'Ana', a: 6, b: 9 }, { m: 2, n: 'Rui', a: 8, b: 5 }, { m: 3, n: 'Lia', a: 10, b: 7 }] },

  { id: 'a5-l112', topic: 't-vetor', ref: E1 + '12', title: 'Separar aprovados e reprovados', type: 'drag', make: function (p) {
    return { q: 'Separar ' + p.n + ' alunos em dois vetores, aprovados (média ≥ ' + p.lim + ') e reprovados. Complete.', code: R`Aluno aprov[${p.n}], reprov[${p.n}];
int na = 0, nr = 0;
for (int i = 0; i < ${p.n}; i++) {
    if ([[v[i].media_final >= ${p.lim}]])
        aprov[[[na++]]] = v[i];
    else
        [[reprov[nr++]]] = v[i];
}
for (int i = 0; [[i < na]]; i++)
    printf("%s\n", aprov[i].nome);`, extra: [['v[i] >= ' + p.lim, 'Compara o campo media_final.'], ['i', 'Cada vetor tem o próprio contador.'], ['reprov[i]', 'Deixaria buracos no vetor de reprovados.'], ['i < ' + p.n, 'Só há na aprovados.']],
      why: 'Cada vetor novo tem seu próprio contador. Struct inteira pode ser copiada com `=`.', pin: 'typedef struct { char nome[50]; int matricula; float media_final; } Aluno; Aluno v[' + p.n + '] = {0};' };
  }, p: [{ n: 10, lim: '5.0' }, { n: 8, lim: '6.0' }, { n: 12, lim: '7.0' }] },

  { id: 'a5-l113', topic: 't-vetor', ref: E1 + '13', title: 'Carros abaixo do preço', type: 'mc', make: function (p) {
    return { q: 'Entrada de p (termina com 0): <code>' + p.in + '</code>. Qual a saída?', saida: true, stdin: p.in, code: R`#include <stdio.h>
typedef struct {
    char marca[16];
    int ano;
    float preco;
} Carro;
int main() {
    Carro c[5] = {{"Gol", 2015, 30000}, {"Uno", 2012, 18000}, {"Onix", 2020, 65000}, {"Ka", 2016, 32000}, {"Fusca", 1978, 25000}};
    float p;
    scanf("%f", &p);
    while (p != 0) {
        for (int i = 0; i < 5; i++)
            if (c[i].preco < p)
                printf("%s ", c[i].marca);
        printf("| ");
        scanf("%f", &p);
    }
    return 0;
}`, opts: p.opts };
  }, p: [
    { in: '31000 0', opts: [['Gol Uno Fusca |', 'Preço menor que 31000.'], ['Uno Fusca |', 'Gol custa 30000 < 31000.'], ['Gol Uno Ka Fusca |', 'Ka custa 32000.'], ['Gol Uno Fusca | |', 'O 0 encerra sem nova busca.']] },
    { in: '20000 70000 0', opts: [['Uno | Gol Uno Onix Ka Fusca |', 'Duas buscas antes do 0.'], ['Uno |', 'Há uma segunda busca com 70000.'], ['Uno Fusca | Gol Uno Onix Ka Fusca |', 'Fusca custa 25000.'], ['| Gol Uno Onix Ka Fusca |', 'Uno custa 18000 < 20000.']] },
    { in: '10000 0', opts: [['|', 'Nenhum carro custa menos que 10000.'], ['Uno |', '18000 não é menor que 10000.'], ['', 'O separador | é impresso mesmo sem carros.'], ['| |', 'Só uma busca antes do 0.']] }] },

  { id: 'a5-l114', topic: 't-vetor', ref: E1 + '14', title: 'Consumo de energia da casa', type: 'mc', make: function (p) {
    return { q: 'Consumo = potência (kW) × horas por dia × ' + p.t + ' dias. Qual a saída?', saida: true, code: R`#include <stdio.h>
typedef struct {
    char nome[16];
    float potencia;
    float tempo_ativo_por_dia;
} Eletro;
int main() {
    Eletro e[3] = {{"${p.e[0][0]}", ${p.e[0][1]}, ${p.e[0][2]}}, {"${p.e[1][0]}", ${p.e[1][1]}, ${p.e[1][2]}}, {"${p.e[2][0]}", ${p.e[2][1]}, ${p.e[2][2]}}};
    int t = ${p.t};
    float total = 0;
    for (int i = 0; i < 3; i++)
        total += e[i].potencia * e[i].tempo_ativo_por_dia * t;
    printf("total %.1f kWh;", total);
    for (int i = 0; i < 3; i++)
        printf(" %s %.0f%%", e[i].nome, 100 * e[i].potencia * e[i].tempo_ativo_por_dia * t / total);
    printf("\n");
    return 0;
}`, opts: p.opts };
  }, p: [
    { t: 30, e: [['chuveiro', 4, 0.5], ['geladeira', 0.2, 10], ['tv', 0.1, 10]], opts: [['total 150.0 kWh; chuveiro 40% geladeira 40% tv 20%', 'Por dia: 2 + 2 + 1 = 5 kWh; em 30 dias, 150.'], ['total 5.0 kWh; chuveiro 40% geladeira 40% tv 20%', 'Faltou multiplicar pelos 30 dias.'], ['total 150.0 kWh; chuveiro 80% geladeira 4% tv 2%', 'A porcentagem é sobre o total, não sobre a potência.'], ['total 150.0 kWh; chuveiro 33% geladeira 33% tv 33%', 'Os consumos são diferentes.']] },
    { t: 10, e: [['ar', 1.5, 8], ['ferro', 1, 1], ['lampada', 0.01, 100]], opts: [['total 140.0 kWh; ar 86% ferro 7% lampada 7%', 'Por dia: 12 + 1 + 1 = 14; em 10 dias, 140.'], ['total 14.0 kWh; ar 86% ferro 7% lampada 7%', 'Multiplique por t = 10.'], ['total 140.0 kWh; ar 60% ferro 20% lampada 20%', 'Calcule cada consumo: 120, 10 e 10.'], ['total 2.5 kWh; ar 60% ferro 40% lampada 0%', 'Isso soma potências.']] },
    { t: 7, e: [['micro', 1.2, 0.5], ['pc', 0.3, 8], ['forno', 2, 0.3]], opts: [['total 25.2 kWh; micro 17% pc 67% forno 17%', 'Por dia: 0.6 + 2.4 + 0.6 = 3.6; em 7 dias, 25.2.'], ['total 3.6 kWh; micro 17% pc 67% forno 17%', 'Faltam os 7 dias.'], ['total 25.2 kWh; micro 34% pc 9% forno 57%', 'Isso divide só as potências.'], ['total 24.0 kWh; micro 17% pc 67% forno 17%', 'Confira: 3.6 × 7 = 25.2.']] }] },

  /* ===== Lista 2 (dados fixos) ===== */
  { id: 'a5-l201', topic: 't-relacional', ref: E2 + '1', title: 'Listar os alunos de uma turma', type: 'drag', make: function (p) {
    return { q: 'Complete a função que lista id, nome e idade dos alunos de uma turma, buscando cada id no vetor <code>alunos</code>. (' + TUR[p.t] + ': ' + T[p.t].n.map(function (r) { return nome(r[0]); }).join(', ') + ')', code: R`void listar(Turma t) {
    for (int i = 0; i < [[t.qtdAlunos]]; i++)
        for (int j = 0; j < qtdAlunos; j++)
            if ([[alunos[j].id == t.alunosTurma[i]]])
                printf("%d %s %d\n", alunos[j].id, [[alunos[j].nome]], alunos[j].idade);
}

/* na main: */
listar([[turmas[${p.t}]]]);`, extra: [['qtdAlunos', 'Esse é o total da escola (12), não da turma.'], ['alunos[i].id == t.alunosTurma[j]', 'Os índices trocaram de vetor.'], ['t.alunosTurma[i].nome', 'alunosTurma guarda só ids (int).'], ['turmas', 'A função recebe uma turma, não o vetor todo.']],
      why: 'A turma guarda ids; o nome vem do vetor alunos.', pre: DADOS };
  }, p: [{ t: 0 }, { t: 1 }, { t: 2 }] },

  { id: 'a5-l202', topic: 't-relacional', ref: E2 + '2', title: 'Nome do professor da turma', type: 'fix', make: function (p) {
    return { q: 'Exibir o nome do professor de uma turma a partir de idProfessor. Para a ' + TUR[p.t] + ' deveria sair ' + PR[T[p.t].prof] + '. Ache a linha errada.', code: R`void professorDa(Turma t) {
    for (int i = 0; i < qtdProfessores; i++)
        if (${p.c})
            printf("%s\n", ${p.pr});
}`, line: p.line,
      fixes: p.line === 3 ? [['if (professores[i].id == t.idProfessor)', 'Compara o id do professor com o da turma.'], ['if (professores[i].id == t.id)', 't.id é o id da turma (1001…).'], ['if (i == t.idProfessor)', 'O índice não é o id: Fernanda tem id 4 e está no índice 3.']]
        : [['printf("%s\\n", professores[i].nome);', 'Nome do professor encontrado.'], ['printf("%s\\n", t.disciplina);', 'Isso é a disciplina.'], ['printf("%d\\n", t.idProfessor);', 'Isso é só o id.']],
      why: 'idProfessor não é struct: é preciso procurar o professor pelo id.', pre: DADOS };
  }, p: [{ t: 0, c: 'professores[i].id == t.id', pr: 'professores[i].nome', line: 3 }, { t: 1, c: 'professores[i].id == t.idProfessor', pr: 't.disciplina', line: 4 }, { t: 2, c: 'i == t.idProfessor', pr: 'professores[i].nome', line: 3 }] },

  { id: 'a5-l203', topic: 't-relacional', ref: E2 + '3', title: 'Notas de um aluno numa turma', type: 'mc', make: saida2(R`void notasDe(int idTurma, int idAluno) {
    for (int t = 0; t < qtdTurmas; t++)
        if (turmas[t].id == idTurma)
            for (int k = 0; k < turmas[t].qtdNotas; k++)
                if (turmas[t].notas[k].idAluno == idAluno)
                    printf("%.1f %.1f %.1f\n", turmas[t].notas[k].nota1, turmas[t].notas[k].nota2, turmas[t].notas[k].nota3);
}`, function (p) { return 'notasDe(' + T[p.t].id + ', ' + p.a + ');'; }, function (p) { var r = T[p.t].n.filter(function (x) { return x[0] === p.a; })[0]; return r.slice(1).map(function (x) { return x.toFixed(1); }).join(' '); },
    function (p, ok) { var o = T[(p.t + 1) % 3].n[0].slice(1).map(function (x) { return x.toFixed(1); }).join(' '); return [[o, 'Esse é outro aluno, de outra turma.'], [ok.split(' ').reverse().join(' '), 'A ordem é nota1, nota2, nota3.'], [String(p.a), 'A função imprime as notas, não o id.']]; }),
    p: [{ t: 0, a: 102, q: 'Qual a saída de <code>notasDe(1001, 102)</code>?' }, { t: 1, a: 107, q: 'Qual a saída de <code>notasDe(1002, 107)</code>?' }, { t: 2, a: 111, q: 'Qual a saída de <code>notasDe(1003, 111)</code>?' }] },

  { id: 'a5-l204', topic: 't-relacional', ref: E2 + '4', title: 'Média de um aluno', type: 'drag', make: function (p) {
    var r = T[p.t].n[p.k];
    return { q: 'Complete a função que devolve a média das três notas de um registro Nota. Para o aluno ' + r[0] + ' (' + nome(r[0]) + ') dá ' + f2(med(r)) + '.', code: R`float mediaAluno(Nota n) {
    return [[(n.nota1 + n.nota2 + n.nota3) / 3]];
}

/* na main: */
float m = mediaAluno([[turmas[${p.t}].notas[${p.k}]]]);`, extra: [['n.nota1 + n.nota2 + n.nota3 / 3', 'Sem parênteses, só nota3 é dividida.'], ['(nota1 + nota2 + nota3) / 3', 'Os campos precisam da variável: n.nota1.'], ['turmas[' + p.t + '].notas', 'Isso é o vetor de notas inteiro.'], ['turmas[' + p.t + '].alunosTurma[' + p.k + ']', 'alunosTurma guarda o id, não as notas.']],
      why: 'Parênteses antes de dividir.', pre: DADOS };
  }, p: [{ t: 0, k: 0 }, { t: 1, k: 2 }, { t: 2, k: 1 }] },

  { id: 'a5-l205', topic: 't-relacional', ref: E2 + '5', title: 'Média geral da turma', type: 'mc', make: saida2(R`float mediaTurma(Turma t) {
    float s = 0;
    for (int k = 0; k < t.qtdNotas; k++)
        s += (t.notas[k].nota1 + t.notas[k].nota2 + t.notas[k].nota3) / 3;
    return s / t.qtdNotas;
}`, function (p) { return 'printf("%.2f\\n", mediaTurma(turmas[' + p.t + ']));'; }, function (p) { return f2(T[p.t].n.reduce(function (a, r) { return a + med(r); }, 0) / 4); },
    function (p, ok) { return [[f2(T[p.t].n.reduce(function (a, r) { return a + r[1] + r[2] + r[3]; }, 0) / 4), 'Faltou dividir cada soma de notas por 3.'], [f2(T[p.t].n.reduce(function (a, r) { return a + r[1]; }, 0) / 4), 'Isso é a média só da nota1.'], [f2(T[(p.t + 1) % 3].n.reduce(function (a, r) { return a + med(r); }, 0) / 4), 'Essa é a média de outra turma.']]; }),
    p: [{ t: 0 }, { t: 1 }, { t: 2 }] },

  { id: 'a5-l206', topic: 't-relacional', ref: E2 + '6', title: 'Maior média da turma', type: 'mc', make: saida2(R`void maiorMedia(Turma t) {
    int m = 0;
    for (int k = 1; k < t.qtdNotas; k++) {
        Nota a = t.notas[k], b = t.notas[m];
        if (a.nota1 + a.nota2 + a.nota3 > b.nota1 + b.nota2 + b.nota3)
            m = k;
    }
    printf("%s\n", nomeAluno(t.notas[m].idAluno));
}`, function (p) { return 'maiorMedia(turmas[' + p.t + ']);'; }, function (p) { var b = T[p.t].n.slice().sort(function (x, y) { return med(y) - med(x); })[0]; return nome(b[0]); },
    function (p, ok) { var s = T[p.t].n.slice().sort(function (x, y) { return med(y) - med(x); }); var o = T[(p.t + 1) % 3].n.slice().sort(function (x, y) { return med(y) - med(x); })[0]; return [[nome(s[1][0]), 'Segunda maior média.'], [nome(s[3][0]), 'Essa é a menor média.'], [nome(o[0]), 'Esse aluno é de outra turma.']]; }),
    p: [{ t: 0 }, { t: 1 }, { t: 2 }] },

  { id: 'a5-l207', topic: 't-relacional', ref: E2 + '7', title: 'Menor média da turma', type: 'fix', make: function (p) {
    return { q: 'Deveria mostrar quem tem a menor média da ' + TUR[p.t] + '. Ache a linha errada.', code: R`void menorMedia(Turma t) {
    int m = 0;
    for (int k = 1; k < t.qtdNotas; k++)
        if (${p.c})
            ${p.a};
    printf("%s\n", nomeAluno(t.notas[m].idAluno));
}`, line: p.line,
      fixes: p.line === 4 ? [['if (soma(t.notas[k]) < soma(t.notas[m]))', 'Menor: `<`.'], ['if (soma(t.notas[k]) > soma(t.notas[m]))', 'Acharia a maior.'], ['if (t.notas[k].nota1 < t.notas[m].nota1)', 'Compara só a nota1.']] : [['m = k;', 'Guarda o índice.'], ['m = t.notas[k].idAluno;', 'Guardaria o id (105…) como índice.'], ['t.notas[m] = t.notas[k];', 'Alteraria a cópia da turma.']],
      why: 'Mesma lógica do maior, com `<`.', pre: DADOS + '\nfloat soma(Nota n) { return n.nota1 + n.nota2 + n.nota3; }' };
  }, p: [{ t: 0, c: 'soma(t.notas[k]) > soma(t.notas[m])', a: 'm = k', line: 4 }, { t: 1, c: 'soma(t.notas[k]) < soma(t.notas[m])', a: 'm = t.notas[k].idAluno', line: 5 }, { t: 2, c: 't.notas[k].nota1 < t.notas[m].nota1', a: 'm = k', line: 4 }] },

  { id: 'a5-l208', topic: 't-relacional', ref: E2 + '8', title: 'Aprovados (média ≥ 7)', type: 'mc', make: saida2(R`void aprovados(Turma t) {
    for (int k = 0; k < t.qtdNotas; k++) {
        Nota n = t.notas[k];
        if ((n.nota1 + n.nota2 + n.nota3) / 3 >= 7)
            printf("%d ", n.idAluno);
    }
    printf("fim\n");
}`, function (p) { return 'aprovados(turmas[' + p.t + ']);'; }, function (p) { return T[p.t].n.filter(function (r) { return med(r) >= 7; }).map(function (r) { return r[0]; }).concat(['fim']).join(' '); },
    function (p, ok) { return [[T[p.t].n.filter(function (r) { return med(r) >= 6; }).map(function (r) { return r[0]; }).concat(['fim']).join(' ') === ok ? T[p.t].n.map(function (r) { return r[0]; }).concat(['fim']).join(' ') : T[p.t].n.filter(function (r) { return med(r) >= 6; }).map(function (r) { return r[0]; }).concat(['fim']).join(' '), 'O corte é 7.'], [T[p.t].n.filter(function (r) { return med(r) < 7; }).map(function (r) { return r[0]; }).concat(['fim']).join(' '), 'Esses são os que NÃO atingiram 7.'], [T[p.t].n.filter(function (r) { return r[1] >= 7; }).map(function (r) { return r[0]; }).concat(['fim', '(nota1)']).join(' '), 'Critério é a média, não a nota1.']]; }),
    p: [{ t: 0 }, { t: 1 }, { t: 2 }] },

  { id: 'a5-l209', topic: 't-relacional', ref: E2 + '9', title: 'Reprovados (média < 5)', type: 'mc', make: saida2(R`int reprovados(Turma t) {
    int c = 0;
    for (int k = 0; k < t.qtdNotas; k++) {
        Nota n = t.notas[k];
        if ((n.nota1 + n.nota2 + n.nota3) / 3 < 5) {
            printf("%s; ", nomeAluno(n.idAluno));
            c++;
        }
    }
    return c;
}`, function (p) { return 'printf("%d\\n", reprovados(turmas[' + p.t + ']));'; }, function (p) { var l = T[p.t].n.filter(function (r) { return med(r) < 5; }); return l.map(function (r) { return nome(r[0]) + ';'; }).concat([String(l.length)]).join(' '); },
    function (p) { return p.w; }),
    p: [
      { t: 1, why: 'Eduarda (3.33) e Gabriela (3.67) ficam abaixo de 5.', w: [['Eduarda Ramos; Felipe Martins; Gabriela Torres; 3', 'Felipe tem média 6.0.'], ['2', 'A função imprime os nomes antes do printf da main.'], ['Gabriela Torres; 1', 'Eduarda também está abaixo de 5.']] },
      { t: 0, why: 'Na turma 1001 a menor média é 6.17 (Bruno): ninguém abaixo de 5.', w: [['Bruno Lima; 1', 'Bruno tem 6.17.'], ['Bruno Lima; Daniel Costa; 2', 'Os dois estão acima de 5.'], ['nenhum', 'A função devolve 0 e a main imprime o número.']] },
      { t: 1, q: 'Qual a saída de <code>printf("%d\\n", reprovados(turmas[1]))</code> se, antes, a nota1 do aluno 106 for trocada para 0 (<code>turmas[1].notas[1].nota1 = 0;</code>)?', mod: 'turmas[1].notas[1].nota1 = 0;', ok: 'Eduarda Ramos; Felipe Martins; Gabriela Torres; 3', why: 'Felipe passa a ter (0 + 6 + 7) / 3 = 4.33.', w: [['Eduarda Ramos; Gabriela Torres; 2', 'A alteração derruba a média do Felipe.'], ['3', 'Os nomes saem antes do número.'], ['Felipe Martins; 1', 'Eduarda e Gabriela continuam abaixo de 5.']] }] },

  { id: 'a5-l210', topic: 't-relacional', ref: E2 + '10', title: 'Jovens sem nenhum zero', type: 'mc', make: function (p) {
    var res = [];
    T.forEach(function (t) { t.n.forEach(function (r) { if (AL[r[0]][1] < p.lim && r[1] !== 0 && r[2] !== 0 && r[3] !== 0) res.push(nome(r[0])); }); });
    var semZero = [];
    T.forEach(function (t) { t.n.forEach(function (r) { if (AL[r[0]][1] < p.lim) semZero.push(nome(r[0])); }); });
    return { q: 'Alunos (de todas as turmas) com idade menor que ' + p.lim + ' e sem nenhuma nota zero. Qual a saída?', saida: true, pre: DADOS, code: R`int main() {
    for (int t = 0; t < qtdTurmas; t++)
        for (int k = 0; k < turmas[t].qtdNotas; k++) {
            Nota n = turmas[t].notas[k];
            if (idadeAluno(n.idAluno) < ${p.lim} && n.nota1 != 0 && n.nota2 != 0 && n.nota3 != 0)
                printf("%s; ", nomeAluno(n.idAluno));
        }
    printf("fim\n");
    return 0;
}`, opts: uniq([[res.map(function (x) { return x + ';'; }).concat(['fim']).join(' '), 'Idade abaixo de ' + p.lim + ' e as três notas diferentes de zero.'], [semZero.concat(['Gabriela Torres']).map(function (x) { return x + ';'; }).concat(['fim']).join(' '), 'Gabriela tem zero e 23 anos.'], ['Gabriela Torres; fim', 'Ela tirou zero na nota1.'], [res.length ? 'fim' : 'Daniel Costa; Joao Santos; fim', res.length ? 'Há alunos que atendem.' : 'Eles têm 18 anos: não são MENORES de 18.']]) };
  }, p: [{ lim: 18 }, { lim: 20 }, { lim: 21 }] },

  { id: 'a5-l211', topic: 't-relacional', ref: E2 + '11', title: 'Quantos acima da média da turma', type: 'mc', make: saida2(R`int acima(Turma t) {
    float s = 0, m[50];
    for (int k = 0; k < t.qtdNotas; k++) {
        m[k] = (t.notas[k].nota1 + t.notas[k].nota2 + t.notas[k].nota3) / 3;
        s += m[k];
    }
    float mt = s / t.qtdNotas;
    int c = 0;
    for (int k = 0; k < t.qtdNotas; k++)
        if (m[k] > mt)
            c++;
    return c;
}`, function (p) { return 'printf("%d\\n", acima(turmas[' + p.t + ']));'; }, function (p) { var mt = T[p.t].n.reduce(function (a, r) { return a + med(r); }, 0) / 4; return String(T[p.t].n.filter(function (r) { return med(r) > mt; }).length); },
    function (p, ok) { return [['1', 'Confira cada média contra a da turma.'], ['3', 'Só dois ficam acima.'], ['4', 'Nem todos passam da média.']].filter(function (o) { return o[0] !== ok; }); }),
    p: [{ t: 0 }, { t: 1 }, { t: 2 }] },

  { id: 'a5-l212', topic: 't-relacional', ref: E2 + '12', title: 'Porcentagem de aprovados e reprovados', type: 'mc', make: saida2(R`void porcentagens(Turma t) {
    int ap = 0, rp = 0;
    for (int k = 0; k < t.qtdNotas; k++) {
        float m = (t.notas[k].nota1 + t.notas[k].nota2 + t.notas[k].nota3) / 3;
        if (m >= 7)
            ap++;
        else if (m < 5)
            rp++;
    }
    printf("%.0f%% aprovados, %.0f%% reprovados\n", 100.0 * ap / t.qtdNotas, 100.0 * rp / t.qtdNotas);
}`, function (p) { return 'porcentagens(turmas[' + p.t + ']);'; }, function (p) { var a = T[p.t].n.filter(function (r) { return med(r) >= 7; }).length, r = T[p.t].n.filter(function (x) { return med(x) < 5; }).length; return (25 * a) + '% aprovados, ' + (25 * r) + '% reprovados'; },
    function (p, ok) { var a = T[p.t].n.filter(function (r) { return med(r) >= 7; }).length, r = T[p.t].n.filter(function (x) { return med(x) < 5; }).length; return uniq([[(25 * a) + '% aprovados, ' + (100 - 25 * a) + '% reprovados', 'Quem fica entre 5 e 7 não é reprovado (é exame).'], [a + '% aprovados, ' + r + '% reprovados', 'Isso é a quantidade, não a porcentagem.'], [(25 * r) + '% aprovados, ' + (25 * a) + '% reprovados', 'Trocou os dois.']]).concat(a === r ? [['50% aprovados, 50% reprovados', 'Confira os cortes 7 e 5.']] : []); }),
    p: [{ t: 0 }, { t: 1 }, { t: 2 }] },

  { id: 'a5-l213', topic: 't-relacional', ref: E2 + '13', title: 'Mesma nota nas três provas', type: 'fix', make: function (p) {
    return { q: 'Verificar se há algum aluno com a mesma nota nas três provas (ex.: 7, 7, 7). Ache a linha errada.', code: R`int mesmaNota(Turma t) {
    for (int k = 0; k < t.qtdNotas; k++) {
        Nota n = t.notas[k];
        if (${p.c})
            return 1;
    }
    return 0;
}`, line: 4,
      fixes: [['if (n.nota1 == n.nota2 && n.nota2 == n.nota3)', 'As três iguais: duas comparações com &&.'], ['if (n.nota1 == n.nota2 == n.nota3)', 'Em C isso compara o resultado (0 ou 1) com nota3.'], ['if (n.nota1 == n.nota2 || n.nota2 == n.nota3)', 'Basta duas iguais para passar: errado.']],
      why: 'Igualdade das três: `a == b && b == c`.', pre: DADOS };
  }, p: [{ c: 'n.nota1 == n.nota2 == n.nota3' }, { c: 'n.nota1 == n.nota2 || n.nota2 == n.nota3' }, { c: 'n.nota1 = n.nota2 && n.nota2 = n.nota3' }] },

  { id: 'a5-l214', topic: 't-relacional', ref: E2 + '14', title: 'Maior nota individual', type: 'drag', make: function (p) {
    return { q: 'Complete: a maior nota isolada (não a média) entre todos os alunos de ' + p.esc + '.', code: R`float maior = [[-1]];
for (int t = 0; t < ${p.qt}; t++)
    for (int k = 0; k < turmas[t].qtdNotas; k++) {
        Nota n = [[turmas[t].notas[k]]];
        if (n.nota1 > maior)
            maior = n.nota1;
        if (n.nota2 > maior)
            maior = n.nota2;
        if ([[n.nota3 > maior]])
            maior = n.nota3;
    }
printf("%.1f\n", maior);`, extra: [['turmas[k].notas[t]', 'Os índices trocaram.'], ['n.nota3 < maior', 'Assim pegaria o menor.'], ['11', 'Começar acima de qualquer nota impede achar o maior.']],
      why: 'Compara cada uma das três notas de cada registro. Aqui o resultado é ' + p.r + '.', pre: DADOS };
  }, p: [{ esc: 'todas as turmas', qt: 'qtdTurmas', r: '10.0' }, { esc: 'só a primeira turma', qt: '1', r: '10.0' }, { esc: 'as duas primeiras turmas', qt: '2', r: '10.0' }] },

  { id: 'a5-l215', topic: 't-relacional', ref: E2 + '15', title: 'O destaque de cada turma', type: 'mc', make: function (p) {
    var crit = p.c === 'media' ? med : function (r) { return r[p.c]; };
    var ok = T.map(function (t) { var b = t.n[0]; t.n.forEach(function (r) { if (crit(r) > crit(b)) b = r; }); return nome(b[0]); }).join('; ');
    var alt = T.map(function (t) { var b = t.n[0]; t.n.forEach(function (r) { if (crit(r) < crit(b)) b = r; }); return nome(b[0]); }).join('; ');
    return { q: 'Para cada turma, o nome do aluno com ' + p.d + '. Qual a saída?', saida: true, pre: DADOS, code: R`float crit(Nota n) {
    return ${p.expr};
}

int main() {
    for (int t = 0; t < qtdTurmas; t++) {
        int b = 0;
        for (int k = 1; k < turmas[t].qtdNotas; k++)
            if (crit(turmas[t].notas[k]) > crit(turmas[t].notas[b]))
                b = k;
        printf("%s; ", nomeAluno(turmas[t].notas[b].idAluno));
    }
    printf("\n");
    return 0;
}`, opts: [[ok + ';', 'Um destaque por turma.'], [alt + ';', 'Esses têm o MENOR valor.'], [ok.split('; ')[0] + ';', 'São três turmas.'], [ok.split('; ').reverse().join('; ') + ';', 'A ordem segue as turmas 1001, 1002, 1003.']] };
  }, p: [{ c: 'media', d: 'a maior média', expr: '(n.nota1 + n.nota2 + n.nota3) / 3' }, { c: 3, d: 'a maior nota3', expr: 'n.nota3' }, { c: 1, d: 'a maior nota1', expr: 'n.nota1' }] },

  { id: 'a5-l216', topic: 't-relacional', ref: E2 + '16', title: 'Turma jovem ou adulta', type: 'mc', make: saida2(R`void perfil(Turma t) {
    int s = 0;
    for (int i = 0; i < t.qtdAlunos; i++)
        s += idadeAluno(t.alunosTurma[i]);
    float m = (float) s / t.qtdAlunos;
    printf("%.2f %s\n", m, m <= 20 ? "jovem" : "adulta");
}`, function (p) { return 'perfil(turmas[' + p.t + ']);'; }, function (p) { var m = T[p.t].n.reduce(function (a, r) { return a + AL[r[0]][1]; }, 0) / 4; return f2(m) + ' ' + (m <= 20 ? 'jovem' : 'adulta'); },
    function (p, ok) { var m = T[p.t].n.reduce(function (a, r) { return a + AL[r[0]][1]; }, 0) / 4; return [[f2(m) + ' ' + (m <= 20 ? 'adulta' : 'jovem'), 'Jovem é média até 20 (inclusive).'], [f2(Math.floor(m)) + ' ' + (m <= 20 ? 'jovem' : 'adulta'), 'O `(float)` evita a divisão inteira.'], [f2(m * 4) + ' adulta', 'Faltou dividir pela quantidade.']]; }),
    p: [{ t: 0 }, { t: 1 }, { t: 2 }] },

  { id: 'a5-l217', topic: 't-relacional', ref: E2 + '17', title: 'Nunca abaixo de 5', type: 'mc', make: saida2(R`int nuncaAbaixo5(Turma t) {
    int c = 0;
    for (int k = 0; k < t.qtdNotas; k++) {
        Nota n = t.notas[k];
        if (n.nota1 >= 5 && n.nota2 >= 5 && n.nota3 >= 5)
            c++;
    }
    return c;
}`, function (p) { return 'printf("%d\\n", nuncaAbaixo5(turmas[' + p.t + ']));'; }, function (p) { return String(T[p.t].n.filter(function (r) { return r[1] >= 5 && r[2] >= 5 && r[3] >= 5; }).length); },
    function (p, ok) { var a = T[p.t].n.filter(function (r) { return r[1] >= 5 || r[2] >= 5 || r[3] >= 5; }).length; return uniq([[String(a === +ok ? 4 - +ok : a), 'Com `||` basta uma nota ≥ 5.'], [String(T[p.t].n.filter(function (r) { return med(r) >= 5; }).length) === ok ? String((+ok + 2) % 5) : String(T[p.t].n.filter(function (r) { return med(r) >= 5; }).length), 'O critério é cada nota, não a média.'], [String(4 - +ok) === ok ? '0' : '4', 'Confira as três notas de cada aluno.']]).filter(function (o) { return o[0] !== ok; }).slice(0, 3); }),
    p: [{ t: 0 }, { t: 1 }, { t: 2 }] },

  { id: 'a5-l218', topic: 't-relacional', ref: E2 + '18', title: 'Pelo menos uma nota 10', type: 'mc', make: saida2(R`void comDez(Turma t) {
    for (int k = 0; k < t.qtdNotas; k++) {
        Nota n = t.notas[k];
        if (n.nota1 == 10 || n.nota2 == 10 || n.nota3 == 10)
            printf("%s; ", nomeAluno(n.idAluno));
    }
    printf("fim\n");
}`, function (p) { return 'comDez(turmas[' + p.t + ']);'; }, function (p) { return T[p.t].n.filter(function (r) { return r[1] === 10 || r[2] === 10 || r[3] === 10; }).map(function (r) { return nome(r[0]) + ';'; }).concat(['fim']).join(' '); },
    function (p, ok) { return uniq([[T[p.t].n.filter(function (r) { return r[1] === 10; }).map(function (r) { return nome(r[0]) + ';'; }).concat(['fim']).join(' ') === ok ? 'fim' : T[p.t].n.filter(function (r) { return r[1] === 10; }).map(function (r) { return nome(r[0]) + ';'; }).concat(['fim']).join(' '), 'Qualquer uma das três notas vale.'], [T[p.t].n.filter(function (r) { return med(r) >= 9; }).map(function (r) { return nome(r[0]) + ';'; }).concat(['fim', '(média ≥ 9)']).join(' '), 'O critério é ter um 10, não média alta.'], [nome(T[p.t].n[0][0]) + '; ' + nome(T[p.t].n[1][0]) + '; fim', 'Confira quem tem 10.']]).filter(function (o) { return o[0] !== ok; }).slice(0, 3); }),
    p: [{ t: 0 }, { t: 1 }, { t: 2 }] },

  { id: 'a5-l219', topic: 't-relacional', ref: E2 + '19', title: 'Maior variação de notas', type: 'mc', make: saida2(R`float variacao(Nota n) {
    float mx = n.nota1, mn = n.nota1;
    if (n.nota2 > mx)
        mx = n.nota2;
    if (n.nota3 > mx)
        mx = n.nota3;
    if (n.nota2 < mn)
        mn = n.nota2;
    if (n.nota3 < mn)
        mn = n.nota3;
    return mx - mn;
}

void maiorVariacao(Turma t) {
    int b = 0;
    for (int k = 1; k < t.qtdNotas; k++)
        if (variacao(t.notas[k]) > variacao(t.notas[b]))
            b = k;
    printf("%s %.1f\n", nomeAluno(t.notas[b].idAluno), variacao(t.notas[b]));
}`, function (p) { return 'maiorVariacao(turmas[' + p.t + ']);'; }, function (p) { var v = function (r) { var x = r.slice(1); return Math.max.apply(0, x) - Math.min.apply(0, x); }; var b = T[p.t].n[0]; T[p.t].n.forEach(function (r) { if (v(r) > v(b)) b = r; }); return nome(b[0]) + ' ' + v(b).toFixed(1); },
    function (p, ok) { var v = function (r) { var x = r.slice(1); return Math.max.apply(0, x) - Math.min.apply(0, x); }; var s = T[p.t].n.slice().sort(function (a, b) { return v(a) - v(b); }); return uniq([[nome(s[0][0]) + ' ' + v(s[0]).toFixed(1), 'Essa é a MENOR variação.'], [ok.split(' ').slice(0, -1).join(' ') + ' ' + (+ok.split(' ').pop() / 2).toFixed(1), 'Variação é maior − menor nota.'], [nome(T[p.t].n.slice().sort(function (a, b) { return med(b) - med(a); })[0][0]) + ' ' + v(T[p.t].n.slice().sort(function (a, b) { return med(b) - med(a); })[0]).toFixed(1), 'Maior média não é maior variação.']]).filter(function (o) { return o[0] !== ok; }).slice(0, 3); }),
    p: [{ t: 0 }, { t: 1 }, { t: 2 }] },

  { id: 'a5-l220', topic: 't-relacional', ref: E2 + '20', title: 'Disciplina, professor e alunos', type: 'drag', make: function (p) {
    return { q: 'Complete o cabeçalho da ' + TUR[p.t] + ': disciplina, professor e nomes dos alunos.', code: R`Turma t = turmas[${p.t}];
printf("%s - ", [[t.disciplina]]);
for (int i = 0; i < qtdProfessores; i++)
    if (professores[i].id == [[t.idProfessor]])
        printf("%s\n", professores[i].nome);
for (int i = 0; i < t.qtdAlunos; i++)
    printf("%s\n", [[nomeAluno(t.alunosTurma[i])]]);`, extra: [['t.id', 'Esse é o id da turma.'], ['t.alunosTurma[i]', 'É um id (int); o nome vem de nomeAluno.'], ['disciplina', 'Falta a variável: t.disciplina.'], ['t.idProfessor.nome', 'idProfessor é int.']],
      why: 'Saída: ' + T[p.t].disc + ' - ' + PR[T[p.t].prof] + ', seguido de ' + T[p.t].n.map(function (r) { return nome(r[0]); }).join(', ') + '.', pre: DADOS };
  }, p: [{ t: 0 }, { t: 1 }, { t: 2 }] },

  { id: 'a5-l221', topic: 't-relacional', ref: E2 + '21', title: 'Boletim da turma', type: 'fix', make: function (p) {
    return { q: 'Boletim: nome, três notas, média e situação (APROVADO se média ≥ 7, senão REPROVADO). Ache a linha errada.', code: R`void boletim(Turma t) {
    for (int k = 0; k < t.qtdNotas; k++) {
        Nota n = t.notas[k];
        float m = ${p.m};
        printf("%s %.1f %.1f %.1f %.2f %s\n", nomeAluno(n.idAluno), n.nota1, n.nota2, n.nota3, m, ${p.s});
    }
}`, line: p.line,
      fixes: p.line === 4 ? [['float m = (n.nota1 + n.nota2 + n.nota3) / 3;', 'Soma entre parênteses, depois divide.'], ['float m = n.nota1 + n.nota2 + n.nota3 / 3;', 'Só nota3 seria dividida.'], ['float m = (n.nota1 + n.nota2 + n.nota3) / 2;', 'São três notas.']]
        : [['printf("%s %.1f %.1f %.1f %.2f %s\\n", nomeAluno(n.idAluno), n.nota1, n.nota2, n.nota3, m, m >= 7 ? "APROVADO" : "REPROVADO");', 'Situação pela média, com corte 7.'], ['printf("%s %.1f %.1f %.1f %.2f %s\\n", nomeAluno(n.idAluno), n.nota1, n.nota2, n.nota3, m, m > 7 ? "APROVADO" : "REPROVADO");', 'Média exatamente 7 aprova.'], ['printf("%s %.1f %.1f %.1f %.2f %s\\n", nomeAluno(n.idAluno), n.nota1, n.nota2, n.nota3, m, n.nota1 >= 7 ? "APROVADO" : "REPROVADO");', 'O critério é a média.']],
      why: 'Média das três e corte em 7.', pre: DADOS };
  }, p: [{ m: 'n.nota1 + n.nota2 + n.nota3 / 3', s: 'm >= 7 ? "APROVADO" : "REPROVADO"', line: 4 }, { m: '(n.nota1 + n.nota2 + n.nota3) / 3', s: 'm > 7 ? "APROVADO" : "REPROVADO"', line: 5 }, { m: '(n.nota1 + n.nota2 + n.nota3) / 2', s: 'm >= 7 ? "APROVADO" : "REPROVADO"', line: 4 }] },

  { id: 'a5-l222', topic: 't-relacional', ref: E2 + '22', title: 'Professores e disciplinas', type: 'mc', make: function (p) {
    return { q: p.q, saida: true, pre: DADOS, code: R`int main() {
    for (int i = 0; i < qtdProfessores; i++) {
        int n = 0;
        for (int t = 0; t < qtdTurmas; t++)
            if (turmas[t].idProfessor == professores[i].id) {
                ${p.acao} n++;
            }
        ${p.fim}
    }
    printf("\n");
    return 0;
}`, opts: p.opts };
  }, p: [
    { q: 'Qual a saída? (cada professor e as disciplinas que ministra)', acao: 'printf("%s: %s; ", professores[i].nome, turmas[t].disciplina);', fim: '', opts: [['Carlos Silva: Algoritmos; Maria Oliveira: Estruturas de Dados; Fernanda Gomes: Banco de Dados;', 'Só aparecem os professores que têm turma.'], ['Carlos Silva: Algoritmos; Maria Oliveira: Estruturas de Dados; Joao Pereira: Banco de Dados;', 'A turma 1003 é da professora de id 4, Fernanda.'], ['Algoritmos; Estruturas de Dados; Banco de Dados;', 'O nome do professor também é impresso.'], ['Carlos Silva: Algoritmos; Maria Oliveira: Estruturas de Dados; Joao Pereira: ; Fernanda Gomes: Banco de Dados; Ricardo Almeida: ;', 'O printf só roda quando há turma.']] },
    { q: 'Qual a saída? (professores SEM turma)', acao: '', fim: 'if (n == 0) printf("%s; ", professores[i].nome);', opts: [['Joao Pereira; Ricardo Almeida;', 'Ids 3 e 5 não aparecem em nenhuma turma.'], ['Ricardo Almeida;', 'Joao Pereira (3) também não tem turma.'], ['Carlos Silva; Maria Oliveira; Fernanda Gomes;', 'Esses têm turma.'], ['Fernanda Gomes; Ricardo Almeida;', 'Fernanda (4) dá Banco de Dados.']] },
    { q: 'Qual a saída? (quantidade de disciplinas de cada professor)', acao: '', fim: 'printf("%d", n);', opts: [['11010', 'Carlos 1, Maria 1, Joao 0, Fernanda 1, Ricardo 0.'], ['11100', 'A turma 1003 é de Fernanda (id 4), não de Joao (id 3).'], ['111', 'São cinco professores, inclusive os sem turma.'], ['3', 'É um número por professor.']] }] },

  { id: 'a5-l223', topic: 't-relacional', ref: E2 + '23', title: 'Aluno em mais de uma turma', type: 'mc', make: function (p) {
    return { q: 'Qual a saída? ' + p.q, saida: true, pre: DADOS, code: R`int main() {
    ${p.mod} for (int a = 0; a < qtdAlunos; a++) {
        int c = 0;
        for (int t = 0; t < qtdTurmas; t++)
            for (int i = 0; i < turmas[t].qtdAlunos; i++)
                if (turmas[t].alunosTurma[i] == alunos[a].id)
                    c++;
        if (c > 1)
            printf("%d ", alunos[a].id);
    }
    printf("fim\n");
    return 0;
}`, opts: p.opts };
  }, p: [
    { q: '(dados originais)', mod: '', opts: [['fim', 'Nos dados da lista ninguém está em duas turmas.'], ['101 fim', 'O 101 só está na turma 1001.'], ['101 102 103 104 105 106 107 108 109 110 111 112 fim', 'Todos estão em exatamente uma turma.'], ['12 fim', 'O programa imprime ids.']] },
    { q: '(antes, o aluno 101 também é matriculado na turma 1002)', mod: 'turmas[1].alunosTurma[4] = 101; turmas[1].qtdAlunos = 5;', opts: [['101 fim', 'Agora o 101 aparece em 1001 e em 1002.'], ['fim', 'A primeira linha da main mudou os dados.'], ['105 106 107 108 101 fim', 'Só quem aparece mais de uma vez.'], ['101 101 fim', 'Cada aluno é testado uma vez.']] },
    { q: '(antes, os alunos 110 e 104 entram também na turma 1001 e 1003, respectivamente)', mod: 'turmas[0].alunosTurma[4] = 110; turmas[0].qtdAlunos = 5; turmas[2].alunosTurma[4] = 104; turmas[2].qtdAlunos = 5;', opts: [['104 110 fim', 'O laço externo segue a ordem do vetor alunos (104 vem antes de 110).'], ['110 104 fim', 'A ordem é a do vetor alunos.'], ['110 fim', 'O 104 também ganhou uma segunda turma.'], ['fim', 'As matrículas extras valem.']] }] },

  { id: 'a5-l224', topic: 't-relacional', ref: E2 + '24', title: 'Professor da turma com maior média', type: 'mc', make: function (p) {
    return { q: 'Qual a saída? (' + p.d + ')', saida: true, pre: DADOS, code: R`float mediaTurma(Turma t) {
    float s = 0;
    for (int k = 0; k < t.qtdNotas; k++)
        s += (t.notas[k].nota1 + t.notas[k].nota2 + t.notas[k].nota3) / 3;
    return s / t.qtdNotas;
}

int main() {
    int b = 0;
    for (int t = 1; t < qtdTurmas; t++)
        if (mediaTurma(turmas[t]) ${p.op} mediaTurma(turmas[b]))
            b = t;
    for (int i = 0; i < qtdProfessores; i++)
        if (professores[i].id == turmas[b].idProfessor)
            printf("%s %.2f\n", professores[i].nome, mediaTurma(turmas[b]));
    return 0;
}`, opts: p.opts };
  }, p: [
    { d: 'maior média', op: '>', opts: [['Carlos Silva 7.88', 'Algoritmos tem média 7.875, pouco acima de Banco de Dados (7.75).'], ['Fernanda Gomes 7.75', 'Banco de Dados fica um pouco abaixo de Algoritmos.'], ['Maria Oliveira 5.29', 'Essa é a menor.'], ['Carlos Silva 9.17', 'Isso é a média só da Ana.']] },
    { d: 'menor média', op: '<', opts: [['Maria Oliveira 5.29', 'Estruturas de Dados tem a menor média.'], ['Carlos Silva 7.88', 'Essa é a maior.'], ['Maria Oliveira 3.33', 'Isso é só a média da Eduarda.'], ['Fernanda Gomes 7.75', 'Não é a menor.']] },
    { d: 'maior média, mas o laço usa ≥', op: '>=', opts: [['Carlos Silva 7.88', 'Não há empate: a maior continua sendo Algoritmos.'], ['Fernanda Gomes 7.75', 'Com ≥ só trocaria num empate exato.'], ['Maria Oliveira 5.29', 'É a menor.'], ['Joao Pereira 7.75', 'Joao não tem turma.']] }] },

  /* ===== Exercícios dos slides A5 ===== */
  { id: 'a5-s01', topic: 't-aninhadas', ref: 'Slides A5, exercício da struct RegCliente', title: 'Campo de struct aninhada', type: 'mc', make: function (p) {
    return { q: 'Com <code>struct { char nome[15]; char sobrenome[15]; int numCliente; struct { char telefone[11]; char endereco[50]; char cidade[25]; char estado[2]; char cep[8]; } Pessoal; } RegCliente;</code>, como se acessa ' + p.d + '?', opts: [['`RegCliente.' + p.c + '`', p.w], ['`RegCliente->' + p.c.replace('.', '->') + '`', 'Seta é para ponteiro; aqui tudo é variável struct.'], ['`' + p.c.split('.').pop() + '`', 'O campo sozinho não existe fora da struct.'], ['`RegCliente.' + p.c.split('.').pop() + '`', p.c.indexOf('.') >= 0 ? 'Esse campo está dentro de Pessoal.' : 'Confira o nome do campo.']].filter(function (o, i, a) { return a.findIndex(function (x) { return x[0] === o[0]; }) === i; }).concat(p.c.indexOf('.') < 0 ? [['`RegCliente.Pessoal.' + p.c + '`', p.c + ' fica no nível de fora, não em Pessoal.']] : []) };
  }, p: [{ d: 'o telefone do membro Pessoal', c: 'Pessoal.telefone', w: 'Um ponto para cada nível.' }, { d: 'a cidade do membro Pessoal', c: 'Pessoal.cidade', w: 'Primeiro Pessoal, depois cidade.' }, { d: 'o sobrenome', c: 'sobrenome', w: 'sobrenome está no nível de fora.' }] },

  { id: 'a5-s02', topic: 't-funcao', ref: 'Slides A5, exercício exibir_pessoa', title: 'Struct passada por valor', type: 'mc', make: function (p) {
    return { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
#include <string.h>
typedef struct {
    char nome[30];
    int idade;
} Pessoa;
void exibir_pessoa(Pessoa p) {
    p.idade = p.idade + ${p.inc};
    printf("%s %d / ", p.nome, p.idade);
}

int main() {
    Pessoa x;
    strcpy(x.nome, "${p.n}");
    x.idade = ${p.i};
    exibir_pessoa(x);
    printf("%d\n", x.idade);
    return 0;
}`, opts: [[p.n + ' ' + (p.i + p.inc) + ' / ' + p.i, 'Dentro da função a cópia muda; na main, x continua igual.'], [p.n + ' ' + (p.i + p.inc) + ' / ' + (p.i + p.inc), 'Por valor, a alteração não volta para a main.'], [p.n + ' ' + p.i + ' / ' + p.i, 'Dentro da função a cópia foi alterada antes do printf.'], [p.n + ' ' + p.i + ' / ' + (p.i + p.inc), 'A main não vê a mudança.']] };
  }, p: [{ n: 'Ana', i: 20, inc: 1 }, { n: 'Rui', i: 35, inc: 10 }, { n: 'Lia', i: 18, inc: 2 }] }
  ];
})();

/* Variantes V2 e V3 escritas à mão (2026-11-18): outra tarefa, outra lógica, outro erro. V1 vem dos moldes acima.
   Gerado por _tools/gerar_alt.mjs a partir de _tools/alt/a5.alt.js; null = a versão do molde continua valendo. */
(function () {
  window.ALT = window.ALT || {};
  window.ALT['a5-l101'] = [
    {
      q: "Complete as structs aninhadas <code>Data</code> e <code>Pessoa</code> e a leitura dos campos.",
      code: "typedef struct {\n    int dia, mes, ano;\n} Data;\n\ntypedef struct {\n    char nome[40];\n    [[Data]] nasc;\n} Pessoa;\n\nint main() {\n    Pessoa p;\n    scanf(\" %39[^\\n]\", [[p.nome]]);\n    scanf(\"%d %d %d\", [[&p.nasc.dia]], &p.nasc.mes, &p.nasc.ano);\n    printf(\"%s nasceu em %d\\n\", p.nome, [[p.nasc.ano]]);\n    return 0;\n}",
      extra: [
        ["struct Data", "Com typedef anônimo o tipo se chama só `Data`."],
        ["p.dia", "O dia está dentro de `nasc`: `p.nasc.dia`."],
        ["&p.nome", "O campo string já é endereço (vetor de char)."],
        ["Pessoa.nasc.ano", "O ponto vai na variável, não no tipo."]
      ],
      why: "Uma struct pode ter campo de outra struct; o acesso encadeia os pontos: `p.nasc.ano`."
    },
    {
      q: "Complete a função que lê um aluno e o devolve por valor, e a chamada na main.",
      code: "typedef struct {\n    char nome[50];\n    int matricula;\n} Aluno;\n\nAluno lerAluno() {\n    Aluno a;\n    scanf(\" %49[^\\n]\", [[a.nome]]);\n    scanf(\"%d\", [[&a.matricula]]);\n    [[return a]];\n}\n\nint main() {\n    Aluno x = [[lerAluno()]];\n    printf(\"%s %d\\n\", x.nome, x.matricula);\n    return 0;\n}",
      extra: [
        ["&a.nome", "O campo string já é endereço."],
        ["a.matricula", "scanf de número precisa do `&`."],
        ["return &a", "Devolveria o endereço da variável local, e a função devolve a struct."],
        ["lerAluno", "Sem os parênteses não chama a função."]
      ],
      why: "A função preenche uma struct local e a devolve; a cópia vai para `x`.",
      nocc: true
    }
  ];
  window.ALT['a5-l103'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\n#include <string.h>\ntypedef struct {\n    int codigo;\n    char nome[40];\n    float preco;\n} Produto;\nint main() {\n    Produto p;\n    p.codigo = 12;\n    strcpy(p.nome, \"Caderno\");\n    p.preco = 15.5;\n    printf(\"[%-9s|%6.1f|%04d]\\n\", p.nome, p.preco, p.codigo);\n    return 0;\n}",
      opts: [
        ["[Caderno  |  15.5|0012]", "`%-9s` alinha à esquerda em 9 colunas; `%6.1f` ocupa 6 colunas; `%04d` completa com zeros."],
        ["[Caderno|15.5|12]", "Os campos têm largura mínima e zeros à esquerda."],
        ["[  Caderno|  15.5|0012]", "O `-` alinha o texto à esquerda."],
        ["[Caderno  |15.50|0012]", "`%6.1f` mostra uma casa decimal e 6 colunas."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\n#include <string.h>\ntypedef struct {\n    int codigo;\n    char nome[40];\n    float preco;\n} Produto;\nint main() {\n    Produto p = {12, \"Caderno\", 15.5};\n    Produto q = p;\n    q.preco += 2.5;\n    q.codigo++;\n    printf(\"%d %.2f %d %.2f\\n\", p.codigo, p.preco, q.codigo, q.preco);\n    return 0;\n}",
      opts: [
        ["12 15.50 13 18.00", "A atribuição entre structs copia os campos: alterar `q` não afeta `p`."],
        ["13 18.00 13 18.00", "q é uma cópia, não outro nome para p."],
        ["12 15.50 12 15.50", "q foi alterado depois da cópia."],
        ["12 18.00 13 18.00", "p não é alterado pelas mudanças em q."]
      ]
    }
  ];
  window.ALT['a5-l104'] = [
    {
      q: "Complete o programa que acha a conta de maior saldo num vetor de structs inicializado.",
      code: "typedef struct {\n    char nome[30];\n    float saldo;\n} Conta;\n\nint main() {\n    Conta v[4] = {{\"Ana\", 120.5}, {\"Beto\", 80}, {\"Caio\", 300}, {\"Duda\", 99.9}};\n    int maior = [[0]];\n    for (int i = 1; i < 4; i++)\n        if ([[v[i].saldo > v[maior].saldo]])\n            maior = [[i]];\n    printf(\"%s %.1f\\n\", [[v[maior].nome]], v[maior].saldo);\n    return 0;\n}",
      extra: [
        ["v[0].saldo", "maior guarda uma posição, não um valor."],
        ["v[i] > v[maior]", "Structs não se comparam com `>`."],
        ["v[i].saldo", "maior guarda uma posição."],
        ["v.nome[maior]", "A ordem de índice e campo está trocada."]
      ],
      why: "Guarda-se a posição do maior e compara-se o campo `saldo` em cada volta."
    },
    {
      q: "Complete a ordenação por troca (bubble) de um vetor de structs pelo campo <code>codigo</code>.",
      code: "typedef struct {\n    int codigo;\n    char nome[30];\n} Cliente;\n\nvoid ordenar(Cliente v[], int n) {\n    for (int i = 0; i < n - 1; i++)\n        for (int j = 0; [[j < n - 1 - i]]; j++)\n            if ([[v[j].codigo > v[j + 1].codigo]]) {\n                Cliente aux = [[v[j]]];\n                v[j] = v[j + 1];\n                [[v[j + 1] = aux]];\n            }\n}",
      extra: [
        ["j < n", "Leria v[n], fora do vetor."],
        ["v[j] > v[j + 1]", "Structs não se comparam com `>`."],
        ["v[j].codigo", "aux é uma struct, não um número."],
        ["v[j] = aux", "Perderia o valor de v[j + 1]."]
      ],
      why: "Compara-se o campo e troca-se o registro inteiro, com um auxiliar do mesmo tipo da struct."
    }
  ];
  window.ALT['a5-l105'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\ntypedef struct {\n    char nome[30];\n    float nota;\n} Estudante;\nint main() {\n    Estudante e[4] = {{\"Ana\", 7}, {\"Rui\", 4}, {\"Lia\", 9}, {\"Edu\", 6}};\n    float soma = 0;\n    int melhor = 0, acima = 0;\n    for (int i = 0; i < 4; i++) {\n        soma += e[i].nota;\n        if (e[i].nota > e[melhor].nota)\n            melhor = i;\n    }\n    float media = soma / 4;\n    for (int i = 0; i < 4; i++)\n        if (e[i].nota > media)\n            acima++;\n    printf(\"%.2f %d %s\\n\", media, acima, e[melhor].nome);\n    return 0;\n}",
      opts: [
        ["6.50 2 Lia", "Média 26 ÷ 4 = 6,5; acima dela só 7 e 9; a maior nota é a da Lia."],
        ["6.50 3 Lia", "O 6 é menor que 6,5."],
        ["26.00 2 Lia", "Esqueceu de dividir a soma."],
        ["6.50 2 Ana", "A melhor nota é 9, da Lia."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\ntypedef struct {\n    char nome[30];\n    float nota;\n} Estudante;\nint main() {\n    Estudante e[3] = {{\"Ana\", 7}, {\"Rui\", 8}, {\"Lia\", 9}};\n    Estudante t = e[0];\n    e[0] = e[2];\n    e[2] = t;\n    for (int i = 0; i < 3; i++)\n        printf(\"%s \", e[i].nome);\n    printf(\"\\n\");\n    return 0;\n}",
      opts: [
        ["Lia Rui Ana", "A troca de structs inteiras leva a Lia para o início e a Ana para o fim."],
        ["Ana Rui Lia", "A troca foi feita antes do laço."],
        ["Lia Rui Lia", "O auxiliar guardou a Ana antes de ela ser sobrescrita."],
        ["Ana Rui Ana", "O auxiliar guardou a Ana, que vai para o fim."]
      ]
    }
  ];
  window.ALT['a5-l106'] = [
    null,
    {
      q: "Entre 10 produtos, mostrar o nome e o preço do mais caro. Ache a linha errada.",
      code: "int pm = 0;\nfor (int i = 1; i < 10; i++)\n    if (prod[i].preco > prod[pm].preco)\n        pm = i;\nprintf(\"%s %.2f\\n\", prod.nome, prod.preco);",
      line: 5,
      fixes: [
        ["printf(\"%s %.2f\\n\", prod[pm].nome, prod[pm].preco);", "O vetor precisa do índice do mais caro antes do campo."],
        ["printf(\"%s %.2f\\n\", prod[i].nome, prod[i].preco);", "`i` só existe dentro do laço."],
        ["printf(\"%s %.2f\\n\", prod[0].nome, prod[0].preco);", "Mostraria sempre o primeiro produto."]
      ],
      why: "`prod` é um vetor: antes de acessar o campo é preciso escolher o elemento, aqui `prod[pm]`.",
      pin: "typedef struct { int codigo; char nome[30]; float preco; } Produto; Produto prod[10] = {{1, \"a\", 1.5}};"
    }
  ];
  window.ALT['a5-l107'] = [
    {
      q: "Complete a função que devolve a posição do aluno com a matrícula procurada (ou −1) e o uso na main.",
      code: "int buscar(Aluno al[], int n, int mat) {\n    for (int i = 0; i < n; i++)\n        if ([[al[i].matricula == mat]])\n            return [[i]];\n    return [[-1]];\n}\n\n/* na main: */\nAluno al[5] = {{\"Ana\", 321, 7.5}};\nint pos = buscar(al, 5, 321);\nif ([[pos >= 0]])\n    printf(\"%s\\n\", al[pos].nome);",
      extra: [
        ["al[i] == mat", "Structs não se comparam com `==`."],
        ["al[i].nome", "A função devolve a posição."],
        ["0", "0 é uma posição válida; a falha é -1."],
        ["pos > 0", "Deixaria de fora a posição 0."]
      ],
      why: "A posição vem do índice do laço; -1 sinaliza que não achou, e é isso que a main testa.",
      pre: "typedef struct { char nome[50]; int matricula; float media; } Aluno;"
    },
    {
      q: "Complete a contagem de alunos com o nome procurado num vetor de 5.",
      code: "int cont = [[0]];\nfor (int i = 0; i < 5; i++)\n    if ([[strcmp(al[i].nome, procurado) == 0]])\n        [[cont++]];\nif ([[cont > 0]])\n    printf(\"%d encontrado(s)\\n\", cont);",
      extra: [
        ["al[i].nome == procurado", "Compara endereços, não o texto."],
        ["strcmp(al[i].nome, procurado)", "Devolve 0 quando iguais, o que o `if` trataria como falso."],
        ["cont = 1", "Não acumula."],
        ["cont == 5", "Só aceitaria se todos fossem iguais."]
      ],
      why: "`strcmp` devolve 0 quando os textos são iguais; cada igualdade soma um no contador.",
      pin: "typedef struct { char nome[50]; int matricula; float media; } Aluno; Aluno al[5] = {{\"Ana\", 1, 5.0}}; char procurado[50] = \"Ana\";"
    }
  ];
  window.ALT['a5-l108'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\ntypedef struct {\n    char titulo[40];\n    float preco;\n    int quantidade;\n} Livro;\nint main() {\n    Livro v[3] = {{\"Cortico\", 20, 3}, {\"Iracema\", 35.5, 2}, {\"Quincas\", 10, 0}};\n    float total = 0;\n    for (int i = 0; i < 3; i++)\n        total += v[i].preco * v[i].quantidade;\n    printf(\"%.2f\", total);\n    for (int i = 0; i < 3; i++)\n        if (v[i].quantidade == 0)\n            printf(\" %s\", v[i].titulo);\n    printf(\"\\n\");\n    return 0;\n}",
      opts: [
        ["131.00 Quincas", "20 × 3 + 35,5 × 2 + 10 × 0 = 131; só o Quincas está esgotado."],
        ["65.50 Quincas", "Esqueceu de multiplicar o preço pela quantidade do primeiro livro."],
        ["131.00", "O livro esgotado também é impresso."],
        ["65.50 Cortico", "O total é a soma de todos os livros e o esgotado é o Quincas."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\ntypedef struct {\n    char titulo[40];\n    char autor[40];\n    int quantidade;\n} Livro;\nint main() {\n    Livro v[4] = {{\"Cortico\", \"?\", 3}, {\"Iracema\", \"?\", 7}, {\"Macunaima\", \"?\", 5}, {\"Quincas\", \"?\", 1}};\n    for (int i = 0; i < 4; i++)\n        if (v[i].quantidade < 5)\n            v[i].quantidade += 10;\n    for (int i = 0; i < 4; i++)\n        printf(\"%d \", v[i].quantidade);\n    printf(\"\\n\");\n    return 0;\n}",
      opts: [
        ["13 7 5 11 ", "Só os livros com menos de 5 recebem 10 unidades: o 3 e o 1."],
        ["13 17 15 11 ", "Todos receberiam 10."],
        ["3 7 5 1 ", "O primeiro laço altera os registros."],
        ["13 7 15 11 ", "O Macunaima tem 5 e não é menor que 5."]
      ]
    }
  ];
  window.ALT['a5-l110'] = [
    {
      q: "Os mesmos 5 alunos. Qual a saída: quem melhorou da prova 1 para a prova 3 (<code>p3 &gt; p1</code>), quantos melhoraram e quem tem a maior nota na prova 3?",
      saida: true,
      code: "#include <stdio.h>\ntypedef struct {\n    int matricula;\n    char nome[20];\n    float p1, p2, p3;\n} Aluno;\nint main() {\n    Aluno v[5] = {{1, \"Ana\", 9, 5, 6}, {2, \"Beto\", 7, 8, 9}, {3, \"Caio\", 4, 5, 3}, {4, \"Duda\", 8, 6, 7}, {5, \"Eli\", 6, 6, 6}};\n    int melhoraram = 0, mp3 = 0;\n    for (int i = 0; i < 5; i++) {\n        if (v[i].p3 > v[i].p1)\n            melhoraram++;\n        if (v[i].p3 > v[mp3].p3)\n            mp3 = i;\n    }\n    printf(\"%d %s\\n\", melhoraram, v[mp3].nome);\n    return 0;\n}",
      opts: [
        ["1 Beto", "Só o Beto tem p3 maior que p1 (9 > 7), e a maior p3 também é a dele."],
        ["2 Beto", "Ana, Caio, Duda e Eli não melhoraram: 6 < 9, 3 < 4, 7 < 8, 6 = 6."],
        ["1 Ana", "A maior nota da prova 3 é a do Beto."],
        ["0 Beto", "O Beto melhorou."]
      ]
    },
    {
      q: "Os mesmos 5 alunos. O programa ordena do maior para o menor pela média (selection sort) e mostra os nomes. Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\ntypedef struct {\n    int matricula;\n    char nome[20];\n    float p1, p2, p3;\n} Aluno;\nfloat media(Aluno a) {\n    return (a.p1 + a.p2 + a.p3) / 3;\n}\n\nint main() {\n    Aluno v[5] = {{1, \"Ana\", 9, 5, 6}, {2, \"Beto\", 7, 8, 9}, {3, \"Caio\", 4, 5, 3}, {4, \"Duda\", 8, 6, 7}, {5, \"Eli\", 6, 6, 6}};\n    for (int i = 0; i < 4; i++) {\n        int m = i;\n        for (int j = i + 1; j < 5; j++)\n            if (media(v[j]) > media(v[m]))\n                m = j;\n        Aluno aux = v[i];\n        v[i] = v[m];\n        v[m] = aux;\n    }\n    for (int i = 0; i < 5; i++)\n        printf(\"%s \", v[i].nome);\n    printf(\"\\n\");\n    return 0;\n}",
      opts: [
        ["Beto Duda Ana Eli Caio ", "Médias: Beto 8,0; Duda 7,0; Ana 6,67; Eli 6,0; Caio 4,0."],
        ["Beto Duda Eli Ana Caio ", "A média da Ana (6,67) é maior que a do Eli (6,0)."],
        ["Caio Eli Ana Duda Beto ", "Essa é a ordem crescente."],
        ["Ana Beto Caio Duda Eli ", "O vetor original não foi reordenado."]
      ]
    }
  ];
  window.ALT['a5-l111'] = [
    {
      q: "nota1 tem peso 40% e nota2 peso 60%; a média de 6,0 ou mais aprova. Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\ntypedef struct {\n    char nome[20];\n    float nota1, nota2;\n} Aluno;\nint main() {\n    Aluno a = {\"Ana\", 6, 4};\n    float m = a.nota1 * 0.4 + a.nota2 * 0.6;\n    printf(\"%s %.2f %s\\n\", a.nome, m, m >= 6.0 ? \"aprovado\" : \"recuperacao\");\n    return 0;\n}",
      opts: [
        ["Ana 4.80 recuperacao", "6 × 0,4 + 4 × 0,6 = 2,4 + 2,4 = 4,8, abaixo de 6."],
        ["Ana 5.00 recuperacao", "Essa seria a média simples (6 + 4) ÷ 2."],
        ["Ana 4.80 aprovado", "4,8 é menor que 6."],
        ["Ana 5.20 recuperacao", "Trocou os pesos: 6 × 0,6 + 4 × 0,4."]
      ]
    },
    {
      q: "Cada nota tem o seu próprio peso, guardado na struct. Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\ntypedef struct {\n    char nome[20];\n    float nota1, peso1, nota2, peso2;\n} Aluno;\nfloat ponderada(Aluno a) {\n    return (a.nota1 * a.peso1 + a.nota2 * a.peso2) / (a.peso1 + a.peso2);\n}\n\nint main() {\n    Aluno a = {\"Ana\", 6, 2, 9, 3};\n    printf(\"%s %.2f\\n\", a.nome, ponderada(a));\n    return 0;\n}",
      opts: [
        ["Ana 7.80", "(6 × 2 + 9 × 3) ÷ (2 + 3) = 39 ÷ 5."],
        ["Ana 7.50", "Essa é a média simples."],
        ["Ana 39.00", "Esqueceu de dividir pela soma dos pesos."],
        ["Ana 7.20", "Trocou os pesos entre as notas."]
      ]
    }
  ];
  window.ALT['a5-l112'] = [
    {
      q: "Inverter a ordem de 10 alunos num segundo vetor e mostrar os nomes. Complete.",
      code: "Aluno inv[10];\nfor (int i = 0; [[i < 10]]; i++)\n    inv[[[9 - i]]] = [[v[i]]];\nfor (int i = 0; i < 10; i++)\n    printf(\"%s\\n\", [[inv[i].nome]]);",
      extra: [
        ["i <= 10", "Leria v[10], fora do vetor."],
        ["v[i].nome", "Copiaria só o nome; `inv` é um vetor de structs."],
        ["inv.nome[i]", "A ordem de índice e campo está trocada."],
        ["10 - i", "Começaria na posição 10, fora do vetor."]
      ],
      why: "O elemento `i` do original vai para a posição `9 - i` do novo vetor; a struct inteira pode ser copiada com `=`.",
      pin: "typedef struct { char nome[50]; int matricula; float media; } Aluno; Aluno v[10];"
    },
    {
      q: "Separar os alunos em três faixas (nota 9 ou mais, de 7 a menos de 9, e abaixo de 7) e contar cada faixa. Complete.",
      code: "Aluno a[10], b[10], c[10];\nint na = 0, nb = 0, nc = 0;\nfor (int i = 0; i < 10; i++) {\n    if ([[v[i].media >= 9]])\n        a[[[na++]]] = v[i];\n    else if ([[v[i].media >= 7]])\n        b[nb++] = v[i];\n    else\n        [[c[nc++]]] = v[i];\n}\nprintf(\"%d %d %d\\n\", na, nb, nc);",
      extra: [
        ["v[i].media > 9", "Deixaria o 9 exato na faixa de baixo."],
        ["na", "O índice precisa avançar a cada inserção."],
        ["v[i] >= 7", "Structs não se comparam com números."],
        ["c[i]", "Gravaria na posição do vetor original, deixando buracos."]
      ],
      why: "Cada faixa tem o seu vetor e o seu contador; a ordem das condições dispensa o limite superior.",
      pin: "typedef struct { char nome[50]; float media; } Aluno; Aluno v[10] = {{\"a\", 8}};"
    }
  ];
  window.ALT['a5-l113'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\ntypedef struct {\n    char marca[16];\n    int ano;\n    float preco;\n} Carro;\nint main() {\n    Carro c[5] = {{\"Gol\", 2015, 30000}, {\"Uno\", 2012, 18000}, {\"Onix\", 2020, 65000}, {\"Ka\", 2016, 32000}, {\"Fusca\", 1978, 25000}};\n    int velho = 0, recentes = 0;\n    for (int i = 0; i < 5; i++) {\n        if (c[i].ano < c[velho].ano)\n            velho = i;\n        if (c[i].ano > 2014)\n            recentes++;\n    }\n    printf(\"%s %d\\n\", c[velho].marca, recentes);\n    return 0;\n}",
      opts: [
        ["Fusca 3", "O mais antigo é o Fusca (1978); acima de 2014 estão Gol, Onix e Ka."],
        ["Uno 3", "O Uno (2012) não é o mais antigo."],
        ["Fusca 2", "O Gol (2015) também passa de 2014."],
        ["Onix 3", "O Onix é o mais novo, não o mais antigo."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\ntypedef struct {\n    char marca[16];\n    int ano;\n    float preco;\n} Carro;\nint main() {\n    Carro c[5] = {{\"Gol\", 2015, 30000}, {\"Uno\", 2012, 18000}, {\"Onix\", 2020, 65000}, {\"Ka\", 2016, 32000}, {\"Fusca\", 1978, 25000}};\n    float soma = 0;\n    int n = 0, barato = -1;\n    for (int i = 0; i < 5; i++)\n        if (c[i].ano > 2013) {\n            soma += c[i].preco;\n            n++;\n            if (barato == -1 || c[i].preco < c[barato].preco)\n                barato = i;\n        }\n    printf(\"%s %.2f\\n\", c[barato].marca, soma / n);\n    return 0;\n}",
      opts: [
        ["Gol 42333.33", "Carros de ano maior que 2013: Gol, Onix e Ka; média 127000 ÷ 3; o mais barato deles é o Gol."],
        ["Uno 42333.33", "O Uno (2012) não entra no filtro."],
        ["Gol 31000.00", "A média foi calculada sobre dois carros apenas."],
        ["Gol 127000.00", "Esqueceu de dividir pela quantidade."]
      ]
    }
  ];
  window.ALT['a5-l114'] = [
    {
      q: "A potência agora está em watts (consumo em kWh = W ÷ 1000 × horas × 30 dias) e o kWh custa R$ 0,80. Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\ntypedef struct {\n    char nome[16];\n    float potencia_w;\n    float horas_por_dia;\n} Eletro;\nint main() {\n    Eletro e[2] = {{\"chuveiro\", 4500, 0.5}, {\"tv\", 100, 6}};\n    float kwh = 0;\n    for (int i = 0; i < 2; i++)\n        kwh += e[i].potencia_w / 1000 * e[i].horas_por_dia * 30;\n    printf(\"%.1f kWh R$ %.2f\\n\", kwh, kwh * 0.80);\n    return 0;\n}",
      opts: [
        ["85.5 kWh R$ 68.40", "Chuveiro 4,5 × 0,5 × 30 = 67,5 kWh; TV 0,1 × 6 × 30 = 18 kWh; total 85,5 kWh × 0,80."],
        ["85500.0 kWh R$ 68400.00", "Esqueceu de converter os watts para kW."],
        ["2.8 kWh R$ 2.28", "Esqueceu de multiplicar pelos 30 dias."],
        ["85.5 kWh R$ 85.50", "Faltou multiplicar pela tarifa de R$ 0,80."]
      ]
    },
    {
      q: "Qual aparelho gasta mais por mês, e quanto (kWh = kW × horas × 30)? Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\ntypedef struct {\n    char nome[16];\n    float kw;\n    float horas;\n} Eletro;\nint main() {\n    Eletro e[3] = {{\"ar\", 1.2, 8}, {\"micro\", 1.5, 0.3}, {\"pc\", 0.3, 10}};\n    int m = 0;\n    for (int i = 1; i < 3; i++)\n        if (e[i].kw * e[i].horas > e[m].kw * e[m].horas)\n            m = i;\n    printf(\"%s %.1f\\n\", e[m].nome, e[m].kw * e[m].horas * 30);\n    return 0;\n}",
      opts: [
        ["ar 288.0", "1,2 × 8 × 30 = 288 kWh, contra 13,5 do micro-ondas e 90 do computador."],
        ["micro 13.5", "O micro-ondas tem a maior potência, mas fica ligado pouco tempo."],
        ["pc 90.0", "O computador fica ligado muito, mas tem baixa potência."],
        ["ar 9.6", "Esqueceu de multiplicar pelos 30 dias."]
      ]
    }
  ];
  window.ALT['a5-l201'] = [
    {
      q: "Complete a função que lista, para cada nota de uma turma, o nome do aluno e a nota1. (turma 1002: Estruturas de Dados)",
      code: "void notas(Turma t) {\n    for (int k = 0; k < [[t.qtdNotas]]; k++)\n        printf(\"%s %.1f\\n\", [[nomeAluno(t.notas[k].idAluno)]], [[t.notas[k].nota1]]);\n}\n\n/* na main: */\nnotas([[turmas[1]]]);",
      extra: [
        ["qtdNotas", "Esse nome só existe dentro de uma Turma: `t.qtdNotas`."],
        ["t.notas[k].idAluno", "Imprimiria o id, não o nome."],
        ["t.nota1", "Turma não tem esse campo; a nota está em `t.notas[k]`."],
        ["turmas", "A função recebe uma turma, não o vetor."]
      ],
      why: "Cada Nota guarda o id do aluno; o nome vem de `nomeAluno`, e a nota1 é um campo da própria Nota.",
      pre: window.A5_DADOS
    },
    {
      q: "Complete a função que conta quantos alunos da turma têm 20 anos ou mais e o uso para a turma 1001.",
      code: "int veteranos(Turma t) {\n    int c = 0;\n    for (int i = 0; i < t.qtdAlunos; i++)\n        if ([[idadeAluno(t.alunosTurma[i]) >= 20]])\n            [[c++]];\n    return c;\n}\n\n/* na main: */\nprintf(\"%d\\n\", [[veteranos(turmas[0])]]);",
      extra: [
        ["t.alunosTurma[i].idade >= 20", "alunosTurma guarda só ids (int)."],
        ["idadeAluno(i) >= 20", "Passaria a posição, não o id."],
        ["c = 1", "Não acumula."],
        ["veteranos(turmas)", "A função recebe uma turma."]
      ],
      why: "A turma guarda ids; a idade de cada um vem de `idadeAluno(id)`.",
      pre: window.A5_DADOS
    }
  ];
  window.ALT['a5-l202'] = [
    null,
    {
      q: "Exibir o nome do professor de uma turma a partir de idProfessor. Para a turma 1003 (Banco de Dados) deveria sair Fernanda Gomes, mas saem todos os professores. Ache a linha errada.",
      code: "void professorDa(Turma t) {\n    for (int i = 0; i < qtdProfessores; i++)\n        if (professores[i].id = t.idProfessor)\n            printf(\"%s\\n\", professores[i].nome);\n}",
      line: 3,
      fixes: [
        ["if (professores[i].id == t.idProfessor)", "`==` compara os ids."],
        ["if (professores[i].id != t.idProfessor)", "Mostraria todos menos o professor da turma."],
        ["if (professores[i] == t.idProfessor)", "Uma struct não se compara com um inteiro."]
      ],
      why: "Um único `=` atribui o id da turma a cada professor e a condição vira sempre verdadeira (id não nulo).",
      pre: window.A5_DADOS
    }
  ];
  window.ALT['a5-l203'] = [
    {
      q: "Qual a saída de <code>melhorNota(1003, 112)</code>?",
      saida: true,
      code: "void melhorNota(int idTurma, int idAluno) {\n    for (int t = 0; t < qtdTurmas; t++)\n        if (turmas[t].id == idTurma)\n            for (int k = 0; k < turmas[t].qtdNotas; k++)\n                if (turmas[t].notas[k].idAluno == idAluno) {\n                    Nota n = turmas[t].notas[k];\n                    float m = n.nota1;\n                    if (n.nota2 > m)\n                        m = n.nota2;\n                    if (n.nota3 > m)\n                        m = n.nota3;\n                    printf(\"%.1f\\n\", m);\n                }\n}\n\nint main() {\n    melhorNota(1003, 112);\n    return 0;\n}",
      opts: [
        ["7.0", "O aluno 112 tem 6,0, 5,5 e 7,0: a maior é 7,0."],
        ["6.0", "Mostraria só a nota1."],
        ["18.5", "Seria a soma das três notas."],
        ["5.5", "Seria a menor nota."]
      ],
      pre: window.A5_DADOS
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "int main() {\n    for (int t = 0; t < qtdTurmas; t++) {\n        int zeros = 0;\n        for (int k = 0; k < turmas[t].qtdNotas; k++)\n            if (turmas[t].notas[k].nota1 == 0)\n                zeros++;\n        printf(\"%d \", zeros);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
      opts: [
        ["0 1 0 ", "Só a turma 1002 tem um aluno com nota1 zero (107)."],
        ["0 0 0 ", "O aluno 107 tem nota1 0.0."],
        ["1 1 1 ", "As turmas 1001 e 1003 não têm nenhum zero."],
        ["0 1 1 ", "A turma 1003 não tem zeros."]
      ],
      pre: window.A5_DADOS
    }
  ];
  window.ALT['a5-l204'] = [
    {
      q: "Complete a função que devolve a maior das três notas de um registro Nota. Para o aluno 103 (Clara Mendes) devolve 10.",
      code: "float maiorNota(Nota n) {\n    float m = n.nota1;\n    if ([[n.nota2 > m]])\n        m = n.nota2;\n    if (n.nota3 > m)\n        m = [[n.nota3]];\n    return [[m]];\n}\n\n/* na main: */\nfloat x = maiorNota([[turmas[0].notas[2]]]);",
      extra: [
        ["n.nota2 > n.nota1", "Compararia sempre com a nota1, e não com o maior até aqui."],
        ["n.nota3 > m", "Isso é a condição, não o valor a guardar."],
        ["n", "Devolveria uma struct, e a função devolve float."],
        ["turmas[0].notas", "Isso é o vetor de notas inteiro."]
      ],
      why: "Guarda-se o maior até aqui em `m`, que é devolvido; o aluno 103 é o terceiro da turma 1001.",
      pre: window.A5_DADOS
    },
    {
      q: "Complete a função que diz se o aluno foi aprovado (média 7 ou mais) e o uso para o aluno 108 (turma 1002).",
      code: "int aprovado(Nota n) {\n    return [[(n.nota1 + n.nota2 + n.nota3) / 3 >= 7]];\n}\n\n/* na main: */\nNota n = turmas[1].notas[3];\nif ([[aprovado(n)]])\n    printf(\"%s aprovado\\n\", nomeAluno([[n.idAluno]]));",
      extra: [
        ["n.nota1 + n.nota2 + n.nota3 / 3 >= 7", "Sem parênteses só a nota3 é dividida."],
        ["aprovado", "Sem os parênteses não chama a função."],
        ["n.id", "O campo se chama idAluno."],
        ["n.idAluno >= 7", "Compara o id, não a média."]
      ],
      why: "A função devolve 1 ou 0; a main usa o resultado como condição e o id do registro para buscar o nome.",
      pre: window.A5_DADOS
    }
  ];
  window.ALT['a5-l205'] = [
    {
      q: "Com os dados da lista, qual a saída (média de <strong>todos</strong> os alunos de todas as turmas)?",
      saida: true,
      code: "float mediaGeral() {\n    float s = 0;\n    int n = 0;\n    for (int t = 0; t < qtdTurmas; t++)\n        for (int k = 0; k < turmas[t].qtdNotas; k++) {\n            Nota x = turmas[t].notas[k];\n            s += (x.nota1 + x.nota2 + x.nota3) / 3;\n            n++;\n        }\n    return s / n;\n}\n\nint main() {\n    printf(\"%.2f\\n\", mediaGeral());\n    return 0;\n}",
      opts: [
        ["6.97", "Soma das 12 médias (83,67) dividida por 12."],
        ["83.67", "Esqueceu de dividir pelo número de alunos."],
        ["7.88", "Essa é a média só da turma 1001."],
        ["5.29", "Essa é a média só da turma 1002."]
      ],
      pre: window.A5_DADOS
    },
    {
      q: "Com os dados da lista, qual a saída (média apenas da <strong>nota2</strong> de todos os alunos)?",
      saida: true,
      code: "int main() {\n    float s = 0;\n    int n = 0;\n    for (int t = 0; t < qtdTurmas; t++)\n        for (int k = 0; k < turmas[t].qtdNotas; k++) {\n            s += turmas[t].notas[k].nota2;\n            n++;\n        }\n    printf(\"%.2f\\n\", s / n);\n    return 0;\n}",
      opts: [
        ["6.75", "A soma das 12 notas2 é 81; 81 ÷ 12."],
        ["81.00", "Esqueceu de dividir."],
        ["6.97", "Essa é a média geral das três notas."],
        ["6.50", "Dividiu por um número errado de alunos."]
      ],
      pre: window.A5_DADOS
    }
  ];
  window.ALT['a5-l206'] = [
    {
      q: "Com os dados da lista, qual a saída (a maior nota2 de todas as turmas e de quem é)?",
      saida: true,
      code: "int main() {\n    int bt = 0, bk = 0;\n    for (int t = 0; t < qtdTurmas; t++)\n        for (int k = 0; k < turmas[t].qtdNotas; k++)\n            if (turmas[t].notas[k].nota2 > turmas[bt].notas[bk].nota2) {\n                bt = t;\n                bk = k;\n            }\n    printf(\"%s %.1f\\n\", nomeAluno(turmas[bt].notas[bk].idAluno), turmas[bt].notas[bk].nota2);\n    return 0;\n}",
      opts: [
        ["Ana Souza 10.0", "A maior nota2 é o 10,0 da Ana (a turma 1001)."],
        ["Henrique Dias 10.0", "O 10 do Henrique é a nota1, não a nota2."],
        ["Isabela Rocha 10.0", "O 10 da Isabela é a nota3."],
        ["Ana Souza 8.5", "8,5 é a nota1 da Ana."]
      ],
      pre: window.A5_DADOS
    },
    {
      q: "Com os dados da lista, qual a saída (o aluno mais novo de todos e a disciplina em que ele está)?",
      saida: true,
      code: "int main() {\n    int m = 0;\n    for (int i = 1; i < qtdAlunos; i++)\n        if (alunos[i].idade < alunos[m].idade)\n            m = i;\n    for (int t = 0; t < qtdTurmas; t++)\n        for (int i = 0; i < turmas[t].qtdAlunos; i++)\n            if (turmas[t].alunosTurma[i] == alunos[m].id)\n                printf(\"%s %s\\n\", alunos[m].nome, turmas[t].disciplina);\n    return 0;\n}",
      opts: [
        ["Daniel Costa Algoritmos", "Daniel (18) e Joao (18) empatam; o `<` mantém o primeiro, o Daniel, na turma de Algoritmos."],
        ["Joao Santos Banco de Dados", "Com o `<` estrito, o empate fica com o primeiro encontrado."],
        ["Daniel Costa Banco de Dados", "O Daniel está na turma 1001."],
        ["Joao Santos Algoritmos", "O Joao está na turma 1003."]
      ],
      pre: window.A5_DADOS
    }
  ];
  window.ALT['a5-l207'] = [
    null,
    {
      q: "Deveria mostrar quem tem a menor média da turma 1003 (Banco de Dados), mas mostra o primeiro aluno da lista. Ache a linha errada.",
      code: "void menorMedia(Turma t) {\n    int m = 0;\n    for (int k = 1; k < t.qtdNotas; k++)\n        if (soma(t.notas[k]) < soma(t.notas[m]))\n            m = 0;\n    printf(\"%s\\n\", nomeAluno(t.notas[m].idAluno));\n}",
      line: 5,
      fixes: [
        ["m = k;", "Guarda a posição do menor encontrado até agora."],
        ["m = k + 1;", "Aponta para o aluno seguinte."],
        ["m = t.notas[k].idAluno;", "Guardaria o id, não a posição."]
      ],
      why: "Com `m = 0` a posição do menor nunca muda; é preciso guardar `k`.",
      pre: window.A5_DADOS + "\nfloat soma(Nota n) { return n.nota1 + n.nota2 + n.nota3; }"
    }
  ];
  window.ALT['a5-l208'] = [
    {
      q: "Com os dados da lista, qual a saída (alunos de qualquer turma que tiraram <strong>6 ou mais em todas as provas</strong>)?",
      saida: true,
      code: "int main() {\n    for (int t = 0; t < qtdTurmas; t++)\n        for (int k = 0; k < turmas[t].qtdNotas; k++) {\n            Nota n = turmas[t].notas[k];\n            if (n.nota1 >= 6 && n.nota2 >= 6 && n.nota3 >= 6)\n                printf(\"%d \", n.idAluno);\n        }\n    printf(\"fim\\n\");\n    return 0;\n}",
      opts: [
        ["101 103 104 108 109 110 111 fim ", "Quem tem alguma nota abaixo de 6 fica de fora: 102, 105, 106, 107 e 112."],
        ["101 102 103 104 108 109 110 111 fim ", "O 102 tem 5,5 na nota2."],
        ["101 103 104 109 111 fim ", "O 108 (10, 7, 7,5) e o 110 (7, 6,5, 7,5) também passam."],
        ["108 fim ", "Só considerou a turma 1002."]
      ],
      pre: window.A5_DADOS
    },
    {
      q: "Com os dados da lista, qual a saída (alunos em <strong>recuperação</strong>: média de 5 inclusive até 7 exclusive)?",
      saida: true,
      code: "int main() {\n    for (int t = 0; t < qtdTurmas; t++)\n        for (int k = 0; k < turmas[t].qtdNotas; k++) {\n            Nota n = turmas[t].notas[k];\n            float m = (n.nota1 + n.nota2 + n.nota3) / 3;\n            if (m >= 5 && m < 7)\n                printf(\"%d \", n.idAluno);\n        }\n    printf(\"fim\\n\");\n    return 0;\n}",
      opts: [
        ["102 106 112 fim ", "Médias 6,17, 6,0 e 6,17 estão na faixa."],
        ["102 106 107 112 fim ", "A média do 107 é 3,67, abaixo de 5."],
        ["104 110 fim ", "Essas médias são 7,17 e 7,0, que já estão aprovadas."],
        ["fim ", "Há alunos com média na faixa."]
      ],
      pre: window.A5_DADOS
    }
  ];
  window.ALT['a5-l209'] = [
    {
      q: "Com os dados da lista, qual a saída (alunos com <strong>alguma nota abaixo de 4</strong>, todas as turmas)?",
      saida: true,
      code: "int main() {\n    int c = 0;\n    for (int t = 0; t < qtdTurmas; t++)\n        for (int k = 0; k < turmas[t].qtdNotas; k++) {\n            Nota n = turmas[t].notas[k];\n            if (n.nota1 < 4 || n.nota2 < 4 || n.nota3 < 4) {\n                printf(\"%d \", n.idAluno);\n                c++;\n            }\n        }\n    printf(\"| %d\\n\", c);\n    return 0;\n}",
      opts: [
        ["105 107 | 2", "O 105 tem 3,5 e 2,5; o 107 tem 0,0. Ninguém mais tem nota abaixo de 4."],
        ["105 | 1", "O 107 também tem uma nota abaixo de 4 (o zero)."],
        ["105 106 107 | 3", "O 106 tem 5, 6 e 7."],
        ["| 0", "Há notas abaixo de 4."]
      ],
      pre: window.A5_DADOS
    },
    {
      q: "Antes, todos os alunos da turma 1002 ganham 2 pontos em cada prova. Quantos alunos dessa turma ficam com média abaixo de 5?",
      saida: true,
      code: "int main() {\n    for (int k = 0; k < turmas[1].qtdNotas; k++) {\n        turmas[1].notas[k].nota1 += 2;\n        turmas[1].notas[k].nota2 += 2;\n        turmas[1].notas[k].nota3 += 2;\n    }\n    int c = 0;\n    for (int k = 0; k < turmas[1].qtdNotas; k++) {\n        Nota n = turmas[1].notas[k];\n        if ((n.nota1 + n.nota2 + n.nota3) / 3 < 5)\n            c++;\n    }\n    printf(\"%d\\n\", c);\n    return 0;\n}",
      opts: [
        ["0", "Os dois com média abaixo de 5 (3,33 e 3,67) sobem para 5,33 e 5,67."],
        ["2", "Os dois alunos com média baixa também recebem os 2 pontos."],
        ["1", "Os dois passam de 5 depois dos pontos extras."],
        ["4", "Há apenas 4 alunos na turma e a maioria já estava acima de 5."]
      ],
      pre: window.A5_DADOS
    }
  ];
  window.ALT['a5-l210'] = [
    {
      q: "Alunos (de todas as turmas) com idade de 20 anos ou mais e <strong>pelo menos uma nota 10</strong>. Qual a saída?",
      saida: true,
      code: "int main() {\n    for (int t = 0; t < qtdTurmas; t++)\n        for (int k = 0; k < turmas[t].qtdNotas; k++) {\n            Nota n = turmas[t].notas[k];\n            if (idadeAluno(n.idAluno) >= 20 && (n.nota1 == 10 || n.nota2 == 10 || n.nota3 == 10))\n                printf(\"%s; \", nomeAluno(n.idAluno));\n        }\n    printf(\"fim\\n\");\n    return 0;\n}",
      opts: [
        ["Ana Souza; Clara Mendes; Isabela Rocha; fim ", "Ana (20), Clara (22) e Isabela (20) têm um 10; Henrique (19) também, mas é mais novo."],
        ["Ana Souza; Clara Mendes; Henrique Dias; Isabela Rocha; fim ", "O Henrique tem 19 anos."],
        ["Ana Souza; Clara Mendes; fim ", "A Isabela (20 anos) também tem um 10."],
        ["fim ", "Há alunos que atendem às duas condições."]
      ],
      pre: window.A5_DADOS
    },
    {
      q: "Qual a saída? (média de idade dos alunos <strong>aprovados</strong>, isto é, com média 7 ou mais)",
      saida: true,
      code: "int main() {\n    int soma = 0, n = 0;\n    for (int t = 0; t < qtdTurmas; t++)\n        for (int k = 0; k < turmas[t].qtdNotas; k++) {\n            Nota x = turmas[t].notas[k];\n            if ((x.nota1 + x.nota2 + x.nota3) / 3 >= 7) {\n                soma += idadeAluno(x.idAluno);\n                n++;\n            }\n        }\n    printf(\"%.2f\\n\", (float) soma / n);\n    return 0;\n}",
      opts: [
        ["19.71", "Aprovados: 101, 103, 104, 108, 109, 110 e 111, com idades somando 138; 138 ÷ 7."],
        ["20.00", "Alguma idade ou aluno foi contado a mais ou a menos."],
        ["138.00", "Esqueceu de dividir pela quantidade."],
        ["19.50", "A divisão foi feita com um número errado de alunos."]
      ],
      pre: window.A5_DADOS
    }
  ];
  window.ALT['a5-l211'] = [
    {
      q: "Com os dados da lista, qual a saída (quantos alunos ficam <strong>abaixo da média geral</strong> de todos os alunos)?",
      saida: true,
      code: "int main() {\n    float m[100], s = 0;\n    int n = 0;\n    for (int t = 0; t < qtdTurmas; t++)\n        for (int k = 0; k < turmas[t].qtdNotas; k++) {\n            Nota x = turmas[t].notas[k];\n            m[n] = (x.nota1 + x.nota2 + x.nota3) / 3;\n            s += m[n];\n            n++;\n        }\n    float geral = s / n;\n    int abaixo = 0;\n    for (int i = 0; i < n; i++)\n        if (m[i] < geral)\n            abaixo++;\n    printf(\"%d\\n\", abaixo);\n    return 0;\n}",
      opts: [
        ["5", "Média geral 6,97; abaixo dela: 102, 105, 106, 107 e 112."],
        ["4", "6,17 do 102 e do 112 também estão abaixo."],
        ["7", "O 104 (7,17) e o 110 (7,0) estão acima de 6,97."],
        ["6", "O 104 (7,17) está acima da média."]
      ],
      pre: window.A5_DADOS
    },
    {
      q: "Com os dados da lista, qual a saída (por turma, quantos alunos têm <strong>nota1 estritamente maior que 7</strong>)?",
      saida: true,
      code: "int main() {\n    for (int t = 0; t < qtdTurmas; t++) {\n        int c = 0;\n        for (int k = 0; k < turmas[t].qtdNotas; k++)\n            if (turmas[t].notas[k].nota1 > 7)\n                c++;\n        printf(\"%d \", c);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
      opts: [
        ["3 1 2 ", "Turma 1001: 8,5, 9 e 7,5; 1002: só o 10; 1003: 9,5 e 8 (o 7,0 não conta)."],
        ["3 1 3 ", "O 7,0 da turma 1003 não é maior que 7."],
        ["4 1 2 ", "O 6,0 da turma 1001 não passa de 7."],
        ["3 2 2 ", "Na turma 1002 só o 10 tem nota1 acima de 7."]
      ],
      pre: window.A5_DADOS
    }
  ];
  window.ALT['a5-l212'] = [
    {
      q: "Com os dados da lista, qual a saída (porcentagem de provas com nota 8 ou mais, contando as <strong>36 notas</strong> de todas as turmas)?",
      saida: true,
      code: "int main() {\n    int altas = 0, total = 0;\n    for (int t = 0; t < qtdTurmas; t++)\n        for (int k = 0; k < turmas[t].qtdNotas; k++) {\n            Nota n = turmas[t].notas[k];\n            if (n.nota1 >= 8)\n                altas++;\n            if (n.nota2 >= 8)\n                altas++;\n            if (n.nota3 >= 8)\n                altas++;\n            total += 3;\n        }\n    printf(\"%.0f%%\\n\", 100.0 * altas / total);\n    return 0;\n}",
      opts: [
        ["39%", "As notas 8 ou mais são 14 em 36: 14 ÷ 36 ≈ 39%."],
        ["50%", "Esse seria o resultado contando só a nota3."],
        ["14%", "Esqueceu de dividir por 36."],
        ["36%", "Contou 13 notas: alguma nota 8 exata ficou de fora."]
      ],
      pre: window.A5_DADOS
    },
    {
      q: "Com os dados da lista, qual a saída (quantos alunos em cada faixa de média: 9 ou mais, de 7 a menos de 9, e abaixo de 7)?",
      saida: true,
      code: "int main() {\n    int a = 0, b = 0, c = 0;\n    for (int t = 0; t < qtdTurmas; t++)\n        for (int k = 0; k < turmas[t].qtdNotas; k++) {\n            Nota n = turmas[t].notas[k];\n            float m = (n.nota1 + n.nota2 + n.nota3) / 3;\n            if (m >= 9)\n                a++;\n            else if (m >= 7)\n                b++;\n            else\n                c++;\n        }\n    printf(\"%d %d %d\\n\", a, b, c);\n    return 0;\n}",
      opts: [
        ["3 4 5", "Médias 9,17, 9,0 e 9,5 na primeira faixa; 7,17, 8,17, 7,0 e 8,33 na segunda; as outras cinco abaixo de 7."],
        ["3 5 4", "Só quatro alunos ficam na faixa de 7 a 9."],
        ["4 4 4", "Só três alunos têm média 9 ou mais."],
        ["2 5 5", "A Clara tem média exatamente 9, que entra na primeira faixa."]
      ],
      pre: window.A5_DADOS
    }
  ];
  window.ALT['a5-l213'] = [
    {
      q: "Verificar se há algum aluno com a mesma nota nas três provas (ex.: 7, 7, 7). O programa lê uma posição a mais. Ache a linha errada.",
      code: "int mesmaNota(Turma t) {\n    for (int k = 0; k <= t.qtdNotas; k++) {\n        Nota n = t.notas[k];\n        if (n.nota1 == n.nota2 && n.nota2 == n.nota3)\n            return 1;\n    }\n    return 0;\n}",
      line: 2,
      fixes: [
        ["for (int k = 0; k < t.qtdNotas; k++) {", "As posições válidas vão de 0 a qtdNotas - 1."],
        ["for (int k = 1; k <= t.qtdNotas; k++) {", "Ainda lê posição fora e pula o primeiro aluno."],
        ["for (int k = 0; k < t.qtdNotas - 1; k++) {", "Deixaria o último aluno sem verificar."]
      ],
      why: "Com `k <= t.qtdNotas` o laço lê um registro além dos preenchidos.",
      pre: window.A5_DADOS
    },
    {
      q: "Verificar se há algum aluno com a mesma nota nas três provas. A função diz que não há ninguém mesmo quando existe. Ache a linha errada.",
      code: "int mesmaNota(Turma t) {\n    for (int k = 0; k < t.qtdNotas; k++) {\n        Nota n = t.notas[k];\n        if (n.nota1 == n.nota2 && n.nota2 == n.nota3)\n            return 0;\n    }\n    return 1;\n}",
      line: 5,
      fixes: [
        ["return 1;", "Achou um aluno com as três notas iguais: devolve 1."],
        ["return k;", "Devolveria a posição, e a posição 0 parece \"falso\"."],
        ["return n.nota1;", "Devolveria a nota, não 1 ou 0."]
      ],
      why: "Os valores de retorno estão invertidos: ao achar devolve-se 1 e, no fim sem achar, 0.",
      pre: window.A5_DADOS
    }
  ];
  window.ALT['a5-l214'] = [
    {
      q: "Complete: a menor nota individual (não a média) entre todos os alunos de todas as turmas.",
      code: "float menor = [[11]];\nfor (int t = 0; t < qtdTurmas; t++)\n    for (int k = 0; k < turmas[t].qtdNotas; k++) {\n        Nota n = [[turmas[t].notas[k]]];\n        if (n.nota1 < menor)\n            menor = n.nota1;\n        if (n.nota2 < menor)\n            menor = n.nota2;\n        if ([[n.nota3 < menor]])\n            menor = n.nota3;\n    }\nprintf(\"%.1f\\n\", menor);",
      extra: [
        ["-1", "Nenhuma nota seria menor que -1: a variável nunca mudaria."],
        ["turmas[k].notas[t]", "Os índices estão trocados."],
        ["n.nota3 > menor", "Procuraria a maior."],
        ["10", "Uma nota 10 igual não seria menor que 10, mas o valor inicial deveria vir acima de qualquer nota."]
      ],
      why: "O valor inicial precisa ser maior que qualquer nota possível; cada nota menor o substitui.",
      pre: window.A5_DADOS
    },
    {
      q: "Complete: quantas notas 10 existem ao todo (considerando as três provas de cada aluno).",
      code: "int c = [[0]];\nfor (int t = 0; t < qtdTurmas; t++)\n    for (int k = 0; k < turmas[t].qtdNotas; k++) {\n        Nota n = turmas[t].notas[k];\n        if ([[n.nota1 == 10]])\n            c++;\n        if (n.nota2 == 10)\n            [[c++]];\n        if (n.nota3 == 10)\n            c++;\n    }\nprintf(\"%d\\n\", [[c]]);",
      extra: [
        ["1", "O contador deve começar em zero."],
        ["n.nota1 = 10", "Atribuiria 10 à nota."],
        ["c--", "A contagem só cresce."],
        ["n.nota1", "Mostraria uma nota, não a quantidade."]
      ],
      why: "Cada nota igual a 10 soma 1 ao contador, que começa em 0.",
      pre: window.A5_DADOS
    }
  ];
  window.ALT['a5-l215'] = [
    null,
    {
      q: "Para cada turma, o nome do aluno com a maior evolução (nota3 − nota1; no empate vale o primeiro). Qual a saída?",
      saida: true,
      pre: window.A5_DADOS,
      code: "float crit(Nota n) {\n    return n.nota3 - n.nota1;\n}\n\nint main() {\n    for (int t = 0; t < qtdTurmas; t++) {\n        int b = 0;\n        for (int k = 1; k < turmas[t].qtdNotas; k++)\n            if (crit(turmas[t].notas[k]) > crit(turmas[t].notas[b]))\n                b = k;\n        printf(\"%s; \", nomeAluno(turmas[t].notas[b].idAluno));\n    }\n    printf(\"\\n\");\n    return 0;\n}",
      opts: [
        ["Bruno Lima; Gabriela Torres; Lucas Barbosa; ", "Evoluções: turma 1001, 102 e 103 com 1,0 (fica o 102); turma 1002, o 107 com 5,5; turma 1003, o 112 com 1,0."],
        ["Clara Mendes; Gabriela Torres; Lucas Barbosa; ", "Com o `>` estrito o empate fica com o primeiro, o Bruno."],
        ["Ana Souza; Henrique Dias; Isabela Rocha; ", "Esses têm as maiores médias, não a maior evolução."],
        ["Bruno Lima; Felipe Martins; Lucas Barbosa; ", "O Felipe evolui 2,0, menos que a Gabriela (5,5)."]
      ]
    }
  ];
  window.ALT['a5-l216'] = [
    {
      q: "Com os dados da lista, qual a saída (a idade do aluno mais velho de cada turma)?",
      saida: true,
      code: "int main() {\n    for (int t = 0; t < qtdTurmas; t++) {\n        int mx = 0;\n        for (int i = 0; i < turmas[t].qtdAlunos; i++)\n            if (idadeAluno(turmas[t].alunosTurma[i]) > mx)\n                mx = idadeAluno(turmas[t].alunosTurma[i]);\n        printf(\"%d \", mx);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
      opts: [
        ["22 23 22 ", "Turma 1001: Clara (22); 1002: Gabriela (23); 1003: Lucas (22)."],
        ["20 21 20 ", "Esses são os primeiros alunos de cada turma, não os mais velhos."],
        ["79 83 81 ", "Essas são as somas das idades."],
        ["22 23 21 ", "Na turma 1003 o mais velho tem 22."]
      ],
      pre: window.A5_DADOS
    },
    {
      q: "Com os dados da lista, qual a saída (a disciplina da turma com a maior idade média e essa média)?",
      saida: true,
      code: "int main() {\n    int b = 0;\n    float mb = 0;\n    for (int t = 0; t < qtdTurmas; t++) {\n        int s = 0;\n        for (int i = 0; i < turmas[t].qtdAlunos; i++)\n            s += idadeAluno(turmas[t].alunosTurma[i]);\n        float m = (float) s / turmas[t].qtdAlunos;\n        if (m > mb) {\n            mb = m;\n            b = t;\n        }\n    }\n    printf(\"%s %.2f\\n\", turmas[b].disciplina, mb);\n    return 0;\n}",
      opts: [
        ["Estruturas de Dados 20.75", "Médias de idade: 19,75, 20,75 e 20,25; a maior é a da turma 1002."],
        ["Banco de Dados 20.25", "A turma 1003 é a segunda maior."],
        ["Algoritmos 19.75", "A turma 1001 tem a menor média."],
        ["Estruturas de Dados 83.00", "Mostraria a soma das idades em vez da média."]
      ],
      pre: window.A5_DADOS
    }
  ];
  window.ALT['a5-l217'] = [
    {
      q: "Com os dados da lista, qual a saída (quantos alunos tiraram notas em ordem estritamente crescente, <code>nota1 &lt; nota2 &lt; nota3</code>)?",
      saida: true,
      code: "int main() {\n    int c = 0;\n    for (int t = 0; t < qtdTurmas; t++)\n        for (int k = 0; k < turmas[t].qtdNotas; k++) {\n            Nota n = turmas[t].notas[k];\n            if (n.nota1 < n.nota2 && n.nota2 < n.nota3)\n                c++;\n        }\n    printf(\"%d\\n\", c);\n    return 0;\n}",
      opts: [
        ["1", "Só o aluno 106 (5, 6, 7) tem as três notas estritamente crescentes."],
        ["2", "O 107 (0, 5,5, 5,5) tem duas notas iguais."],
        ["0", "O 106 atende às duas desigualdades."],
        ["3", "Só um aluno atende às duas desigualdades."]
      ],
      pre: window.A5_DADOS
    },
    {
      q: "Com os dados da lista, qual a saída (o aluno com a menor nota individual de todas e essa nota)?",
      saida: true,
      code: "int main() {\n    int bt = 0, bk = 0;\n    float menor = 11;\n    for (int t = 0; t < qtdTurmas; t++)\n        for (int k = 0; k < turmas[t].qtdNotas; k++) {\n            Nota n = turmas[t].notas[k];\n            if (n.nota1 < menor) {\n                menor = n.nota1;\n                bt = t;\n                bk = k;\n            }\n            if (n.nota2 < menor) {\n                menor = n.nota2;\n                bt = t;\n                bk = k;\n            }\n            if (n.nota3 < menor) {\n                menor = n.nota3;\n                bt = t;\n                bk = k;\n            }\n        }\n    printf(\"%s %.1f\\n\", nomeAluno(turmas[bt].notas[bk].idAluno), menor);\n    return 0;\n}",
      opts: [
        ["Gabriela Torres 0.0", "O zero da nota1 da Gabriela é a menor nota de todas."],
        ["Eduarda Ramos 2.5", "A menor nota da Eduarda é 2,5, mas há um zero."],
        ["Gabriela Torres 5.5", "Mostraria as outras notas da Gabriela."],
        ["Henrique Dias 0.0", "O zero é da Gabriela, não do Henrique."]
      ],
      pre: window.A5_DADOS
    }
  ];
  window.ALT['a5-l218'] = [
    {
      q: "Com os dados da lista, qual a saída (quantas notas 10 existem ao todo, somando as três provas de todos os alunos)?",
      saida: true,
      code: "int main() {\n    int dez = 0;\n    for (int t = 0; t < qtdTurmas; t++)\n        for (int k = 0; k < turmas[t].qtdNotas; k++) {\n            Nota n = turmas[t].notas[k];\n            if (n.nota1 == 10)\n                dez++;\n            if (n.nota2 == 10)\n                dez++;\n            if (n.nota3 == 10)\n                dez++;\n        }\n    printf(\"%d notas 10\\n\", dez);\n    return 0;\n}",
      opts: [
        ["4 notas 10", "Ana (nota2), Clara (nota3), Henrique (nota1) e Isabela (nota3)."],
        ["3 notas 10", "Algum 10 ficou de fora da contagem."],
        ["5 notas 10", "Há apenas quatro notas 10."],
        ["2 notas 10", "Só considerou a turma 1001."]
      ],
      pre: window.A5_DADOS
    },
    {
      q: "Com os dados da lista, qual a saída (o aluno com a maior soma de notas na disciplina do professor Maria Oliveira)?",
      saida: true,
      code: "int main() {\n    for (int i = 0; i < qtdProfessores; i++) {\n        if (strcmp(professores[i].nome, \"Maria Oliveira\") != 0)\n            continue;\n        for (int t = 0; t < qtdTurmas; t++) {\n            if (turmas[t].idProfessor != professores[i].id)\n                continue;\n            int b = 0;\n            for (int k = 1; k < turmas[t].qtdNotas; k++) {\n                Nota x = turmas[t].notas[k], y = turmas[t].notas[b];\n                if (x.nota1 + x.nota2 + x.nota3 > y.nota1 + y.nota2 + y.nota3)\n                    b = k;\n            }\n            Nota z = turmas[t].notas[b];\n            printf(\"%s %.1f\\n\", nomeAluno(z.idAluno), z.nota1 + z.nota2 + z.nota3);\n        }\n    }\n    return 0;\n}",
      opts: [
        ["Henrique Dias 24.5", "Maria Oliveira ministra Estruturas de Dados (turma 1002); a maior soma é a do Henrique: 10 + 7 + 7,5."],
        ["Henrique Dias 8.2", "Esse é o valor da média, não da soma."],
        ["Felipe Martins 18.0", "A soma do Felipe é menor que a do Henrique."],
        ["Eduarda Ramos 10.0", "A Eduarda tem a menor soma da turma."]
      ],
      pre: window.A5_DADOS
    }
  ];
  window.ALT['a5-l219'] = [
    {
      q: "Com os dados da lista, qual a saída (a diferença entre a maior e a menor nota de cada turma, considerando todas as provas)?",
      saida: true,
      code: "int main() {\n    for (int t = 0; t < qtdTurmas; t++) {\n        float mx = 0, mn = 10;\n        for (int k = 0; k < turmas[t].qtdNotas; k++) {\n            Nota n = turmas[t].notas[k];\n            float v[3] = {n.nota1, n.nota2, n.nota3};\n            for (int i = 0; i < 3; i++) {\n                if (v[i] > mx)\n                    mx = v[i];\n                if (v[i] < mn)\n                    mn = v[i];\n            }\n        }\n        printf(\"%.1f \", mx - mn);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
      opts: [
        ["4.5 10.0 4.5 ", "Turma 1001: 10 − 5,5; turma 1002: 10 − 0; turma 1003: 10 − 5,5."],
        ["4.5 7.5 4.5 ", "A menor nota da turma 1002 é 0,0, não 2,5."],
        ["10.0 10.0 10.0 ", "Só a turma 1002 tem um zero."],
        ["5.5 10.0 5.5 ", "A menor nota das turmas 1001 e 1003 é 5,5 e a maior é 10."]
      ],
      pre: window.A5_DADOS
    },
    {
      q: "Com os dados da lista, qual a saída (a média das variações de cada aluno, maior menos menor nota, por turma)?",
      saida: true,
      code: "float variacao(Nota n) {\n    float mx = n.nota1, mn = n.nota1;\n    if (n.nota2 > mx)\n        mx = n.nota2;\n    if (n.nota3 > mx)\n        mx = n.nota3;\n    if (n.nota2 < mn)\n        mn = n.nota2;\n    if (n.nota3 < mn)\n        mn = n.nota3;\n    return mx - mn;\n}\n\nint main() {\n    for (int t = 0; t < qtdTurmas; t++) {\n        float s = 0;\n        for (int k = 0; k < turmas[t].qtdNotas; k++)\n            s += variacao(turmas[t].notas[k]);\n        printf(\"%.2f \", s / turmas[t].qtdNotas);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
      opts: [
        ["1.75 3.00 1.00 ", "Variações: 1,5, 1,5, 2, 2 / 1,5, 2, 5,5, 3 / 1, 1, 0,5, 1,5."],
        ["7.00 12.00 4.00 ", "Esqueceu de dividir pela quantidade de alunos."],
        ["1.75 3.00 1.25 ", "Algum aluno da turma 1003 foi contado errado."],
        ["5.50 5.50 5.50 ", "Mostraria a maior variação individual, não a média."]
      ],
      pre: window.A5_DADOS
    }
  ];
  window.ALT['a5-l220'] = [
    {
      q: "Complete o relatório da turma 1002: disciplina, quantidade de alunos e nome e idade de cada aluno.",
      code: "Turma t = turmas[1];\nprintf(\"%s (%d alunos)\\n\", [[t.disciplina]], [[t.qtdAlunos]]);\nfor (int i = 0; i < t.qtdAlunos; i++)\n    printf(\"%s, %d anos\\n\", nomeAluno(t.alunosTurma[i]), [[idadeAluno(t.alunosTurma[i])]]);",
      extra: [
        ["disciplina", "Esse nome só existe dentro de uma Turma: `t.disciplina`."],
        ["qtdAlunos", "É um campo da turma, e também há uma variável global com esse nome para o total geral."],
        ["t.alunosTurma[i].idade", "alunosTurma guarda só ids (int)."],
        ["idadeAluno(i)", "Passaria a posição, não o id."]
      ],
      why: "A turma guarda ids; nome e idade vêm das funções que procuram o id no vetor de alunos.",
      pre: window.A5_DADOS
    },
    {
      q: "Complete o laço que mostra, para cada turma, a disciplina e o nome do professor.",
      code: "for (int t = 0; t < [[qtdTurmas]]; t++)\n    for (int p = 0; p < qtdProfessores; p++)\n        if (professores[p].id == [[turmas[t].idProfessor]])\n            printf(\"%s: %s\\n\", [[turmas[t].disciplina]], professores[p].nome);",
      extra: [
        ["turmas", "O limite do laço é a quantidade de turmas, não o vetor."],
        ["turmas[t].id", "O id da turma não é o id do professor."],
        ["p", "Seria uma posição de professor, não a disciplina."],
        ["turmas[t].professor", "A turma não tem um campo com esse nome."]
      ],
      why: "Cada turma guarda só o id do professor; o laço de dentro procura o professor com esse id.",
      pre: window.A5_DADOS
    }
  ];
  window.ALT['a5-l221'] = [
    null,
    {
      q: "Boletim: nome, três notas, média e situação (APROVADO se média ≥ 7, senão REPROVADO). Os nomes saem errados. Ache a linha errada.",
      code: "void boletim(Turma t) {\n    for (int k = 0; k < t.qtdNotas; k++) {\n        Nota n = t.notas[k];\n        float m = (n.nota1 + n.nota2 + n.nota3) / 3;\n        printf(\"%s %.1f %.1f %.1f %.2f %s\\n\", nomeAluno(k), n.nota1, n.nota2, n.nota3, m, m >= 7 ? \"APROVADO\" : \"REPROVADO\");\n    }\n}",
      line: 5,
      fixes: [
        ["printf(\"%s %.1f %.1f %.1f %.2f %s\\n\", nomeAluno(n.idAluno), n.nota1, n.nota2, n.nota3, m, m >= 7 ? \"APROVADO\" : \"REPROVADO\");", "O nome é buscado pelo id guardado no registro de notas."],
        ["printf(\"%s %.1f %.1f %.1f %.2f %s\\n\", nomeAluno(t.id), n.nota1, n.nota2, n.nota3, m, m >= 7 ? \"APROVADO\" : \"REPROVADO\");", "O id da turma não é o id de um aluno."],
        ["printf(\"%s %.1f %.1f %.1f %.2f %s\\n\", t.notas[k].nome, n.nota1, n.nota2, n.nota3, m, m >= 7 ? \"APROVADO\" : \"REPROVADO\");", "Nota não tem campo nome."]
      ],
      why: "`nomeAluno` espera o id do aluno, que está em `n.idAluno`, não a posição `k`.",
      pre: window.A5_DADOS
    }
  ];
  window.ALT['a5-l223'] = [
    {
      q: "Qual a saída? (antes, o aluno 112 sai da turma 1003; o programa lista os alunos que não estão em nenhuma turma)",
      saida: true,
      code: "int main() {\n    turmas[2].qtdAlunos = 3;\n    for (int a = 0; a < qtdAlunos; a++) {\n        int c = 0;\n        for (int t = 0; t < qtdTurmas; t++)\n            for (int i = 0; i < turmas[t].qtdAlunos; i++)\n                if (turmas[t].alunosTurma[i] == alunos[a].id)\n                    c++;\n        if (c == 0)\n            printf(\"%d \", alunos[a].id);\n    }\n    printf(\"fim\\n\");\n    return 0;\n}",
      opts: [
        ["112 fim ", "Com a turma 1003 reduzida a 3 alunos, o 112 deixa de ser contado."],
        ["fim ", "Há um aluno sem turma depois da alteração."],
        ["101 102 103 104 105 106 107 108 109 110 111 112 fim ", "Só o 112 ficou sem turma."],
        ["109 110 111 112 fim ", "Os alunos 109 a 111 continuam na turma."]
      ],
      pre: window.A5_DADOS
    },
    {
      q: "Qual a saída? (a disciplina com mais alunos de menos de 20 anos e quantos são)",
      saida: true,
      code: "int main() {\n    int b = 0, mb = -1;\n    for (int t = 0; t < qtdTurmas; t++) {\n        int c = 0;\n        for (int i = 0; i < turmas[t].qtdAlunos; i++)\n            if (idadeAluno(turmas[t].alunosTurma[i]) < 20)\n                c++;\n        if (c > mb) {\n            mb = c;\n            b = t;\n        }\n    }\n    printf(\"%s %d\\n\", turmas[b].disciplina, mb);\n    return 0;\n}",
      opts: [
        ["Algoritmos 2", "Na turma 1001 há duas pessoas com menos de 20 anos (102 e 104); nas outras há uma cada."],
        ["Estruturas de Dados 1", "A turma 1002 tem só o 108 com menos de 20 anos."],
        ["Algoritmos 1", "Na turma 1001 são dois alunos."],
        ["Banco de Dados 2", "A turma 1003 só tem o 110 abaixo de 20 anos."]
      ],
      pre: window.A5_DADOS
    }
  ];
  window.ALT['a5-s01'] = [
    {
      q: "Com <code>typedef struct { int dia, mes, ano; } Data; typedef struct { char nome[20]; Data nasc; } Pessoa; Pessoa p;</code>, como se acessa o ano de nascimento de <code>p</code>?",
      opts: [
        ["`p.nasc.ano`", "Acessa o campo `nasc` e, dentro dele, o campo `ano`."],
        ["`p.ano`", "O ano está dentro de `nasc`, não direto em Pessoa."],
        ["`Pessoa.nasc.ano`", "O ponto vai na variável, não no tipo."],
        ["`p->nasc->ano`", "p não é ponteiro e `nasc` também não."]
      ]
    },
    {
      q: "Com o mesmo <code>Pessoa v[3];</code>, qual expressão é o dia de nascimento da <strong>segunda</strong> pessoa?",
      opts: [
        ["`v[1].nasc.dia`", "O vetor começa em 0, então a segunda pessoa é `v[1]`."],
        ["`v[2].nasc.dia`", "v[2] é a terceira pessoa."],
        ["`v.nasc[1].dia`", "A ordem do índice e dos campos está trocada."],
        ["`v[1].dia`", "O dia está dentro de `nasc`."]
      ]
    }
  ];
  window.ALT['a5-s02'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\n#include <string.h>\ntypedef struct {\n    char nome[30];\n    int idade;\n} Pessoa;\nPessoa envelhecer(Pessoa p) {\n    p.idade = p.idade + 1;\n    return p;\n}\n\nint main() {\n    Pessoa x;\n    strcpy(x.nome, \"Ana\");\n    x.idade = 20;\n    Pessoa y = envelhecer(x);\n    printf(\"%d %d\\n\", x.idade, y.idade);\n    return 0;\n}",
      opts: [
        ["20 21", "A função altera a cópia e a devolve; o original continua com 20."],
        ["21 21", "A struct foi passada por valor."],
        ["20 20", "A função devolve a cópia alterada, que vai para `y`."],
        ["21 20", "Trocou os papéis do original e da cópia devolvida."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\n#include <string.h>\ntypedef struct {\n    char nome[30];\n    int idade;\n} Pessoa;\nvoid zerar(Pessoa v[], int n) {\n    for (int i = 0; i < n; i++)\n        v[i].idade = 0;\n}\n\nint main() {\n    Pessoa p[2] = {{\"Ana\", 20}, {\"Rui\", 31}};\n    zerar(p, 2);\n    printf(\"%d %d\\n\", p[0].idade, p[1].idade);\n    return 0;\n}",
      opts: [
        ["0 0", "Vetores são passados por endereço: a função altera os elementos originais."],
        ["20 31", "Isso valeria para uma struct isolada passada por valor, não para um vetor."],
        ["0 31", "O laço percorre os dois elementos."],
        ["20 0", "O laço percorre os dois elementos."]
      ]
    }
  ];
})();
