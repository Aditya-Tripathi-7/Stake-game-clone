let bet_button = document.getElementById("bet_button");

let bet_button_box_id = document.getElementById("bet_button_box_id");

let cashout_button = document.getElementById("cashout_button");

let cashout_button_box_id = document.getElementById("cashout_button_box_id");

let reset = false;

let bet_amount_input = document.getElementById("bet_amount_input");

let current_balance = document.getElementById("current_balance");

let profit_display = document.getElementById("profit_display");

let multiplier;

let profit_balance = 0;

let into_sign = document.getElementById("into_sign");

let into = 0;

let live_balance = 150;

current_balance.innerText = `$ ${live_balance.toFixed(2)}`;

bet_button.disabled = true;

if (bet_button.disabled == true) {
  bet_button.style.backgroundColor = "#4c804c"; // Disabled state
}

function create_slots() {
  for (let i = 1; i <= 25; i++) {
    let slot = document.createElement("div");

    i = i.toString();
    slot.id = `slot_${i}`;
    slot.classList.add("slots");
    document.querySelector(".game_board_section").append(slot);
  }
}
create_slots();

let slots = document.querySelectorAll(".slots");

function mines_place(mines_no, multiplier_no) {
  mines = mines_no;
  multiplier = multiplier_no;
  reset = true;

  bet_button.style.pointerEvents = "auto";

  function updateButtonState() {
    const betAmount = parseFloat(bet_amount_input.value);

    if (
      live_balance >= betAmount && // Ensure live_balance is enough
      betAmount > 0 && // Ensure bet amount is greater than 0
      reset == true
    ) {
      bet_button.disabled = false;
      bet_button.style.backgroundColor = "#01e702"; // Enabled state
    } else {
      bet_button.disabled = true;
      bet_button.style.backgroundColor = "#4c804c"; // Disabled state
    }
  }

  // installing the functionl
  updateButtonState();

  // Update whenever the input value changes
  bet_amount_input.addEventListener("input", updateButtonState);

  console.log(mines);

  if (bet_button.disabled == false) {
    bet_button.style.backgroundColor = "#01e702"; // Enabled state
  }
}

// *************************************************************************************************
// function that are going to activate once you click a bet button

bet_button.addEventListener("click", function () {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const numberOfElements = mines;
  const uniqueNumbers = new Set();

  while (uniqueNumbers.size < numberOfElements) {
    const randomNum = getRandomInt(0, 24);
    uniqueNumbers.add(randomNum);
  }

  const randomArray = Array.from(uniqueNumbers);
  console.log(randomArray);

  for (let i = 0; i < randomArray.length; i++) {
    slots[randomArray[i]].classList.add("marked");
  }

  live_balance = live_balance - parseInt(bet_amount_input.value, 10);

  current_balance.innerText = `$ ${live_balance.toFixed(2)}`;

  let board = document.querySelector(".game_board_section");
  board.style.pointerEvents = "auto";

  bet_button_box_id.style.display = "none";

  cashout_button_box_id.style.display = "flex";

  let mine_btn = document.querySelectorAll(".mine_button");
  mine_btn.forEach((btn) => {
    btn.disabled = true;
  });

  bet_amount_input.style.pointerEvents = "none";

  slots.forEach(function (slot) {
    slot.classList.add("bet_is_on");
  });

  function playReady(audio_link) {
    let audio = new Audio(audio_link);
    audio.play();
  }

  document
    .querySelector(".game_board_section")
    .addEventListener("mouseover", function () {
      // Check if the clicked element has the "marked" class or "disabled" class

      slots.forEach(function (slotss) {
        slotss.addEventListener("click", function () {
          slotss.classList.add("removeFilter");

          if (
            slotss.classList.contains("marked") &&
            !slotss.classList.contains("disabled")
          ) {
            // Your code to execute when a marked slot is clicked
            slotss.classList.add("won_bomb");
            live_balance = live_balance - parseInt(bet_amount_input.value);
            profit_balance = 0;
            profit_display.innerText = `${profit_balance}`;

            console.log("you bombed");
            playReady("music/lose.mp3");

            slotss.classList.add("disabled");

            let board = document.querySelector(".game_board_section");
            board.style.pointerEvents = "none";

            slots.forEach((eventt) => {
              if (eventt.classList.contains("marked")) {
                eventt.classList.add("won_bomb");
              }

              if (!eventt.classList.contains("marked")) {
                eventt.classList.add("won_diamond");
              }
            });
          }

          if (
            !slotss.classList.contains("marked") &&
            !slotss.classList.contains("disabled")
          ) {
            slotss.classList.add("won_diamond");
            slotss.classList.add("disabled");

            console.log("you won");

            playReady("music/win.mp3");
            current_balance.innerText = `$ ${live_balance.toFixed(2)}`;

            profit_balance +=
              (parseInt(bet_amount_input.value) * multiplier) / 100;
            profit_balance += 0.25 * profit_balance; // Add an extra 25% of profit_balance

            profit_display.innerText = `${profit_balance.toFixed(2)}`;

            into = (
              profit_balance / parseFloat(bet_amount_input.value)
            ).toFixed(2);

            into_sign.innerText = `Profit is ${into}x`;
          }
        });
      });
    });
});

// ******************************************************************************************

cashout_button.addEventListener("click", () => {
  function playReady(audio_link) {
    let audio = new Audio(audio_link);
    audio.play();
  }
  playReady("music/cashout.mp3");

  let progress_display = document.getElementById("progress_display");
  cashout_button.classList.add("when_progress");
  progress_display.style.display = "block";

  slots.forEach((eventt) => {
    if (eventt.classList.contains("marked")) {
      eventt.classList.add("won_bomb");
    }

    if (!eventt.classList.contains("marked")) {
      eventt.classList.add("won_diamond");
    }
  });

  setTimeout(() => {
    bet_button_box_id.style.display = "flex";
    cashout_button_box_id.style.display = "none";

    let mine_btn = document.querySelectorAll(".mine_button");
    mine_btn.forEach((btn) => {
      btn.disabled = false;
      btn.style.backgroundColor = "#48637b";
    });

    bet_amount_input.style.pointerEvents = "auto";

    slots.forEach(function (slot) {
      slot.classList.remove(
        "bet_is_on",
        "won_bomb",
        "won_diamond",
        "removeFilter",
        "disabled",
        "marked"
      );
    });

    reset = false;

    let board = document.querySelector(".game_board_section");
    board.style.pointerEvents = "none";

    bet_button.style.pointerEvents = "none";
    bet_button.style.backgroundColor = "rgb(76, 128, 76)";

    live_balance += parseInt(bet_amount_input.value) + profit_balance;

    current_balance.innerText = `$ ${live_balance.toFixed(2)}`;
    profit_balance = 0;
    profit_display.innerText = `${profit_balance.toFixed(2)}`;
    into = 0;
    into_sign.innerText = `Profit is ${into}x`;
    current_balance.innerText = `$ ${live_balance.toFixed(2)}`;

    cashout_button.classList.remove("when_progress");
    progress_display.style.display = "none";
  }, 2000);
});

// ******************************************************************************************
