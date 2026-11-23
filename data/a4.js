/* A4 · Busca — “Exercícios A4 - Buscas Sequencial e Binária” (17 questões). */
(function () {
  var R = String.raw;
  var A = 'Exercícios A4, questão ';
  var arr = function (v) { return v.join(', '); };
  var BIN = R`int binaria(int v[], int n, int x) {
    int ini = 0, fim = n - 1;
    while (ini <= fim) {
        int meio = (ini + fim) / 2;
        printf("[%d %d %d] ", ini, fim, meio);
        if (v[meio] == x)
            return meio;
        if (v[meio] < x)
            ini = meio + 1;
        else
            fim = meio - 1;
    }
    return -1;
}`;
  (window.EXS = window.EXS || {}).a4 = [

  { id: 'a4-q01', topic: 't-sequencial', ref: A + '1', title: 'Sequencial à mão', type: 'mc', make: function (p) {
    var i = p.v.indexOf(p.x);
    return { q: 'Vetor [' + p.v.join(' ') + ']. Na busca sequencial por ' + p.x + ', quais elementos são comparados e quantas comparações há?', opts: [[p.v.slice(0, i + 1).join(', ') + ' (' + (i + 1) + ' comparações)', 'Do primeiro até achar.'], [p.v.slice(0, i).join(', ') + ' (' + i + ' comparações)', 'A comparação com o próprio ' + p.x + ' também conta.'], [p.v.join(', ') + ' (' + p.v.length + ' comparações)', 'Ao achar, a busca para.'], [p.x + ' (1 comparação)', 'A sequencial não pula direto para o valor.']] };
  }, p: [{ v: [15, 8, 32, 4, 27, 19, 41, 10], x: 27 }, { v: [15, 8, 32, 4, 27, 19, 41, 10], x: 41 }, { v: [5, 12, 3, 9, 20], x: 3 }] },

  { id: 'a4-q02', topic: 't-binaria', ref: A + '2', title: 'Binária à mão', type: 'mc', make: function (p) {
    return { q: 'Vetor [' + p.v.join(' ') + ']. A busca binária por ' + p.x + ' imprime [início fim meio] a cada iteração. Qual a saída?', saida: true, code: '#include <stdio.h>\n' + BIN + '\nint main() {\n    int v[] = {' + arr(p.v) + '};\n    int r = binaria(v, ' + p.v.length + ', ' + p.x + ');\n    printf("-> %d\\n", r);\n    return 0;\n}', opts: p.opts };
  }, p: [
    { v: [6, 13, 21, 29, 35, 42, 51, 68, 74, 90], x: 68, opts: [['[0 9 4] [5 9 7] -> 7', '35 < 68 vai para a direita; depois o meio 7 já é o 68.'], ['[0 9 5] [6 9 7] -> 7', 'meio = (0 + 9) / 2 = 4, divisão inteira.'], ['[0 9 4] [0 3 1] -> -1', '68 > 35: a busca segue para a direita.'], ['[0 9 4] [5 9 7] [8 9 8] -> 7', 'Achou na segunda iteração.']] },
    { v: [6, 13, 21, 29, 35, 42, 51, 68, 74, 90], x: 13, opts: [['[0 9 4] [0 3 1] -> 1', '13 < 35: vai para a esquerda; o meio de 0..3 é 1.'], ['[0 9 4] [5 9 7] -> 1', '13 é menor que 35: lado esquerdo.'], ['[0 9 4] [0 4 2] [0 1 0] -> 1', 'fim vira meio − 1 = 3.'], ['[0 9 4] [0 3 1] [0 0 0] -> 1', 'Achou já na segunda iteração.']] },
    { v: [3, 7, 12, 18, 25, 31, 39], x: 31, opts: [['[0 6 3] [4 6 5] -> 5', '18 < 31; o meio de 4..6 é 5, onde está o 31.'], ['[0 6 3] [3 6 4] [5 6 5] -> 5', 'início vira meio + 1 = 4.'], ['[0 6 3] [0 2 1] -> -1', '31 > 18: a busca vai para a direita.'], ['[0 6 4] [5 6 5] -> 5', 'meio = (0 + 6) / 2 = 3.']] }] },

  { id: 'a4-q03', topic: 't-binaria', ref: A + '3', title: 'Binária sem encontrar', type: 'mc', make: function (p) {
    return { q: 'Mesmo procedimento para ' + p.x + ', que não está no vetor [' + p.v.join(' ') + ']. Qual a saída?', saida: true, code: '#include <stdio.h>\n' + BIN + '\nint main() {\n    int v[] = {' + arr(p.v) + '};\n    int r = binaria(v, ' + p.v.length + ', ' + p.x + ');\n    printf("-> %d\\n", r);\n    return 0;\n}', opts: p.opts };
  }, p: [
    { v: [6, 13, 21, 29, 35, 42, 51, 68, 74, 90], x: 40, opts: [['[0 9 4] [5 9 7] [5 6 5] -> -1', 'Depois de 42 > 40, fim = 4 < início = 5: o intervalo ficou vazio.'], ['[0 9 4] [5 9 7] [5 6 5] [5 5 5] -> -1', 'Depois do meio 5, fim vira 4.'], ['[0 9 4] -> -1', 'A busca só desiste quando início passa de fim.'], ['[0 9 4] [0 3 1] [2 3 2] -> -1', '40 > 35: lado direito.']] },
    { v: [6, 13, 21, 29, 35, 42, 51, 68, 74, 90], x: 95, opts: [['[0 9 4] [5 9 7] [8 9 8] [9 9 9] -> -1', 'Sempre para a direita até início passar de fim.'], ['[0 9 4] [5 9 7] [8 9 8] -> -1', 'Ainda sobra a posição 9.'], ['[0 9 9] -> -1', 'O meio é calculado, não pula para o fim.'], ['[0 9 4] [5 9 7] [8 9 8] [9 9 9] -> 9', '90 ≠ 95: devolve −1.']] },
    { v: [2, 4, 6, 8], x: 1, opts: [['[0 3 1] [0 0 0] -> -1', '1 < 4 e depois 1 < 2: fim fica −1.'], ['[0 3 1] -> -1', 'Ainda há a posição 0 para testar.'], ['[0 3 2] [0 1 0] -> -1', 'meio = (0 + 3) / 2 = 1.'], ['[0 3 1] [0 0 0] -> 0', 'v[0] é 2, diferente de 1.']] }] },

  { id: 'a4-q04', topic: 't-comparacao', ref: A + '4', title: 'Comparações das duas buscas', type: 'mc', make: function (p) {
    return { q: 'O vetor ordenado tem 20 elementos: os pares de 2 a 40. Procurando ' + p.x + ', quantas comparações cada busca faz? (sequencial no vetor ordenado)', saida: true, code: R`#include <stdio.h>
int main() {
    int v[20], x = ${p.x}, cs = 0, cb = 0;
    for (int i = 0; i < 20; i++)
        v[i] = 2 * (i + 1);
    for (int i = 0; i < 20; i++) {
        cs++;
        if (v[i] == x)
            break;
    }
    int ini = 0, fim = 19;
    while (ini <= fim) {
        int m = (ini + fim) / 2;
        cb++;
        if (v[m] == x)
            break;
        if (v[m] < x)
            ini = m + 1;
        else
            fim = m - 1;
    }
    printf("sequencial %d, binaria %d\n", cs, cb);
    return 0;
}`, opts: p.opts };
  }, p: [
    { x: 38, opts: [['sequencial 19, binaria 4', 'A sequencial vai até a posição 18; a binária chega em 4 passos.'], ['sequencial 19, binaria 19', 'A binária descarta metade a cada passo.'], ['sequencial 38, binaria 4', 'Conta-se elementos comparados, não o valor.'], ['sequencial 20, binaria 5', '38 está na posição 18: 19 comparações.']] },
    { x: 2, opts: [['sequencial 1, binaria 4', 'Primeiro elemento: ótimo para a sequencial.'], ['sequencial 1, binaria 1', 'A binária começa pelo meio.'], ['sequencial 2, binaria 4', 'O 2 está na posição 0.'], ['sequencial 1, binaria 5', 'Confira as metades: meios 9, 4, 1, 0.']] },
    { x: 21, opts: [['sequencial 20, binaria 4', 'Não existe: sequencial olha tudo; binária compara 20, 30, 24 e 22 e o intervalo fica vazio.'], ['sequencial 21, binaria 4', 'O vetor tem só 20 elementos.'], ['sequencial 20, binaria 20', 'A binária não olha todos.'], ['sequencial 10, binaria 4', 'A sequencial só para ao achar ou ao acabar.']] }] },

  { id: 'a4-q05', topic: 't-sequencial', ref: A + '5', title: 'Sequencial em função', type: 'drag', make: function (p) {
    return { q: 'Complete a busca sequencial que devolve a posição de <code>' + p.x + '</code> ou −1, e a mensagem na main.', code: R`int buscar(${p.t} v[], int n, ${p.t} ${p.x}) {
    for (int i = 0; i < n; i++)
        if ([[v[i] == ${p.x}]])
            return [[i]];
    return [[-1]];
}

/* na main: */
${p.t} v[10] = {0};
int pos = buscar(v, 10, ${p.val});
if ([[pos != -1]])
    printf("Posicao %d\n", pos);
else
    printf("Nao encontrado\n");`, extra: [['v[i] = ' + p.x, '`=` é atribuição.'], ['v[i]', 'Devolve-se a posição, não o valor.'], ['0', '0 é uma posição válida.'], ['pos != 0', 'A posição 0 existe; o sinal de ausência é −1.']],
      why: 'Achou: a posição i. Não achou: −1.' };
  }, p: [{ t: 'int', x: 'x', val: 7 }, { t: 'int', x: 'matricula', val: 2031 }, { t: 'char', x: 'letra', val: "'k'" }] },

  { id: 'a4-q06', topic: 't-sequencial', ref: A + '6', title: 'Posição e número de comparações', type: 'fix', make: function (p) {
    return { q: 'A função mostra a posição e devolve quantas comparações fez. Para achar ' + p.x + ' em {' + arr(p.v) + '} deveria devolver ' + p.c + '. Ache a linha errada.', code: R`int buscar(int v[], int n, int x) {
    int comp = 0;
    for (int i = 0; i < n; i++) {
        ${p.l4};
        if (v[i] == x) {
            printf("posicao %d\n", i);
            return comp;
        }
    }
    printf("nao encontrado\n");
    return comp;
}`, line: 4,
      fixes: [['comp++;', 'Uma comparação por volta, contada antes do if.'], ['comp = 0;', 'Zeraria o contador a cada volta.'], ['comp = i;', 'Ficaria uma unidade abaixo: na volta i já são i + 1 comparações.']],
      why: 'O contador soma 1 a cada comparação feita.' };
  }, p: [{ v: [4, 9, 2], x: 2, c: 3, l4: 'comp = i' }, { v: [1, 5, 7, 8], x: 5, c: 2, l4: 'comp = 0' }, { v: [6, 3], x: 6, c: 1, l4: 'comp--' }] },

  { id: 'a4-q07', topic: 't-binaria', ref: A + '7', title: 'Binária em função', type: 'drag', make: function (p) {
    return { q: 'Complete a busca binária num vetor de ' + p.n + ' inteiros em ordem crescente.', code: R`int binaria(int v[], int n, int x) {
    int inicio = 0, fim = [[n - 1]];
    while ([[inicio <= fim]]) {
        int meio = (inicio + fim) / 2;
        if (v[meio] == x)
            return meio;
        if (v[meio] < x)
            [[inicio = meio + 1]];
        else
            [[fim = meio - 1]];
    }
    return -1;
}`, extra: [['n', 'O último índice é n − 1.'], ['inicio < fim', 'Com `<`, um intervalo de um elemento nunca seria testado.'], ['inicio = meio', 'O meio já foi testado; pode travar num laço infinito.'], ['fim = meio + 1', 'Iria para a direita em vez da esquerda.']],
      why: 'Intervalo [inicio, fim]; o meio já testado sai do intervalo (± 1).' };
  }, p: [{ n: 15 }, { n: 20 }, { n: 100 }] },

  { id: 'a4-q08', topic: 't-sequencial', ref: A + '8', title: 'Várias buscas seguidas', type: 'fix', make: function (p) {
    return { q: 'O usuário faz buscas até responder ' + p.no + '. Ache a linha errada.', code: R`char resp;
int x;
do {
    scanf("%d", &x);
    int pos = buscar(v, 20, x);
    printf(pos >= 0 ? "achou\n" : "nao achou\n");
    printf("Outra busca? ");
    scanf(" %c", &resp);
} while (${p.cond});`, line: 9,
      fixes: [['} while (resp == \'' + p.yes + '\');', 'Repete enquanto a resposta for ' + p.yes + '.'], ['} while (resp = \'' + p.yes + '\');', '`=` atribui e é sempre verdadeiro: laço infinito.'], ['} while (resp == ' + p.yes + ');', 'Sem aspas, ' + p.yes + ' seria uma variável.']],
      why: 'Compara-se o caractere lido com `==` e aspas simples.', pin: 'int v[20] = {0};', pre: 'int buscar(int v[], int n, int x);' };
  }, p: [{ yes: 's', no: 'n', cond: "resp != 's'" }, { yes: 's', no: 'n', cond: "resp = 's'" }, { yes: 'S', no: 'N', cond: 'resp == S' }] },

  { id: 'a4-q09', topic: 't-sequencial', ref: A + '9', title: 'Todas as ocorrências', type: 'mc', make: function (p) {
    return { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
void todas(int v[], int n, int x) {
    for (int i = 0; i < n; i++)
        if (v[i] == x)
            printf("%d ", i);
    printf("fim\n");
}

int main() {
    int v[] = {${arr(p.v)}};
    todas(v, ${p.v.length}, ${p.x});
    return 0;
}`, opts: p.opts };
  }, p: [
    { v: [4, 7, 4, 1, 4], x: 4, opts: [['0 2 4 fim', 'Imprime cada posição onde aparece, sem parar na primeira.'], ['0 fim', 'Não há return ao achar.'], ['4 4 4 fim', 'Imprime as posições, não os valores.'], ['1 3 5 fim', 'Posições começam em 0.']] },
    { v: [9, 1, 9], x: 9, opts: [['0 2 fim', 'O 9 está nas posições 0 e 2.'], ['0 fim', 'Continua depois de achar.'], ['2 fim', 'A posição 0 também tem 9.'], ['9 9 fim', 'São posições.']] },
    { v: [3, 5, 8], x: 6, opts: [['fim', 'Não existe 6.'], ['-1 fim', 'A função não imprime −1.'], ['0 1 2 fim', 'Só imprime quando v[i] == x.'], ['nada', 'O “fim” sempre aparece.']] }] },

  { id: 'a4-q10', topic: 't-problema', ref: A + '10', title: 'Pior caso com 100.000', type: 'mc', make: function (p) {
    return { q: 'Num vetor com ' + p.n + ' elementos, qual o pior caso de comparações?', opts: [['Sequencial ' + p.s + '; binária ' + p.b + '.', 'A sequencial pode olhar todos; a binária corta pela metade: ⌈log₂(' + p.n + ' + 1)⌉.'], ['Sequencial ' + p.s + '; binária ' + p.s / 2 + '.', 'A binária não olha metade dos elementos: ela descarta metade a cada passo.'], ['As duas ' + p.b + '.', 'A sequencial não descarta nada.'], ['Sequencial ' + p.s / 2 + '; binária ' + p.b + '.', 'No pior caso a sequencial olha todos.']] };
  }, p: [{ n: '100.000', s: 100000, b: 17 }, { n: '1.000', s: 1000, b: 10 }, { n: '1.000.000', s: 1000000, b: 20 }].map(function (o) { return o; }) },

  { id: 'a4-q11', topic: 't-comparacao', ref: A + '11', title: 'Tabela de comparações', type: 'mc', make: function (p) {
    return { q: 'Vetor ordenado [3 7 12 18 25 31 39 46 54 63 71 80 88 95 102]. Quantas comparações cada busca faz para ' + p.x + '?', saida: true, code: R`#include <stdio.h>
int main() {
    int v[] = {3, 7, 12, 18, 25, 31, 39, 46, 54, 63, 71, 80, 88, 95, 102}, n = 15, x = ${p.x};
    int cs = 0, cb = 0;
    for (int i = 0; i < n; i++) {
        cs++;
        if (v[i] == x)
            break;
    }
    int ini = 0, fim = n - 1;
    while (ini <= fim) {
        int m = (ini + fim) / 2;
        cb++;
        if (v[m] == x)
            break;
        if (v[m] < x)
            ini = m + 1;
        else
            fim = m - 1;
    }
    printf("%d %d\n", cs, cb);
    return 0;
}`, opts: p.opts };
  }, p: [
    { x: 3, opts: [['1 4', 'Primeiro elemento: ótimo para a sequencial, pior caso da binária.'], ['1 1', 'A binária começa pelo meio (46).'], ['4 1', 'Inverteu as buscas.'], ['15 4', 'A sequencial acha o 3 de cara.']] },
    { x: 54, opts: [['9 4', 'Sequencial vai até a posição 8; binária compara 46, 80, 63 e 54.'], ['9 3', 'Depois do 80 ainda vem o 63 antes do 54.'], ['8 4', 'O 54 é o 9º elemento.'], ['4 9', 'Inverteu as buscas.']] },
    { x: 50, opts: [['15 4', 'Inexistente: sequencial percorre tudo; binária esgota em 4.'], ['15 15', 'A binária descarta metades.'], ['8 4', 'A sequencial não para entre 46 e 54.'], ['0 0', 'Comparações acontecem mesmo sem achar.']] }] },

  { id: 'a4-q12', topic: 't-comparacao', ref: A + '12', title: 'Muitas consultas por dia', type: 'mc', make: function (p) {
    return { q: p.q, opts: [['Ordenar o vetor uma vez e passar a usar busca binária; o custo de ordenar se paga com as muitas consultas.', 'É a troca da aula: preparar os dados para buscar rápido.'], ['Continuar com sequencial, mas começar do fim.', 'O pior caso continua sendo n.'], ['Ordenar antes de CADA consulta e usar binária.', 'Ordenar a cada busca custa mais que a própria sequencial.'], ['Usar binária sem ordenar.', 'A binária só funciona em vetor ordenado.']] };
  }, p: [{ q: '100.000 matrículas não ordenadas recebem milhares de consultas por dia com busca sequencial. O que fazer?' }, { q: 'Uma biblioteca tem 50.000 códigos de livro fora de ordem e consulta o tempo todo. O que melhora as consultas?' }, { q: 'Um app consulta CPFs numa lista de 2 milhões, desordenada, várias vezes por segundo. Qual estratégia usar?' }] },

  { id: 'a4-q13', topic: 't-sequencial', ref: A + '13', title: 'Quantas vezes aparece', type: 'drag', make: function (p) {
    return { q: 'Complete a função que devolve quantas vezes <code>' + p.x + '</code> aparece. Para {' + arr(p.v) + '} devolve ' + p.r + '.', code: R`int contar(int v[], int n, int ${p.x}) {
    int c = [[0]];
    for (int i = 0; [[i < n]]; i++)
        if (v[i] == ${p.x})
            [[c++]];
    return c;
}`, extra: [['1', 'Começaria contando uma a mais.'], ['return i', 'Pararia na primeira ocorrência.'], ['i <= n', 'v[n] está fora.']],
      why: 'Sem return no meio: percorre tudo e conta.' };
  }, p: [{ x: 'x', v: [2, 5, 2, 2], r: 3 }, { x: 'valor', v: [1, 2, 3], r: 0 }, { x: 'nota', v: [7, 7], r: 2 }] },

  { id: 'a4-q14', topic: 't-binaria', ref: A + '14', title: 'Onde inserir', type: 'mc', make: function (p) {
    return { q: 'A binária devolve a posição se achar; senão devolve <code>-(inicio + 1)</code>, que indica onde inserir. Qual a saída?', saida: true, code: R`#include <stdio.h>
int buscaOuPosicao(int v[], int n, int x) {
    int ini = 0, fim = n - 1;
    while (ini <= fim) {
        int m = (ini + fim) / 2;
        if (v[m] == x)
            return m;
        if (v[m] < x)
            ini = m + 1;
        else
            fim = m - 1;
    }
    return -(ini + 1);
}

int main() {
    int v[] = {${arr(p.v)}};
    int r = buscaOuPosicao(v, ${p.v.length}, ${p.x});
    if (r >= 0)
        printf("achou em %d\n", r);
    else
        printf("inserir em %d\n", -r - 1);
    return 0;
}`, opts: p.opts };
  }, p: [
    { v: [10, 20, 30, 40, 50], x: 35, opts: [['inserir em 3', 'Entre 30 (posição 2) e 40 (posição 3).'], ['inserir em 2', 'O 35 vem depois do 30.'], ['achou em 3', '35 não existe.'], ['inserir em 4', 'Ele vai antes do 40.']] },
    { v: [10, 20, 30, 40, 50], x: 5, opts: [['inserir em 0', 'Menor que todos: no início.'], ['inserir em 1', 'Vai antes do 10.'], ['achou em 0', '5 não existe.'], ['inserir em -1', 'Não há posição negativa.']] },
    { v: [3, 6, 9], x: 6, opts: [['achou em 1', 'O 6 existe.'], ['inserir em 1', 'Existe, então devolve a posição.'], ['achou em 2', 'O 6 está na posição 1.'], ['inserir em 2', 'Existe.']] }] },

  { id: 'a4-q15', topic: 't-binaria', ref: A + '15', title: 'Primeira ocorrência', type: 'drag', make: function (p) {
    return { q: 'Vetor ordenado com repetidos, ex.: [' + p.v.join(' ') + ']. Complete a binária que acha a <strong>primeira</strong> ocorrência (para ' + p.x + ' devolve ' + p.r + ').', code: R`int primeira(int v[], int n, int x) {
    int ini = 0, fim = n - 1, resp = -1;
    while (ini <= fim) {
        int m = (ini + fim) / 2;
        if (v[m] == x) {
            [[resp = m]];
            [[fim = m - 1]];
        } else if (v[m] < x)
            ini = m + 1;
        else
            fim = m - 1;
    }
    return [[resp]];
}`, extra: [['return m', 'Pararia em qualquer ocorrência, não necessariamente a primeira.'], ['ini = m + 1', 'Procuraria à direita: acharia a última.'], ['m', 'm muda a cada volta; a resposta guardada está em resp.']],
      why: 'Ao achar, anota e continua à esquerda.' };
  }, p: [{ v: [2, 5, 8, 8, 8, 12, 17, 20], x: 8, r: 2 }, { v: [1, 1, 1, 4], x: 1, r: 0 }, { v: [3, 6, 6, 9, 9, 9], x: 9, r: 3 }] },

  { id: 'a4-q16', topic: 't-sequencial', ref: A + '16', title: 'Valor mais próximo', type: 'mc', make: function (p) {
    return { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
#include <stdlib.h>
int maisProximo(int v[], int n, int x) {
    int pos = 0;
    for (int i = 1; i < n; i++)
        if (abs(v[i] - x) < abs(v[pos] - x))
            pos = i;
    return pos;
}

int main() {
    int v[] = {${arr(p.v)}};
    int p = maisProximo(v, ${p.v.length}, ${p.x});
    printf("posicao %d (valor %d)\n", p, v[p]);
    return 0;
}`, opts: p.opts };
  }, p: [
    { v: [10, 22, 35, 48, 60], x: 40, opts: [['posicao 2 (valor 35)', '|35 − 40| = 5 é a menor diferença.'], ['posicao 3 (valor 48)', '|48 − 40| = 8.'], ['posicao 2 (valor 40)', 'Mostra o valor do vetor.'], ['posicao 1 (valor 22)', 'Diferença 18.']] },
    { v: [5, 9, 13], x: 11, opts: [['posicao 1 (valor 9)', 'Empate entre 9 e 13 (diferença 2): fica o primeiro, porque a troca usa `<`.'], ['posicao 2 (valor 13)', 'Com `<` o empate não troca.'], ['posicao 0 (valor 5)', 'Diferença 6.'], ['posicao 1 (valor 11)', 'Mostra v[p], que é 9.']] },
    { v: [100, 3, 50], x: 0, opts: [['posicao 1 (valor 3)', 'Mais próximo de 0.'], ['posicao 0 (valor 100)', 'Diferença 100.'], ['posicao 2 (valor 50)', 'Diferença 50.'], ['posicao 0 (valor 3)', '3 está na posição 1.']] }] },

  { id: 'a4-q17', topic: 't-binaria', ref: A + '17', title: 'Binária em ordem decrescente', type: 'fix', make: function (p) {
    return { q: 'O vetor está em ordem <strong>decrescente</strong>, ex.: [' + p.ex + ']. Ache a linha errada.', code: R`int binariaDesc(int v[], int n, int x) {
    int ini = 0, fim = n - 1;
    while (ini <= fim) {
        int m = (ini + fim) / 2;
        if (v[m] == x) return m;
        if (${p.c}) ini = m + 1;
        else fim = m - 1;
    }
    return ${p.r};
}`, line: p.line,
      fixes: p.line === 6 ? [['if (v[m] > x) ini = m + 1;', 'Decrescente: se o meio é maior, x está à direita.'], ['if (v[m] < x) ini = m + 1;', 'Essa é a regra da ordem crescente.'], ['if (v[m] > x) fim = m - 1;', 'Iria para o lado errado.']] : [['return -1;', 'Não encontrado: −1.'], ['return 0;', '0 é posição válida.'], ['return m;', 'm nem existe fora do laço.']],
      why: p.line === 6 ? 'Na ordem decrescente as decisões se invertem.' : 'Sem encontrar, devolve −1.' };
  }, p: [{ ex: '90 74 68 51 42', c: 'v[m] < x', r: '-1', line: 6 }, { ex: '50 40 30 20 10', c: 'v[m] > x', r: '0', line: 9 }, { ex: '9 7 5 3 1', c: 'v[m] < x', r: '-1', line: 6 }] }
  ];
})();

