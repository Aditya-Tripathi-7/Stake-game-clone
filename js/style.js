function addMouseDownListener(buttonId) {
  let button = document.getElementById(buttonId);

  button.addEventListener("mousedown", function () {
    this.style.boxShadow = "none";
    this.style.scale = ".9";
  });

  button.addEventListener("mouseup", function () {
    this.style.boxShadow = "";
    this.style.scale = "1";
  });
}

let mine_btn = document.querySelectorAll(".mine_button");
let selectedButton = null;

mine_btn.forEach((button) => {
  button.addEventListener("click", function () {
    // Reset the background color of the previously selected button
    if (selectedButton) {
      selectedButton.style.backgroundColor = ""; // Set to the default color
    }

    // Update the background color of the current button
    button.style.backgroundColor = "#01e702";

    // Set the current button as the selected button
    selectedButton = button;
  });
});

// Add event listeners for mousedown and mouseup for each button to add button style
addMouseDownListener("2mines");
addMouseDownListener("4mines");
addMouseDownListener("8mines");
addMouseDownListener("16mines");


document.addEventListener("DOMContentLoaded", function () {
  let openings = document.getElementById("openings");

  // Set the duration in milliseconds (e.g., 3000 for 3 seconds)
  var duration = 4000;

  // Hide the element after the specified duration
  setTimeout(function () {
      openings.style.display = "none";
  }, duration);
});


