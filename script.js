const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector(".theme-icon");
const themeLabel = themeToggle.querySelector(".theme-label");
const formulaField = document.getElementById("formulaField");

// Создаём формулы с разными параметрами движения.
const formulas = [
  "E = mc²", "a² + b² = c²", "∫ f(x) dx", "π ≈ 3.14159",
  "eⁱᵖ + 1 = 0", "F = ma", "∑ n = n(n+1)/2", "√(x² + y²)",
  "lim x→∞", "∇ × E = −∂B/∂t", "sin²x + cos²x = 1",
  "Δ = b² − 4ac", "P(A) = n(A) / n(Ω)", "x = (−b ± √Δ) / 2a",
  "∂²u / ∂t² = c²∇²u", "λ = h / p", "aₙ = a₁ + (n−1)d"
];

formulas.forEach((formula, index) => {
  const item = document.createElement("span");
  item.className = "formula";
  item.textContent = formula;
  item.style.setProperty("--left", `${(index * 37 + 7) % 96}%`);
  item.style.setProperty("--size", `${16 + (index % 5) * 7}px`);
  item.style.setProperty("--duration", `${18 + (index % 7) * 4}s`);
  item.style.setProperty("--delay", `${-((index * 3) % 25)}s`);
  item.style.setProperty("--drift", `${(index % 2 ? 1 : -1) * (20 + index % 5 * 12)}px`);
  item.style.setProperty("--rotation", `${(index % 2 ? 1 : -1) * (4 + index % 6)}deg`);
  formulaField.appendChild(item);
});

function applyTheme(theme) {
  root.dataset.theme = theme;
  const isDark = theme === "dark";
  themeIcon.textContent = isDark ? "☀" : "☾";
  themeLabel.textContent = isDark ? "Светлая тема" : "Тёмная тема";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Переключить на светлую тему" : "Переключить на тёмную тему"
  );
  themeToggle.title = isDark ? "Включить светлую тему" : "Включить тёмную тему";
}

const savedTheme = localStorage.getItem("semen-page-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";
applyTheme(savedTheme || preferredTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  localStorage.setItem("semen-page-theme", nextTheme);
});
