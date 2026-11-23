/* A3 · Ordenação — “Exercícios A3 - Ordenação” (14 questões). */
(function () {
  var R = String.raw;
  var A = 'Exercícios A3, questão ';
  var arr = function (v) { return v.join(', '); };
  var BUB = R`void passadas(int v[], int n, int k) {
    for (int i = 0; i < k; i++)
        for (int j = 0; j < n - 1 - i; j++)
            if (v[j] > v[j + 1]) {
                int a = v[j];
                v[j] = v[j + 1];
                v[j + 1] = a;
            }
}`;
  var SEL = R`void iteracoes(int v[], int n, int k) {
    for (int i = 0; i < k; i++) {
        int m = i;
        for (int j = i + 1; j < n; j++)
            if (v[j] < v[m])
                m = j;
        if (m != i) {
            int a = v[i];
            v[i] = v[m];
            v[m] = a;
        }
    }
}`;
  var INS = R`void insercoes(int v[], int n, int k) {
    for (int i = 1; i <= k; i++) {
        int chave = v[i], j = i - 1;
        while (j >= 0 && v[j] > chave) {
            v[j + 1] = v[j];
            j--;
        }
        v[j + 1] = chave;
    }
}`;
  function estado(fn, call) {
    return function (p) {
      return { q: p.q, saida: true, code: '#include <stdio.h>\n' + fn + '\nint main() {\n    int v[] = {' + arr(p.v) + '};\n    ' + call + '(v, ' + p.v.length + ', ' + p.k + ');\n    for (int i = 0; i < ' + p.v.length + '; i++) printf("%d ", v[i]);\n    return 0;\n}', opts: p.opts };
    };
  }
  (window.EXS = window.EXS || {}).a3 = [

  { id: 'a3-q01', topic: 't-bubble', ref: A + '1', title: 'Bubble sort passada a passada', type: 'mc', make: estado(BUB, 'passadas'), p: [
    { v: [8, 3, 7, 4, 2], k: 1, q: 'Vetor [8 3 7 4 2], bubble sort crescente. Como fica depois da <strong>1ª passada</strong>?', opts: [['3 7 4 2 8', 'O 8 vai trocando até a última posição.'], ['2 3 4 7 8', 'Isso é o vetor já ordenado; uma passada só leva o maior ao fim.'], ['3 8 7 4 2', 'Isso é só após a primeira comparação.'], ['2 8 3 7 4', 'O bubble não traz o menor para o início numa passada.']] },
    { v: [8, 3, 7, 4, 2], k: 2, q: 'Mesmo vetor [8 3 7 4 2]. Como fica depois da <strong>2ª passada</strong>?', opts: [['3 4 2 7 8', 'Na 2ª passada o 7 sobe até a penúltima posição.'], ['3 7 4 2 8', 'Esse é o estado após a 1ª passada.'], ['3 2 4 7 8', 'O 2 só anda uma casa por passada para a esquerda.'], ['2 3 4 7 8', 'Ainda faltam passadas.']] },
    { v: [9, 4, 6, 2, 8], k: 2, q: 'Vetor [9 4 6 2 8]. Como fica depois da <strong>2ª passada</strong>?', opts: [['4 2 6 8 9', 'Passada 1: 4 6 2 8 9. Passada 2: 4 2 6 8 9.'], ['4 6 2 8 9', 'Esse é o estado após a 1ª passada.'], ['2 4 6 8 9', 'Ainda falta uma passada para o 2 chegar ao início.'], ['4 2 6 9 8', 'O 9 já está no fim desde a 1ª passada.']] }] },

  { id: 'a3-q02', topic: 't-selection', ref: A + '2', title: 'Selection sort iteração a iteração', type: 'mc', make: estado(SEL, 'iteracoes'), p: [
    { v: [9, 4, 6, 2, 8], k: 1, q: 'Vetor [9 4 6 2 8], selection sort crescente. Como fica após a <strong>1ª iteração</strong>?', opts: [['2 4 6 9 8', 'O menor (2) troca com o 9 da posição 0.'], ['4 9 6 2 8', 'Isso seria trocar vizinhos (bubble).'], ['2 9 4 6 8', 'Selection troca, não desloca.'], ['4 6 2 8 9', 'Isso é a 1ª passada do bubble.']] },
    { v: [9, 4, 6, 2, 8], k: 3, q: 'Mesmo vetor [9 4 6 2 8]. Como fica após a <strong>3ª iteração</strong>?', opts: [['2 4 6 9 8', 'Iterações 2 e 3 não trocam: 4 e 6 já são os menores restantes.'], ['2 4 6 8 9', 'O 8 só troca com o 9 na 4ª iteração.'], ['2 4 9 6 8', 'O 6 já estava na posição 2.'], ['2 6 4 9 8', 'O 4 é o menor a partir da posição 1.']] },
    { v: [5, 1, 4, 2, 3], k: 2, q: 'Vetor [5 1 4 2 3]. Como fica após a <strong>2ª iteração</strong>?', opts: [['1 2 4 5 3', 'It. 1: 1 5 4 2 3. It. 2: o menor a partir da posição 1 é o 2, que troca com o 5.'], ['1 5 4 2 3', 'Esse é o estado após a 1ª iteração.'], ['1 2 5 4 3', 'Selection troca, não desloca o resto.'], ['1 2 3 4 5', 'Ainda faltam iterações.']] }] },

  { id: 'a3-q03', topic: 't-insertion', ref: A + '3', title: 'Insertion sort inserção a inserção', type: 'mc', make: estado(INS, 'insercoes'), p: [
    { v: [7, 3, 5, 1, 9], k: 2, q: 'Vetor [7 3 5 1 9], insertion sort. Como fica depois de inserir o 3 e o 5 (i = 1 e i = 2)?', opts: [['3 5 7 1 9', 'A parte ordenada passa a ser 3 5 7.'], ['3 7 5 1 9', 'Esse é o estado após inserir só o 3.'], ['1 3 5 7 9', 'O 1 ainda não foi inserido.'], ['3 5 1 7 9', 'Inserção não troca com o vizinho da direita.']] },
    { v: [7, 3, 5, 1, 9], k: 3, q: 'Mesmo vetor [7 3 5 1 9]. Como fica depois da inserção do 1 (i = 3)?', opts: [['1 3 5 7 9', 'O 1 desloca 7, 5 e 3 e entra no início.'], ['3 5 7 1 9', 'Esse é o estado antes de inserir o 1.'], ['3 1 5 7 9', 'O 1 só para quando não há maior à esquerda.'], ['1 7 3 5 9', 'Os maiores são deslocados, não trocados.']] },
    { v: [4, 8, 2, 6], k: 2, q: 'Vetor [4 8 2 6]. Como fica depois de inserir o 8 e o 2?', opts: [['2 4 8 6', 'O 2 desloca 8 e 4.'], ['4 2 8 6', 'O 2 continua andando enquanto há maior à esquerda.'], ['2 4 6 8', 'O 6 ainda não foi inserido.'], ['4 8 2 6', 'O 2 já foi inserido.']] }] },

  { id: 'a3-q04', topic: 't-comparacao', ref: A + '4', title: 'Qual vetor favorece qual método', type: 'mc', make: function (p) {
    return { q: 'A = {1 2 3 4 5 6}, B = {6 5 4 3 2 1}, C = {3 1 6 2 5 4}. ' + p.q, opts: p.opts };
  }, p: [
    { q: 'Qual situação é particularmente favorável para algum dos três métodos?', opts: [['A, para o insertion sort: cada chave já está no lugar e só há uma comparação por elemento.', 'Vetor ordenado é o melhor caso do insertion, perto de O(n).'], ['B, para o selection: invertido é o melhor caso.', 'O selection faz o mesmo número de comparações em qualquer caso.'], ['C, para o bubble: aleatório é o melhor caso.', 'Aleatório é caso médio.'], ['Nenhum: os três fazem sempre o mesmo trabalho.', 'Bubble otimizado e insertion se beneficiam de vetores ordenados.']] },
    { q: 'Para qual vetor o insertion sort faz MAIS deslocamentos?', opts: [['B: cada novo elemento precisa passar por todos os anteriores.', 'Invertido é o pior caso: 15 deslocamentos para 6 elementos.'], ['A', 'Em A nada é deslocado.'], ['C', 'C desloca alguns, mas menos que B.'], ['Os três deslocam igual.', 'Depende da organização inicial.']] },
    { q: 'Sobre o selection sort nos três vetores, o que é verdade?', opts: [['Faz 15 comparações em A, B e C: o número de comparações não depende da ordem inicial.', 'n(n − 1)/2 = 15 sempre.'], ['Faz menos comparações em A.', 'Ele sempre procura o menor até o fim.'], ['Faz mais trocas em A.', 'Em A não troca nada.'], ['Não funciona em B.', 'Funciona em qualquer vetor.']] }] },

  { id: 'a3-q05', topic: 't-visao', ref: A + '5', title: 'A ideia de cada método', type: 'mc', make: function (p) {
    return { q: 'Qual frase descreve a estratégia do <strong>' + p.m + '</strong>?', opts: p.opts };
  }, p: [
    { m: 'bubble sort', opts: [['Compara vizinhos e troca os fora de ordem; os maiores vão subindo para o fim a cada passada.', 'É a ideia das “bolhas”.'], ['Escolhe o menor da parte não ordenada e o coloca no início dela.', 'Isso é o selection.'], ['Insere cada elemento na posição certa da parte já ordenada.', 'Isso é o insertion.'], ['Divide o vetor ao meio repetidamente.', 'Isso descreve busca binária ou merge sort.']] },
    { m: 'selection sort', opts: [['Encontra o menor da parte não ordenada e troca com o primeiro dessa parte.', 'Seleção do menor a cada iteração.'], ['Compara e troca pares vizinhos até não haver mais trocas.', 'Isso é o bubble.'], ['Desloca os maiores para abrir espaço para a chave.', 'Isso é o insertion.'], ['Conta quantas vezes cada valor aparece.', 'Não é um dos métodos da aula.']] },
    { m: 'insertion sort', opts: [['Pega o próximo elemento e o encaixa na parte já ordenada, deslocando os maiores para a direita.', 'Como organizar cartas na mão.'], ['Seleciona o menor e troca com a primeira posição.', 'Isso é o selection.'], ['Faz o maior borbulhar para o fim.', 'Isso é o bubble.'], ['Troca o primeiro com o último até o meio.', 'Isso inverte o vetor.']] }] },

  { id: 'a3-q06', topic: 't-bubble', ref: A + '6', title: 'Bubble sort em função', type: 'drag', make: function (p) {
    return { q: 'Complete a função bubble sort crescente para um vetor de ' + p.n + ' ' + p.t + '.', code: R`void bubble(${p.t} v[], int n) {
    for (int i = 0; [[i < n - 1]]; i++)
        for (int j = 0; [[j < n - 1 - i]]; j++)
            if ([[v[j] > v[j + 1]]]) {
                ${p.t} aux = v[j];
                v[j] = v[j + 1];
                [[v[j + 1] = aux]];
            }
}`, extra: [['j < n', 'Com j = n − 1, v[j + 1] sai do vetor.'], ['v[j] < v[j + 1]', 'Isso ordena de forma decrescente.'], ['v[j] = aux', 'aux guarda o antigo v[j]; ele vai para v[j + 1].'], ['i <= n', 'Passadas demais (e nenhuma utilidade).']],
      why: 'n − 1 passadas; cada uma compara até n − 1 − i; troca com auxiliar.' };
  }, p: [{ t: 'int', n: 10 }, { t: 'float', n: 8 }, { t: 'double', n: 15 }] },

  { id: 'a3-q07', topic: 't-bubble', ref: A + '7', title: 'Crescente ou decrescente', type: 'fix', make: function (p) {
    return { q: 'O usuário escolhe a ordem: <code>cresc = 1</code> crescente, <code>cresc = 0</code> decrescente. Ache a linha errada.', code: R`void bubble(int v[], int n, int cresc) {
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - 1 - i; j++) {
            int foraDeOrdem = cresc ? ${p.a} : ${p.b};
            if (foraDeOrdem) {
                int aux = v[j];
                v[j] = v[j + 1];
                v[j + 1] = aux;
            }
        }
}`, line: 4,
      fixes: [['int foraDeOrdem = cresc ? v[j] > v[j + 1] : v[j] < v[j + 1];', 'Crescente troca se o da esquerda for maior; decrescente, se for menor.'], ['int foraDeOrdem = cresc ? v[j] < v[j + 1] : v[j] > v[j + 1];', 'Inverte as duas ordens.'], ['int foraDeOrdem = v[j] > v[j + 1];', 'Ignora a escolha do usuário.']],
      why: 'Só o teste de “fora de ordem” muda entre as duas ordens.' };
  }, p: [{ a: 'v[j] < v[j + 1]', b: 'v[j] > v[j + 1]' }, { a: 'v[j] > v[j + 1]', b: 'v[j] > v[j + 1]' }, { a: 'v[j] < v[j + 1]', b: 'v[j] < v[j + 1]' }] },

  { id: 'a3-q08', topic: 't-selection', ref: A + '8', title: 'Selection do maior para o menor', type: 'drag', make: function (p) {
    return { q: 'Complete o selection sort que ordena ' + p.o + ' do <strong>maior para o menor</strong>; depois a maior é <code>' + p.v + '[0]</code> e a menor <code>' + p.v + '[n - 1]</code>.', code: R`void ordenar(float ${p.v}[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int idx = [[i]];
        for (int j = i + 1; j < n; j++)
            if ([[${p.v}[j] > ${p.v}[idx]]])
                idx = j;
        if (idx != i) {
            float aux = ${p.v}[i];
            ${p.v}[i] = [[${p.v}[idx]]];
            ${p.v}[idx] = aux;
        }
    }
}`, extra: [['0', 'Cada iteração começa assumindo a posição i.'], [p.v + '[j] < ' + p.v + '[idx]', 'Isso seleciona o menor: ordem crescente.'], ['idx', 'Atribui o valor de ' + p.v + '[idx], não o índice.'], [p.v + '[j]', 'j já saiu do laço; o escolhido é idx.']],
      why: 'Para ordem decrescente, seleciona-se o MAIOR a cada iteração.' };
  }, p: [{ v: 'notas', o: 'as notas de 10 alunos' }, { v: 'tempos', o: 'tempos' }, { v: 'precos', o: 'preços' }] },

  { id: 'a3-q09', topic: 't-insertion', ref: A + '9', title: 'Insertion para os tempos', type: 'fix', make: function (p) {
    return { q: 'Os tempos de 12 participantes devem ficar do menor para o maior com insertion sort. Ache a linha errada.', code: R`void insertion(float t[], int n) {
    for (int i = 1; i < n; i++) {
        float chave = t[i];
        int j = ${p.j0};
        while (${p.c}) {
            t[j + 1] = t[j];
            j--;
        }
        ${p.ins};
    }
}`, line: p.line,
      fixes: p.line === 4 ? [['int j = i - 1;', 'j começa no último da parte ordenada.'], ['int j = i;', 'Compararia a chave com ela mesma.'], ['int j = 0;', 'Começaria do início, não de trás para frente.']]
        : p.line === 5 ? [['while (j >= 0 && t[j] > chave) {', 'Para no início ou quando acha alguém menor ou igual.'], ['while (j > 0 && t[j] > chave) {', 'Nunca compararia com t[0].'], ['while (t[j] > chave) {', 'Sem `j >= 0`, j chega a −1 e lê fora do vetor.']]
        : [['t[j + 1] = chave;', 'A chave entra no buraco, uma posição depois de j.'], ['t[j] = chave;', 'Sobrescreveria um elemento menor.'], ['t[i] = chave;', 'Devolveria a chave para onde estava.']],
      why: 'j = i − 1; desloca enquanto j ≥ 0 e t[j] > chave; insere em t[j + 1].' };
  }, p: [{ j0: 'i', c: 'j >= 0 && t[j] > chave', ins: 't[j + 1] = chave', line: 4 }, { j0: 'i - 1', c: 't[j] > chave', ins: 't[j + 1] = chave', line: 5 }, { j0: 'i - 1', c: 'j >= 0 && t[j] > chave', ins: 't[j] = chave', line: 9 }] },

  { id: 'a3-q10', topic: 't-comparacao', ref: A + '10', title: 'Mesmos dados para os três', type: 'drag', make: function (p) {
    return { q: 'Para que bubble, selection e insertion recebam exatamente os mesmos ' + p.n + ' números, cada um ordena uma cópia. Complete.', code: R`void copiar(int origem[], int destino[], int n) {
    for (int i = 0; i < n; i++)
        [[destino[i] = origem[i]]];
}

/* na main: */
int original[${p.n}] = {0}, c1[${p.n}], c2[${p.n}], c3[${p.n}];
copiar(original, c1, ${p.n});
bubble(c1, ${p.n});
copiar([[original]], c2, ${p.n});
selection(c2, ${p.n});
copiar(original, [[c3]], ${p.n});
insertion(c3, ${p.n});`, extra: [['origem[i] = destino[i]', 'Copiaria no sentido contrário.'], ['c1', 'c1 já foi ordenado: o selection receberia dados ordenados.'], ['original = c1', 'Vetores não se copiam com `=`.']],
      why: 'Sempre copiar do original intacto.', pre: 'void bubble(int v[], int n); void selection(int v[], int n); void insertion(int v[], int n);' };
  }, p: [{ n: 15 }, { n: 10 }, { n: 20 }] },

  { id: 'a3-q11', topic: 't-comparacao', ref: A + '11', title: 'Contar comparações', type: 'mc', make: function (p) {
    return { q: 'O programa conta as comparações entre elementos de cada método para o vetor {' + arr(p.v) + '}. Qual a saída?', saida: true, code: R`#include <stdio.h>
int bub(int v[], int n) {
    int c = 0;
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - 1 - i; j++) {
            c++;
            if (v[j] > v[j + 1]) {
                int a = v[j];
                v[j] = v[j + 1];
                v[j + 1] = a;
            }
        }
    return c;
}

int sel(int v[], int n) {
    int c = 0;
    for (int i = 0; i < n - 1; i++) {
        int m = i;
        for (int j = i + 1; j < n; j++) {
            c++;
            if (v[j] < v[m])
                m = j;
        }
        int a = v[i];
        v[i] = v[m];
        v[m] = a;
    }
    return c;
}

int ins(int v[], int n) {
    int c = 0;
    for (int i = 1; i < n; i++) {
        int k = v[i], j = i - 1;
        while (j >= 0) {
            c++;
            if (v[j] > k) {
                v[j + 1] = v[j];
                j--;
            } else
                break;
        }
        v[j + 1] = k;
    }
    return c;
}

int main() {
    int a[] = {${arr(p.v)}}, b[] = {${arr(p.v)}}, c[] = {${arr(p.v)}};
    int n = ${p.v.length};
    printf("%d %d %d\n", bub(a, n), sel(b, n), ins(c, n));
    return 0;
}`, opts: p.opts };
  }, p: [
    { v: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1], opts: [['45 45 45', 'Vetor invertido: os três fazem n(n − 1)/2 = 45 comparações.'], ['45 45 9', 'Insertion só faz 9 no vetor JÁ ordenado; aqui é o pior caso.'], ['90 45 45', 'Cada par é comparado uma vez por passada.'], ['10 10 10', 'Comparações crescem com n².']] },
    { v: [1, 2, 3, 4, 5, 6], opts: [['15 15 5', 'Ordenado: bubble e selection ainda comparam tudo; insertion faz uma por elemento.'], ['15 15 15', 'O insertion para na primeira comparação de cada chave.'], ['5 5 5', 'Bubble sem otimização e selection não param cedo.'], ['0 0 0', 'Comparar é necessário para saber que está ordenado.']] },
    { v: [2, 1, 3, 4], opts: [['6 6 3', 'Quase ordenado: o insertion faz uma comparação por chave (o 1 desce e o laço acaba em j = −1).'], ['6 6 6', 'O insertion para cedo nas chaves já posicionadas.'], ['3 3 3', 'Bubble e selection comparam n(n − 1)/2 = 6.'], ['6 6 4', 'Quando j vira −1 o laço termina sem comparar de novo.']] }] },

  { id: 'a3-q12', topic: 't-comparacao', ref: A + '12', title: 'Contar trocas e movimentações', type: 'mc', make: function (p) {
    return { q: 'Agora o programa conta trocas (bubble e selection) e deslocamentos (insertion) para {' + arr(p.v) + '}. Qual a saída?', saida: true, code: R`#include <stdio.h>
int bub(int v[], int n) {
    int t = 0;
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - 1 - i; j++)
            if (v[j] > v[j + 1]) {
                int a = v[j];
                v[j] = v[j + 1];
                v[j + 1] = a;
                t++;
            }
    return t;
}

int sel(int v[], int n) {
    int t = 0;
    for (int i = 0; i < n - 1; i++) {
        int m = i;
        for (int j = i + 1; j < n; j++)
            if (v[j] < v[m])
                m = j;
        if (m != i) {
            int a = v[i];
            v[i] = v[m];
            v[m] = a;
            t++;
        }
    }
    return t;
}

int ins(int v[], int n) {
    int t = 0;
    for (int i = 1; i < n; i++) {
        int k = v[i], j = i - 1;
        while (j >= 0 && v[j] > k) {
            v[j + 1] = v[j];
            j--;
            t++;
        }
        v[j + 1] = k;
    }
    return t;
}

int main() {
    int a[] = {${arr(p.v)}}, b[] = {${arr(p.v)}}, c[] = {${arr(p.v)}};
    int n = ${p.v.length};
    printf("%d %d %d\n", bub(a, n), sel(b, n), ins(c, n));
    return 0;
}`, opts: p.opts };
  }, p: [
    { v: [5, 4, 3, 2, 1], opts: [['10 2 10', 'Invertido: bubble e insertion movem cada par fora de ordem (10); selection só troca 2 vezes.'], ['10 4 10', 'O selection não troca quando o menor já está na posição.'], ['4 4 4', 'Bubble troca a cada par invertido.'], ['10 10 10', 'Selection faz no máximo n − 1 trocas, e aqui só 2 são necessárias.']] },
    { v: [3, 1, 2], opts: [['2 2 2', 'Há 2 pares fora de ordem; o selection também precisa de 2 trocas aqui.'], ['2 1 2', 'Selection: troca 3↔1 e depois 3↔2.'], ['3 2 3', 'Só há dois pares invertidos.'], ['1 1 1', 'Confira as inversões: (3,1) e (3,2).']] },
    { v: [1, 2, 4, 3], opts: [['1 1 1', 'Só um par fora de ordem: cada método faz uma movimentação.'], ['0 0 0', 'O 4 e o 3 precisam trocar.'], ['1 3 1', 'Selection só troca quando o menor não está na posição.'], ['3 3 3', 'Há uma única inversão.']] }] },

  { id: 'a3-q13', topic: 't-comparacao', ref: A + '13', title: 'Vetor quase ordenado', type: 'mc', make: function (p) {
    return { q: 'O vetor ' + p.v + ' está praticamente ordenado. Qual método deve ter o melhor comportamento?', opts: [['Insertion sort: cada elemento já no lugar custa uma comparação; só ' + p.x + ' é deslocado.', 'Quase ordenado é o ponto forte do insertion.'], ['Selection sort: faz poucas trocas.', 'Faz poucas trocas, mas sempre n(n − 1)/2 comparações.'], ['Bubble sort sem otimização.', 'Sem parar cedo, ele faz todas as passadas.'], ['Os três se comportam igual.', 'A organização inicial muda bastante o insertion.']] };
  }, p: [{ v: '[2 4 6 8 10 12 14 16 20 18]', x: 'o 18' }, { v: '[1 3 2 4 5 6 7 8]', x: 'o 2' }, { v: '[10 20 30 40 50 45]', x: 'o 45' }] },

  { id: 'a3-q14', topic: 't-insertion', ref: A + '14', title: 'Valores que chegam com o tempo', type: 'mc', make: function (p) {
    return { q: 'O vetor ' + p.v + ' já está ordenado e chegam, nesta ordem, ' + p.c + '. Qual estratégia combina com esse cenário?', opts: [['A do insertion sort: cada valor novo é uma inserção na parte já ordenada.', 'O vetor existente já é a parte ordenada; cada chegada desloca só os maiores.'], ['Bubble sort do vetor inteiro a cada chegada.', 'Refaz passadas sobre dados que já estavam em ordem.'], ['Selection sort do vetor inteiro a cada chegada.', 'Procura o menor de novo em tudo, toda vez.'], ['Colocar no fim e só ordenar quando todos chegarem.', 'O enunciado pede o vetor sempre ordenado.']] };
  }, p: [{ v: '[10 20 30 40 50]', c: '25, 12 e 45' }, { v: '[3 9 15]', c: '7 e 1' }, { v: '[100 200 300 400]', c: '250, 50 e 500' }] }
  ];
})();

