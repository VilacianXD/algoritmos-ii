/* A1 · Funções — “Exercícios A1 - Funções” (21) + “Exercícios de Definição e Chamada de Funções em C” (10 + 10 + 19). */
(function () {
  var R = String.raw;
  var A = 'Exercícios A1, questão ';
  var DA = 'Definição e chamada (abertos), questão ';
  var DR = 'Definição e chamada (com retorno), questão ';
  var DP = 'Definição e chamada (programa completo), questão ';

  /* Gerador “definição + chamada”: a alternativa certa e três erros típicos montados a partir dos dados. */
  function defcall(p) {
    var head = function (r, ps) { return r + ' ' + p.nome + '(' + ps + ')'; };
    var call = p.ret === 'void' ? p.nome + '(' + p.args + ');' : p.recv + ' = ' + p.nome + '(' + p.args + ');';
    var o = function (h, c) { return '`' + h + '` · chamada: `' + c + '`'; };
    var opts = [[o(head(p.ret, p.params), call), p.ok || 'Tipo de retorno, nome, parâmetros com tipo separados por vírgula, e a chamada ' + (p.ret === 'void' ? 'sozinha, porque void não devolve valor.' : 'guardando o valor devolvido.')]];
    if (p.params.indexOf(',') >= 0) opts.push([o(head(p.ret, p.params.replace(/,/g, ';')), call), 'Parâmetros se separam com vírgula, não com ponto e vírgula.']);
    else if (p.params && p.params !== 'void') opts.push([o(head(p.ret, p.params.replace(/^.*?(\w+)(\[\])?$/, '$1$2')), call), 'Cada parâmetro precisa do seu tipo.']);
    else opts.push([o(p.ret + ' ' + p.nome + ';', call), 'Sem parênteses isso declara uma variável, não uma função.']);
    if (p.ret !== 'void') {
      opts.push([o(head('void', p.params), call), 'Uma função void não devolve nada; a chamada não teria o que guardar em ' + p.recv + '.']);
      opts.push([o(head(p.ret, p.params), p.nome + '(' + p.args + ');'), 'Compila, mas o valor devolvido se perde: falta guardar ou usar o retorno.']);
    } else {
      opts.push([o(head(p.ret, p.params), 'x = ' + p.nome + '(' + p.args + ');'), 'Função void não devolve valor para ser atribuído.']);
      opts.push([o(head(p.ret, p.params), p.nome + ';'), 'Sem parênteses a função não é chamada.']);
    }
    return { q: p.d, opts: opts, cc: head(p.ret, p.params) + ' {\n' + p.body + '\n}\n/* na main: */\n' + (p.decl || '') + '\n' + call };
  }
  function dc(id, topic, ref, title, ps) { return { id: id, topic: topic, ref: ref, title: title, type: 'mc', make: defcall, p: ps }; }

  (window.EXS = window.EXS || {}).a1 = [

  /* ===== Lista A1 ===== */
  { id: 'a1-l01', topic: 't-motivacao', ref: A + '1', title: 'Cabeçalho reaproveitável', type: 'drag', make: function (p) {
    return { q: 'O cabeçalho “' + p.txt + '” deve aparecer sempre que necessário. Complete a função e as chamadas.', code: R`[[void]] ${p.f}() {
    printf("==============================\n");
    printf("${p.txt}\n");
    printf("==============================\n");
}

int main() {
    [[${p.f}();]]
    printf("Primeira parte\n");
    ${p.f}();
    return 0;
}`, extra: [['int', 'A função não devolve valor; com int faltaria o return.'], [p.f + ';', 'Sem parênteses a função não é chamada.'], ['printf(' + p.f + ');', 'A função já imprime; não se passa o nome dela para o printf.']],
      why: 'Uma função void sem parâmetros, chamada quantas vezes for preciso.' };
  }, p: [{ f: 'cabecalho', txt: 'ALGORITMOS II' }, { f: 'titulo', txt: 'SISTEMAS DE INFORMACAO' }, { f: 'banner', txt: 'UFMT 2026' }] },

  { id: 'a1-l02', topic: 't-parametros', ref: A + '2', title: 'Classificar a temperatura', type: 'fix', make: function (p) {
    return { q: 'Regra: FRIO abaixo de ' + p.a + ' °C, AGRADÁVEL de ' + p.a + ' a ' + p.b + ' °C, QUENTE acima de ' + p.b + ' °C. Para ' + p.t + ' °C a função erra. Ache a linha.', code: R`void classificar(float t) {
    if (${p.c1})
        printf("FRIO\n");
    else if (${p.c2})
        printf("AGRADAVEL\n");
    else
        printf("QUENTE\n");
}`, line: p.line,
      fixes: p.line === 2 ? [['if (t < ' + p.a + ')', p.a + ' °C já é agradável: estritamente menor.'], ['if (t <= ' + p.b + ')', 'Misturaria frio e agradável.'], ['if (t > ' + p.a + ')', 'Inverte a regra.']]
        : [['else if (t <= ' + p.b + ')', p.b + ' °C ainda é agradável.'], ['else if (t < ' + p.b + ')', p.b + ' °C cairia em QUENTE.'], ['else if (t >= ' + p.a + ')', 'Tudo acima de ' + p.a + ' viraria agradável.']],
      why: 'Os limites ' + p.a + ' e ' + p.b + ' pertencem à faixa AGRADÁVEL.' };
  }, p: [{ a: 18, b: 25, t: 25, c1: 't < 18', c2: 't < 25', line: 4 }, { a: 18, b: 25, t: 18, c1: 't <= 18', c2: 't <= 25', line: 2 }, { a: 20, b: 28, t: 28, c1: 't < 20', c2: 't < 28', line: 4 }] },

  { id: 'a1-l03', topic: 't-parametros', ref: A + '3', title: 'Média, situação e repetir', type: 'mc', make: function (p) {
    return { q: 'Entrada: <code>' + p.in + '</code>. Qual a saída?', saida: true, stdin: p.in, code: R`#include <stdio.h>
void analisar(float n1, float n2) {
    float m = (n1 + n2) / 2;
    if (m >= 7.0)
        printf("%.1f APROVADO; ", m);
    else if (m >= 5.0)
        printf("%.1f EXAME; ", m);
    else
        printf("%.1f REPROVADO; ", m);
}

int main() {
    float a, b;
    char resp;
    do {
        scanf("%f %f", &a, &b);
        analisar(a, b);
        scanf(" %c", &resp);
    } while (resp == 's');
    return 0;
}`, opts: [[p.ok, 'Cada par é analisado até a resposta ser diferente de s.'], [p.a, p.wa], [p.b, p.wb], [p.c, p.wc]] };
  }, p: [
    { in: '8 6 s 4 5 n', ok: '7.0 APROVADO; 4.5 REPROVADO;', a: '7.0 EXAME; 4.5 REPROVADO;', wa: 'Média 7,0 já é APROVADO (≥ 7,0).', b: '7.0 APROVADO;', wb: 'A resposta s pede mais uma análise.', c: '7.0 APROVADO; 4.5 EXAME;', wc: '4,5 é menor que 5,0.' },
    { in: '5 5 s 10 9 s 3 2 n', ok: '5.0 EXAME; 9.5 APROVADO; 2.5 REPROVADO;', a: '5.0 REPROVADO; 9.5 APROVADO; 2.5 REPROVADO;', wa: '5,0 entra em EXAME (≥ 5,0).', b: '5.0 EXAME; 9.5 APROVADO;', wb: 'Depois do segundo s há uma terceira análise.', c: '5.0 EXAME;', wc: 'O laço continua enquanto a resposta for s.' },
    { in: '6 7 n', ok: '6.5 EXAME;', a: '6.5 APROVADO;', wa: '6,5 é menor que 7,0.', b: '6.0 EXAME;', wb: 'A média de 6 e 7 é 6,5.', c: '6.5 EXAME; 6.5 EXAME;', wc: 'A resposta n encerra depois da primeira análise.' }] },

  { id: 'a1-l04', topic: 't-parametros', ref: A + '4', title: 'Contagem regressiva', type: 'mc', make: function (p) {
    return { q: 'Qual a saída de <code>contagem(' + p.n + ')</code>?', saida: true, code: R`#include <stdio.h>
void contagem(int n) {
    for (int i = n; ${p.cond}; i--)
        printf("%d ", i);
    printf("INICIAR!");
}

int main() {
    contagem(${p.n});
    return 0;
}`, opts: p.opts };
  }, p: [
    { n: 5, cond: 'i >= 1', opts: [['5 4 3 2 1 INICIAR!', 'De n até 1, decrescendo.'], ['5 4 3 2 1 0 INICIAR!', 'A condição para em 1.'], ['1 2 3 4 5 INICIAR!', 'i começa em n e diminui.'], ['4 3 2 1 INICIAR!', 'i começa no próprio n.']] },
    { n: 3, cond: 'i > 0', opts: [['3 2 1 INICIAR!', '`i > 0` equivale a ir até 1.'], ['3 2 1 0 INICIAR!', '0 não satisfaz i > 0.'], ['2 1 INICIAR!', 'O 3 é impresso.'], ['INICIAR!', 'O laço roda 3 vezes.']] },
    { n: 4, cond: 'i >= 0', opts: [['4 3 2 1 0 INICIAR!', 'Com `>= 0` o zero também sai.'], ['4 3 2 1 INICIAR!', 'Essa seria com `i >= 1`.'], ['0 1 2 3 4 INICIAR!', 'É decrescente.'], ['4 INICIAR!', 'O laço repete.']] }] },

  { id: 'a1-l05', topic: 't-void', ref: A + '5', title: 'Nível de acesso', type: 'drag', make: function (p) {
    return { q: 'Complete a função que mostra a mensagem do nível ' + p.extra + '.', code: R`void acesso(int nivel) {
    switch ([[nivel]]) {
        case 1:
            printf("Acesso basico\n");
            [[break;]]
        case 2:
            printf("Acesso intermediario\n");
            break;
        case 3:
            printf("Acesso completo\n");
            break;
        [[default:]]
            printf("Nivel de acesso invalido\n");
    }
}

/* na main: */
acesso(${p.v});`, extra: [['"nivel"', 'Entre aspas é um texto, não a variável.'], ['continue;', 'continue é para laços; o switch sai com break.'], ['else:', 'No switch o caso “outro valor” é default.'], ['case 0:', 'Pegaria só o 0, não qualquer outro valor.']],
      why: 'Sem break, a execução cairia no case seguinte; default pega os valores não listados. Com ' + p.v + ' a saída é “' + p.saida + '”.' };
  }, p: [{ v: 2, extra: '(1, 2, 3 ou outro)', saida: 'Acesso intermediario' }, { v: 7, extra: '(teste com 7)', saida: 'Nivel de acesso invalido' }, { v: 1, extra: '(teste com 1)', saida: 'Acesso basico' }] },

  { id: 'a1-l06', topic: 't-parametros', ref: A + '6', title: 'Linha de caracteres', type: 'drag', make: function (p) {
    return { q: 'Complete a função que repete um caractere. <code>linha(\'' + p.c + '\', ' + p.n + ')</code> deve mostrar <code>' + p.c.repeat(p.n) + '</code>.', code: R`void linha([[char c]], int n) {
    for (int i = 0; [[i < n]]; i++)
        printf([["%c"]], c);
    printf("\n");
}

/* na main: */
linha('${p.c}', ${p.n});`, extra: [['char c[]', 'Recebe um único caractere, não uma string.'], ['i <= n', 'Imprimiria ' + (p.n + 1) + ' caracteres.'], ['"%d"', '%d mostraria o código numérico do caractere.'], ['"%s"', '%s espera uma string.']],
      why: 'Um laço de n voltas imprimindo o caractere com %c.' };
  }, p: [{ c: '#', n: 10 }, { c: '*', n: 6 }, { c: '=', n: 8 }] },

  { id: 'a1-l07', topic: 't-parametros', ref: A + '7', title: 'Categoria por idade', type: 'fix', make: function (p) {
    return { q: 'Infantil até 12; Juvenil de 13 a 17; Adulto de 18 a 59; Sênior a partir de 60. Para ' + p.t + ' anos a função erra. Ache a linha.', code: R`void categoria(int idade) {
    if (idade <= 12) printf("Infantil\n");
    else if (${p.c1}) printf("Juvenil\n");
    else if (${p.c2}) printf("Adulto\n");
    else printf("Senior\n");
}`, line: p.line,
      fixes: p.line === 3 ? [['else if (idade <= 17) printf("Juvenil\\n");', 'Como 12 já ficou para trás, basta o limite superior.'], ['else if (idade < 17) printf("Juvenil\\n");', '17 é Juvenil.'], ['else if (idade >= 13) printf("Juvenil\\n");', 'Pegaria todos a partir de 13.']]
        : [['else if (idade <= 59) printf("Adulto\\n");', '59 ainda é Adulto; 60 é Sênior.'], ['else if (idade <= 60) printf("Adulto\\n");', '60 já é Sênior.'], ['else if (idade < 59) printf("Adulto\\n");', '59 viraria Sênior.']],
      why: 'Use os limites do enunciado com `<=`.' };
  }, p: [{ t: 17, c1: 'idade < 17', c2: 'idade <= 59', line: 3 }, { t: 60, c1: 'idade <= 17', c2: 'idade <= 60', line: 4 }, { t: 59, c1: 'idade <= 17', c2: 'idade < 59', line: 4 }] },

  { id: 'a1-l08', topic: 't-parametros', ref: A + '8', title: 'Comprovante de compra', type: 'mc', make: function (p) {
    return { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
void comprovante(int qtd, float preco) {
    printf("Quantidade: %d\n", qtd);
    printf("Total: R$ %.2f\n", qtd * preco);
}

int main() {
    comprovante(${p.q}, ${p.p});
    return 0;
}`, opts: [['Quantidade: ' + p.q + '\nTotal: R$ ' + (p.q * p.p).toFixed(2), 'Total = quantidade × preço, com duas casas.'], ['Quantidade: ' + p.q + '\nTotal: R$ ' + p.p.toFixed(2), 'Esse é o valor unitário.'], ['Quantidade: ' + p.q + '\nTotal: R$ ' + (p.q * p.p).toFixed(0), '%.2f mostra duas casas decimais.'], ['Quantidade: ' + p.p + '\nTotal: R$ ' + (p.q * p.p).toFixed(2), 'A ordem dos argumentos define quem é qtd e quem é preço.']] };
  }, p: [{ q: 3, p: 25 }, { q: 4, p: 12.5 }, { q: 7, p: 3.2 }] },

  { id: 'a1-l09', topic: 't-parametros', ref: A + '9', title: 'Retângulo de asteriscos', type: 'drag', make: function (p) {
    return { q: 'Complete para desenhar um retângulo com largura ' + p.l + ' e altura ' + p.a + '.', code: R`void retangulo(int largura, int altura) {
    for (int i = 0; [[i < altura]]; i++) {
        for (int j = 0; [[j < largura]]; j++)
            printf("*");
        [[printf("\n");]]
    }
}

/* na main: */
retangulo(${p.l}, ${p.a});`, extra: [['i < largura', 'O laço de fora conta as linhas: altura.'], ['j < altura', 'O laço de dentro conta os asteriscos da linha: largura.'], ['printf(" ");', 'Cada linha termina com quebra de linha.']],
      why: 'Laço externo = linhas (altura); interno = colunas (largura); quebra de linha ao fim de cada linha.' };
  }, p: [{ l: 5, a: 3 }, { l: 8, a: 2 }, { l: 3, a: 4 }] },

  { id: 'a1-l10', topic: 't-parametros', ref: A + '10', title: 'Painel de senha', type: 'mc', make: function (p) {
    return { q: 'O painel deve mostrar <code>' + p.lbl + ': ' + p.out + '</code> quando a variável vale ' + p.v + '. Qual printf faz isso?', opts: [['`printf("' + p.lbl + ': %0' + p.w + 'd\\n", ' + p.var + ');`', '`%0' + p.w + 'd` completa com zeros à esquerda até ' + p.w + ' dígitos.'], ['`printf("' + p.lbl + ': %' + p.w + 'd\\n", ' + p.var + ');`', 'Sem o 0, completa com espaços.'], ['`printf("' + p.lbl + ': %d\\n", ' + p.var + ');`', 'Mostraria só ' + p.v + '.'], ['`printf("' + p.lbl + ': %0' + (p.w + 2) + 'd\\n", ' + p.var + ');`', 'Teria ' + (p.w + 2) + ' dígitos.']] };
  }, p: [{ lbl: 'GUICHE', var: 'guiche', v: 4, w: 2, out: '04' }, { lbl: 'SENHA', var: 'senha', v: 7, w: 3, out: '007' }, { lbl: 'SALA', var: 'sala', v: 9, w: 2, out: '09' }] },

  { id: 'a1-l11', topic: 't-parametros', ref: A + '11', title: 'Padrão 1, 22, 333', type: 'mc', make: function (p) {
    return { q: 'Qual a saída de <code>padrao(' + p.n + ')</code>?', saida: true, code: R`#include <stdio.h>
void padrao(int n) {
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++)
            printf("%d", ${p.what});
        printf("\n");
    }
}

int main() {
    padrao(${p.n});
    return 0;
}`, opts: p.opts };
  }, p: [
    { n: 3, what: 'i', opts: [['1\n22\n333', 'Linha i repete o número i, i vezes.'], ['1\n12\n123', 'Isso imprimiria j, não i.'], ['111\n22\n3', 'A linha 1 tem um só número.'], ['1\n22', 'Vai até a linha n = 3.']] },
    { n: 4, what: 'i', opts: [['1\n22\n333\n4444', 'Quatro linhas, cada uma com i repetido i vezes.'], ['1\n12\n123\n1234', 'O printf usa i, não j.'], ['1\n22\n333', 'n = 4 gera quatro linhas.'], ['4444\n333\n22\n1', 'Começa da linha 1.']] },
    { n: 3, what: 'i * i', opts: [['1\n44\n999', 'Cada linha repete i×i, i vezes.'], ['1\n22\n333', 'O valor impresso é i * i.'], ['1\n4\n9', 'Cada linha tem i repetições.'], ['1\n24\n369', 'O valor não depende de j.']] }] },

  { id: 'a1-l12', topic: 't-parametros', ref: A + '12', title: 'Padrão 1, 12, 123', type: 'drag', make: function (p) {
    return { q: 'Complete para imprimir, até a linha n = ' + p.n + ':<br><code>' + p.ex + '</code>', code: R`void escada(int n) {
    for (int i = 1; i <= n; i++) {
        for (int j = 1; [[j <= i]]; j++)
            printf("%d", [[${p.v}]]);
        printf("\n");
    }
}`, extra: [['j <= n', 'Todas as linhas teriam n números.'], ['i', 'Repetiria o número da linha: 1, 22, 333.'], ['j < i', 'A linha i teria só i − 1 números.']],
      why: 'A linha i mostra a sequência ' + p.why + '.' };
  }, p: [{ n: 4, v: 'j', ex: '1 / 12 / 123 / 1234', why: '1, 2, …, i' }, { n: 3, v: 'j * 2', ex: '2 / 24 / 246', why: 'dos dobros de 1 até i' }, { n: 5, v: 'j % 10', ex: '1 / 12 / 123 / 1234 / 12345', why: '1, 2, …, i (o % 10 só protege de passar de um dígito)' }] },

  dc('a1-l13', 't-parametros', A + '13', 'Soma de três argumentos', [
    { d: 'Uma função que recebe três inteiros e devolve a soma deles. Qual definição e chamada estão certas?', ret: 'int', nome: 'somaTres', params: 'int a, int b, int c', args: '2, 5, 9', recv: 's', body: 'return a + b + c;', decl: 'int s;' },
    { d: 'Uma função que recebe três números reais e devolve a soma.', ret: 'float', nome: 'somar3', params: 'float x, float y, float z', args: '1.5, 2.0, 0.5', recv: 'total', body: 'return x + y + z;', decl: 'float total;' },
    { d: 'Uma função que soma três valores double e devolve o resultado.', ret: 'double', nome: 'soma', params: 'double p, double q, double r', args: 'v1, v2, v3', recv: 'res', body: 'return p + q + r;', decl: 'double res, v1 = 1, v2 = 2, v3 = 3;' }]),

  { id: 'a1-l14', topic: 't-definicao', ref: A + '14', title: 'Fatorial', type: 'fix', make: function (p) {
    return { q: 'A função deve devolver n! (com 0! = 1). Para n = ' + p.n + ' o certo é ' + p.r + '. Ache a linha errada.', code: R`int fatorial(int n) {
    int f = ${p.ini};
    for (int i = ${p.i0}; i <= n; i++)
        f = f * i;
    return f;
}`, line: p.line,
      fixes: p.line === 2 ? [['int f = 1;', 'O elemento neutro da multiplicação é 1.'], ['int f = n;', 'Multiplicaria n duas vezes.'], ['int f;', 'Sem valor inicial, f tem lixo.']] : [['for (int i = 1; i <= n; i++)', 'De 1 até n.'], ['for (int i = 0; i <= n; i++)', 'Multiplicar por 0 zera tudo.'], ['for (int i = 1; i < n; i++)', 'Faltaria multiplicar por n.']],
      why: 'f começa em 1 e é multiplicado por 1, 2, …, n.' };
  }, p: [{ n: 5, r: 120, ini: '0', i0: '1', line: 2 }, { n: 4, r: 24, ini: '1', i0: '0', line: 3 }, { n: 6, r: 720, ini: '1', i0: '2', line: 3 }] },

  dc('a1-l15', 't-parametros', A + '15', 'Volume do paralelepípedo', [
    { d: 'Uma função que recebe os lados a1, a2 e a3 de um paralelepípedo e devolve o volume.', ret: 'float', nome: 'volume', params: 'float a1, float a2, float a3', args: '2, 3, 4', recv: 'v', body: 'return a1 * a2 * a3;', decl: 'float v;' },
    { d: 'Uma função que recebe comprimento, largura e altura (double) de uma caixa e devolve o volume.', ret: 'double', nome: 'volumeCaixa', params: 'double c, double l, double h', args: 'c1, l1, h1', recv: 'vol', body: 'return c * l * h;', decl: 'double vol, c1 = 1, l1 = 2, h1 = 3;' },
    { d: 'Uma função que devolve o volume de um bloco de lados inteiros.', ret: 'int', nome: 'volBloco', params: 'int x, int y, int z', args: '5, 5, 2', recv: 'r', body: 'return x * y * z;', decl: 'int r;' }]),

  { id: 'a1-l16', topic: 't-parametros', ref: A + '16', title: 'F = 1 + 1/2 + … + 1/n', type: 'fix', make: function (p) {
    return { q: 'A função deve devolver F = 1 + 1/2 + 1/3 + … + 1/n. Para n = ' + p.n + ' ela devolve ' + p.err + ' em vez de ' + p.ok + '. Ache a linha.', code: R`float serie(int n) {
    float F = 0;
    for (int i = 1; i <= n; i++)
        F = F + ${p.bug};
    return F;
}`, line: 4,
      fixes: [['F = F + 1.0 / i;', 'Com 1.0 a divisão é real.'], ['F = F + 1 / (float) n;', 'Somaria sempre 1/n.'], ['F = F + i / 1;', 'Somaria i, não 1/i.']],
      why: '`1 / i` entre inteiros dá 0 para i > 1. Um dos lados precisa ser real: `1.0 / i`.' };
  }, p: [{ n: 3, bug: '1 / i', err: '1.0', ok: 'aproximadamente 1.83' }, { n: 4, bug: '1 / i', err: '1.0', ok: 'aproximadamente 2.08' }, { n: 2, bug: '(float) (1 / i)', err: '1.0', ok: '1.5' }] },

  { id: 'a1-l17', topic: 't-parametros', ref: A + '17', title: 'P ou N', type: 'mc', make: function (p) {
    return { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
char sinal(int x) {
    if (x > 0)
        return 'P';
    return 'N';
}

int main() {
    printf("%c%c%c\n", sinal(${p.a}), sinal(${p.b}), sinal(${p.c}));
    return 0;
}`, opts: p.opts };
  }, p: [
    { a: 5, b: 0, c: -3, opts: [['PNN', 'Zero e negativos devolvem N.'], ['PPN', 'Zero não é positivo.'], ['PZN', 'A função só devolve P ou N.'], ['NNP', 'A ordem segue os argumentos.']] },
    { a: -1, b: 8, c: 2, opts: [['NPP', 'Só o −1 não é positivo.'], ['PNN', 'Confira o sinal de cada argumento.'], ['NNP', '8 é positivo.'], ['NPN', '2 é positivo.']] },
    { a: 0, b: 0, c: 1, opts: [['NNP', 'Os dois zeros dão N.'], ['PPP', 'Zero não é positivo.'], ['NN', 'São três chamadas.'], ['PNP', 'O primeiro argumento é 0.']] }] },

  { id: 'a1-l18', topic: 't-escopo', ref: A + '18', title: 'somaImposto “altera” o custo?', type: 'mc', make: function (p) {
    return { q: 'A função deveria incluir o imposto no custo. Qual a saída?', saida: true, code: R`#include <stdio.h>
void somaImposto(float taxaImposto, float custo) {
    custo = custo + custo * taxaImposto / 100;
}

int main() {
    float custo = ${p.c};
    somaImposto(${p.t}, custo);
    printf("%.2f\n", custo);
    return 0;
}`, opts: [[p.c.toFixed(2), 'custo foi passado por valor: a função alterou só a cópia local.'], [(p.c * (1 + p.t / 100)).toFixed(2), 'Esse seria o valor se a função alterasse o original (por ponteiro, A8) ou devolvesse o resultado.'], [(p.c * p.t / 100).toFixed(2), 'Isso é só o imposto.'], ['0.00', 'Nada zera custo.']] };
  }, p: [{ c: 100, t: 10 }, { c: 250, t: 8 }, { c: 40, t: 25 }] },

  { id: 'a1-l19', topic: 't-parametros', ref: A + '19', title: '24 horas para 12 horas', type: 'mc', make: function (p) {
    return { q: 'Qual a saída para ' + p.h + ':' + (p.m < 10 ? '0' : '') + p.m + '?', saida: true, code: R`#include <stdio.h>
int converter(int h) {
    if (h == 0)
        return 12;
    if (h > 12)
        return h - 12;
    return h;
}

char periodo(int h) {
    return (h >= 12) ? 'P' : 'A';
}

void saida(int h, int m, char ap) {
    printf("%d:%02d %c.M.\n", h, m, ap);
}

int main() {
    saida(converter(${p.h}), ${p.m}, periodo(${p.h}));
    return 0;
}`, opts: p.opts };
  }, p: [
    { h: 14, m: 25, opts: [['2:25 P.M.', '14 − 12 = 2, tarde.'], ['14:25 P.M.', 'A hora precisa ser convertida.'], ['2:25 A.M.', '14h é depois do meio-dia.'], ['12:25 P.M.', '14 − 12 = 2.']] },
    { h: 0, m: 5, opts: [['12:05 A.M.', 'Meia-noite vira 12 A.M.'], ['0:05 A.M.', 'Na notação de 12 horas não há hora 0.'], ['12:05 P.M.', '0h é madrugada: A.M.'], ['12:5 A.M.', '%02d completa os minutos com zero.']] },
    { h: 12, m: 30, opts: [['12:30 P.M.', 'Meio-dia é 12 P.M.'], ['0:30 P.M.', 'Para h = 12 a função devolve 12.'], ['12:30 A.M.', '12h é meio-dia, P.M.'], ['24:30 P.M.', 'Não se soma 12.']] }] },

  { id: 'a1-l20', topic: 't-parametros', ref: A + '20', title: 'Valor do pagamento', type: 'mc', make: function (p) {
    return { q: 'Sem atraso cobra-se a prestação; com atraso, 3% de multa + 0,1% ao dia. Entrada (valor e dias, termina com 0): <code>' + p.in + '</code>. Qual a saída?', saida: true, stdin: p.in, code: R`#include <stdio.h>
float valorPagamento(float valor, int dias) {
    if (dias <= 0)
        return valor;
    return valor + valor * 0.03 + valor * 0.001 * dias;
}

int main() {
    float v, total = 0;
    int d, qtd = 0;
    scanf("%f", &v);
    while (v != 0) {
        scanf("%d", &d);
        total += valorPagamento(v, d);
        qtd++;
        scanf("%f", &v);
    }
    printf("%d prestacoes, total %.2f\n", qtd, total);
    return 0;
}`, opts: p.opts };
  }, p: [
    { in: '100 0 200 10 0', opts: [['2 prestacoes, total 308.00', '100 + (200 + 6 + 2).'], ['2 prestacoes, total 300.00', 'A de 200 tem 10 dias de atraso.'], ['3 prestacoes, total 308.00', 'O 0 final encerra; não conta.'], ['2 prestacoes, total 306.00', 'Faltou 0,1% × 10 dias = 2,00.']] },
    { in: '50 5 0', opts: [['1 prestacoes, total 51.75', '50 + 1,50 + 0,25.'], ['1 prestacoes, total 50.00', 'Há 5 dias de atraso.'], ['1 prestacoes, total 51.50', 'Faltou o juro diário.'], ['1 prestacoes, total 52.50', 'Juro é 0,1% ao dia, não 1%.']] },
    { in: '300 0 300 0 300 1 0', opts: [['3 prestacoes, total 909.30', '300 + 300 + (300 + 9 + 0,30).'], ['3 prestacoes, total 900.00', 'A última tem 1 dia de atraso.'], ['2 prestacoes, total 600.00', 'São três prestações antes do 0.'], ['3 prestacoes, total 909.00', 'Faltou 0,1% de 300 = 0,30.']] }] },

  { id: 'a1-l21', topic: 't-parametros', ref: A + '21', title: 'Jogo de Craps', type: 'mc', make: function (p) {
    return { q: 'Os lançamentos (soma dos dois dados) saem nesta ordem: ' + p.seq.join(', ') + '. Qual a saída?', saida: true, code: R`#include <stdio.h>
int seq[] = {${p.seq.join(', ')}};
int k = 0;
int lancar() {
    return seq[k++];
}

int main() {
    int s = lancar();
    if (s == 7 || s == 11) {
        printf("natural: ganhou\n");
        return 0;
    }
    if (s == 2 || s == 3 || s == 12) {
        printf("craps: perdeu\n");
        return 0;
    }
    int ponto = s;
    do {
        s = lancar();
    } while (s != ponto && s != 7);
    printf(s == ponto ? "fez o ponto: ganhou\n" : "saiu 7: perdeu\n");
    return 0;
}`, opts: p.opts };
  }, p: [
    { seq: [11], opts: [['natural: ganhou', '7 ou 11 na primeira jogada.'], ['craps: perdeu', 'Craps é 2, 3 ou 12.'], ['fez o ponto: ganhou', 'Não houve ponto: ganhou de cara.'], ['saiu 7: perdeu', 'Saiu 11, não 7.']] },
    { seq: [4, 6, 9, 4], opts: [['fez o ponto: ganhou', 'O ponto é 4 e o 4 saiu antes do 7.'], ['saiu 7: perdeu', 'Não saiu 7.'], ['natural: ganhou', '4 não é natural.'], ['craps: perdeu', '4 não é craps.']] },
    { seq: [5, 8, 7, 5], opts: [['saiu 7: perdeu', 'O 7 veio antes de repetir o 5.'], ['fez o ponto: ganhou', 'O jogo para no 7.'], ['natural: ganhou', 'O 7 só é natural na primeira jogada.'], ['craps: perdeu', '5 não é craps.']] }] },

  /* ===== Definição e chamada: abertos ===== */
  dc('a1-d01', 't-void', DA + '1', 'Mensagem de boas-vindas', [
    { d: 'Defina uma função que exibe uma mensagem de boas-vindas.', ret: 'void', nome: 'boasVindas', params: '', args: '', body: 'printf("Bem-vindo!\\n");' },
    { d: 'Defina uma função que exibe “Olá, usuário!”.', ret: 'void', nome: 'saudacao', params: '', args: '', body: 'printf("Ola, usuario!\\n");' },
    { d: 'Defina uma função que mostra a mensagem inicial do sistema.', ret: 'void', nome: 'mensagemInicial', params: '', args: '', body: 'printf("Sistema iniciado\\n");' }]),
  dc('a1-d02', 't-chamada', DA + '2', 'Dobro de um valor', [
    { d: 'Defina uma função que calcula o dobro de um inteiro.', ret: 'int', nome: 'dobro', params: 'int n', args: '7', recv: 'r', body: 'return n * 2;', decl: 'int r;' },
    { d: 'Defina uma função que calcula o dobro de um float.', ret: 'float', nome: 'dobroReal', params: 'float x', args: '2.5', recv: 'd', body: 'return x * 2;', decl: 'float d;' },
    { d: 'Defina uma função que calcula o dobro de um double.', ret: 'double', nome: 'dobrar', params: 'double v', args: 'preco', recv: 'novo', body: 'return 2 * v;', decl: 'double novo, preco = 9.9;' }]),
  dc('a1-d03', 't-chamada', DA + '3', 'Par ou ímpar', [
    { d: 'Defina uma função que verifica se um número é par (1) ou ímpar (0).', ret: 'int', nome: 'ehPar', params: 'int n', args: '10', recv: 'par', body: 'return n % 2 == 0;', decl: 'int par;' },
    { d: 'Defina uma função que devolve 1 se o número for ímpar e 0 se for par.', ret: 'int', nome: 'ehImpar', params: 'int numero', args: 'x', recv: 'imp', body: 'return numero % 2 != 0;', decl: 'int imp, x = 3;' },
    { d: 'Defina uma função que diz se a idade é par.', ret: 'int', nome: 'idadePar', params: 'int idade', args: '19', recv: 'res', body: 'return idade % 2 == 0;', decl: 'int res;' }]),
  dc('a1-d04', 't-chamada', DA + '4', 'Área do retângulo', [
    { d: 'Defina uma função que calcula a área de um retângulo.', ret: 'float', nome: 'areaRetangulo', params: 'float base, float altura', args: '5.0, 3.0', recv: 'a', body: 'return base * altura;', decl: 'float a;' },
    { d: 'Defina uma função que calcula a área de um terreno retangular (double).', ret: 'double', nome: 'areaTerreno', params: 'double frente, double fundo', args: '12, 30', recv: 'm2', body: 'return frente * fundo;', decl: 'double m2;' },
    { d: 'Defina uma função que calcula a área de um retângulo de lados inteiros.', ret: 'int', nome: 'area', params: 'int l, int c', args: '4, 9', recv: 'ar', body: 'return l * c;', decl: 'int ar;' }]),
  dc('a1-d05', 't-chamada', DA + '5', 'Média de notas', [
    { d: 'Defina uma função que retorna a média de três notas.', ret: 'float', nome: 'media', params: 'float n1, float n2, float n3', args: 'nota1, nota2, nota3', recv: 'a', body: 'return (n1 + n2 + n3) / 3;', decl: 'float a, nota1 = 7, nota2 = 8, nota3 = 9;' },
    { d: 'Defina uma função que retorna a média de duas notas.', ret: 'float', nome: 'mediaDuas', params: 'float p1, float p2', args: '6.5, 8.0', recv: 'm', body: 'return (p1 + p2) / 2;', decl: 'float m;' },
    { d: 'Defina uma função que retorna a média de quatro notas bimestrais.', ret: 'double', nome: 'mediaAnual', params: 'double b1, double b2, double b3, double b4', args: '7, 8, 6, 9', recv: 'final', body: 'return (b1 + b2 + b3 + b4) / 4;', decl: 'double final;' }]),
  dc('a1-d06', 't-chamada', DA + '6', 'Celsius para Fahrenheit', [
    { d: 'Defina uma função que converte Celsius para Fahrenheit.', ret: 'float', nome: 'celsiusParaF', params: 'float c', args: '25', recv: 'f', body: 'return c * 9 / 5 + 32;', decl: 'float f;' },
    { d: 'Defina uma função que converte a temperatura de um forno de Celsius para Fahrenheit (double).', ret: 'double', nome: 'converter', params: 'double celsius', args: 't', recv: 'tf', body: 'return celsius * 1.8 + 32;', decl: 'double tf, t = 180;' },
    { d: 'Defina uma função c2f que converte uma leitura de sensor.', ret: 'float', nome: 'c2f', params: 'float leitura', args: '36.5', recv: 'res', body: 'return leitura * 1.8 + 32;', decl: 'float res;' }]),
  dc('a1-d07', 't-void', DA + '7', 'Mostrar o nome', [
    { d: 'Defina uma função que mostra o nome de uma pessoa.', ret: 'void', nome: 'mostrarNome', params: 'char nome[]', args: 'nome', body: 'printf("%s\\n", nome);', decl: 'char nome[50] = "Ana";' },
    { d: 'Defina uma função que exibe o nome de um cliente.', ret: 'void', nome: 'exibirCliente', params: 'char cliente[]', args: 'c', body: 'printf("Cliente: %s\\n", cliente);', decl: 'char c[50] = "Rui";' },
    { d: 'Defina uma função que imprime o nome do curso.', ret: 'void', nome: 'imprimirCurso', params: 'char curso[]', args: '"SI"', body: 'printf("%s\\n", curso);' }]),
  dc('a1-d08', 't-chamada', DA + '8', 'Fatorial', [
    { d: 'Defina uma função que calcula o fatorial de um número.', ret: 'int', nome: 'fatorial', params: 'int n', args: '5', recv: 'f', body: 'int r = 1; for (int i = 2; i <= n; i++) r *= i; return r;', decl: 'int f;' },
    { d: 'Defina uma função que calcula o fatorial com resultado long.', ret: 'long', nome: 'fat', params: 'int num', args: '10', recv: 'grande', body: 'long r = 1; for (int i = 2; i <= num; i++) r *= i; return r;', decl: 'long grande;' },
    { d: 'Defina uma função que devolve k! para um k lido.', ret: 'int', nome: 'fatorialDe', params: 'int k', args: 'lido', recv: 'res', body: 'int r = 1; while (k > 1) r *= k--; return r;', decl: 'int res, lido = 4;' }]),
  dc('a1-d09', 't-void', DA + '9', 'Menu de opções', [
    { d: 'Defina uma função que exibe o menu de opções do programa.', ret: 'void', nome: 'menu', params: '', args: '', body: 'printf("1 - Somar\\n2 - Sair\\n");' },
    { d: 'Defina uma função que mostra as opções de um caixa eletrônico.', ret: 'void', nome: 'opcoesCaixa', params: '', args: '', body: 'printf("1 Saldo 2 Saque\\n");' },
    { d: 'Defina uma função que mostra o menu de um jogo.', ret: 'void', nome: 'menuJogo', params: 'void', args: '', body: 'printf("Jogar / Sair\\n");' }]),
  dc('a1-d10', 't-chamada', DA + '10', 'Soma de dois valores', [
    { d: 'Defina uma função que soma dois valores e retorna o resultado.', ret: 'int', nome: 'soma', params: 'int a, int b', args: '3, 5', recv: 'r', body: 'return a + b;', decl: 'int r;' },
    { d: 'Defina uma função que soma dois preços.', ret: 'float', nome: 'somarPrecos', params: 'float p1, float p2', args: '9.9, 4.5', recv: 'total', body: 'return p1 + p2;', decl: 'float total;' },
    { d: 'Defina uma função que soma dois saldos (double).', ret: 'double', nome: 'somaSaldos', params: 'double s1, double s2', args: 'a, b', recv: 'tot', body: 'return s1 + s2;', decl: 'double tot, a = 1, b = 2;' }]),

  /* ===== Definição e chamada: com retorno obrigatório ===== */
  dc('a1-r01', 't-chamada', DR + '1', 'Maior entre dois números', [
    { d: 'Defina uma função que retorna o maior entre dois inteiros.', ret: 'int', nome: 'maior', params: 'int a, int b', args: 'x, y', recv: 'm', body: 'return a > b ? a : b;', decl: 'int m, x = 4, y = 9;' },
    { d: 'Defina uma função que retorna a maior de duas notas.', ret: 'float', nome: 'maiorNota', params: 'float n1, float n2', args: '7.5, 6.0', recv: 'mn', body: 'return n1 > n2 ? n1 : n2;', decl: 'float mn;' },
    { d: 'Defina uma função que retorna o maior de dois salários.', ret: 'double', nome: 'maiorSalario', params: 'double s1, double s2', args: 'a, b', recv: 'top', body: 'if (s1 > s2) return s1; return s2;', decl: 'double top, a = 1, b = 2;' }]),
  dc('a1-r02', 't-chamada', DR + '2', 'Comprimento de uma string', [
    { d: 'Defina uma função que retorna o comprimento de uma string.', ret: 'int', nome: 'comprimento', params: 'char s[]', args: 'nome', recv: 'tam', body: 'int i = 0; while (s[i] != \'\\0\') i++; return i;', decl: 'int tam; char nome[20] = "Ana";' },
    { d: 'Defina uma função que conta as letras de uma palavra.', ret: 'int', nome: 'contaLetras', params: 'char palavra[]', args: '"ponteiro"', recv: 'n', body: 'int i = 0; while (palavra[i]) i++; return i;', decl: 'int n;' },
    { d: 'Defina uma função que devolve o tamanho de um texto digitado.', ret: 'int', nome: 'tamanhoTexto', params: 'char texto[]', args: 'linha', recv: 'qtd', body: 'int i; for (i = 0; texto[i] != \'\\0\'; i++); return i;', decl: 'int qtd; char linha[80] = "abc";' }]),
  dc('a1-r03', 't-chamada', DR + '3', 'Fatorial com retorno', [
    { d: 'Defina uma função que retorna o fatorial de um número.', ret: 'int', nome: 'fatorial', params: 'int n', args: 'num', recv: 'f', body: 'return n <= 1 ? 1 : n * fatorial(n - 1);', decl: 'int f, num = 6;' },
    { d: 'Defina uma função que retorna o fatorial (unsigned long).', ret: 'unsigned long', nome: 'fatU', params: 'int n', args: '12', recv: 'r', body: 'unsigned long f = 1; for (int i = 2; i <= n; i++) f *= i; return f;', decl: 'unsigned long r;' },
    { d: 'Defina uma função que retorna o fatorial de um valor double.', ret: 'double', nome: 'fatorialD', params: 'int n', args: '20', recv: 'big', body: 'double f = 1; for (int i = 2; i <= n; i++) f *= i; return f;', decl: 'double big;' }]),
  dc('a1-r04', 't-chamada', DR + '4', 'Soma dos elementos de um vetor', [
    { d: 'Defina uma função que retorna a soma dos elementos de um vetor de inteiros.', ret: 'int', nome: 'somaVetor', params: 'int v[], int n', args: 'vet, 10', recv: 's', body: 'int t = 0; for (int i = 0; i < n; i++) t += v[i]; return t;', decl: 'int s, vet[10] = {0};' },
    { d: 'Defina uma função que retorna o total de vendas guardadas num vetor de float.', ret: 'float', nome: 'totalVendas', params: 'float vendas[], int qtd', args: 'v, 7', recv: 'tot', body: 'float t = 0; for (int i = 0; i < qtd; i++) t += vendas[i]; return t;', decl: 'float tot, v[7] = {0};' },
    { d: 'Defina uma função que soma os pontos de um vetor de partidas.', ret: 'int', nome: 'somaPontos', params: 'int pontos[], int partidas', args: 'p, 38', recv: 'total', body: 'int t = 0; for (int i = 0; i < partidas; i++) t += pontos[i]; return t;', decl: 'int total, p[38] = {0};' }]),
  dc('a1-r05', 't-chamada', DR + '5', 'Área do círculo', [
    { d: 'Defina uma função que retorna a área de um círculo.', ret: 'float', nome: 'areaCirculo', params: 'float r', args: '2.0', recv: 'a', body: 'return 3.14159 * r * r;', decl: 'float a;' },
    { d: 'Defina uma função que retorna a área de uma pizza a partir do raio (double).', ret: 'double', nome: 'areaPizza', params: 'double raio', args: '17.5', recv: 'cm2', body: 'return 3.14159 * raio * raio;', decl: 'double cm2;' },
    { d: 'Defina uma função que retorna a área a partir do diâmetro.', ret: 'float', nome: 'areaPorDiametro', params: 'float d', args: 'diam', recv: 'area', body: 'return 3.14159f * (d / 2) * (d / 2);', decl: 'float area, diam = 10;' }]),
  dc('a1-r06', 't-chamada', DR + '6', 'Média de um vetor de inteiros', [
    { d: 'Defina uma função que retorna a média dos inteiros de um vetor.', ret: 'float', nome: 'mediaVetor', params: 'int v[], int n', args: 'vet, 5', recv: 'm', body: 'int s = 0; for (int i = 0; i < n; i++) s += v[i]; return (float) s / n;', decl: 'float m; int vet[5] = {1, 2, 3, 4, 5};' },
    { d: 'Defina uma função que retorna a idade média de uma turma.', ret: 'float', nome: 'idadeMedia', params: 'int idades[], int qtd', args: 'idades, 30', recv: 'im', body: 'int s = 0; for (int i = 0; i < qtd; i++) s += idades[i]; return (float) s / qtd;', decl: 'float im; int idades[30] = {0};' },
    { d: 'Defina uma função que retorna a média de gols por jogo.', ret: 'double', nome: 'mediaGols', params: 'int gols[], int jogos', args: 'g, 10', recv: 'mg', body: 'int s = 0; for (int i = 0; i < jogos; i++) s += gols[i]; return (double) s / jogos;', decl: 'double mg; int g[10] = {0};' }]),
  dc('a1-r07', 't-chamada', DR + '7', 'Número primo', [
    { d: 'Defina uma função que retorna 1 se o número é primo e 0 se não é.', ret: 'int', nome: 'ehPrimo', params: 'int n', args: '17', recv: 'p', body: 'if (n < 2) return 0; for (int i = 2; i * i <= n; i++) if (n % i == 0) return 0; return 1;', decl: 'int p;' },
    { d: 'Defina uma função que diz se um código de produto é primo.', ret: 'int', nome: 'codigoPrimo', params: 'int codigo', args: 'cod', recv: 'ok', body: 'if (codigo < 2) return 0; for (int i = 2; i < codigo; i++) if (codigo % i == 0) return 0; return 1;', decl: 'int ok, cod = 31;' },
    { d: 'Defina uma função primo(x) com retorno 1/0.', ret: 'int', nome: 'primo', params: 'int x', args: '91', recv: 'r', body: 'int d = 0; for (int i = 1; i <= x; i++) if (x % i == 0) d++; return d == 2;', decl: 'int r;' }]),
  dc('a1-r08', 't-chamada', DR + '8', 'Fahrenheit para Celsius', [
    { d: 'Defina uma função que retorna a conversão de Fahrenheit para Celsius.', ret: 'float', nome: 'fParaC', params: 'float f', args: '98.6', recv: 'c', body: 'return (f - 32) * 5 / 9;', decl: 'float c;' },
    { d: 'Defina uma função que converte a temperatura de um termômetro americano (double).', ret: 'double', nome: 'paraCelsius', params: 'double fahrenheit', args: 'tf', recv: 'tc', body: 'return (fahrenheit - 32) / 1.8;', decl: 'double tc, tf = 212;' },
    { d: 'Defina uma função f2c para leituras de um sensor.', ret: 'float', nome: 'f2c', params: 'float leitura', args: '50', recv: 'graus', body: 'return (leitura - 32) / 1.8f;', decl: 'float graus;' }]),
  dc('a1-r09', 't-chamada', DR + '9', 'Potência', [
    { d: 'Defina uma função que retorna a base elevada a um expoente inteiro.', ret: 'double', nome: 'potencia', params: 'double base, int exp', args: '2, 10', recv: 'p', body: 'double r = 1; for (int i = 0; i < exp; i++) r *= base; return r;', decl: 'double p;' },
    { d: 'Defina uma função que retorna x elevado a n (inteiros).', ret: 'int', nome: 'pot', params: 'int x, int n', args: '3, 4', recv: 'r', body: 'int r = 1; while (n-- > 0) r *= x; return r;', decl: 'int r;' },
    { d: 'Defina uma função que calcula um rendimento composto (base float, meses int).', ret: 'float', nome: 'elevar', params: 'float fator, int meses', args: '1.01f, 12', recv: 'f', body: 'float r = 1; for (int i = 0; i < meses; i++) r *= fator; return r;', decl: 'float f;' }]),
  dc('a1-r10', 't-chamada', DR + '10', 'Menor valor de um vetor real', [
    { d: 'Defina uma função que retorna o menor valor de um vetor de números reais.', ret: 'float', nome: 'menor', params: 'float v[], int n', args: 'vet, 8', recv: 'm', body: 'float m = v[0]; for (int i = 1; i < n; i++) if (v[i] < m) m = v[i]; return m;', decl: 'float m, vet[8] = {0};' },
    { d: 'Defina uma função que retorna a menor temperatura registrada (double).', ret: 'double', nome: 'menorTemp', params: 'double t[], int dias', args: 'temps, 30', recv: 'min', body: 'double m = t[0]; for (int i = 1; i < dias; i++) if (t[i] < m) m = t[i]; return m;', decl: 'double min, temps[30] = {0};' },
    { d: 'Defina uma função que retorna o menor preço de uma lista.', ret: 'float', nome: 'menorPreco', params: 'float precos[], int qtd', args: 'p, 5', recv: 'barato', body: 'float m = precos[0]; for (int i = 1; i < qtd; i++) if (precos[i] < m) m = precos[i]; return m;', decl: 'float barato, p[5] = {0};' }]),

  /* ===== Definição e chamada: programas completos ===== */
  { id: 'a1-p01', topic: 't-void', ref: DP + '1', title: 'Função saudacao', type: 'drag', make: function (p) {
    return { q: 'Complete o programa: a função <code>' + p.f + '</code> não recebe nada e imprime “' + p.msg + '”; a main a chama.', code: R`#include <stdio.h>

[[void ${p.f}()]] {
    printf("${p.msg}\n");
}

int main() {
    [[${p.f}();]]
    return 0;
}`, extra: [['void ' + p.f + ';', 'Falta a lista de parâmetros, mesmo vazia.'], ['int ' + p.f + '()', 'Sem return de valor, o tipo é void.'], ['printf(' + p.f + '());', 'A função não devolve nada para o printf.']],
      why: 'Definição antes da main, e chamada com parênteses.' };
  }, p: [{ f: 'saudacao', msg: 'Bem-vindo ao programa!' }, { f: 'abertura', msg: 'Sistema de notas' }, { f: 'aviso', msg: 'Pressione Enter' }] },

  { id: 'a1-p02', topic: 't-void', ref: DP + '2', title: 'Linha de traços', type: 'mc', make: function (p) {
    return { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
void linha() {
    for (int i = 0; i < ${p.n}; i++)
        printf("-");
    printf("\n");
}

int main() {
    linha();
    printf("${p.t}\n");
    linha();
    return 0;
}`, opts: [['-'.repeat(p.n) + '\n' + p.t + '\n' + '-'.repeat(p.n), 'A função é chamada antes e depois do texto.'], [p.t + '\n' + '-'.repeat(p.n), 'São duas chamadas.'], ['-'.repeat(p.n) + '\n' + p.t, 'Há uma segunda chamada depois do texto.'], ['-'.repeat(p.n + 1) + '\n' + p.t + '\n' + '-'.repeat(p.n + 1), 'O laço roda ' + p.n + ' vezes.']] };
  }, p: [{ n: 8, t: 'MENU' }, { n: 5, t: 'FIM' }, { n: 10, t: 'RELATORIO' }] },

  { id: 'a1-p03', topic: 't-definicao', ref: DP + '3', title: 'Quadrado de um número', type: 'fix', make: function (p) {
    return { q: 'A função deve devolver o quadrado de um inteiro. Ache a linha errada.', code: R`${p.l1} {
    ${p.l2};
}

int main() {
    int n = ${p.n};
    printf("%d\n", quadrado(n));
    return 0;
}`, line: p.line,
      fixes: p.line === 1 ? [['int quadrado(int x) {', 'Devolve int e recebe um int.'], ['void quadrado(int x) {', 'void não pode devolver valor.'], ['int quadrado(x) {', 'O parâmetro precisa do tipo.']] : [['return x * x;', 'Sem return o valor não chega à main.'], ['x = x * x;', 'Calcula, mas não devolve.'], ['printf("%d", x * x);', 'Imprimir não é devolver.']],
      why: 'Funções com resultado precisam de tipo de retorno e de `return`.' };
  }, p: [{ l1: 'void quadrado(int x)', l2: 'return x * x', n: 4, line: 1 }, { l1: 'int quadrado(int x)', l2: 'x = x * x', n: 7, line: 2 }, { l1: 'int quadrado(x)', l2: 'return x * x', n: 9, line: 1 }] },

  { id: 'a1-p04', topic: 't-parametros', ref: DP + '4', title: 'Soma de dois inteiros lidos', type: 'drag', make: function (p) {
    return { q: 'Complete: ler dois números na main e mostrar a soma chamando a função.', code: R`int ${p.f}([[int a, int b]]) {
    return [[a + b]];
}

int main() {
    int x, y;
    scanf("%d %d", &x, &y);
    printf("%d\n", [[${p.f}(x, y)]]);
    return 0;
}`, extra: [['int a; int b', 'Parâmetros separados por vírgula.'], ['a, b', 'Cada parâmetro precisa do tipo.'], [p.f + '(int x, int y)', 'Na chamada vão só os valores, sem tipos.'], [p.f, 'Sem parênteses a função não é chamada.']],
      why: 'Definição com tipos; chamada só com os argumentos.' };
  }, p: [{ f: 'soma' }, { f: 'somar' }, { f: 'adicao' }] },

  { id: 'a1-p05', topic: 't-parametros', ref: DP + '5', title: 'imprimirVezes', type: 'mc', make: function (p) {
    return { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
void imprimirVezes(char texto[], int n) {
    for (int i = 0; i < n; i++)
        printf("%s", texto);
    printf("\n");
}

int main() {
    imprimirVezes("${p.a}", ${p.na});
    imprimirVezes("${p.b}", ${p.nb});
    return 0;
}`, opts: [[p.a.repeat(p.na) + '\n' + p.b.repeat(p.nb), 'Cada chamada repete o texto n vezes.'], [p.a + '\n' + p.b, 'n controla quantas repetições.'], [p.a.repeat(p.nb) + '\n' + p.b.repeat(p.na), 'Cada chamada usa o próprio n.'], [p.a.repeat(p.na) + p.b.repeat(p.nb), 'Cada chamada termina com quebra de linha.']] };
  }, p: [{ a: 'oi', na: 3, b: 'C', nb: 2 }, { a: 'ab', na: 2, b: '-', nb: 4 }, { a: 'SI', na: 1, b: 'x', nb: 3 }] },

  { id: 'a1-p06', topic: 't-parametros', ref: DP + '6', title: 'Maior de dois', type: 'fix', make: function (p) {
    return { q: 'A função deve devolver o maior de dois inteiros. Para (' + p.a + ', ' + p.b + ') ela erra. Ache a linha.', code: R`int maior(int a, int b) {
    if (${p.c})
        return a;
    ${p.r};
}`, line: p.line,
      fixes: p.line === 2 ? [['if (a > b)', 'Devolve a quando a é maior.'], ['if (a < b)', 'Devolveria o menor.'], ['if (a = b)', '`=` é atribuição, não comparação.']] : [['return b;', 'Se a não é o maior, devolve b.'], ['return;', 'Função int precisa devolver um valor.'], ['b;', 'Uma expressão solta não devolve nada.']],
      why: 'Compare e devolva o maior nos dois caminhos.' };
  }, p: [{ a: 3, b: 8, c: 'a < b', r: 'return b', line: 2 }, { a: 2, b: 9, c: 'a > b', r: 'return a', line: 4 }, { a: 5, b: 1, c: 'a = b', r: 'return b', line: 2 }] },

  { id: 'a1-p07', topic: 't-parametros', ref: DP + '7', title: 'Média de três notas', type: 'mc', make: function (p) {
    return { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
${p.t} media(${p.t} a, ${p.t} b, ${p.t} c) {
    return (a + b + c) / 3;
}

int main() {
    printf("${p.f}\n", media(${p.v}));
    return 0;
}`, opts: p.opts };
  }, p: [
    { t: 'float', f: '%.2f', v: '7, 8, 10', opts: [['8.33', '25 / 3 em float.'], ['8.00', 'Os parâmetros são float: não há divisão inteira.'], ['25.00', 'Faltou dividir por 3.'], ['8.3', '%.2f mostra duas casas.']] },
    { t: 'int', f: '%d', v: '7, 8, 10', opts: [['8', 'Tudo int: 25 / 3 dá 8.'], ['8.33', 'Com int não há casas decimais.'], ['9', 'Divisão inteira trunca, não arredonda.'], ['25', 'Há a divisão por 3.']] },
    { t: 'float', f: '%.1f', v: '5.5, 6.0, 9.5', opts: [['7.0', '21 / 3.'], ['7.00', '%.1f mostra uma casa.'], ['21.0', 'Faltou dividir.'], ['6.0', 'Confira a soma: 21.']] }] },

  { id: 'a1-p08', topic: 't-parametros', ref: DP + '8', title: 'Fatorial na main', type: 'drag', make: function (p) {
    return { q: 'Complete a função fatorial e o uso na main.', code: R`${p.t} fatorial(int n) {
    ${p.t} f = [[1]];
    for (int i = 2; [[i <= n]]; i++)
        f = f * i;
    [[return f;]]
}

int main() {
    int n = ${p.n};
    printf("${p.fmt}\n", fatorial(n));
    return 0;
}`, extra: [['0', 'Começar em 0 zera tudo.'], ['i < n', 'Faltaria multiplicar por n.'], ['return n;', 'Devolve-se o acumulado f.'], ['printf("%d", f);', 'Imprimir não devolve o valor.']],
      why: 'fatorial(' + p.n + ') = ' + p.r + '.' };
  }, p: [{ t: 'int', n: 5, fmt: '%d', r: 120 }, { t: 'long', n: 10, fmt: '%ld', r: 3628800 }, { t: 'int', n: 7, fmt: '%d', r: 5040 }] },

  { id: 'a1-p09', topic: 't-parametros', ref: DP + '9', title: 'ehPrimo', type: 'fix', make: function (p) {
    return { q: 'ehPrimo devolve 1 para primo e 0 caso contrário. Para n = ' + p.n + ' ela erra. Ache a linha.', code: R`int ehPrimo(int n) {
    if (${p.c}) return 0;
    for (int i = 2; ${p.f}; i++)
        if (n % i == 0) return 0;
    return 1;
}`, line: p.line,
      fixes: p.line === 2 ? [['if (n < 2) return 0;', '0 e 1 não são primos; 2 é.'], ['if (n <= 2) return 0;', '2 é primo.'], ['if (n == 0) return 0;', '1 também não é primo.']] : [['for (int i = 2; i < n; i++)', 'Testa divisores de 2 até n − 1.'], ['for (int i = 2; i <= n; i++)', 'n divide n: todo número viraria não primo.'], ['for (int i = 1; i < n; i++)', '1 divide todos.']],
      why: 'Primo: maior que 1 e sem divisores entre 2 e n − 1.' };
  }, p: [{ n: 2, c: 'n <= 2', f: 'i < n', line: 2 }, { n: 7, c: 'n < 2', f: 'i <= n', line: 3 }, { n: 1, c: 'n == 0', f: 'i < n', line: 2 }] },

  { id: 'a1-p10', topic: 't-parametros', ref: DP + '10', title: 'Conversor de temperatura', type: 'mc', make: function (p) {
    return { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
float conversor(float c) {
    return ${p.e};
}

int main() {
    printf("%.1f\n", conversor(${p.c}));
    return 0;
}`, opts: p.opts };
  }, p: [
    { c: 25, e: 'c * 9 / 5 + 32', opts: [['77.0', '25 × 9 / 5 + 32.'], ['45.0', 'Faltou somar 32.'], ['57.0', 'Faltou multiplicar por 9/5.'], ['-3.9', 'Isso é o caminho inverso.']] },
    { c: 100, e: 'c * 9 / 5 + 32', opts: [['212.0', 'Ponto de ebulição da água.'], ['180.0', 'Faltou somar 32.'], ['132.0', 'Faltou multiplicar por 9/5.'], ['37.8', 'Isso é Fahrenheit para Celsius.']] },
    { c: 10, e: 'c * (9 / 5) + 32', opts: [['42.0', 'Entre inteiros, 9 / 5 dá 1: a conta vira 10 + 32.'], ['50.0', 'Seria o certo com 9.0 / 5.'], ['18.0', 'Faltou somar 32.'], ['32.0', '9/5 vale 1, não 0.']] }] },

  dc('a1-p11', 't-void', DP + '11', 'mensagemBoasVindas', [
    { d: 'Defina mensagemBoasVindas, sem parâmetros e sem retorno, e chame na main.', ret: 'void', nome: 'mensagemBoasVindas', params: '', args: '', body: 'printf("Ola!\\n");' },
    { d: 'Defina mensagemEncerramento, sem parâmetros e sem retorno, e chame na main.', ret: 'void', nome: 'mensagemEncerramento', params: '', args: '', body: 'printf("Tchau!\\n");' },
    { d: 'Defina mostrarVersao, sem parâmetros e sem retorno, e chame na main.', ret: 'void', nome: 'mostrarVersao', params: 'void', args: '', body: 'printf("v1.0\\n");' }]),

  { id: 'a1-p12', topic: 't-void', ref: DP + '12', title: 'mostrarMenu chamado duas vezes', type: 'mc', make: function (p) {
    return { q: 'Quantas linhas o programa imprime?', saida: true, code: R`#include <stdio.h>
void mostrarMenu() {
    ${p.linhas.map(function (l) { return '    printf("' + l + '\\n");'; }).join('\n')}
}

int main() {
    ${'    mostrarMenu();\n'.repeat(p.vezes)} printf("%d\n", ${p.linhas.length} * ${p.vezes});
    return 0;
}`, opts: [[p.linhas.concat([]).concat([]).length && (function () { var s = []; for (var i = 0; i < p.vezes; i++) s = s.concat(p.linhas); s.push(String(p.linhas.length * p.vezes)); return s.join('\n'); })(), 'O menu é impresso a cada chamada, e depois vem o total.'], [p.linhas.join('\n') + '\n' + (p.linhas.length * p.vezes), 'A função é chamada ' + p.vezes + ' vezes.'], [String(p.linhas.length * p.vezes), 'As chamadas imprimem o menu antes do número.'], [(function () { var s = []; for (var i = 0; i < p.vezes; i++) s = s.concat(p.linhas); return s.join('\n'); })(), 'O último printf também imprime.']] };
  }, p: [{ linhas: ['1-Novo', '2-Sair'], vezes: 2 }, { linhas: ['A', 'B', 'C'], vezes: 2 }, { linhas: ['Menu'], vezes: 3 }] },

  dc('a1-p13', 't-void', DP + '13', 'mostrarNumero', [
    { d: 'Defina mostrarNumero, que recebe um inteiro e não retorna nada; chame com 42.', ret: 'void', nome: 'mostrarNumero', params: 'int n', args: '42', body: 'printf("%d\\n", n);' },
    { d: 'Defina mostrarPreco, que recebe um float e não retorna nada; chame com 9.99.', ret: 'void', nome: 'mostrarPreco', params: 'float p', args: '9.99f', body: 'printf("%.2f\\n", p);' },
    { d: 'Defina mostrarLetra, que recebe um char e não retorna nada; chame com \'A\'.', ret: 'void', nome: 'mostrarLetra', params: 'char c', args: "'A'", body: 'printf("%c\\n", c);' }]),
  dc('a1-p15', 't-chamada', DP + '15', 'dobro(7)', [
    { d: 'Defina dobro (recebe int, retorna int) e, na main, chame com 7 guardando em resultado.', ret: 'int', nome: 'dobro', params: 'int n', args: '7', recv: 'resultado', body: 'return 2 * n;', decl: 'int resultado;' },
    { d: 'Defina triplo (recebe int, retorna int) e chame com 5 guardando em resultado.', ret: 'int', nome: 'triplo', params: 'int n', args: '5', recv: 'resultado', body: 'return 3 * n;', decl: 'int resultado;' },
    { d: 'Defina metade (recebe float, retorna float) e chame com 9 guardando em resultado.', ret: 'float', nome: 'metade', params: 'float x', args: '9', recv: 'resultado', body: 'return x / 2;', decl: 'float resultado;' }]),
  dc('a1-p16', 't-chamada', DP + '16', 'soma(3, 5)', [
    { d: 'Defina soma (dois inteiros, retorna int) e chame com 3 e 5 armazenando o retorno.', ret: 'int', nome: 'soma', params: 'int a, int b', args: '3, 5', recv: 's', body: 'return a + b;', decl: 'int s;' },
    { d: 'Defina diferenca (dois inteiros, retorna int) e chame com 10 e 4.', ret: 'int', nome: 'diferenca', params: 'int a, int b', args: '10, 4', recv: 'd', body: 'return a - b;', decl: 'int d;' },
    { d: 'Defina produto (dois inteiros, retorna int) e chame com 6 e 7.', ret: 'int', nome: 'produto', params: 'int x, int y', args: '6, 7', recv: 'p', body: 'return x * y;', decl: 'int p;' }]),
  dc('a1-p17', 't-chamada', DP + '17', 'mediaNotas', [
    { d: 'Defina mediaNotas (três float, retorna float) e chame com três notas.', ret: 'float', nome: 'mediaNotas', params: 'float n1, float n2, float n3', args: '7.0, 8.5, 6.0', recv: 'm', body: 'return (n1 + n2 + n3) / 3;', decl: 'float m;' },
    { d: 'Defina mediaProvas (dois float, retorna float) e chame com 6.0 e 9.0.', ret: 'float', nome: 'mediaProvas', params: 'float p1, float p2', args: '6.0, 9.0', recv: 'mp', body: 'return (p1 + p2) / 2;', decl: 'float mp;' },
    { d: 'Defina mediaPonderada (nota1, nota2, retorna float, pesos 1 e 2) e chame.', ret: 'float', nome: 'mediaPonderada', params: 'float nota1, float nota2', args: '5.0, 8.0', recv: 'mpd', body: 'return (nota1 + 2 * nota2) / 3;', decl: 'float mpd;' }]),
  dc('a1-p18', 't-chamada', DP + '18', 'converterParaDolar', [
    { d: 'Defina converterParaDolar (reais em float, retorna float) e chame com 100.0.', ret: 'float', nome: 'converterParaDolar', params: 'float reais', args: '100.0', recv: 'usd', body: 'return reais / 5.0f;', decl: 'float usd;' },
    { d: 'Defina converterParaEuro (reais em float, retorna float) e chame com 250.0.', ret: 'float', nome: 'converterParaEuro', params: 'float reais', args: '250.0', recv: 'eur', body: 'return reais / 6.0f;', decl: 'float eur;' },
    { d: 'Defina dolarParaReal (dólares em double, retorna double) e chame com 20.0.', ret: 'double', nome: 'dolarParaReal', params: 'double usd', args: '20.0', recv: 'brl', body: 'return usd * 5.0;', decl: 'double brl;' }]),

  { id: 'a1-p19', topic: 't-parametros', ref: DP + '19', title: 'areaRetangulo(5.0, 3.0)', type: 'mc', make: function (p) {
    return { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
float areaRetangulo(float base, float altura) {
    return base * altura;
}

int main() {
    float a = areaRetangulo(${p.b}, ${p.h});
    printf("%.1f\n", a);
    return 0;
}`, opts: [[(p.b * p.h).toFixed(1), 'base × altura.'], [(p.b + p.h).toFixed(1), 'Área multiplica.'], [(2 * (p.b + p.h)).toFixed(1), 'Isso é o perímetro.'], [(p.b * p.h).toFixed(2), '%.1f mostra uma casa.']] };
  }, p: [{ b: 5.0, h: 3.0 }, { b: 2.5, h: 4.0 }, { b: 7.5, h: 2.0 }] },

  dc('a1-p20', 't-chamada', DP + '20', 'ehPar(10) e ehPar(7)', [
    { d: 'Defina ehPar (int, retorna 1 se par, 0 se ímpar) e chame com 10.', ret: 'int', nome: 'ehPar', params: 'int n', args: '10', recv: 'r1', body: 'return n % 2 == 0;', decl: 'int r1;' },
    { d: 'Defina ehPar e chame com 7, guardando em r2.', ret: 'int', nome: 'ehPar', params: 'int n', args: '7', recv: 'r2', body: 'return n % 2 == 0;', decl: 'int r2;' },
    { d: 'Defina ehMultiplo3 (int, retorna 1 ou 0) e chame com 9.', ret: 'int', nome: 'ehMultiplo3', params: 'int n', args: '9', recv: 'm3', body: 'return n % 3 == 0;', decl: 'int m3;' }]),

  { id: 'a1-e01', topic: 't-escopo', ref: 'Slides A1, escopo de variáveis', title: 'Local que oculta a global', type: 'mc', make: function (p) {
    return { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
int ${p.g} = ${p.gv};
void f() {
    int ${p.g} = ${p.lv};
    ${p.g} = ${p.g} + 1;
}

int main() {
    f();
    ${p.extra} printf("%d\n", ${p.g});
    return 0;
}`, opts: p.opts };
  }, p: [
    { g: 'nota', gv: 10, lv: 5, extra: '', opts: [['10', 'A local de f oculta a global; a global continua 10.'], ['6', 'O 6 ficou na variável local de f.'], ['11', 'f não mexe na global.'], ['5', 'A local some quando f termina.']] },
    { g: 'cont', gv: 0, lv: 100, extra: 'cont = cont + 2;', opts: [['2', 'A main altera a global: 0 + 2.'], ['103', 'A local de f não é a global.'], ['101', 'A local some quando f termina.'], ['0', 'A main somou 2 na global.']] },
    { g: 'x', gv: 7, lv: 7, extra: 'x = x * 3;', opts: [['21', 'Só a main mexe na global: 7 × 3.'], ['24', 'O +1 foi na local de f.'], ['8', 'A local de f não é a global.'], ['7', 'A main multiplica a global por 3.']] }] }
  ];
})();

