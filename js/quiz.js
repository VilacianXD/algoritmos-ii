/* Algoritmos II · motor dos exercícios.
   Formatos: mc (múltipla escolha), fix (achar a linha errada e escolher a correção), drag (encaixar trechos).
   Cada exercício tem 3 versões: mesma metodologia, dados diferentes.
   Os dados ficam em data/aN.js e se registram em window.EXS. */
(function () {
  'use strict';
  var KEY = 'alg2.progresso';
  var store = load();
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return {}; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* sem armazenamento: segue sem salvar */ } }
  function rec(id) { return store[id] || (store[id] = { v: 0, r: {} }); }

  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
  // Texto curto: escapa tudo e transforma `trecho` em <code>.
  function txt(s) {
    return esc(s).replace(/`([^`]+)`/g, function (_, c) { return '<code>' + c + '</code>'; }).replace(/\n/g, '<br>');
  }
  // Enunciado: já é HTML; só converte `trecho` (escapando o conteúdo).
  function rich(s) {
    return String(s).replace(/`([^`]+)`/g, function (_, c) { return '<code>' + esc(c) + '</code>'; });
  }
  function seeded(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return function () { h += 0x6D2B79F5; var t = h; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  function shuffle(arr, key) {
    var r = seeded(key), a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function codeBlock(code) {
    var h = window.Alg2 ? window.Alg2.highlight(code) : esc(code);
    return '<pre><code data-hl="1">' + h + '</code></pre>';
  }
  var LETRAS = 'abcdefgh';
  var NOMES = { mc: 'Múltipla escolha', fix: 'Corrigir código', drag: 'Encaixar trechos' };

  function versions(ex) {
    if (ex._vs) return ex._vs;
    var vs = ex.make ? ex.p.map(function (p, i) { return ex.make(p, i); }) : ex.v;
    var alt = ex.alt || (window.ALT && window.ALT[ex.id]);  // V2 e V3 escritos à mão (data/aN.js, bloco ALT)
    if (alt) vs = vs.map(function (v, i) { return i > 0 && alt[i - 1] ? alt[i - 1] : v; });  // null = mantém a versão original
    ex._vs = vs;
    return ex._vs;
  }

  /* ---------- Cartão ---------- */
  function card(ex) {
    var el = document.createElement('article');
    el.className = 'ex' + (ex.wide ? ' wide' : '');
    el.id = 'ex-' + ex.id;
    var vs = versions(ex), r = rec(ex.id);
    if (r.v >= vs.length) r.v = 0;
    var head = '<div class="ex-top"><div><h4>' + txt(ex.title) + '</h4><span class="ref"><span class="tipo">' + NOMES[ex.type] + '</span> · ' + txt(ex.ref) + '</span></div>' +
      '<div class="vers" role="group" aria-label="Versões do exercício">' +
      vs.map(function (_, i) { return '<button type="button" data-v="' + i + '" aria-label="Versão ' + (i + 1) + '">V' + (i + 1) + '</button>'; }).join('') +
      '</div></div><div class="ex-body"></div>';
    el.innerHTML = head;
    el.querySelectorAll('.vers button').forEach(function (b) {
      b.addEventListener('click', function () { r.v = +b.getAttribute('data-v'); save(); render(ex, el); });
    });
    render(ex, el);
    return el;
  }
  function paintVers(ex, el) {
    var r = rec(ex.id);
    el.querySelectorAll('.vers button').forEach(function (b) {
      var i = b.getAttribute('data-v');
      b.setAttribute('aria-pressed', String(+i === r.v));
      b.classList.toggle('feito', r.r[i] === 'ok');
      b.classList.toggle('errou', r.r[i] === 'err');
      b.title = r.r[i] === 'ok' ? 'Versão ' + (+i + 1) + ': acertou' : r.r[i] === 'err' ? 'Versão ' + (+i + 1) + ': errou na última tentativa' : 'Versão ' + (+i + 1);
    });
  }
  function result(ex, el, ok) {
    var r = rec(ex.id); r.r[r.v] = ok ? 'ok' : 'err'; save(); paintVers(ex, el); placar();
  }
  function render(ex, el) {
    paintVers(ex, el);
    var v = versions(ex)[rec(ex.id).v];
    var body = el.querySelector('.ex-body');
    body.innerHTML = '';
    var q = document.createElement('div'); q.className = 'ex-q';
    q.innerHTML = rich(v.q) + (v.code && ex.type === 'mc' ? codeBlock(v.code) : '');
    body.appendChild(q);
    if (ex.type === 'mc') mc(ex, el, v, body);
    else if (ex.type === 'fix') fix(ex, el, v, body);
    else if (ex.type === 'drag') drag(ex, el, v, body);
    if (window.Alg2) window.Alg2.diagrams(body);
  }
  function feedback(body, ok, html) {
    var fb = body.querySelector('.fb');
    if (!fb) { fb = document.createElement('div'); fb.setAttribute('aria-live', 'polite'); body.appendChild(fb); }
    fb.className = 'fb show ' + (ok ? 'ok' : 'err');
    fb.innerHTML = '<b>' + (ok ? 'Certo.' : 'Ainda não.') + '</b>' + html;
    return fb;
  }
  function actions(body, label, fn) {
    var row = body.querySelector('.ex-actions');
    if (!row) { row = document.createElement('div'); row.className = 'ex-actions'; body.appendChild(row); }
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'linkbtn'; b.textContent = label;
    b.addEventListener('click', fn);
    row.appendChild(b);
    return b;
  }
  function nextVersionLink(ex, el, body) {
    var r = rec(ex.id), n = versions(ex).length;
    var falta = [];
    for (var i = 0; i < n; i++) if (r.r[i] !== 'ok' && i !== r.v) falta.push(i);
    if (falta.length) actions(body, 'Ir para a versão ' + (falta[0] + 1), function () { r.v = falta[0]; save(); render(ex, el); el.querySelector('.vers button[data-v="' + falta[0] + '"]').focus(); });
  }

  /* ---------- Múltipla escolha ---------- */
  function mc(ex, el, v, body) {
    var opts = v.opts.map(function (o, i) { return { t: o[0], why: o[1] || '', ok: i === (v.ok || 0) }; });
    if (!v.fixa) opts = shuffle(opts, ex.id + ':' + rec(ex.id).v);
    var ul = document.createElement('ul'); ul.className = 'opts';
    opts.forEach(function (o, i) {
      var li = document.createElement('li');
      li.innerHTML = '<button type="button" class="opt"><span class="lt">' + LETRAS[i] + '</span><span class="tx">' + txt(o.t) + '</span></button>';
      var b = li.firstChild;
      b.addEventListener('click', function () {
        ul.querySelectorAll('.opt').forEach(function (x) { x.disabled = true; });
        var good = opts.filter(function (x) { return x.ok; })[0];
        var goodBtn = ul.children[opts.indexOf(good)].firstChild;
        goodBtn.classList.add('certa');
        if (!o.ok) b.classList.add('errada');
        if (o.why) b.querySelector('.tx').insertAdjacentHTML('beforeend', '<span class="why">' + txt(o.why) + '</span>');
        if (!o.ok && good.why) goodBtn.querySelector('.tx').insertAdjacentHTML('beforeend', '<span class="why">' + txt(good.why) + '</span>');
        feedback(body, o.ok, v.why ? '<p>' + rich(v.why) + '</p>' : '');
        result(ex, el, o.ok);
        actions(body, 'Tentar de novo', function () { render(ex, el); });
        nextVersionLink(ex, el, body);
      });
      ul.appendChild(li);
    });
    body.appendChild(ul);
  }

  /* ---------- Corrigir código ---------- */
  function fix(ex, el, v, body) {
    var lines = v.code.split('\n');
    var errou = false;
    var p1 = document.createElement('p'); p1.className = 'passo'; p1.textContent = 'Passo 1: clique na linha que tem o erro.';
    body.appendChild(p1);
    var box = document.createElement('pre'); box.className = 'code-lines'; box.setAttribute('role', 'group'); box.setAttribute('aria-label', 'Linhas do código');
    lines.forEach(function (ln, i) {
      var b = document.createElement('button'); b.type = 'button';
      b.innerHTML = '<span class="n">' + (i + 1) + '</span><span>' + (window.Alg2 ? window.Alg2.highlight(ln) : esc(ln)) + ' </span>';
      b.setAttribute('aria-label', 'Linha ' + (i + 1) + ': ' + ln.trim());
      b.addEventListener('click', function () {
        if (i + 1 === v.line) {
          box.querySelectorAll('button').forEach(function (x) { x.disabled = true; x.classList.remove('errada'); });
          b.classList.add('achou');
          var fb = body.querySelector('.fb'); if (fb) fb.remove();
          stage2();
        } else {
          errou = true;
          b.classList.add('errada');
          feedback(body, false, '<p>A linha ' + (i + 1) + ' está correta. ' + (v.dica ? rich(v.dica) : 'Leia de novo as linhas onde há ponteiros, índices e tipos.') + '</p>');
        }
      });
      box.appendChild(b);
    });
    body.appendChild(box);
    function stage2() {
      var p2 = document.createElement('p'); p2.className = 'passo'; p2.textContent = 'Passo 2: escolha como a linha ' + v.line + ' deve ficar.';
      body.appendChild(p2);
      var opts = v.fixes.map(function (o, i) { return { t: o[0], why: o[1] || '', ok: i === 0 }; });
      opts = shuffle(opts, ex.id + ':fx:' + rec(ex.id).v);
      var ul = document.createElement('ul'); ul.className = 'opts';
      opts.forEach(function (o, i) {
        var li = document.createElement('li');
        li.innerHTML = '<button type="button" class="opt"><span class="lt">' + LETRAS[i] + '</span><span class="tx"><code>' + esc(o.t.trim()) + '</code></span></button>';
        var b = li.firstChild;
        b.addEventListener('click', function () {
          ul.querySelectorAll('.opt').forEach(function (x) { x.disabled = true; });
          var good = opts.filter(function (x) { return x.ok; })[0], gb = ul.children[opts.indexOf(good)].firstChild;
          gb.classList.add('certa'); if (!o.ok) b.classList.add('errada');
          if (o.why) b.querySelector('.tx').insertAdjacentHTML('beforeend', '<span class="why">' + txt(o.why) + '</span>');
          if (!o.ok && good.why) gb.querySelector('.tx').insertAdjacentHTML('beforeend', '<span class="why">' + txt(good.why) + '</span>');
          var ok = o.ok && !errou;
          feedback(body, o.ok, (v.why ? '<p>' + rich(v.why) + '</p>' : '') + (o.ok && errou ? '<p>Correção certa, mas a linha só foi achada depois de uma tentativa errada; esta versão fica marcada para revisar.</p>' : ''));
          result(ex, el, ok);
          actions(body, 'Tentar de novo', function () { render(ex, el); });
          nextVersionLink(ex, el, body);
        });
        ul.appendChild(li);
      });
      body.appendChild(ul);
      ul.querySelector('.opt').focus({ preventScroll: true });
    }
  }

  /* ---------- Arrastar trechos ---------- */
  // Separa o código nas lacunas [[resposta]]: devolve [texto, resposta, texto, resposta, ..., texto].
  // A resposta pode ter colchetes balanceados (v[i], m[a][b]); numa sequência de colchetes, os dois últimos
  // do abre e os dois primeiros do fecha são o marcador: aux[[[k++]]] = lacuna "k++" dentro de aux[ ].
  function splitSlots(code) {
    var out = [], buf = '', i = 0, n = code.length;
    while (i < n) {
      if (code[i] === '[' && code[i + 1] === '[') {
        var r = 0; while (code[i + r] === '[') r++;
        var j = i + r, d = 0, end = -1;
        for (; j < n; j++) {
          var c = code[j];
          if (c === '[') d++;
          else if (c === ']') { if (d === 0 && code[j + 1] === ']') { end = j; break; } d--; }
        }
        if (end < 0) { buf += code[i++]; continue; }
        out.push(buf + code.slice(i, i + r - 2)); out.push(code.slice(i + r, end)); buf = ''; i = end + 2;
      } else buf += code[i++];
    }
    out.push(buf);
    return out;
  }

  function drag(ex, el, v, body) {
    var parts = splitSlots(v.code);
    var answers = [];
    for (var k = 1; k < parts.length; k += 2) answers.push(parts[k]);
    var chips = answers.map(function (a) { return { t: a, why: '' }; }).concat((v.extra || []).map(function (e) { return { t: e[0], why: e[1] || '' }; }));
    chips = shuffle(chips, ex.id + ':dr:' + rec(ex.id).v);
    var placed = answers.map(function () { return null; });
    var sel = null, checked = false;

    var code = document.createElement('pre'); code.className = 'drag-code';
    var html = '';
    parts.forEach(function (p, i) {
      if (i % 2 === 0) html += window.Alg2 ? window.Alg2.highlight(p) : esc(p);
      else { var n = (i - 1) / 2; html += '<button type="button" class="slot" data-s="' + n + '" aria-label="Lacuna ' + (n + 1) + ', vazia"><code class="idx">' + (n + 1) + '</code></button>'; }
    });
    code.innerHTML = html;
    var tit = document.createElement('p'); tit.className = 'banco-tit'; tit.textContent = 'Blocos (arraste até a lacuna, ou toque no bloco e depois na lacuna)';
    var bank = document.createElement('div'); bank.className = 'banco';
    chips.forEach(function (c, i) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.innerHTML = '<code></code>'; b.firstChild.textContent = c.t; b.setAttribute('data-c', i);
      bank.appendChild(b);
    });
    body.appendChild(code); body.appendChild(tit); body.appendChild(bank);
    var slots = code.querySelectorAll('.slot');

    function paint() {
      slots.forEach(function (s, n) {
        var c = placed[n];
        s.classList.toggle('cheio', c !== null);
        s.innerHTML = c === null ? '<code class="idx">' + (n + 1) + '</code>' : '<code>' + esc(chips[c].t) + '</code>';
        s.setAttribute('aria-label', 'Lacuna ' + (n + 1) + (c === null ? ', vazia' : ', contém ' + chips[c].t));
      });
      bank.querySelectorAll('.chip').forEach(function (b, i) {
        b.classList.toggle('usado', placed.indexOf(i) >= 0);
        b.classList.toggle('sel', sel === i);
        b.setAttribute('aria-pressed', String(sel === i));
      });
      check.disabled = placed.indexOf(null) >= 0;
    }
    function put(ci, n) {
      if (checked) clearMarks();
      var old = placed.indexOf(ci); if (old >= 0) placed[old] = null;
      placed[n] = ci; sel = null; paint();
    }
    function clearMarks() { checked = false; slots.forEach(function (s) { s.classList.remove('ok', 'no'); }); var fb = body.querySelector('.fb'); if (fb) fb.remove(); }

    var dragging = null, justDragged = false;
    bank.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      if (justDragged) { justDragged = false; return; }
      var i = +b.getAttribute('data-c'); sel = sel === i ? null : i; paint();
    });
    code.addEventListener('click', function (e) {
      var s = e.target.closest('.slot'); if (!s) return;
      var n = +s.getAttribute('data-s');
      if (sel !== null) put(sel, n);
      else if (placed[n] !== null) { if (checked) clearMarks(); placed[n] = null; paint(); }
    });
    bank.addEventListener('pointerdown', function (e) {
      var b = e.target.closest('.chip'); if (!b || (e.pointerType === 'mouse' && e.button !== 0)) return;
      dragging = { b: b, i: +b.getAttribute('data-c'), x: e.clientX, y: e.clientY, on: false, id: e.pointerId };
    });
    document.addEventListener('pointermove', function (e) {
      if (!dragging || e.pointerId !== dragging.id) return;
      if (!dragging.on) {
        if (Math.abs(e.clientX - dragging.x) + Math.abs(e.clientY - dragging.y) < 8) return;
        dragging.on = true;
        var g = dragging.b.cloneNode(true); g.classList.add('ghost'); g.classList.remove('sel'); document.body.appendChild(g); dragging.g = g;
        dragging.b.style.opacity = '0.35';
      }
      e.preventDefault();
      dragging.g.style.left = (e.clientX - dragging.g.offsetWidth / 2) + 'px';
      dragging.g.style.top = (e.clientY - dragging.g.offsetHeight / 2) + 'px';
      slots.forEach(function (s) { s.classList.remove('alvo'); });
      var over = document.elementFromPoint(e.clientX, e.clientY);
      var s = over && over.closest('.slot'); if (s && code.contains(s)) s.classList.add('alvo');
    }, { passive: false });
    function endDrag(e) {
      if (!dragging || e.pointerId !== dragging.id) return;
      var d = dragging; dragging = null;
      if (!d.on) return;
      justDragged = true; setTimeout(function () { justDragged = false; }, 50);
      d.g.remove(); d.b.style.opacity = '';
      slots.forEach(function (s) { s.classList.remove('alvo'); });
      var over = document.elementFromPoint(e.clientX, e.clientY);
      var s = over && over.closest('.slot');
      if (s && code.contains(s)) put(d.i, +s.getAttribute('data-s'));
    }
    document.addEventListener('pointerup', endDrag);
    document.addEventListener('pointercancel', function (e) { if (dragging && dragging.g) { dragging.g.remove(); dragging.b.style.opacity = ''; } dragging = null; });

    var row = document.createElement('div'); row.className = 'ex-actions';
    var check = document.createElement('button'); check.type = 'button'; check.className = 'btn small';
    check.innerHTML = '<span>Conferir</span><span><i class="arrow"></i></span>';
    row.appendChild(check); body.appendChild(row);
    var hint = document.createElement('p'); hint.className = 'dica'; hint.textContent = 'O botão libera quando todas as lacunas estiverem preenchidas. Toque numa lacuna cheia para devolver o bloco.';
    body.appendChild(hint);
    check.addEventListener('click', function () {
      checked = true;
      var erros = [];
      slots.forEach(function (s, n) {
        var c = chips[placed[n]], ok = c && c.t === answers[n];
        s.classList.toggle('ok', !!ok); s.classList.toggle('no', !ok);
        if (!ok) {
          var why = c.why || (answers.indexOf(c.t) >= 0 ? 'Esse bloco é de outra lacuna.' : '');
          erros.push('<li>Lacuna ' + (n + 1) + ': <code>' + esc(c.t) + '</code>' + (why ? ' — ' + txt(why) : '') + '</li>');
        }
      });
      var ok = !erros.length;
      var fb = feedback(body, ok, ok ? (v.why ? '<p>' + rich(v.why) + '</p>' : '') : '<ul>' + erros.join('') + '</ul><p>Troque os blocos marcados e confira de novo.</p>');
      result(ex, el, ok);
      if (ok) {
        var a = body.querySelector('.ex-actions');
        a.querySelectorAll('.linkbtn').forEach(function (x) { x.remove(); });
        actions(body, 'Refazer', function () { render(ex, el); });
        nextVersionLink(ex, el, body);
        body.appendChild(fb);
      }
    });
    paint();
  }

  /* ---------- Placar da aula ---------- */
  var ALL = [];
  function placar() {
    var box = document.querySelector('.placar'); if (!box) return;
    var total = 0, ok = 0, err = 0;
    ALL.forEach(function (ex) {
      var n = versions(ex).length, r = rec(ex.id).r; total += n;
      for (var i = 0; i < n; i++) { if (r[i] === 'ok') ok++; else if (r[i] === 'err') err++; }
    });
    box.querySelector('[data-k="ok"]').textContent = ok;
    box.querySelector('[data-k="err"]').textContent = err;
    box.querySelector('[data-k="tot"]').textContent = total;
  }

  function init() {
    var page = document.body.getAttribute('data-aula');
    var list = (window.EXS && window.EXS[page]) || [];
    ALL = list;
    var groups = {};
    document.querySelectorAll('.ex-group[data-topic]').forEach(function (g) { groups[g.getAttribute('data-topic')] = g.querySelector('.ex-list'); });
    var lastList = document.querySelector('.ex-group:last-of-type .ex-list');
    list.forEach(function (ex) {
      var target = groups[ex.topic] || lastList;
      if (target) target.appendChild(card(ex));
    });
    var z = document.querySelector('.placar .zerar');
    if (z) z.addEventListener('click', function () {
      list.forEach(function (ex) { delete store[ex.id]; });
      save();
      list.forEach(function (ex) { var el = document.getElementById('ex-' + ex.id); if (el) render(ex, el); });
      placar();
    });
    placar();
    if (location.hash && document.querySelector(location.hash)) document.querySelector(location.hash).scrollIntoView();
  }
  window.Quiz = { versions: versions, splitSlots: splitSlots };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
