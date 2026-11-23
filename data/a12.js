/* A12 · Listas simplesmente ligadas — Exercícios A12 (7 questões) + exercícios montados dos slides. */
(function () {
  var R = String.raw;
  var L = 'Exercícios A12, questão ';
  var S = 'Slides A12, ';
  var NO = 'typedef struct No { int info; struct No *prox; } No;\n' +
    'No *criar_no(int v) { No *n = (No *) malloc(sizeof(No)); if (n == NULL) exit(1); n->info = v; n->prox = NULL; return n; }\n' +
    'No *inserir_final(No *l, int v) { No *n = criar_no(v); if (l == NULL) return n; No *a = l; while (a->prox != NULL) a = a->prox; a->prox = n; return l; }';
  var MONTA = function (nome, vals) { return 'No *' + nome + ' = NULL;\n' + vals.map(function (v) { return nome + ' = inserir_final(' + nome + ', ' + v + ');'; }).join('\n'); };
  (window.EXS = window.EXS || {}).a12 = [

  { id: 'a12-s01', topic: 't-intro', ref: S + '“Imagine que...”', title: 'Vetor ou lista', type: 'mc', make: function (p) {
    return { q: p.q, opts: [[p.ok, p.w], ['Um vetor estático, porque é mais simples.', 'Tamanho fixo e deslocamentos a cada inserção no meio.'], ['Um vetor com malloc, porque nunca precisa deslocar elementos.', 'Inserir no meio de um vetor, alocado ou não, desloca os seguintes.'], ['Tanto faz: vetor e lista guardam os elementos em posições consecutivas.', 'Na lista os nós ficam espalhados; cada um aponta para o próximo.']] };
  }, p: [
    { q: 'Uma fila de espera muda o tempo todo: pessoas entram no fim, desistem no meio e às vezes entram numa posição específica. O tamanho é imprevisível. Qual estrutura combina melhor?', ok: 'Uma lista ligada: cada nó é alocado quando precisa e inserir ou remover não desloca os outros.', w: 'É o cenário dos slides.' },
    { q: 'Um editor guarda as linhas de um texto, e o usuário insere linhas novas no meio o tempo inteiro. Qual estrutura evita deslocar todas as linhas seguintes?', ok: 'Uma lista ligada: inserir no meio só muda dois ponteiros.', w: 'Basta religar o prox do anterior e o do novo nó.' },
    { q: 'Um sistema de pedidos não sabe quantos pedidos terá no dia e remove pedidos cancelados de qualquer posição. O que usar?', ok: 'Uma lista ligada, que cresce nó a nó e remove sem deslocar.', w: 'Tamanho imprevisível e remoção no meio são os pontos fortes da lista.' }] },

  { id: 'a12-s02', topic: 't-no', ref: S + 'estrutura de um nó', title: 'Definir o nó', type: 'drag', make: function (p) {
    return { q: 'Complete a definição de um nó que guarda ' + p.d + ' e aponta para o próximo, e o acesso aos campos.', code: R`typedef [[struct ${p.n}]] {
    ${p.t} ${p.c};
    [[struct ${p.n} *]]prox;
}
${p.n};

${p.n} *p = criar();
printf("${p.f}\n", [[p->${p.c}]]);
p = [[p->prox]];`, extra: [['struct', 'Sem o rótulo, o campo prox não teria como se referir à própria struct.'], [p.n, 'Dentro da definição o typedef ainda não existe: use `struct ' + p.n + ' *`.'], ['p.' + p.c, 'p é ponteiro: seta.'], ['p.prox', 'p é ponteiro: seta.']],
      why: 'Estrutura autorreferenciada: o campo prox é `struct ' + p.n + ' *`.',
      pin: 'p = NULL;', nocc: true };
  }, p: [{ n: 'No', t: 'int', c: 'info', d: 'um inteiro', f: '%d' }, { n: 'Nodo', t: 'float', c: 'valor', d: 'um float', f: '%f' }, { n: 'Elem', t: 'char', c: 'letra', d: 'um caractere', f: '%c' }] },

  { id: 'a12-s03', topic: 't-criar', ref: S + 'criar_no', title: 'Criar um nó', type: 'fix', make: function (p) {
    return { q: '<code>criar_no</code> aloca um nó, preenche e devolve. Ache a linha errada.', code: R`No *criar_no(int val) {
    No *no = (No *) malloc(${p.size});
    if (no == NULL)
        exit(1);
    no->info = val;
    no->prox = ${p.prox};
    return no;
}`, line: p.line,
      fixes: p.line === 2 ? [['No *no = (No *) malloc(sizeof(No));', 'Um nó inteiro: sizeof(No).'], ['No *no = (No *) malloc(sizeof(No *));', 'Tamanho de um ponteiro, pequeno demais para o nó.'], ['No *no = (No *) malloc(sizeof(int));', 'Só cabe o info, falta o prox.']]
        : [['no->prox = NULL;', 'Nó recém-criado ainda não tem sucessor.'], ['no->prox = no;', 'O nó apontaria para si mesmo: laço infinito ao percorrer.'], ['no.prox = NULL;', 'no é ponteiro: seta.']],
      why: p.line === 2 ? 'Aloca-se o nó completo, com info e prox.' : 'O prox de um nó novo começa NULL.', pre: 'typedef struct No { int info; struct No *prox; } No;' };
  }, p: [{ size: 'sizeof(No *)', prox: 'NULL', line: 2 }, { size: 'sizeof(No)', prox: 'no', line: 6 }, { size: 'sizeof(int)', prox: 'NULL', line: 2 }] },

  { id: 'a12-s04', topic: 't-inserir', ref: S + 'inserir_inicio e inserir_final', title: 'Inserir na ordem certa', type: 'mc', make: function (p) {
    return { q: 'Começando com a lista vazia, o programa faz as chamadas abaixo. Qual é a saída?', saida: true, pre: NO, code: R`No *inserir_inicio(No *l, int v) {
    No *n = criar_no(v);
    n->prox = l;
    return n;
}

int main() {
    No *lista = NULL;
    ${p.ops}
    for (No *a = lista; a != NULL; a = a->prox)
        printf("%d ", a->info);
    return 0;
}`, opts: [[p.ok, 'Início empurra para a frente; final vai para o fim.'], [p.a, 'Confira a ordem: inserir no início coloca o nó ANTES dos outros.'], [p.b, 'Cada chamada insere um nó; nenhum se perde.'], [p.c, 'inserir_final anexa depois do último.']] };
  }, p: [
    { ops: 'lista = inserir_inicio(lista, 13);\n    lista = inserir_inicio(lista, 27);\n    lista = inserir_final(lista, 5);', ok: '27 13 5', a: '13 27 5', b: '27 5', c: '5 27 13' },
    { ops: 'lista = inserir_final(lista, 1);\n    lista = inserir_final(lista, 2);\n    lista = inserir_inicio(lista, 3);', ok: '3 1 2', a: '1 2 3', b: '3 2', c: '2 1 3' },
    { ops: 'lista = inserir_inicio(lista, 8);\n    lista = inserir_final(lista, 9);\n    lista = inserir_inicio(lista, 7);', ok: '7 8 9', a: '8 9 7', b: '7 9', c: '9 8 7' }] },

  { id: 'a12-s05', topic: 't-inserir', ref: S + 'inserir_final', title: 'Completar o inserir_final', type: 'drag', make: function (p) {
    return { q: 'Complete a inserção no final (o slide usa <code>' + p.vz + '</code> para testar se a lista está vazia).', code: R`No *inserir_final(No *lista, int val) {
    No *no = criar_no(val);
    if (${p.vz}(lista))
        return [[no]];
    No *aux = lista;
    while ([[aux->prox != NULL]])
        aux = [[aux->prox]];
    [[aux->prox]] = no;
    return lista;
}`, extra: [['aux != NULL', 'Assim o laço passa do último e aux vira NULL: `aux->prox = no` quebraria.'], ['lista', 'Lista vazia: o novo nó é a lista inteira.'], ['aux++', 'Nós não são contíguos; anda-se por prox.'], ['lista->prox', 'Ligaria o novo logo depois do primeiro, perdendo o resto.']],
      why: 'Para no último nó (prox NULL) e liga o novo ali; a cabeça não muda.',
      pre: 'typedef struct No { int info; struct No *prox; } No;\nNo *criar_no(int v);\nint ' + p.vz + '(No *l);' };
  }, p: [{ vz: 'lista_vazia' }, { vz: 'listaVazia' }, { vz: 'vazia' }] },

  { id: 'a12-q01', topic: 't-percorrer', ref: L + '1', title: 'Imprimir a lista', type: 'drag', make: function (p) {
    return { q: 'Complete a função que imprime todos os elementos ou avisa que a lista está vazia.', code: R`void ${p.f}(No *${p.l}) {
    if ([[${p.l} == NULL]]) {
        printf("Lista vazia\n");
        return;
    }
    No *aux = [[${p.l}]];
    while ([[aux != NULL]]) {
        printf("%d ", aux->info);
        [[aux = aux->prox]];
    }
}`, extra: [['aux->prox != NULL', 'Pararia antes de imprimir o último nó.'], [p.l + '->prox', 'Começaria do segundo nó.'], ['aux++', 'Nós não ficam lado a lado; anda-se por prox.'], [p.l + ' != NULL', 'O aviso é para quando a lista É vazia.']],
      why: 'Percorre-se até aux virar NULL, avançando com `aux = aux->prox`.', pre: 'typedef struct No { int info; struct No *prox; } No;' };
  }, p: [{ f: 'imprimir', l: 'lista' }, { f: 'mostrar', l: 'inicio' }, { f: 'exibir', l: 'cabeca' }] },

  { id: 'a12-q02', topic: 't-percorrer', ref: L + '2', title: 'Contar elementos', type: 'mc', make: function (p) {
    return { q: 'Qual a saída?', saida: true, pre: NO, code: R`int contar(No *lista) {
    if (lista == NULL) {
        printf("vazia ");
        return 0;
    }
    int c = 0;
    for (No *a = lista; a != NULL; a = a->prox)
        c++;
    return c;
}

int main() {
    ${MONTA('l', p.v)}
    No *vazia = NULL;
    printf("%d %d\n", contar(l), contar(vazia));
    return 0;
}`, opts: [['vazia ' + p.v.length + ' 0', 'Os argumentos são avaliados antes de o printf imprimir: a mensagem da lista vazia sai primeiro.'], [p.v.length + ' 0', 'A função imprime "vazia " para a segunda lista antes do printf da main.'], ['vazia ' + (p.v.length - 1) + ' 0', 'O laço conta todos os nós, inclusive o último.'], [p.v.length + ' vazia 0', 'A mensagem é impressa durante a avaliação dos argumentos, antes do printf da main.']] };
  }, p: [{ v: [13, 65, 82, 34] }, { v: [7, 7] }, { v: [1, 2, 3, 4, 5, 6] }] },

  { id: 'a12-q03', topic: 't-percorrer', ref: L + '3', title: 'Duas listas iguais?', type: 'fix', make: function (p) {
    return { q: 'A função deve devolver 1 se as listas têm os mesmos valores na mesma ordem e o mesmo tamanho. Para ' + p.ex + ' ela erra. Ache a linha.', code: R`int iguais(No *a, No *b) {
    while (a != NULL && b != NULL) {
        if (a->info != b->info)
            return 0;
        a = a->prox;
        ${p.av};
    }
    return ${p.ret};
}`, line: p.line,
      fixes: p.line === 8 ? [['return a == NULL && b == NULL;', 'Só são iguais se as duas acabaram juntas.'], ['return 1;', 'Listas de tamanhos diferentes passariam como iguais.'], ['return 0;', 'Listas iguais também chegariam aqui e devolveriam 0.']]
        : [['b = b->prox;', 'As duas avançam juntas.'], ['b = a->prox;', 'b pularia para a lista a.'], ['a = a->prox;', 'a avançaria duas vezes.']],
      why: p.line === 8 ? 'O laço para quando UMA acaba; é preciso conferir se a outra também acabou.' : 'Os dois auxiliares andam um passo por volta.', pre: 'typedef struct No { int info; struct No *prox; } No;' };
  }, p: [{ ex: '{1, 2} e {1, 2, 3}', av: 'b = b->prox', ret: '1', line: 8 }, { ex: '{4, 5, 6} e {4, 9, 6}', av: 'b = a->prox', ret: 'a == NULL && b == NULL', line: 6 }, { ex: '{2, 4} e {2, 4, 8}', av: 'b = b->prox', ret: '1', line: 8 }] },

  { id: 'a12-q04', topic: 't-percorrer', ref: L + '4', title: 'Média dos valores', type: 'mc', make: function (p) {
    return { q: 'Qual a saída?', saida: true, pre: NO, code: R`float media(No *lista) {
    int soma = 0, n = 0;
    for (No *a = lista; a != NULL; a = a->prox) {
        soma += a->info;
        n++;
    }
    if (n == 0)
        return 0;
    return ${p.expr};
}

int main() {
    ${MONTA('l', p.v)}
    printf("%.2f\n", media(l));
    return 0;
}`, opts: p.opts };
  }, p: [
    { v: [3, 4, 4], expr: '(float) soma / n', opts: [['3.67', '11 / 3 com conversão para float.'], ['3.00', 'Isso seria divisão inteira; o `(float)` evita.'], ['11.00', 'Faltou dividir pela quantidade.'], ['4.00', 'A média não é o valor mais frequente.']] },
    { v: [3, 4, 4], expr: 'soma / n', opts: [['3.00', 'soma e n são int: 11 / 3 dá 3 antes de virar float.'], ['3.67', 'Sem `(float)` a divisão é inteira.'], ['11.00', 'Faltou dividir pela quantidade.'], ['3.66', 'Mesmo com float, o arredondamento daria 3.67.']] },
    { v: [10, 5, 2, 8], expr: '(float) soma / n', opts: [['6.25', '25 / 4.'], ['6.00', 'Divisão inteira; o `(float)` evita.'], ['25.00', 'Faltou dividir por 4.'], ['8.33', 'São 4 nós, não 3.']] }] },

  { id: 'a12-q05', topic: 't-percorrer', ref: L + '5', title: 'Ocorrências de um elemento', type: 'drag', make: function (p) {
    return { q: 'Complete a contagem de quantas vezes <code>' + p.x + '</code> aparece. Em ' + p.ex + ' o resultado é ' + p.r + '.', code: R`int ocorrencias(No *lista, int ${p.x}) {
    int cont = 0;
    No *aux = lista;
    while (aux != NULL) {
        if ([[aux->info == ${p.x}]])
            cont++;
        [[aux = aux->prox]];
    }
    return [[cont]];
}`, extra: [['aux == ' + p.x, 'Compara o endereço do nó com um inteiro; o valor está em info.'], ['aux->prox == ' + p.x, 'prox é um ponteiro.'], ['return aux', 'Devolve-se a contagem.'], ['aux->info', 'Falta comparar com ' + p.x + '.']],
      why: 'Compara-se `aux->info` e anda-se com `aux = aux->prox` a cada volta.', pre: 'typedef struct No { int info; struct No *prox; } No;' };
  }, p: [{ x: 'x', ex: '{5, 3, 5, 5}', r: 3 }, { x: 'valor', ex: '{1, 2, 3}', r: 0 }, { x: 'alvo', ex: '{9, 9}', r: 2 }] },

  { id: 'a12-q06', topic: 't-buscar', ref: L + '6', title: 'Trocar dois elementos', type: 'fix', make: function (p) {
    return { q: 'A função troca os valores dos nós com as chaves m e n (trocando os campos info). Ache a linha errada.', code: R`void trocar(No *lista, int m, int n) {
    No *pm = buscar(lista, m);
    No *pn = buscar(lista, n);
    if (pm == NULL || pn == NULL) return;
    int aux = pm->info;
    ${p.l6};
    ${p.l7};
}`, line: p.line,
      fixes: p.line === 6 ? [['pm->info = pn->info;', 'Primeiro m recebe o valor de n.'], ['pm = pn;', 'Troca só o ponteiro local; a lista não muda.'], ['pm->prox = pn->prox;', 'Isso religa nós e quebra a lista.']]
        : [['pn->info = aux;', 'n recebe o valor antigo de m, guardado em aux.'], ['pn->info = pm->info;', 'pm->info já foi sobrescrito; os dois ficariam iguais.'], ['pn = aux;', 'aux é um int; pn é ponteiro.']],
      why: 'Troca com auxiliar, mexendo só nos campos info.', pre: 'typedef struct No { int info; struct No *prox; } No;\nNo *buscar(No *l, int v);' };
  }, p: [{ l6: 'pm = pn', l7: 'pn->info = aux', line: 6 }, { l6: 'pm->info = pn->info', l7: 'pn->info = pm->info', line: 7 }, { l6: 'pm->prox = pn->prox', l7: 'pn->info = aux', line: 6 }] },

  { id: 'a12-q07', topic: 't-buscar', ref: L + '7', title: 'search e searchinsert', type: 'drag', make: function (p) {
    return { q: 'Complete <code>search</code> (devolve o nó com x ou NULL) e <code>searchinsert</code> (se não achar, insere ' + p.onde + ' e devolve o nó com x). Use <code>No **l</code> para que a cabeça possa mudar.', code: R`No *search(No *l, int x) {
    for (No *a = l; a != NULL; a = a->prox)
        if (a->info == x)
            return [[a]];
    return [[NULL]];
}

No *searchinsert(No **l, int x) {
    No *r = search([[*l]], x);
    if (r != NULL)
        return r;
    No *novo = criar_no(x);
    ${p.ins}
    return [[novo]];
}`, extra: [['l', 'Em searchinsert, l é No **; search espera a cabeça, `*l`.'], ['&a', 'Endereço da variável local a.'], ['r', 'r é NULL aqui; quem contém x é o nó novo.'], ['0', 'O retorno é ponteiro: NULL.']],
      why: 'Se a busca falha, cria o nó, liga na lista e devolve o próprio nó novo.',
      pre: 'typedef struct No { int info; struct No *prox; } No;\nNo *criar_no(int v);' };
  }, p: [
    { onde: 'no início', ins: 'novo->prox = *l;\n    *l = novo;' },
    { onde: 'no final', ins: 'if (*l == NULL) *l = novo;\n    else { No *a = *l; while (a->prox != NULL) a = a->prox; a->prox = novo; }' },
    { onde: 'no início', ins: 'novo->prox = *l;\n    *l = novo;   /* a cabeça muda */' }] },

  { id: 'a12-s06', topic: 't-liberar', ref: S + 'liberar_lista', title: 'Liberar sem perder o caminho', type: 'fix', make: function (p) {
    return { q: 'A função libera todos os nós. Ache a linha errada.', code: R`No *liberar_lista(No *lista) {
    No *aux = lista;
    while (lista != NULL) {
        ${p.a}
        ${p.b}
        ${p.c}
    }
    return NULL;
}`, line: p.line,
      fixes: [[p.fix, p.fw], [p.d1, p.w1], [p.d2, p.w2]],
      why: 'Guarde o nó atual, avance a cabeça e só então libere o nó guardado.', pre: 'typedef struct No { int info; struct No *prox; } No;' };
  }, p: [
    { a: 'aux = lista;', b: 'lista = lista->prox->prox;', c: 'free(aux);', line: 5, fix: 'lista = lista->prox;', fw: 'Avança um nó por vez.', d1: 'lista = aux;', w1: 'lista nunca avança: laço infinito.', d2: 'free(lista);', w2: 'Liberaria o nó atual antes de guardar o caminho.' },
    { a: 'aux = lista;', b: 'lista = lista->prox;', c: 'free(lista);', line: 6, fix: 'free(aux);', fw: 'aux guarda o nó que ficou para trás.', d1: 'free(lista->prox);', w1: 'Liberaria o nó errado e pularia nós.', d2: 'free(*aux);', w2: 'free recebe o ponteiro.' },
    { a: 'aux = lista->prox;', b: 'lista = lista->prox;', c: 'free(aux);', line: 4, fix: 'aux = lista;', fw: 'aux precisa guardar o nó atual antes de lista avançar.', d1: 'aux = NULL;', w1: 'free(NULL) não libera nada: vazamento.', d2: 'lista = aux;', w2: 'Não guarda o nó atual.' }] }
  ];
})();

