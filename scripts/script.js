// Constants to access card info
const label = 0;
const random_number = 1;

// Game controllers
let flipped_card;
let enable;
let num_moves;
let num_pairs;
let num_matches;

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
  num_pairs = num_cards / 2;

  // HTML code of each card
  function card_html(index) {
    return `
      <div class="card" data-identifier="card" onclick="choose_card(this)">
        <div class="back face" data-identifier="back-face">
          <img src="images/card-cover.png" alt="Card Cover" />
        </div>
        <div class="front face" data-identifier="front-face">
          <img src="images/${game_cards[index][label]}.gif" alt="Card GIF" />
        </div>
        <span class="label">${game_cards[index][label]}</span>
      </div>`;
  }

  function random_number_comparator(card1, card2) {
    return card1[random_number] - card2[random_number];
  }

  // Shuffling the cards
  const all_cards = [
    ["bobrossparrot", Math.random()],
    ["bobrossparrot", Math.random()],
    ["explodyparrot", Math.random()],
    ["explodyparrot", Math.random()],
    ["fiestaparrot", Math.random()],
    ["fiestaparrot", Math.random()],
    ["metalparrot", Math.random()],
    ["metalparrot", Math.random()],
    ["revertitparrot", Math.random()],
    ["revertitparrot", Math.random()],
    ["tripletsparrot", Math.random()],
    ["tripletsparrot", Math.random()],
    ["unicornparrot", Math.random()],
    ["unicornparrot", Math.random()],
  ];

  const game_cards = all_cards.slice(0, num_cards);
  game_cards.sort(random_number_comparator);

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
  
  flipped_card = null;
  enable = true;
  num_moves = 0;
  num_matches = 0;
}

function flip_card(card) {
  card.classList.toggle("flipped");
}

function isCardFlipped(card) {
  return card.classList.contains("flipped");
}

function choose_card(card) {
  if (enable && !isCardFlipped(card)) {
    num_moves += 1;
    flip_card(card);

    // Is some card already flipped?
    if (flipped_card) {
      const label1 = flipped_card.querySelector(".label").innerHTML;
      const label2 = card.querySelector(".label").innerHTML;
      const match = label1 === label2;

      // If cards don't match, they need to be flipped back 1s after
      if (!match) {
        enable = false;
        setTimeout(flip_back, 1000, flipped_card, card);
      } else {
        num_matches += 1;
      }

      flipped_card = null;
    } else {
      flipped_card = card;
    }
  }
  
  // Is the game over?
  if (num_matches === num_pairs) {
    setTimeout(game_over, 1);
  }
}

function flip_back(card1, card2) {
  flip_card(card1);
  flip_card(card2);
  enable = true;
}

function game_over() {
  alert(`Você ganhou em ${num_moves} jogadas!`);
  const answer = prompt("Gostaria de reiniciar a partida?");
  const restart = answer.toLowerCase();

  if (restart === "s" || restart === "sim") {
    initialize_game();
  }
}