/* Variantes V2 e V3 escritas à mão (2026-11-18): outra tarefa, outra lógica, outro erro. V1 vem dos moldes acima.
   Gerado por _tools/gerar_alt.mjs a partir de _tools/alt/a1.alt.js; null = a versão do molde continua valendo. */
(function () {
  window.ALT = window.ALT || {};
  window.ALT['a1-l01'] = [
    {
      q: "O título de cada seção deve aparecer sempre com a mesma moldura. Complete a função com parâmetro e as chamadas.",
      code: "void titulo([[char texto[]]]) {\n    printf(\"=====\\n\");\n    printf(\"%s\\n\", texto);\n    printf(\"=====\\n\");\n}\n\nint main() {\n    titulo([[\"Entrada\"]]);\n    titulo(\"Saida\");\n    return 0;\n}",
      extra: [
        ["char texto", "Seria um único caractere."],
        ["texto", "Falta o tipo do parâmetro."],
        ["'Entrada'", "Aspas simples são para um único caractere."],
        ["titulo", "Sem aspas seria um nome de variável."]
      ],
      why: "A função recebe o texto como parâmetro, e a main passa um texto diferente a cada chamada."
    },
    {
      q: "A função deve mostrar uma moldura com <code>n</code> traços. Complete a função e as chamadas.",
      code: "void moldura([[int n]]) {\n    for (int i = 0; [[i < n]]; i++)\n        printf(\"-\");\n    printf(\"\\n\");\n}\n\nint main() {\n    moldura([[10]]);\n    moldura(4);\n    return 0;\n}",
      extra: [
        ["n", "Falta o tipo do parâmetro."],
        ["i <= n", "Imprimiria um traço a mais."],
        ["int", "Falta o nome do parâmetro."],
        ["\"10\"", "Seria um texto, não um número."]
      ],
      why: "O número de traços vem do parâmetro `n`; a função serve para qualquer tamanho."
    }
  ];
  window.ALT['a1-l02'] = [
    {
      q: "O conceito deve ser A (nota de 9 a 10), B (de 7 a 8,9) ou C (abaixo de 7). A função mostra o conceito errado para qualquer nota. Ache a linha.",
      code: "void conceito(float nota) {\n    if (nota = 10)\n        printf(\"A\\n\");\n    else if (nota >= 7)\n        printf(\"B\\n\");\n    else\n        printf(\"C\\n\");\n}",
      line: 2,
      fixes: [
        ["if (nota >= 9)", "A faixa A começa em 9."],
        ["if (nota == 10)", "Só aceitaria o 10 exato."],
        ["if (nota > 9)", "Deixaria o 9 exato fora da faixa A."]
      ],
      why: "Um único `=` atribui 10 à nota; a faixa A é de 9 para cima, `nota >= 9`."
    },
    {
      q: "A faixa AGRADÁVEL vai de 18 a 25 °C, mas a função classifica todas as temperaturas como AGRADÁVEL. Ache a linha.",
      code: "void classificar(float t) {\n    if (t >= 18 || t <= 25)\n        printf(\"AGRADAVEL\\n\");\n    else\n        printf(\"FORA DA FAIXA\\n\");\n}",
      line: 2,
      fixes: [
        ["if (t >= 18 && t <= 25)", "As duas condições precisam valer ao mesmo tempo."],
        ["if (t >= 18 || t < 25)", "Com `||` qualquer número satisfaz uma das condições."],
        ["if (18 <= t <= 25)", "Essa comparação encadeada não funciona em C."]
      ],
      why: "Com `||`, todo número é maior que 18 ou menor que 25; o intervalo pede `&&`."
    }
  ];
  window.ALT['a1-l03'] = [
    {
      q: "Entrada: <code>9 7.5 4 -1</code> (termina com -1). Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nchar conceito(float m) {\n    if (m >= 8)\n        return 'A';\n    if (m >= 6)\n        return 'B';\n    return 'C';\n}\n\nint main() {\n    float n;\n    scanf(\"%f\", &n);\n    while (n >= 0) {\n        printf(\"%c\", conceito(n));\n        scanf(\"%f\", &n);\n    }\n    return 0;\n}",
      stdin: "9 7.5 4 -1",
      opts: [
        ["ABC", "9 → A, 7,5 → B, 4 → C; o -1 encerra a leitura sem ser classificado."],
        ["ABB", "O 4 está abaixo de 6."],
        ["CBA", "A ordem é a da leitura."],
        ["ABC-", "O -1 só encerra o laço."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint total = 0;\n\nvoid somar(int x) {\n    total = total + x;\n}\n\nint main() {\n    for (int i = 1; i <= 5; i++)\n        if (i % 2 == 1)\n            somar(i);\n    printf(\"%d\\n\", total);\n    return 0;\n}",
      opts: [
        ["9", "Só 1, 3 e 5 são somados à variável global."],
        ["15", "Somaria todos os números de 1 a 5."],
        ["6", "Somaria só os pares (2 + 4)."],
        ["0", "A função altera a variável global."]
      ]
    }
  ];
  window.ALT['a1-l04'] = [
    {
      q: "Qual a saída de <code>contagem(10, 3)</code>?",
      saida: true,
      code: "#include <stdio.h>\nvoid contagem(int ini, int passo) {\n    for (int i = ini; i > 0; i = i - passo)\n        printf(\"%d \", i);\n    printf(\"FIM\");\n}\n\nint main() {\n    contagem(10, 3);\n    return 0;\n}",
      opts: [
        ["10 7 4 1 FIM", "De 3 em 3 enquanto o valor for maior que zero."],
        ["10 7 4 1 -2 FIM", "O laço para quando i deixa de ser maior que zero."],
        ["10 9 8 7 6 5 4 3 2 1 FIM", "O passo é 3, não 1."],
        ["7 4 1 FIM", "O primeiro valor impresso é o próprio 10."]
      ]
    },
    {
      q: "Qual a saída de <code>contagem(7)</code>?",
      saida: true,
      code: "#include <stdio.h>\nvoid contagem(int n) {\n    while (n > 0) {\n        printf(\"%d \", n);\n        n = n - 2;\n    }\n    printf(\"FIM\");\n}\n\nint main() {\n    contagem(7);\n    return 0;\n}",
      opts: [
        ["7 5 3 1 FIM", "De 2 em 2 enquanto n for maior que zero."],
        ["7 5 3 1 -1 FIM", "Quando n chega a -1 o laço já terminou."],
        ["7 6 5 4 3 2 1 FIM", "O passo é 2."],
        ["5 3 1 FIM", "O primeiro valor impresso é o 7."]
      ]
    }
  ];
  window.ALT['a1-l05'] = [
    {
      q: "Complete a função que faz uma conta simples conforme o operador (+, − ou ×) e devolve o resultado.",
      code: "int calcular(int a, int b, char op) {\n    int r;\n    switch ([[op]]) {\n        case '+':\n            r = a + b;\n            break;\n        case '-':\n            r = a - b;\n            break;\n        case '*':\n            r = a * b;\n            [[break;]]\n        [[default:]]\n            r = 0;\n    }\n    return r;\n}\n\n/* na main: */\nprintf(\"%d\\n\", calcular(6, 3, '*'));",
      extra: [
        ["a", "O `switch` escolhe pelo operador."],
        ["continue;", "`continue` não encerra um `case`."],
        ["else:", "Em um switch o caso padrão é `default:`."],
        ["case \"*\":", "Um caractere usa aspas simples."]
      ],
      why: "O `switch` decide pelo caractere do operador; `break` evita que o próximo caso também execute e `default` cobre os demais."
    },
    {
      q: "Complete a função que diz se o dia (1 = domingo ... 7 = sábado) é fim de semana, juntando dois casos num só bloco.",
      code: "void tipoDoDia(int d) {\n    switch (d) {\n        case 1:\n        [[case 7:]]\n            printf(\"Fim de semana\\n\");\n            [[break;]]\n        [[default:]]\n            printf(\"Dia util\\n\");\n    }\n}\n\n/* na main: */\ntipoDoDia(7);",
      extra: [
        ["case 1, 7:", "Em C cada `case` tem um único valor."],
        ["continue;", "`continue` não encerra um `case`."],
        ["else:", "Em um switch o caso padrão é `default:`."],
        ["case 8:", "O sábado é o dia 7."]
      ],
      why: "Dois `case` seguidos sem `break` entre eles compartilham o mesmo bloco."
    }
  ];
  window.ALT['a1-l06'] = [
    {
      q: "Complete a função que escreve um texto entre duas linhas de traços.",
      code: "void titulo([[char texto[]]]) {\n    for (int i = 0; i < 20; i++)\n        printf(\"-\");\n    printf(\"\\n%s\\n\", [[texto]]);\n    for (int i = 0; i < 20; i++)\n        printf(\"-\");\n    printf(\"\\n\");\n}\n\n/* na main: */\ntitulo([[\"RELATORIO\"]]);",
      extra: [
        ["char texto", "Seria um único caractere."],
        ["&texto", "printf não recebe o endereço do vetor."],
        ["'RELATORIO'", "Aspas simples são para um único caractere."],
        ["texto[]", "Os colchetes só vão na declaração."]
      ],
      why: "O parâmetro é um vetor de char; o `%s` do printf mostra a string inteira."
    },
    {
      q: "Complete a função que mostra a tabuada de <code>n</code> de 1 a 10.",
      code: "void tabuada(int n) {\n    for (int i = 1; [[i <= 10]]; i++)\n        printf(\"%d x %d = %d\\n\", n, i, [[n * i]]);\n}\n\n/* na main: */\ntabuada([[7]]);",
      extra: [
        ["i < 10", "Pararia no 9."],
        ["n + i", "Soma em vez de multiplicar."],
        ["\"7\"", "Seria um texto."],
        ["i * i", "Multiplicaria i por ele mesmo."]
      ],
      why: "O parâmetro `n` é a tabuada; o laço varia o multiplicador de 1 a 10."
    }
  ];
  window.ALT['a1-l07'] = [
    {
      q: "Infantil até 12; Juvenil de 13 a 17; Adulto a partir de 18. Para 10 anos a função mostra dois textos. Ache a linha.",
      code: "void categoria(int idade) {\n    if (idade <= 12)\n        printf(\"Infantil\\n\");\n    if (idade <= 17)\n        printf(\"Juvenil\\n\");\n    else\n        printf(\"Adulto\\n\");\n}",
      line: 4,
      fixes: [
        ["else if (idade <= 17)", "Com `else`, só uma faixa é escolhida."],
        ["else if (idade < 17)", "Deixaria o 17 na faixa dos adultos."],
        ["if (idade > 12 && idade < 17)", "Deixaria o 17 de fora."]
      ],
      why: "Sem o `else`, o segundo `if` é avaliado de novo e também vale para 10 anos."
    },
    {
      q: "A função deveria mostrar \"Infantil\" para quem tem até 12 anos, mas mostra a linha de Infantil para todo mundo. Ache a linha.",
      code: "void categoria(int idade) {\n    if (idade <= 12);\n    printf(\"Infantil\\n\");\n    else\n        printf(\"Nao infantil\\n\");\n}",
      line: 2,
      fixes: [
        ["if (idade <= 12)", "Sem o ponto e vírgula, o `printf` passa a ser o corpo do `if`."],
        ["if (idade < 12)", "Continuaria com o `;`, e deixaria o 12 de fora."],
        ["if (idade == 12)", "Aceitaria só o 12."]
      ],
      why: "O `;` logo depois do `if` encerra o comando: o `printf` vira uma linha à parte e o `else` perde o `if`."
    }
  ];
  window.ALT['a1-l08'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid etiqueta(int cod, float preco) {\n    printf(\"[%-6d|%7.2f]\\n\", cod, preco);\n}\n\nint main() {\n    etiqueta(42, 3.5);\n    return 0;\n}",
      opts: [
        ["[42    |   3.50]", "`%-6d` alinha à esquerda em 6 colunas e `%7.2f` ocupa 7 colunas com duas decimais."],
        ["[42|3.50]", "Os campos têm largura mínima."],
        ["[    42|   3.50]", "O `-` alinha o número à esquerda."],
        ["[42    |3.5]", "`%7.2f` mostra duas casas decimais e 7 colunas."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid aplicarDesconto(float preco) {\n    preco = preco * 0.9;\n    printf(\"%.1f \", preco);\n}\n\nint main() {\n    float p = 200;\n    aplicarDesconto(p);\n    printf(\"%.1f\\n\", p);\n    return 0;\n}",
      opts: [
        ["180.0 200.0", "A função altera uma cópia: o preço original continua 200."],
        ["180.0 180.0", "O parâmetro é uma cópia; `p` não muda."],
        ["200.0 200.0", "Dentro da função o preço da cópia já foi reduzido."],
        ["200.0 180.0", "Trocou a ordem das duas impressões."]
      ]
    }
  ];
  window.ALT['a1-l09'] = [
    {
      q: "Complete para desenhar um triângulo de altura <code>n</code>: a linha <code>i</code> tem <code>i</code> asteriscos.",
      code: "void triangulo(int n) {\n    for (int i = 1; [[i <= n]]; i++) {\n        for (int j = 1; [[j <= i]]; j++)\n            printf(\"*\");\n        [[printf(\"\\n\");]]\n    }\n}\n\n/* na main: */\ntriangulo(4);",
      extra: [
        ["i < n", "Faltaria a última linha."],
        ["j <= n", "Cada linha teria n asteriscos."],
        ["printf(\" \");", "Não muda de linha."]
      ],
      why: "O laço de dentro vai até `i`, então cada linha tem um asterisco a mais que a anterior."
    },
    {
      q: "Complete para desenhar um tabuleiro de n por n, alternando <code>#</code> e <code>.</code>.",
      code: "void tabuleiro(int n) {\n    for (int i = 0; [[i < n]]; i++) {\n        for (int j = 0; j < n; j++) {\n            if ([[(i + j) % 2 == 0]])\n                printf(\"#\");\n            else\n                printf([[\".\"]]);\n        }\n        printf(\"\\n\");\n    }\n}\n\n/* na main: */\ntabuleiro(4);",
      extra: [
        ["i <= n", "Desenharia uma linha a mais."],
        ["i + j == 2", "Só valeria para uma diagonal."],
        ["'.'", "printf espera um texto entre aspas duplas."],
        ["(i * j) % 2 == 0", "Não alterna casa a casa."]
      ],
      why: "A soma `i + j` é par nas casas de uma cor e ímpar nas da outra."
    }
  ];
  window.ALT['a1-l10'] = [
    {
      q: "O painel deve mostrar <code>TEMP: 07.5</code> quando a variável (float) vale 7.5. Qual printf faz isso?",
      opts: [
        ["`printf(\"TEMP: %05.1f\\n\", t);`", "`%05.1f` usa largura 5, uma casa decimal e zeros à esquerda."],
        ["`printf(\"TEMP: %5.1f\\n\", t);`", "Preencheria com espaços: \" 07.5\" não sai; sai \"  7.5\"."],
        ["`printf(\"TEMP: %.1f\\n\", t);`", "Mostraria só 7.5."],
        ["`printf(\"TEMP: %05d\\n\", t);`", "`%d` é para inteiros."]
      ]
    },
    {
      q: "Qual printf mostra o preço 3.5 como <code>R$    3.50</code>, ocupando 7 colunas depois de \"R$ \" (alinhado à direita)?",
      opts: [
        ["`printf(\"R$ %7.2f\\n\", preco);`", "`%7.2f` usa 7 colunas no total, com duas casas decimais."],
        ["`printf(\"R$ %-7.2f\\n\", preco);`", "O `-` alinharia à esquerda."],
        ["`printf(\"R$ %.2f\\n\", preco);`", "Não fixa a largura."],
        ["`printf(\"R$ %7d\\n\", preco);`", "`%d` é para inteiros."]
      ]
    }
  ];
  window.ALT['a1-l11'] = [
    {
      q: "Qual a saída de <code>padrao(3)</code>?",
      saida: true,
      code: "#include <stdio.h>\nvoid padrao(int n) {\n    for (int i = 1; i <= n; i++) {\n        for (int j = i; j >= 1; j--)\n            printf(\"%d\", j);\n        printf(\"\\n\");\n    }\n}\n\nint main() {\n    padrao(3);\n    return 0;\n}",
      opts: [
        ["1\n21\n321", "Cada linha conta de i até 1."],
        ["1\n12\n123", "Essa é a contagem crescente."],
        ["1\n22\n333", "Essa imprimiria o valor de i repetido."],
        ["3\n32\n321", "A linha 1 começa em 1, não em n."]
      ]
    },
    {
      q: "Qual a saída de <code>padrao(3)</code>?",
      saida: true,
      code: "#include <stdio.h>\nvoid padrao(int n) {\n    for (int i = 1; i <= n; i++) {\n        for (int e = 0; e < n - i; e++)\n            printf(\" \");\n        for (int j = 0; j < i; j++)\n            printf(\"*\");\n        printf(\"\\n\");\n    }\n}\n\nint main() {\n    padrao(3);\n    return 0;\n}",
      opts: [
        ["  *\n **\n***", "Os espaços diminuem e os asteriscos aumentam a cada linha."],
        ["*\n**\n***", "Esqueceu dos espaços à esquerda."],
        ["***\n **\n  *", "A ordem das linhas é crescente em asteriscos."],
        ["  *\n  **\n  ***", "Os espaços diminuem a cada linha."]
      ]
    }
  ];
  window.ALT['a1-l12'] = [
    {
      q: "Complete para imprimir, com n = 4:<br><code>1234 / 123 / 12 / 1</code>",
      code: "void escada(int n) {\n    for (int i = n; [[i >= 1]]; i--) {\n        for (int j = 1; [[j <= i]]; j++)\n            printf(\"%d\", j);\n        printf(\"\\n\");\n    }\n}",
      extra: [
        ["i > 1", "Faltaria a última linha, a do \"1\"."],
        ["j <= n", "Todas as linhas teriam n números."],
        ["j < i", "Cada linha perderia um número."]
      ],
      why: "A linha começa com `i = n` e diminui; o laço de dentro imprime de 1 até `i`."
    },
    {
      q: "Complete para imprimir uma pirâmide de n linhas; com n = 3:<br><code>__*__ / _***_ / *****</code> (com espaços no lugar do <code>_</code>)",
      code: "void piramide(int n) {\n    for (int i = 1; i <= n; i++) {\n        for (int e = 0; [[e < n - i]]; e++)\n            printf(\" \");\n        for (int j = 0; j < [[2 * i - 1]]; j++)\n            printf(\"*\");\n        printf(\"\\n\");\n    }\n}",
      extra: [
        ["e < i", "Os espaços aumentariam em vez de diminuir."],
        ["i", "A linha 2 teria só 2 asteriscos."],
        ["2 * i", "Teria um asterisco a mais por linha."],
        ["n - 1", "Seriam sempre n - 1 espaços."]
      ],
      why: "Na linha `i` entram `n - i` espaços e `2 * i - 1` asteriscos."
    }
  ];
  window.ALT['a1-l13'] = [
    {
      q: "Qual cabeçalho completa a função, que devolve a soma de três inteiros?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    return a + b + c;\n}",
      opts: [
        ["`int somaTres(int a, int b, int c)`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`void somaTres(int a, int b, int c)`", "`void` não devolve valor, mas o corpo tem `return`."],
        ["`int somaTres(int a; int b; int c)`", "Separar parâmetros com ponto e vírgula não é permitido: é vírgula."],
        ["`int somaTres(a, b, c)`", "Faltam os tipos dos parâmetros."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint somaTres(int a, int b, int c) {\n    return a + b + c;\n}\n\nint main() {\n    printf(\"%d\\n\", somaTres(1, somaTres(1, 2, 3), 4));\n    return 0;\n}",
      opts: [
        ["11", "A chamada de dentro devolve 6; depois 1 + 6 + 4."],
        ["6", "Esse é o valor da chamada de dentro."],
        ["10", "Somou 1 + 2 + 3 + 4."],
        ["14", "Somou o 6 duas vezes."]
      ]
    }
  ];
  window.ALT['a1-l14'] = [
    {
      q: "A função deve devolver n! (com 0! = 1). Para n = 5 devolve 24 em vez de 120. Ache a linha errada.",
      code: "int fatorial(int n) {\n    int f = 1;\n    for (int i = 1; i < n; i++)\n        f = f * i;\n    return f;\n}",
      line: 3,
      fixes: [
        ["for (int i = 1; i <= n; i++)", "O próprio n também entra no produto."],
        ["for (int i = 1; i < n + 1; i += 2)", "Pularia fatores."],
        ["for (int i = 0; i < n; i++)", "Multiplicaria por zero."]
      ],
      why: "Com `i < n`, o último fator (n) fica de fora: 1·2·3·4 = 24."
    },
    {
      q: "A função deve devolver n!. Ela devolve sempre o próprio n. Ache a linha errada.",
      code: "int fatorial(int n) {\n    int f = 1;\n    for (int i = 1; i <= n; i++)\n        f = f * i;\n    return n;\n}",
      line: 5,
      fixes: [
        ["return f;", "O resultado acumulado está em `f`."],
        ["return i;", "`i` só existe dentro do laço."],
        ["return f * n;", "Multiplicaria o fatorial por n de novo."]
      ],
      why: "O produto é guardado em `f`, mas a função devolve `n`."
    }
  ];
  window.ALT['a1-l15'] = [
    {
      q: "Qual cabeçalho completa a função, que devolve o volume de um paralelepípedo?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    return a1 * a2 * a3;\n}",
      opts: [
        ["`float volume(float a1, float a2, float a3)`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`void volume(float a1, float a2, float a3)`", "`void` não devolve valor, mas o corpo tem `return`."],
        ["`float volume(float a1; float a2; float a3)`", "Separar parâmetros com ponto e vírgula não é permitido: é vírgula."],
        ["`float volume(a1, a2, a3)`", "Faltam os tipos dos parâmetros."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nfloat volume(float a1, float a2, float a3) {\n    return a1 * a2 * a3;\n}\n\nint main() {\n    printf(\"%.1f\\n\", volume(2, 3, 4) + volume(1, 1, 1));\n    return 0;\n}",
      opts: [
        ["25.0", "24 + 1."],
        ["24.0", "Esqueceu a segunda chamada."],
        ["26.0", "Somou um valor a mais."],
        ["9.0", "Somou os lados em vez de multiplicar."]
      ]
    }
  ];
  window.ALT['a1-l16'] = [
    {
      q: "A função deve devolver F = 1 + 1/2 + 1/3 + … + 1/n. Ela trava logo na primeira volta. Ache a linha.",
      code: "float serie(int n) {\n    float F = 0;\n    for (int i = 0; i <= n; i++)\n        F = F + 1.0 / i;\n    return F;\n}",
      line: 3,
      fixes: [
        ["for (int i = 1; i <= n; i++)", "O primeiro denominador é 1; com 0 há divisão por zero."],
        ["for (int i = 0; i < n; i++)", "Ainda começaria dividindo por zero."],
        ["for (int i = 1; i < n; i++)", "Deixaria o último termo de fora."]
      ],
      why: "Com `i = 0` o primeiro termo é 1.0 / 0, uma divisão por zero."
    },
    {
      q: "A função deve devolver F = 1 + 1/2 + … + 1/n. Para n = 3 devolve 0.33 em vez de aproximadamente 1.83. Ache a linha.",
      code: "float serie(int n) {\n    float F = 0;\n    for (int i = 1; i <= n; i++)\n        F = 1.0 / i;\n    return F;\n}",
      line: 4,
      fixes: [
        ["F = F + 1.0 / i;", "Acumula cada termo no total."],
        ["F += i;", "Somaria os denominadores."],
        ["F = F * 1.0 / i;", "Multiplicaria em vez de somar."]
      ],
      why: "A atribuição substitui o total a cada volta, ficando só com o último termo."
    }
  ];
  window.ALT['a1-l17'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nchar tipo(int n) {\n    return n % 2 == 0 ? 'P' : 'I';\n}\n\nint main() {\n    printf(\"%c%c%c\\n\", tipo(4), tipo(7), tipo(10));\n    return 0;\n}",
      opts: [
        ["PIP", "4 é par (P), 7 é ímpar (I), 10 é par (P)."],
        ["IPI", "Trocou par e ímpar."],
        ["PPP", "7 é ímpar."],
        ["PIPI", "São só três chamadas."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint sinal(int x) {\n    if (x > 0)\n        return 1;\n    if (x < 0)\n        return -1;\n    return 0;\n}\n\nint main() {\n    printf(\"%d %d %d\\n\", sinal(-9), sinal(0), sinal(4));\n    return 0;\n}",
      opts: [
        ["-1 0 1", "Negativo devolve -1, zero devolve 0, positivo devolve 1."],
        ["1 0 1", "-9 é negativo."],
        ["-9 0 4", "A função devolve só -1, 0 ou 1."],
        ["-1 1 1", "O zero não é positivo."]
      ]
    }
  ];
  window.ALT['a1-l18'] = [
    {
      q: "A função devolve o custo com imposto, mas a main ignora o retorno. Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nfloat comImposto(float custo, float taxa) {\n    return custo + custo * taxa / 100;\n}\n\nint main() {\n    float custo = 200;\n    comImposto(custo, 10);\n    printf(\"%.2f\\n\", custo);\n    return 0;\n}",
      opts: [
        ["200.00", "O valor devolvido não foi guardado em lugar nenhum."],
        ["220.00", "Só mudaria se a main guardasse o retorno em `custo`."],
        ["20.00", "Esse seria o valor do imposto."],
        ["0.00", "`custo` continua valendo 200."]
      ]
    },
    {
      q: "Desta vez a função altera a variável global. Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nfloat custo = 100;\n\nvoid somaImposto(float taxa) {\n    custo = custo + custo * taxa / 100;\n}\n\nint main() {\n    somaImposto(10);\n    printf(\"%.2f\\n\", custo);\n    return 0;\n}",
      opts: [
        ["110.00", "A função altera diretamente a variável global."],
        ["100.00", "Só uma cópia seria alterada se `custo` fosse parâmetro, mas aqui é global."],
        ["10.00", "Esse é o valor do imposto."],
        ["0.00", "Nada zera a variável."]
      ]
    }
  ];
  window.ALT['a1-l19'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint converter(int h) {\n    if (h == 0)\n        return 12;\n    if (h > 12)\n        return h - 12;\n    return h;\n}\n\nchar periodo(int h) {\n    return (h >= 12) ? 'P' : 'A';\n}\n\nint main() {\n    int horas[3] = {0, 12, 23};\n    for (int i = 0; i < 3; i++)\n        printf(\"%d %c.M. \", converter(horas[i]), periodo(horas[i]));\n    printf(\"\\n\");\n    return 0;\n}",
      opts: [
        ["12 A.M. 12 P.M. 11 P.M. ", "Meia-noite vira 12 A.M.; meio-dia fica 12 P.M.; 23 vira 11 P.M."],
        ["0 A.M. 12 P.M. 11 P.M. ", "A hora 0 vira 12."],
        ["12 A.M. 0 P.M. 11 P.M. ", "O meio-dia continua 12."],
        ["12 A.M. 12 A.M. 11 P.M. ", "O meio-dia já é P.M."]
      ]
    },
    {
      q: "Qual a saída? (soma de 30 minutos às 23:50)",
      saida: true,
      code: "#include <stdio.h>\nint novaHora(int h, int m, int add) {\n    return (h + (m + add) / 60) % 24;\n}\n\nint novoMin(int m, int add) {\n    return (m + add) % 60;\n}\n\nint main() {\n    printf(\"%02d:%02d\\n\", novaHora(23, 50, 30), novoMin(50, 30));\n    return 0;\n}",
      opts: [
        ["00:20", "23:50 + 30 min = 00:20 do dia seguinte."],
        ["24:20", "O `% 24` leva a hora 24 de volta para 0."],
        ["23:80", "Os minutos também passam de 60."],
        ["0:20", "O formato `%02d` completa com zero."]
      ]
    }
  ];
  window.ALT['a1-l20'] = [
    {
      q: "A conta de energia custa R$ 0,50 por kWh até 100 kWh e R$ 0,80 por kWh acima disso (só o que passa de 100). Entrada (consumos, termina com 0): <code>80 150 0</code>. Qual a saída?",
      saida: true,
      stdin: "80 150 0",
      code: "#include <stdio.h>\nfloat conta(int kwh) {\n    if (kwh <= 100)\n        return kwh * 0.5;\n    return 100 * 0.5 + (kwh - 100) * 0.8;\n}\n\nint main() {\n    int k, qtd = 0;\n    float total = 0;\n    scanf(\"%d\", &k);\n    while (k != 0) {\n        total += conta(k);\n        qtd++;\n        scanf(\"%d\", &k);\n    }\n    printf(\"%d contas, total %.2f\\n\", qtd, total);\n    return 0;\n}",
      opts: [
        ["2 contas, total 130.00", "80 kWh custam 40; 150 kWh custam 50 + 40 = 90."],
        ["2 contas, total 160.00", "Cobraria R$ 0,80 sobre os 150 kWh inteiros."],
        ["3 contas, total 130.00", "O zero só encerra a leitura."],
        ["2 contas, total 90.00", "Esqueceu a primeira conta."]
      ]
    },
    {
      q: "Cada prestação tem uma categoria: A (10% de desconto), B (5%) ou outra (sem desconto). Entrada: <code>100 A 200 B 50 C 0</code>. Qual a saída?",
      saida: true,
      stdin: "100 A 200 B 50 C 0",
      code: "#include <stdio.h>\nfloat comDesconto(float v, char cat) {\n    switch (cat) {\n        case 'A':\n            return v * 0.90;\n        case 'B':\n            return v * 0.95;\n        default:\n            return v;\n    }\n}\n\nint main() {\n    float v, total = 0;\n    char c;\n    scanf(\"%f\", &v);\n    while (v != 0) {\n        scanf(\" %c\", &c);\n        total += comDesconto(v, c);\n        scanf(\"%f\", &v);\n    }\n    printf(\"total %.2f\\n\", total);\n    return 0;\n}",
      opts: [
        ["total 330.00", "90 + 190 + 50."],
        ["total 350.00", "Sem nenhum desconto."],
        ["total 340.00", "Aplicou só o desconto da categoria A."],
        ["total 280.00", "Descontou também a categoria C."]
      ]
    }
  ];
  window.ALT['a1-l21'] = [
    {
      q: "Esta versão também conta os lançamentos. Os lançamentos saem nesta ordem: 4, 6, 9, 4. Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint seq[] = {4, 6, 9, 4};\nint k = 0;\n\nint lancar() {\n    return seq[k++];\n}\n\nint main() {\n    int s = lancar();\n    if (s == 7 || s == 11) {\n        printf(\"natural: ganhou\\n\");\n        return 0;\n    }\n    if (s == 2 || s == 3 || s == 12) {\n        printf(\"craps: perdeu\\n\");\n        return 0;\n    }\n    int ponto = s;\n    do {\n        s = lancar();\n    } while (s != ponto && s != 7);\n    printf(\"%s em %d lancamentos\\n\", s == ponto ? \"ganhou\" : \"perdeu\", k);\n    return 0;\n}",
      opts: [
        ["ganhou em 4 lancamentos", "O ponto é 4; os lançamentos 6 e 9 não decidem; o quarto lançamento é 4 de novo."],
        ["perdeu em 4 lancamentos", "Nenhum 7 apareceu."],
        ["ganhou em 3 lancamentos", "Foram usados os quatro valores da sequência."],
        ["ganhou em 1 lancamentos", "O primeiro lançamento define o ponto, não o resultado."]
      ]
    },
    {
      q: "Mesma versão com contagem. Os lançamentos saem nesta ordem: 8, 2, 12, 7. Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint seq[] = {8, 2, 12, 7};\nint k = 0;\n\nint lancar() {\n    return seq[k++];\n}\n\nint main() {\n    int s = lancar();\n    if (s == 7 || s == 11) {\n        printf(\"natural: ganhou\\n\");\n        return 0;\n    }\n    if (s == 2 || s == 3 || s == 12) {\n        printf(\"craps: perdeu\\n\");\n        return 0;\n    }\n    int ponto = s;\n    do {\n        s = lancar();\n    } while (s != ponto && s != 7);\n    printf(\"%s em %d lancamentos\\n\", s == ponto ? \"ganhou\" : \"perdeu\", k);\n    return 0;\n}",
      opts: [
        ["perdeu em 4 lancamentos", "O 2 e o 12 só valem como craps no primeiro lançamento; o 7 decide e a partida termina."],
        ["craps: perdeu", "O craps só vale se sair no primeiro lançamento."],
        ["ganhou em 4 lancamentos", "O ponto (8) não saiu de novo."],
        ["perdeu em 2 lancamentos", "A busca continua até aparecer o ponto ou o 7."]
      ]
    }
  ];
  window.ALT['a1-d01'] = [
    {
      q: "Qual cabeçalho completa a função, que só imprime uma mensagem e não devolve nada?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    printf(\"Bem-vindo!\\n\");\n}",
      opts: [
        ["`void boasVindas()`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`int boasVindas()`", "Uma função `int` precisa devolver um inteiro."],
        ["`void boasVindas`", "Faltam os parênteses."],
        ["`boasVindas()`", "Falta o tipo de retorno."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid boasVindas() {\n    printf(\"Bem-vindo\\n\");\n}\n\nint main() {\n    boasVindas();\n    boasVindas();\n    printf(\"Fim\\n\");\n    return 0;\n}",
      opts: [
        ["Bem-vindo\nBem-vindo\nFim", "Cada chamada executa a função inteira."],
        ["Bem-vindo\nFim", "A função é chamada duas vezes."],
        ["Bem-vindo\nBem-vindo", "Falta o \"Fim\"."],
        ["Fim\nBem-vindo\nBem-vindo", "A ordem é a das chamadas."]
      ]
    }
  ];
  window.ALT['a1-d02'] = [
    {
      q: "Qual cabeçalho completa a função?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    return n * 2;\n}",
      opts: [
        ["`int dobro(int n)`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`void dobro(int n)`", "`void` não devolve valor, mas o corpo tem `return`."],
        ["`int dobro(n)`", "Faltam os tipos dos parâmetros."],
        ["`int dobro(int n);`", "O `;` transforma a linha em protótipo, não em definição."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint dobro(int n) {\n    return n * 2;\n}\n\nint main() {\n    printf(\"%d\\n\", dobro(dobro(3)));\n    return 0;\n}",
      opts: [
        ["12", "dobro(3) = 6 e dobro(6) = 12."],
        ["6", "Só a chamada de dentro."],
        ["9", "Somou em vez de dobrar."],
        ["24", "Dobrou três vezes."]
      ]
    }
  ];
  window.ALT['a1-d03'] = [
    {
      q: "Qual cabeçalho completa a função, que devolve 1 para par e 0 para ímpar?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    return n % 2 == 0;\n}",
      opts: [
        ["`int ehPar(int n)`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`void ehPar(int n)`", "`void` não devolve valor, mas o corpo tem `return`."],
        ["`int ehPar(n)`", "Faltam os tipos dos parâmetros."],
        ["`int ehPar(int n, int m)`", "A função recebe um único número."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint ehPar(int n) {\n    return n % 2 == 0;\n}\n\nint main() {\n    printf(\"%d %d\\n\", ehPar(10), ehPar(7));\n    return 0;\n}",
      opts: [
        ["1 0", "10 é par (1) e 7 é ímpar (0)."],
        ["0 1", "Trocou os resultados."],
        ["1 1", "7 não é par."],
        ["10 7", "A função devolve só 1 ou 0."]
      ]
    }
  ];
  window.ALT['a1-d04'] = [
    {
      q: "Qual cabeçalho completa a função?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    return base * altura;\n}",
      opts: [
        ["`float area(float base, float altura)`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`void area(float base, float altura)`", "`void` não devolve valor, mas o corpo tem `return`."],
        ["`float area(float base; float altura)`", "Separar parâmetros com ponto e vírgula não é permitido: é vírgula."],
        ["`float area(base, altura)`", "Faltam os tipos dos parâmetros."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nfloat area(float base, float altura) {\n    return base * altura;\n}\n\nint main() {\n    printf(\"%.1f\\n\", area(5, 3) + area(2, 2));\n    return 0;\n}",
      opts: [
        ["19.0", "15 + 4."],
        ["15.0", "Esqueceu a segunda chamada."],
        ["8.0", "Somou os lados em vez de multiplicar."],
        ["16.0", "Somou 15 + 1."]
      ]
    }
  ];
  window.ALT['a1-d05'] = [
    {
      q: "Qual cabeçalho completa a função?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    return (n1 + n2 + n3) / 3;\n}",
      opts: [
        ["`float media(float n1, float n2, float n3)`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`void media(float n1, float n2, float n3)`", "`void` não devolve valor, mas o corpo tem `return`."],
        ["`float media(float n1; float n2; float n3)`", "Separar parâmetros com ponto e vírgula não é permitido: é vírgula."],
        ["`float media(n1, n2, n3)`", "Faltam os tipos dos parâmetros."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nfloat media(float n1, float n2, float n3) {\n    return (n1 + n2 + n3) / 3;\n}\n\nint main() {\n    printf(\"%.2f\\n\", media(6, 9, 6));\n    return 0;\n}",
      opts: [
        ["7.00", "(6 + 9 + 6) ÷ 3."],
        ["21.00", "Esqueceu de dividir."],
        ["7.50", "Dividiu por 2."],
        ["6.00", "Mostrou só a moda."]
      ]
    }
  ];
  window.ALT['a1-d06'] = [
    {
      q: "Qual cabeçalho completa a função?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    return c * 9 / 5 + 32;\n}",
      opts: [
        ["`float celsiusParaF(float c)`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`void celsiusParaF(float c)`", "`void` não devolve valor, mas o corpo tem `return`."],
        ["`float celsiusParaF(c)`", "Faltam os tipos dos parâmetros."],
        ["`float celsiusParaF(float c, float f)`", "A função recebe um único valor."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nfloat celsiusParaF(float c) {\n    return c * 9 / 5 + 32;\n}\n\nint main() {\n    printf(\"%.1f %.1f\\n\", celsiusParaF(0), celsiusParaF(100));\n    return 0;\n}",
      opts: [
        ["32.0 212.0", "0 °C = 32 °F e 100 °C = 212 °F."],
        ["0.0 100.0", "Mostrou os valores de entrada."],
        ["32.0 180.0", "Esqueceu de somar 32 na segunda."],
        ["32.0 132.0", "Errou a multiplicação na segunda."]
      ]
    }
  ];
  window.ALT['a1-d07'] = [
    {
      q: "Qual cabeçalho completa a função, que mostra o nome recebido?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    printf(\"%s\\n\", nome);\n}",
      opts: [
        ["`void mostrarNome(char nome[])`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`void mostrarNome(char nome)`", "Receberia um único caractere, não o texto."],
        ["`int mostrarNome(char nome[])`", "Uma função `int` precisa devolver um inteiro."],
        ["`void mostrarNome(nome[])`", "Faltam os tipos dos parâmetros."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid mostrarNome(char nome[]) {\n    printf(\"%s\\n\", nome);\n}\n\nint main() {\n    char n[] = \"Ana\";\n    mostrarNome(n);\n    mostrarNome(\"Rui\");\n    return 0;\n}",
      opts: [
        ["Ana\nRui", "Cada chamada mostra o seu texto, em linhas separadas."],
        ["Ana", "Faltou a segunda chamada."],
        ["Rui\nAna", "A ordem é a das chamadas."],
        ["AnaRui", "Há uma quebra de linha depois de cada nome."]
      ]
    }
  ];
  window.ALT['a1-d08'] = [
    {
      q: "Qual cabeçalho completa a função?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    int f = 1;\n    for (int i = 2; i <= n; i++)\n        f = f * i;\n    return f;\n}",
      opts: [
        ["`int fatorial(int n)`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`void fatorial(int n)`", "`void` não devolve valor, mas o corpo tem `return`."],
        ["`int fatorial(n)`", "Faltam os tipos dos parâmetros."],
        ["`int fatorial(int f)`", "O corpo usa `n`, não `f`, como parâmetro."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint fatorial(int n) {\n    int f = 1;\n    for (int i = 2; i <= n; i++)\n        f = f * i;\n    return f;\n}\n\nint main() {\n    printf(\"%d\\n\", fatorial(4) + fatorial(3));\n    return 0;\n}",
      opts: [
        ["30", "24 + 6."],
        ["24", "Esqueceu a segunda chamada."],
        ["10", "Somou 4 + 3 + 2 + 1."],
        ["720", "Multiplicou em vez de somar os fatoriais."]
      ]
    }
  ];
  window.ALT['a1-d09'] = [
    {
      q: "Qual cabeçalho completa a função, que só imprime as opções?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    printf(\"1-Novo\\n\");\n    printf(\"2-Sair\\n\");\n}",
      opts: [
        ["`void menu()`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`int menu()`", "Uma função `int` precisa devolver um inteiro."],
        ["`void menu`", "Faltam os parênteses."],
        ["`menu()`", "Falta o tipo de retorno."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid menu() {\n    printf(\"1-Novo\\n\");\n    printf(\"2-Sair\\n\");\n}\n\nint main() {\n    menu();\n    printf(\"Opcao: \");\n    menu();\n    return 0;\n}",
      opts: [
        ["1-Novo\n2-Sair\nOpcao: 1-Novo\n2-Sair", "O \"Opcao: \" fica entre as duas chamadas e não tem quebra de linha."],
        ["1-Novo\n2-Sair\n1-Novo\n2-Sair\nOpcao: ", "O texto \"Opcao: \" está entre as chamadas."],
        ["Opcao: 1-Novo\n2-Sair\n1-Novo\n2-Sair", "O menu aparece antes do \"Opcao: \"."],
        ["1-Novo\n2-Sair\nOpcao:\n1-Novo\n2-Sair", "O \"Opcao: \" não tem `\\n`."]
      ]
    }
  ];
  window.ALT['a1-d10'] = [
    {
      q: "Qual cabeçalho completa a função?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    return a + b;\n}",
      opts: [
        ["`int soma(int a, int b)`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`void soma(int a, int b)`", "`void` não devolve valor, mas o corpo tem `return`."],
        ["`int soma(int a; int b)`", "Separar parâmetros com ponto e vírgula não é permitido: é vírgula."],
        ["`int soma(a, b)`", "Faltam os tipos dos parâmetros."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint soma(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    printf(\"%d\\n\", soma(soma(1, 2), soma(3, 4)));\n    return 0;\n}",
      opts: [
        ["10", "soma(1, 2) = 3, soma(3, 4) = 7 e 3 + 7."],
        ["3", "Só a primeira chamada de dentro."],
        ["7", "Só a segunda chamada de dentro."],
        ["37", "Juntou os dois números como texto."]
      ]
    }
  ];
  window.ALT['a1-r01'] = [
    {
      q: "Qual cabeçalho completa a função?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    if (a > b)\n        return a;\n    return b;\n}",
      opts: [
        ["`int maior(int a, int b)`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`void maior(int a, int b)`", "`void` não devolve valor, mas o corpo tem `return`."],
        ["`int maior(int a; int b)`", "Separar parâmetros com ponto e vírgula não é permitido: é vírgula."],
        ["`int maior(a, b)`", "Faltam os tipos dos parâmetros."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint maior(int a, int b) {\n    if (a > b)\n        return a;\n    return b;\n}\n\nint main() {\n    printf(\"%d\\n\", maior(3, maior(8, 5)));\n    return 0;\n}",
      opts: [
        ["8", "maior(8, 5) = 8; depois maior(3, 8) = 8."],
        ["3", "Esse é o primeiro argumento."],
        ["5", "Esse é o menor dos valores de dentro."],
        ["16", "Somou os dois maiores."]
      ]
    }
  ];
  window.ALT['a1-r02'] = [
    {
      q: "Qual cabeçalho completa a função, que conta os caracteres até o terminador?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    int c = 0;\n    while (s[c] != '\\0')\n        c++;\n    return c;\n}",
      opts: [
        ["`int comprimento(char s[])`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`int comprimento(char s)`", "Receberia um único caractere, não o texto."],
        ["`void comprimento(char s[])`", "`void` não devolve valor, mas o corpo tem `return`."],
        ["`int comprimento(s[])`", "Faltam os tipos dos parâmetros."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint comprimento(char s[]) {\n    int c = 0;\n    while (s[c] != '\\0')\n        c++;\n    return c;\n}\n\nint main() {\n    printf(\"%d\\n\", comprimento(\"algoritmo\") - comprimento(\"ii\"));\n    return 0;\n}",
      opts: [
        ["7", "9 letras menos 2."],
        ["9", "Esqueceu de subtrair."],
        ["11", "Somou em vez de subtrair."],
        ["2", "Esse é o tamanho da segunda palavra."]
      ]
    }
  ];
  window.ALT['a1-r03'] = [
    {
      q: "Qual cabeçalho completa a função, que devolve o fatorial em um tipo maior?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    long f = 1;\n    for (int i = 2; i <= n; i++)\n        f = f * i;\n    return f;\n}",
      opts: [
        ["`long fatorial(int n)`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`int fatorial(int n)`", "O corpo calcula em `long` e o retorno é `int`, que é menor."],
        ["`void fatorial(int n)`", "`void` não devolve valor, mas o corpo tem `return`."],
        ["`long fatorial(n)`", "Faltam os tipos dos parâmetros."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nlong fatorial(int n) {\n    long f = 1;\n    for (int i = 2; i <= n; i++)\n        f = f * i;\n    return f;\n}\n\nint main() {\n    printf(\"%ld\\n\", fatorial(5) / fatorial(3));\n    return 0;\n}",
      opts: [
        ["20", "120 ÷ 6."],
        ["5", "Seria 5! ÷ 4!."],
        ["2", "Seria 3! ÷ 3."],
        ["720", "Multiplicou em vez de dividir."]
      ]
    }
  ];
  window.ALT['a1-r04'] = [
    {
      q: "Qual cabeçalho completa a função?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    int s = 0;\n    for (int i = 0; i < n; i++)\n        s += v[i];\n    return s;\n}",
      opts: [
        ["`int somaVetor(int v[], int n)`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`void somaVetor(int v[], int n)`", "`void` não devolve valor, mas o corpo tem `return`."],
        ["`int somaVetor(int v[]; int n)`", "Separar parâmetros com ponto e vírgula não é permitido: é vírgula."],
        ["`int somaVetor(int v, int n)`", "`v` é usado com índice: precisa ser um vetor."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint somaVetor(int v[], int n) {\n    int s = 0;\n    for (int i = 0; i < n; i++)\n        s += v[i];\n    return s;\n}\n\nint main() {\n    int v[4] = {3, 1, 4, 1};\n    printf(\"%d\\n\", somaVetor(v, 3));\n    return 0;\n}",
      opts: [
        ["8", "Só os três primeiros: 3 + 1 + 4."],
        ["9", "Somou os quatro elementos."],
        ["5", "Somou só os dois primeiros e o último."],
        ["4", "Mostrou só o maior."]
      ]
    }
  ];
  window.ALT['a1-r05'] = [
    {
      q: "Qual cabeçalho completa a função?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    return 3.14159f * r * r;\n}",
      opts: [
        ["`float areaCirculo(float r)`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`void areaCirculo(float r)`", "`void` não devolve valor, mas o corpo tem `return`."],
        ["`float areaCirculo(r)`", "Faltam os tipos dos parâmetros."],
        ["`int areaCirculo(float r)`", "A área tem casas decimais; `int` as perderia."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nfloat areaCirculo(float r) {\n    return 3.14159f * r * r;\n}\n\nint main() {\n    printf(\"%.2f\\n\", areaCirculo(2));\n    return 0;\n}",
      opts: [
        ["12.57", "π × 2 × 2."],
        ["6.28", "Seria o perímetro (2πr)."],
        ["3.14", "Seria a área do círculo de raio 1."],
        ["12.00", "Usou 3 no lugar de π."]
      ]
    }
  ];
  window.ALT['a1-r06'] = [
    {
      q: "Qual cabeçalho completa a função, que devolve a média de um vetor de inteiros?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    int s = 0;\n    for (int i = 0; i < n; i++)\n        s += v[i];\n    return (float) s / n;\n}",
      opts: [
        ["`float mediaVetor(int v[], int n)`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`int mediaVetor(int v[], int n)`", "A média tem casas decimais; `int` as perderia."],
        ["`float mediaVetor(int v[]; int n)`", "Separar parâmetros com ponto e vírgula não é permitido: é vírgula."],
        ["`void mediaVetor(int v[], int n)`", "`void` não devolve valor, mas o corpo tem `return`."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nfloat mediaVetor(int v[], int n) {\n    int s = 0;\n    for (int i = 0; i < n; i++)\n        s += v[i];\n    return (float) s / n;\n}\n\nint main() {\n    int v[4] = {2, 3, 4, 6};\n    printf(\"%.2f\\n\", mediaVetor(v, 4));\n    return 0;\n}",
      opts: [
        ["3.75", "15 ÷ 4."],
        ["3.00", "Seria a divisão inteira."],
        ["15.00", "Esqueceu de dividir."],
        ["4.00", "Arredondou para cima."]
      ]
    }
  ];
  window.ALT['a1-r07'] = [
    {
      q: "Qual cabeçalho completa a função, que devolve 1 para primo e 0 caso contrário?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    if (n < 2) return 0;\n    for (int i = 2; i < n; i++)\n        if (n % i == 0) return 0;\n    return 1;\n}",
      opts: [
        ["`int ehPrimo(int n)`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`void ehPrimo(int n)`", "`void` não devolve valor, mas o corpo tem `return`."],
        ["`int ehPrimo(n)`", "Faltam os tipos dos parâmetros."],
        ["`int ehPrimo(int n, int i)`", "O `i` é uma variável do laço, não um parâmetro."]
      ]
    },
    {
      q: "Qual a saída? (quantos primos há entre 1 e 10)",
      saida: true,
      code: "#include <stdio.h>\nint ehPrimo(int n) {\n    if (n < 2)\n        return 0;\n    for (int i = 2; i < n; i++)\n        if (n % i == 0)\n            return 0;\n    return 1;\n}\n\nint main() {\n    int c = 0;\n    for (int i = 1; i <= 10; i++)\n        c += ehPrimo(i);\n    printf(\"%d\\n\", c);\n    return 0;\n}",
      opts: [
        ["4", "Os primos são 2, 3, 5 e 7."],
        ["5", "O 1 não é primo."],
        ["3", "Faltou algum primo."],
        ["10", "Contou todos os números."]
      ]
    }
  ];
  window.ALT['a1-r08'] = [
    {
      q: "Qual cabeçalho completa a função?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    return (f - 32) * 5 / 9;\n}",
      opts: [
        ["`float fParaC(float f)`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`void fParaC(float f)`", "`void` não devolve valor, mas o corpo tem `return`."],
        ["`float fParaC(f)`", "Faltam os tipos dos parâmetros."],
        ["`int fParaC(float f)`", "O resultado tem casas decimais; `int` as perderia."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nfloat fParaC(float f) {\n    return (f - 32) * 5 / 9;\n}\n\nint main() {\n    printf(\"%.1f %.1f\\n\", fParaC(212), fParaC(32));\n    return 0;\n}",
      opts: [
        ["100.0 0.0", "212 °F = 100 °C e 32 °F = 0 °C."],
        ["180.0 0.0", "Esqueceu de multiplicar por 5/9."],
        ["100.0 32.0", "Esqueceu de subtrair 32 na segunda."],
        ["212.0 32.0", "Mostrou os valores de entrada."]
      ]
    }
  ];
  window.ALT['a1-r09'] = [
    {
      q: "Qual cabeçalho completa a função?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    double r = 1;\n    for (int i = 0; i < exp; i++)\n        r = r * base;\n    return r;\n}",
      opts: [
        ["`double potencia(double base, int exp)`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`void potencia(double base, int exp)`", "`void` não devolve valor, mas o corpo tem `return`."],
        ["`double potencia(double base; int exp)`", "Separar parâmetros com ponto e vírgula não é permitido: é vírgula."],
        ["`double potencia(base, exp)`", "Faltam os tipos dos parâmetros."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\ndouble potencia(double base, int exp) {\n    double r = 1;\n    for (int i = 0; i < exp; i++)\n        r = r * base;\n    return r;\n}\n\nint main() {\n    printf(\"%.0f\\n\", potencia(2, 5) + potencia(3, 2));\n    return 0;\n}",
      opts: [
        ["41", "32 + 9."],
        ["32", "Esqueceu a segunda chamada."],
        ["19", "Somou 2 × 5 + 3 × 3."],
        ["11", "Somou as bases e os expoentes."]
      ]
    }
  ];
  window.ALT['a1-r10'] = [
    {
      q: "Qual cabeçalho completa a função, que devolve o menor valor?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    float m = v[0];\n    for (int i = 1; i < n; i++)\n        if (v[i] < m) m = v[i];\n    return m;\n}",
      opts: [
        ["`float menor(float v[], int n)`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`void menor(float v[], int n)`", "`void` não devolve valor, mas o corpo tem `return`."],
        ["`float menor(float v, int n)`", "`v` é usado com índice: precisa ser um vetor."],
        ["`float menor(float v[]; int n)`", "Separar parâmetros com ponto e vírgula não é permitido: é vírgula."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nfloat menor(float v[], int n) {\n    float m = v[0];\n    for (int i = 1; i < n; i++)\n        if (v[i] < m)\n            m = v[i];\n    return m;\n}\n\nint main() {\n    float v[4] = {4.5, 2.0, 7.0, 2.5};\n    printf(\"%.1f %.1f\\n\", menor(v, 4), menor(v, 1));\n    return 0;\n}",
      opts: [
        ["2.0 4.5", "Com os 4 elementos o menor é 2,0; com 1 elemento só existe o 4,5."],
        ["2.0 2.0", "Com n = 1 só o primeiro elemento é considerado."],
        ["4.5 2.0", "Trocou os resultados."],
        ["2.0 7.0", "Com n = 1 não há comparação."]
      ]
    }
  ];
  window.ALT['a1-p01'] = [
    {
      q: "Complete o programa: a função <code>saudacao</code> recebe um nome e imprime “Olá, nome!”; a main a chama.",
      code: "#include <stdio.h>\n\nvoid saudacao([[char nome[]]]) {\n    printf(\"Ola, %s!\\n\", nome);\n}\n\nint main() {\n    saudacao([[\"Ana\"]]);\n    return 0;\n}",
      extra: [
        ["char nome", "Seria um único caractere."],
        ["nome[]", "Falta o tipo."],
        ["'Ana'", "Aspas simples são para um único caractere."],
        ["saudacao", "Sem aspas seria um nome de variável."]
      ],
      why: "O parâmetro é um vetor de char; a main envia um texto entre aspas duplas."
    },
    {
      q: "Complete o programa: a função devolve o quadrado de um inteiro e a main mostra o de 4.",
      code: "#include <stdio.h>\n\n[[int quadrado(int n)]] {\n    [[return n * n;]]\n}\n\nint main() {\n    printf(\"%d\\n\", [[quadrado(4)]]);\n    return 0;\n}",
      extra: [
        ["void quadrado(int n)", "Não devolve valor."],
        ["return n;", "Devolveria o próprio número."],
        ["quadrado", "Sem os parênteses e o argumento não chama a função."],
        ["quadrado(int 4)", "Na chamada não se declara tipo."]
      ],
      why: "O tipo de retorno é `int`, o `return` entrega o resultado e a main imprime o valor devolvido."
    }
  ];
  window.ALT['a1-p02'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid linha(int n) {\n    for (int i = 0; i < n; i++)\n        printf(\"-\");\n    printf(\"\\n\");\n}\n\nint main() {\n    linha(3);\n    printf(\"X\\n\");\n    linha(5);\n    return 0;\n}",
      opts: [
        ["---\nX\n-----", "O parâmetro decide quantos traços cada chamada imprime."],
        ["---\n-----\nX", "O \"X\" está entre as duas chamadas."],
        ["-----\nX\n---", "A primeira chamada é com 3."],
        ["---X-----", "Cada `linha` termina com quebra de linha."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid linha() {\n    printf(\"----\\n\");\n}\n\nint main() {\n    for (int i = 0; i < 3; i++) {\n        linha();\n        printf(\"%d\\n\", i);\n    }\n    return 0;\n}",
      opts: [
        ["----\n0\n----\n1\n----\n2", "A linha e o número se alternam a cada volta."],
        ["----\n----\n----\n0\n1\n2", "O número é impresso dentro do laço, depois de cada linha."],
        ["0\n1\n2\n----", "A linha é impressa a cada volta."],
        ["----\n0\n1\n2", "A linha aparece a cada volta, não só uma vez."]
      ]
    }
  ];
  window.ALT['a1-p03'] = [
    null,
    {
      q: "A função deve devolver o quadrado de um inteiro, mas o programa mostra o endereço da função. Ache a linha errada.",
      code: "int quadrado(int x) {\n    return x * x;\n}\n\nint main() {\n    int n = 9;\n    printf(\"%d\\n\", quadrado);\n    return 0;\n}",
      line: 7,
      fixes: [
        ["printf(\"%d\\n\", quadrado(n));", "A chamada leva o argumento entre parênteses."],
        ["printf(\"%d\\n\", quadrado[n]);", "Colchetes são para vetores."],
        ["printf(\"%d\\n\", quadrado * n);", "Multiplicaria o endereço da função."]
      ],
      why: "Sem os parênteses e o argumento, `quadrado` é o endereço da função, não uma chamada."
    }
  ];
  window.ALT['a1-p04'] = [
    {
      q: "Complete: ler duas notas na main e mostrar a média chamando a função.",
      code: "[[float media(float a, float b)]] {\n    return [[(a + b) / 2]];\n}\n\nint main() {\n    float x, y;\n    scanf(\"%f %f\", &x, [[&y]]);\n    printf(\"%.1f\\n\", [[media(x, y)]]);\n    return 0;\n}",
      extra: [
        ["void media(float a, float b)", "Não devolve valor."],
        ["a + b / 2", "Sem parênteses só o b é dividido."],
        ["y", "O scanf precisa do endereço."],
        ["media(float x, float y)", "Na chamada não se declaram tipos."]
      ],
      why: "A função recebe os dois valores e devolve a média; a main usa o retorno no printf."
    },
    {
      q: "Complete a função que devolve o maior de três inteiros.",
      code: "int maior3(int a, int b, int c) {\n    int m = a;\n    if (b > m)\n        m = b;\n    if ([[c > m]])\n        m = c;\n    return [[m]];\n}\n\nint main() {\n    printf(\"%d\\n\", maior3([[4]], 9, 6));\n    return 0;\n}",
      extra: [
        ["c > b", "Comparar só com b pode ignorar o maior até aqui."],
        ["a", "Devolveria o primeiro argumento."],
        ["m = 4", "Isso não é um argumento."],
        ["\"4\"", "Seria um texto."]
      ],
      why: "A variável `m` guarda o maior até o momento; cada novo valor é comparado com ela."
    }
  ];
  window.ALT['a1-p05'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid repetir(char c, int n) {\n    for (int i = 0; i < n; i++)\n        printf(\"%c\", c);\n    printf(\"\\n\");\n}\n\nint main() {\n    repetir('a', 2);\n    repetir('b', 0);\n    repetir('c', 3);\n    return 0;\n}",
      opts: [
        ["aa\n\nccc", "Com n = 0 o laço não executa, mas o `\\n` ainda é impresso (linha vazia)."],
        ["aa\nccc", "A chamada com 0 ainda imprime a quebra de linha."],
        ["aa\nb\nccc", "Com n = 0 não há nenhuma letra."],
        ["aabccc", "Cada chamada termina com quebra de linha."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid dobrarEMostrar(int n) {\n    n = n * 2;\n    printf(\"%d \", n);\n}\n\nint main() {\n    int x = 3;\n    dobrarEMostrar(x);\n    dobrarEMostrar(x);\n    printf(\"%d\\n\", x);\n    return 0;\n}",
      opts: [
        ["6 6 3", "O parâmetro é uma cópia: `x` continua 3 e cada chamada mostra 6."],
        ["6 12 12", "`x` não muda entre as chamadas."],
        ["6 6 6", "`x` continua valendo 3 na main."],
        ["3 3 3", "Dentro da função a cópia vale 6."]
      ]
    }
  ];
  window.ALT['a1-p06'] = [
    null,
    {
      q: "A função deve devolver o maior de três inteiros. Para (9, 1, 5) ela devolve 5. Ache a linha.",
      code: "int maior3(int a, int b, int c) {\n    int m = a;\n    if (b > m)\n        m = b;\n    if (c > b)\n        m = c;\n    return m;\n}",
      line: 5,
      fixes: [
        ["if (c > m)", "O terceiro valor deve ser comparado com o maior até aqui."],
        ["if (c > a)", "Ignora o que b possa ter mudado."],
        ["if (c >= b)", "Continua comparando com b, não com m."]
      ],
      why: "Comparar `c` com `b` esquece que o maior pode ser `a`; a comparação certa é com `m`."
    }
  ];
  window.ALT['a1-p07'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint media(int a, int b, int c) {\n    return (a + b + c) / 3;\n}\n\nint main() {\n    printf(\"%d %.2f\\n\", media(7, 8, 10), (7 + 8 + 10) / 3.0);\n    return 0;\n}",
      opts: [
        ["8 8.33", "A função devolve `int`, que perde a parte decimal; a divisão por 3.0 não perde."],
        ["8.33 8.33", "O retorno é `int`."],
        ["8 8.00", "3.0 mantém as casas decimais."],
        ["25 8.33", "A função divide por 3 antes de devolver."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nfloat media(float a, float b) {\n    return (a + b) / 2;\n}\n\nint main() {\n    printf(\"%.1f\\n\", media(media(4, 6), 8));\n    return 0;\n}",
      opts: [
        ["6.5", "media(4, 6) = 5; depois (5 + 8) ÷ 2."],
        ["6.0", "Esse seria (4 + 6 + 8) ÷ 3."],
        ["9.0", "Somou em vez de tirar a média."],
        ["5.0", "Só a chamada de dentro."]
      ]
    }
  ];
  window.ALT['a1-p08'] = [
    {
      q: "Complete a função que soma os inteiros de 1 até n e o uso na main.",
      code: "int somaAte(int n) {\n    int s = [[0]];\n    for (int i = 1; [[i <= n]]; i++)\n        s = s + i;\n    [[return s;]]\n}\n\nint main() {\n    printf(\"%d\\n\", somaAte(5));\n    return 0;\n}",
      extra: [
        ["1", "A soma começaria com um valor a mais."],
        ["i < n", "Deixaria o n de fora."],
        ["return i;", "`i` só existe dentro do laço."],
        ["printf(\"%d\", s);", "A função deve devolver o valor."]
      ],
      why: "A soma começa em 0, acumula de 1 até n e é devolvida."
    },
    {
      q: "Complete a função que calcula a potência com laço e o uso na main.",
      code: "int pot(int b, int e) {\n    int r = 1;\n    for (int i = 0; [[i < e]]; i++)\n        r = [[r * b]];\n    return r;\n}\n\nint main() {\n    printf(\"%d\\n\", [[pot(2, 5)]]);\n    return 0;\n}",
      extra: [
        ["i <= e", "Multiplicaria uma vez a mais."],
        ["r + b", "Somaria em vez de multiplicar."],
        ["pot(5, 2)", "Os argumentos estariam trocados."],
        ["pot", "Sem os parênteses não chama a função."]
      ],
      why: "A base é multiplicada `e` vezes sobre o acumulador `r`, que começa em 1."
    }
  ];
  window.ALT['a1-p09'] = [
    null,
    {
      q: "ehPrimo devolve 1 para primo e 0 caso contrário. Para n = 7 ela devolve 0. Ache a linha.",
      code: "int ehPrimo(int n) {\n    if (n < 2) return 0;\n    for (int i = 2; i < n; i++)\n        if (n % i == 0) return 0;\n    return 0;\n}",
      line: 5,
      fixes: [
        ["return 1;", "Se nenhum divisor foi achado, o número é primo."],
        ["return n;", "Devolveria o próprio número."],
        ["return i;", "`i` só existe dentro do laço."]
      ],
      why: "Depois do laço sem divisores a função deve devolver 1, não 0."
    }
  ];
  window.ALT['a1-p10'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nfloat paraKelvin(float c) {\n    return c + 273.15;\n}\n\nint main() {\n    printf(\"%.2f %.2f\\n\", paraKelvin(0), paraKelvin(-273.15));\n    return 0;\n}",
      opts: [
        ["273.15 0.00", "0 °C = 273,15 K e -273,15 °C é o zero absoluto."],
        ["0.00 273.15", "Trocou os resultados."],
        ["273.15 -273.15", "A soma com -273,15 dá zero."],
        ["273.00 0.00", "O formato mostra duas casas decimais."]
      ]
    },
    null
  ];
  window.ALT['a1-p11'] = [
    {
      q: "Qual cabeçalho completa a função, que imprime uma mensagem e não recebe nada?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    printf(\"Bem-vindo!\\n\");\n}",
      opts: [
        ["`void mensagemBoasVindas()`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`int mensagemBoasVindas()`", "Uma função `int` precisa devolver um inteiro."],
        ["`void mensagemBoasVindas(int n)`", "Não deveria receber nada."],
        ["`mensagemBoasVindas()`", "Falta o tipo de retorno."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid mensagemBoasVindas() {\n    printf(\"Bem-vindo!\\n\");\n}\n\nint main() {\n    mensagemBoasVindas();\n    printf(\"%d\\n\", 1 + 1);\n    return 0;\n}",
      opts: [
        ["Bem-vindo!\n2", "A mensagem da função vem primeiro, depois o resultado da conta."],
        ["2\nBem-vindo!", "A função é chamada antes do printf."],
        ["Bem-vindo!", "Falta a impressão da soma."],
        ["Bem-vindo!\n11", "`1 + 1` é uma soma, não texto."]
      ]
    }
  ];
  window.ALT['a1-p12'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid rotulo(char c) {\n    printf(\"[%c]\", c);\n}\n\nint main() {\n    for (char c = 'a'; c <= 'c'; c++)\n        rotulo(c);\n    printf(\"\\n\");\n    return 0;\n}",
      opts: [
        ["[a][b][c]", "O laço percorre as letras de a até c, chamando a função a cada volta."],
        ["[a]", "O laço continua até c."],
        ["[a][b]", "A condição inclui o c."],
        ["[c][b][a]", "O laço anda para frente."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid aviso(int n) {\n    if (n < 0)\n        return;\n    printf(\"ok\\n\");\n}\n\nint main() {\n    aviso(-1);\n    aviso(2);\n    aviso(0);\n    return 0;\n}",
      opts: [
        ["ok\nok", "Só n = -1 sai da função sem imprimir; 2 e 0 imprimem."],
        ["ok", "O zero não é negativo."],
        ["ok\nok\nok", "A chamada com -1 retorna antes do printf."],
        ["(nada)", "Duas das chamadas imprimem."]
      ]
    }
  ];
  window.ALT['a1-p13'] = [
    {
      q: "Qual cabeçalho completa a função, que mostra um inteiro e não devolve nada?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    printf(\"%d\\n\", n);\n}",
      opts: [
        ["`void mostrarNumero(int n)`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`int mostrarNumero(int n)`", "Uma função `int` precisa devolver um inteiro."],
        ["`void mostrarNumero(n)`", "Faltam os tipos dos parâmetros."],
        ["`void mostrarNumero()`", "O corpo usa `n`, que precisa ser um parâmetro."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid mostrarNumero(int n) {\n    printf(\"%d\\n\", n);\n}\n\nint main() {\n    mostrarNumero(3);\n    mostrarNumero(3 * 4);\n    return 0;\n}",
      opts: [
        ["3\n12", "O argumento pode ser uma expressão."],
        ["3\n3", "O segundo argumento é 3 * 4."],
        ["12\n3", "A ordem é a das chamadas."],
        ["3\n34", "`3 * 4` é uma multiplicação."]
      ]
    }
  ];
  window.ALT['a1-p15'] = [
    {
      q: "Qual cabeçalho completa a função, que devolve a metade de um número real?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    return x / 2;\n}",
      opts: [
        ["`float metade(float x)`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`int metade(float x)`", "O resultado pode ter casas decimais; `int` as perderia."],
        ["`void metade(float x)`", "`void` não devolve valor, mas o corpo tem `return`."],
        ["`float metade(x)`", "Faltam os tipos dos parâmetros."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint dobro(int n) {\n    return n * 2;\n}\n\nint main() {\n    int resultado = dobro(7);\n    printf(\"%d\\n\", resultado + dobro(1));\n    return 0;\n}",
      opts: [
        ["16", "14 + 2."],
        ["14", "Esqueceu a segunda chamada."],
        ["9", "Somou 7 + 1 + 1."],
        ["15", "dobro(1) vale 2, não 1."]
      ]
    }
  ];
  window.ALT['a1-p16'] = [
    {
      q: "Qual cabeçalho completa a função, que devolve a diferença entre dois inteiros?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    return a - b;\n}",
      opts: [
        ["`int diferenca(int a, int b)`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`void diferenca(int a, int b)`", "`void` não devolve valor, mas o corpo tem `return`."],
        ["`int diferenca(int a; int b)`", "Separar parâmetros com ponto e vírgula não é permitido: é vírgula."],
        ["`int diferenca(a, b)`", "Faltam os tipos dos parâmetros."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint diferenca(int a, int b) {\n    return a - b;\n}\n\nint main() {\n    printf(\"%d\\n\", diferenca(10, 4) - diferenca(4, 10));\n    return 0;\n}",
      opts: [
        ["12", "6 − (−6)."],
        ["0", "Somaria os dois resultados."],
        ["6", "Só a primeira chamada."],
        ["-12", "O sinal está invertido."]
      ]
    }
  ];
  window.ALT['a1-p17'] = [
    {
      q: "Qual cabeçalho completa a função, que devolve a média de duas provas?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    return (p1 + p2) / 2;\n}",
      opts: [
        ["`float mediaProvas(float p1, float p2)`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`void mediaProvas(float p1, float p2)`", "`void` não devolve valor, mas o corpo tem `return`."],
        ["`float mediaProvas(float p1; float p2)`", "Separar parâmetros com ponto e vírgula não é permitido: é vírgula."],
        ["`int mediaProvas(float p1, float p2)`", "A média tem casas decimais; `int` as perderia."]
      ]
    },
    {
      q: "Qual a saída? (nota1 com peso 1 e nota2 com peso 2)",
      saida: true,
      code: "#include <stdio.h>\nfloat mediaPonderada(float nota1, float nota2) {\n    return (nota1 * 1 + nota2 * 2) / 3;\n}\n\nint main() {\n    printf(\"%.1f\\n\", mediaPonderada(5.0, 8.0));\n    return 0;\n}",
      opts: [
        ["7.0", "(5 + 16) ÷ 3."],
        ["6.5", "Seria a média simples."],
        ["21.0", "Esqueceu de dividir por 3."],
        ["7.5", "Trocou os pesos."]
      ]
    }
  ];
  window.ALT['a1-p18'] = [
    {
      q: "Qual cabeçalho completa a função, que converte reais em dólares (1 dólar = 5 reais)?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    return reais / 5.0f;\n}",
      opts: [
        ["`float converterParaDolar(float reais)`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`void converterParaDolar(float reais)`", "`void` não devolve valor, mas o corpo tem `return`."],
        ["`float converterParaDolar(reais)`", "Faltam os tipos dos parâmetros."],
        ["`int converterParaDolar(float reais)`", "O valor em dólares tem casas decimais; `int` as perderia."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nfloat converterParaDolar(float reais) {\n    return reais / 5.0f;\n}\n\nint main() {\n    printf(\"%.2f %.2f\\n\", converterParaDolar(100), converterParaDolar(50));\n    return 0;\n}",
      opts: [
        ["20.00 10.00", "100 ÷ 5 e 50 ÷ 5."],
        ["500.00 250.00", "Multiplicou em vez de dividir."],
        ["10.00 20.00", "Trocou os resultados."],
        ["20.00 20.00", "A segunda chamada usa 50."]
      ]
    }
  ];
  window.ALT['a1-p19'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nfloat area(int base, int altura) {\n    return base * altura / 2;\n}\n\nint main() {\n    printf(\"%.1f\\n\", area(5, 3));\n    return 0;\n}",
      opts: [
        ["7.0", "Os três valores são inteiros: 15 / 2 dá 7 antes de virar float."],
        ["7.5", "A divisão é entre inteiros e perde a parte decimal."],
        ["15.0", "Esqueceu de dividir por 2."],
        ["8.0", "A divisão inteira não arredonda para cima."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nfloat area(float b, float h) {\n    return b * h;\n}\n\nint main() {\n    printf(\"%.1f %.1f\\n\", area(2.5, 4), area(3, 3));\n    return 0;\n}",
      opts: [
        ["10.0 9.0", "Os inteiros são convertidos para float na chamada."],
        ["8.0 9.0", "O 2,5 não é truncado para 2."],
        ["10.0 6.0", "3 × 3 é 9."],
        ["6.5 6.0", "Somou em vez de multiplicar."]
      ]
    }
  ];
  window.ALT['a1-p20'] = [
    {
      q: "Qual cabeçalho completa a função, que devolve 1 se o número é múltiplo de 3 e 0 se não?",
      nocc: true,
      code: "/* cabeçalho aqui */ {\n    return n % 3 == 0;\n}",
      opts: [
        ["`int ehMultiplo3(int n)`", "Os tipos e o retorno combinam com o corpo da função."],
        ["`void ehMultiplo3(int n)`", "`void` não devolve valor, mas o corpo tem `return`."],
        ["`int ehMultiplo3(n)`", "Faltam os tipos dos parâmetros."],
        ["`int ehMultiplo3(int n, int 3)`", "3 não pode ser nome de parâmetro."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint ehMultiplo3(int n) {\n    return n % 3 == 0;\n}\n\nint main() {\n    printf(\"%d\\n\", ehMultiplo3(9) + ehMultiplo3(10) + ehMultiplo3(12));\n    return 0;\n}",
      opts: [
        ["2", "9 e 12 devolvem 1; 10 devolve 0."],
        ["3", "10 não é múltiplo de 3."],
        ["1", "Dois dos três números são múltiplos."],
        ["31", "As chamadas devolvem 1 ou 0 e são somadas."]
      ]
    }
  ];
  window.ALT['a1-e01'] = [
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint total = 0;\n\nvoid soma(int x) {\n    total = total + x;\n}\n\nint main() {\n    soma(2);\n    soma(5);\n    printf(\"%d\\n\", total);\n    return 0;\n}",
      opts: [
        ["7", "A função altera a variável global: 0 + 2 + 5."],
        ["0", "Não há variável local com esse nome: a global é alterada."],
        ["5", "A segunda chamada soma ao valor já alterado."],
        ["2", "As duas chamadas se acumulam."]
      ]
    },
    {
      q: "Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nint nota = 10;\n\nvoid aumentar(int nota) {\n    nota = nota + 1;\n}\n\nint main() {\n    aumentar(nota);\n    printf(\"%d\\n\", nota);\n    return 0;\n}",
      opts: [
        ["10", "O parâmetro `nota` esconde a global dentro da função e é só uma cópia."],
        ["11", "A global não é alterada: a função mexe na cópia."],
        ["1", "O valor do parâmetro vem da global."],
        ["0", "A global continua valendo 10."]
      ]
    }
  ];
})();
