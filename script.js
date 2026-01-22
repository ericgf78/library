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
  if (item) return [item.id, item.value]
  return ['', '']
})
  const book = new Book(crypto.randomUUID(), list[0][1], list[1][1], list[2][1], list[3][1], list[4][1])
  myLibrary.push(book);



  // const card = document.createElement("div");
  // const ul = document.createElement("ul");
  // grid.appendChild(card);
  // card.classList.add("card");
  // card.appendChild(ul);
  // for (var i = 0; i < list.length; i++){
  //   var li = document.createElement('li');
  //   li.textContent = list[i];
  //   ul.appendChild(li);
  // }
  
}

function createCard() {
  const card = document.createElement("div");
  card.classList.add("card");
  grid.appendChild(card);
  const title = document.createElement("div");
  title.textContent = myLibrary.at(-1).title
  card.appendChild(title);
 
  
}

function displayLibrary() {

  // for (i = 0; i < myLibrary.length; i++) {
  // createCard();
  // }
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

