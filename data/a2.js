/* A2 · Funções e vetores — “Exercícios A2 - Funções II” (13) + 1 exercício dos slides. */
(function () {
  var R = String.raw;
  var A = 'Exercícios A2, questão ';
  var arr = function (v) { return v.join(', '); };
  (window.EXS = window.EXS || {}).a2 = [

  { id: 'a2-q01', topic: 't-parametro', ref: A + '1', title: 'Exibir o vetor', type: 'drag', make: function (p) {
    return { q: 'Complete: ler ' + p.n + ' ' + p.t + ' na main e exibir com uma função.', code: R`void exibir([[${p.t} v[]]], int n) {
    for (int i = 0; i < n; i++)
        printf("${p.f} ", v[i]);
}

int main() {
    ${p.t} dados[${p.n}];
    for (int i = 0; i < ${p.n}; i++)
        scanf("${p.f}", &dados[i]);
    exibir([[dados]], ${p.n});
    return 0;
}`, extra: [['dados[]', 'Na chamada vai só o nome, sem colchetes.'], ['dados[' + p.n + ']', 'Isso é um elemento (e fora do vetor).'], [p.t + ' v', 'Sem colchetes o parâmetro seria um número só.']],
      why: 'Parâmetro com colchetes vazios; chamada com o nome do vetor.' };
  }, p: [{ t: 'int', n: 10, f: '%d' }, { t: 'float', n: 6, f: '%f' }, { t: 'int', n: 8, f: '%d' }] },

  { id: 'a2-q02', topic: 't-parametro', ref: A + '2', title: 'Exibir só os pares', type: 'fix', make: function (p) {
    return { q: 'A função deve exibir apenas os valores pares do vetor de ' + p.n + ' inteiros. Ache a linha errada.', code: R`void pares(int v[], int n) {
    for (int i = 0; ${p.c}; i++)
        if (${p.t})
            printf("%d ", v[i]);
}`, line: p.line,
      fixes: p.line === 2 ? [['for (int i = 0; i < n; i++)', 'Índices de 0 a n − 1.'], ['for (int i = 0; i <= n; i++)', 'v[n] está fora do vetor.'], ['for (int i = 1; i < n; i++)', 'Pularia v[0].']] : [['if (v[i] % 2 == 0)', 'Par: resto da divisão por 2 é zero.'], ['if (i % 2 == 0)', 'Testa a posição, não o valor.'], ['if (v[i] / 2 == 0)', 'Divisão, não resto.']],
      why: p.line === 2 ? 'Percorrer de 0 a n − 1.' : 'Testa-se o valor guardado: `v[i] % 2 == 0`.' };
  }, p: [{ n: 8, c: 'i < n', t: 'i % 2 == 0', line: 3 }, { n: 8, c: 'i <= n', t: 'v[i] % 2 == 0', line: 2 }, { n: 10, c: 'i < n', t: 'v[i] % 2 == 1', line: 3 }] },

  { id: 'a2-q03', topic: 't-parametro', ref: A + '3', title: 'Média de reais', type: 'mc', make: function (p) {
    return { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
float media(float v[], int n) {
    float s = 0;
    for (int i = 0; i < n; i++)
        s += v[i];
    return s / n;
}

int main() {
    float v[6] = {${arr(p.v)}};
    printf("%.2f\n", media(v, 6));
    return 0;
}`, opts: [[p.ok, 'Soma dividida por 6.'], [p.a, 'A divisão é por 6.'], [p.b, 'Faltou dividir.'], [p.c, 'Confira a soma.']] };
  }, p: [{ v: [7, 8, 6, 9, 5, 7], ok: '7.00', a: '8.40', b: '42.00', c: '6.83' }, { v: [1.5, 2.5, 3, 4, 5, 2], ok: '3.00', a: '3.60', b: '18.00', c: '2.50' }, { v: [10, 0, 10, 0, 10, 1], ok: '5.17', a: '6.20', b: '31.00', c: '5.00' }] },

  { id: 'a2-q04', topic: 't-algoritmos', ref: A + '4', title: 'Quantos acima da média', type: 'drag', make: function (p) {
    return { q: 'Complete: a função devolve quantos elementos são maiores que a média. Para {' + arr(p.v) + '} o resultado é ' + p.r + '.', code: R`int acimaDaMedia(int v[], int n) {
    int soma = 0, cont = 0;
    for (int i = 0; i < n; i++)
        soma += v[i];
    float media = [[(float) soma / n]];
    for (int i = 0; i < n; i++)
        if ([[v[i] > media]])
            cont++;
    return [[cont]];
}`, extra: [['soma / n', 'Divisão inteira perde a parte decimal da média.'], ['v[i] >= media', 'Pede-se maior, não maior ou igual.'], ['media', 'A função devolve a contagem.'], ['soma > media', 'Compara-se cada elemento.']],
      why: 'Primeiro laço calcula a média; o segundo compara cada elemento com ela.' };
  }, p: [{ v: [2, 4, 6, 8, 10], r: 2 }, { v: [1, 1, 1, 9], r: 1 }, { v: [5, 6, 7], r: 1 }] },

  { id: 'a2-q05', topic: 't-algoritmos', ref: A + '5', title: 'Posição do maior', type: 'fix', make: function (p) {
    return { q: 'A função devolve a posição do maior valor. Para {' + arr(p.v) + '} deveria devolver ' + p.r + '. Ache a linha errada.', code: R`int posMaior(int v[], int n) {
    int pos = 0;
    for (int i = 1; i < n; i++)
        if (${p.c})
            ${p.a};
    return pos;
}`, line: p.line,
      fixes: p.line === 4 ? [['if (v[i] > v[pos])', 'Compara com o maior até agora.'], ['if (v[i] > pos)', 'pos é um índice, não um valor.'], ['if (i > pos)', 'Compara posições, não valores.']] : [['pos = i;', 'Guarda o índice.'], ['pos = v[i];', 'Guardaria o valor como se fosse índice.'], ['v[pos] = v[i];', 'Estragaria o vetor.']],
      why: 'Compare valores (`v[i] > v[pos]`) e guarde índices (`pos = i`).' };
  }, p: [{ v: [3, 9, 4, 1], r: 1, c: 'v[i] > pos', a: 'pos = i', line: 4 }, { v: [5, 2, 8, 6], r: 2, c: 'v[i] > v[pos]', a: 'pos = v[i]', line: 5 }, { v: [1, 7, 7, 2], r: 1, c: 'i > pos', a: 'pos = i', line: 4 }] },

  { id: 'a2-q06', topic: 't-alteracao', ref: A + '6', title: 'Negativos viram zero', type: 'mc', make: function (p) {
    return { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
void zerarNegativos(int v[], int n) {
    for (int i = 0; i < n; i++)
        if (v[i] < 0)
            v[i] = 0;
}

int main() {
    int v[${p.v.length}] = {${arr(p.v)}};
    zerarNegativos(v, ${p.v.length});
    for (int i = 0; i < ${p.v.length}; i++)
        printf("%d ", v[i]);
    return 0;
}`, opts: [[p.v.map(function (x) { return x < 0 ? 0 : x; }).join(' '), 'A função recebeu o endereço do vetor e alterou o original.'], [p.v.join(' '), 'Vetores não são copiados: a alteração vale na main.'], [p.v.filter(function (x) { return x >= 0; }).join(' '), 'Os negativos viram 0, não somem.'], [p.v.map(function (x) { return Math.abs(x); }).join(' '), 'A função zera, não troca o sinal.']] };
  }, p: [{ v: [3, -2, 5, -7] }, { v: [-1, -1, 4] }, { v: [0, 8, -3, 2, -9] }] },

  { id: 'a2-q07', topic: 't-algoritmos', ref: A + '7', title: 'Dois vetores iguais', type: 'drag', make: function (p) {
    return { q: 'Complete a função que devolve 1 se os vetores ' + p.a + ' e ' + p.b + ' (de tamanho n) são iguais e 0 se não são.', code: R`int iguais(int ${p.a}[], int ${p.b}[], int n) {
    for (int i = 0; i < n; i++)
        if ([[${p.a}[i] != ${p.b}[i]]])
            return [[0]];
    return [[1]];
}`, extra: [[p.a + '[i] == ' + p.b + '[i]', 'Sairia no primeiro elemento igual.'], [p.a + ' != ' + p.b, 'Compara endereços, não conteúdos.'], ['i', 'O retorno é 1 ou 0.']],
      why: 'Na primeira diferença já se sabe a resposta (0); só depois de percorrer tudo devolve 1.' };
  }, p: [{ a: 'a', b: 'b' }, { a: 'v1', b: 'v2' }, { a: 'x', b: 'y' }] },

  { id: 'a2-q08', topic: 't-string', ref: A + '8', title: 'Contar espaços', type: 'mc', make: function (p) {
    return { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
int espacos(char s[]) {
    int c = 0;
    for (int i = 0; s[i] != '\0'; i++)
        if (s[i] == ' ')
            c++;
    return c;
}

int main() {
    printf("%d\n", espacos("${p.s}"));
    return 0;
}`, opts: [[String(p.r), 'Conta cada caractere espaço.'], [String(p.r + 1), 'Isso seria o número de palavras.'], [String(p.s.length), 'Isso é o tamanho da string.'], [String(p.r - 1 < 0 ? p.r + 2 : p.r - 1), 'Conte de novo os espaços.']] };
  }, p: [{ s: 'ola mundo em C', r: 3 }, { s: 'ponteiros', r: 0 }, { s: 'a b  c', r: 3 }] },

  { id: 'a2-q09', topic: 't-string', ref: A + '9', title: 'Contar consoantes', type: 'fix', make: function (p) {
    return { q: 'A função conta as consoantes de uma palavra só com letras minúsculas. Para "' + p.w + '" deveria dar ' + p.r + '. Ache a linha.', code: R`int consoantes(char s[]) {
    int c = 0;
    for (int i = 0; ${p.lc}; i++)
        if (${p.cond})
            c++;
    return c;
}`, line: p.line,
      fixes: p.line === 3 ? [["for (int i = 0; s[i] != '\\0'; i++)", 'A string termina no `\\0`.'], ['for (int i = 0; i < 50; i++)', 'Leria lixo depois do fim.'], ["for (int i = 0; s[i] != '0'; i++)", "'0' é o caractere zero, não o terminador."]]
        : [["if (s[i] != 'a' && s[i] != 'e' && s[i] != 'i' && s[i] != 'o' && s[i] != 'u')", 'Consoante: diferente de TODAS as vogais.'], ["if (s[i] != 'a' || s[i] != 'e' || s[i] != 'i' || s[i] != 'o' || s[i] != 'u')", 'Com `||` a condição é sempre verdadeira.'], ["if (s[i] == 'a' || s[i] == 'e' || s[i] == 'i' || s[i] == 'o' || s[i] == 'u')", 'Isso conta vogais.']],
      why: p.line === 3 ? 'Percorre até o terminador.' : 'Precisa ser diferente de a, e, i, o E u ao mesmo tempo: `&&`.' };
  }, p: [
    { w: 'programa', r: 5, lc: "s[i] != '\\0'", cond: "s[i] != 'a' || s[i] != 'e' || s[i] != 'i' || s[i] != 'o' || s[i] != 'u'", line: 4 },
    { w: 'vetor', r: 3, lc: 'i < 50', cond: "s[i] != 'a' && s[i] != 'e' && s[i] != 'i' && s[i] != 'o' && s[i] != 'u'", line: 3 },
    { w: 'casa', r: 2, lc: "s[i] != '\\0'", cond: "s[i] == 'a' || s[i] == 'e' || s[i] == 'i' || s[i] == 'o' || s[i] == 'u'", line: 4 }] },

  { id: 'a2-q10', topic: 't-algoritmos', ref: A + '10', title: 'Intersecção de dois vetores', type: 'mc', make: function (p) {
    return { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
void interseccao(int a[], int na, int b[], int nb) {
    for (int i = 0; i < na; i++)
        for (int j = 0; j < nb; j++)
            if (a[i] == b[j]) {
                printf("%d ", a[i]);
                break;
            }
}

int main() {
    int a[] = {${arr(p.a)}}, b[] = {${arr(p.b)}};
    interseccao(a, ${p.a.length}, b, ${p.b.length});
    printf("fim\n");
    return 0;
}`, opts: [[p.ok, 'Para cada elemento de a, procura um igual em b, na ordem de a.'], [p.x, p.wx], [p.y, p.wy], [p.z, p.wz]] };
  }, p: [
    { a: [1, 3, 5, 7], b: [7, 2, 3], ok: '3 7 fim', x: '7 3 fim', wx: 'A ordem segue o vetor a.', y: '1 2 3 5 7 fim', wy: 'Isso é a união.', z: '3 fim', wz: 'O 7 também está nos dois.' },
    { a: [4, 4, 9], b: [4, 8], ok: '4 4 fim', x: '4 fim', wx: 'a tem dois 4, cada um acha um igual em b.', y: '4 8 9 fim', wy: 'Isso é a união.', z: '9 fim', wz: '9 não está em b.' },
    { a: [2, 6], b: [1, 3, 5], ok: 'fim', x: '2 6 fim', wx: 'Nenhum elemento de a está em b.', y: '1 3 5 fim', wy: 'Isso é o vetor b.', z: '0 fim', wz: 'Nada é impresso antes do fim.' }] },

  { id: 'a2-q11', topic: 't-algoritmos', ref: A + '11', title: 'Remover repetidos', type: 'mc', make: function (p) {
    return { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
int semRepetidos(int v[], int n) {
    int k = 0;
    for (int i = 0; i < n; i++) {
        int existe = 0;
        for (int j = 0; j < k; j++)
            if (v[j] == v[i])
                existe = 1;
        if (!existe)
            v[k++] = v[i];
    }
    return k;
}

int main() {
    int v[] = {${arr(p.v)}};
    int k = semRepetidos(v, ${p.v.length});
    for (int i = 0; i < k; i++)
        printf("%d ", v[i]);
    printf("| %d diferentes\n", k);
    return 0;
}`, opts: [[p.ok, 'Mantém a primeira ocorrência de cada valor, na ordem.'], [p.x, p.wx], [p.y, p.wy], [p.z, p.wz]] };
  }, p: [
    { v: [5, 2, 5, 3, 2], ok: '5 2 3 | 3 diferentes', x: '2 3 5 | 3 diferentes', wx: 'A ordem original é mantida; não há ordenação.', y: '5 2 5 3 2 | 5 diferentes', wy: 'Os repetidos são removidos.', z: '3 | 1 diferentes', wz: 'Fica uma cópia de cada valor, não só os que nunca repetem.' },
    { v: [1, 1, 1], ok: '1 | 1 diferentes', x: '1 1 1 | 3 diferentes', wx: 'Os repetidos são removidos.', y: ' | 0 diferentes', wy: 'A primeira ocorrência fica.', z: '1 | 3 diferentes', wz: 'k conta os diferentes.' },
    { v: [4, 7, 9], ok: '4 7 9 | 3 diferentes', x: '4 7 9 | 0 diferentes', wx: 'Nenhum se repete, os três ficam.', y: '9 7 4 | 3 diferentes', wy: 'A ordem é mantida.', z: '4 | 1 diferentes', wz: 'Todos são diferentes.' }] },

  { id: 'a2-q12', topic: 't-algoritmos', ref: A + '12', title: 'Pares antes dos ímpares', type: 'drag', make: function (p) {
    return { q: 'Complete a reorganização estável (ordem relativa mantida). Para {' + arr(p.v) + '} fica {' + arr(p.r) + '}.', code: R`void paresPrimeiro(int v[], int n) {
    int aux[${p.v.length}], k = 0;
    for (int i = 0; i < n; i++)
        if (v[i] % 2 == 0)
            aux[[[k++]]] = v[i];
    for (int i = 0; i < n; i++)
        if ([[v[i] % 2 != 0]])
            aux[k++] = v[i];
    for (int i = 0; i < n; i++)
        [[v[i] = aux[i]]];
}`, extra: [['i', 'Os pares vão para o início do auxiliar, posições 0, 1, 2…'], ['v[i] % 2 == 0', 'O segundo laço copia os ímpares.'], ['aux[i] = v[i]', 'Na última etapa o vetor recebe o auxiliar.'], ['k--', 'O índice cresce.']],
      why: 'Primeiro todos os pares, depois todos os ímpares, cada grupo na ordem em que aparece.' };
  }, p: [{ v: [3, 8, 5, 2, 7, 4], r: [8, 2, 4, 3, 5, 7] }, { v: [1, 2, 3, 4], r: [2, 4, 1, 3] }, { v: [6, 9, 10, 11, 12], r: [6, 10, 12, 9, 11] }] },

  { id: 'a2-q13', topic: 't-algoritmos', ref: A + '13', title: 'Maior sequência crescente', type: 'mc', make: function (p) {
    return { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
void maiorSeq(int v[], int n) {
    int ini = 0, tam = 1, melhorIni = 0, melhorTam = 1;
    for (int i = 1; i < n; i++) {
        if (v[i] > v[i - 1])
            tam++;
        else {
            ini = i;
            tam = 1;
        }
        if (tam > melhorTam) {
            melhorTam = tam;
            melhorIni = ini;
        }
    }
    printf("inicio %d, fim %d, %d elementos\n", melhorIni, melhorIni + melhorTam - 1, melhorTam);
}

int main() {
    int v[] = {${arr(p.v)}};
    maiorSeq(v, ${p.v.length});
    return 0;
}`, opts: [[p.ok, 'Posições contadas a partir de 0.'], [p.x, p.wx], [p.y, p.wy], [p.z, p.wz]] };
  }, p: [
    { v: [5, 1, 2, 3, 0, 4, 5], ok: 'inicio 1, fim 3, 3 elementos', x: 'inicio 2, fim 4, 3 elementos', wx: 'Os índices começam em 0.', y: 'inicio 4, fim 6, 3 elementos', wy: 'Empate: fica a primeira encontrada (só troca com `>`).', z: 'inicio 1, fim 6, 6 elementos', wz: 'O 0 quebra a sequência.' },
    { v: [9, 8, 7], ok: 'inicio 0, fim 0, 1 elementos', x: 'inicio 0, fim 2, 3 elementos', wx: 'É decrescente: nenhuma sequência passa de 1.', y: 'inicio 2, fim 2, 1 elementos', wy: 'O primeiro tamanho 1 encontrado fica.', z: 'inicio 0, fim 1, 2 elementos', wz: '8 não é maior que 9.' },
    { v: [1, 2, 2, 3, 4, 5], ok: 'inicio 2, fim 5, 4 elementos', x: 'inicio 0, fim 5, 6 elementos', wx: '2 seguido de 2 não é crescente.', y: 'inicio 0, fim 1, 2 elementos', wy: 'Há uma sequência maior depois.', z: 'inicio 3, fim 5, 3 elementos', wz: 'A sequência começa no segundo 2.' }] },

  { id: 'a2-s01', topic: 't-retorno', ref: 'Slides A2, boas-vindas', title: 'Devolver um vetor', type: 'mc', make: function (p) {
    return { q: p.q, opts: [[p.ok, 'Vetores não podem ser retornados; quem chama cria e a função preenche.'], ['`char[] ' + p.f + '()` devolvendo o vetor local.', 'Não compila: vetor não é tipo de retorno.'], ['`char ' + p.f + '()` devolvendo `' + p.v + '`.', 'char é um caractere só.'], ['Declarar o vetor como global para a função preencher.', 'Funciona, mas globais devem ser evitadas; o padrão da aula é passar o vetor.']] };
  }, p: [
    { q: 'Uma função precisa ler o nome do usuário e deixá-lo disponível na main. Qual é a forma correta?', f: 'solicitar_nome', v: 'nome', ok: '`void solicitar_nome(char nome[], int max)` com `fgets(nome, max, stdin)`, chamada com o vetor da main.' },
    { q: 'Uma função precisa montar a sigla de um curso e deixá-la na main.', f: 'montarSigla', v: 'sigla', ok: '`void montarSigla(char sigla[])` preenchendo o vetor recebido.' },
    { q: 'Uma função precisa preencher 10 notas lidas do teclado.', f: 'lerNotas', v: 'notas', ok: '`void lerNotas(float notas[], int n)` lendo direto no vetor recebido.' }] }
  ];
})();

