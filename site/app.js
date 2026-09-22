(function () {
  var STORAGE_KEY = "so-p1-quiz-v1";

  var state = null; // { order: [ids], idx, answers: {id: letra}, finished }

  var $ = function (id) { return document.getElementById(id); };

  var screens = {
    start: $("start-screen"),
    quiz: $("quiz-screen"),
    results: $("results-screen"),
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
      finished: false
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
      li.addEventListener("click", function () { showReview(pos); });
      list.appendChild(li);
    });
    show("results");
  }

  function showReview(pos) {
    var q = byId(state.order[pos]);
    $("review-title").textContent = "Questão " + q.id + " (posição " + (pos + 1) + " de " + state.order.length + ")";
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
      else if (alt.letra === state.answers[q.id]) div.classList.add("wrong");
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
    var ok = state.answers[q.id] === q.correta;
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
    showResults();
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
