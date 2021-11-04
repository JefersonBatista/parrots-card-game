initialize_game();

function initialize_game() {
  // Main prompt message
  const msg = "Com quantas cartas você quer jogar?";

  // Requirement prompt message
  const req_msg = "O número de cartas deve ser par e estar entre 4 e 14.";

  // Number of cards of the game
  let num_cards = parseInt(prompt(msg));

  while (num_cards % 2 !== 0 || num_cards < 4 || num_cards > 14) {
    num_cards = parseInt(prompt(req_msg + "\n" + msg));
  }

  // Number of pairs of the game
  const num_pairs = num_cards / 2;

  // HTML code of each card
  function card_html(card_index) {
    return `
    <div class="card">
      <img class="face back-face" src="images/card-cover.png" alt="Card Cover" />
      <img class="face front-face" src="images/${game_cards[card_index][0]}" alt="Card Image" />
    </div>`;
  }

  function random_number_comparator(card_a, card_b) {
    return card_a[1] - card_b[1];
  }

  // Shuffling the cards
  const all_cards = [
    ["bobrossparrot.gif", Math.random()],
    ["bobrossparrot.gif", Math.random()],
    ["explodyparrot.gif", Math.random()],
    ["explodyparrot.gif", Math.random()],
    ["fiestaparrot.gif", Math.random()],
    ["fiestaparrot.gif", Math.random()],
    ["metalparrot.gif", Math.random()],
    ["metalparrot.gif", Math.random()],
    ["revertitparrot.gif", Math.random()],
    ["revertitparrot.gif", Math.random()],
    ["tripletsparrot.gif", Math.random()],
    ["tripletsparrot.gif", Math.random()],
    ["unicornparrot.gif", Math.random()],
    ["unicornparrot.gif", Math.random()],
  ];

  const game_cards = all_cards.slice(0, num_cards);
  game_cards.sort(random_number_comparator);
  console.log(game_cards);

  let card_index = 0;

  const row1 = document.querySelector(".game .card-row#row1");
  row1.innerHTML = "";
  let row_index = 0;

  while (row_index < num_pairs) {
    row1.innerHTML += card_html(card_index);
    row_index += 1;
    card_index += 1;
  }

  const row2 = document.querySelector(".game .card-row#row2");
  row2.innerHTML = "";
  row_index = 0;

  while (row_index < num_pairs) {
    row2.innerHTML += card_html(card_index);
    row_index += 1;
    card_index += 1;
  }
}
