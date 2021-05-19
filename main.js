noteArray = [];
tagsArray = [];

// Server
const ipAdress = "https://the-best-todoshnik.herokuapp.com";
const token = "DLooBUSHZYOI5rnWgR_oOyX892cq5xZX";

//TAGS
const tagInput = document.querySelector(".add-tag-input");
const tagList = document.querySelector(".tag-list");
const noteList = document.querySelector(".notes");
const noteTitleInput = document.querySelector(".add-title-input");
const noteInput = document.querySelector(".add-note-input");
const addNoteButton = document.getElementById("add-note-btn");
const taskNumber = document.querySelector('.task-number')

// loading

function loadTagList() {
  const url = `${ipAdress}/loadTagList?token=${token}`;
  fetch(url)
    .then((res) => res.json())
    .then((el) => {
      tagsArray = el;
      tagsArray.map((item) => {
        createTag(item);
      });
    });
}


function loadNoteList() {
  const url = `${ipAdress}/loadNoteList?token=${token}`;
  fetch(url)
    .then((res) => res.json())
    .then((el) => {
      el.map((item) => {
        createNote(item);
      });
    });
}

//Tags

function createTag(tagItem) {
  const tagDiv = document.createElement("div");
  tagDiv.setAttribute("class", "tag-item");
  const tagSpan = document.createElement("span");
  tagSpan.innerHTML = tagItem.name;
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
  if (e.key === "Enter" && tagInput.value.length > 1 && tagInput.value.length < 19) {
    addTags();
  }
});

function addTags() {
  const tagTitle = tagInput.value;
  const url = `${ipAdress}/addTag?searchQuery=`;

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
      clearTagList();
      console.log(data);
      data.tagList.map((tagItem) => {
        createTag(tagItem);
      });
    });
  tagInput.value = "";
}

function deleteTag(tagId) {
  const deleteTagId = tagId;
  const url = `${ipAdress}/deleteTag?searchQuery=&id=${deleteTagId}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      clearTagList();
      data.tagList.map((tagItem) => {
        createTag(tagItem);
      });
    });
}

// Notes

addNoteButton.addEventListener("click", () => {
  if (noteTitleInput.value.length > 1 && noteInput.value.length > 1) {
    addNote();
  }
});

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
  pinButton.setAttribute("class", "pin-note-btn");
  noteButtonsDiv.appendChild(pinButton);
  //edit button
  const editButton = document.createElement("button");
  editButton.innerHTML = `<i class="fas fa-edit"></i>`;
  editButton.setAttribute("class", "edit-note-btn");
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

  //attach final note
  noteList.appendChild(noteDiv);
}

function clearNoteList() {
  noteList.innerHTML = "";
}

function addNote() {
  const noteTitle = noteTitleInput.value;
  const noteDescription = noteInput.value;
  const url = `${ipAdress}/addNote?searchQuery=`;

  const noteBody = {
    title: noteTitle,
    description: noteDescription,
    userToken: token,
    isPinned: false,
    activeTagsArray: [],
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(noteBody),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.length);
      clearNoteList();
      data.map((noteItem) => {
        createNote(noteItem);
      });
    });

  noteTitleInput.value = "";
  noteInput.value = "";
}

function deleteNote(deleteId) {
  const deleteNoteId = deleteId;
  const url = `${ipAdress}/deleteNote?searchQuery=&id=${deleteNoteId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      clearNoteList();
      data.map((todoItem) => {
        createNote(todoItem);
      });
    });
}

// tasks info 

