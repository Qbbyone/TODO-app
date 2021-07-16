// Remote server
//const ipAdress = "https://the-best-todoshnik.herokuapp.com";

// local server
const ipAdress = "http://192.168.0.103:8082";

const token = "DLooBUSHZYOI5rnWgR_oOyX892cq5xZX";

let pinButtonIsPinned = false;

//tags
const tagInput = document.querySelector(".add-tag-input");
const tagList = document.querySelector(".tag-list");

//notes
const noteList = document.querySelector(".notes");

const addNoteButton = document.getElementById("add-note-btn");
const pinNoteButton = document.querySelector(".pin-note-btn");
//info
const taskNumber = document.querySelector(".task-number");
const tasksString = document.querySelector(".tasks");
//search
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-btn");

searchButton.addEventListener("click", () => {
  searchInput.classList.toggle("hidden");
});

function applyData(data) {
  console.log("apply", data);
  if (Array.isArray(data)) {
    updateTaskNumber(data.length);
    clearNoteList();
    data.map((noteItem) => {
      createNote(noteItem);
    });
  } else {
    updateTaskNumber(data.noteList.length);
    clearTagList();
    clearNoteList();
    data.tagList.forEach((item) => {
      //изолированная копия JavaScript Array
      let itemCopy = new Object();
      Object.assign(itemCopy, item);
      itemCopy.isActive = false;
      tagsMap.set(itemCopy.id, itemCopy);
    });

    data.tagList.map((tagItem) => {
      createDashboardTag(tagItem);
    });
    data.noteList.map((noteItem) => {
      createNote(noteItem);
    });
  }
}

function updateTaskNumber(data) {
  let number = data;
  taskNumber.innerText = number;
  if (number == 1) {
    tasksString.innerText = " task";
  } else {
    tasksString.innerText = " tasks";
  }
}

// loading

function loadTagList() {
  const url = `${ipAdress}/loadTagList?token=${token}`;
  fetch(url)
    .then((res) => res.json())
    .then((el) => {
      el.forEach((item) => {
        let itemCopy = new Object();
        Object.assign(itemCopy, item);
        itemCopy.isActive = false;
        tagsMap.set(itemCopy.id, itemCopy);
      });
      el.map((item) => {
        createDashboardTag(item);
      });
    });
}

function loadNoteList() {
  const url = `${ipAdress}/loadNoteList?token=${token}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      applyData(data);
    });
}

//Tags

function createDashboardTag(tagItem) {
  const tagDiv = document.createElement("div");
  tagDiv.setAttribute("class", "tag-item");
  const tagSpan = document.createElement("span");
  tagSpan.innerHTML = tagItem.name;
  tagSpan.addEventListener("click", changeTagStatus.bind(null, tagItem.id));
  if (tagItem.isActive) {
    tagDiv.classList.add("tag-item-active");
  }

  //delete tag button
  const deleteTagBtn = document.createElement("i");
  deleteTagBtn.setAttribute("class", "fas fa-times");
  deleteTagBtn.classList.add("delete-tag-btn");
  deleteTagBtn.addEventListener("click", deleteTag.bind(null, tagItem.id));

  //attach tags
  tagDiv.appendChild(tagSpan);
  tagDiv.appendChild(deleteTagBtn);
  tagList.appendChild(tagDiv);
}

function clearTagList() {
  tagList.innerHTML = "";
}

tagInput.addEventListener("keyup", (e) => {
  if (
    e.key === "Enter" &&
    tagInput.value.length > 1 &&
    tagInput.value.length < 19
  ) {
    addTags();
  }
});

function addTags() {
  const tagTitle = tagInput.value;
  const url = `${ipAdress}/addTag?searchQuery=${searchInput.value}`;
  const tagType = {
    name: tagTitle,
    userToken: token,
    isActive: false,
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(tagType),
  })
    .then((response) => response.json())
    .then((data) => {
      applyData(data);
    });
  tagInput.value = "";
}

function deleteTag(tagId) {
  const url = `${ipAdress}/deleteTag?searchQuery=${searchInput.value}&id=${tagId}`;
  tagsMap.delete(tagId);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      applyData(data);
    });
}

function changeTagStatus(tagId) {
  const url = `${ipAdress}/changeTagStatus?searchQuery=${searchInput.value}&id=${tagId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      applyData(data);
    });
}

