const openModalButtons = document.querySelectorAll("[data-modal-target]");
const overlay = document.getElementById("modal-overlay");
const remainingSymbols = document.querySelector(".remaining-symbols");
const maxAmountOfSymbols = 300;

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

// Remaining Characters Counter
noteInput.addEventListener('input', () => {
  const remaining = maxAmountOfSymbols - noteInput.value.length;

  remainingSymbols.textContent = `${remaining} characters remaining`;
})
