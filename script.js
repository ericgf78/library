const myLibrary = [];
const addButton = document.querySelector("#addButton");
const dialog = document.querySelector("#formPanel");
const confirmBtn = document.querySelector("#confirmButton");
const grid = document.querySelector("#grid");
const imageUrl = document.getElementById('book_thumbnail').value;

function Book(id, title, author, pages, thumb, check) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.thumb = thumb;
  this.check = check;
  this.info = function() {
    const description = title + " by: " + author + ", " + pages + " pages.";
    return description;   
  }
}

function addBookToLibrary() {
  const list = Array.from(document.querySelector("#add-book-form").children).map(d => {
  const item = d.getElementsByTagName('input')[0]
  if (item?.type === "text") return [item.id, item.value]
  else if (item?.type === "checkbox") return [item.id, item.checked]
  return ['', '']
})
  console.log(myLibrary);
  const book = new Book(crypto.randomUUID(), list[0][1], list[1][1], list[2][1], list[3][1], list[4][1])
  myLibrary.push(book);
}

function deleteCard(cardId) {
  const element = document.getElementById(cardId);
  element.remove();
  for (var i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].id === cardId) {
      myLibrary.splice(i, 1);
    }
  }
}

function createCard() {
  const card = document.createElement("div");
  card.classList.add("card");
  card.id = myLibrary.at(-1).id;
  grid.appendChild(card);
  const infoContainer = document.createElement("div");
  const title = document.createElement("div");
  const author = document.createElement("div");
  const pages = document.createElement("div");
  const thumb = document.createElement("img");
  infoContainer.classList.add('info-container');
  card.appendChild(infoContainer)
  thumb.src = myLibrary.at(-1).thumb
  title.textContent = "Title: " + myLibrary.at(-1).title;
  author.textContent = "Author: " + myLibrary.at(-1).author;
  pages.textContent = "Pages: " + myLibrary.at(-1).pages;
  thumb.classList.add("thumbnail");
  infoContainer.appendChild(thumb);
  infoContainer.appendChild(title);
  infoContainer.appendChild(author);
  infoContainer.appendChild(pages);
  const isChecked = myLibrary.at(-1).check;
  if (isChecked === true) {
    const read = document.createElement("div");
    read.textContent = "Read";
    read.classList.add('read-text');
    infoContainer.appendChild(read);
  }
  else {
    const notRead = document.createElement("div");
    notRead.textContent = "Not Read";
    notRead.classList.add('not-read');
    infoContainer.appendChild(notRead);
    console.log(myLibrary.check);
  }
  const iconContainer = document.createElement('div');
  card.appendChild(iconContainer);
  iconContainer.classList.add('icon-container');
  const deleteIcon = document.createElement('span');
  deleteIcon.className = 'mdi mdi-delete';
  iconContainer.appendChild(deleteIcon);
  deleteIcon.addEventListener('click', (e) => {
    const parentId = e.target.parentNode.parentNode.id;
    deleteCard(parentId);
    console.log(myLibrary);
  });
}

function displayLibrary() {
  createCard();
  console.log(myLibrary);
}

addButton.addEventListener('click', () => {
  dialog.showModal();
});

confirmBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addBookToLibrary();
  displayLibrary();
  dialog.close();
});