/* Variantes V2 e V3 escritas à mão (2026-11-18): outra tarefa, outra lógica, outro erro. V1 vem dos moldes acima.
   Gerado por _tools/gerar_alt.mjs a partir de _tools/alt/a4.alt.js; null = a versão do molde continua valendo. */
(function () {
  window.ALT = window.ALT || {};
  window.ALT['a4-q01'] = [
    {
      q: "Vetor <strong>ordenado</strong> [3 8 12 20 25 31]. A busca sequencial para assim que encontra um valor maior ou igual ao procurado. Procurando 15, quais elementos são comparados e qual o resultado?",
      opts: [
        ["3, 8, 12, 20 (4 comparações); como 20 > 15, conclui que 15 não está no vetor.", "No vetor ordenado, ao passar do valor procurado não adianta continuar."],
        ["3, 8, 12 (3 comparações); o 12 já indica que não existe.", "Só dá para concluir quando aparece um valor maior que 15."],
        ["3, 8, 12, 20, 25, 31 (6 comparações), sem encontrar.", "A parada antecipada evita comparar o resto."],
        ["20 (1 comparação).", "A busca sequencial começa no primeiro elemento."]
      ]
    },
    {
      q: "Vetor [7 14 21 28 35]. Uma busca sequencial começa pelo <strong>último</strong> elemento e anda para trás. Procurando 14, quais elementos são comparados e quantas comparações há?",
      opts: [
        ["35, 28, 21, 14 (4 comparações)", "Do fim para o começo, o 14 é o quarto comparado."],
        ["7, 14 (2 comparações)", "Isso seria começando pelo início."],
        ["35, 28, 21 (3 comparações)", "O 14 também precisa ser comparado para confirmar que é o valor."],
        ["35, 28, 21, 14, 7 (5 comparações)", "A busca para ao encontrar o 14."]
      ]
    }
  ];
  window.ALT['a4-q02'] = [
    {
      q: "Vetor [5 10 15 20 25 30 35 40]. Esta variação da busca binária procura a <strong>primeira posição com valor ≥ x</strong> e imprime cada <code>meio</code>. Para x = 30, qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint limite(int v[], int n, int x) {\n    int ini = 0, fim = n;\n    while (ini < fim) {\n        int meio = (ini + fim) / 2;\n        printf(\"%d \", meio);\n        if (v[meio] < x)\n            ini = meio + 1;\n        else\n            fim = meio;\n    }\n    return ini;\n}\n\nint main() {\n    int v[] = {5, 10, 15, 20, 25, 30, 35, 40};\n    int r = limite(v, 8, 30);\n    printf(\"-> %d\\n\", r);\n    return 0;\n}",
      opts: [
        ["4 6 5 -> 5", "meio 4 (25 < 30): sobe ini; meio 6 (35 ≥ 30): fim = 6; meio 5 (30 ≥ 30): fim = 5; ini = fim = 5."],
        ["4 6 5 -> 6", "O resultado é ini, que termina em 5."],
        ["4 5 -> 5", "O primeiro meio leva a ini = 5 e o segundo é 6, não 5."],
        ["4 6 -> 5", "Ainda falta uma iteração com ini = 5 e fim = 6."]
      ]
    },
    {
      q: "Vetor em ordem <strong>decrescente</strong> [90 70 50 30 10]. A busca binária abaixo foi adaptada a essa ordem. Para x = 30, qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint binariaDesc(int v[], int n, int x) {\n    int ini = 0, fim = n - 1;\n    while (ini <= fim) {\n        int meio = (ini + fim) / 2;\n        printf(\"[%d %d %d] \", ini, fim, meio);\n        if (v[meio] == x)\n            return meio;\n        if (v[meio] > x)\n            ini = meio + 1;\n        else\n            fim = meio - 1;\n    }\n    return -1;\n}\n\nint main() {\n    int v[] = {90, 70, 50, 30, 10};\n    int r = binariaDesc(v, 5, 30);\n    printf(\"-> %d\\n\", r);\n    return 0;\n}",
      opts: [
        ["[0 4 2] [3 4 3] -> 3", "O 50 do meio é maior que 30: a busca continua à direita, onde estão os menores."],
        ["[0 4 2] [0 1 0] -> -1", "Como a ordem é decrescente, os menores estão à direita."],
        ["[0 4 2] [3 4 3] -> 2", "O 30 está na posição 3."],
        ["[0 4 2] [3 4 3] [4 4 4] -> 3", "O 30 é encontrado na segunda iteração; não há terceira."]
      ]
    }
  ];
  window.ALT['a4-q03'] = [
    {
      q: "No pior caso, quantas iterações faz a busca binária num vetor ordenado com 1 000 elementos?",
      opts: [
        ["10: cada iteração divide o trecho ao meio, e 2¹⁰ = 1024 ≥ 1000.", "O número de divisões ao meio até sobrar um elemento é cerca de log₂ de n."],
        ["500: metade do vetor.", "A busca binária descarta metade a cada iteração, não a cada elemento."],
        ["1 000: todos os elementos.", "Isso é o pior caso da busca sequencial."],
        ["100: um décimo do vetor.", "Não existe essa proporção; o custo cresce com o logaritmo."]
      ]
    },
    {
      q: "Vetor [10 20 30 40 50 60]. A busca binária por 35 (que não está no vetor) imprime <code>[início fim meio]</code>. Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint binaria(int v[], int n, int x) {\n    int ini = 0, fim = n - 1;\n    while (ini <= fim) {\n        int meio = (ini + fim) / 2;\n        printf(\"[%d %d %d] \", ini, fim, meio);\n        if (v[meio] == x)\n            return meio;\n        if (v[meio] < x)\n            ini = meio + 1;\n        else\n            fim = meio - 1;\n    }\n    return -1;\n}\n\nint main() {\n    int v[] = {10, 20, 30, 40, 50, 60};\n    int r = binaria(v, 6, 35);\n    printf(\"-> %d\\n\", r);\n    return 0;\n}",
      opts: [
        ["[0 5 2] [3 5 4] [3 3 3] -> -1", "30 < 35: ini = 3; 50 > 35: fim = 3; 40 > 35: fim = 2 e o laço termina."],
        ["[0 5 2] [3 5 4] -> -1", "Ainda sobra a iteração com ini = fim = 3."],
        ["[0 5 3] [0 2 1] -> -1", "O primeiro meio de 0 e 5 é 2, não 3."],
        ["[0 5 2] [3 5 4] [3 3 3] -> 3", "O 40 não é o 35; a busca falha e devolve -1."]
      ]
    }
  ];
  window.ALT['a4-q04'] = [
    {
      q: "O vetor ordenado tem 31 elementos: múltiplos de 3 de 3 a 93. Procurando 48, quantas comparações cada busca faz?",
      saida: true,
      code: "#include <stdio.h>\nint main() {\n    int v[31], x = 48, cs = 0, cb = 0;\n    for (int i = 0; i < 31; i++)\n        v[i] = 3 * (i + 1);\n    for (int i = 0; i < 31; i++) {\n        cs++;\n        if (v[i] == x)\n            break;\n    }\n    int ini = 0, fim = 30;\n    while (ini <= fim) {\n        int m = (ini + fim) / 2;\n        cb++;\n        if (v[m] == x)\n            break;\n        if (v[m] < x)\n            ini = m + 1;\n        else\n            fim = m - 1;\n    }\n    printf(\"sequencial %d, binaria %d\\n\", cs, cb);\n    return 0;\n}",
      opts: [
        ["sequencial 16, binaria 1", "48 está na posição 15, exatamente o meio de 0 a 30: a binária o acha na primeira comparação."],
        ["sequencial 16, binaria 4", "O primeiro meio já é a posição 15."],
        ["sequencial 15, binaria 1", "A posição 15 exige 16 comparações, contando a partir da posição 0."],
        ["sequencial 1, binaria 16", "Trocou os métodos."]
      ]
    },
    {
      q: "Os elementos são múltiplos de 5 de 5 a 80 (16 valores). Procurando 42, que não existe, quantas comparações faz cada busca? A sequencial para ao achar um valor maior ou igual ao procurado.",
      saida: true,
      code: "#include <stdio.h>\nint main() {\n    int v[16], x = 42, cs = 0, cb = 0;\n    for (int i = 0; i < 16; i++)\n        v[i] = 5 * (i + 1);\n    for (int i = 0; i < 16; i++) {\n        cs++;\n        if (v[i] >= x)\n            break;\n    }\n    int ini = 0, fim = 15;\n    while (ini <= fim) {\n        int m = (ini + fim) / 2;\n        cb++;\n        if (v[m] == x)\n            break;\n        if (v[m] < x)\n            ini = m + 1;\n        else\n            fim = m - 1;\n    }\n    printf(\"sequencial %d, binaria %d\\n\", cs, cb);\n    return 0;\n}",
      opts: [
        ["sequencial 9, binaria 4", "A sequencial para no 45 (9ª posição); a binária compara os meios 7, 11, 9 e 8."],
        ["sequencial 16, binaria 4", "Com a parada antecipada a sequencial não percorre tudo."],
        ["sequencial 9, binaria 5", "A binária termina com ini > fim depois de 4 comparações."],
        ["sequencial 8, binaria 4", "O 45 só aparece na 9ª comparação."]
      ]
    }
  ];
  window.ALT['a4-q05'] = [
    {
      q: "Complete a busca sequencial que devolve a posição da <strong>última</strong> ocorrência de <code>x</code> (ou −1) e o teste na main.",
      code: "int ultima(int v[], int n, int x) {\n    for (int i = [[n - 1]]; [[i >= 0]]; i--)\n        if (v[i] == x)\n            return [[i]];\n    return -1;\n}\n\n/* na main: */\nint v[8] = {0};\nint p = ultima(v, 8, 5);\nif ([[p == -1]])\n    printf(\"Sem 5\\n\");\nelse\n    printf(\"Ultimo 5 na posicao %d\\n\", p);",
      extra: [
        ["n", "v[n] está fora do vetor."],
        ["i > 0", "Deixaria a posição 0 de fora."],
        ["v[i]", "A função devolve a posição, não o valor."],
        ["p == 0", "0 é uma posição válida; a falha é −1."]
      ],
      why: "O laço anda do fim para o começo; a primeira coincidência encontrada é a última ocorrência."
    },
    {
      q: "Complete a busca de um nome numa lista de nomes (vetor de strings), que devolve a posição ou −1.",
      code: "int buscarNome(char nomes[][20], int n, char *alvo) {\n    for (int i = 0; i < n; i++)\n        if ([[strcmp(nomes[i], alvo) == 0]])\n            return [[i]];\n    return -1;\n}\n\n/* na main: */\nchar nomes[4][20] = {\"Ana\", \"Bia\", \"Caio\", \"Davi\"};\nint pos = buscarNome(nomes, 4, [[\"Bia\"]]);\nif (pos != -1)\n    printf(\"Posicao %d\\n\", pos);",
      extra: [
        ["nomes[i] == alvo", "Compara endereços, não o texto."],
        ["strcmp(nomes[i], alvo)", "Devolve 0 quando são iguais, o que a condição trataria como falso."],
        ["'Bia'", "Aspas simples são para um caractere só."],
        ["Bia", "Sem aspas seria um nome de variável."]
      ],
      why: "Textos se comparam com `strcmp`, que devolve 0 quando são iguais."
    }
  ];
  window.ALT['a4-q06'] = [
    {
      q: "A função devolve a posição de <code>x</code> ou −1. Para achar 2 em {4, 9, 2} deveria devolver 2, mas ela devolve a posição 0 para qualquer valor. Ache a linha errada.",
      code: "int buscar(int v[], int n, int x) {\n    for (int i = 0; i < n; i++)\n        if (v[i] = x)\n            return i;\n    return -1;\n}",
      line: 3,
      fixes: [
        ["if (v[i] == x)", "`==` compara, que é o que a busca precisa."],
        ["if (v[i] != x)", "Devolveria a posição do primeiro valor diferente."],
        ["if (v[i] = x == 0)", "Mantém uma atribuição escondida na condição."]
      ],
      why: "Um único `=` atribui `x` a `v[i]` e a condição vale o valor atribuído (verdadeiro quando x não é zero)."
    },
    {
      q: "A função conta quantos elementos são iguais a <code>x</code>. Ela às vezes dá um valor a mais por ler fora do vetor. Ache a linha errada.",
      code: "int contar(int v[], int n, int x) {\n    int c = 0;\n    for (int i = 0; i <= n; i++)\n        if (v[i] == x)\n            c++;\n    return c;\n}",
      line: 3,
      fixes: [
        ["for (int i = 0; i < n; i++)", "As posições válidas vão de 0 a n-1."],
        ["for (int i = 1; i <= n; i++)", "Ainda lê v[n] e pula o primeiro."],
        ["for (int i = 0; i < n - 1; i++)", "Deixaria o último elemento sem verificar."]
      ],
      why: "Com `i <= n` o laço lê `v[n]`, que está fora do vetor e pode ser igual a x por acaso."
    }
  ];
  window.ALT['a4-q07'] = [
    {
      q: "Complete a busca binária <strong>recursiva</strong> num vetor de 15 inteiros em ordem crescente.",
      code: "int binRec(int v[], int ini, int fim, int x) {\n    if ([[ini > fim]])\n        return -1;\n    int meio = (ini + fim) / 2;\n    if (v[meio] == x)\n        return meio;\n    if (v[meio] < x)\n        return binRec(v, [[meio + 1]], fim, x);\n    return binRec(v, ini, [[meio - 1]], x);\n}\n\n/* na main: */\nint v[15] = {0};\nint r = binRec(v, 0, [[14]], 7);",
      extra: [
        ["ini >= fim", "Deixaria de olhar o último elemento restante."],
        ["meio", "O próprio meio já foi descartado; repetir causaria laço infinito."],
        ["meio * 2", "Passaria do trecho que ainda resta."],
        ["15", "O último índice válido é 14."]
      ],
      why: "Quando o trecho some (`ini > fim`) o valor não existe; senão a busca continua só na metade que pode conter x."
    },
    {
      q: "Complete a busca binária num vetor de nomes em ordem alfabética.",
      code: "int buscaNome(char v[][20], int n, char *x) {\n    int ini = 0, fim = n - 1;\n    while (ini <= fim) {\n        int meio = (ini + fim) / 2;\n        int c = [[strcmp(v[meio], x)]];\n        if ([[c == 0]])\n            return meio;\n        if (c < 0)\n            [[ini = meio + 1]];\n        else\n            [[fim = meio - 1]];\n    }\n    return -1;\n}",
      extra: [
        ["v[meio] - x", "Textos não se subtraem."],
        ["c = 0", "Atribuiria zero em vez de comparar."],
        ["ini = meio", "Pode repetir o mesmo meio para sempre."],
        ["fim = meio", "Pode repetir o mesmo meio para sempre."]
      ],
      why: "`strcmp` devolve negativo, zero ou positivo; negativo significa que o nome do meio vem antes de x."
    }
  ];
  window.ALT['a4-q08'] = [
    {
      q: "O usuário faz buscas até responder n. A segunda resposta lida é sempre um caractere \"estranho\" (a quebra de linha). Ache a linha errada.",
      code: "char resp;\nint x;\ndo {\n    scanf(\"%d\", &x);\n    int pos = buscar(v, 20, x);\n    printf(pos >= 0 ? \"achou\\n\" : \"nao achou\\n\");\n    printf(\"Outra busca? \");\n    scanf(\"%c\", &resp);\n} while (resp == 's');",
      line: 8,
      fixes: [
        ["scanf(\" %c\", &resp);", "O espaço antes do `%c` descarta a quebra de linha que sobrou da leitura anterior."],
        ["scanf(\"%c\", resp);", "Faltou o `&`."],
        ["scanf(\"%s\", &resp);", "Leria uma string num único char."]
      ],
      why: "Sem o espaço no formato, o `%c` lê o `\\n` que ficou no buffer depois do número.",
      pin: "int v[20] = {0};",
      pre: "int buscar(int v[], int n, int x);"
    },
    {
      q: "O usuário faz buscas até responder n. O programa trava logo na primeira leitura do valor. Ache a linha errada.",
      code: "char resp;\nint x;\ndo {\n    scanf(\"%d\", x);\n    int pos = buscar(v, 20, x);\n    printf(pos >= 0 ? \"achou\\n\" : \"nao achou\\n\");\n    printf(\"Outra busca? \");\n    scanf(\" %c\", &resp);\n} while (resp == 's');",
      line: 4,
      fixes: [
        ["scanf(\"%d\", &x);", "O scanf precisa do endereço da variável."],
        ["scanf(\"%d\", *x);", "`*x` não é válido para um int."],
        ["scanf(\"%x\", &x);", "`%x` lê em hexadecimal, não um inteiro decimal."]
      ],
      why: "Sem o `&` o scanf recebe o valor de x (lixo) como se fosse um endereço.",
      pin: "int v[20] = {0};",
      pre: "int buscar(int v[], int n, int x);"
    }
  ];
  window.ALT['a4-q09'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid info(int v[], int n, int x) {\n    int c = 0, primeira = -1;\n    for (int i = 0; i < n; i++)\n        if (v[i] == x) {\n            c++;\n            if (primeira == -1)\n                primeira = i;\n        }\n    printf(\"%d vezes, primeira em %d\\n\", c, primeira);\n}\n\nint main() {\n    int v[] = {5, 6, 2, 6, 6};\n    info(v, 5, 6);\n    return 0;\n}",
      opts: [
        ["3 vezes, primeira em 1", "O 6 aparece nas posições 1, 3 e 4; a primeira é a 1."],
        ["3 vezes, primeira em 4", "`primeira` só muda uma vez: na primeira coincidência."],
        ["2 vezes, primeira em 1", "O 6 aparece três vezes."],
        ["3 vezes, primeira em 2", "As posições começam em 0, e a 2 guarda o valor 2."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid buscar(int v[], int n, int x) {\n    int comp = 0;\n    for (int i = 0; i < n; i++) {\n        comp++;\n        if (v[i] == x) {\n            printf(\"achou em %d apos %d comparacoes\\n\", i, comp);\n            return;\n        }\n    }\n    printf(\"nao achou\\n\");\n}\n\nint main() {\n    int v[] = {4, 8, 15, 16, 23, 42};\n    buscar(v, 6, 16);\n    return 0;\n}",
      opts: [
        ["achou em 3 apos 4 comparacoes", "O 16 está na posição 3; a contagem tem uma comparação a mais que a posição."],
        ["achou em 3 apos 3 comparacoes", "A posição 3 exige comparar as posições 0, 1, 2 e 3."],
        ["achou em 4 apos 4 comparacoes", "O 16 está na posição 3, não na 4."],
        ["achou em 3 apos 6 comparacoes", "O `return` interrompe a busca ao achar."]
      ]
    }
  ];
  window.ALT['a4-q10'] = [
    {
      q: "Quantas vezes, no máximo, se pode dividir ao meio um trecho de 1 000 elementos até sobrar um único? Esse número é o pior caso (aproximado) de iterações da busca binária.",
      opts: [
        ["Cerca de 10 vezes.", "1000 → 500 → 250 → 125 → ... → 1 em cerca de 10 divisões (2¹⁰ = 1024)."],
        ["500 vezes.", "Cada divisão corta pela metade o que restou, não 1 elemento."],
        ["1 000 vezes.", "Esse é o pior caso da busca sequencial."],
        ["Cerca de 100 vezes.", "Cada divisão corta pela metade; o total cresce com o logaritmo."]
      ]
    },
    {
      q: "Se o vetor ordenado <strong>dobra</strong> de tamanho, o que acontece com o pior caso de cada busca?",
      opts: [
        ["A sequencial passa a fazer o dobro de comparações; a binária faz só 1 comparação a mais.", "O custo da sequencial é proporcional a n; o da binária, ao logaritmo de n."],
        ["As duas fazem o dobro de comparações.", "A binária cresce muito mais devagar."],
        ["As duas continuam iguais.", "O pior caso aumenta nas duas, mas em ritmos diferentes."],
        ["A binária passa a fazer o dobro e a sequencial 1 a mais.", "É o contrário: a sequencial é a que cresce proporcionalmente."]
      ]
    }
  ];
  window.ALT['a4-q11'] = [
    {
      q: "Os dois métodos procuram o 2 no vetor {9, 2, 7, 4, 1, 8}, que <strong>não está ordenado</strong>. Qual a saída (posição devolvida por cada um)?",
      saida: true,
      code: "#include <stdio.h>\nint main() {\n    int v[] = {9, 2, 7, 4, 1, 8}, n = 6, x = 2;\n    int ps = -1, pb = -1;\n    for (int i = 0; i < n; i++)\n        if (v[i] == x) {\n            ps = i;\n            break;\n        }\n    int ini = 0, fim = n - 1;\n    while (ini <= fim) {\n        int m = (ini + fim) / 2;\n        if (v[m] == x) {\n            pb = m;\n            break;\n        }\n        if (v[m] < x)\n            ini = m + 1;\n        else\n            fim = m - 1;\n    }\n    printf(\"%d %d\\n\", ps, pb);\n    return 0;\n}",
      opts: [
        ["1 -1", "A sequencial acha o 2 na posição 1; a binária olha o 7, vai para a esquerda e descarta o 2 sem vê-lo."],
        ["1 1", "A binária depende de o vetor estar ordenado."],
        ["-1 -1", "A sequencial percorre todo o vetor e encontra o 2."],
        ["1 0", "O 9 da posição 0 não é o valor procurado."]
      ]
    },
    {
      q: "Qual a saída? (relaciona o número de divisões ao meio com o custo da busca binária)",
      saida: true,
      code: "#include <stdio.h>\nint main() {\n    int n = 1000, k = 0;\n    while (n > 1) {\n        n = n / 2;\n        k++;\n    }\n    printf(\"%d\\n\", k);\n    return 0;\n}",
      opts: [
        ["9", "1000 → 500 → 250 → 125 → 62 → 31 → 15 → 7 → 3 → 1: nove divisões (a divisão é inteira)."],
        ["10", "Com divisão inteira 1000 chega a 1 em 9 passos."],
        ["500", "Esse é o primeiro valor de n, não o número de passos."],
        ["999", "Seria o número de passos subtraindo 1 a cada vez."]
      ]
    }
  ];
  window.ALT['a4-q12'] = [
    {
      q: "Uma lista de 200 códigos, fora de ordem, será consultada <strong>uma única vez</strong> pelo programa. O que faz mais sentido?",
      opts: [
        ["Usar a busca sequencial: no máximo 200 comparações, sem custo de ordenar.", "Ordenar custa mais do que a única consulta que se quer fazer."],
        ["Ordenar o vetor e depois usar a busca binária.", "O custo de ordenar supera o ganho de uma única consulta."],
        ["Usar a busca binária direto, sem ordenar.", "A binária só funciona com o vetor ordenado."],
        ["Ordenar a cada comparação.", "Isso torna tudo mais caro."]
      ]
    },
    {
      q: "Os protocolos de atendimento chegam sempre em ordem crescente e vão sendo guardados no vetor nessa ordem. Muitas consultas por número de protocolo serão feitas. Qual busca usar?",
      opts: [
        ["A binária: o vetor já está ordenado desde a inserção, sem custo extra de ordenação.", "A ordem de chegada já garante o requisito da binária."],
        ["A sequencial, porque o vetor está sempre mudando.", "Novos itens entram no fim, mantendo a ordem."],
        ["Ordenar o vetor antes de cada consulta.", "Não é preciso: ele já é mantido em ordem."],
        ["Nenhuma das duas: precisa de outra estrutura.", "A binária resolve bem esse caso."]
      ]
    }
  ];
  window.ALT['a4-q13'] = [
    {
      q: "Complete a função que devolve 1 se existe algum valor repetido no vetor e 0 se todos são diferentes.",
      code: "int temRepetido(int v[], int n) {\n    for (int i = 0; i < n; i++)\n        for (int j = [[i + 1]]; j < n; j++)\n            if ([[v[i] == v[j]]])\n                return [[1]];\n    return [[0]];\n}",
      extra: [
        ["2", "Devolver 2 não faz parte do combinado (1 ou 0)."],
        ["v[i] != v[j]", "Acusaria repetição ao achar valores diferentes."],
        ["-1", "A função devolve 1 ou 0."],
        ["i", "Compararia cada elemento com ele mesmo."]
      ],
      why: "Cada elemento é comparado só com os que vêm depois; o primeiro par igual encerra a função com 1."
    },
    {
      q: "Complete a função que devolve quantas vezes o <strong>menor</strong> valor do vetor aparece. Para {4, 2, 7, 2, 9} devolve 2.",
      code: "int contarMenor(int v[], int n) {\n    int menor = v[0], c = [[1]];\n    for (int i = 1; i < n; i++) {\n        if ([[v[i] < menor]]) {\n            menor = v[i];\n            c = [[1]];\n        } else if (v[i] == menor)\n            [[c++]];\n    }\n    return c;\n}",
      extra: [
        ["0", "O primeiro elemento já conta uma vez."],
        ["v[i] <= menor", "Entraria no ramo do novo menor também com valores iguais, zerando a contagem."],
        ["c = 0", "Um novo menor já aparece uma vez."],
        ["c--", "A contagem só cresce."]
      ],
      why: "Ao achar um menor novo a contagem recomeça em 1; um valor igual ao menor atual soma 1."
    }
  ];
  window.ALT['a4-q14'] = [
    {
      q: "A função devolve a posição se achar e <code>-(inicio + 1)</code> se não achar. O vetor tem valores repetidos. Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint buscaOuPosicao(int v[], int n, int x) {\n    int ini = 0, fim = n - 1;\n    while (ini <= fim) {\n        int m = (ini + fim) / 2;\n        if (v[m] == x)\n            return m;\n        if (v[m] < x)\n            ini = m + 1;\n        else\n            fim = m - 1;\n    }\n    return -(ini + 1);\n}\n\nint main() {\n    int v[] = {10, 20, 20, 20, 30};\n    int r = buscaOuPosicao(v, 5, 20);\n    if (r >= 0)\n        printf(\"achou em %d\\n\", r);\n    else\n        printf(\"inserir em %d\\n\", -r - 1);\n    return 0;\n}",
      opts: [
        ["achou em 2", "O primeiro meio é (0 + 4) / 2 = 2, que já guarda um 20: a busca devolve essa posição."],
        ["achou em 1", "A binária não procura a primeira ocorrência: para na primeira que o meio encontra."],
        ["achou em 3", "O meio inicial é 2, não 3."],
        ["inserir em 1", "O valor existe no vetor."]
      ]
    },
    {
      q: "Qual o valor impresso?",
      saida: true,
      code: "#include <stdio.h>\nint buscaOuPosicao(int v[], int n, int x) {\n    int ini = 0, fim = n - 1;\n    while (ini <= fim) {\n        int m = (ini + fim) / 2;\n        if (v[m] == x)\n            return m;\n        if (v[m] < x)\n            ini = m + 1;\n        else\n            fim = m - 1;\n    }\n    return -(ini + 1);\n}\n\nint main() {\n    int v[] = {10, 20, 30};\n    printf(\"%d\\n\", buscaOuPosicao(v, 3, 25));\n    return 0;\n}",
      opts: [
        ["-3", "O 25 não existe; ini termina em 2 (posição para inserir) e a função devolve -(2 + 1)."],
        ["3", "O valor devolvido é negativo quando não encontra."],
        ["-2", "ini termina em 2, não em 1; o resultado é -(ini + 1)."],
        ["2", "A posição de inserção vem codificada em -(ini + 1), não direto."]
      ]
    }
  ];
  window.ALT['a4-q15'] = [
    {
      q: "Vetor ordenado com repetidos, ex.: [2 5 8 8 8 12 17 20]. Complete a binária que acha a <strong>última</strong> ocorrência (para 8 devolve 4).",
      code: "int ultima(int v[], int n, int x) {\n    int ini = 0, fim = n - 1, resp = -1;\n    while (ini <= fim) {\n        int m = (ini + fim) / 2;\n        if (v[m] == x) {\n            [[resp = m]];\n            [[ini = m + 1]];\n        } else if (v[m] < x)\n            ini = m + 1;\n        else\n            fim = m - 1;\n    }\n    return [[resp]];\n}",
      extra: [
        ["return m", "m só existe dentro do laço."],
        ["fim = m - 1", "Procuraria a primeira ocorrência, não a última."],
        ["resp = -1", "Apagaria a posição já encontrada."],
        ["ini = m", "Pode repetir o mesmo meio para sempre."]
      ],
      why: "Ao achar x, guarda-se a posição e continua-se à direita, em busca de uma ocorrência mais à frente."
    },
    {
      q: "Com <code>primeira</code> e <code>ultima</code> prontas (binárias para vetor ordenado), complete a função que conta quantas vezes <code>x</code> aparece.",
      code: "int quantas(int v[], int n, int x) {\n    int p = primeira(v, n, x);\n    if ([[p == -1]])\n        return [[0]];\n    int u = ultima(v, n, x);\n    return [[u - p + 1]];\n}",
      extra: [
        ["p == 0", "0 é uma posição válida; a falha é -1."],
        ["-1", "A contagem de um valor ausente é 0."],
        ["u - p", "Esqueceria de contar o próprio elemento da primeira posição."],
        ["u + p", "Somar as posições não conta as ocorrências."]
      ],
      why: "As ocorrências ocupam posições seguidas, de `p` a `u`: são `u - p + 1`.",
      pre: "int primeira(int v[], int n, int x);\nint ultima(int v[], int n, int x);"
    }
  ];
  window.ALT['a4-q16'] = [
    {
      q: "Qual a saída? (<code>piso</code> devolve a posição do maior valor que é menor ou igual a x, ou -1)",
      saida: true,
      code: "#include <stdio.h>\nint piso(int v[], int n, int x) {\n    int pos = -1;\n    for (int i = 0; i < n; i++)\n        if (v[i] <= x)\n            pos = i;\n    return pos;\n}\n\nint main() {\n    int v[] = {10, 22, 35, 48, 60};\n    printf(\"%d %d\\n\", piso(v, 5, 40), piso(v, 5, 5));\n    return 0;\n}",
      opts: [
        ["2 -1", "Para 40, o último valor ≤ 40 é o 35 (posição 2); para 5, nenhum valor é ≤ 5."],
        ["3 -1", "O 48 é maior que 40."],
        ["2 0", "Quando nenhum valor serve, a função devolve -1."],
        ["3 0", "Nem o piso de 40 é 48, nem o de 5 é a posição 0."]
      ]
    },
    {
      q: "Qual a saída? (<code>teto</code> devolve a posição do primeiro valor maior ou igual a x, ou -1)",
      saida: true,
      code: "#include <stdio.h>\nint teto(int v[], int n, int x) {\n    for (int i = 0; i < n; i++)\n        if (v[i] >= x)\n            return i;\n    return -1;\n}\n\nint main() {\n    int v[] = {10, 22, 35, 48, 60};\n    printf(\"%d %d\\n\", teto(v, 5, 40), teto(v, 5, 70));\n    return 0;\n}",
      opts: [
        ["3 -1", "O primeiro valor ≥ 40 é o 48 (posição 3); nenhum valor chega a 70."],
        ["2 -1", "O 35 é menor que 40."],
        ["3 5", "Quando não acha, devolve -1, não n."],
        ["2 4", "Nem o teto de 40 é o 35, nem o de 70 é o 60."]
      ]
    }
  ];
  window.ALT['a4-q17'] = [
    {
      q: "A busca binária em vetor crescente lê fora do vetor logo na primeira iteração. Ache a linha errada.",
      code: "int binaria(int v[], int n, int x) {\n    int ini = 0, fim = n;\n    while (ini <= fim) {\n        int m = (ini + fim) / 2;\n        if (v[m] == x) return m;\n        if (v[m] < x) ini = m + 1;\n        else fim = m - 1;\n    }\n    return -1;\n}",
      line: 2,
      fixes: [
        ["int ini = 0, fim = n - 1;", "O último índice válido é n - 1."],
        ["int ini = 1, fim = n;", "Ignoraria a posição 0 e ainda passaria do fim."],
        ["int ini = 0, fim = n / 2;", "Só olharia a primeira metade."]
      ],
      why: "Com `fim = n`, o meio pode cair em `v[n]`, fora do vetor."
    },
    {
      q: "A busca binária em vetor crescente não acha o 9 em {4, 9}, embora ele exista. Ache a linha errada.",
      code: "int binaria(int v[], int n, int x) {\n    int ini = 0, fim = n - 1;\n    while (ini < fim) {\n        int m = (ini + fim) / 2;\n        if (v[m] == x) return m;\n        if (v[m] < x) ini = m + 1;\n        else fim = m - 1;\n    }\n    return -1;\n}",
      line: 3,
      fixes: [
        ["while (ini <= fim) {", "Com `<=` o trecho de um único elemento ainda é examinado."],
        ["while (ini != fim) {", "Também deixaria de examinar o trecho de um elemento e pode não terminar."],
        ["while (ini < n) {", "Não depende de fim, o que pode gerar laço infinito."]
      ],
      why: "Com `ini < fim` o laço para quando sobra um único elemento, sem comparar com ele; é preciso `ini <= fim`."
    }
  ];
})();
