/* Sinefil — TR / EN / DE dil değiştirici.
   Mekanizma: her çevrilebilir metin, kardeş öğeler halinde
   data-lang="tr|en|de" ile işaretlenir; seçili dilinki gösterilir. */
(function () {
  var KEY = "sinefil-lang";
  var LANGS = ["tr", "en", "de"];

  function apply(lang) {
    if (LANGS.indexOf(lang) === -1) lang = "tr";
    document.documentElement.setAttribute("lang", lang);

    var nodes = document.querySelectorAll("[data-lang]");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].hidden = nodes[i].getAttribute("data-lang") !== lang;
    }
    var btns = document.querySelectorAll("[data-set-lang]");
    for (var j = 0; j < btns.length; j++) {
      btns[j].classList.toggle(
        "is-active",
        btns[j].getAttribute("data-set-lang") === lang
      );
    }
    try { localStorage.setItem(KEY, lang); } catch (e) {}

    // Diğer bileşenler (ör. ses düğmesi) haberdar olsun
    document.dispatchEvent(
      new CustomEvent("sinefil:langchange", { detail: lang })
    );
  }

  function init() {
    var saved = "tr";
    try { saved = localStorage.getItem(KEY) || "tr"; } catch (e) {}

    var btns = document.querySelectorAll("[data-set-lang]");
    for (var i = 0; i < btns.length; i++) {
      (function (btn) {
        btn.addEventListener("click", function () {
          apply(btn.getAttribute("data-set-lang"));
        });
      })(btns[i]);
    }
    apply(saved);
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
