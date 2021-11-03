// Main prompt message
const msg = "Com quantas cartas você quer jogar?";

// Requirement prompt message
const r_msg = "O número de cartas deve ser par e estar entre 4 e 14.";

// Number of cards of the game
let num_cards = parseInt(prompt(msg));

while (num_cards % 2 !== 0 || num_cards < 4 || num_cards > 14) {
  num_cards = parseInt(prompt(r_msg + "\n" + msg));
}

// Number of pairs of the game
const num_pairs = num_cards / 2;

// Including the cards in the game
const card_html = `<div class="card">
  <img src="images/card-cover.png" alt="Card Cover" />
</div>`;

const row1 = document.querySelector(".game .card-row#row1");
row1.innerHTML = "";
for (let i = 0; i < num_pairs; i++) {
  row1.innerHTML += card_html;
}

const row2 = document.querySelector(".game .card-row#row2");
row2.innerHTML = "";
for (let i = 0; i < num_pairs; i++) {
  row2.innerHTML += card_html;
}
