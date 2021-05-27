const openModalButton = document.getElementById("open-modal-button");
const overlay = document.getElementById("modal-overlay");
const modal = document.getElementById("modal");
const remainingSymbols = document.querySelector(".remaining-symbols");
const maxAmountOfSymbols = 300;
const noteTitleInput = document.querySelector(".add-title-input");
const noteInput = document.querySelector(".add-note-input");


let method;

openModalButton.addEventListener("click", openModal.bind(null, null));

overlay.addEventListener("click", closeModal);

function openModal(data) {
  if (data != null) {
    noteTitleInput.value = data.title;
    noteInput.value = data.description;
    if (data.isPinned) {
      pinNoteButton.classList.add("pin-active");
      pinButtonIsPinned = true;
    }
    countChars(data.description.length);

  } else {
    countChars(0);
  }
  method = chooseButtonMethod.bind(null, data);
  addNoteButton.addEventListener("click", method);

  modal.classList.add("active");
  overlay.classList.add("active");
}

function chooseButtonMethod(data) {
  if (
    noteTitleInput.value.length > 1 &&
    noteInput.value.length > 1 &&
    noteInput.value.length < 300
  ) {
    if (data != null) {
      editNote(data);
    } else {
      addNote();
    }
  }
}

function closeModal() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
  //clear inputs
  noteTitleInput.value = "";
  noteInput.value = "";
  //clear context
  pinButtonIsPinned = false;
  pinNoteButton.classList.remove("pin-active");
  addNoteButton.removeEventListener("click", method);
}

// Remaining Characters Counter
noteInput.addEventListener("input", () => {
  countChars(noteInput.value.length);
});

function countChars(strLength) {
  const remaining = maxAmountOfSymbols - strLength;
  remainingSymbols.textContent = `${remaining} characters remaining`;
}

pinNoteButton.addEventListener("click", pinNoteModal);

function pinNoteModal() {
  pinButtonIsPinned = !pinButtonIsPinned;
  if (pinButtonIsPinned) {
    pinNoteButton.classList.add("pin-active");
  } else {
    pinNoteButton.classList.remove("pin-active");
  }
}
