/* A9 · Alocação dinâmica — Exercícios A9 (9 questões) + 2 exercícios dos slides. */
(function () {
  var R = String.raw;
  var L = 'Exercícios A9, questão ';
  (window.EXS = window.EXS || {}).a9 = [

  { id: 'a9-s01', topic: 't-estatica', ref: 'Slides A9, “Imagine a seguinte situação”', title: 'O que há de errado num vetor enorme', type: 'mc', make: function (p) {
    return { q: 'Um sistema declara <code>struct ' + p.t + ' ' + p.v + '[' + p.n + '];</code> e, na maior parte do tempo, usa uns ' + p.uso + ' registros. Qual é o problema?', opts: [
      ['Desperdício: o espaço de ' + p.n + ' registros fica reservado mesmo sem uso, e se um dia passar de ' + p.n + ' não cabe.', 'Alocação estática tem tamanho fixo nos dois sentidos.'],
      ['Nenhum: o compilador só reserva o que for usado.', 'A reserva acontece na declaração, usada ou não.'],
      ['O vetor cresce sozinho quando passar de ' + p.n + '.', 'Vetor estático não muda de tamanho.'],
      ['Não compila: vetores de struct têm limite de 100 posições.', 'Não existe esse limite.']] };
  }, p: [{ t: 'Aluno', v: 'turma', n: 1000, uso: 40 }, { t: 'Produto', v: 'estoque', n: 20000, uso: 300 }, { t: 'Paciente', v: 'fila', n: 5000, uso: 12 }] },

  { id: 'a9-q01', topic: 't-malloc', ref: L + '1', title: 'Alocar, ler, mostrar e liberar', type: 'drag', make: function (p) {
    return { q: 'Complete: alocar um vetor de ' + p.n + ' ' + p.t + ', ler os valores, exibir e liberar.', code: R`${p.t} *v = (${p.t} *) [[malloc(${p.n} * sizeof(${p.t}))]];
if ([[v == NULL]])
    return 1;
for (int i = 0; i < ${p.n}; i++)
    scanf("${p.f}", [[&v[i]]]);
for (int i = 0; i < ${p.n}; i++)
    printf("${p.f} ", v[i]);
[[free(v)]];`, extra: [
      ['malloc(' + p.n + ')', 'Reserva ' + p.n + ' bytes, não ' + p.n + ' valores de ' + p.t + '.'],
      ['malloc(sizeof ' + p.t + ')', 'Com um tipo, `sizeof` exige parênteses; e faltou multiplicar por ' + p.n + '.'],
      ['v != NULL', 'O programa deve parar quando a alocação FALHOU, isto é, quando v é NULL.'],
      ['v[i]', 'scanf precisa do endereço da posição.'],
      ['free(*v)', '`*v` é o primeiro valor; free recebe o ponteiro do bloco.']],
      why: 'malloc com `quantidade * sizeof(tipo)`, teste de NULL, uso como vetor e `free(v)` no fim.' };
  }, p: [{ t: 'int', n: 5, f: '%d' }, { t: 'float', n: 4, f: '%f' }, { t: 'double', n: 6, f: '%lf' }] },

  { id: 'a9-q02', topic: 't-vetor-dinamico', ref: L + '2', title: 'Tamanho lido do usuário', type: 'fix', make: function (p) {
    return { q: 'O programa lê o tamanho N, aloca um vetor de ' + p.t + ' com N posições, lê, imprime e libera. Ache a linha errada.', code: R`int n;
scanf("%d", &n);
${p.t} *vet = (${p.t} *) malloc(${p.bug});
if (vet == NULL) return 1;
for (int i = 0; i < n; i++)
    scanf("${p.f}", &vet[i]);
for (int i = 0; i < n; i++)
    printf("${p.f} ", vet[i]);
free(vet);`, line: 3,
      fixes: [[p.t + ' *vet = (' + p.t + ' *) malloc(n * sizeof(' + p.t + '));', 'n elementos vezes o tamanho de cada um.'], [p.t + ' *vet = (' + p.t + ' *) malloc(sizeof(n));', '`sizeof(n)` é o tamanho de um int, não n elementos.'], [p.t + ' *vet = (' + p.t + ' *) malloc(n + sizeof(' + p.t + '));', 'Soma no lugar de multiplicação.']],
      why: 'O total de bytes é `n * sizeof(' + p.t + ')`.' };
  }, p: [{ t: 'int', f: '%d', bug: 'n' }, { t: 'float', f: '%f', bug: 'n * sizeof(int *)' }, { t: 'double', f: '%lf', bug: 'sizeof(double)' }] },

  { id: 'a9-q03', topic: 't-vetor-dinamico', ref: L + '3', title: 'Pares e ímpares num vetor dinâmico', type: 'mc', make: function (p) {
    return { q: 'Com a entrada <code>' + p.in + '</code> (o primeiro número é N), qual é a saída?', saida: true, stdin: p.in, code: R`#include <stdio.h>
#include <stdlib.h>
int main() {
    int n, pares = 0, impares = 0;
    scanf("%d", &n);
    int *v = (int *) malloc(n * sizeof(int));
    if (v == NULL)
        return 1;
    for (int i = 0; i < n; i++) {
        scanf("%d", &v[i]);
        if (v[i] % 2 == 0)
            pares++;
        else
            impares++;
    }
    printf("pares=%d impares=%d\n", pares, impares);
    free(v);
    return 0;
}`, opts: [['pares=' + p.p + ' impares=' + p.i, 'Conte cada valor depois do N.'], ['pares=' + p.i + ' impares=' + p.p, 'Trocou as contagens.'], ['pares=' + (p.p + p.np) + ' impares=' + p.i, 'O primeiro número é o tamanho N, não entra na contagem.'], ['pares=' + p.p + ' impares=' + (p.i + 1), 'Há exatamente N valores no vetor.']] };
  }, p: [{ in: '5 4 7 10 3 8', p: 3, i: 2, np: 1 }, { in: '4 1 3 5 6', p: 1, i: 3, np: 1 }, { in: '6 2 2 9 0 12 13', p: 4, i: 2, np: 1 }] },

  { id: 'a9-q04', topic: 't-malloc', ref: L + '4', title: 'String sem vogais', type: 'drag', make: function (p) {
    return { q: 'A função aloca uma string para até <code>tam</code> caracteres; depois o programa imprime o texto sem vogais. Para "' + p.ex + '" a saída é "' + p.res + '". Complete.', code: R`char *alocarString(int tam) {
    char *s = (char *) malloc([[(tam + 1) * sizeof(char)]]);
    return s;
}

void semVogais(char *s) {
    for (int i = 0; [[s[i] != '\0']]; i++)
        if (strchr("aeiouAEIOU", s[i]) == NULL)
            printf("%c", s[i]);
}

/* na main: */
int tam = ${p.tam};
char *txt = alocarString(tam);
if (txt == NULL)
    return 1;
strcpy(txt, "${p.ex}");
semVogais(txt);
[[free(txt)]];`, extra: [
      ['tam * sizeof(char)', 'Falta o espaço do terminador `\\0`.'],
      ['s[i] != NULL', 'NULL é para ponteiros; o fim da string é o caractere `\\0`.'],
      ["i <= tam", 'O texto pode ser menor que tam; pare no `\\0`.'],
      ['free(&txt)', 'free recebe o ponteiro devolvido pelo malloc, não o endereço dele.']],
      why: 'Uma string de n caracteres ocupa n + 1 bytes por causa do `\\0`.' };
  }, p: [{ ex: 'algoritmos', res: 'lgrtms', tam: 20 }, { ex: 'ponteiro', res: 'pntr', tam: 15 }, { ex: 'Memoria', res: 'Mmr', tam: 10 }] },

  { id: 'a9-q05', topic: 't-vetor-dinamico', ref: L + '5', title: 'Múltiplos de X', type: 'fix', make: function (p) {
    return { q: 'O programa conta quantos elementos do vetor dinâmico são múltiplos de X. Para ' + p.ex + ' deveria mostrar ' + p.r + '. Ache a linha errada.', code: R`int n, x, cont = 0;
scanf("%d", &n);
int *v = (int *) malloc(n * sizeof(int));
for (int i = 0; i < n; i++) scanf("%d", &v[i]);
scanf("%d", &x);
for (int i = 0; i < n; i++)
    if (${p.bug})
        cont++;
printf("%d\n", cont);
free(v);`, line: 7,
      fixes: [['if (v[i] % x == 0)', 'É múltiplo de x quando o resto da divisão por x é zero.'], ['if (x % v[i] == 0)', 'Isso testa se v[i] é divisor de x.'], ['if (v[i] / x == 0)', 'Divisão inteira zero só diz que v[i] é menor que x.']],
      why: 'Múltiplo de x: `v[i] % x == 0`.' };
  }, p: [{ ex: 'v = {3, 6, 7, 9} e X = 3', r: 3, bug: 'x % v[i] == 0' }, { ex: 'v = {10, 4, 25, 30} e X = 5', r: 3, bug: 'v[i] / x == 0' }, { ex: 'v = {8, 12, 5} e X = 4', r: 2, bug: 'v[i] % x' }] },

  { id: 'a9-q06', topic: 't-vetor-dinamico', ref: L + '6', title: 'Notas da turma', type: 'mc', make: function (p) {
    return { q: 'Entrada: <code>' + p.in + '</code> (quantidade e depois as notas). Qual a saída?', saida: true, stdin: p.in, code: R`#include <stdio.h>
#include <stdlib.h>
int main() {
    int n, aprov = 0;
    float soma = 0, maior;
    scanf("%d", &n);
    float *notas = (float *) malloc(n * sizeof(float));
    if (notas == NULL)
        return 1;
    for (int i = 0; i < n; i++) {
        scanf("%f", &notas[i]);
        soma += notas[i];
        if (i == 0 || notas[i] > maior)
            maior = notas[i];
        if (notas[i] >= 7.0)
            aprov++;
    }
    printf("media %.1f maior %.1f aprovados %d\n", soma / n, maior, aprov);
    free(notas);
    return 0;
}`, opts: [[p.ok, 'Média, maior nota e quantos têm 7,0 ou mais.'], [p.a, p.wa], [p.b, p.wb], [p.c, p.wc]] };
  }, p: [
    { in: '4 7.0 5.5 9.0 6.5', ok: 'media 7.0 maior 9.0 aprovados 2', a: 'media 7.0 maior 9.0 aprovados 1', wa: 'A nota 7.0 também conta: a condição é `>=`.', b: 'media 5.6 maior 9.0 aprovados 2', wb: 'A soma é dividida por n = 4, não por 5.', c: 'media 7.0 maior 6.5 aprovados 2', wc: 'O maior é 9.0.' },
    { in: '3 8.0 4.0 6.0', ok: 'media 6.0 maior 8.0 aprovados 1', a: 'media 6.0 maior 8.0 aprovados 2', wa: '6.0 não atinge 7.0.', b: 'media 4.5 maior 8.0 aprovados 1', wb: 'A média é 18 dividido por 3.', c: 'media 6.0 maior 4.0 aprovados 1', wc: '4.0 é a menor nota.' },
    { in: '5 10.0 7.0 7.0 3.0 8.0', ok: 'media 7.0 maior 10.0 aprovados 4', a: 'media 7.0 maior 10.0 aprovados 2', wa: 'Os dois 7.0 contam como aprovados.', b: 'media 5.8 maior 10.0 aprovados 4', wb: '35 dividido por 5 dá 7.0.', c: 'media 7.0 maior 8.0 aprovados 4', wc: 'A primeira nota (10.0) é a maior.' }] },

  { id: 'a9-q07', topic: 't-vetor-dinamico', ref: L + '7', title: 'Análise de temperaturas', type: 'drag', make: function (p) {
    return { q: 'Complete o trecho que, depois de ler as temperaturas no vetor dinâmico <code>t</code> de <code>' + p.n + '</code> dias, acha menor, maior, média e quantos dias ficaram acima da média.', code: R`float menor = t[0], maior = [[t[0]]], soma = 0;
for (int i = 0; i < ${p.n}; i++) {
    if (t[i] < menor)
        menor = t[i];
    if ([[t[i] > maior]])
        maior = t[i];
    soma += t[i];
}
float media = [[soma / ${p.n}]];
int acima = 0;
for (int i = 0; i < ${p.n}; i++)
    if (t[i] > media)
        [[acima++]];
free(t);`, extra: [
      ['0', 'Começar o maior em 0 falha se todas as temperaturas forem negativas.'],
      ['t[i] < maior', 'Assim o maior viraria o menor.'],
      ['soma / ' + (p.n - 1), 'Divide pela quantidade de dias, ' + p.n + '.'],
      ['media++', 'Quem conta é `acima`.']],
      pin: 'float *t = (float *) calloc(' + p.n + ', sizeof(float));', why: 'Menor e maior começam no primeiro elemento; a média precisa terminar o primeiro laço antes de contar quem ficou acima.' };
  }, p: [{ n: 7 }, { n: 30 }, { n: 10 }] },

  { id: 'a9-q08', topic: 't-vetor-dinamico', ref: L + '8', title: 'Estoque: total e menor quantidade', type: 'fix', make: function (p) {
    return { q: 'O programa soma o estoque e acha a <strong>posição</strong> do produto com menor quantidade. Para ' + p.ex + ' deveria mostrar total ' + p.tot + ' e posição ' + p.pos + '. Ache a linha errada.', code: R`int total = 0, posMenor = 0;
for (int i = 0; i < n; i++) {
    total += qtd[i];
    if (qtd[i] < qtd[posMenor])
        ${p.bug};
}
printf("Total: %d, menor na posicao %d\n", total, posMenor);
free(qtd);`, line: 5,
      fixes: [['posMenor = i;', 'Guarda o índice do menor.'], ['posMenor = qtd[i];', 'Guardaria a quantidade, não a posição.'], ['qtd[posMenor] = qtd[i];', 'Estragaria o vetor.']],
      why: 'Comparar `qtd[i]` com `qtd[posMenor]` e guardar `i` quando achar um menor.', pin: 'int n = 3; int *qtd = (int *) malloc(3 * sizeof(int));' };
  }, p: [{ ex: '{12, 4, 9}', tot: 25, pos: 1, bug: 'posMenor = qtd[i]' }, { ex: '{7, 15, 2, 8}', tot: 32, pos: 2, bug: 'qtd[posMenor] = qtd[i]' }, { ex: '{4, 9, 1}', tot: 14, pos: 2, bug: 'posMenor++' }] },

  { id: 'a9-q09', topic: 't-free', ref: L + '9', title: 'Duas turmas, dois blocos', type: 'drag', make: function (p) {
    return { q: 'Duas turmas com quantidades diferentes de alunos (' + p.a + ' e ' + p.b + '). Complete a alocação dos dois vetores, a comparação das médias e a liberação.', code: R`float *t1 = (float *) malloc(${p.a} * sizeof(float));
float *t2 = (float *) [[malloc(${p.b} * sizeof(float))]];
if (t1 == NULL || [[t2 == NULL]])
    return 1;
/* ... leitura das notas ... */
float m1 = media(t1, ${p.a}), m2 = media(t2, [[${p.b}]]);
if (m1 > m2)
    printf("Turma 1\n");
else if (m2 > m1)
    printf("Turma 2\n");
else
    printf("Empate\n");
free(t1);
[[free(t2)]];`, extra: [
      ['malloc(' + p.a + ' * sizeof(float))', 'Esse é o tamanho da turma 1.'],
      ['t2 != NULL', 'Testa-se a falha: t2 igual a NULL.'],
      [String(p.a), 'A turma 2 tem ' + p.b + ' alunos.'],
      ['free(t1, t2)', 'free libera um bloco por chamada.']],
      why: 'Cada malloc tem o seu teste de NULL e o seu free.',
      pre: 'float media(float *v, int n) { float s = 0; for (int i = 0; i < n; i++) s += v[i]; return s / n; }' };
  }, p: [{ a: 30, b: 25 }, { a: 18, b: 42 }, { a: 40, b: 35 }] },

  { id: 'a9-s02', topic: 't-realloc', ref: 'Slides A9, exercício do realloc', title: 'Chegaram alunos novos', type: 'drag', make: function (p) {
    return { q: 'A turma tinha ' + p.n + ' notas e chegaram ' + p.k + ' alunos. Complete o redimensionamento sem perder as notas.', code: R`float *temp = (float *) [[realloc(notas, ${p.n + p.k} * sizeof(float))]];
if ([[temp == NULL]]) {
    free(notas);
    return 1;
}
notas = [[temp]];
for (int i = ${p.n}; i < ${p.n + p.k}; i++)
    scanf("%f", &notas[i]);`, extra: [
      ['malloc(' + (p.n + p.k) + ' * sizeof(float))', 'malloc criaria um bloco novo vazio: as ' + p.n + ' notas se perderiam.'],
      ['realloc(notas, ' + p.k + ' * sizeof(float))', 'O tamanho novo é o total, ' + (p.n + p.k) + ', não só os que chegaram.'],
      ['notas == NULL', 'Quem pode ter falhado é o realloc, cujo resultado está em temp.'],
      ['NULL', 'Assim o endereço do bloco se perderia.']],
      why: 'O resultado vai para temp; só depois de confirmar que não é NULL ele substitui notas. O laço lê só as posições novas, a partir de ' + p.n + '.',
      pin: 'float *notas = (float *) malloc(' + p.n + ' * sizeof(float));' };
  }, p: [{ n: 5, k: 3 }, { n: 20, k: 4 }, { n: 12, k: 6 }] }
  ];
})();