/* Variantes V2 e V3 escritas à mão (2026-11-18): outra tarefa, outra lógica, outro erro. V1 vem dos moldes acima.
   Gerado por _tools/gerar_alt.mjs a partir de _tools/alt/a2.alt.js; null = a versão do molde continua valendo. */
(function () {
  window.ALT = window.ALT || {};
  window.ALT['a2-q01'] = [
    {
      q: "Complete: uma função lê 5 notas (float) direto no vetor da main, e outra as exibe.",
      code: "void ler([[float v[]]], int n) {\n    for (int i = 0; i < n; i++)\n        scanf(\"%f\", [[&v[i]]]);\n}\n\nvoid exibir(float v[], int n) {\n    for (int i = 0; i < n; i++)\n        printf(\"%.1f \", v[i]);\n}\n\nint main() {\n    float notas[5];\n    ler([[notas]], 5);\n    exibir(notas, 5);\n    return 0;\n}",
      extra: [
        ["float v", "Seria um único float, não o vetor."],
        ["v[i]", "scanf precisa do endereço: faltou o `&`."],
        ["notas[5]", "Índice 5 está fora do vetor, e não é o vetor."],
        ["float notas", "Isso declara uma variável nova dentro da chamada."]
      ],
      why: "O vetor é passado pelo nome, que carrega o endereço; a função grava direto nele, e o scanf recebe `&v[i]`."
    },
    {
      q: "Complete: uma função soma os 6 valores do vetor e devolve o total para a main.",
      code: "int somar([[int v[]]], int n) {\n    int soma = 0;\n    for (int i = 0; i < n; i++)\n        [[soma += v[i]]];\n    [[return soma]];\n}\n\nint main() {\n    int dados[6] = {4, 8, 1, 9, 3, 5};\n    int total = [[somar(dados, 6)]];\n    printf(\"%d\\n\", total);\n    return 0;\n}",
      extra: [
        ["int v", "Seria um único inteiro."],
        ["soma = v[i]", "Substitui em vez de acumular."],
        ["return v", "Devolveria o vetor, e a função devolve int."],
        ["somar(dados[6], 6)", "Passaria um elemento fora do vetor, não o vetor."]
      ],
      why: "A função recebe o vetor e o tamanho, acumula em `soma` e devolve o resultado, que a main guarda em `total`."
    }
  ];
  window.ALT['a2-q02'] = [
    {
      q: "A função deve exibir apenas os valores positivos do vetor de 8 inteiros. Ache a linha errada.",
      code: "void positivos(int v[], int n) {\n    for (int i = 0; i <= n; i++)\n        if (v[i] > 0)\n            printf(\"%d \", v[i]);\n}",
      line: 2,
      fixes: [
        ["for (int i = 0; i < n; i++)", "As posições válidas vão de 0 a n-1."],
        ["for (int i = 1; i <= n; i++)", "Ainda lê v[n] e pula v[0]."],
        ["for (int i = 0; i < n - 1; i++)", "Deixaria o último valor de fora."]
      ],
      why: "Com `i <= n` o laço lê `v[n]`, fora do vetor."
    },
    {
      q: "A função deve exibir os <strong>valores</strong> ímpares do vetor. Para {4, 7, 9, 2} deveria mostrar 7 9. Ache a linha errada.",
      code: "void impares(int v[], int n) {\n    for (int i = 0; i < n; i++)\n        if (v[i] % 2 != 0)\n            printf(\"%d \", i);\n}",
      line: 4,
      fixes: [
        ["printf(\"%d \", v[i]);", "Mostra o valor do elemento."],
        ["printf(\"%d \", v);", "`v` é o endereço do vetor."],
        ["printf(\"%d \", v[i] % 2);", "Mostraria sempre 1."]
      ],
      why: "O teste está certo, mas o printf mostra a posição `i` em vez do valor `v[i]`."
    }
  ];
  window.ALT['a2-q03'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nfloat mediaPositivos(float v[], int n) {\n    float s = 0;\n    int c = 0;\n    for (int i = 0; i < n; i++)\n        if (v[i] != 0) {\n            s += v[i];\n            c++;\n        }\n    return s / c;\n}\n\nint main() {\n    float v[5] = {4, 0, 6, 0, 8};\n    printf(\"%.2f\\n\", mediaPositivos(v, 5));\n    return 0;\n}",
      opts: [
        ["6.00", "Os zeros ficam fora da soma e da contagem: (4 + 6 + 8) ÷ 3."],
        ["3.60", "Dividiu por 5, contando também os zeros."],
        ["18.00", "Esqueceu de dividir."],
        ["9.00", "Dividiu a soma por 2, ignorando a contagem."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nfloat ponderada(float v[], int n) {\n    float s = 0, pesos = 0;\n    for (int i = 0; i < n; i++) {\n        s += v[i] * (i + 1);\n        pesos += i + 1;\n    }\n    return s / pesos;\n}\n\nint main() {\n    float v[3] = {6, 8, 10};\n    printf(\"%.2f\\n\", ponderada(v, 3));\n    return 0;\n}",
      opts: [
        ["8.67", "Pesos 1, 2 e 3: (6 + 16 + 30) ÷ 6."],
        ["8.00", "Essa é a média simples, sem pesos."],
        ["52.00", "Esqueceu de dividir pela soma dos pesos."],
        ["17.33", "Dividiu por 3 em vez de pela soma dos pesos (6)."]
      ]
    }
  ];
  window.ALT['a2-q04'] = [
    {
      q: "Complete: a função devolve a porcentagem de notas aprovadoras (6 ou mais). Para {7, 4, 6, 3} o resultado é 50.",
      code: "float pctAprovados(float v[], int n) {\n    int aprov = 0;\n    for (int i = 0; i < n; i++)\n        if ([[v[i] >= 6]])\n            [[aprov++]];\n    return [[(float) aprov / n * 100]];\n}",
      extra: [
        ["v[i] > 6", "Excluiria quem tirou exatamente 6."],
        ["aprov = i", "Não conta; apenas guarda a posição."],
        ["aprov / n * 100", "A divisão de inteiros dá 0."],
        ["aprov * 100", "Faltou dividir pelo total."]
      ],
      why: "Conta quem tem 6 ou mais e converte para float antes de dividir, senão a divisão inteira perde a fração."
    },
    {
      q: "Complete: a função soma só os elementos das posições pares (0, 2, 4...). Para {5, 1, 7, 2, 4} o resultado é 16.",
      code: "int somaPosPares(int v[], int n) {\n    int s = 0;\n    for (int i = [[0]]; [[i < n]]; i += [[2]])\n        s += v[i];\n    return s;\n}",
      extra: [
        ["1", "Começaria nas posições ímpares."],
        ["i <= n", "Leria v[n], fora do vetor."],
        ["i + 2", "Calcula mas não grava em `i`."],
        ["3", "Pularia posições demais."]
      ],
      why: "O laço começa em 0, anda de 2 em 2 e para antes de n."
    }
  ];
  window.ALT['a2-q05'] = [
    {
      q: "A função devolve a posição do <strong>menor</strong> valor. Para {5, 2, 8, 6} deveria devolver 1. Ache a linha errada.",
      code: "int posMenor(int v[], int n) {\n    int pos = 0;\n    for (int i = 1; i < n; i++)\n        if (v[i] > v[pos])\n            pos = i;\n    return pos;\n}",
      line: 4,
      fixes: [
        ["if (v[i] < v[pos])", "Procura um valor menor que o menor atual."],
        ["if (v[i] < pos)", "Compara um valor com uma posição."],
        ["if (i < pos)", "Compara duas posições."]
      ],
      why: "Com `>` a função acha o maior; para o menor, a comparação é `<`."
    },
    {
      q: "A função devolve a posição do maior valor e, no empate, a <strong>última</strong> posição. Para {1, 7, 7, 2} deveria devolver 2. Ache a linha errada.",
      code: "int posMaiorUltimo(int v[], int n) {\n    int pos = 0;\n    for (int i = 1; i < n; i++)\n        if (v[i] > v[pos])\n            pos = i;\n    return pos;\n}",
      line: 4,
      fixes: [
        ["if (v[i] >= v[pos])", "Com `>=`, um valor igual ao maior também assume a posição."],
        ["if (v[i] == v[pos])", "Só trocaria nos empates."],
        ["if (v[i] > v[pos] + 1)", "Complicaria sem resolver o empate."]
      ],
      why: "O `>` estrito mantém a primeira posição do empate; para ficar com a última, usa-se `>=`."
    }
  ];
  window.ALT['a2-q06'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid dobrarAteZero(int v[], int n) {\n    for (int i = 0; i < n; i++) {\n        if (v[i] == 0)\n            break;\n        v[i] = v[i] * 2;\n    }\n}\n\nint main() {\n    int v[4] = {3, 5, 0, 4};\n    dobrarAteZero(v, 4);\n    for (int i = 0; i < 4; i++)\n        printf(\"%d \", v[i]);\n    return 0;\n}",
      opts: [
        ["6 10 0 4", "O `break` encerra o laço no zero: o 4 depois dele não é dobrado."],
        ["6 10 0 8", "O laço não continua depois do `break`."],
        ["3 5 0 4", "A função altera o vetor original."],
        ["6 10", "Os elementos continuam existindo; apenas não são alterados."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid rotacionar(int v[], int n) {\n    int primeiro = v[0];\n    for (int i = 0; i < n - 1; i++)\n        v[i] = v[i + 1];\n    v[n - 1] = primeiro;\n}\n\nint main() {\n    int v[4] = {1, 2, 3, 4};\n    rotacionar(v, 4);\n    for (int i = 0; i < 4; i++)\n        printf(\"%d \", v[i]);\n    return 0;\n}",
      opts: [
        ["2 3 4 1", "Cada elemento anda uma posição para a esquerda e o primeiro vai para o fim."],
        ["4 1 2 3", "Essa seria a rotação para a direita."],
        ["2 3 4 4", "O primeiro valor foi guardado e vai para a última posição."],
        ["1 2 3 4", "A função altera o vetor original."]
      ]
    }
  ];
  window.ALT['a2-q07'] = [
    {
      q: "Complete a função que devolve 1 se o vetor está em ordem crescente (cada elemento menor ou igual ao seguinte) e 0 se não está.",
      code: "int crescente(int v[], int n) {\n    for (int i = 0; [[i < n - 1]]; i++)\n        if ([[v[i] > v[i + 1]]])\n            return [[0]];\n    return [[1]];\n}",
      extra: [
        ["i < n", "Leria v[n], fora do vetor."],
        ["v[i] < v[i + 1]", "Reprovaria justamente os pares em ordem."],
        ["i", "A função devolve 1 ou 0."],
        ["-1", "A função devolve 1 ou 0."]
      ],
      why: "Compara cada elemento com o seguinte; um par fora de ordem já decide que a resposta é 0."
    },
    {
      q: "Complete a função que devolve 1 se o vetor é simétrico (lido de trás para frente fica igual), como {3, 8, 5, 8, 3}.",
      code: "int simetrico(int v[], int n) {\n    for (int i = 0; [[i < n / 2]]; i++)\n        if ([[v[i] != v[n - 1 - i]]])\n            return [[0]];\n    return [[1]];\n}",
      extra: [
        ["i < n", "Compararia cada par duas vezes."],
        ["v[i] != v[n - i]", "v[n] está fora do vetor: o espelho de i é n-1-i."],
        ["v[i] == v[n - 1 - i]", "Reprovaria justamente os pares simétricos."],
        ["-1", "A função devolve 1 ou 0."]
      ],
      why: "O espelho de `i` é `n - 1 - i`; basta conferir metade do vetor."
    }
  ];
  window.ALT['a2-q08'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint palavras(char s[]) {\n    int p = 0, dentro = 0;\n    for (int i = 0; s[i] != '\\0'; i++) {\n        if (s[i] != ' ' && !dentro) {\n            p++;\n            dentro = 1;\n        } else if (s[i] == ' ')\n            dentro = 0;\n    }\n    return p;\n}\n\nint main() {\n    printf(\"%d\\n\", palavras(\"  ola   mundo em  C \"));\n    return 0;\n}",
      opts: [
        ["4", "Cada trecho de letras seguidas é uma palavra: ola, mundo, em, C."],
        ["9", "Esse é o número de espaços, não de palavras."],
        ["3", "Esqueceu a palavra \"C\" no final."],
        ["5", "Contou um trecho a mais."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\n#include <string.h>\nvoid inverter(char s[]) {\n    int i = 0, j = strlen(s) - 1;\n    while (i < j) {\n        char t = s[i];\n        s[i] = s[j];\n        s[j] = t;\n        i++;\n        j--;\n    }\n}\n\nint main() {\n    char txt[] = \"algoritmo\";\n    inverter(txt);\n    txt[3] = '\\0';\n    printf(\"%s\\n\", txt);\n    return 0;\n}",
      opts: [
        ["omt", "Invertido vira \"omtirogla\"; o `\\0` na posição 3 corta a string em \"omt\"."],
        ["alg", "A função altera o vetor original: o texto já está invertido."],
        ["omtirogla", "O `\\0` na posição 3 encerra a string ali."],
        ["omti", "O corte é na posição 3: sobram só três letras."]
      ]
    }
  ];
  window.ALT['a2-q09'] = [
    {
      q: "A função conta os dígitos de um texto. Para \"a1b22\" deveria dar 3. Ache a linha.",
      code: "int digitos(char s[]) {\n    int c = 0;\n    for (int i = 0; s[i] != '\\0'; i++)\n        if (s[i] >= '0' && s[i] <= 9)\n            c++;\n    return c;\n}",
      line: 4,
      fixes: [
        ["if (s[i] >= '0' && s[i] <= '9')", "O limite superior também é o caractere '9'."],
        ["if (s[i] >= '0' || s[i] <= '9')", "Com `||` qualquer caractere passa no teste."],
        ["if (s[i] >= 0 && s[i] <= '9')", "Falta o '0' entre aspas; o código ASCII de '0' é 48."]
      ],
      why: "`9` é o número, de código 9; o caractere é '9', de código 57."
    },
    {
      q: "A função devolve o tamanho de uma string. Para \"casa\" deveria dar 4, mas o programa trava. Ache a linha.",
      code: "int tamanho(char s[]) {\n    int tam = 0;\n    while (s[tam] != '\\0');\n    tam++;\n    return tam;\n}",
      line: 3,
      fixes: [
        ["while (s[tam] != '\\0')", "Sem o ponto e vírgula, o `tam++` passa a ser o corpo do laço."],
        ["while (s[tam] != '0');", "'0' é o dígito, não o terminador, e o `;` continua."],
        ["while (s[tam] == '\\0')", "Inverteria a condição."]
      ],
      why: "O `;` depois do `while` faz o laço vazio repetir sem nunca avançar `tam`."
    }
  ];
  window.ALT['a2-q10'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid diferenca(int a[], int na, int b[], int nb) {\n    for (int i = 0; i < na; i++) {\n        int achou = 0;\n        for (int j = 0; j < nb; j++)\n            if (a[i] == b[j])\n                achou = 1;\n        if (!achou)\n            printf(\"%d \", a[i]);\n    }\n}\n\nint main() {\n    int a[] = {1, 3, 5, 7, 3}, b[] = {3, 9, 7};\n    diferenca(a, 5, b, 3);\n    printf(\"fim\\n\");\n    return 0;\n}",
      opts: [
        ["1 5 fim", "Imprime os de a que não aparecem em b: sobram 1 e 5."],
        ["3 7 3 fim", "Esses são os que aparecem nos dois vetores."],
        ["1 5 9 fim", "O 9 só existe em b; a função não olha para ele."],
        ["1 3 5 7 3 fim", "Imprimiria todo o vetor a."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid uniao(int a[], int na, int b[], int nb) {\n    for (int i = 0; i < na; i++)\n        printf(\"%d \", a[i]);\n    for (int j = 0; j < nb; j++) {\n        int existe = 0;\n        for (int i = 0; i < na; i++)\n            if (b[j] == a[i])\n                existe = 1;\n        if (!existe)\n            printf(\"%d \", b[j]);\n    }\n}\n\nint main() {\n    int a[] = {2, 4}, b[] = {4, 6, 2, 8};\n    uniao(a, 2, b, 4);\n    printf(\"fim\\n\");\n    return 0;\n}",
      opts: [
        ["2 4 6 8 fim", "Todo o vetor a e, depois, os elementos de b que não estão em a."],
        ["2 4 4 6 2 8 fim", "Os elementos de b repetidos em a não são impressos."],
        ["2 4 fim", "Faltaram os elementos novos de b."],
        ["6 8 fim", "O vetor a também é impresso, na primeira linha da função."]
      ]
    }
  ];
  window.ALT['a2-q11'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint remover(int v[], int n, int x) {\n    int k = 0;\n    for (int i = 0; i < n; i++)\n        if (v[i] != x)\n            v[k++] = v[i];\n    return k;\n}\n\nint main() {\n    int v[] = {3, 7, 3, 3, 5};\n    int k = remover(v, 5, 3);\n    for (int i = 0; i < k; i++)\n        printf(\"%d \", v[i]);\n    printf(\"| restam %d\\n\", k);\n    return 0;\n}",
      opts: [
        ["7 5 | restam 2", "Todas as ocorrências do 3 são puladas; os outros são compactados no início."],
        ["3 3 3 | restam 3", "Ficariam só os que foram removidos."],
        ["7 3 3 5 | restam 4", "Removeria só a primeira ocorrência."],
        ["7 5 3 3 5 | restam 5", "k conta só os elementos mantidos."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid inserirInicio(int v[], int n, int x) {\n    for (int i = n; i > 0; i--)\n        v[i] = v[i - 1];\n    v[0] = x;\n}\n\nint main() {\n    int v[5] = {2, 4, 6, 0, 0};\n    inserirInicio(v, 3, 9);\n    for (int i = 0; i < 4; i++)\n        printf(\"%d \", v[i]);\n    printf(\"\\n\");\n    return 0;\n}",
      opts: [
        ["9 2 4 6", "Os valores deslocam uma posição para a direita, de trás para frente, e o 9 entra na frente."],
        ["2 4 6 9", "O 9 entra na posição 0, não no final."],
        ["9 9 9 9", "Isso aconteceria se o deslocamento fosse da frente para trás."],
        ["9 4 6 0", "O 2 foi deslocado para a posição 1, não perdido."]
      ]
    }
  ];
  window.ALT['a2-q12'] = [
    {
      q: "Complete a função que inverte o vetor no próprio vetor, trocando os extremos. Para {1, 2, 3, 4, 5} fica {5, 4, 3, 2, 1}.",
      code: "void inverter(int v[], int n) {\n    for (int i = 0; [[i < n / 2]]; i++) {\n        int t = [[v[i]]];\n        v[i] = [[v[n - 1 - i]]];\n        v[n - 1 - i] = [[t]];\n    }\n}",
      extra: [
        ["i < n", "Desfaria a inversão: cada par seria trocado duas vezes."],
        ["v[n - i]", "v[n] está fora do vetor."],
        ["v[i + 1]", "Trocaria vizinhos, não extremos."],
        ["v[t]", "t é um valor, não um índice."]
      ],
      why: "Troca com auxiliar `t` e só vai até a metade; o espelho de `i` é `n - 1 - i`."
    },
    {
      q: "Complete a função que remove os zeros do vetor, compactando os demais no início e devolvendo a nova quantidade. Para {0, 4, 0, 7, 2} fica {4, 7, 2} e devolve 3.",
      code: "int compactar(int v[], int n) {\n    int k = 0;\n    for (int i = 0; i < n; i++)\n        if ([[v[i] != 0]])\n            v[[[k++]]] = v[i];\n    return [[k]];\n}",
      extra: [
        ["v[i] == 0", "Guardaria só os zeros."],
        ["i++", "Gravaria na mesma posição de leitura, sem compactar."],
        ["n", "O tamanho antigo."],
        ["k--", "A posição de gravação só avança."]
      ],
      why: "k é a posição de gravação: só avança quando um valor não nulo é guardado."
    }
  ];
  window.ALT['a2-q13'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid picos(int v[], int n) {\n    int c = 0;\n    for (int i = 1; i < n - 1; i++)\n        if (v[i] > v[i - 1] && v[i] > v[i + 1]) {\n            printf(\"%d \", i);\n            c++;\n        }\n    printf(\"| %d picos\\n\", c);\n}\n\nint main() {\n    int v[] = {1, 5, 2, 2, 6, 3, 3, 1};\n    picos(v, 8);\n    return 0;\n}",
      opts: [
        ["1 4 | 2 picos", "Pico é um valor maior que os dois vizinhos: posições 1 (5) e 4 (6)."],
        ["5 6 | 2 picos", "Imprime as posições, não os valores."],
        ["1 4 5 | 3 picos", "O 3 da posição 5 não é maior que o vizinho da direita (3)."],
        ["4 | 1 picos", "O 5 da posição 1 também é pico."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid maiorSalto(int v[], int n) {\n    int melhor = 0, pos = 0;\n    for (int i = 1; i < n; i++) {\n        int d = v[i] - v[i - 1];\n        if (d < 0)\n            d = -d;\n        if (d > melhor) {\n            melhor = d;\n            pos = i;\n        }\n    }\n    printf(\"salto %d entre %d e %d\\n\", melhor, pos - 1, pos);\n}\n\nint main() {\n    int v[] = {3, 10, 4, 4, 15, 9};\n    maiorSalto(v, 6);\n    return 0;\n}",
      opts: [
        ["salto 11 entre 3 e 4", "Os saltos são 7, 6, 0, 11 e 6; o maior é de v[3] para v[4]."],
        ["salto 7 entre 0 e 1", "Esse é o primeiro salto, não o maior."],
        ["salto 11 entre 4 e 5", "A posição guardada é a do segundo elemento do par (4); o primeiro é 3."],
        ["salto 6 entre 4 e 5", "O último salto não é o maior."]
      ]
    }
  ];
  window.ALT['a2-s01'] = [
    {
      q: "Uma função precisa colocar em ordem crescente o vetor de notas da main. Qual é a forma correta?",
      opts: [
        ["`void ordenar(float notas[], int n)` alterando o próprio vetor recebido.", "O vetor chega por endereço, então a função reorganiza o original."],
        ["`float[] ordenar(float notas[])` devolvendo um vetor novo.", "Uma função em C não devolve um vetor."],
        ["`float ordenar(float notas[], int n)` devolvendo `notas`.", "O tipo float é um único valor."],
        ["Declarar `notas` dentro da função e copiar para a main.", "Uma variável local deixa de existir ao fim da função."]
      ]
    },
    {
      q: "Com <code>void f(int v[])</code>, o que acontece quando a função faz <code>v[0] = 99;</code>?",
      opts: [
        ["O primeiro elemento do vetor da main passa a valer 99.", "O vetor é passado por endereço: a função mexe no original."],
        ["Só uma cópia local muda; o vetor da main fica igual.", "Isso vale para variáveis simples, não para vetores."],
        ["O programa não compila, porque a função não pode alterar vetores.", "Pode, e é muito comum."],
        ["O vetor inteiro é copiado para a função antes da alteração.", "Vetores não são copiados na chamada."]
      ]
    }
  ];
})();
