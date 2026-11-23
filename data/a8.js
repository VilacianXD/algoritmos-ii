/* A8 · Ponteiros — Exercícios conceituais (20) + Exercícios práticos (15).
   Formatos: mc = múltipla escolha · fix = corrigir código · drag = encaixar trechos.
   saida: true → o gabarito é a saída exata do programa (conferida com gcc em _tools/verificar.mjs). */
(function () {
  var R = String.raw;
  var C = 'Exercícios conceituais A8, questão ';
  var P = 'Exercícios A8, questão ';
  (window.EXS = window.EXS || {}).a8 = [

  /* ---------------- Conceituais ---------------- */
  { id: 'a8-c01', topic: 't-conceito', ref: C + '1', title: 'Para que serve um ponteiro', type: 'mc', v: [
    { q: 'Qual é a principal finalidade de um ponteiro em C?', opts: [
      ['Armazenar o endereço de memória de outra variável.', 'É a definição: o valor de um ponteiro é um endereço.'],
      ['Armazenar um valor inteiro muito grande.', 'Para números grandes existem `long` e `long long`; ponteiro guarda endereço.'],
      ['Armazenar várias variáveis de tipos diferentes.', 'Isso é o papel de uma struct (A5).'],
      ['Executar cálculos aritméticos mais rápido.', 'Ponteiro não acelera contas; ele dá acesso indireto a um dado.']] },
    { q: 'Depois de `float *q = &temperatura;`, o que a variável `q` guarda?', opts: [
      ['O endereço onde `temperatura` está na memória.', '`&temperatura` produz o endereço; q é um ponteiro para float.'],
      ['Uma cópia do valor de `temperatura`.', 'Uma cópia seria `float q = temperatura;`, sem asterisco.'],
      ['O tipo `float`.', 'Tipos não são guardados em variáveis.'],
      ['O valor de `temperatura` arredondado.', 'Nada é arredondado; q guarda um endereço.']] },
    { q: 'Na analogia da aula, uma variável é uma caixa de maçãs. O que é o ponteiro?', opts: [
      ['Um papel com o endereço da caixa.', 'Com o endereço, quem tem o papel chega à caixa original.'],
      ['Uma segunda caixa com as mesmas maçãs.', 'Isso seria uma cópia (passagem por valor).'],
      ['As maçãs dentro da caixa.', 'As maçãs são o valor; o ponteiro não é o valor.'],
      ['A etiqueta com o nome da caixa.', 'O nome é o identificador da variável, não um ponteiro.']] }
  ] },

  { id: 'a8-c02', topic: 't-declaracao', ref: C + '2', title: 'Declarar um ponteiro', type: 'mc', v: [
    { q: 'Como se declara um ponteiro para um número inteiro?', opts: [
      ['`int* p;`', 'Tipo apontado, asterisco e nome. `int *p;` é a mesma coisa.'],
      ['`*int p;`', 'O asterisco não vem antes do tipo.'],
      ['`p int*;`', 'Em C o tipo vem antes do nome.'],
      ['`int p;`', 'Sem asterisco é um int comum.']] },
    { q: 'Qual declaração cria um ponteiro para `double` chamado `taxa`?', opts: [
      ['`double *taxa;`', 'Tipo apontado `double`, asterisco, nome.'],
      ['`*double taxa;`', 'O asterisco fica junto do nome, depois do tipo.'],
      ['`double taxa*;`', 'O asterisco não vai depois do nome.'],
      ['`double &taxa;`', '`&` é o operador de endereço; não declara ponteiro em C.']] },
    { q: 'Em `int *a, *b, c;` quantas variáveis são ponteiros?', opts: [
      ['Duas: `a` e `b`.', 'Cada ponteiro precisa do seu asterisco; `c` não tem.'],
      ['Três: `a`, `b` e `c`.', 'O `*` não se espalha para as outras variáveis da linha.'],
      ['Uma: só `a`.', '`b` também tem asterisco.'],
      ['Nenhuma: falta `&`.', '`&` não participa da declaração.']] }
  ] },

  { id: 'a8-c03', topic: 't-operadores', ref: C + '3', title: 'O operador de endereço', type: 'mc', v: [
    { q: 'Qual operador obtém o endereço de memória de uma variável?', opts: [
      ['`&` (e comercial)', '`&x` é o endereço de x.'],
      ['`*` (asterisco)', '`*` acessa o conteúdo apontado.'],
      ['`->` (seta)', '`->` acessa campo de struct por ponteiro (A10).'],
      ['`.` (ponto)', '`.` acessa campo de struct.']] },
    { q: 'Para fazer `pt` apontar para `saldo`, o que completa `pt = ___saldo;`?', opts: [
      ['`&`', 'pt precisa do endereço de saldo.'],
      ['`*`', '`*saldo` só faria sentido se saldo fosse ponteiro.'],
      ['`->`', 'saldo não é ponteiro para struct.'],
      ['nada', '`pt = saldo;` tentaria guardar o valor, não o endereço.']] },
    { q: 'No `scanf("%d", &idade);`, por que aparece `&`?', opts: [
      ['Porque scanf precisa do endereço de idade para gravar o valor lido.', 'É passagem por referência: scanf escreve na variável original.'],
      ['Porque idade é um ponteiro.', 'idade é um int comum.'],
      ['Porque `&` converte o texto em número.', 'Quem converte é o `%d`.'],
      ['Porque `&` é obrigatório em toda função.', 'printf, por exemplo, recebe valores sem `&`.']] }
  ] },

  { id: 'a8-c04', topic: 't-operadores', ref: C + '4', title: 'O que o ponteiro guarda', type: 'mc', v: [
    { q: 'Depois de `int num = 10; int* p_num; p_num = &num;` qual valor está em `p_num`?', opts: [
      ['O endereço de memória de `num`.', 'p_num recebeu `&num`.'],
      ['10', '10 é o valor de num; seria `*p_num`.'],
      ['O tipo int.', 'Variáveis guardam valores, não tipos.'],
      ['NULL', 'p_num recebeu um endereço válido.']] },
    { q: 'Depois de `char letra = \'K\'; char *pl = &letra;` o que é `*pl`?', opts: [
      ["O caractere 'K'.", '`*pl` lê o conteúdo do endereço guardado em pl.'],
      ['O endereço de letra.', 'O endereço é `pl` (ou `&letra`), sem asterisco.'],
      ['O endereço de pl.', 'Esse seria `&pl`.'],
      ['Um erro de compilação.', 'É uma declaração válida.']] },
    { q: 'Com `double peso = 72.5; double *pp = &peso;` qual expressão vale o mesmo que `&peso`?', opts: [
      ['`pp`', 'pp guarda exatamente o endereço de peso.'],
      ['`*pp`', '`*pp` vale 72.5, o conteúdo.'],
      ['`&pp`', '`&pp` é o endereço do próprio ponteiro.'],
      ['`peso`', 'peso é o valor 72.5.']] }
  ] },

  { id: 'a8-c05', topic: 't-operadores', ref: C + '5', title: 'Desreferenciar', type: 'mc', v: [
    { q: 'Qual operador desreferencia um ponteiro, isto é, acessa o valor para o qual ele aponta?', opts: [
      ['`*` (asterisco)', 'Fora da declaração, `*p` é o conteúdo apontado.'],
      ['`&` (e comercial)', '`&` faz o caminho oposto: obtém um endereço.'],
      ['`->` (seta)', 'Seta é para campos de struct.'],
      ['`.` (ponto)', 'Ponto é para campos de struct.']] },
    { q: 'Com `int *pt = &vidas;`, qual linha soma 1 em `vidas` usando só o ponteiro?', opts: [
      ['`*pt = *pt + 1;`', 'Lê o conteúdo, soma 1 e grava no mesmo endereço.'],
      ['`pt = pt + 1;`', 'Isso move o ponteiro para o próximo int (aritmética de ponteiros).'],
      ['`&pt = &pt + 1;`', 'Não se atribui a um endereço obtido com `&`.'],
      ['`pt* = pt* + 1;`', 'O asterisco vem antes do nome.']] },
    { q: 'O `*` aparece em `int *p;` e em `x = *p;`. O que ele significa em cada caso?', opts: [
      ['Na declaração indica que p é ponteiro; na expressão acessa o conteúdo apontado.', 'O mesmo símbolo tem papéis diferentes conforme o lugar.'],
      ['Nos dois casos multiplica.', 'Multiplicação precisa de dois operandos, como `a * b`.'],
      ['Nos dois casos obtém o endereço.', 'Endereço é com `&`.'],
      ['Na declaração cria NULL; na expressão compara.', 'Nenhuma das duas coisas.']] }
  ] },

  { id: 'a8-c06', topic: 't-operadores', ref: C + '6', title: 'Qual é a saída', type: 'mc', v: [
    { q: 'Qual será a saída?', saida: true, code: R`#include <stdio.h>
int main() {
    int valor = 25;
    int *ptr = &valor;
    printf("%d", *ptr);
    return 0;
}`, opts: [['25', '`*ptr` é o conteúdo de valor.'], ['O endereço de valor.', 'Para o endereço seria `printf("%p", ptr)`.'], ['Erro de compilação.', 'O código é válido.'], ['Um valor aleatório.', 'ptr foi inicializado com `&valor`.']] },
    { q: 'Qual será a saída?', saida: true, code: R`#include <stdio.h>
int main() {
    int b, *c;
    b = 40;
    c = &b;
    *c = 41;
    printf("%d", b);
    return 0;
}`, opts: [['41', '`*c = 41` grava no endereço de b.'], ['40', 'b foi alterado pelo ponteiro na linha `*c = 41`.'], ['O endereço de b.', 'printf recebe b, um int.'], ['Erro: b não pode mudar sem aparecer à esquerda.', 'Pode: o ponteiro dá acesso ao mesmo lugar da memória.']] },
    { q: 'Qual será a saída?', saida: true, code: R`#include <stdio.h>
int main() {
    int a = 7, b = 2;
    int *p, *q;
    p = &a;
    q = p;
    *q = *q + 1;
    q = &b;
    b = b + 1;
    printf("%d, %d\n", *q, *p);
    return 0;
}`, opts: [['3, 8', 'q termina apontando para b (3) e p para a (8).'], ['8, 3', 'A ordem no printf é `*q` e depois `*p`.'], ['3, 7', 'a virou 8 em `*q = *q + 1`, quando q ainda apontava para a.'], ['2, 8', 'b foi incrementado depois de q passar a apontar para ele.']] }
  ] },

  { id: 'a8-c07', topic: 't-inicializacao', ref: C + '7', title: 'O valor NULL', type: 'mc', v: [
    { q: 'O que significa um ponteiro com valor NULL?', opts: [
      ['Que ele não aponta para nenhum endereço válido.', 'NULL marca “aponta para lugar nenhum”.'],
      ['Que ele aponta para o valor zero.', 'NULL é um endereço nulo, não um ponteiro para um 0.'],
      ['Que ele aponta para a primeira posição da memória.', 'Não existe acesso válido por um ponteiro NULL.'],
      ['Que ele não pode mais ser usado.', 'Pode receber um endereço depois.']] },
    { q: 'Em `int *pont = NULL;` seguido de `if (n > 0) pont = &n;`, para que serve testar `pont != NULL` antes de `*pont`?', opts: [
      ['Para só acessar o conteúdo quando o ponteiro recebeu um endereço válido.', 'Desreferenciar NULL derruba o programa.'],
      ['Para saber se n vale zero.', 'O teste é sobre o ponteiro, não sobre n.'],
      ['Para liberar a memória de pont.', 'Nada foi alocado.'],
      ['É obrigatório antes de qualquer printf.', 'Só é necessário antes de usar `*pont`.']] },
    { q: 'Um ponteiro foi declarado com `float *f;` e nunca recebeu valor. O que é verdade?', opts: [
      ['Ele guarda um endereço desconhecido (lixo); usar `*f` é um erro.', 'Não ter recebido valor não faz o ponteiro valer NULL.'],
      ['Ele vale NULL automaticamente.', 'Variáveis locais não são zeradas sozinhas.'],
      ['Ele aponta para o último float declarado.', 'Não há ligação automática.'],
      ['`*f` vale 0.0.', 'O conteúdo de um endereço lixo é imprevisível.']] }
  ] },

  { id: 'a8-c08', topic: 't-declaracao', ref: C + '8', title: 'Tipo do ponteiro', type: 'mc', v: [
    { q: 'Qual é o tipo de um ponteiro que aponta para um caractere?', opts: [['`char*`', 'O tipo do ponteiro acompanha o tipo apontado.'], ['`int*`', 'Esse aponta para int.'], ['`float*`', 'Esse aponta para float.'], ['`void*`', '`void*` é genérico; para char use `char*`.']] },
    { q: 'Qual é o tipo correto de `pm` em `___ pm = &media;` se `media` é `float`?', opts: [['`float *`', 'Endereço de float vai em ponteiro para float.'], ['`int *`', 'Tipos incompatíveis: int* não guarda endereço de float.'], ['`float`', 'Sem asterisco, pm não guarda endereço.'], ['`double *`', 'float e double são tipos diferentes.']] },
    { q: 'Qual atribuição é inválida, sabendo que `int i; float x; int *p; float *r;`?', opts: [['`p = &x;`', 'p é int*, mas &x é float*: tipos incompatíveis.'], ['`p = &i;`', 'Válida: int* recebe endereço de int.'], ['`r = &x;`', 'Válida: float* recebe endereço de float.'], ['`i = *p;`', 'Válida: *p é um int.']] }
  ] },

  { id: 'a8-c09', topic: 't-operadores', ref: C + '9', title: 'Incremento pelo ponteiro', type: 'mc', v: [
    { q: 'Qual o valor de `a` no fim?', saida: true, code: R`#include <stdio.h>
int main() {
    int a = 5;
    int *ptr_a = &a;
    (*ptr_a)++;
    printf("%d", a);
    return 0;
}`, opts: [['6', '`(*ptr_a)++` incrementa o conteúdo apontado, que é a.'], ['5', 'a foi alterado pelo ponteiro.'], ['4', 'É incremento, não decremento.'], ['O endereço de a.', 'printf imprime a, um int.']] },
    { q: 'Qual o valor de `pontos` no fim?', saida: true, code: R`#include <stdio.h>
int main() {
    int pontos = 12;
    int *pp = &pontos;
    *pp = *pp * 2;
    (*pp)--;
    printf("%d", pontos);
    return 0;
}`, opts: [['23', '12 vezes 2 dá 24; depois o decremento dá 23.'], ['24', 'Faltou o `(*pp)--`.'], ['11', 'A multiplicação vem antes do decremento.'], ['12', 'As duas linhas alteram pontos pelo ponteiro.']] },
    { q: 'Qual o valor de `x` no fim?', saida: true, code: R`#include <stdio.h>
int main() {
    int x = 9;
    int *p = &x;
    *p += 3;
    (*p)++;
    printf("%d", x);
    return 0;
}`, opts: [['13', '9 + 3 = 12; o incremento leva a 13.'], ['12', 'Faltou o `(*p)++`.'], ['10', '`*p += 3` também altera x.'], ['9', 'x muda pelas duas linhas.']] }
  ] },

  { id: 'a8-c10', topic: 't-conceito', ref: C + '10', title: 'Afirmação verdadeira', type: 'mc', v: [
    { q: 'Qual afirmação sobre ponteiros é verdadeira?', opts: [
      ['Ponteiros permitem a alocação dinâmica de memória em tempo de execução.', 'malloc devolve um endereço, guardado num ponteiro (A9).'],
      ['Um ponteiro pode apontar para variáveis de qualquer tipo sem problemas.', 'O tipo do ponteiro precisa combinar com o tipo apontado.'],
      ['Somar 1 a um ponteiro sempre o move um byte.', 'Move um elemento: 4 bytes para int, 8 para double.'],
      ['Ponteiros devem ser inicializados com um número fixo.', 'Recebem um endereço (`&x`, malloc) ou NULL.']] },
    { q: 'Qual afirmação é falsa?', opts: [
      ['`int *p; p++;` avança p em 1 byte.', 'Falsa, e por isso é a resposta: avança `sizeof(int)` bytes.'],
      ['Um ponteiro também ocupa memória e tem endereço.', 'Verdadeira: `&p` existe.'],
      ['O nome de um vetor funciona como ponteiro para o primeiro elemento.', 'Verdadeira: `vet` vale `&vet[0]`.'],
      ['NULL indica que o ponteiro não aponta para nada válido.', 'Verdadeira.']] },
    { q: 'Sobre `double *d;` e `char *c;`, o que é verdade?', opts: [
      ['`d + 1` avança 8 bytes e `c + 1` avança 1 byte.', 'O passo depende do tamanho do tipo apontado.'],
      ['Os dois avançam 1 byte ao somar 1.', 'Só char tem 1 byte.'],
      ['Os dois avançam 4 bytes.', 'Quatro bytes é o caso de int.'],
      ['Não se pode somar inteiros a ponteiros.', 'Pode: é a aritmética de ponteiros.']] }
  ] },

  { id: 'a8-c11', topic: 't-referencia', ref: C + '11', title: 'O que vai na passagem por valor', type: 'mc', v: [
    { q: 'Na passagem por valor, o que é passado para a função?', opts: [['Uma cópia do valor do argumento.', 'Igual a uma atribuição: o parâmetro nasce com o valor.'], ['O endereço da variável original.', 'Isso é passagem por referência.'], ['A própria variável original.', 'A função não recebe a variável, só o valor.'], ['O tipo de dado da variável.', 'Tipos não são passados.']] },
    { q: 'Na chamada `calcula(nota)`, com `void calcula(float n)`, o que acontece com `n`?', opts: [['n é uma variável nova que recebe uma cópia de nota.', 'Alterar n não altera nota.'], ['n é outro nome para nota.', 'Em C não há apelido de variável na passagem por valor.'], ['n recebe o endereço de nota.', 'Sem `&` e sem ponteiro, vai só o valor.'], ['n só existe se nota for global.', 'Parâmetros são sempre locais.']] },
    { q: 'Qual é a comparação certa para passagem por valor?', opts: [['Dar uma fotocópia de um documento: rabiscar a cópia não muda o original.', 'Comparação usada na aula de funções.'], ['Dar o endereço do documento.', 'Essa é a passagem por referência.'], ['Emprestar o documento original.', 'A função não recebe o original.'], ['Destruir o original e entregar outro.', 'O original continua intacto.']] }
  ] },

  { id: 'a8-c12', topic: 't-motivacao', ref: C + '12', title: 'Valor depois da chamada', type: 'mc', v: [
    { q: 'Qual o valor de x depois da chamada?', saida: true, code: R`#include <stdio.h>
void incrementar(int num) {
    num = num + 1;
}

int main() {
    int x = 5;
    incrementar(x);
    printf("%d", x);
    return 0;
}`, opts: [['5', 'num é uma cópia; x não muda.'], ['6', 'Só a cópia num virou 6.'], ['O endereço de x.', 'printf recebe x.'], ['Indefinido.', 'É bem definido: 5.']] },
    { q: 'Qual o valor de saldo depois da chamada?', saida: true, code: R`#include <stdio.h>
void depositar(float s, float v) {
    s = s + v;
}

int main() {
    float saldo = 100;
    depositar(saldo, 50);
    printf("%.0f", saldo);
    return 0;
}`, opts: [['100', 'O depósito ficou na cópia s.'], ['150', 'Para dar 150 seria `void depositar(float *s, float v)` com `*s = *s + v`.'], ['50', 'saldo não recebe v.'], ['0', 'Nada zera saldo.']] },
    { q: 'Qual o valor de x depois da chamada?', saida: true, code: R`#include <stdio.h>
void incrementar(int *num) {
    *num = *num + 1;
}

int main() {
    int x = 5;
    incrementar(&x);
    printf("%d", x);
    return 0;
}`, opts: [['6', 'Agora vai o endereço e a função altera x.'], ['5', 'Nesta versão a função recebe `&x`.'], ['O endereço de x mais 1.', '`*num = *num + 1` mexe no conteúdo.'], ['Erro de compilação.', 'O código é válido.']] }
  ] },

  { id: 'a8-c13', topic: 't-referencia', ref: C + '13', title: 'Como fazer passagem por referência', type: 'mc', v: [
    { q: 'Para implementar passagem por referência em C, qual conceito se usa?', opts: [['Ponteiros.', 'A função recebe endereços em parâmetros ponteiro.'], ['Apenas variáveis globais.', 'Globais devem ser evitadas e não são passagem de parâmetro.'], ['Operadores de atribuição.', 'Atribuição sozinha não leva o endereço.'], ['Retorno de múltiplos valores.', 'C não retorna vários valores com return.']] },
    { q: 'Qual protótipo permite que a função altere a variável `int estoque` da main?', opts: [['`void repor(int *estoque, int qtd);`', 'Recebe o endereço de estoque.'], ['`void repor(int estoque, int qtd);`', 'Recebe uma cópia.'], ['`int repor(int qtd);`', 'Sem estoque nos parâmetros; só daria para devolver um valor.'], ['`void repor(int &estoque, int qtd);`', '`int &` não existe em C (é C++).']] },
    { q: 'Uma função precisa devolver quociente e resto sem usar return. Qual cabeçalho serve?', opts: [['`void calcularDivisao(int a, int b, int *q, int *r)`', 'q e r recebem os endereços onde gravar os resultados.'], ['`void calcularDivisao(int a, int b, int q, int r)`', 'q e r seriam cópias; os resultados se perdem.'], ['`int calcularDivisao(int a, int b)`', 'Só devolveria um valor.'], ['`void calcularDivisao(int *a, int *b)`', 'Não há onde guardar os dois resultados.']] }
  ] },

  { id: 'a8-c14', topic: 't-referencia', ref: C + '14', title: 'O operador na chamada', type: 'mc', v: [
    { q: 'Qual operador vai na chamada para enviar o endereço de uma variável passada por referência?', opts: [['`&` (e comercial)', 'Ex.: `trocar(&a, &b);`'], ['`*` (asterisco)', '`*` vai dentro da função, para acessar o conteúdo.'], ['`.` (ponto)', 'Ponto é para structs.'], ['`->` (seta)', 'Seta é para struct por ponteiro.']] },
    { q: 'Com `void dobrar(int *n);` e `int vidas = 3;`, qual chamada está certa?', opts: [['`dobrar(&vidas);`', 'Envia o endereço, como pede o parâmetro int*.'], ['`dobrar(vidas);`', 'Enviaria o valor 3 onde se espera um endereço.'], ['`dobrar(*vidas);`', 'vidas não é ponteiro; `*vidas` não compila.'], ['`dobrar(&*vidas);`', '`*vidas` já é inválido.']] },
    { q: 'Com `void ler(float *a, float *b);`, qual chamada está certa para `float x, y;`?', opts: [['`ler(&x, &y);`', 'Cada parâmetro ponteiro recebe um endereço.'], ['`ler(x, y);`', 'Sem `&` vão os valores.'], ['`ler(&x, y);`', 'O segundo parâmetro também é ponteiro.'], ['`ler(*x, *y);`', 'x e y não são ponteiros.']] }
  ] },

  { id: 'a8-c15', topic: 't-referencia', ref: C + '15', title: 'Depois do trocar', type: 'mc', v: [
    { q: 'Quais os valores impressos?', saida: true, code: R`#include <stdio.h>
void trocar(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int val1 = 10, val2 = 20;
    trocar(&val1, &val2);
    printf("val1 = %d, val2 = %d", val1, val2);
    return 0;
}`, opts: [['val1 = 20, val2 = 10', 'A função recebeu os endereços e trocou os conteúdos.'], ['val1 = 10, val2 = 20', 'Isso aconteceria na versão por valor.'], ['val1 = 0, val2 = 0', 'Nada zera as variáveis.'], ['val1 = 20, val2 = 20', 'temp guarda o valor antigo de *a antes da troca.']] },
    { q: 'Quais os valores impressos?', saida: true, code: R`#include <stdio.h>
void trocar(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 3, y = 8, z = 1;
    trocar(&x, &y);
    trocar(&y, &z);
    printf("%d %d %d", x, y, z);
    return 0;
}`, opts: [['8 1 3', 'Primeira troca: x=8, y=3. Segunda: y=1, z=3.'], ['3 8 1', 'As duas trocas acontecem.'], ['8 3 1', 'Faltou a segunda troca, entre y e z.'], ['1 8 3', 'x só participa da primeira troca.']] },
    { q: 'Quais os valores impressos?', saida: true, code: R`#include <stdio.h>
void trocar(int a, int *b) {
    int temp = a;
    a = *b;
    *b = temp;
}

int main() {
    int m = 4, n = 9;
    trocar(m, &n);
    printf("%d %d", m, n);
    return 0;
}`, opts: [['4 4', 'Só b é ponteiro: n recebe 4; m não muda.'], ['9 4', 'm foi por valor; a troca em a não volta.'], ['4 9', 'n foi alterado por *b.'], ['9 9', 'm não muda.']] }
  ] },

  { id: 'a8-c16', topic: 't-referencia', ref: C + '16', title: 'Quando usar referência', type: 'mc', v: [
    { q: 'Quando a passagem por referência é a escolha preferencial?', opts: [['Quando a função precisa modificar variáveis da função que a chamou.', 'É o que só o endereço permite.'], ['Quando a função não precisa modificar os argumentos.', 'Aí basta passagem por valor.'], ['Quando a função retorna um único valor.', 'Um único resultado sai bem pelo return.'], ['Quando os argumentos são pequenos.', 'Tamanho pequeno não exige referência.']] },
    { q: 'Qual função PRECISA de passagem por referência?', opts: [['`reajustarPreco`, que altera o preço guardado na main sem retornar nada.', 'Sem retorno, só o endereço permite alterar a variável da main.'], ['`dobro`, que devolve o dobro de um número.', 'return resolve.'], ['`ehPar`, que devolve 1 ou 0.', 'return resolve.'], ['`mostrarMenu`, que só imprime.', 'Não altera nada.']] },
    { q: 'Qual situação pede ponteiros como parâmetros?', opts: [['Ler dois números do teclado dentro de uma função e deixá-los na main.', 'A função grava nos endereços das variáveis da main.'], ['Calcular a média de três notas e devolvê-la.', 'Uma média sai pelo return.'], ['Imprimir uma linha de 40 traços.', 'Não há dado a devolver.'], ['Verificar se um número é primo.', 'Devolve 1 ou 0 pelo return.']] }
  ] },

  { id: 'a8-c17', topic: 't-vetores', ref: C + '17', title: 'Vetor passado para função', type: 'mc', v: [
    { q: 'Ao passar um vetor para uma função, como ele é tratado?', opts: [['Vai o endereço do primeiro elemento; a função mexe no vetor original.', 'O nome do vetor vira `&vet[0]` na chamada.'], ['É copiado por valor.', 'Os elementos não são copiados.'], ['O compilador decide.', 'A regra é fixa.'], ['Não é possível passar vetores.', 'É possível e comum.']] },
    { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
void zerar(int v[], int n) {
    for (int i = 0; i < n; i++)
        v[i] = 0;
}

int main() {
    int a[3] = {4, 5, 6};
    zerar(a, 3);
    printf("%d %d %d", a[0], a[1], a[2]);
    return 0;
}`, opts: [['0 0 0', 'zerar recebeu o endereço de a e alterou os elementos originais.'], ['4 5 6', 'Vetor não é copiado: as mudanças valem na main.'], ['0 5 6', 'O laço percorre as 3 posições.'], ['Erro de compilação.', 'O código é válido.']] },
    { q: 'Qual chamada é equivalente a `somar(vet, 10)`?', opts: [['`somar(&vet[0], 10)`', 'O nome do vetor vale o endereço do primeiro elemento.'], ['`somar(vet[0], 10)`', 'Isso envia o valor do primeiro elemento.'], ['`somar(*vet[10], 10)`', 'vet[10] nem existe num vetor de 10.'], ['`somar(&vet, 0)`', 'O tamanho mudou para 0.']] }
  ] },

  { id: 'a8-c18', topic: 't-vetores', ref: C + '18', title: 'String alterada na função', type: 'mc', v: [
    { q: 'Se uma função recebe `char *str` e altera o conteúdo da string, a mudança aparece na função chamadora?', opts: [['Sim: o ponteiro dá acesso à memória original.', 'str aponta para os caracteres da chamadora.'], ['Não, é sempre uma cópia.', 'Copiado é só o endereço.'], ['Só se a função retornar algo.', 'Não depende de retorno.'], ['Só para strings de tamanho fixo.', 'Vale para qualquer tamanho.']] },
    { q: 'Qual a saída?', saida: true, code: R`#include <stdio.h>
void maiuscula(char *s) {
    s[0] = s[0] - 32;
}

int main() {
    char nome[] = "ana";
    maiuscula(nome);
    printf("%s", nome);
    return 0;
}`, opts: [['Ana', "s[0] passou de 'a' para 'A' na memória de nome."], ['ana', 'A função altera o vetor original.'], ['ANA', 'Só a primeira letra mudou.'], ['Erro: string não pode ser alterada.', 'nome é um vetor de char, pode ser alterado.']] },
    { q: 'Por que `fgets(nome, 50, stdin)` não precisa de `&nome`?', opts: [['Porque nome já é o endereço do primeiro caractere.', 'Nome de vetor numa expressão vira endereço.'], ['Porque fgets não grava em nome.', 'fgets grava exatamente lá.'], ['Porque strings são passadas por valor.', 'O endereço é passado.'], ['Porque 50 já indica o endereço.', '50 é o tamanho máximo.']] }
  ] },

  { id: 'a8-c19', topic: 't-referencia', ref: C + '19', title: 'Onde referência não ajuda', type: 'mc', v: [
    { q: 'Qual NÃO é um bom caso de uso de passagem por referência?', opts: [['Uma função que soma dois números e retorna o resultado.', 'Um único resultado sai pelo return.'], ['Uma função que troca os valores de duas variáveis.', 'Aqui referência é essencial.'], ['Uma função que lê vários valores e os guarda na chamadora.', 'Precisa dos endereços.'], ['Uma função que modifica uma estrutura grande.', 'Evita cópia e permite alterar.']] },
    { q: 'Qual função ficaria melhor só com passagem por valor?', opts: [['`float areaCirculo(float raio)`', 'Recebe um valor, devolve um valor.'], ['Uma função que zera duas variáveis da main.', 'Precisa dos endereços.'], ['Uma função que devolve o maior e o menor de dois números.', 'Dois resultados pedem ponteiros.'], ['Uma função que atualiza o saldo guardado na main.', 'Precisa alterar a variável original.']] },
    { q: 'Qual uso de ponteiro é desnecessário?', opts: [['`void imprimir(int *n) { printf("%d", *n); }` só para mostrar um número.', 'Mostrar não altera: `void imprimir(int n)` basta.'], ['`void ler(int *n) { scanf("%d", n); }`', 'Precisa gravar na variável da chamadora.'], ['`void trocar(int *a, int *b)`', 'Troca exige endereços.'], ['`void contar(int *v, int n, int *pares, int *impares)`', 'Dois resultados saem pelos ponteiros.']] }
  ] },

  { id: 'a8-c20', topic: 't-referencia', ref: C + '20', title: 'Vantagem para dados grandes', type: 'mc', v: [
    { q: 'Qual a principal vantagem da passagem por referência para argumentos grandes, como structs ou vetores grandes?', opts: [['Evita copiar muitos dados, economizando tempo e memória.', 'Só um endereço é passado.'], ['Deixa o código mais fácil de depurar.', 'Não é a vantagem principal.'], ['Aumenta a segurança do programa.', 'Na verdade dá à função poder de alterar o original.'], ['Permite retornar vários valores pelo return.', 'return devolve um só.']] },
    { q: 'Uma struct `Turma` ocupa 4 KB. O que se ganha passando `Turma *t` em vez de `Turma t`?', opts: [['Passa só o endereço (poucos bytes), em vez de copiar 4 KB.', 'A cópia de uma struct grande custa tempo e memória.'], ['A struct fica menor.', 'O tamanho dela não muda.'], ['Os campos ficam protegidos contra alteração.', 'Pelo ponteiro a função pode alterar os campos.'], ['Nada muda.', 'A diferença é a cópia.']] },
    { q: 'Por que vetores já são passados “por endereço” em C?', opts: [['Para não copiar todos os elementos a cada chamada.', 'Vai só o endereço do início.'], ['Porque vetores são sempre pequenos.', 'Podem ter milhares de elementos.'], ['Porque vetores são globais.', 'Não são.'], ['Porque o compilador não sabe copiar números.', 'Sabe; apenas não faz isso com vetores.']] }
  ] },

  /* ---------------- Práticos ---------------- */
  { id: 'a8-p01', topic: 't-operadores', ref: P + '1', title: 'Alterar variáveis pelos ponteiros', type: 'drag', make: function (p) {
    return { q: 'Complete o programa: cada ponteiro deve apontar para a sua variável e alterar o valor dela.', code: R`int ${p.i} = ${p.iv};
float ${p.f} = ${p.fv};
char ${p.c} = '${p.cv}';
int *pi = [[&${p.i}]];
float *pf = [[&${p.f}]];
char *pc = &${p.c};
[[*pi]] = ${p.ni};
*pf = ${p.nf};
[[*pc]] = '${p.nc}';
printf("%d %.1f %c\n", ${p.i}, ${p.f}, ${p.c});`, extra: [
      ['&pi', '`&pi` é o endereço do próprio ponteiro.'],
      ['pi', 'Sem `*`, a linha trocaria o endereço guardado em pi, não o valor.'],
      [p.i, 'Isso é o valor da variável; pi precisa do endereço.'],
      ['*' + p.f, p.f + ' não é ponteiro; não dá para desreferenciar.']],
      why: 'Na declaração o ponteiro recebe `&variável`; para alterar, escreve-se `*ponteiro = valor`.' };
  }, p: [
    { i: 'idade', iv: 20, f: 'altura', fv: '1.75f', c: 'turma', cv: 'A', ni: 21, nf: '1.80f', nc: 'B' },
    { i: 'pontos', iv: 10, f: 'nota', fv: '6.5f', c: 'nivel', cv: 'C', ni: 15, nf: '8.0f', nc: 'D' },
    { i: 'ano', iv: 2025, f: 'peso', fv: '70.2f', c: 'sexo', cv: 'F', ni: 2026, nf: '68.9f', nc: 'M' }] },

  { id: 'a8-p02', topic: 't-operadores', ref: P + '2', title: 'Comparar endereços', type: 'drag', make: function (p) {
    return { q: 'Complete para exibir o maior endereço entre as variáveis <code>' + p.a + '</code> e <code>' + p.b + '</code>.', code: R`int ${p.a} = ${p.av}, ${p.b} = ${p.bv};
if ([[&${p.a}]] > [[&${p.b}]])
    printf("Maior endereco: [[%p]]\n", (void *) &${p.a});
else
    printf("Maior endereco: %p\n", (void *) &${p.b});`, extra: [
      [p.a, 'Comparar ' + p.a + ' com ' + p.b + ' compara valores, não endereços.'],
      ['*' + p.a, p.a + ' não é ponteiro.'],
      ['%d', 'Endereço se imprime com `%p`.']],
      why: '`&` dá o endereço de cada variável, e `%p` imprime endereços.' };
  }, p: [{ a: 'x', av: 5, b: 'y', bv: 9 }, { a: 'idade', av: 30, b: 'ano', bv: 1990 }, { a: 'm', av: -2, b: 'n', bv: 7 }] },

  { id: 'a8-p03', topic: 't-operadores', ref: P + '3', title: 'Conteúdo do maior endereço', type: 'fix', make: function (p) {
    return { q: 'O programa lê duas variáveis e deve exibir o <strong>conteúdo</strong> da que está no maior endereço. Uma linha está errada.', code: R`int ${p.a}, ${p.b};
int *maior;
scanf("%d %d", &${p.a}, &${p.b});
if (&${p.a} > &${p.b})
    maior = &${p.a};
else
    maior = &${p.b};
printf("Conteudo: %d\n", ${p.bug});`, line: 8,
      fixes: [['printf("Conteudo: %d\\n", *maior);', '`*maior` é o conteúdo do endereço escolhido.'], ['printf("Conteudo: %d\\n", &maior);', '`&maior` é o endereço do ponteiro.'], ['printf("Conteudo: %p\\n", maior);', 'Isso mostra o endereço, não o conteúdo.']],
      why: 'Para o conteúdo, desreferencie o ponteiro: `*maior`.' };
  }, p: [{ a: 'a', b: 'b', bug: 'maior' }, { a: 'v1', b: 'v2', bug: 'maior' }, { a: 'num1', b: 'num2', bug: '&maior' }] },

  { id: 'a8-p04', topic: 't-referencia', ref: P + '4', title: 'Função de troca', type: 'drag', make: function (p) {
    return { q: 'Complete a função que troca o conteúdo de duas variáveis e a chamada na main.', code: R`void trocar([[int *${p.a}]], int *${p.b}) {
    int aux = [[*${p.a}]];
    *${p.a} = *${p.b};
    [[*${p.b}]] = aux;
}

int main() {
    int ${p.x} = ${p.xv}, ${p.y} = ${p.yv};
    trocar([[&${p.x}]], &${p.y});
    printf("%d %d\n", ${p.x}, ${p.y});
    return 0;
}`, extra: [
      ['int ' + p.a, 'Por valor a função recebe cópia e a troca não volta para a main.'],
      [p.a, 'Sem `*` aux guardaria um endereço, não o valor.'],
      [p.x, 'A chamada precisa enviar o endereço: `&' + p.x + '`.'],
      ['*' + p.x, p.x + ' não é ponteiro.']],
      why: 'Parâmetros ponteiro recebem `&variável`; dentro da função, `*` lê e grava os valores originais.' };
  }, p: [{ a: 'a', b: 'b', x: 'A', xv: 10, y: 'B', yv: 20 }, { a: 'p', b: 'q', x: 'num1', xv: 3, y: 'num2', yv: 8 }, { a: 'x', b: 'y', x: 'idade1', xv: 18, y: 'idade2', yv: 42 }] },

  { id: 'a8-p05', topic: 't-referencia', ref: P + '5', title: 'Maior na primeira, menor na segunda', type: 'fix', make: function (p) {
    return { q: 'A função deve deixar o maior valor na primeira variável e o menor na segunda. Ache o erro.', code: R`void ordenar2(int *${p.a}, int *${p.b}) {
    if (*${p.a} < *${p.b}) {
        int aux = *${p.a};
        *${p.a} = *${p.b};
        ${p.b} = aux;
    }
}`, line: 5,
      fixes: [['*' + p.b + ' = aux;', 'Grava aux no endereço apontado.'], ['&' + p.b + ' = aux;', 'Não se atribui a um endereço.'], [p.b + ' = &aux;', 'Faria o ponteiro apontar para a variável local aux.']],
      why: '`' + p.b + ' = aux;` tenta guardar um int no ponteiro. O valor precisa ir para `*' + p.b + '`.' };
  }, p: [{ a: 'a', b: 'b' }, { a: 'x', b: 'y' }, { a: 'primeiro', b: 'segundo' }] },

  { id: 'a8-p06', topic: 't-referencia', ref: P + '6', title: 'Soma do dobro', type: 'drag', make: function (p) {
    return { q: 'A função guarda o dobro de cada número na própria variável e retorna a soma dos dobros. Complete.', code: R`int somaDobro(int *${p.a}, int *${p.b}) {
    [[*${p.a}]] = *${p.a} * 2;
    *${p.b} = [[*${p.b} * 2]];
    return [[*${p.a} + *${p.b}]];
}

/* na main: */
int ${p.x} = ${p.xv}, ${p.y} = ${p.yv};
int s = somaDobro([[&${p.x}]], &${p.y});
/* s = ${2 * (p.xv + p.yv)} */`, extra: [
      [p.a + ' + ' + p.b, 'Isso soma endereços.'],
      ['*' + p.b + ' * *' + p.b, 'Isso eleva ao quadrado, não dobra.'],
      [p.a, 'Sem `*` mudaria o endereço guardado, não o valor.'],
      [p.x, 'A chamada precisa de endereço.']],
      why: 'Ao final ' + p.x + ' vale ' + 2 * p.xv + ', ' + p.y + ' vale ' + 2 * p.yv + ' e a função devolve ' + 2 * (p.xv + p.yv) + '.' };
  }, p: [{ a: 'A', b: 'B', x: 'a', xv: 3, y: 'b', yv: 5 }, { a: 'n1', b: 'n2', x: 'x', xv: 7, y: 'y', yv: 1 }, { a: 'p', b: 'q', x: 'm', xv: 12, y: 'n', yv: 4 }] },

  { id: 'a8-p07', topic: 't-referencia', ref: P + '7', title: 'Soma guardada em A', type: 'mc', make: function (p) {
    return { q: 'A função soma A e B e guarda o resultado em A, sem retorno. Qual a saída?', saida: true, code: R`#include <stdio.h>
void somar(int *A, int B) {
    *A = *A + B;
    B = 0;
}

int main() {
    int A = ${p.a}, B = ${p.b};
    somar(&A, B);
    printf("A = %d, B = %d\n", A, B);
    return 0;
}`, opts: [['A = ' + (p.a + p.b) + ', B = ' + p.b, 'A foi por endereço e mudou; B foi por valor, então zerar a cópia não afeta a main.'],
      ['A = ' + (p.a + p.b) + ', B = 0', '`B = 0` mexe só na cópia.'],
      ['A = ' + p.a + ', B = ' + p.b, 'A foi passado com `&` e mudou.'],
      ['A = ' + p.b + ', B = ' + p.a, 'Não há troca.']] };
  }, p: [{ a: 4, b: 6 }, { a: 15, b: -3 }, { a: 2, b: 9 }] },

  { id: 'a8-p08', topic: 't-aritmetica', ref: P + '8', title: 'Endereços de um vetor', type: 'mc', make: function (p) {
    var addr = function (k) { return '0x' + (p.base + k * p.sz).toString(16).toUpperCase(); };
    return { q: 'Um vetor <code>' + p.tipo + ' v[10]</code> começa no endereço ' + addr(0) + ' e cada ' + p.tipo + ' ocupa ' + p.sz + ' bytes. O laço imprime <code>&amp;v[i]</code> com <code>%p</code>. Qual é o endereço de <code>v[' + p.k + ']</code>?', opts: [
      [addr(p.k), 'Início + ' + p.k + ' × ' + p.sz + ' bytes.'],
      ['0x' + (p.base + p.k).toString(16).toUpperCase(), 'Isso avançaria 1 byte por elemento; cada elemento ocupa ' + p.sz + '.'],
      [addr(p.k + 1), 'O índice começa em 0: v[' + p.k + '] é o elemento número ' + (p.k + 1) + '.'],
      [addr(p.k - 1), 'Isso é o endereço de v[' + (p.k - 1) + '].']] };
  }, p: [{ tipo: 'float', sz: 4, base: 0x1000, k: 3 }, { tipo: 'double', sz: 8, base: 0x2000, k: 5 }, { tipo: 'int', sz: 4, base: 0x62FE10, k: 9 }] },

  { id: 'a8-p09', topic: 't-aritmetica', ref: P + '9', title: 'Ler e dobrar só com aritmética de ponteiros', type: 'drag', make: function (p) {
    return { q: 'Complete usando apenas aritmética de ponteiros (sem colchetes) para ler o vetor e imprimir o dobro de cada valor.', code: R`int ${p.v}[${p.n}];
int *p = ${p.v};
for (int i = 0; i < ${p.n}; i++)
    scanf("%d", [[p + i]]);
for (int i = 0; i < ${p.n}; i++)
    printf("%d\n", [[*(p + i)]] * 2);`, extra: [
      ['&p + i', '`&p` é o endereço do ponteiro, não do vetor.'],
      ['*p + i', 'Isso soma i ao primeiro elemento.'],
      ['p++', 'Avançaria o próprio ponteiro a cada volta; somado ao i, pularia posições.']],
      why: '`p + i` é o endereço de ' + p.v + '[i]; `*(p + i)` é o valor guardado nele.' };
  }, p: [{ v: 'vet', n: 5 }, { v: 'numeros', n: 8 }, { v: 'dados', n: 6 }] },

  { id: 'a8-p10', topic: 't-vetores', ref: P + '10', title: 'Contar pares e ímpares', type: 'drag', make: function (p) {
    return { q: 'Complete a função com o protótipo <code>void contar(int *vet, int N, int *pares, int *impares)</code>. Para ' + p.ex + ', ela deixa pares = ' + p.np + ' e impares = ' + p.ni + '.', code: R`void contar(int *vet, int N, int *pares, int *impares) {
    [[*pares]] = 0;
    *impares = 0;
    for (int i = 0; [[i < N]]; i++) {
        if (vet[i] % 2 == 0)
            [[(*pares)++]];
        else
            (*impares)++;
    }
}`, extra: [['pares', 'Sem `*` zeraria o ponteiro (NULL), não o contador.'], ['i <= N', 'Com `<=` o laço lê vet[N], fora do vetor.'], ['pares++', 'Isso move o ponteiro; o contador fica igual.'], ['*pares++', 'Sem parênteses o `++` vale para o ponteiro, não para o valor.']],
      why: 'Os resultados saem pelos ponteiros: `*pares` e `*impares` são as variáveis da main.' };
  }, p: [{ ex: '{3, 8, 10, 7}', np: 2, ni: 2 }, { ex: '{1, 5, 6, 9, 11}', np: 1, ni: 4 }, { ex: '{2, 4, 6}', np: 3, ni: 0 }] },

  { id: 'a8-p11', topic: 't-vetores', ref: P + '11', title: 'Média e quantos ficam acima', type: 'fix', make: function (p) {
    return { q: 'A função <code>analisar</code> deve guardar a média em <code>*media</code> e em <code>*acima</code> quantos valores passam da média. Para {' + p.vals + '} o certo é média ' + p.m + ' e acima = ' + p.ac + '. Uma linha está errada.', code: R`void analisar(float *vet, int N, float *media, int *acima) {
    float soma = 0;
    for (int i = 0; i < N; i++)
        soma += vet[i];
    *media = soma / N;
    *acima = 0;
    for (int i = 0; i < N; i++)
        if (vet[i] > ${p.bug})
            (*acima)++;
}`, line: 8,
      fixes: [['if (vet[i] > *media)', 'Compara com o valor guardado em *media.'], ['if (vet[i] > &media)', '`&media` é endereço de um ponteiro.'], ['if (*vet[i] > *media)', 'vet[i] já é um float; `*vet[i]` não compila.']],
      why: 'media é ponteiro; o número da média está em `*media`.' };
  }, p: [{ vals: '4, 6, 8, 10', m: '7.0', ac: 2, bug: 'media' }, { vals: '1, 2, 9', m: '4.0', ac: 1, bug: 'media' }, { vals: '5, 5, 8, 2', m: '5.0', ac: 1, bug: '&media' }] },

  { id: 'a8-p12', topic: 't-vetores', ref: P + '12', title: 'Trocar duas posições do vetor', type: 'drag', make: function (p) {
    return { q: 'Complete <code>void trocar(int *vet, int N, int A, int B)</code>. Com vet = {' + p.vals + '}, A = ' + p.A + ' e B = ' + p.B + ', o resultado fica {' + p.res + '}.', code: R`void trocar(int *vet, int N, int A, int B) {
    int aux = [[vet[A]]];
    vet[A] = [[vet[B]]];
    [[vet[B]]] = aux;
}`, extra: [['A', 'A é o índice; o valor está em vet[A].'], ['&vet[A]', 'Isso é o endereço da posição.'], ['vet[N]', 'N é o tamanho; vet[N] está fora do vetor.']],
      why: 'Troca clássica com auxiliar, usando os índices A e B.' };
  }, p: [{ vals: '5, 1, 9, 3', A: 0, B: 3, res: '3, 1, 9, 5' }, { vals: '2, 4, 6, 8, 10', A: 1, B: 4, res: '2, 10, 6, 8, 4' }, { vals: '7, 0, 3', A: 2, B: 1, res: '7, 3, 0' }] },

  { id: 'a8-p13', topic: 't-aritmetica', ref: P + '13', title: 'Endereços das posições pares', type: 'fix', make: function (p) {
    return { q: 'O programa deve imprimir o endereço das posições que guardam valores <strong>pares</strong>. Uma linha está errada.', code: R`int ${p.v}[5];
for (int i = 0; i < 5; i++)
    scanf("%d", &${p.v}[i]);
for (int i = 0; i < 5; i++)
    if (${p.v}[i] % 2 == 0)
        printf("%p\n", (void *) ${p.bug});`, line: 6,
      fixes: [['printf("%p\\n", (void *) &' + p.v + '[i]);', '`&' + p.v + '[i]` (ou `' + p.v + ' + i`) é o endereço da posição i.'], ['printf("%p\\n", (void *) ' + p.v + ');', 'Imprime sempre o endereço do início.'], ['printf("%d\\n", ' + p.v + '[i]);', 'Isso mostra o valor, não o endereço.']],
      why: 'O pedido é o endereço da posição, e não o conteúdo.' };
  }, p: [{ v: 'vet', bug: 'vet' }, { v: 'num', bug: '&num' }, { v: 'dados', bug: 'dados' }] },

  { id: 'a8-p14', topic: 't-vetores', ref: P + '14', title: 'Maior elemento e ocorrências', type: 'mc', make: function (p) {
    return { q: 'A função void <code>maiorOcorr(int *v, int n, int *maior, int *qtd)</code> é chamada com o vetor abaixo. Qual a saída?', saida: true, code: R`#include <stdio.h>
void maiorOcorr(int *v, int n, int *maior, int *qtd) {
    *maior = v[0];
    *qtd = 0;
    for (int i = 0; i < n; i++) {
        if (v[i] > *maior) {
            *maior = v[i];
            *qtd = 1;
        } else if (v[i] == *maior)
            (*qtd)++;
    }
}

int main() {
    int v[] = {${p.vals}};
    int m, q;
    maiorOcorr(v, ${p.n}, &m, &q);
    printf("%d %d\n", m, q);
    return 0;
}`, opts: [[p.m + ' ' + p.q, 'Maior ' + p.m + ', aparece ' + p.q + ' vez(es).'], [p.m + ' ' + (p.q === 1 ? 0 : 1), p.q === 1 ? 'A primeira ocorrência do maior também conta.' : 'O contador soma cada repetição do maior.'], [p.alt + ' ' + p.q, p.alt + ' não é o maior.'], [p.m + ' ' + (p.q + 1), 'v[0] não é contado duas vezes: qtd começa em 0 e o laço começa em i = 0.']] };
  }, p: [{ vals: '5, 2, 15, 3, 7, 15, 8, 6, 15', n: 9, m: 15, q: 3, alt: 8 }, { vals: '9, 4, 9, 1', n: 4, m: 9, q: 2, alt: 4 }, { vals: '3, 12, 7, 11', n: 4, m: 12, q: 1, alt: 11 }] },

  { id: 'a8-p15', topic: 't-vetores', ref: P + '15', title: 'Contar negativos', type: 'fix', make: function (p) {
    return { q: 'Implementação de <code>void negativos(float *vet, int N, int *qtd)</code>. Para {' + p.vals + '} deveria dar ' + p.r + '. Ache a linha errada.', code: R`void negativos(float *vet, int N, int *qtd) {
    *qtd = 0;
    for (int i = 0; ${p.cond}; i++)
        if (vet[i] < 0)
            ${p.inc};
}`, line: p.line,
      fixes: p.line === 3 ? [['for (int i = 0; i < N; i++)', 'Índices válidos vão de 0 a N-1.'], ['for (int i = 1; i <= N; i++)', 'Pularia vet[0] e leria vet[N].'], ['for (int i = 0; i <= N; i++)', 'vet[N] está fora do vetor.']]
        : [['(*qtd)++;', 'Incrementa o contador apontado.'], ['qtd++;', 'Move o ponteiro, sem contar.'], ['*qtd++;', 'Pela precedência, o `++` move o ponteiro.']],
      why: p.line === 3 ? 'Com `<=` o laço acessa uma posição além do fim.' : 'Para somar 1 no valor apontado, use parênteses: `(*qtd)++`.' };
  }, p: [{ vals: '-1.5, 2, -3, 4', r: 2, cond: 'i <= N', inc: '(*qtd)++', line: 3 }, { vals: '0.5, -0.2, -7', r: 2, cond: 'i < N', inc: 'qtd++', line: 5 }, { vals: '-4, -4, 1, -2', r: 3, cond: 'i < N', inc: '*qtd++', line: 5 }] }
  ];
})();

/* Variantes V2 e V3 escritas à mão (2026-11-18): outra tarefa, outra lógica, outro erro. V1 vem dos moldes acima.
   Gerado por _tools/gerar_alt.mjs a partir de _tools/alt/a8.alt.js; null = a versão do molde continua valendo. */
(function () {
  window.ALT = window.ALT || {};
  window.ALT['a8-p01'] = [
    {
      q: "Complete o programa: o ponteiro recebe o valor lido pelo <code>scanf</code>, que dobra o valor pelo ponteiro, e o <code>printf</code> mostra a variável original.",
      code: "int n;\nint *pn = &n;\nscanf(\"%d\", [[pn]]);\n*pn = [[*pn * 2]];\nprintf(\"%d\\n\", [[n]]);",
      extra: [
        ["&pn", "É o endereço do ponteiro, não o da variável n."],
        ["*pn", "scanf precisa de um endereço, não do valor guardado."],
        ["pn * 2", "Multiplicar um ponteiro por 2 não é permitido."],
        ["*n", "n não é ponteiro."]
      ],
      why: "O ponteiro já guarda `&n`; o scanf recebe `pn` direto, e `*pn` lê e altera a variável."
    },
    {
      q: "Complete o programa: um mesmo ponteiro é usado para alterar duas variáveis, uma de cada vez.",
      code: "int a = 3, b = 8;\nint *p = [[&a]];\n*p = *p + 1;\n[[p = &b]];\n*p = [[*p * 2]];\nprintf(\"%d %d\\n\", a, b);",
      extra: [
        ["a", "O ponteiro precisa do endereço: `&a`."],
        ["*p = &b", "Isso tentaria gravar um endereço no inteiro apontado."],
        ["p * 2", "Multiplicaria o endereço."],
        ["&p", "É o endereço do próprio ponteiro."]
      ],
      why: "Depois de `p = &b` o ponteiro passa a apontar para b: a vale 4 e b vale 16."
    }
  ];
  window.ALT['a8-p02'] = [
    {
      q: "Complete para mostrar quantas posições separam <code>v[0]</code> de <code>v[3]</code> no vetor de int (a diferença entre dois endereços conta elementos, não bytes).",
      code: "int v[5] = {10, 20, 30, 40, 50};\nprintf(\"%d\\n\", [[(int) (&v[3] - &v[0])]]);",
      extra: [
        ["v[3] - v[0]", "Subtrai os valores (40 - 10), não os endereços."],
        ["&v[3] + &v[0]", "Somar dois endereços não é permitido."],
        ["*(v + 3)", "Mostra o valor 40."]
      ],
      why: "A subtração de dois ponteiros do mesmo vetor dá o número de elementos entre eles: 3."
    },
    {
      q: "Complete o trecho que guarda em <code>maior</code> o endereço da maior variável e mostra o valor e o endereço.",
      code: "int a = 4, b = 9;\nint *pa = &a, *pb = &b;\nint *maior = [[*pa > *pb]] ? pa : pb;\nprintf(\"%d em %p\\n\", [[*maior]], (void *) [[maior]]);",
      extra: [
        ["pa > pb", "Compara os endereços, não os valores."],
        ["pa", "Mostraria sempre o endereço de a, qualquer que seja o maior."],
        ["*pa", "Mostraria sempre o valor de a."],
        ["&maior", "É o endereço do próprio ponteiro."]
      ],
      why: "`*pa > *pb` compara os valores; `maior` guarda o endereço escolhido e `*maior` é o valor."
    }
  ];
  window.ALT['a8-p03'] = [
    {
      q: "O programa deve dobrar o valor lido usando um ponteiro para ele. Uma linha está errada.",
      code: "int n;\nscanf(\"%d\", &n);\nint *p = &n;\np = p * 2;\nprintf(\"%d\\n\", n);",
      line: 4,
      fixes: [
        ["*p = *p * 2;", "Lê o conteúdo apontado, dobra e grava de volta."],
        ["p = *p * 2;", "Tentaria gravar um número no ponteiro."],
        ["*p = p * 2;", "Multiplica o endereço, não o valor."]
      ],
      why: "O ponteiro guarda um endereço; para mexer no valor é preciso desreferenciar: `*p`."
    },
    {
      q: "O programa deve guardar o endereço de <code>n</code> num ponteiro e alterar n por ele. Uma linha está errada.",
      code: "int n = 5;\nint *p = n;\n*p = 7;\nprintf(\"%d\\n\", n);",
      line: 2,
      fixes: [
        ["int *p = &n;", "O ponteiro recebe o endereço de n."],
        ["int *p = *n;", "n não é ponteiro."],
        ["int p = &n;", "Um int comum não é o tipo certo para guardar um endereço."]
      ],
      why: "Sem o `&`, o 5 seria usado como endereço."
    }
  ];
  window.ALT['a8-p04'] = [
    {
      q: "Complete a função que devolve o maior e o menor de dois números por ponteiros, e a chamada na main.",
      code: "void maiorMenor(int a, int b, [[int *maior]], int *menor) {\n    if (a > b) {\n        [[*maior]] = a;\n        *menor = b;\n    } else {\n        *maior = b;\n        *menor = a;\n    }\n}\n\nint main() {\n    int x = 4, y = 9, mx, mn;\n    maiorMenor(x, y, [[&mx]], &mn);\n    printf(\"%d %d\\n\", mx, mn);\n    return 0;\n}",
      extra: [
        ["int maior", "Receberia só uma cópia."],
        ["maior", "Sem o asterisco só trocaria o ponteiro local."],
        ["mx", "A função espera endereços."],
        ["&x", "x já é um dos valores de entrada; o resultado deve ir para mx."]
      ],
      why: "Para devolver dois resultados, a função recebe os endereços onde gravá-los."
    },
    {
      q: "Complete a função que aplica um desconto percentual ao preço guardado na main.",
      code: "void descontar([[float *preco]], float perc) {\n    *preco = [[*preco * (1 - perc / 100)]];\n}\n\nint main() {\n    float preco = 200;\n    descontar([[&preco]], 10);\n    printf(\"%.2f\\n\", preco);\n    return 0;\n}",
      extra: [
        ["float preco", "Receberia só uma cópia do preço."],
        ["preco * (1 - perc / 100)", "Multiplicaria o endereço."],
        ["preco", "A função espera o endereço da variável."],
        ["*preco", "O desconto não seria aplicado."]
      ],
      why: "O ponteiro leva a função até a variável da main, que passa a valer 180.00."
    }
  ];
  window.ALT['a8-p05'] = [
    {
      q: "A função deve guardar em <code>*q</code> o quociente e em <code>*r</code> o resto. Para 17 e 5 deveria dar q = 3 e r = 2, mas dá r = 3. Ache o erro.",
      code: "void dividir(int a, int b, int *q, int *r) {\n    *q = a / b;\n    *r = a / b;\n}",
      line: 3,
      fixes: [
        ["*r = a % b;", "O resto da divisão inteira é `%`."],
        ["*r = a - b;", "Subtrair não dá o resto."],
        ["r = a % b;", "Trocaria o ponteiro local em vez de gravar no endereço."]
      ],
      why: "O operador `/` dá o quociente; o resto é `%`."
    },
    {
      q: "A função deve ler dois inteiros e deixá-los nas variáveis da main. Ache o erro.",
      code: "void lerDois(int *x, int *y) {\n    scanf(\"%d %d\", x, &y);\n}",
      line: 2,
      fixes: [
        ["scanf(\"%d %d\", x, y);", "x e y já são endereços: vão direto para o scanf."],
        ["scanf(\"%d %d\", &x, &y);", "Passaria o endereço dos ponteiros."],
        ["scanf(\"%d %d\", *x, *y);", "Passaria os valores, não os endereços."]
      ],
      why: "`&y` é o endereço do parâmetro (um int *), não o da variável da main; o scanf recebe `y` direto."
    }
  ];
  window.ALT['a8-p06'] = [
    {
      q: "A função devolve a soma e o produto de dois números pelos ponteiros, sem retorno. Complete.",
      code: "void somaProd(int a, int b, int *soma, int *prod) {\n    [[*soma]] = a + b;\n    *prod = [[a * b]];\n}\n\n/* na main: */\nint s, p;\nsomaProd(3, 5, [[&s]], &p);\n/* s = 8, p = 15 */",
      extra: [
        ["soma", "Trocaria o ponteiro local, não o valor."],
        ["*a * *b", "a e b são ints comuns."],
        ["s", "A função espera o endereço."],
        ["&a", "a é o primeiro número, não o resultado."]
      ],
      why: "Os resultados saem pelos ponteiros: `*soma` e `*prod` são as variáveis s e p da main."
    },
    {
      q: "A função devolve o valor atual do contador e o incrementa na própria variável da main. Complete.",
      code: "int proximo(int *contador) {\n    int antigo = [[*contador]];\n    [[(*contador)++]];\n    return [[antigo]];\n}\n\n/* na main: */\nint c = 5;\nint x = proximo([[&c]]);\n/* x = 5, c = 6 */",
      extra: [
        ["contador", "Guardaria o endereço, não o valor."],
        ["*contador++", "Avançaria o ponteiro, não o valor."],
        ["contador + 1", "Calcularia um endereço, não o valor."],
        ["c", "A função espera o endereço de c."]
      ],
      why: "Guarda-se o valor antigo, incrementa-se pelo ponteiro e devolve-se o antigo."
    }
  ];
  window.ALT['a8-p07'] = [
    {
      q: "A função tenta trocar os dois ponteiros recebidos. Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid trocarPonteiros(int *a, int *b) {\n    int *t = a;\n    a = b;\n    b = t;\n}\n\nint main() {\n    int x = 3, y = 7;\n    trocarPonteiros(&x, &y);\n    printf(\"%d %d\\n\", x, y);\n    return 0;\n}",
      opts: [
        ["3 7", "Os ponteiros a e b são cópias locais: trocá-los não troca os valores de x e y."],
        ["7 3", "Para trocar os valores seria preciso `*a` e `*b`."],
        ["7 7", "Nenhum valor foi alterado."],
        ["3 3", "Nenhum valor foi alterado."]
      ]
    },
    {
      q: "A função tenta redirecionar o ponteiro recebido para outra variável. Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid g(int *p) {\n    int local = 100;\n    p = &local;\n    *p = 50;\n}\n\nint main() {\n    int n = 1;\n    g(&n);\n    printf(\"%d\\n\", n);\n    return 0;\n}",
      opts: [
        ["1", "`p = &local` muda só o ponteiro local; o `*p = 50` altera `local`, não n."],
        ["50", "Depois de `p = &local` o ponteiro já não aponta para n."],
        ["100", "local recebeu 50 e só existe dentro da função."],
        ["Erro de compilação.", "O código é válido."]
      ]
    }
  ];
  window.ALT['a8-p08'] = [
    {
      q: "Um vetor <code>int v[10]</code> começa no endereço 0x1000 (cada int ocupa 4 bytes) e <code>int *p = &amp;v[2];</code>. Qual endereço <code>p</code> guarda depois de <code>p = p + 3;</code>?",
      opts: [
        ["0x1014", "`v[2]` está em 0x1008; somar 3 ao ponteiro avança 3 × 4 = 12 bytes (0xC)."],
        ["0x100B", "A soma anda em elementos, não em bytes."],
        ["0x1018", "Isso seria p = &v[6]."],
        ["0x1020", "Avançaria 6 elementos a partir do início."]
      ]
    },
    {
      q: "Um vetor <code>double v[10]</code> (8 bytes por elemento) tem <code>double *p = &amp;v[2];</code> e <code>double *q = &amp;v[7];</code>. Quanto vale <code>q - p</code>?",
      opts: [
        ["5", "A diferença entre ponteiros conta elementos entre eles."],
        ["40", "Esse é o número de bytes, que a subtração de ponteiros não devolve."],
        ["7", "É a posição de q, não a diferença."],
        ["9", "Soma dos índices."]
      ]
    }
  ];
  window.ALT['a8-p09'] = [
    {
      q: "Complete usando um ponteiro que anda pelo vetor com <code>p++</code> para somar os 5 valores lidos.",
      code: "int vet[5], soma = 0;\nfor (int i = 0; i < 5; i++)\n    scanf(\"%d\", &vet[i]);\nint *p = vet;\nfor (int i = 0; i < 5; i++) {\n    soma += [[*p]];\n    [[p++]];\n}\nprintf(\"%d\\n\", soma);",
      extra: [
        ["p", "Somaria o endereço."],
        ["&p", "Somaria o endereço do próprio ponteiro."],
        ["*p + 1", "Somaria 1 ao valor, não avançaria."],
        ["p--", "Voltaria uma posição."]
      ],
      why: "`*p` lê o elemento atual; `p++` avança para o próximo."
    },
    {
      q: "Complete o laço que percorre o vetor com um ponteiro que vai de <code>vet</code> até o fim, imprimindo cada valor.",
      code: "int vet[5] = {4, 8, 15, 16, 23};\nfor (int *q = vet; [[q < vet + 5]]; q++)\n    printf(\"%d \", [[*q]]);",
      extra: [
        ["q <= vet + 5", "Leria uma posição depois do fim do vetor."],
        ["q < 5", "Compara um endereço com um número."],
        ["q", "Mostraria o endereço."],
        ["&q", "Mostraria o endereço do ponteiro."]
      ],
      why: "O ponteiro anda até o endereço logo depois do último elemento, `vet + 5`."
    }
  ];
  window.ALT['a8-p10'] = [
    {
      q: "Complete <code>void minMax(int *vet, int N, int *min, int *max)</code>. Para {7, 2, 9, 4}, deixa min = 2 e max = 9.",
      code: "void minMax(int *vet, int N, int *min, int *max) {\n    [[*min]] = vet[0];\n    *max = vet[0];\n    for (int i = 1; i < N; i++) {\n        if ([[vet[i] < *min]])\n            *min = vet[i];\n        if (vet[i] > *max)\n            [[*max = vet[i]]];\n    }\n}",
      extra: [
        ["min", "Trocaria o ponteiro local."],
        ["vet[i] < min", "Compara um valor com um endereço."],
        ["max = vet[i]", "Gravaria o valor no ponteiro local."],
        ["*vet = vet[i]", "Alteraria o vetor."]
      ],
      why: "min e max são endereços de variáveis da chamadora: inicializam-se e atualizam-se com `*`."
    },
    {
      q: "Complete <code>void somas(float *v, int N, float *soma, float *media)</code>. Para {2, 4, 9}, deixa soma = 15 e media = 5.",
      code: "void somas(float *v, int N, float *soma, float *media) {\n    *soma = 0;\n    for (int i = 0; i < N; i++)\n        [[*soma += v[i]]];\n    *media = [[*soma / N]];\n}",
      extra: [
        ["soma += v[i]", "Mexeria no ponteiro local em vez da variável."],
        ["soma / N", "Divide um endereço."],
        ["*soma = v[i]", "Substituiria em vez de acumular."],
        ["*media / N", "media ainda não tem valor."]
      ],
      why: "Soma e média saem pelos ponteiros; a média usa o total já acumulado em `*soma`."
    }
  ];
  window.ALT['a8-p11'] = [
    {
      q: "A função <code>analisar</code> deve guardar a média em <code>*media</code> e em <code>*acima</code> quantos valores passam da média. Para {4, 6, 8, 10}: média 7.0 e acima = 2, mas a média devolvida é lixo. Uma linha está errada.",
      code: "void analisar(float *vet, int N, float *media, int *acima) {\n    float soma = 0;\n    for (int i = 0; i < N; i++)\n        soma += vet[i];\n    media = soma / N;\n    *acima = 0;\n    for (int i = 0; i < N; i++)\n        if (vet[i] > *media)\n            (*acima)++;\n}",
      line: 5,
      fixes: [
        ["*media = soma / N;", "Grava a média na variável da chamadora."],
        ["*media = soma;", "Esqueceu de dividir por N."],
        ["&media = soma / N;", "Não se atribui a um endereço."]
      ],
      why: "`media = ...` troca o ponteiro local; a variável da chamadora só recebe o valor com `*media = ...`."
    },
    {
      q: "A função <code>analisar</code> deve guardar a média em <code>*media</code> e em <code>*acima</code> quantos valores passam da média. A média sai errada às vezes (lixo na soma). Uma linha está errada.",
      code: "void analisar(float *vet, int N, float *media, int *acima) {\n    float soma;\n    for (int i = 0; i < N; i++)\n        soma += vet[i];\n    *media = soma / N;\n    *acima = 0;\n    for (int i = 0; i < N; i++)\n        if (vet[i] > *media)\n            (*acima)++;\n}",
      line: 2,
      fixes: [
        ["float soma = 0;", "O acumulador precisa começar em zero."],
        ["float soma = N;", "Começaria em N."],
        ["float soma = *media;", "*media ainda não tem valor."]
      ],
      why: "Uma variável local sem valor inicial começa com lixo, que entra na soma."
    }
  ];
  window.ALT['a8-p12'] = [
    {
      q: "Complete <code>void inverter(int *vet, int N)</code>, que troca os extremos com dois ponteiros que se aproximam. Com {1, 2, 3, 4} fica {4, 3, 2, 1}.",
      code: "void inverter(int *vet, int N) {\n    int *ini = vet, *fim = vet + N - 1;\n    while ([[ini < fim]]) {\n        int aux = *ini;\n        *ini = [[*fim]];\n        *fim = aux;\n        [[ini++]];\n        fim--;\n    }\n}",
      extra: [
        ["ini != fim", "Com N par os ponteiros se cruzam sem nunca serem iguais, e o laço não para."],
        ["fim", "Gravaria o endereço no inteiro."],
        ["ini--", "Os dois ponteiros andariam para o mesmo lado."],
        ["*ini", "Copiaria o valor para ele mesmo."]
      ],
      why: "Os dois ponteiros começam nas pontas e se aproximam até se cruzarem."
    },
    {
      q: "Complete <code>void preencher(int *vet, int N, int valor)</code>, que grava <code>valor</code> em todas as posições.",
      code: "void preencher(int *vet, int N, int valor) {\n    for (int i = 0; [[i < N]]; i++)\n        [[vet[i]]] = [[valor]];\n}",
      extra: [
        ["i <= N", "Gravaria uma posição fora do vetor."],
        ["vet", "Trocaria o ponteiro local."],
        ["*valor", "valor é um int comum."],
        ["vet[N]", "Posição fora do vetor."]
      ],
      why: "Para cada posição de 0 a N-1 grava-se o mesmo valor."
    }
  ];
  window.ALT['a8-p13'] = [
    {
      q: "O programa deve imprimir o <strong>endereço do maior elemento</strong> do vetor. Uma linha está errada.",
      code: "int vet[5];\nfor (int i = 0; i < 5; i++)\n    scanf(\"%d\", &vet[i]);\nint *maior = &vet[0];\nfor (int i = 1; i < 5; i++)\n    if (vet[i] > *maior)\n        maior = vet[i];\nprintf(\"%p\\n\", (void *) maior);",
      line: 7,
      fixes: [
        ["maior = &vet[i];", "O ponteiro recebe o endereço do elemento."],
        ["*maior = vet[i];", "Alteraria o conteúdo do primeiro elemento, não o ponteiro."],
        ["maior = *vet[i];", "vet[i] não é ponteiro."]
      ],
      why: "Sem o `&`, o valor do elemento seria usado como se fosse um endereço."
    },
    {
      q: "O programa deve imprimir o endereço da <strong>última</strong> posição de um vetor com N elementos. Uma linha está errada.",
      code: "int vet[6] = {1, 2, 3, 4, 5, 6};\nint N = 6;\nprintf(\"%p\\n\", (void *) (vet + N));",
      line: 3,
      fixes: [
        ["printf(\"%p\\n\", (void *) (vet + N - 1));", "A última posição está N - 1 elementos à frente do início."],
        ["printf(\"%p\\n\", (void *) (vet + N + 1));", "Passaria ainda mais do fim."],
        ["printf(\"%d\\n\", *(vet + N - 1));", "Mostraria o valor, não o endereço."]
      ],
      why: "`vet + N` é o endereço logo depois do vetor; a última posição é `vet + N - 1`."
    }
  ];
  window.ALT['a8-p14'] = [
    {
      q: "A função grava a soma dos pares e quantos pares há. Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid somaPares(int *v, int n, int *soma, int *qtd) {\n    *soma = 0;\n    *qtd = 0;\n    for (int i = 0; i < n; i++)\n        if (v[i] % 2 == 0) {\n            *soma += v[i];\n            (*qtd)++;\n        }\n}\n\nint main() {\n    int v[] = {3, 8, 4, 5, 6};\n    int s, q;\n    somaPares(v, 5, &s, &q);\n    printf(\"%d %d\\n\", s, q);\n    return 0;\n}",
      opts: [
        ["18 3", "Os pares são 8, 4 e 6: soma 18, quantidade 3."],
        ["18 5", "A quantidade conta só os pares."],
        ["26 3", "Somou um ímpar (o 5 e o 3 não são pares)."],
        ["8 3", "Parou na soma do primeiro par."]
      ]
    },
    {
      q: "A função acumula valores no próprio vetor. Qual a saída?",
      saida: true,
      code: "#include <stdio.h>\nvoid acumular(int *v, int n) {\n    for (int i = 1; i < n; i++)\n        *(v + i) += *(v + i - 1);\n}\n\nint main() {\n    int v[] = {1, 2, 3, 4};\n    acumular(v, 4);\n    for (int i = 0; i < 4; i++)\n        printf(\"%d \", v[i]);\n    printf(\"\\n\");\n    return 0;\n}",
      opts: [
        ["1 3 6 10", "Cada posição soma o valor já acumulado da anterior."],
        ["1 2 3 4", "A função altera o vetor original."],
        ["1 3 5 7", "Somaria só o valor original da anterior."],
        ["10 9 7 4", "Os acumulados vão do início para o fim, não ao contrário."]
      ]
    }
  ];
  window.ALT['a8-p15'] = [
    {
      q: "Implementação de <code>void negativos(float *vet, int N, int *qtd)</code>. Para {0.5, -0.2, -7} deveria dar 2, mas o valor de <code>*qtd</code> não muda. Ache a linha errada.",
      code: "void negativos(float *vet, int N, int *qtd) {\n    *qtd = 0;\n    for (int i = 0; i < N; i++)\n        if (vet[i] < 0)\n            qtd++;\n}",
      line: 5,
      fixes: [
        ["(*qtd)++;", "Incrementa o conteúdo apontado."],
        ["qtd++;", "Avança o ponteiro local."],
        ["*qtd++;", "Lê o valor e avança o ponteiro; não incrementa o conteúdo."]
      ],
      why: "`qtd++` avança o ponteiro; para contar é preciso incrementar o conteúdo: `(*qtd)++`."
    },
    {
      q: "Implementação de <code>void negativos(float *vet, int N, int *qtd)</code>. Para {-4, -4, 1, -2} deveria dar 3, mas dá 4. Ache a linha errada.",
      code: "void negativos(float *vet, int N, int *qtd) {\n    *qtd = 1;\n    for (int i = 0; i < N; i++)\n        if (vet[i] < 0)\n            (*qtd)++;\n}",
      line: 2,
      fixes: [
        ["*qtd = 0;", "A contagem começa em zero."],
        ["qtd = 0;", "Zeraria o ponteiro local."],
        ["*qtd = N;", "Começaria em N."]
      ],
      why: "A contagem começou em 1: sobra um a mais em qualquer resposta."
    }
  ];
})();