/* Variantes V2 e V3 escritas à mão (2026-11-18): outra tarefa, outra lógica, outro erro. V1 vem dos moldes acima.
   Gerado por _tools/gerar_alt.mjs a partir de _tools/alt/a9.alt.js; null = a versão do molde continua valendo. */
(function () {
  window.ALT = window.ALT || {};
  window.ALT['a9-s01'] = [
    {
      q: "Um programa de agenda declara <code>char contatos[200][50];</code> (200 nomes de até 49 letras). Hoje ele guarda uns 12 contatos. Qual afirmação descreve o que acontece com a memória?",
      opts: [
        ["Os 10 000 bytes ficam reservados desde a declaração, mesmo com 12 contatos, e o 201º contato não cabe.", "Alocação estática tem tamanho fixo: sobra espaço no uso normal e falta no pico."],
        ["Só os bytes dos 12 nomes digitados são reservados.", "A reserva é feita na declaração, pelo tamanho total."],
        ["O compilador aumenta a matriz quando o 201º contato é lido.", "Matriz estática nunca muda de tamanho."],
        ["A memória só é reservada quando o primeiro nome é lido.", "A declaração já reserva tudo."]
      ]
    },
    {
      q: "O número de leituras de um sensor só é conhecido quando o programa já está rodando. Por que <code>float temp[100];</code> não resolve bem esse caso?",
      opts: [
        ["O tamanho 100 é escolhido antes de rodar: se chegarem 300 leituras faltam posições, se chegarem 10 sobram 90.", "O tamanho de um vetor estático é fixo na compilação; alocação dinâmica decide durante a execução."],
        ["Porque float não pode ser usado em vetor.", "Vetores de float existem normalmente."],
        ["Porque vetor estático é mais lento que malloc.", "A velocidade não é o ponto; o problema é o tamanho fixo."],
        ["Porque o vetor é apagado ao ler a primeira temperatura.", "Nada é apagado."]
      ]
    }
  ];
  window.ALT['a9-q01'] = [
    {
      q: "Complete: ler a quantidade N, alocar um vetor de float, somar os valores lidos e liberar.",
      code: "int n;\nscanf(\"%d\", &n);\nfloat *v = (float *) [[malloc(n * sizeof(float))]];\nif (v == NULL)\n    return 1;\nfloat soma = 0;\nfor (int i = 0; i < n; i++) {\n    scanf(\"%f\", &v[i]);\n    [[soma += v[i]]];\n}\nprintf(\"%.2f\\n\", soma);\n[[free(v)]];",
      extra: [
        ["malloc(n)", "Faltou multiplicar pelo tamanho do tipo."],
        ["malloc(sizeof(float))", "Isso reserva espaço para um único float."],
        ["soma = v[i]", "Substitui a soma em vez de acumular."],
        ["free(&v)", "free recebe o endereço do bloco, que está em v."]
      ],
      why: "O tamanho vem da leitura de N: `n * sizeof(float)`; a soma acumula com `+=` e o bloco é liberado com `free(v)`."
    },
    {
      q: "Complete: alocar espaço para uma frase de até 30 letras, ler, exibir e liberar.",
      code: "char *s = (char *) [[malloc(31 * sizeof(char))]];\nif (s == NULL)\n    return 1;\n[[fgets(s, 31, stdin)]];\nprintf(\"Frase: %s\", s);\n[[free(s)]];\ns = [[NULL]];",
      extra: [
        ["malloc(30)", "Faltou um byte para o caractere nulo e o tipo."],
        ["scanf(\"%s\", s)", "Não limita a leitura ao tamanho do bloco."],
        ["free(*s)", "free recebe o endereço, não o conteúdo."],
        ["0.0", "Ponteiro invalidado recebe NULL."]
      ],
      why: "Uma string de 30 letras precisa de 31 bytes (com o `\\0`); `fgets` respeita o limite e `free` devolve o bloco."
    }
  ];
  window.ALT['a9-q02'] = [
    {
      q: "O programa lê N, aloca um vetor de int, lê N valores, soma e imprime o total. Ache a linha errada.",
      code: "int n, soma = 0;\nscanf(\"%d\", &n);\nint *vet = (int *) malloc(n * sizeof(int));\nif (vet == NULL) return 1;\nfor (int i = 0; i <= n; i++)\n    scanf(\"%d\", &vet[i]);\nfor (int i = 0; i < n; i++)\n    soma += vet[i];\nprintf(\"%d\\n\", soma);\nfree(vet);",
      line: 5,
      fixes: [
        ["for (int i = 0; i < n; i++)", "As posições válidas vão de 0 a n-1."],
        ["for (int i = 1; i <= n; i++)", "Ainda passa do fim do bloco."],
        ["for (int i = 0; i < n - 1; i++)", "Deixaria a última posição sem ler."]
      ],
      why: "Com `i <= n` o laço grava em `vet[n]`, fora do bloco alocado."
    },
    {
      q: "O programa aloca um vetor de double para N leituras, lê os valores e mostra o maior. Ache a linha errada.",
      code: "int n;\nscanf(\"%d\", &n);\ndouble *med = (double *) malloc(n * sizeof(double));\nif (med != NULL) return 1;\ndouble maior = 0;\nfor (int i = 0; i < n; i++) {\n    scanf(\"%lf\", &med[i]);\n    if (i == 0 || med[i] > maior) maior = med[i];\n}\nprintf(\"%.2f\\n\", maior);\nfree(med);",
      line: 4,
      fixes: [
        ["if (med == NULL) return 1;", "O programa deve parar quando a alocação falha, isto é, quando é NULL."],
        ["if (med) return 1;", "Isso encerra justamente quando a alocação deu certo."],
        ["if (*med == NULL) return 1;", "`*med` é um double, não um ponteiro."]
      ],
      why: "A falha de `malloc` é sinalizada por NULL; o teste correto é `med == NULL`."
    }
  ];
  window.ALT['a9-q03'] = [
    {
      q: "Com a entrada <code>6 3 8 2 9 9 1</code> (o primeiro número é N), qual é a saída?",
      saida: true,
      stdin: "6 3 8 2 9 9 1",
      code: "#include <stdio.h>\n#include <stdlib.h>\nint main() {\n    int n, soma = 0, subidas = 0;\n    scanf(\"%d\", &n);\n    int *v = (int *) malloc(n * sizeof(int));\n    if (v == NULL)\n        return 1;\n    for (int i = 0; i < n; i++)\n        scanf(\"%d\", &v[i]);\n    for (int i = 1; i < n; i++) {\n        if (v[i] > v[i - 1])\n            subidas++;\n        if (i % 2 == 1)\n            soma += v[i];\n    }\n    printf(\"subidas=%d soma=%d\\n\", subidas, soma);\n    free(v);\n    return 0;\n}",
      opts: [
        ["subidas=2 soma=18", "Subidas: 3→8 e 2→9. Soma das posições 1, 3 e 5: 8 + 9 + 1."],
        ["subidas=3 soma=18", "O 9 repetido não é uma subida (9 > 9 é falso)."],
        ["subidas=2 soma=17", "Esqueceu a posição 5, que também é ímpar."],
        ["subidas=2 soma=14", "Somou as posições pares (0, 2, 4), não as ímpares."]
      ]
    },
    {
      q: "Com a entrada <code>3 4 5 6</code> (o primeiro número é N), qual é a saída?",
      saida: true,
      stdin: "3 4 5 6",
      code: "#include <stdio.h>\n#include <stdlib.h>\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    int *v = (int *) malloc(n * sizeof(int));\n    for (int i = 0; i < n; i++)\n        scanf(\"%d\", &v[i]);\n    v = (int *) realloc(v, (n + 1) * sizeof(int));\n    v[n] = v[0] + v[n - 1];\n    for (int i = n; i >= 0; i--)\n        printf(\"%d \", v[i]);\n    free(v);\n    return 0;\n}",
      opts: [
        ["10 6 5 4", "O vetor cresce uma posição; v[3] = 4 + 6 = 10, e a impressão vai do fim para o começo."],
        ["4 5 6 10", "Essa seria a ordem do começo para o fim."],
        ["6 5 4", "Esqueceu a posição nova, v[3]."],
        ["9 6 5 4", "v[0] + v[n-1] é 4 + 6, não 4 + 5."]
      ]
    }
  ];
  window.ALT['a9-q04'] = [
    {
      q: "A função devolve uma cópia invertida da string, em memória alocada; depois a main imprime e libera. Para \"algoritmos\" a saída é \"somtirogla\". Complete.",
      code: "char *inverter(char *s) {\n    int n = strlen(s);\n    char *r = (char *) malloc([[(n + 1) * sizeof(char)]]);\n    for (int i = 0; i < n; i++)\n        r[i] = s[[[n - 1 - i]]];\n    r[n] = [['\\0']];\n    return r;\n}\n\n/* na main: */\nchar *inv = inverter(\"algoritmos\");\nif (inv == NULL)\n    return 1;\nprintf(\"%s\\n\", inv);\n[[free(inv)]];",
      extra: [
        ["n * sizeof(char)", "Sem o +1 não sobra lugar para o terminador."],
        ["n - i", "Começaria em s[n], que é o `\\0`."],
        ["'0'", "O caractere '0' é o dígito, não o terminador."],
        ["free(*inv)", "free recebe o endereço do bloco."]
      ],
      why: "A cópia de n letras ocupa n + 1 bytes; a letra i da cópia vem da posição n-1-i da original; o `\\0` fecha a string."
    },
    {
      q: "A função junta nome e sobrenome numa string nova, separados por espaço. Para \"Ana\" e \"Lima\" a saída é \"Ana Lima\". Complete.",
      code: "char *juntar(char *nome, char *sobre) {\n    char *r = (char *) malloc([[strlen(nome) + strlen(sobre) + 2]]);\n    if (r == NULL)\n        return NULL;\n    strcpy(r, nome);\n    strcat(r, \" \");\n    [[strcat(r, sobre)]];\n    return r;\n}\n\n/* na main: */\nchar *completo = juntar(\"Ana\", \"Lima\");\nif ([[completo == NULL]])\n    return 1;\nprintf(\"%s\\n\", completo);\nfree(completo);",
      extra: [
        ["strlen(nome) + strlen(sobre)", "Faltam o espaço e o terminador."],
        ["strcpy(r, sobre)", "strcpy apagaria o que já está em r."],
        ["completo != NULL", "Isso encerraria quando a alocação deu certo."],
        ["sizeof(nome) + sizeof(sobre)", "sizeof de um ponteiro não é o tamanho do texto."]
      ],
      why: "Tamanho = letras do nome + letras do sobrenome + 1 espaço + 1 terminador; strcat acrescenta ao final."
    }
  ];
  window.ALT['a9-q05'] = [
    {
      q: "O programa soma só os elementos positivos do vetor dinâmico. Para v = {4, -2, 7, -5, 1} deveria mostrar 12. Ache a linha errada.",
      code: "int n, soma = 0;\nscanf(\"%d\", &n);\nint *v = (int *) malloc(n * sizeof(int));\nfor (int i = 0; i < n; i++) scanf(\"%d\", &v[i]);\nfor (int i = 0; i <= n; i++)\n    if (v[i] > 0)\n        soma += v[i];\nprintf(\"%d\\n\", soma);\nfree(v);",
      line: 5,
      fixes: [
        ["for (int i = 0; i < n; i++)", "O último índice válido é n-1."],
        ["for (int i = 1; i < n; i++)", "Pularia o primeiro elemento."],
        ["for (int i = 0; i < n - 1; i++)", "Pularia o último elemento."]
      ],
      why: "O laço deve parar antes de `n`; com `<=` lê `v[n]`, fora do vetor."
    },
    {
      q: "O programa conta quantos elementos do vetor dinâmico são pares. Para v = {2, 7, 4, 4, 9} deveria mostrar 3. Ache a linha errada.",
      code: "int n, cont;\nscanf(\"%d\", &n);\nint *v = (int *) malloc(n * sizeof(int));\nfor (int i = 0; i < n; i++) scanf(\"%d\", &v[i]);\nfor (int i = 0; i < n; i++)\n    if (v[i] % 2 == 0)\n        cont++;\nprintf(\"%d\\n\", cont);\nfree(v);",
      line: 1,
      fixes: [
        ["int n, cont = 0;", "Um contador precisa começar em zero antes do primeiro `cont++`."],
        ["int n, cont = 1;", "Começar em 1 contaria um par a mais."],
        ["int n, cont = n;", "n ainda não foi lido nessa linha."]
      ],
      why: "Variável local sem inicialização tem lixo; o contador precisa de `= 0`."
    }
  ];
  window.ALT['a9-q06'] = [
    {
      q: "Entrada: <code>5 8 3 7 10 4</code> (quantidade e depois os valores). Qual a saída?",
      saida: true,
      stdin: "5 8 3 7 10 4",
      code: "#include <stdio.h>\n#include <stdlib.h>\nint main() {\n    int n, soma = 0, abaixo = 0;\n    scanf(\"%d\", &n);\n    int *v = (int *) malloc(n * sizeof(int));\n    if (v == NULL)\n        return 1;\n    for (int i = 0; i < n; i++) {\n        scanf(\"%d\", &v[i]);\n        soma += v[i];\n    }\n    int media = soma / n;\n    for (int i = 0; i < n; i++)\n        if (v[i] < media)\n            abaixo++;\n    printf(\"media %d abaixo %d\\n\", media, abaixo);\n    free(v);\n    return 0;\n}",
      opts: [
        ["media 6 abaixo 2", "Soma 32, 32/5 em inteiros dá 6; abaixo de 6: o 3 e o 4."],
        ["media 6.4 abaixo 2", "A divisão é entre inteiros e media é int: a parte decimal se perde."],
        ["media 7 abaixo 3", "A divisão inteira trunca, não arredonda."],
        ["media 6 abaixo 3", "O 7 não é menor que 6."]
      ]
    },
    {
      q: "Entrada: <code>3 5 8 2 7 0</code> (valores terminados em 0). Qual a saída?",
      saida: true,
      stdin: "3 5 8 2 7 0",
      code: "#include <stdio.h>\n#include <stdlib.h>\nint main() {\n    int cap = 2, n = 0, x, soma = 0;\n    int *v = (int *) malloc(cap * sizeof(int));\n    scanf(\"%d\", &x);\n    while (x != 0) {\n        if (n == cap) {\n            cap *= 2;\n            v = (int *) realloc(v, cap * sizeof(int));\n        }\n        v[n++] = x;\n        soma += x;\n        scanf(\"%d\", &x);\n    }\n    printf(\"n=%d cap=%d soma=%d\\n\", n, cap, soma);\n    free(v);\n    return 0;\n}",
      opts: [
        ["n=5 cap=8 soma=25", "O bloco dobra quando enche: 2, 4 (ao guardar o 3º valor) e 8 (ao guardar o 5º)."],
        ["n=5 cap=4 soma=25", "O quinto valor encheria o bloco de 4 e o dobraria para 8."],
        ["n=5 cap=6 soma=25", "A capacidade dobra (multiplica por 2), não soma 2."],
        ["n=6 cap=8 soma=25", "O zero final encerra a leitura; não é guardado."]
      ]
    }
  ];
  window.ALT['a9-q07'] = [
    {
      q: "Complete o trecho que, depois de ler as idades no vetor dinâmico <code>v</code> de <code>8</code> pessoas, acha a posição da mais velha e conta os adultos (18 anos ou mais).",
      code: "int posMax = [[0]], adultos = 0;\nfor (int i = 0; i < 8; i++) {\n    if ([[v[i] > v[posMax]]])\n        posMax = i;\n    if (v[i] >= 18)\n        [[adultos++]];\n}\nprintf(\"Mais velha: %d anos\\n\", v[[[posMax]]]);\nprintf(\"Adultos: %d\\n\", adultos);\n[[free(v)]];",
      extra: [
        ["v[0]", "posMax guarda uma posição, não um valor."],
        ["v[i] > posMax", "Compara a idade com uma posição."],
        ["adultos = 1", "Isso não acumula a contagem."],
        ["free(v[0])", "free recebe o endereço do bloco."]
      ],
      why: "posMax guarda a posição do maior; compara-se `v[i]` com `v[posMax]`.",
      pin: "int *v = (int *) calloc(8, sizeof(int));"
    },
    {
      q: "Complete o trecho que, depois de ler as notas no vetor dinâmico <code>nt</code> de <code>6</code> alunos, calcula a média só dos aprovados (nota 6 ou mais).",
      code: "float soma = 0;\nint cont = 0;\nfor (int i = 0; i < 6; i++) {\n    if (nt[i] [[>= 6]]) {\n        soma += [[nt[i]]];\n        [[cont++]];\n    }\n}\nfloat media = cont > 0 ? [[soma / cont]] : 0;\nprintf(\"%.1f\\n\", media);\nfree(nt);",
      extra: [
        ["> 6", "Excluiria quem tirou exatamente 6."],
        ["nt", "Falta o índice: nt é o endereço do vetor."],
        ["cont += soma", "Mistura soma com contador."],
        ["soma / 6", "Divide pela turma toda, não só pelos aprovados."]
      ],
      why: "Só os aprovados entram na soma e na contagem; a média é a soma dividida pela contagem.",
      pin: "float *nt = (float *) calloc(6, sizeof(float));"
    }
  ];
  window.ALT['a9-q08'] = [
    {
      q: "O programa soma o estoque e conta quantos produtos têm menos de 5 unidades. Para {12, 4, 9, 2} deveria mostrar total 27 e 2 produtos. Ache a linha errada.",
      code: "int total = 0, poucos = 0;\nfor (int i = 0; i < n; i++) {\n    total += qtd[i];\n    if (qtd[i] < 5)\n        poucos = i;\n}\nprintf(\"Total: %d, poucos: %d\\n\", total, poucos);\nfree(qtd);",
      line: 5,
      fixes: [
        ["poucos++;", "Contar é somar 1 a cada produto que atende à condição."],
        ["poucos = qtd[i];", "Guardaria a quantidade do último, não quantos são."],
        ["poucos += qtd[i];", "Somaria as unidades, não os produtos."]
      ],
      why: "Para contar, `poucos++` dentro do `if`.",
      pin: "int n = 4; int *qtd = (int *) malloc(4 * sizeof(int));"
    },
    {
      q: "O programa acha a <strong>maior</strong> quantidade em estoque. Para {20, 15, 2, 8} deveria mostrar 20. Ache a linha errada.",
      code: "int maior = qtd[1];\nfor (int i = 0; i < n; i++) {\n    if (qtd[i] > maior)\n        maior = qtd[i];\n}\nprintf(\"Maior estoque: %d\\n\", maior);\nfree(qtd);",
      line: 1,
      fixes: [
        ["int maior = qtd[0];", "O primeiro elemento é o ponto de partida natural."],
        ["int maior = 0;", "Funcionaria só sem valores negativos; o certo é partir de um elemento do vetor."],
        ["int maior = qtd[n];", "qtd[n] está fora do vetor."]
      ],
      why: "Começar em `qtd[1]` só funciona se o primeiro não for o maior; o ponto de partida correto é `qtd[0]`.",
      pin: "int n = 4; int *qtd = (int *) malloc(4 * sizeof(int)); qtd[0]=20; qtd[1]=15; qtd[2]=2; qtd[3]=8;"
    }
  ];
  window.ALT['a9-q09'] = [
    {
      q: "O programa lê o tamanho de duas listas, aloca um vetor para cada uma e libera tudo. Complete.",
      code: "int na, nb;\nscanf(\"%d %d\", &na, &nb);\nint *a = (int *) malloc(na * sizeof(int));\nint *b = (int *) [[malloc(nb * sizeof(int))]];\nif (a == NULL || [[b == NULL]]) {\n    free(a);\n    free(b);\n    return 1;\n}\nint total = [[na + nb]];\nprintf(\"Total de itens: %d\\n\", total);\nfree(a);\n[[free(b)]];",
      extra: [
        ["malloc(na * sizeof(int))", "A segunda lista tem nb itens."],
        ["b != NULL", "Isso encerraria quando deu certo."],
        ["na * nb", "O total é a soma dos tamanhos."],
        ["free(a, b)", "free recebe um único endereço por chamada."]
      ],
      why: "Cada vetor tem o seu tamanho, o seu teste de NULL e o seu free."
    },
    {
      q: "Dois vetores de float: o segundo é uma cópia do primeiro, em memória própria. Complete a alocação, a cópia e a liberação.",
      code: "float *orig = (float *) malloc(4 * sizeof(float));\nfloat *copia = (float *) [[malloc(4 * sizeof(float))]];\nif (orig == NULL || copia == NULL)\n    return 1;\norig[0] = 1.5;\norig[1] = 2.5;\norig[2] = 3.5;\norig[3] = 4.5;\nfor (int i = 0; i < 4; i++)\n    [[copia[i] = orig[i]]];\norig[0] = 9.0;\nprintf(\"%.1f %.1f\\n\", orig[0], [[copia[0]]]);\n[[free(orig)]];\nfree(copia);",
      extra: [
        ["orig", "Só copiaria o endereço; os dois nomes apontariam para o mesmo bloco."],
        ["copia = orig", "Isso faz copia apontar para orig e perde o bloco novo."],
        ["orig[0]", "Mostraria o valor alterado, não o da cópia."],
        ["free(orig[0])", "free recebe o endereço do bloco, não um elemento."]
      ],
      why: "Copiar o conteúdo posição a posição deixa os dois blocos independentes; mudar `orig[0]` não muda `copia[0]`."
    }
  ];
  window.ALT['a9-s02'] = [
    {
      q: "A lista de compras tinha 6 itens e o usuário quer descartar o espaço extra: ficaram só 4. Complete o encolhimento do bloco sem perder os itens.",
      code: "int *temp = (int *) [[realloc(itens, 4 * sizeof(int))]];\nif ([[temp == NULL]]) {\n    free(itens);\n    return 1;\n}\nitens = [[temp]];\nfor (int i = 0; i < 4; i++)\n    printf(\"%d \", itens[i]);\n[[free(itens)]];",
      extra: [
        ["realloc(itens, 2 * sizeof(int))", "O tamanho novo é o total que fica (4), não quanto sai."],
        ["itens == NULL", "Quem pode ter falhado é o realloc, cujo resultado está em temp."],
        ["NULL", "O endereço do bloco se perderia."],
        ["free(temp)", "Depois de itens = temp, o bloco se libera por itens, uma vez só."]
      ],
      why: "realloc também encolhe; o resultado vai para temp, é testado e só então substitui itens.",
      pin: "int *itens = (int *) malloc(6 * sizeof(int)); for (int k = 0; k < 6; k++) itens[k] = k + 1;"
    },
    {
      q: "Um vetor começa com 2 posições e dobra sempre que enche. Complete o trecho que acrescenta o valor <code>x</code> ao final, com <code>n</code> elementos guardados e capacidade <code>cap</code>.",
      code: "if ([[n == cap]]) {\n    cap = [[cap * 2]];\n    int *temp = (int *) realloc(v, cap * sizeof(int));\n    if (temp == NULL)\n        return 1;\n    v = temp;\n}\nv[[[n++]]] = x;",
      extra: [
        ["n > cap", "Só dobraria depois de já ter estourado."],
        ["cap + 2", "O combinado é dobrar, não somar 2."],
        ["n--", "A posição seguinte é n, e depois n aumenta."],
        ["cap == 0", "Não tem relação com estar cheio."]
      ],
      why: "Cheio é `n == cap`; dobra a capacidade, realoca e grava na posição `n`, aumentando-o em seguida.",
      pin: "int cap = 2, n = 2, x = 7; int *v = (int *) malloc(cap * sizeof(int)); v[0] = 1; v[1] = 2;"
    }
  ];
})();
