(() => {
  function Book(title, author, shortDesc, pages, read) {
    this.id = crypto.randomUUID()
    this.title = title
    this.author = author
    this.shortDesc = shortDesc
    this.pages = pages
    this.read = read
  }

  Book.prototype.toggleRead = function() {
    this.read = !this.read
  }

  const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "A story of love and loss", 180, true)
  const book2 = new Book("1984", "George Orwell", "A dystopian future", 328, false)
  const book3 = new Book("To Kill a Mockingbird", "Harper Lee", "A story of racism and injustice", 281, true)
  const books = [book1, book2, book3]

  function addNewBookToUI(book) {
    const bookItem = document.createElement("div")
    bookItem.classList.add("book-item")
    bookItem.setAttribute("data-id", book.id)
    bookItem.innerHTML = `
      <div class="read-badge">${book.read ? "Read" : "Not Read"}</div>
      <div class="book-title">${book.title}</div>
      <div class="book-author">${book.author}</div>
      <div class="short-desc">${book.shortDesc}</div>
      <div class="pages">
        <span>Page:</span>
        <span class="page-number">${book.pages}</span>
      </div>
      <div class="book-actions">
        <button class="toggle-read-btn">Mark as ${book.read ? "unread" : "read"}</button>
        <button class="remove-btn">Remove</button>
      </div>
    `
    document.querySelector(".books-list").appendChild(bookItem)
    bookItem.querySelector(".toggle-read-btn").addEventListener("click", () => {
      book.toggleRead()
      bookItem.querySelector(".read-badge").textContent = book.read ? "Read" : "Not Read"
    })
    bookItem.querySelector(".remove-btn").addEventListener("click", (e) => {
      const bookItem = e.target.closest(".book-item")
      const bookId = bookItem.getAttribute("data-id")
      books.splice(books.findIndex(book => book.id === bookId), 1)
      bookItem.remove()
    })
  }

  function addNewBook(title, author, shortDesc, pages, read) {
    const book = new Book(title, author, shortDesc, pages, read)
    books.push(book)
    addNewBookToUI(book)
  }

  books.forEach(book => addNewBookToUI(book))

  document.querySelector("#addBookForm").addEventListener("submit", (e) => {
    e.preventDefault()
    const bookForm = e.target
    const title = bookForm.title.value
    const author = bookForm.author.value
    const shortDesc = bookForm.shortDesc.value
    const pages = bookForm.pages.value
    const read = bookForm.read.value
    if ([title, author, shortDesc, pages].every(value => value !== "" && value !== null && value !== undefined)) {
      addNewBook(title, author, shortDesc, pages, read === "true")
      bookForm.reset()
      document.querySelector("dialog").close()
    }
  })

  document.querySelector("#newBookBtn").addEventListener("click", () => {
    document.querySelector("dialog").showModal()
  })

  document.querySelector("#clearBookForm").addEventListener("click", () => {
    document.querySelector("#addBookForm").reset()
  })

  document.querySelector("#closeBookForm").addEventListener("click", () => {
    document.querySelector("dialog").close()
  })
})();
