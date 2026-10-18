
const scenes = [
  {
    title: "The First ARISE",
    symbol: "ARISE",
    episode: "Season 1 · Episode 12",
    description: "Jin-Woo begins building his shadow army.",
    keywords: ["arise", "shadow", "army", "igris", "monarch"],
    video: "Solo Leveling Jinwoo first arise Igris official clip"
  },
  {
    title: "Jin-Woo vs Igris",
    symbol: "IGRIS",
    episode: "Season 1 · Episode 11–12",
    description: "Jin-Woo faces the red-armored knight.",
    keywords: ["igris", "fight", "battle", "knight", "job change"],
    video: "Solo Leveling Jinwoo vs Igris official clip"
  },
  {
    title: "The Double Dungeon",
    symbol: "DUNGEON",
    episode: "Season 1 · Episodes 1–2",
    description: "Hunters discover a terrifying hidden chamber.",
    keywords: ["dungeon", "statue", "god", "temple", "hunters"],
    video: "Solo Leveling double dungeon statue official clip"
  },
  {
    title: "The System Awakens",
    symbol: "SYSTEM",
    episode: "Season 1 · Episode 2",
    description: "Jin-Woo receives the mysterious System.",
    keywords: ["system", "level", "quest", "awakening", "power"],
    video: "Solo Leveling Jinwoo system awakening official clip"
  },
  {
    title: "Shadow Monarch",
    symbol: "MONARCH",
    episode: "Shadow power moments",
    description: "Search for scenes featuring Jin-Woo's shadow powers.",
    keywords: ["shadow monarch", "shadows", "monarch", "power", "jinwoo"],
    video: "Solo Leveling Shadow Monarch Jinwoo official clip"
  },
  {
    title: "The Job-Change Quest",
    symbol: "QUEST",
    episode: "Season 1 · Episodes 10–12",
    description: "A dangerous quest changes Jin-Woo's future.",
    keywords: ["job change", "quest", "class", "igris", "system"],
    video: "Solo Leveling job change quest official clip"
  }
];

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const results = document.getElementById("results");
const emptyState = document.getElementById("empty-state");
const resultsTitle = document.getElementById("results-title");
const player = document.getElementById("player");
const playerTitle = document.getElementById("player-title");

function searchScenes(word) {
  const query = word.toLowerCase().trim();

  if (!query) return scenes;

  return scenes.filter(scene => {
    const searchable = [
      scene.title,
      scene.symbol,
      scene.episode,
      scene.description,
      ...scene.keywords
    ].join(" ").toLowerCase();

    return searchable.includes(query);
  });
}

function displayScenes(word = "") {
  const found = searchScenes(word);

  resultsTitle.textContent = word.trim()
    ? `RESULTS FOR "${word.trim().toUpperCase()}"`
    : "SCENE ARCHIVE";

  emptyState.hidden = found.length > 0;

  results.innerHTML = found.map(scene => `
    <article class="scene-card">
      <div class="scene-art">
        <h3>${scene.symbol}</h3>
      </div>

      <div class="scene-content">
        <h3>${scene.title}</h3>
        <p>${scene.episode}</p>
        <p>${scene.description}</p>

        <button
          type="button"
          class="view-scene"
          data-title="${scene.title}"
          data-video="${scene.video}">
          VIEW SCENE
        </button>

        <a
          href="https://www.youtube.com/results?search_query=${encodeURIComponent(scene.video)}"
          target="_blank"
          rel="noopener noreferrer">
          FIND VIDEO ↗
        </a>
      </div>
    </article>
  `).join("");
}

form.addEventListener("submit", function(event) {
  event.preventDefault();
  displayScenes(input.value);
});

document.querySelectorAll("[data-query]").forEach(button => {
  button.addEventListener("click", function() {
    input.value = this.dataset.query;
    displayScenes(input.value);
  });
});

results.addEventListener("click", function(event) {
  const button = event.target.closest(".view-scene");
  if (!button) return;

  const videoSearch = button.dataset.video;

  playerTitle.textContent = button.dataset.title.toUpperCase();

  player.innerHTML = `
    <div class="play">▶</div>
    <h3>${button.dataset.title}</h3>
    <p>Find an available official or authorized video clip.</p>
    <a
      href="https://www.youtube.com/results?search_query=${encodeURIComponent(videoSearch)}"
      target="_blank"
      rel="noopener noreferrer">
      WATCH SEARCH RESULTS ↗
    </a>
  `;
});

displayScenes();
