/* Algoritmos II · comportamento comum a todas as páginas.
   Tudo aqui é melhoria: sem JavaScript, o texto, o código e as caixas continuam legíveis. */
(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.add('js');

  /* ---------- Realce de sintaxe C (sem bibliotecas) ---------- */
  var KW = 'if else for while do return break continue switch case default sizeof typedef struct goto const static'.split(' ');
  var TY = 'int float double char void long short unsigned signed size_t FILE No Aluno Produto Conta Funcionario Livro Pessoa Ponto Retangulo Agenda Cliente Estudante Turma Nota Professor Residencia Emprestimo Carro Motor Proprietario Endereco Cadastro Nascimento Salario'.split(' ');
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function highlight(src) {
    var out = '', i = 0, n = src.length, m;
    var re = /\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|#\s*\w+(?:\s*<[^>\n]*>)?|\b\d+(?:\.\d+)?[fF]?\b|\b0x[0-9A-Fa-f]+\b|[A-Za-z_]\w*/g;
    while ((m = re.exec(src))) {
      out += esc(src.slice(i, m.index));
      var t = m[0], c = null;
      if (t[0] === '/' ) c = 'com';
      else if (t[0] === '"' || t[0] === "'") c = 'str';
      else if (t[0] === '#') c = 'pp';
      else if (/^\d|^0x/.test(t)) c = 'num';
      else if (KW.indexOf(t) >= 0 || t === 'NULL') c = 'kw';
      else if (TY.indexOf(t) >= 0) c = 'ty';
      out += c ? '<span class="tk-' + c + '">' + esc(t) + '</span>' : esc(t);
      i = m.index + t.length;
    }
    return out + esc(src.slice(i, n));
  }
  function highlightAll(root) {
    (root || document).querySelectorAll('pre > code:not([data-hl])').forEach(function (el) {
      el.innerHTML = highlight(el.textContent);
      el.setAttribute('data-hl', '1');
    });
  }

  /* ---------- Diagramas de memória ---------- */
  function drawMem(box) {
    var spec = box.getAttribute('data-mem');
    if (!spec || box.querySelector('.cells')) return;
    var items = spec.split(';').map(function (s) { return s.trim(); }).filter(Boolean);
    var cells = document.createElement('div');
    cells.className = 'cells';
    var byName = {}, ptrs = [];
    items.forEach(function (it) {
      var hl = it[0] === '!'; if (hl) it = it.slice(1);
      var addr = '', at = it.lastIndexOf('@');
      if (at > 0) { addr = it.slice(at + 1).trim(); it = it.slice(0, at).trim(); }
      var c = document.createElement('div');
      c.className = 'cell' + (hl ? ' hl' : '');
      var name, val, target = null;
      if (it.indexOf('->') > 0) {
        var p = it.split('->'); name = p[0].trim(); target = p[1].trim(); c.classList.add('ptr');
        val = target;
      } else {
        var e = it.indexOf('='); name = e > 0 ? it.slice(0, e).trim() : it; val = e > 0 ? it.slice(e + 1).trim() : '?';
      }
      c.innerHTML = '<code class="nm"></code><code class="bx"></code><code class="ad"></code>';
      c.children[0].textContent = name;
      c.children[1].textContent = val;
      c.children[2].textContent = addr;
      cells.appendChild(c);
      byName[name] = { el: c, addr: addr };
      if (target) ptrs.push({ el: c, target: target });
    });
    box.appendChild(cells);
    // o valor do ponteiro mostra o endereço do alvo
    ptrs.forEach(function (p) {
      var t = byName[p.target];
      if (t && t.addr) p.el.children[1].textContent = t.addr;
      if (p.target === 'NULL') p.el.children[1].textContent = 'NULL';
    });
    var leg = box.getAttribute('data-legenda');
    if (leg) { var l = document.createElement('p'); l.className = 'legenda'; l.textContent = leg; box.appendChild(l); }
    box._ptrs = ptrs; box._by = byName;
    wires(box);
  }
  function wires(box) {
    var old = box.querySelector('svg.wires'); if (old) old.remove();
    if (!box._ptrs || !box._ptrs.length) return;
    var ns = 'http://www.w3.org/2000/svg', svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'wires'); svg.setAttribute('aria-hidden', 'true');
    var cells = box.querySelector('.cells');
    var W = cells.scrollWidth + 40, H = box.scrollHeight;
    svg.setAttribute('width', W); svg.setAttribute('height', H);
    var bb = box.getBoundingClientRect();
    var sx = box.scrollLeft;
    box._ptrs.forEach(function (p, k) {
      var t = box._by[p.target]; if (!t) return;
      var a = p.el.querySelector('.bx').getBoundingClientRect(), b = t.el.querySelector('.bx').getBoundingClientRect();
      var x1 = a.left + a.width / 2 - bb.left + sx, x2 = b.left + b.width / 2 - bb.left + sx;
      var ca = p.el.getBoundingClientRect(), y = ca.bottom - bb.top + 4, depth = 14 + (k % 3) * 9;
      var tb = t.el.getBoundingClientRect().bottom - bb.top + 4;
      var path = document.createElementNS(ns, 'path');
      path.setAttribute('d', 'M' + x1 + ' ' + y + ' L' + x1 + ' ' + (y + depth) + ' L' + x2 + ' ' + (y + depth) + ' L' + x2 + ' ' + (tb + 8));
      path.setAttribute('fill', 'none'); path.setAttribute('stroke', '#3ddc84'); path.setAttribute('stroke-width', '3');
      svg.appendChild(path);
      var head = document.createElementNS(ns, 'path');
      head.setAttribute('d', 'M' + (x2 - 7) + ' ' + (tb + 12) + ' L' + x2 + ' ' + (tb + 1) + ' L' + (x2 + 7) + ' ' + (tb + 12) + ' Z');
      head.setAttribute('fill', '#3ddc84');
      svg.appendChild(head);
    });
    box.appendChild(svg);
  }
  function drawList(box) {
    var spec = box.getAttribute('data-lista');
    if (!spec || box.querySelector('.lst')) return;
    var hl = (box.getAttribute('data-hl') || '').split(',');
    spec.split('|').forEach(function (one) {
      var k = one.indexOf(':'), nm = one.slice(0, k).trim(), vals = one.slice(k + 1).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
      var row = document.createElement('div'); row.className = 'lst';
      var h = document.createElement('span'); h.className = 'head'; h.innerHTML = '<code></code><b></b>'; h.firstChild.textContent = nm;
      row.appendChild(h);
      var lk = document.createElement('span'); lk.className = 'lk'; row.appendChild(lk);
      vals.forEach(function (v) {
        var no = document.createElement('span'); no.className = 'no' + (hl.indexOf(v) >= 0 ? ' hl' : '');
        no.innerHTML = '<code class="vv"></code><span class="pp"></span>'; no.firstChild.textContent = v;
        row.appendChild(no);
        var l2 = document.createElement('span'); l2.className = 'lk'; row.appendChild(l2);
      });
      var nl = document.createElement('code'); nl.className = 'null'; nl.textContent = 'NULL'; row.appendChild(nl);
      row.setAttribute('role', 'img');
      row.setAttribute('aria-label', nm + ': ' + (vals.length ? vals.join(' → ') + ' → NULL' : 'NULL (lista vazia)'));
      box.insertBefore(row, box.querySelector('.cap'));
    });
  }
  function drawSteps(box) {
    var spec = box.getAttribute('data-passos');
    if (!spec || box.querySelector('.p')) return;
    spec.split('|').forEach(function (st) {
      var k = st.indexOf(':'), lab = st.slice(0, k), vals = st.slice(k + 1).split(',');
      var p = document.createElement('div'); p.className = 'p';
      var s = document.createElement('span'); s.textContent = lab; p.appendChild(s);
      var v = document.createElement('div'); v.className = 'vet';
      vals.forEach(function (x, i) {
        x = x.trim(); var cls = '';
        if (/\*$/.test(x)) { cls = 'hl'; x = x.slice(0, -1); }
        else if (/\^$/.test(x)) { cls = 'ok'; x = x.slice(0, -1); }
        var d = document.createElement('div'); d.innerHTML = '<b><code></code></b><small><code></code></small>';
        d.firstChild.firstChild.textContent = x; if (cls) d.firstChild.className = cls; d.lastChild.firstChild.textContent = '[' + i + ']';
        v.appendChild(d);
      });
      p.appendChild(v); box.appendChild(p);
    });
  }
  function diagrams(root) {
    root = root || document;
    root.querySelectorAll('[data-mem]').forEach(drawMem);
    root.querySelectorAll('[data-lista]').forEach(drawList);
    root.querySelectorAll('[data-passos]').forEach(drawSteps);
  }
  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { document.querySelectorAll('[data-mem]').forEach(wires); }, 120);
  });

  /* ---------- Entradas ---------- */
  function reveal() {
    // entradas em ordem de leitura dentro de cada seção do texto
    document.querySelectorAll('.texto > section, .ex-group, .bim-head, .formatos .intro, .vitrine .col').forEach(function (sec) {
      var i = 0;
      Array.prototype.forEach.call(sec.children, function (el) {
        if (el.classList.contains('rv') || el.classList.contains('ex-list')) return;
        el.classList.add('rv'); el.style.setProperty('--i', Math.min(i++, 5));
      });
    });
    document.querySelectorAll('.ex-list > .ex').forEach(function (el, i) { el.classList.add('rv'); el.style.setProperty('--i', i % 2); });
    var hero = document.querySelectorAll('.hero .shutter');
    requestAnimationFrame(function () { requestAnimationFrame(function () { hero.forEach(function (e) { e.classList.add('in'); }); }); });
    var els = document.querySelectorAll('.rv, .shutter');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e) { io.observe(e); });
    // segurança: nada fica escondido se o observador falhar
    setTimeout(function () { els.forEach(function (e) { e.classList.add('in'); }); }, 4000);
  }

  /* ---------- Sumário com posição atual ---------- */
  function tocSpy() {
    var links = document.querySelectorAll('.toc a[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.remove('here'); });
          var a = map[e.target.id]; if (a) a.classList.add('here');
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* ---------- Acordeão (página inicial) ---------- */
  function accordion() {
    document.querySelectorAll('.acc').forEach(function (acc) {
      var ps = acc.querySelectorAll('.panel');
      ps.forEach(function (p) {
        var abrir = function () { ps.forEach(function (q) { q.setAttribute('aria-expanded', q === p ? 'true' : 'false'); }); };
        p.addEventListener('click', abrir);
        p.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrir(); } });
      });
    });
  }

  /* ---------- Progresso na página inicial ---------- */
  function homeProgress() {
    var store = {};
    try { store = JSON.parse(localStorage.getItem('alg2.progresso') || '{}'); } catch (e) { store = {}; }
    document.querySelectorAll('[data-prog]').forEach(function (el) {
      var aula = el.getAttribute('data-prog'), total = +el.getAttribute('data-total') || 0, feitos = 0;
      Object.keys(store).forEach(function (k) {
        if (k.indexOf(aula + '-') === 0) { var r = store[k].r || {}; Object.keys(r).forEach(function (v) { if (r[v] === 'ok') feitos++; }); }
      });
      var bar = el.querySelector('i'); if (bar && total) bar.style.width = Math.min(100, Math.round(100 * feitos / total)) + '%';
      var lab = el.parentNode.querySelector('.prog-lab'); if (lab && feitos) lab.textContent = feitos + ' de ' + total + ' versões certas';
    });
  }

  window.Alg2 = { highlight: highlight, highlightAll: highlightAll, diagrams: diagrams, esc: esc };

  function init() {
    highlightAll();
    diagrams();
    reveal();
    tocSpy();
    accordion();
    homeProgress();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
