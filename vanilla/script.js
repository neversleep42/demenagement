/* ============================================================
   POSITIVE MOVING — Interactions vanilla JS
   ============================================================ */
(function () {
  "use strict";

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- Lazy-load des images + fallback dégradé ---------- */
  function loadImages() {
    $$("img[data-src]").forEach((img) => {
      img.src = img.getAttribute("data-src");
      img.loading = "lazy";
      img.removeAttribute("data-src");
      img.addEventListener("error", () => {
        const wrap = img.parentElement;
        if (wrap) wrap.classList.add("img-fallback");
      });
    });
  }

  /* ---------- Header au scroll + barre de progression ---------- */
  const header = $("#header");
  const progress = $("#scrollProgress");
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 40);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal au scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  $$(".reveal").forEach((el) => io.observe(el));

  /* ---------- Menu mobile ---------- */
  const burger = $("#burger");
  const nav = $("#nav");
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
  });
  $$(".nav-link").forEach((l) =>
    l.addEventListener("click", () => {
      nav.classList.remove("open");
      burger.classList.remove("open");
    })
  );

  /* ---------- Navlink active selon la section visible ---------- */
  const sections = $$("main section[id]");
  const navMap = {};
  $$(".nav-link").forEach((l) => (navMap[l.getAttribute("href").slice(1)] = l));
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && navMap[e.target.id]) {
          $$(".nav-link").forEach((l) => l.classList.remove("active"));
          navMap[e.target.id].classList.add("active");
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- Select custom ---------- */
  const select = $("#needSelect");
  if (select) {
    const value = $(".select-value", select);
    const options = $$(".select-options li", select);
    let kbd = -1;

    const close = () => {
      select.classList.remove("open");
      select.setAttribute("aria-expanded", "false");
      options.forEach((o) => o.classList.remove("kbd"));
      kbd = -1;
    };
    const open = () => {
      select.classList.add("open");
      select.setAttribute("aria-expanded", "true");
    };

    select.addEventListener("click", (e) => {
      if (e.target.closest("li")) return;
      select.classList.contains("open") ? close() : open();
    });
    options.forEach((o) =>
      o.addEventListener("click", () => {
        value.textContent = o.textContent;
        value.classList.add("filled");
        close();
      })
    );
    select.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        select.classList.contains("open") ? (kbd >= 0 ? options[kbd].click() : close()) : open();
      } else if (e.key === "ArrowDown") {
        e.preventDefault(); open();
        kbd = Math.min(kbd + 1, options.length - 1);
        options.forEach((o, i) => o.classList.toggle("kbd", i === kbd));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        kbd = Math.max(kbd - 1, 0);
        options.forEach((o, i) => o.classList.toggle("kbd", i === kbd));
      } else if (e.key === "Escape") close();
    });
    document.addEventListener("click", (e) => {
      if (!select.contains(e.target)) close();
    });
  }

  /* ---------- Compteurs animés ---------- */
  function animateCount(el) {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || "";
    const dur = 1600;
    let start = null;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  const countIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animateCount(e.target);
          countIO.unobserve(e.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  $$(".stat-num").forEach((el) => countIO.observe(el));

  /* ---------- Carrousel d'avis ---------- */
  const track = $("#reviewsTrack");
  if (track) {
    const slides = $$(".review", track);
    const dotsWrap = $("#reviewsDots");
    let idx = 0;
    let timer;

    slides.forEach((_, i) => {
      const d = document.createElement("button");
      d.setAttribute("aria-label", "Avis " + (i + 1));
      if (i === 0) d.classList.add("active");
      d.addEventListener("click", () => go(i));
      dotsWrap.appendChild(d);
    });
    const dots = $$("button", dotsWrap);

    function go(i) {
      idx = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, k) => d.classList.toggle("active", k === idx));
      restart();
    }
    function restart() {
      clearInterval(timer);
      timer = setInterval(() => go(idx + 1), 6000);
    }
    $("#revNext").addEventListener("click", () => go(idx + 1));
    $("#revPrev").addEventListener("click", () => go(idx - 1));

    // swipe tactile
    let x0 = null;
    track.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
    track.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) go(idx + (dx < 0 ? 1 : -1));
      x0 = null;
    });
    restart();
  }

  /* ---------- Accordéon FAQ ---------- */
  $$(".acc-item").forEach((item) => {
    const head = $(".acc-head", item);
    const panel = $(".acc-panel", item);
    head.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      $$(".acc-item").forEach((it) => {
        it.classList.remove("open");
        $(".acc-panel", it).style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  /* ---------- Boutons magnétiques ---------- */
  if (window.matchMedia("(pointer:fine)").matches) {
    $$(".magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${mx * 0.25}px, ${my * 0.35}px)`;
      });
      btn.addEventListener("mouseleave", () => (btn.style.transform = ""));
    });
  }

  /* ---------- Parallax léger / tilt sur les visuels ---------- */
  if (window.matchMedia("(pointer:fine)").matches) {
    $$(".tilt").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -6;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      el.addEventListener("mouseleave", () => (el.style.transform = ""));
    });
  }

  /* ---------- Toast ---------- */
  const toast = $("#toast");
  let toastT;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(() => toast.classList.remove("show"), 3200);
  }

  $("#contactBtn") && $("#contactBtn").addEventListener("click", () => {
    const v = $(".select-value").classList.contains("filled")
      ? $(".select-value").textContent
      : "votre projet";
    showToast("Merci ! Nous vous recontactons pour « " + v + " ».");
  });

  /* ---------- Newsletter ---------- */
  const newsForm = $("#newsForm");
  if (newsForm) {
    newsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = newsForm.querySelector("input").value;
      $("#newsMsg").textContent = "Merci ! Confirmation envoyée à " + email;
      newsForm.reset();
      showToast("Inscription à la newsletter confirmée ✓");
    });
  }

  /* ---------- Vidéo (placeholder) ---------- */
  const play = $(".play-btn");
  play && play.addEventListener("click", () => showToast("La vidéo de présentation arrive bientôt 🎬"));

  /* ---------- Init ---------- */
  loadImages();
})();
