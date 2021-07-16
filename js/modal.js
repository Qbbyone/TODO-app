const openModalButton = document.getElementById("open-modal-button");
const overlay = document.getElementById("modal-overlay");
const modal = document.getElementById("modal");
const remainingSymbols = document.querySelector(".remaining-symbols");
const maxAmountOfSymbols = 300;

const noteTitleInput = document.querySelector(".add-title-input");
const noteInput = document.querySelector(".add-note-input");

const tagModalList = document.querySelector(".modal-tags-container");
const tagsMap = new Map();

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

    data.tagsArray.forEach((el) => {
      tagsMap.set(el.id, el);
      createTag(el);
    });
  } else {
    countChars(0);
    tagsMap.forEach((el) => {
      createTag(el);
    });
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
    submitNote(data);
  }
}

function closeModal() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
  //clear inputs
  noteTitleInput.value = "";
  noteInput.value = "";
  tagModalList.innerHTML = "";
  //clear context
  pinButtonIsPinned = false;
  tagsMap.forEach((el) => {
    el.isActive = false;
  });

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

function createTag(tagItem, noteTagsDiv) {
  const tagDiv = document.createElement("div");
  tagDiv.setAttribute("class", "tag-item");
  if (tagItem.isActive) {
    tagDiv.classList.add("tag-item-active");
  }
  const tagSpan = document.createElement("span");
  tagSpan.innerHTML = tagItem.name;
  tagDiv.appendChild(tagSpan);
  if (noteTagsDiv) {
    noteTagsDiv.appendChild(tagDiv);
  } else {
    tagSpan.addEventListener(
      "click",
      changeModalTagStatus.bind(null, tagItem.id)
    );
    tagModalList.appendChild(tagDiv);
  }
  
}

function changeModalTagStatus(tagId) {
  let tag = tagsMap.get(tagId);
  tag.isActive = !tag.isActive;
  tagsMap.set(tagId, tag);
  tagModalList.innerHTML = "";

  tagsMap.forEach((el) => {
    createTag(el);
  });
}
