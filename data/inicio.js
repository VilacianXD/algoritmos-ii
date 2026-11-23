/* Página inicial · um exercício de amostra (é a questão 4 da lista A8, em versões próprias). */
(function () {
  var R = String.raw;
  (window.EXS = window.EXS || {}).inicio = [
    { id: 'inicio-troca', topic: 't-demo', ref: 'amostra da A8, questão 4', title: 'Trocar dois valores', type: 'drag', make: function (p) {
      return { q: 'Encaixe os blocos para que <code>trocar</code> realmente troque ' + p.x + ' e ' + p.y + ' na main.', code: R`void trocar(int *a, int *b) {
    int aux = [[*a]];
    *a = *b;
    *b = aux;
}
/* na main: */
int ${p.x} = ${p.xv}, ${p.y} = ${p.yv};
trocar([[&${p.x}]], [[&${p.y}]]);`, extra: [['a', 'Sem `*`, aux guardaria um endereço.'], [p.x, 'A função espera endereços: `&' + p.x + '`.'], ['*' + p.y, p.y + ' não é ponteiro.']],
        why: 'Depois da chamada, ' + p.x + ' vale ' + p.yv + ' e ' + p.y + ' vale ' + p.xv + '.' };
    }, p: [{ x: 'x', xv: 10, y: 'y', yv: 20 }, { x: 'gols', xv: 3, y: 'faltas', yv: 7 }, { x: 'ano', xv: 2025, y: 'mes', yv: 11 }] }
  ];
})();
