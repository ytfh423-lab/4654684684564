(function () {
  var TEXT = "吃饱了才有力气干活";
  function setSayhi() {
    var el = document.getElementById("author-info__sayhi");
    if (el) el.textContent = TEXT;
  }
  document.addEventListener("DOMContentLoaded", function () {
    setSayhi();
    setTimeout(setSayhi, 400);
  });
  document.addEventListener("pjax:complete", setSayhi);
})();