// Notes

function createNote(noteItem) {
  const title = noteItem.title;
  const description = noteItem.description;

  //create note body
  const noteDiv = document.createElement("div");
  noteDiv.setAttribute("class", "note");

  //create note header
  const noteHeaderDiv = document.createElement("div");
  noteHeaderDiv.setAttribute("class", "note-header");
  noteDiv.appendChild(noteHeaderDiv);
  // title
  const noteTitleDiv = document.createElement("div");
  noteTitleDiv.setAttribute("class", "note-title");
  const noteTitle = document.createElement("h2");
  noteTitle.innerText = title;
  noteTitleDiv.appendChild(noteTitle);
  noteHeaderDiv.appendChild(noteTitleDiv);
  //header buttons
  const noteButtonsDiv = document.createElement("div");
  noteButtonsDiv.setAttribute("class", "buttons-container");
  noteHeaderDiv.appendChild(noteButtonsDiv);

  // pin button
  const pinButton = document.createElement("button");
  pinButton.innerHTML = `<i class="fas fa-thumbtack"></i>`;
  pinButton.addEventListener("click", pinNote.bind(null, noteItem.id));
  if (noteItem.isPinned) {
    pinButton.classList.add("pin-active");
  } else {
    pinButton.classList.add("pin-note-btn");
  }
  noteButtonsDiv.appendChild(pinButton);

  //edit button
  const editButton = document.createElement("button");
  editButton.innerHTML = `<i class="fas fa-pen"></i>`;
  editButton.setAttribute("class", "edit-note-btn");
  editButton.addEventListener("click", openModal.bind(null, noteItem));
  noteButtonsDiv.appendChild(editButton);

  //delete button
  const deleteButton = document.createElement("button");
  deleteButton.addEventListener("click", deleteNote.bind(null, noteItem.id));
  deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
  deleteButton.setAttribute("class", "delete-note-btn");
  noteButtonsDiv.appendChild(deleteButton);

  // description
  const noteDescriptionDiv = document.createElement("div");
  noteDescriptionDiv.setAttribute("class", "note-description");
  const noteDescription = document.createElement("p");
  noteDescription.innerText = description;
  noteDescriptionDiv.appendChild(noteDescription);
  noteDiv.appendChild(noteDescriptionDiv);

  // tags container
  const noteTagsDiv = document.createElement("div");
  noteTagsDiv.classList.add("note-tags");
 
  noteItem.tagsArray.forEach(el => {
    if (el.isActive) createTag(el, noteTagsDiv)
  })

  noteDiv.appendChild(noteTagsDiv);

  //attach final note
  noteList.appendChild(noteDiv);
}

function clearNoteList() {
  noteList.innerHTML = "";
}

function submitNote(newNoteBody) {
  const noteTitle = noteTitleInput.value;
  const noteDescription= noteInput.value;
  
  let method;

  const activeTagsArray = []
  
  tagsMap.forEach((el) => {
    if(el.isActive) activeTagsArray.push(el.id)
  })
  
  let noteBody = {
    title: noteTitle,
    description: noteDescription,
    userToken: token,
    isPinned: pinButtonIsPinned,
    activeTagsArray,
  };

  if(newNoteBody) {
    method = 'editNote'
    noteBody.id = newNoteBody.id 
  } else {
    method = 'addNote'
  }
  
  const url = `${ipAdress}/${method}?searchQuery=${searchInput.value}`;

  fetch(url, {
    method: "POST",
    body: JSON.stringify(noteBody),
  })
    .then((response) => response.json())
    .then((data) => {
      applyData(data);
    });

  closeModal();
}

function deleteNote(deleteId) {
  const deleteNoteId = deleteId;
  const url = `${ipAdress}/deleteNote?searchQuery=${searchInput.value}&id=${deleteNoteId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      applyData(data);
    });
}

// pin note

function pinNote(pinId) {
  const pinItemId = pinId;
  const url = `${ipAdress}/pinNote?searchQuery=${searchInput.value}&id=${pinItemId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      applyData(data);
    });
}

// search

searchInput.addEventListener("input", () => {
  searchNote();
});

function searchNote() {
  const url = `${ipAdress}/searchNote?searchQuery=${searchInput.value}&token=${token}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      applyData(data);
    });
}
