(function () {
  var STORAGE_KEY = "so-p1-quiz-v1";
  var HISTORY_KEY = "so-p1-historico-v1";

  var state = null; // { order: [ids], idx, answers: {id: letra}, finished, attemptId, embaralhado }
  var reviewBack = null; // função de retorno da tela de revisão
  var historyReturn = "start"; // de onde o histórico foi aberto

  var $ = function (id) { return document.getElementById(id); };

  var screens = {
    start: $("start-screen"),
    quiz: $("quiz-screen"),
    results: $("results-screen"),
    history: $("history-screen"),
    attempt: $("attempt-screen"),
    review: $("review-screen")
  };

  function show(name) {
    Object.keys(screens).forEach(function (k) {
      screens[k].classList.toggle("hidden", k !== name);
    });
  }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var s = JSON.parse(raw);
      if (!s || !Array.isArray(s.order) || typeof s.answers !== "object") return null;
      return s;
    } catch (e) { return null; }
  }

  function clearState() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    state = null;
  }

  function loadHistory() {
    try {
      var raw = localStorage.getItem(HISTORY_KEY);
      if (!raw) return [];
      var h = JSON.parse(raw);
      return Array.isArray(h) ? h : [];
    } catch (e) { return []; }
  }

  function saveHistory(h) {
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(h)); } catch (e) {}
  }

  function countHits(order, answers) {
    var hits = 0;
    order.forEach(function (id) {
      var q = byId(id);
      if (q && answers[id] === q.correta) hits++;
    });
    return hits;
  }

  function recordAttempt() {
    if (!state) return;
    if (!state.attemptId) {
      state.attemptId = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    }
    var hist = loadHistory();
    for (var i = 0; i < hist.length; i++) {
      if (hist[i].id === state.attemptId) return; // já registrada
    }
    hist.push({
      id: state.attemptId,
      data: new Date().toISOString(),
      acertos: countHits(state.order, state.answers),
      total: state.order.length,
      embaralhado: !!state.embaralhado,
      ordem: state.order.slice(),
      respostas: Object.assign({}, state.answers)
    });
    saveHistory(hist);
  }

  function byId(id) {
    for (var i = 0; i < QUESTIONS.length; i++) {
      if (QUESTIONS[i].id === id) return QUESTIONS[i];
    }
    return null;
  }

  function shuffled(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function startQuiz(shuffle) {
    var ids = QUESTIONS.map(function (q) { return q.id; });
    state = {
      order: shuffle ? shuffled(ids) : ids,
      idx: 0,
      answers: {},
      finished: false,
      attemptId: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      embaralhado: !!shuffle
    };
    save();
    show("quiz");
    renderQuestion();
  }

  function currentQuestion() {
    return byId(state.order[state.idx]);
  }

  function renderQuestion() {
    var q = currentQuestion();
    var answered = state.answers.hasOwnProperty(q.id);

    $("progress-label").textContent = "Questão " + (state.idx + 1) + " de " + state.order.length;
    $("progress-fill").style.width = ((state.idx) / state.order.length * 100) + "%";

    var hintBox = $("hint-box");
    hintBox.innerHTML = q.dica;
    hintBox.classList.add("hidden");

    $("enunciado").innerHTML = q.enunciado;

    var fig = $("figura");
    if (q.figura) {
      fig.src = q.figura;
      fig.classList.remove("hidden");
    } else {
      fig.classList.add("hidden");
      fig.removeAttribute("src");
    }

    var container = $("alternativas");
    container.innerHTML = "";
    q.alternativas.forEach(function (alt) {
      var div = document.createElement("div");
      div.className = "alt";
      div.dataset.letra = alt.letra;
      var letraEl = document.createElement("span");
      letraEl.className = "letra";
      letraEl.textContent = alt.letra === "Certo" || alt.letra === "Errado" ? alt.letra : alt.letra + ")";
      var textoEl = document.createElement("span");
      textoEl.innerHTML = alt.texto;
      div.appendChild(letraEl);
      div.appendChild(textoEl);
      if (!answered) {
        div.addEventListener("click", function () {
          container.querySelectorAll(".alt").forEach(function (el) { el.classList.remove("selected"); });
          div.classList.add("selected");
          $("btn-answer").disabled = false;
        });
      }
      container.appendChild(div);
    });

    $("feedback").classList.add("hidden");
    $("resumo-box").classList.add("hidden");
    $("explicacao-box").classList.add("hidden");
    $("btn-next").classList.add("hidden");
    $("btn-answer").classList.remove("hidden");
    $("btn-answer").disabled = true;

    if (answered) {
      lockAndReveal(q, state.answers[q.id]);
    }
  }

  function lockAndReveal(q, picked) {
    var container = $("alternativas");
    container.querySelectorAll(".alt").forEach(function (el) {
      el.classList.add("locked");
      if (el.dataset.letra === q.correta) el.classList.add("correct");
      else if (el.dataset.letra === picked) el.classList.add("wrong");
    });

    var fb = $("feedback");
    var correct = picked === q.correta;
    fb.textContent = correct
      ? "Acertou!"
      : "Errou — resposta correta: " + q.correta;
    fb.className = correct ? "ok" : "err";

    $("resumo-box").innerHTML = q.resumo;
    $("resumo-box").classList.remove("hidden");
    $("explicacao-box").innerHTML = q.explicacao;
    $("explicacao-box").classList.remove("hidden");

    $("btn-answer").classList.add("hidden");
    var nextBtn = $("btn-next");
    nextBtn.textContent = state.idx === state.order.length - 1 ? "Ver resultados" : "Próxima";
    nextBtn.classList.remove("hidden");
    $("progress-fill").style.width = ((state.idx + 1) / state.order.length * 100) + "%";
  }

  function answer() {
    var q = currentQuestion();
    var sel = document.querySelector("#alternativas .alt.selected");
    if (!sel) return;
    state.answers[q.id] = sel.dataset.letra;
    save();
    lockAndReveal(q, sel.dataset.letra);
  }

  function next() {
    if (state.idx === state.order.length - 1) {
      state.finished = true;
      recordAttempt();
      save();
      showResults();
    } else {
      state.idx++;
      save();
      renderQuestion();
    }
  }

  function showResults() {
    var total = state.order.length;
    var hits = 0;
    state.order.forEach(function (id) {
      var q = byId(id);
      if (state.answers[id] === q.correta) hits++;
    });
    var pct = Math.round(hits / total * 100);
    $("score-line").textContent = "Você acertou " + hits + " de " + total + " (" + pct + "%)";

    var list = $("review-list");
    list.innerHTML = "";
    state.order.forEach(function (id, pos) {
      var q = byId(id);
      var ok = state.answers[id] === q.correta;
      var li = document.createElement("li");
      var mark = document.createElement("span");
      mark.className = "mark " + (ok ? "ok" : "err");
      mark.textContent = ok ? "✓" : "✗";
      var label = document.createElement("span");
      label.textContent = "Questão " + q.id;
      var detail = document.createElement("span");
      detail.className = "detail";
      var yours = state.answers[id] || "—";
      detail.textContent = "sua: " + yours + " · correta: " + q.correta;
      li.appendChild(mark);
      li.appendChild(label);
      li.appendChild(detail);
      li.addEventListener("click", function () {
        openReview(state.order, pos, state.answers, showResults);
      });
      list.appendChild(li);
    });
    show("results");
  }

  function fmtDate(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return iso;
    var p = function (n) { return String(n).padStart(2, "0"); };
    return p(d.getDate()) + "/" + p(d.getMonth() + 1) + "/" + d.getFullYear() +
           " " + p(d.getHours()) + ":" + p(d.getMinutes());
  }

  function showHistory(returnTo) {
    historyReturn = returnTo || "start";
    var hist = loadHistory();

    var empty = $("history-empty");
    var content = $("history-content");
    if (hist.length === 0) {
      empty.classList.remove("hidden");
      content.classList.add("hidden");
      show("history");
      return;
    }
    empty.classList.add("hidden");
    content.classList.remove("hidden");

    // Resumo
    var total = hist.length;
    var best = 0, bestTotal = 0, sumPct = 0;
    hist.forEach(function (a) {
      if (a.acertos > best) { best = a.acertos; bestTotal = a.total; }
      sumPct += a.acertos / a.total;
    });
    var last = hist[hist.length - 1];
    var pct = function (a) { return Math.round(a.acertos / a.total * 100); };
    $("history-summary").innerHTML =
      '<div class="stat"><div class="value">' + total + '</div><div class="label">tentativas</div></div>' +
      '<div class="stat"><div class="value">' + best + "/" + bestTotal + '</div><div class="label">melhor resultado</div></div>' +
      '<div class="stat"><div class="value">' + Math.round(sumPct / total * 100) + '%</div><div class="label">média</div></div>' +
      '<div class="stat"><div class="value">' + last.acertos + "/" + last.total + ' (' + pct(last) + '%)</div><div class="label">última tentativa</div></div>';

    // Lista de tentativas (mais recente primeiro)
    var list = $("history-list");
    list.innerHTML = "";
    for (var i = hist.length - 1; i >= 0; i--) {
      (function (idx) {
        var a = hist[idx];
        var li = document.createElement("li");
        var mark = document.createElement("span");
        mark.className = "mark ok";
        mark.textContent = "●";
        var label = document.createElement("span");
        label.textContent = "Tentativa " + (idx + 1) + " — " + fmtDate(a.data) +
          " — " + a.acertos + "/" + a.total + " (" + pct(a) + "%)" +
          (a.embaralhado ? " (embaralhada)" : "");
        li.appendChild(mark);
        li.appendChild(label);
        li.addEventListener("click", function () { showAttempt(idx); });
        list.appendChild(li);
      })(i);
    }

    // Questões mais erradas
    var stats = {}; // qid -> {err, seen}
    hist.forEach(function (a) {
      (a.ordem || []).forEach(function (id) {
        var q = byId(id);
        if (!q) return;
        if (!stats[id]) stats[id] = { err: 0, seen: 0 };
        stats[id].seen++;
        if (a.respostas[id] !== q.correta) stats[id].err++;
      });
    });
    var worst = Object.keys(stats)
      .filter(function (id) { return stats[id].err > 0; })
      .map(function (id) { return { id: Number(id), err: stats[id].err, seen: stats[id].seen }; })
      .sort(function (x, y) { return y.err - x.err || x.id - y.id; });

    var worstList = $("history-worst");
    worstList.innerHTML = "";
    $("history-worst-empty").classList.toggle("hidden", worst.length > 0);
    worst.forEach(function (w) {
      var li = document.createElement("li");
      var mark = document.createElement("span");
      mark.className = "mark err";
      mark.textContent = "✗";
      var label = document.createElement("span");
      label.textContent = "Questão " + w.id;
      var detail = document.createElement("span");
      detail.className = "detail";
      detail.textContent = "errou " + w.err + " de " + w.seen + (w.seen === 1 ? " vez" : " vezes");
      li.appendChild(mark);
      li.appendChild(label);
      li.appendChild(detail);
      li.addEventListener("click", function () {
        // abre a revisão com a tentativa mais recente que contém a questão
        var histNow = loadHistory();
        for (var k = histNow.length - 1; k >= 0; k--) {
          var pos = (histNow[k].ordem || []).indexOf(w.id);
          if (pos !== -1) {
            openReview(histNow[k].ordem, pos, histNow[k].respostas, function () {
              showHistory(historyReturn);
            });
            return;
          }
        }
      });
      worstList.appendChild(li);
    });

    show("history");
  }

  function showAttempt(idx) {
    var hist = loadHistory();
    var a = hist[idx];
    if (!a) { showHistory(historyReturn); return; }
    var pct = Math.round(a.acertos / a.total * 100);
    $("attempt-title").textContent = "Tentativa " + (idx + 1) + " — " + fmtDate(a.data) +
      " — " + a.acertos + "/" + a.total + " (" + pct + "%)" +
      (a.embaralhado ? " (embaralhada)" : "");

    var list = $("attempt-list");
    list.innerHTML = "";
    (a.ordem || []).forEach(function (id, pos) {
      var q = byId(id);
      if (!q) return;
      var ok = a.respostas[id] === q.correta;
      var li = document.createElement("li");
      var mark = document.createElement("span");
      mark.className = "mark " + (ok ? "ok" : "err");
      mark.textContent = ok ? "✓" : "✗";
      var label = document.createElement("span");
      label.textContent = "Questão " + q.id;
      var detail = document.createElement("span");
      detail.className = "detail";
      detail.textContent = "sua: " + (a.respostas[id] || "—") + " · correta: " + q.correta;
      li.appendChild(mark);
      li.appendChild(label);
      li.appendChild(detail);
      li.addEventListener("click", function () {
        openReview(a.ordem, pos, a.respostas, function () { showAttempt(idx); });
      });
      list.appendChild(li);
    });
    show("attempt");
  }

  function openReview(order, pos, answers, backFn) {
    var q = byId(order[pos]);
    if (!q) return;
    reviewBack = backFn || showResults;
    $("review-title").textContent = "Questão " + q.id + " (posição " + (pos + 1) + " de " + order.length + ")";
    var body = $("review-body");
    body.innerHTML = "";

    var en = document.createElement("div");
    en.className = "enunciado";
    en.innerHTML = q.enunciado;
    body.appendChild(en);

    if (q.figura) {
      var img = document.createElement("img");
      img.className = "figura";
      img.src = q.figura;
      img.alt = "Figura da questão";
      body.appendChild(img);
    }

    var container = document.createElement("div");
    container.id = "alternativas";
    q.alternativas.forEach(function (alt) {
      var div = document.createElement("div");
      div.className = "alt locked";
      if (alt.letra === q.correta) div.classList.add("correct");
      else if (alt.letra === answers[q.id]) div.classList.add("wrong");
      var letraEl = document.createElement("span");
      letraEl.className = "letra";
      letraEl.textContent = alt.letra === "Certo" || alt.letra === "Errado" ? alt.letra : alt.letra + ")";
      var textoEl = document.createElement("span");
      textoEl.innerHTML = alt.texto;
      div.appendChild(letraEl);
      div.appendChild(textoEl);
      container.appendChild(div);
    });
    body.appendChild(container);

    var fb = document.createElement("div");
    var ok = answers[q.id] === q.correta;
    fb.id = "feedback";
    fb.className = ok ? "ok" : "err";
    fb.textContent = ok ? "Acertou!" : "Errou — resposta correta: " + q.correta;
    body.appendChild(fb);

    var res = document.createElement("div");
    res.className = "resumo-box";
    res.innerHTML = q.resumo;
    body.appendChild(res);

    var exp = document.createElement("div");
    exp.className = "explicacao-box";
    exp.innerHTML = q.explicacao;
    body.appendChild(exp);

    show("review");
  }

  // Eventos
  $("btn-start").addEventListener("click", function () {
    startQuiz($("shuffle-check").checked);
  });
  $("btn-hint").addEventListener("click", function () {
    $("hint-box").classList.toggle("hidden");
  });
  $("btn-answer").addEventListener("click", answer);
  $("btn-next").addEventListener("click", next);
  $("btn-restart").addEventListener("click", function () {
    clearState();
    $("shuffle-check").checked = false;
    show("start");
  });
  $("btn-back").addEventListener("click", function () {
    if (reviewBack) reviewBack(); else showResults();
  });
  $("btn-history-start").addEventListener("click", function () {
    showHistory("start");
  });
  $("btn-history-results").addEventListener("click", function () {
    showHistory("results");
  });
  $("btn-history-back").addEventListener("click", function () {
    if (historyReturn === "results" && state && state.finished) showResults();
    else show("start");
  });
  $("btn-attempt-back").addEventListener("click", function () {
    showHistory(historyReturn);
  });
  $("btn-clear-history").addEventListener("click", function () {
    if (confirm("Apagar todo o histórico de tentativas?")) {
      try { localStorage.removeItem(HISTORY_KEY); } catch (e) {}
      showHistory(historyReturn);
    }
  });

  // Init
  $("q-count").textContent = QUESTIONS.length;
  var saved = load();
  if (saved) {
    state = saved;
    if (state.finished) {
      showResults();
    } else {
      show("quiz");
      renderQuestion();
    }
  } else {
    show("start");
  }
})();
