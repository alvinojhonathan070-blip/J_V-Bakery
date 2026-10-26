document.addEventListener("DOMContentLoaded", () => {
  // --- 1. NAVBAR MOBILE & SCROLL ---
  const openHam = document.getElementById("iconMenu");
  const closeHam = document.getElementById("iconClose");
  const hiddenNav = document.getElementById("mobileMenu");
  const navItems = document.querySelectorAll(".nav-item");
  const navBar = document.getElementById("navbar");

  if (openHam && closeHam && hiddenNav) {
    const toggleMenu = (isOpen) => {
      hiddenNav.classList.toggle("hidden", !isOpen);
      openHam.classList.toggle("hidden", isOpen);
      closeHam.classList.toggle("hidden", !isOpen);
    };

    openHam.addEventListener("click", () => toggleMenu(true));
    closeHam.addEventListener("click", () => toggleMenu(false));

    navItems.forEach((item) => {
      item.addEventListener("click", () => toggleMenu(false));
    });
  }

  if (navBar) {
    window.addEventListener("scroll", () => {
      const isScrolled = window.scrollY > 80;
      navBar.classList.toggle("border-b-[3px]", isScrolled);
      navBar.classList.toggle("border-b-primary", isScrolled);
    });
  }

  // --- 2. TYPEWRITER EFFECT (OUR STORY) ---
  const paragraph = document.getElementById("paragraph");
  const typedText = document.getElementById("typed-text");

  const storyText =
    "erangkat dari cinta pada aroma panggangan segar, J&V Bakery menyajikan roti dan pastry artisan yang dibuat setiap hari dari bahan alami pilihan. Bagi kami, setiap gigitan bukan cuma soal rasa lembut dan manis, tapi tentang menghadirkan kehangatan oven rumahan yang siap menemani setiap momen santaimu.";
  let charIndex = 0;
  const speed = 15;

  function runTypeWriter() {
    if (!typedText) return;
    if (charIndex < storyText.length) {
      typedText.textContent += storyText.charAt(charIndex);
      charIndex++;
      setTimeout(runTypeWriter, speed);
    }
  }

  if (paragraph && typedText) {
    const storyObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runTypeWriter();
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    storyObserver.observe(paragraph);
  }

  // --- 3. COUNTER ANIMATION (STATS) ---
  const animateSingleCounter = (el) => {
    const target = +el.dataset.target;
    let count = 0;
    const step = Math.max(1, Math.ceil(target / 60));

    const timer = setInterval(() => {
      count += step;
      if (count >= target) {
        el.innerText = target;
        clearInterval(timer);
      } else {
        el.innerText = count;
      }
    }, 20);
  };

  const statObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSingleCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".angka").forEach((el) => {
    statObserver.observe(el);
  });
});

const sectionAbout = document.getElementById("about");
const sectionMenu = document.getElementById("menu");
const sectionLocation = document.getElementById("location");
const sectionContact = document.getElementById("contact");
const allNavLinks = document.querySelectorAll(".nav-desk");

const obser = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      allNavLinks.forEach(link => link.classList.remove("active"));

      const activeLink = document.querySelector(`.nav-desk[href="#${e.target.id}"]`);
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
}, { 
  rootMargin: "-20% 0px -70% 0px", 
  threshold: 0 
});

[sectionAbout, sectionMenu, sectionLocation, sectionContact].forEach(sec => {
  if (sec) obser.observe(sec);
});