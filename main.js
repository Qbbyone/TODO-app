noteArray = [];
tagsArray = [];

// Server
const ipAdress = "https://the-best-todoshnik.herokuapp.com";
const token = "DLooBUSHZYOI5rnWgR_oOyX892cq5xZX";

//TAGS
const tagInput = document.querySelector(".add-tag-input");
const tagList = document.querySelector(".tag-list");

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