const seats = document.querySelectorAll(".seat");
const totalSeatValue = document.getElementById("totalSeatValue");
const updateSeats = document.getElementById("updateSeats");
const totalAmount = document.getElementById("totalAmount");
const show = document.getElementById("show");
const cupponName = document.getElementById("cupponName");
let seatLimit = 0;
let fairCalculateOrder = 1;
const arrs = [];

// function area
const cupponCalculation = (amountNum) => {
  show.classList.remove("hidden");
  cupponName.addEventListener("input", () => {
    if (cupponName.value === "NEW15") {
      const discount15 = (amountNum * 15) / 100;
      console.log(discount15);
    } else if (cupponName.value === "Couple 20") {
    } else {
      console.log("invalid");
    }
  });
};
const calculateTotalAmount = () => {
  let amount = arrs.length * 550;
  totalAmount.innerText = amount;
  if (amount > 1650) {
    cupponName.removeAttribute("disabled");
    cupponCalculation(amount);
  }
};
const seatUpdate = () => {
  if (seatLimit > 3) {
    return;
  } else {
    const createElement = document.createElement("div");
    createElement.classList.add("flex", "justify-between");
    createElement.innerHTML = `<p>${arrs[seatLimit]}</p>
    <p>Economy</p>
    <p>550</p>`;
    updateSeats.appendChild(createElement);
    seatLimit += 1;
    fairCalculateOrder += 1;
    calculateTotalAmount();
  }
};
const displayLength = () => {
  totalSeatValue.innerText = arrs.length;
  seatUpdate();
};

for (const seat of seats) {
  seat.addEventListener("click", (e) => {
    const value = e.target.outerText;
    if (arrs.includes(value)) {
      alert("already selected");
      e.target.classList.add("disabled");
    } else if (arrs.length > 3) {
      alert("You Already Select 4 Seats");
      e.target.classList.add("disabled");
    } else {
      arrs.push(value);
      e.target.style.backgroundColor = "red";
      e.target.classList.add("disabled");
    }
    displayLength(); // Call the function to update the length
  });
}
