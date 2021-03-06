// Game controllers
let first_card;
let enable;
let num_moves;
let num_pairs;
let num_matches;

// Time count
let time;
let interval;

function increment_timer() {
  time += 1;
  update_timer();
}

function update_timer() {
  const timer = document.querySelector(".timer");
  timer.innerHTML = `${time} s`;
}

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
          <img src="images/${game_cards[index].label}.gif" alt="Card GIF" />
        </div>
        <span class="label">${game_cards[index].label}</span>
      </div>`;
  }

  function random_number_comparator(a, b) {
    return a.random_number - b.random_number;
  }

  // All card labels
  const all_labels = [
    { label: "bobrossparrot" },
    { label: "explodyparrot" },
    { label: "fiestaparrot" },
    { label: "metalparrot" },
    { label: "revertitparrot" },
    { label: "tripletsparrot" },
    { label: "unicornparrot" }
  ];

  // Giving a random number to each label
  all_labels.forEach(function (label) {
    label.random_number = Math.random();
  });

  // Selecting game card labels
  all_labels.sort(random_number_comparator);
  const game_labels = all_labels.slice(0, num_pairs);

  // Shuffling game cards
  const game_cards = [];
  game_labels.forEach(function (label) {
    game_cards.push({ label: label.label, random_number: Math.random() });
    game_cards.push({ label: label.label, random_number: Math.random() });
  });
  game_cards.sort(random_number_comparator);

  // Putting cards in HTML
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

  first_card = null;
  enable = true;
  num_moves = 0;
  num_matches = 0;

  time = 0;
  update_timer();
  interval = setInterval(increment_timer, 1000);
}

function flip_card(card) {
  card.classList.toggle("flipped");
}

function isCardFlipped(card) {
  return card.classList.contains("flipped");
}

function choose_card(card) {
  if (enable && !isCardFlipped(card)) {
    flip_card(card);

    // If a first card is already flipped
    if (first_card) {
      // A move is counted only when the second card is flipped
      num_moves += 1;
      const second_card = card;

      const label1 = first_card.querySelector(".label").innerHTML;
      const label2 = second_card.querySelector(".label").innerHTML;
      const match = label1 === label2;

      // If cards don't match, they need to be flipped back 1s after
      if (!match) {
        enable = false;
        setTimeout(flip_back, 1000, first_card, second_card);
      } else {
        num_matches += 1;
      }

      first_card = null;
    }

    // If no first card is flipped
    else {
      first_card = card;
    }

    // Is the game over?
    if (num_matches === num_pairs) {
      setTimeout(game_over, 50);
    }
  }
}

function flip_back(card1, card2) {
  flip_card(card1);
  flip_card(card2);
  enable = true;
}

function game_over() {
  // Stop timer
  clearInterval(interval);

  alert(`Você ganhou em ${num_moves} jogadas e ${time} segundos!`);
  const answer = prompt("Gostaria de reiniciar a partida? (sim/s para sim)");
  const restart = answer.toLowerCase();

  if (restart === "s" || restart === "sim") {
    initialize_game();
  }
}

