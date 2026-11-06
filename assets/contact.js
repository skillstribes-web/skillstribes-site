// Contact block for the home and HVAC pages.
// The form builds a ready WhatsApp or email message; nothing is sent from the page itself.
(function () {
  var CONTACT = [
    { label: "WhatsApp", value: "+92 333 8318082" },
    { label: "Email", value: "info@skillstribes.com" }
  ];

  var reach = document.getElementById("reach");
  if (reach) {
    CONTACT.forEach(function (c) {
      var row = document.createElement("div");
      row.className = "reach-row";
      var left = document.createElement("div");
      var small = document.createElement("small");
      small.textContent = c.label;
      var val = document.createElement("span");
      val.className = "val";
      val.textContent = c.value;
      left.appendChild(small);
      left.appendChild(val);
      row.appendChild(left);
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy";
      btn.textContent = "Copy";
      btn.addEventListener("click", function () {
        function select() {
          var r = document.createRange(); r.selectNodeContents(val);
          var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        }
        try {
          navigator.clipboard.writeText(c.value).then(function () {
            btn.textContent = "Copied";
            setTimeout(function () { btn.textContent = "Copy"; }, 1500);
          }, select);
        } catch (e) { select(); }
      });
      row.appendChild(btn);
      reach.appendChild(row);
    });
  }

  var form = document.getElementById("wa-form");
  if (!form) { return; }
  var wa = CONTACT[0].value.replace(/\D/g, "");
  var mail = CONTACT[1].value;
  var goWa = document.getElementById("wa-go");
  var goMail = document.getElementById("mail-go");
  var fab = document.getElementById("wa-fab");
  var intro = form.getAttribute("data-intro") || "Hello SkillsTribes.";
  var subject = form.getAttribute("data-subject") || "Enquiry";

  function compose() {
    var f = new FormData(form);
    var msg = intro;
    Array.prototype.forEach.call(form.querySelectorAll("[name]"), function (el) {
      var v = (f.get(el.name) || "").toString().trim();
      if (v) { msg += "\n" + el.getAttribute("data-label") + ": " + v; }
    });
    goWa.href = "https://wa.me/" + wa + "?text=" + encodeURIComponent(msg);
    goMail.href = "mailto:" + mail + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(msg);
    if (fab) { fab.href = "https://wa.me/" + wa; }
  }
  form.addEventListener("input", compose);
  form.addEventListener("change", compose);
  compose();
})();
