// portfolio.js

// --- Lógica para o efeito Breath (Divisão de letras) ---
const splitTextIntoSpans = () => {
  const splitTargets = document.querySelectorAll("[split-by]");

  splitTargets.forEach((node) => {
    const text = node.innerText;
    const type = node.getAttribute("split-by");
    node.innerHTML = ""; // Limpa o texto original

    if (type === "letter") {
      [...text].forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.setProperty("--index", index);
        node.appendChild(span);
      });
    }
  });
};

// Executa a divisão de letras assim que o DOM carregar
document.addEventListener("DOMContentLoaded", splitTextIntoSpans);


// --- Seu código original do Observer ---
const visibilityObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      entry.target.style.opacity = "";
      entry.target.style.transform = "";
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal-text, .services-tower, .reveal-text-main").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(50px)";
  el.style.transition = "all 0.8s ease-out";
  visibilityObserver.observe(el);
});

// --- Seu código original do Personagem ---
const updateCharacterPose = () => {
  const sprite = document.getElementById("character-sprite");
  if (!sprite) return;

  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);

  let newSrc = "images/pose3.webp";

  if (progress > 0.44 && progress < 0.50) {
    newSrc = "images/pose3.webp";
  } else if (progress >= 0.60 && progress < 0.68) {
    newSrc = "images/pose3.webp";
  } else if (progress >= 0.70 && progress < 0.77) {
    newSrc = "images/pose4.webp";
  } else if (progress >= 0.77 && progress < 0.79) {
    newSrc = "images/pose5.webp";
  } else if (progress >= 0.79) {
    newSrc = "images/pose6.webp";
  }

  if (sprite.getAttribute("src") !== newSrc) {
    sprite.src = newSrc;
  }
};

document.addEventListener("scroll", updateCharacterPose);
document.addEventListener("DOMContentLoaded", updateCharacterPose);