/* Variantes V2 e V3 escritas à mão (2026-11-18): outra tarefa, outra lógica, outro erro. V1 vem dos moldes acima.
   Gerado por _tools/gerar_alt.mjs a partir de _tools/alt/a3.alt.js; null = a versão do molde continua valendo. */
(function () {
  window.ALT = window.ALT || {};
  window.ALT['a3-q01'] = [
    {
      q: "Vetor [4 9 2 7 6], bubble sort <strong>decrescente</strong> (o menor desce para o fim). Como fica depois da <strong>1ª passada</strong>?",
      saida: true,
      code: "#include <stdio.h>\nvoid passada(int v[], int n) {\n    for (int j = 0; j < n - 1; j++)\n        if (v[j] < v[j + 1]) {\n            int a = v[j];\n            v[j] = v[j + 1];\n            v[j + 1] = a;\n        }\n}\n\nint main() {\n    int v[] = {4, 9, 2, 7, 6};\n    passada(v, 5);\n    for (int i = 0; i < 5; i++)\n        printf(\"%d \", v[i]);\n    return 0;\n}",
      opts: [
        ["9 4 7 6 2", "O menor (2) desce até o fim; os demais só trocam quando o da esquerda é menor."],
        ["9 7 6 4 2", "Isso é o vetor já todo ordenado, o que exigiria mais passadas."],
        ["4 2 7 6 9", "Essa é a ordem crescente da 1ª passada: o maior sobe."],
        ["2 4 9 7 6", "O menor não vai para o início, vai para o fim."]
      ]
    },
    {
      q: "Vetor [5 1 4 2 8 3], bubble sort crescente. Depois da 1ª passada, quantas trocas foram feitas e como fica o vetor?",
      saida: true,
      code: "#include <stdio.h>\nint main() {\n    int v[] = {5, 1, 4, 2, 8, 3}, n = 6, trocas = 0;\n    for (int j = 0; j < n - 1; j++)\n        if (v[j] > v[j + 1]) {\n            int a = v[j];\n            v[j] = v[j + 1];\n            v[j + 1] = a;\n            trocas++;\n        }\n    printf(\"%d trocas:\", trocas);\n    for (int i = 0; i < n; i++)\n        printf(\" %d\", v[i]);\n    printf(\"\\n\");\n    return 0;\n}",
      opts: [
        ["4 trocas: 1 4 2 5 3 8", "O 5 anda até bater no 8 (3 trocas); depois o 8 troca com o 3 (4ª troca)."],
        ["3 trocas: 1 4 2 5 8 3", "O 8 também troca com o 3: são 4 trocas."],
        ["5 trocas: 1 2 3 4 5 8", "Uma passada não ordena tudo."],
        ["4 trocas: 1 5 4 2 3 8", "O 5 continua andando enquanto é maior que o vizinho."]
      ]
    }
  ];
  window.ALT['a3-q02'] = [
    {
      q: "Vetor [9 4 6 2 8], selection sort <strong>decrescente</strong> (escolhe o maior). Como fica após a <strong>2ª iteração</strong>?",
      saida: true,
      code: "#include <stdio.h>\nvoid iteracoes(int v[], int n, int k) {\n    for (int i = 0; i < k; i++) {\n        int m = i;\n        for (int j = i + 1; j < n; j++)\n            if (v[j] > v[m])\n                m = j;\n        if (m != i) {\n            int a = v[i];\n            v[i] = v[m];\n            v[m] = a;\n        }\n    }\n}\n\nint main() {\n    int v[] = {9, 4, 6, 2, 8};\n    iteracoes(v, 5, 2);\n    for (int i = 0; i < 5; i++)\n        printf(\"%d \", v[i]);\n    return 0;\n}",
      opts: [
        ["9 8 6 2 4", "O 9 já está no lugar; na 2ª iteração o maior do resto (8) troca com o 4."],
        ["9 4 6 2 8", "A 2ª iteração troca o 8 com o 4."],
        ["9 8 4 2 6", "Trocou o 8 mas moveu outros elementos junto."],
        ["8 9 6 2 4", "O 9 não sai da primeira posição."]
      ]
    },
    {
      q: "Vetor [3 2 3 1 2], selection sort crescente (só troca quando acha um valor <strong>estritamente</strong> menor). Como fica após a <strong>3ª iteração</strong>?",
      saida: true,
      code: "#include <stdio.h>\nvoid iteracoes(int v[], int n, int k) {\n    for (int i = 0; i < k; i++) {\n        int m = i;\n        for (int j = i + 1; j < n; j++)\n            if (v[j] < v[m])\n                m = j;\n        if (m != i) {\n            int a = v[i];\n            v[i] = v[m];\n            v[m] = a;\n        }\n    }\n}\n\nint main() {\n    int v[] = {3, 2, 3, 1, 2};\n    iteracoes(v, 5, 3);\n    for (int i = 0; i < 5; i++)\n        printf(\"%d \", v[i]);\n    return 0;\n}",
      opts: [
        ["1 2 2 3 3", "1ª: o 1 vai para o início; 2ª: o 2 já está no lugar; 3ª: o menor do resto é o 2 do fim, que troca com o 3."],
        ["1 2 3 3 2", "Esse é o estado depois da 2ª iteração."],
        ["1 3 2 3 2", "A 2ª iteração não troca nada: o 2 já é o menor do resto."],
        ["2 3 3 1 2", "Nenhuma iteração aconteceu."]
      ]
    }
  ];
  window.ALT['a3-q03'] = [
    {
      q: "Vetor [4 8 2 6 9], insertion sort <strong>decrescente</strong>. Como fica depois de inserir o 8, o 2 e o 6 (i = 1, 2 e 3)?",
      saida: true,
      code: "#include <stdio.h>\nvoid insercoes(int v[], int n, int k) {\n    for (int i = 1; i <= k; i++) {\n        int chave = v[i], j = i - 1;\n        while (j >= 0 && v[j] < chave) {\n            v[j + 1] = v[j];\n            j--;\n        }\n        v[j + 1] = chave;\n    }\n}\n\nint main() {\n    int v[] = {4, 8, 2, 6, 9};\n    insercoes(v, 5, 3);\n    for (int i = 0; i < 5; i++)\n        printf(\"%d \", v[i]);\n    return 0;\n}",
      opts: [
        ["8 6 4 2 9", "A parte inicial fica em ordem decrescente; o 9 ainda não entrou."],
        ["8 4 2 6 9", "Esse é o estado depois de inserir só o 8 e o 2."],
        ["9 8 6 4 2", "Seria o resultado depois de inserir também o 9."],
        ["2 4 6 8 9", "Essa é a ordem crescente."]
      ]
    },
    {
      q: "Vetor [6 2 5 1 7], insertion sort crescente. Quantos deslocamentos de elementos ao todo e como termina o vetor?",
      saida: true,
      code: "#include <stdio.h>\nint main() {\n    int v[] = {6, 2, 5, 1, 7}, n = 5, desloc = 0;\n    for (int i = 1; i < n; i++) {\n        int chave = v[i], j = i - 1;\n        while (j >= 0 && v[j] > chave) {\n            v[j + 1] = v[j];\n            j--;\n            desloc++;\n        }\n        v[j + 1] = chave;\n    }\n    printf(\"%d |\", desloc);\n    for (int i = 0; i < n; i++)\n        printf(\" %d\", v[i]);\n    printf(\"\\n\");\n    return 0;\n}",
      opts: [
        ["5 | 1 2 5 6 7", "A chave 2 desloca 1; a 5 desloca 1; a 1 desloca 3; a 7 nenhum."],
        ["4 | 1 2 5 6 7", "A chave 1 desloca 3 elementos, não 2."],
        ["3 | 1 2 5 6 7", "Esse é o número de chaves que precisaram deslocar, não de deslocamentos."],
        ["5 | 2 5 6 1 7", "O vetor termina ordenado."]
      ]
    }
  ];
  window.ALT['a3-q04'] = [
    {
      q: "Considere o bubble sort com parada antecipada (se uma passada não faz nenhuma troca, o programa termina). Para o vetor C = {2 1 3 4 5}, quantas passadas completas ele faz?",
      opts: [
        ["2: a primeira troca o 2 com o 1; a segunda não troca nada e confirma que acabou.", "Depois da 1ª passada o vetor já está ordenado, mas é preciso uma passada sem trocas para saber disso."],
        ["1: só há uma troca a fazer.", "Para encerrar, é preciso uma passada que não troque nada."],
        ["4: sempre n - 1 passadas.", "Isso vale sem a parada antecipada."],
        ["5: uma passada por elemento.", "O bubble faz no máximo n - 1 passadas."]
      ]
    },
    {
      q: "Para um vetor com <code>n = 6</code> elementos já ordenado, quantas comparações o insertion sort faz?",
      opts: [
        ["5: uma comparação por chave, de i = 1 a i = 5.", "Cada chave é maior que a anterior e para na primeira comparação."],
        ["15: todos contra todos.", "Esse seria o pior caso, com vetor invertido."],
        ["6: uma por elemento.", "O primeiro elemento não é comparado com ninguém."],
        ["0: não precisa comparar nada.", "Precisa comparar cada chave com a anterior para saber que já está no lugar."]
      ]
    }
  ];
  window.ALT['a3-q06'] = [
    {
      q: "Complete o bubble sort crescente com <strong>parada antecipada</strong> para um vetor de int.",
      code: "void bubble(int v[], int n) {\n    int trocou = 1;\n    for (int i = 0; i < n - 1 && [[trocou]]; i++) {\n        trocou = [[0]];\n        for (int j = 0; j < n - 1 - i; j++)\n            if (v[j] > v[j + 1]) {\n                int aux = v[j];\n                v[j] = v[j + 1];\n                v[j + 1] = aux;\n                [[trocou = 1]];\n            }\n    }\n}",
      extra: [
        ["!trocou", "Pararia justamente quando houve troca."],
        ["1", "O marcador precisa zerar a cada passada."],
        ["trocou = 0", "Marcaria \"sem troca\" mesmo depois de trocar."],
        ["i < n", "Passadas demais."]
      ],
      why: "A cada passada o marcador zera; uma troca o liga; se a passada termina com o marcador desligado, o vetor já está ordenado."
    },
    {
      q: "Complete o insertion sort crescente para um vetor de int.",
      code: "void insertion(int v[], int n) {\n    for (int i = 1; i < n; i++) {\n        int chave = v[i];\n        int j = [[i - 1]];\n        while ([[j >= 0 && v[j] > chave]]) {\n            v[j + 1] = [[v[j]]];\n            j--;\n        }\n        [[v[j + 1] = chave]];\n    }\n}",
      extra: [
        ["i", "Compararia a chave com ela mesma."],
        ["j > 0 && v[j] > chave", "Nunca compararia com a posição 0."],
        ["v[i]", "Copiaria sempre a chave, não o elemento anterior."],
        ["v[j] = chave", "Gravaria sobre um elemento que não foi deslocado."]
      ],
      why: "A chave espera; os maiores deslocam uma posição para a direita; no fim ela ocupa o buraco, em `v[j + 1]`."
    }
  ];
  window.ALT['a3-q07'] = [
    {
      q: "O usuário escolhe a ordem: <code>cresc = 1</code> crescente, <code>cresc = 0</code> decrescente. A troca dos elementos está errada. Ache a linha.",
      code: "void bubble(int v[], int n, int cresc) {\n    for (int i = 0; i < n - 1; i++)\n        for (int j = 0; j < n - 1 - i; j++) {\n            int foraDeOrdem = cresc ? v[j] > v[j + 1] : v[j] < v[j + 1];\n            if (foraDeOrdem) {\n                int aux = v[j];\n                v[j] = v[j + 1];\n                v[j] = aux;\n            }\n        }\n}",
      line: 8,
      fixes: [
        ["v[j + 1] = aux;", "O valor guardado em aux vai para a posição j + 1."],
        ["aux = v[j + 1];", "Sobrescreveria o auxiliar sem usá-lo."],
        ["v[j + 1] = v[j];", "Copiaria de novo o mesmo valor, sem restaurar o guardado em aux."]
      ],
      why: "Com `v[j] = aux` no final, o valor de `v[j + 1]` original se perde e `v[j + 1]` fica intacto."
    },
    {
      q: "O usuário escolhe a ordem: <code>cresc = 1</code> crescente, <code>cresc = 0</code> decrescente. Para qualquer vetor o programa lê fora do vetor. Ache a linha.",
      code: "void bubble(int v[], int n, int cresc) {\n    for (int i = 0; i < n - 1; i++)\n        for (int j = 0; j < n - 1 + i; j++) {\n            int foraDeOrdem = cresc ? v[j] > v[j + 1] : v[j] < v[j + 1];\n            if (foraDeOrdem) {\n                int aux = v[j];\n                v[j] = v[j + 1];\n                v[j + 1] = aux;\n            }\n        }\n}",
      line: 3,
      fixes: [
        ["for (int j = 0; j < n - 1 - i; j++) {", "A cada passada o último elemento já está no lugar: o limite diminui."],
        ["for (int j = 0; j < n - i; j++) {", "Ainda compara v[j + 1] com j = n - 1 - i... na 1ª passada lê v[n]."],
        ["for (int j = 1; j < n - 1 + i; j++) {", "Continua passando do fim."]
      ],
      why: "Somar `i` faz o limite crescer e ultrapassar o vetor; o certo é subtrair."
    }
  ];
  window.ALT['a3-q08'] = [
    {
      q: "Complete o selection sort que coloca o <strong>maior</strong> no final a cada rodada (a parte ordenada cresce da direita para a esquerda).",
      code: "void ordenar(int v[], int n) {\n    for (int fim = n - 1; fim > 0; fim--) {\n        int idx = [[0]];\n        for (int j = 1; [[j <= fim]]; j++)\n            if ([[v[j] > v[idx]]])\n                idx = j;\n        if (idx != fim) {\n            int aux = v[fim];\n            v[fim] = [[v[idx]]];\n            v[idx] = aux;\n        }\n    }\n}",
      extra: [
        ["fim", "A busca começa pelo primeiro elemento da parte não ordenada."],
        ["j < fim", "Deixaria o elemento da posição `fim` fora da busca."],
        ["v[j] < v[idx]", "Procuraria o menor."],
        ["v[j]", "Perderia o valor guardado em idx."]
      ],
      why: "Em cada rodada acha-se a posição do maior entre 0 e `fim` e troca-se com a posição `fim`."
    },
    {
      q: "Complete o selection sort parcial: ele coloca no início do vetor apenas os <code>k</code> menores valores, em ordem crescente.",
      code: "void menoresPrimeiro(int v[], int n, int k) {\n    for (int i = 0; [[i < k]]; i++) {\n        int idx = [[i]];\n        for (int j = i + 1; j < n; j++)\n            if (v[j] < v[idx])\n                idx = j;\n        int aux = v[i];\n        v[i] = v[idx];\n        [[v[idx] = aux]];\n    }\n}\n\n/* na main: */\nint notas[8] = {7, 3, 9, 1, 8, 2, 6, 5};\nmenoresPrimeiro(notas, 8, [[3]]);",
      extra: [
        ["i < n", "Ordenaria o vetor inteiro."],
        ["0", "A busca de cada rodada começa na posição i."],
        ["v[i] = aux", "Perderia o valor de v[idx]."],
        ["8", "Ordenaria o vetor inteiro, não só os 3 menores."]
      ],
      why: "Só as k primeiras rodadas são feitas; cada uma fixa o menor valor restante na posição i."
    }
  ];
  window.ALT['a3-q10'] = [
    {
      q: "Depois de ordenar, o programa confere se cada cópia ficou mesmo em ordem crescente. Complete a função de conferência e o uso.",
      code: "int ordenado(int v[], int n) {\n    for (int i = 0; [[i < n - 1]]; i++)\n        if ([[v[i] > v[i + 1]]])\n            return [[0]];\n    return [[1]];\n}\n\n/* na main: */\nint original[15] = {0}, c1[15];\ncopiar(original, c1, 15);\nbubble(c1, 15);\nprintf(\"Bubble ordenou? %d\\n\", [[ordenado(c1, 15)]]);",
      extra: [
        ["i < n", "Leria v[n], fora do vetor."],
        ["v[i] < v[i + 1]", "Reprovaria justamente os pares em ordem."],
        ["-1", "A função devolve 1 ou 0."],
        ["ordenado(original, 15)", "Conferiria a cópia que não foi ordenada."]
      ],
      why: "Um único par fora de ordem já decide que o vetor não está ordenado.",
      pre: "void copiar(int o[], int d[], int n) { for (int i = 0; i < n; i++) d[i] = o[i]; }\nvoid bubble(int v[], int n);"
    },
    {
      q: "Cada método ordena a sua cópia e devolve quantas trocas fez. Complete a comparação.",
      code: "/* na main: */\nint original[15] = {0}, c1[15], c2[15];\ncopiar(original, c1, 15);\ncopiar([[original]], c2, 15);\nint t1 = [[bubble(c1, 15)]];\nint t2 = selection(c2, 15);\nif ([[t1 > t2]])\n    printf(\"selection fez menos trocas\\n\");\nelse\n    printf(\"bubble fez menos ou igual\\n\");",
      extra: [
        ["c1", "A cópia c2 deve vir do original intacto, não da cópia já ordenada."],
        ["bubble(original, 15)", "Ordenaria o vetor original e deixaria c1 sem ordenar."],
        ["t1 < t2", "Inverteria a mensagem."],
        ["c2 = original", "Atribuição de vetor não é permitida em C."]
      ],
      why: "Cada método trabalha numa cópia do original intacto e devolve a contagem de trocas, que a main compara.",
      pre: "void copiar(int o[], int d[], int n);\nint bubble(int v[], int n);\nint selection(int v[], int n);"
    }
  ];
  window.ALT['a3-q11'] = [
    {
      q: "O bubble sort agora tem parada antecipada e conta comparações. Para o vetor {2, 1, 3, 4, 5, 6}, qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint main() {\n    int v[] = {2, 1, 3, 4, 5, 6}, n = 6, c = 0, passadas = 0, trocou = 1;\n    for (int i = 0; i < n - 1 && trocou; i++) {\n        trocou = 0;\n        passadas++;\n        for (int j = 0; j < n - 1 - i; j++) {\n            c++;\n            if (v[j] > v[j + 1]) {\n                int a = v[j];\n                v[j] = v[j + 1];\n                v[j + 1] = a;\n                trocou = 1;\n            }\n        }\n    }\n    printf(\"%d comparacoes em %d passadas\\n\", c, passadas);\n    return 0;\n}",
      opts: [
        ["9 comparacoes em 2 passadas", "1ª passada: 5 comparações e uma troca; 2ª: 4 comparações sem trocas, e o laço para."],
        ["15 comparacoes em 5 passadas", "Isso é o bubble sem parada antecipada."],
        ["9 comparacoes em 3 passadas", "A segunda passada não troca nada: o laço encerra ali."],
        ["5 comparacoes em 1 passadas", "É preciso uma passada a mais para confirmar que não há trocas."]
      ]
    },
    {
      q: "Quantas comparações cada método faz no vetor {3, 1, 2, 4}? O bubble tem parada antecipada. Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint bub(int v[], int n) {\n    int c = 0, trocou = 1;\n    for (int i = 0; i < n - 1 && trocou; i++) {\n        trocou = 0;\n        for (int j = 0; j < n - 1 - i; j++) {\n            c++;\n            if (v[j] > v[j + 1]) {\n                int a = v[j];\n                v[j] = v[j + 1];\n                v[j + 1] = a;\n                trocou = 1;\n            }\n        }\n    }\n    return c;\n}\n\nint ins(int v[], int n) {\n    int c = 0;\n    for (int i = 1; i < n; i++) {\n        int k = v[i], j = i - 1;\n        while (j >= 0) {\n            c++;\n            if (v[j] > k) {\n                v[j + 1] = v[j];\n                j--;\n            } else\n                break;\n        }\n        v[j + 1] = k;\n    }\n    return c;\n}\n\nint main() {\n    int a[] = {3, 1, 2, 4}, b[] = {3, 1, 2, 4};\n    printf(\"%d %d\\n\", bub(a, 4), ins(b, 4));\n    return 0;\n}",
      opts: [
        ["5 4", "Bubble: 3 comparações na 1ª passada e 2 na 2ª (sem trocas). Insertion: 1 + 2 + 1."],
        ["6 4", "Sem a parada antecipada seriam 6, mas a 2ª passada não troca e o laço encerra."],
        ["5 3", "No insertion a chave 2 compara com o 3 e depois com o 1: são 2 comparações."],
        ["4 5", "Trocou as ordens dos métodos."]
      ]
    }
  ];
  window.ALT['a3-q12'] = [
    {
      q: "Duas versões do bubble: <code>bubA</code> troca quando o da esquerda é <strong>maior</strong> (<code>&gt;</code>) e <code>bubB</code> quando é <strong>maior ou igual</strong> (<code>&gt;=</code>). Quantas trocas cada uma faz em {3, 3, 1}?",
      saida: true,
      code: "#include <stdio.h>\nint bubA(int v[], int n) {\n    int t = 0;\n    for (int i = 0; i < n - 1; i++)\n        for (int j = 0; j < n - 1 - i; j++)\n            if (v[j] > v[j + 1]) {\n                int a = v[j];\n                v[j] = v[j + 1];\n                v[j + 1] = a;\n                t++;\n            }\n    return t;\n}\n\nint bubB(int v[], int n) {\n    int t = 0;\n    for (int i = 0; i < n - 1; i++)\n        for (int j = 0; j < n - 1 - i; j++)\n            if (v[j] >= v[j + 1]) {\n                int a = v[j];\n                v[j] = v[j + 1];\n                v[j + 1] = a;\n                t++;\n            }\n    return t;\n}\n\nint main() {\n    int a[] = {3, 3, 1}, b[] = {3, 3, 1};\n    printf(\"%d %d\\n\", bubA(a, 3), bubB(b, 3));\n    return 0;\n}",
      opts: [
        ["2 3", "Com `>=` o par de 3 iguais também é trocado sem necessidade."],
        ["3 3", "Com `>` o par igual não troca."],
        ["2 2", "Com `>=` os elementos iguais são trocados."],
        ["3 2", "Trocou os papéis: bubA usa `>`."]
      ]
    },
    {
      q: "O insertion sort desloca quando <code>v[j] &gt; chave</code> (<code>insA</code>) ou quando <code>v[j] &gt;= chave</code> (<code>insB</code>). Quantos deslocamentos cada um faz em {2, 2, 2, 1}?",
      saida: true,
      code: "#include <stdio.h>\nint insA(int v[], int n) {\n    int t = 0;\n    for (int i = 1; i < n; i++) {\n        int k = v[i], j = i - 1;\n        while (j >= 0 && v[j] > k) {\n            v[j + 1] = v[j];\n            j--;\n            t++;\n        }\n        v[j + 1] = k;\n    }\n    return t;\n}\n\nint insB(int v[], int n) {\n    int t = 0;\n    for (int i = 1; i < n; i++) {\n        int k = v[i], j = i - 1;\n        while (j >= 0 && v[j] >= k) {\n            v[j + 1] = v[j];\n            j--;\n            t++;\n        }\n        v[j + 1] = k;\n    }\n    return t;\n}\n\nint main() {\n    int a[] = {2, 2, 2, 1}, b[] = {2, 2, 2, 1};\n    printf(\"%d %d\\n\", insA(a, 4), insB(b, 4));\n    return 0;\n}",
      opts: [
        ["3 6", "insA só desloca para a chave 1 (3 elementos); insB também desloca os iguais: 1 + 2 + 3."],
        ["3 3", "Com `>=` os iguais também deslocam."],
        ["6 3", "Trocou os papéis: insA usa `>`."],
        ["6 6", "Com `>` os iguais não deslocam."]
      ]
    }
  ];
  window.ALT['a3-q13'] = [
    {
      q: "Os elementos do vetor são registros muito grandes e copiá-los é caro. Qual método tende a ser o melhor, por fazer poucas trocas?",
      opts: [
        ["Selection sort: faz no máximo n - 1 trocas, uma por posição.", "Cada rodada faz uma única troca, mesmo que faça muitas comparações."],
        ["Bubble sort: troca só vizinhos.", "No pior caso faz uma troca por inversão, muitas mais."],
        ["Insertion sort: não troca nada.", "Desloca elementos, o que também copia registros várias vezes."],
        ["Os três copiam o mesmo número de registros.", "O número de trocas e deslocamentos difere bastante."]
      ]
    },
    {
      q: "Para um vetor com 10 000 elementos em ordem aleatória, qual afirmação sobre os três métodos é verdadeira?",
      opts: [
        ["Os três fazem um número de comparações da ordem de n², e nenhum é o melhor em todos os casos.", "Todos têm custo quadrático em média; as diferenças aparecem nos casos especiais."],
        ["O insertion sort faz sempre n comparações.", "Isso só vale para vetor já ordenado."],
        ["O selection sort faz menos comparações que os outros.", "Ele faz sempre n(n-1)/2 comparações."],
        ["O bubble sort faz sempre menos trocas que o selection.", "Em vetor aleatório faz muito mais trocas."]
      ]
    }
  ];
  window.ALT['a3-q14'] = [
    {
      q: "Um vetor de 1 000 elementos chega desordenado e será ordenado uma única vez. O custo de cada troca é alto. Qual método reduz mais o número de trocas?",
      opts: [
        ["Selection sort: no máximo uma troca por posição.", "Cada rodada troca o menor restante com a posição atual."],
        ["Bubble sort: troca vizinhos fora de ordem muitas vezes.", "Faz uma troca por inversão, o que é muito mais."],
        ["Insertion sort: desloca elementos um a um.", "Cada deslocamento também custa uma cópia."],
        ["Nenhum: todos fazem o mesmo número de trocas.", "O número de trocas difere bastante."]
      ]
    },
    {
      q: "Em quais métodos a ordem de elementos <strong>iguais</strong> se mantém, desde que a troca ou o deslocamento só ocorra quando o anterior é estritamente maior?",
      opts: [
        ["Bubble e insertion: iguais nunca passam um pelo outro.", "Só trocam ou deslocam quando o da esquerda é maior; iguais ficam onde estão."],
        ["Só o selection sort.", "O selection troca elementos distantes e pode inverter a ordem de iguais."],
        ["Nenhum dos três.", "Bubble e insertion, com a comparação estrita, são estáveis."],
        ["Os três, sempre.", "O selection pode inverter a ordem de iguais."]
      ]
    }
  ];
})();
