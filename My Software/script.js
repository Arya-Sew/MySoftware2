// Grab DOM elements
const elements = document.querySelectorAll(".element");
const jar1 = document.getElementById("jar1");
const jar2 = document.getElementById("jar2");
const jarMix = document.getElementById("jarMix");

const fill1 = document.getElementById("fill1");
const fill2 = document.getElementById("fill2");
const fillMix = document.getElementById("fillMix");

const detailsCard = document.getElementById("details");
const clearBtn = document.getElementById("clear");
const helpBtn = document.getElementById("help");

let selected = [];

// === Element Info Library ===
const elementData = {
  "H":  { name: "Hydrogen", number: 1, group: "Nonmetal", state: "Gas", use: "Fuel, water component" },
  "He": { name: "Helium", number: 2, group: "Noble Gas", state: "Gas", use: "Balloons, cooling" },
  "O":  { name: "Oxygen", number: 8, group: "Nonmetal", state: "Gas", use: "Breathing, combustion" },
  "N":  { name: "Nitrogen", number: 7, group: "Nonmetal", state: "Gas", use: "Fertilizers, atmosphere" },
  "Na": { name: "Sodium", number: 11, group: "Alkali Metal", state: "Solid", use: "Salt, soap making" },
  "Cl": { name: "Chlorine", number: 17, group: "Halogen", state: "Gas", use: "Disinfectant, PVC plastic" },
  "C":  { name: "Carbon", number: 6, group: "Nonmetal", state: "Solid", use: "Life, fuels, diamonds" },
  "Fe": { name: "Iron", number: 26, group: "Transition Metal", state: "Solid", use: "Steel, construction" },
  "Mg": { name: "Magnesium", number: 12, group: "Alkaline Earth Metal", state: "Solid", use: "Fireworks, alloys" },
  "K":  { name: "Potassium", number: 19, group: "Alkali Metal", state: "Solid", use: "Fertilizer, nutrition" },
  "S":  { name: "Sulfur", number: 16, group: "Nonmetal", state: "Solid", use: "Matches, rubber vulcanization" },
  "Zn": { name: "Zinc", number: 30, group: "Transition Metal", state: "Solid", use: "Galvanization, alloys" },
  "Cu": { name: "Copper", number: 29, group: "Transition Metal", state: "Solid", use: "Wiring, coins" }
};

// === Reaction Library (same as before but trimmed here for brevity) ===
const reactions = {
  "Na+Cl": { result: "NaCl (Table Salt)", color: "#d9d9d9" },
  "H+O":   { result: "H₂O (Water)", color: "#4da6ff" },
  "C+O":   { result: "CO₂ (Carbon Dioxide)", color: "#808080" },
  "Fe+O":  { result: "Fe₂O₃ (Rust)", color: "#b7410e" },
  "H+Cl":  { result: "HCl (Hydrochloric Acid)", color: "#66ff66" },
  "N+H":   { result: "NH₃ (Ammonia)", color: "#ccffff" },
  "NaOH+HCl": { result: "NaCl + H₂O (Neutralization)", color: "#cceeff" },
  "Zn+HCl": { result: "ZnCl₂ + H₂", color: "#ccccff" }
  // (keep the rest from previous version)
};

// === Element Click Handler ===
elements.forEach(el => {
  el.addEventListener("click", () => {
    const symbol = el.querySelector(".element-name").innerText.trim();
    const data = elementData[symbol];
    const color = window.getComputedStyle(el).backgroundColor;

    showDetails(symbol, data);

    if (selected.length < 2) {
      selected.push({ symbol, color });
      updateJars();
    }

    if (selected.length === 2) {
      mixReaction();
    }
  });
});

// === Show Details in Side Panel ===
function showDetails(symbol, data) {
  if (!data) {
    detailsCard.innerHTML = `
      <h3>Element Details</h3>
      <div class="info"><b>Symbol:</b> ${symbol}</div>
      <div class="muted">No data available.</div>
    `;
    return;
  }

  detailsCard.innerHTML = `
    <h3>${data.name} (${symbol})</h3>
    <div class="info">
      <div><b>Atomic Number:</b> ${data.number}</div>
      <div><b>Group:</b> ${data.group}</div>
      <div><b>State at Room Temp:</b> ${data.state}</div>
      <div><b>Common Use:</b> ${data.use}</div>
    </div>
  `;
}

// === Update Jars ===
function updateJars() {
  if (selected[0]) {
    jar1.querySelector("b").innerText = selected[0].symbol;
    fill1.style.height = "100%";
    fill1.style.backgroundColor = selected[0].color;
  }
  if (selected[1]) {
    jar2.querySelector("b").innerText = selected[1].symbol;
    fill2.style.height = "100%";
    fill2.style.backgroundColor = selected[1].color;
  }
}

// === Try to Mix ===
function mixReaction() {
  const [a, b] = selected;
  const key1 = `${a.symbol}+${b.symbol}`;
  const key2 = `${b.symbol}+${a.symbol}`;

  let reaction = reactions[key1] || reactions[key2];

  if (reaction) {
    jarMix.querySelector("b").innerText = reaction.result;
    fillMix.style.height = "100%";
    fillMix.style.background = reaction.color;
  } else {
    jarMix.querySelector("b").innerText = `${a.symbol} + ${b.symbol} (No Reaction)`;
    fillMix.style.height = "100%";
    fillMix.style.background = `linear-gradient(135deg, ${a.color}, ${b.color})`;
  }
}

// === Clear Button ===
clearBtn.addEventListener("click", () => {
  selected = [];
  [fill1, fill2, fillMix].forEach(f => {
    f.style.height = "0";
    f.style.background = "none";
  });
  [jar1, jar2, jarMix].forEach(j => j.querySelector("b").innerText = "Empty");
  detailsCard.innerHTML = `<h3>Element Details</h3><div class="muted">Select an element to see its info.</div>`;
});

// === Help Button ===
helpBtn.addEventListener("click", () => {
  alert("Tip: Click on an element to see its properties.\nSelect two elements to see if they react!\n\nExamples:\nNa + Cl → Salt\nH + O → Water\nFe + O → Rust\nNaOH + HCl → Neutralization");
});