/* Variantes V2 e V3 escritas à mão (2026-11-18): outra tarefa, outra lógica, outro erro. V1 vem dos moldes acima.
   Gerado por _tools/gerar_alt.mjs a partir de _tools/alt/a12.alt.js; null = a versão do molde continua valendo. */
(function () {
  window.ALT = window.ALT || {};
  window.ALT['a12-s01'] = [
    {
      q: "Um programa precisa acessar diretamente o 500º elemento de uma coleção, várias vezes por segundo, e o tamanho quase não muda. Qual estrutura combina melhor?",
      opts: [
        ["Um vetor: o índice leva direto à posição, sem percorrer os anteriores.", "Acesso por posição em tempo constante é a grande vantagem do vetor."],
        ["Uma lista ligada: cada nó sabe onde está o seguinte.", "Para chegar ao 500º é preciso passar pelos 499 anteriores."],
        ["Uma lista ligada, porque nunca precisa de malloc.", "Cada nó da lista é alocado com malloc."],
        ["Tanto faz: o tempo de acesso é igual nas duas.", "O acesso por posição é bem mais rápido no vetor."]
      ]
    },
    {
      q: "Qual é uma desvantagem da lista ligada em relação ao vetor?",
      opts: [
        ["Para chegar a um elemento é preciso percorrer os nós desde o início; não existe `lista[i]`.", "Os nós não são consecutivos; só se chega a um deles seguindo os ponteiros."],
        ["Ela precisa de um bloco contíguo de memória.", "Quem precisa de bloco contíguo é o vetor."],
        ["Inserir no meio obriga a deslocar os elementos seguintes.", "Isso acontece no vetor; na lista só mudam ponteiros."],
        ["O tamanho tem de ser definido antes de usar.", "A lista cresce nó a nó, sem tamanho prévio."]
      ]
    }
  ];
  window.ALT['a12-s02'] = [
    {
      q: "Complete a definição de um nó que guarda o registro de uma pessoa (nome e idade) e aponta para o próximo, e o acesso aos campos.",
      code: "typedef struct Pessoa {\n    char nome[30];\n    int idade;\n    [[struct Pessoa *]]prox;\n}\n[[Pessoa]];\n\nPessoa *p = criar();\nprintf(\"%s %d\\n\", [[p->nome]], p->idade);\np = [[p->prox]];",
      extra: [
        ["Pessoa *", "Dentro da definição o alias ainda não existe: use `struct Pessoa *`."],
        ["struct Pessoa", "O alias que o resto do programa usa precisa vir depois da chave."],
        ["p.nome", "p é ponteiro: seta."],
        ["*p->prox", "Isso seria o nó seguinte inteiro, não o seu endereço."]
      ],
      why: "O nó tem os dados da pessoa e um ponteiro `struct Pessoa *` para o próximo; o alias vem depois da chave.",
      pin: "p = NULL;",
      nocc: true
    },
    {
      q: "O nó usa um rótulo e um alias diferentes: <code>struct No</code> e <code>Celula</code>. Complete a definição e o acesso ao <strong>segundo</strong> nó da lista.",
      code: "typedef struct No {\n    int info;\n    [[struct No *]]prox;\n}\n[[Celula]];\n\nCelula *p = criar();\nif ([[p->prox != NULL]])\n    printf(\"%d\\n\", [[p->prox->info]]);",
      extra: [
        ["Celula *", "Dentro da definição o alias ainda não existe."],
        ["No", "O alias é Celula; `No` só existe como rótulo da struct."],
        ["p->info != NULL", "info é um inteiro, não um ponteiro."],
        ["p->info->prox", "info não é ponteiro; a ordem dos campos está trocada."]
      ],
      why: "O rótulo `struct No` permite o campo autorreferenciado; o alias `Celula` é o nome usado fora. O segundo nó é `p->prox`.",
      pin: "p = NULL;",
      nocc: true
    }
  ];
  window.ALT['a12-s03'] = [
    {
      q: "<code>criar_no</code> aloca um nó, preenche e devolve. Ache a linha errada.",
      code: "No *criar_no(int val) {\n    No *no = (No *) malloc(sizeof(No));\n    if (no != NULL)\n        exit(1);\n    no->info = val;\n    no->prox = NULL;\n    return no;\n}",
      line: 3,
      fixes: [
        ["if (no == NULL)", "O programa deve encerrar quando a alocação falha."],
        ["if (no)", "Encerraria quando a alocação deu certo."],
        ["if (*no == NULL)", "`*no` é a struct, não um ponteiro."]
      ],
      why: "Falha de alocação é `no == NULL`; com `!=` o programa encerraria justamente quando deu certo.",
      pre: "typedef struct No { int info; struct No *prox; } No;"
    },
    {
      q: "<code>criar_no</code> aloca um nó, preenche e devolve. Ache a linha errada.",
      code: "No *criar_no(int val) {\n    No *no = (No *) malloc(sizeof(No));\n    if (no == NULL)\n        exit(1);\n    no.info = val;\n    no->prox = NULL;\n    return no;\n}",
      line: 5,
      fixes: [
        ["no->info = val;", "no é ponteiro: o acesso ao campo é pela seta."],
        ["*no.info = val;", "O ponto tem precedência; tentaria desreferenciar o campo."],
        ["no->info == val;", "Só compararia."]
      ],
      why: "`no` é um ponteiro para o nó: os campos se acessam com `->`.",
      pre: "typedef struct No { int info; struct No *prox; } No;"
    }
  ];
  window.ALT['a12-s05'] = [
    {
      q: "Complete a inserção no início da lista e a chamada na main.",
      code: "No *inserir_inicio(No *lista, int val) {\n    No *no = criar_no(val);\n    [[no->prox]] = [[lista]];\n    return [[no]];\n}\n\n/* na main: */\nNo *lista = NULL;\nlista = [[inserir_inicio(lista, 7)]];",
      extra: [
        ["lista->prox", "O ponteiro a atualizar é o do nó novo."],
        ["NULL", "Perderia os nós que já estão na lista."],
        ["lista->info", "Um campo não é o endereço da nova cabeça."],
        ["inserir_inicio(&lista, 7)", "A função recebe o ponteiro da cabeça, não o endereço dele."]
      ],
      why: "O nó novo aponta para a antiga cabeça e vira a nova cabeça: `no->prox = lista; return no;`.",
      pre: "typedef struct No { int info; struct No *prox; } No;\nNo *criar_no(int v) { No *n = (No *) malloc(sizeof(No)); if (n == NULL) exit(1); n->info = v; n->prox = NULL; return n; }\nNo *inserir_final(No *l, int v) { No *n = criar_no(v); if (l == NULL) return n; No *a = l; while (a->prox != NULL) a = a->prox; a->prox = n; return l; }"
    },
    {
      q: "Complete a inserção de um nó <strong>depois</strong> de um nó já existente, sem perder o resto da lista.",
      code: "void inserir_depois(No *ref, int val) {\n    if ([[ref == NULL]])\n        return;\n    No *novo = criar_no(val);\n    [[novo->prox]] = ref->prox;\n    ref->prox = [[novo]];\n}",
      extra: [
        ["ref != NULL", "Sairia justamente quando o nó existe."],
        ["ref->prox", "O prox do novo precisa do que vinha depois de ref."],
        ["*novo", "Seria a struct, não o endereço."],
        ["ref", "ref->prox deve apontar para o novo, não para si mesmo."]
      ],
      why: "Primeiro o nó novo herda o seguinte de ref; só então ref passa a apontar para o novo.",
      pre: "typedef struct No { int info; struct No *prox; } No;\nNo *criar_no(int v) { No *n = (No *) malloc(sizeof(No)); if (n == NULL) exit(1); n->info = v; n->prox = NULL; return n; }\nNo *inserir_final(No *l, int v) { No *n = criar_no(v); if (l == NULL) return n; No *a = l; while (a->prox != NULL) a = a->prox; a->prox = n; return l; }"
    }
  ];
  window.ALT['a12-q01'] = [
    {
      q: "Complete a função que soma todos os elementos da lista (lista vazia soma 0).",
      code: "int somar(No *lista) {\n    int soma = 0;\n    for (No *a = [[lista]]; [[a != NULL]]; [[a = a->prox]])\n        soma += [[a->info]];\n    return soma;\n}",
      extra: [
        ["lista->prox", "Pularia o primeiro nó."],
        ["a->prox != NULL", "Pararia antes do último nó."],
        ["a++", "Nós não são consecutivos na memória."],
        ["a.info", "a é ponteiro: use a seta."]
      ],
      why: "O laço começa na cabeça, para quando `a` é NULL e avança por `a->prox`.",
      pre: "typedef struct No { int info; struct No *prox; } No;\nNo *criar_no(int v) { No *n = (No *) malloc(sizeof(No)); if (n == NULL) exit(1); n->info = v; n->prox = NULL; return n; }\nNo *inserir_final(No *l, int v) { No *n = criar_no(v); if (l == NULL) return n; No *a = l; while (a->prox != NULL) a = a->prox; a->prox = n; return l; }"
    },
    {
      q: "Complete a função que imprime a lista no formato <code>1 -> 2 -> 3</code>, sem seta depois do último.",
      code: "void imprimir(No *lista) {\n    No *aux = [[lista]];\n    while ([[aux != NULL]]) {\n        printf(\"%d\", aux->info);\n        if ([[aux->prox != NULL]])\n            printf(\" -> \");\n        [[aux = aux->prox]];\n    }\n    printf(\"\\n\");\n}",
      extra: [
        ["lista->prox", "Começaria no segundo nó."],
        ["aux->prox == NULL", "Pararia antes do último nó e não entraria no laço."],
        ["aux == NULL", "Com essa condição não entra no laço."],
        ["aux++", "Nós não são consecutivos na memória."]
      ],
      why: "A seta só é impressa quando existe um próximo nó; por isso o teste `aux->prox != NULL` fica dentro do laço.",
      pre: "typedef struct No { int info; struct No *prox; } No;\nNo *criar_no(int v) { No *n = (No *) malloc(sizeof(No)); if (n == NULL) exit(1); n->info = v; n->prox = NULL; return n; }\nNo *inserir_final(No *l, int v) { No *n = criar_no(v); if (l == NULL) return n; No *a = l; while (a->prox != NULL) a = a->prox; a->prox = n; return l; }"
    }
  ];
  window.ALT['a12-q02'] = [
    {
      q: "Qual a saída?",
      saida: true,
      pre: "typedef struct No { int info; struct No *prox; } No;\nNo *criar_no(int v) { No *n = (No *) malloc(sizeof(No)); if (n == NULL) exit(1); n->info = v; n->prox = NULL; return n; }\nNo *inserir_final(No *l, int v) { No *n = criar_no(v); if (l == NULL) return n; No *a = l; while (a->prox != NULL) a = a->prox; a->prox = n; return l; }",
      code: "int posicao(No *lista, int x) {\n    int i = 0;\n    for (No *a = lista; a != NULL; a = a->prox, i++)\n        if (a->info == x)\n            return i;\n    return -1;\n}\n\nint main() {\n    No *l = NULL;\n    l = inserir_final(l, 4);\n    l = inserir_final(l, 9);\n    l = inserir_final(l, 7);\n    l = inserir_final(l, 9);\n    printf(\"%d %d %d\\n\", posicao(l, 9), posicao(l, 7), posicao(l, 5));\n    return 0;\n}",
      opts: [
        ["1 2 -1", "As posições começam em 0 e a busca para na primeira ocorrência: 9 está na posição 1, 7 na 2, e 5 não existe."],
        ["2 3 -1", "Contou as posições a partir de 1."],
        ["3 2 -1", "Devolveu a última ocorrência do 9; a busca para na primeira."],
        ["1 2 0", "O valor que não existe devolve -1."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      pre: "typedef struct No { int info; struct No *prox; } No;\nNo *criar_no(int v) { No *n = (No *) malloc(sizeof(No)); if (n == NULL) exit(1); n->info = v; n->prox = NULL; return n; }\nNo *inserir_final(No *l, int v) { No *n = criar_no(v); if (l == NULL) return n; No *a = l; while (a->prox != NULL) a = a->prox; a->prox = n; return l; }",
      code: "int somaAlternada(No *lista) {\n    int s = 0, sinal = 1;\n    for (No *a = lista; a != NULL; a = a->prox) {\n        s += sinal * a->info;\n        sinal = -sinal;\n    }\n    return s;\n}\n\nint main() {\n    No *l = NULL;\n    l = inserir_final(l, 10);\n    l = inserir_final(l, 4);\n    l = inserir_final(l, 7);\n    l = inserir_final(l, 1);\n    printf(\"%d %d\\n\", somaAlternada(l), somaAlternada(NULL));\n    return 0;\n}",
      opts: [
        ["12 0", "10 − 4 + 7 − 1 = 12; a lista vazia não entra no laço e devolve 0."],
        ["22 0", "Somou tudo, sem trocar o sinal."],
        ["-12 0", "O primeiro termo entra com sinal positivo."],
        ["6 0", "Parou depois do segundo nó (10 − 4)."]
      ]
    }
  ];
  window.ALT['a12-q03'] = [
    {
      q: "A função deve devolver 1 se as duas listas têm os mesmos valores na mesma ordem. Para {1, 2, 3} e {1, 2, 3} ela devolve 0. Ache a linha.",
      code: "int iguais(No *a, No *b) {\n    while (a != NULL && b != NULL) {\n        if (a->info == b->info)\n            return 0;\n        a = a->prox;\n        b = b->prox;\n    }\n    return a == NULL && b == NULL;\n}",
      line: 3,
      fixes: [
        ["if (a->info != b->info)", "Só devolve 0 quando encontra valores diferentes."],
        ["if (a->prox != b->prox)", "Compara endereços de nós, não valores."],
        ["if (a != b)", "Compara os endereços dos nós, que são sempre diferentes."]
      ],
      why: "A condição estava invertida: o 0 só deve sair quando os valores são diferentes.",
      pre: "typedef struct No { int info; struct No *prox; } No;"
    },
    {
      q: "A função deve devolver 1 se as duas listas são iguais. Para {1, 2} e {1, 2, 3} o programa trava. Ache a linha.",
      code: "int iguais(No *a, No *b) {\n    while (a != NULL || b != NULL) {\n        if (a->info != b->info)\n            return 0;\n        a = a->prox;\n        b = b->prox;\n    }\n    return 1;\n}",
      line: 2,
      fixes: [
        ["while (a != NULL && b != NULL) {", "Para quando uma das duas acaba, sem acessar nó inexistente."],
        ["while (a->prox != NULL || b->prox != NULL) {", "Ainda acessa campo de ponteiro que pode ser NULL."],
        ["while (a != b) {", "Compara endereços das cabeças, não percorre as listas."]
      ],
      why: "Com `||` o laço continua quando só uma lista acabou e `a->info` acessa um ponteiro NULL; é preciso `&&`.",
      pre: "typedef struct No { int info; struct No *prox; } No;"
    }
  ];
  window.ALT['a12-q04'] = [
    {
      q: "Qual a saída?",
      saida: true,
      pre: "typedef struct No { int info; struct No *prox; } No;\nNo *criar_no(int v) { No *n = (No *) malloc(sizeof(No)); if (n == NULL) exit(1); n->info = v; n->prox = NULL; return n; }\nNo *inserir_final(No *l, int v) { No *n = criar_no(v); if (l == NULL) return n; No *a = l; while (a->prox != NULL) a = a->prox; a->prox = n; return l; }",
      code: "int contarMaiores(No *lista, int lim) {\n    int c = 0;\n    for (No *a = lista; a != NULL; a = a->prox)\n        if (a->info > lim)\n            c++;\n    return c;\n}\n\nint main() {\n    No *l = NULL;\n    l = inserir_final(l, 5);\n    l = inserir_final(l, 12);\n    l = inserir_final(l, 8);\n    l = inserir_final(l, 20);\n    l = inserir_final(l, 3);\n    printf(\"%d %d\\n\", contarMaiores(l, 8), contarMaiores(l, 25));\n    return 0;\n}",
      opts: [
        ["2 0", "Maiores que 8 (estritamente): 12 e 20. Nenhum é maior que 25."],
        ["3 0", "O próprio 8 não é maior que 8."],
        ["5 0", "Contou todos os nós."],
        ["2 2", "Nenhum valor passa de 25."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      pre: "typedef struct No { int info; struct No *prox; } No;\nNo *criar_no(int v) { No *n = (No *) malloc(sizeof(No)); if (n == NULL) exit(1); n->info = v; n->prox = NULL; return n; }\nNo *inserir_final(No *l, int v) { No *n = criar_no(v); if (l == NULL) return n; No *a = l; while (a->prox != NULL) a = a->prox; a->prox = n; return l; }",
      code: "int amplitude(No *lista) {\n    int mx = lista->info, mn = lista->info;\n    for (No *a = lista->prox; a != NULL; a = a->prox) {\n        if (a->info > mx)\n            mx = a->info;\n        if (a->info < mn)\n            mn = a->info;\n    }\n    return mx - mn;\n}\n\nint main() {\n    No *l = NULL;\n    l = inserir_final(l, 6);\n    l = inserir_final(l, 11);\n    l = inserir_final(l, 3);\n    l = inserir_final(l, 9);\n    printf(\"%d\\n\", amplitude(l));\n    return 0;\n}",
      opts: [
        ["8", "Maior 11, menor 3: 11 − 3 = 8."],
        ["11", "Esse é só o maior valor."],
        ["3", "Esse é só o menor valor."],
        ["5", "Seria 11 − 6, usando o primeiro nó como menor."]
      ]
    }
  ];
  window.ALT['a12-q05'] = [
    {
      q: "Complete a função que devolve o maior valor de uma lista com pelo menos um nó.",
      code: "int maior(No *lista) {\n    int m = lista->info;\n    No *aux = [[lista->prox]];\n    while (aux != NULL) {\n        if ([[aux->info > m]])\n            m = [[aux->info]];\n        [[aux = aux->prox]];\n    }\n    return m;\n}",
      extra: [
        ["lista", "Compararia o primeiro nó consigo mesmo à toa."],
        ["aux->info > aux", "Compara um valor com um endereço."],
        ["aux", "m guarda um valor, não um endereço."],
        ["aux++", "Nós não são consecutivos na memória."]
      ],
      why: "m começa com o primeiro valor; o laço percorre os demais e atualiza m quando encontra um maior.",
      pre: "typedef struct No { int info; struct No *prox; } No;"
    },
    {
      q: "Complete a função que devolve o endereço do último nó da lista (ou NULL se ela estiver vazia).",
      code: "No *ultimo(No *lista) {\n    if (lista == NULL)\n        return [[NULL]];\n    No *aux = lista;\n    while ([[aux->prox != NULL]])\n        aux = [[aux->prox]];\n    return [[aux]];\n}",
      extra: [
        ["lista", "Devolveria a cabeça, não o último nó."],
        ["aux != NULL", "O laço terminaria com aux NULL e o último nó perdido."],
        ["aux->info", "Seria um valor, e a função devolve ponteiro."],
        ["*aux", "Seria a struct, não o endereço."]
      ],
      why: "O laço para no nó cujo `prox` é NULL, que é o último; aux guarda esse endereço.",
      pre: "typedef struct No { int info; struct No *prox; } No;"
    }
  ];
  window.ALT['a12-q07'] = [
    {
      q: "Os nós agora guardam matrícula e nota. Complete <code>search</code> (devolve o nó com a matrícula, ou NULL) e <code>bonus</code> (soma 1 ponto na nota se a matrícula existir).",
      code: "No *search(No *l, int mat) {\n    for (No *a = l; a != NULL; a = a->prox)\n        if ([[a->mat == mat]])\n            return a;\n    return [[NULL]];\n}\n\nvoid bonus(No *l, int mat) {\n    No *r = search(l, mat);\n    if ([[r != NULL]])\n        [[r->nota]] += 1;\n}",
      extra: [
        ["a->mat = mat", "Atribuiria em vez de comparar."],
        ["0", "Para ponteiros o sinal de \"não achou\" é NULL."],
        ["r == NULL", "Daria bônus justamente quando não achou."],
        ["r.nota", "r é ponteiro: use a seta."]
      ],
      why: "`search` devolve o endereço do nó; `bonus` só mexe nele depois de conferir que não é NULL.",
      pre: "typedef struct No { int mat; float nota; struct No *prox; } No;"
    },
    {
      q: "Complete <code>search</code> e <code>searchinsert</code>, que, se não achar x, o coloca no <strong>final</strong> e devolve o nó. A cabeça pode mudar, por isso <code>No **l</code>.",
      code: "No *search(No *l, int x) {\n    for (No *a = l; a != NULL; a = a->prox)\n        if (a->info == x)\n            return a;\n    return NULL;\n}\n\nNo *searchinsert(No **l, int x) {\n    No *r = search([[*l]], x);\n    if (r != NULL)\n        return r;\n    No *novo = criar_no(x);\n    if ([[*l == NULL]])\n        *l = novo;\n    else {\n        No *a = *l;\n        while ([[a->prox != NULL]])\n            a = a->prox;\n        [[a->prox]] = novo;\n    }\n    return novo;\n}",
      extra: [
        ["l", "l é o endereço da cabeça; search espera a própria cabeça."],
        ["l == NULL", "l nunca é NULL; o que pode ser NULL é a cabeça, `*l`."],
        ["a != NULL", "Passaria do último nó."],
        ["novo->prox", "O novo nó é quem deve ser ligado ao último."]
      ],
      why: "Lista vazia: a cabeça passa a ser o novo nó. Senão, percorre-se até o último nó e liga-se o novo ao seu `prox`.",
      pre: "typedef struct No { int info; struct No *prox; } No;\nNo *criar_no(int v) { No *n = (No *) malloc(sizeof(No)); if (n == NULL) exit(1); n->info = v; n->prox = NULL; return n; }\nNo *inserir_final(No *l, int v) { No *n = criar_no(v); if (l == NULL) return n; No *a = l; while (a->prox != NULL) a = a->prox; a->prox = n; return l; }"
    }
  ];
})();
