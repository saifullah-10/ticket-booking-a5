const seats = document.querySelectorAll(".seat");
const totalSeatValue = document.getElementById("totalSeatValue");
const updateSeats = document.getElementById("updateSeats");
const totalAmount = document.getElementById("totalAmount");
const show = document.getElementById("show");
const seatDecrease = document.getElementById("seatDecrease");
const cupponName = document.getElementById("cupponName");
const cupponApplybtn = document.getElementById("cupponApplybtn");
const cupponHidden = document.getElementById("cupponHidden");
const discountAmountShow = document.getElementById("discountAmountShow");
const grandTotal = document.getElementById("grandTotal");
const phoneNumber = document.getElementById("phoneNumber");
const submit = document.getElementById("submit");
const hideElement = document.getElementById("hideElement");
const successShow = document.getElementById("successShow");
const defaultValue = document.getElementById("defaultValue");
const smoothScrollBtn = document.getElementById("smoothScroll");
const route = document.getElementById("route");
let seatLimit = 0;
let fairCalculateOrder = 1;
const arrs = [];
phoneNumber.addEventListener("change", () => {
  if (phoneNumber.value.toString().length === 11 && arrs.length === 0) {
    submit.removeAttribute("disabled");
  }
});
// function area
const validNumber = (sub) => {
  phoneNumber.addEventListener("input", () => {
    let isValue;
    const contostr = phoneNumber.value.toString();
    if (arrs.length === 0) {
      isValue = false;
    } else if (contostr.length === 11) {
      isValue = true;
    } else {
      isValue = false;
    }
    if (isValue) {
      sub.removeAttribute("disabled");
    } else {
      sub.setAttribute("disabled", true);
    }
  });
};

const cupponCalculation = (amountNum) => {
  show.classList.remove("hidden");

  if (cupponName.value === "NEW15") {
    const discount15 = (amountNum * 15) / 100;
    return discount15;
  } else if (cupponName.value === "Couple 20") {
    const discount20 = (amountNum * 20) / 100;
    return discount20;
  } else {
    show.classList.add("hidden");
    return "Invalid";
  }
};
const calculateTotalAmount = () => {
  let amount = arrs.length * 550;
  totalAmount.innerText = amount;
  grandTotal.innerText = amount;
  if (amount > 1650) {
    cupponName.removeAttribute("disabled");
    cupponApplybtn.removeAttribute("disabled");
    cupponApplybtn.addEventListener("click", () => {
      const discountValue = cupponCalculation(amount);
      discountAmountShow.innerText = discountValue;
      grandTotal.innerText = amount - discountValue;
      if (discountValue === "Invalid") {
        grandTotal.innerText = amount;
        alert("Invalid Code");
      }
      cupponHidden.classList.add("hidden");
    });
  }
  validNumber(submit);
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
      alert("You Already Selected 4 Seats");
      e.target.classList.add("disabled");
    } else {
      arrs.push(value);
      defaultValue.classList.add("hidden");
      e.target.style.backgroundColor = "#1DD100";
      e.target.classList.add("disabled");
      seatDecrease.innerText = 40 - arrs.length;
    }
    for (const arr of arrs) {
      if (arrs.includes(arr)) {
        e.target.setAttribute("disabled", true);
      }
    }
    displayLength();
  });
}
submit.addEventListener("click", () => {
  hideElement.classList.add("hidden");
  successShow.classList.remove("hidden");
});
smoothScrollBtn.addEventListener("click", () => {
  let targetId = document.getElementById(
    smoothScrollBtn.getAttribute("data-link")
  );
  targetId.scrollIntoView({ behavior: "smooth", block: "start" });
});
