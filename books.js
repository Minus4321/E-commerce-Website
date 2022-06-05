// Prior to React

let books;
// this is a global variable


async function renderBooks(filter) {
  const booksWrapper = document.querySelector(".books");

  booksWrapper.classList += ' books__loading';
  // the body's class is a long string
  // in order to add a class to it, we need an empty space before it
  if (!books) {
    books = await getBooks();
    // We've accounted for an 'if there are books' state
    // whereas we don't have to wait 1sec.
  }

  booksWrapper.classList.remove('books__loading');

  if (filter === "LOW_TO_HIGH") {
    // books.sort() returns the sorted array
    // also we're taking whatever exists when we're sorting from high to low or low to high
    // so if originalPrice exists we take that OR if salePrice exists then we take that
    const filteredBooks = books.sort(
      (a, b) =>
        (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)
    );
  } else if (filter === "HIGH_TO_LOW") {
    const filteredBooks = books.sort(
      (a, b) =>
        (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)
    );
  } else if (filter === "RATING") {
    const filteredBooks = books.sort((a, b) => a.rating - b.rating);
  }

  const booksHtml = books
    .map((book) => {
      return `<div class="book">
  <figure class="book__image--wrapper">
    <img class="book__img" src="${book.url}" alt="">
  </figure>
  <div class="book__title">
    ${book.title}
  </div>
  <div class="book__ratings">
    ${ratingsHTML(book.rating)}
  </div>
  <div class="book__price">
    ${priceHTML(book.originalPrice, book.salePrice)}
  </div>
</div>`;
    })
    .join("");

  booksWrapper.innerHTML = booksHtml;
}

function priceHTML(originalPrice, salePrice) {
  if (!salePrice) {
    return `$${originalPrice.toFixed(2)}`;
  } else {
    return `<span class="book__price--normal">$${originalPrice.toFixed(
      2
    )}</span> ${salePrice.toFixed(2)}`;
  }
}

function ratingsHTML(rating) {
  let ratingHTML = "";
  for (let i = 0; i < Math.floor(rating); i++) {
    // keep in mind there's also Math.ceil if that's required
    ratingHTML += '<i class="fa-solid fa-star"></i>';
  }
  if (!Number.isInteger(rating)) {
    ratingHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
  }
  return ratingHTML;
}

function filterBooks(event) {
  // need to reorder the books from the above html
  // the 'books' array needs to be in a different order
  // need to map the different ordered books, and pass the filter in 'renderBooks'
  renderBooks(event.target.value);
}

// by default setTimeout pushes everything inside of the function all the way to
// the end of the event loop
setTimeout(() => {
  renderBooks();
});
// FAKE DATA
function getBooks() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Calling the setTimeout after 1sec/1000ms, and then after that 1sec,
      // we're going to resolve our array.
      // So when we call this promise, after 1 sec, it will give us the array of objects below.
      // Don't need 'reject' in this case, as we're resolving, (refer to notes in notion).
      // Normal API's in the second just fetch data from the database, so
      // obviously this takes time and that's why there are loading states.
      // Remember to return your promise.
      // If you logged out 'getBooks()'/or 'books', it would return the promise with the
      // promise result***. Our array is in this 'promise result'.
      // In order for us to get access to our array in the promise, we NEED to wait for the
      // promise to resolve (reach a state which indicates a successful completion of the promise)
      // So use 'async' and 'await'
      // Now we can add a UI? before it loads.

      resolve([
        {
          id: 1,
          title: "Crack the Coding Interview",
          url: "Assets/crack the coding interview.png",
          originalPrice: 49.95,
          salePrice: 14.95,
          rating: 4.5,
        },
        {
          id: 2,
          title: "Atomic Habits",
          url: "Assets/atomic habits.jpg",
          originalPrice: 39,
          salePrice: null,
          rating: 5,
        },
        {
          id: 3,
          title: "Deep Work",
          url: "assets/deep work.jpeg",
          originalPrice: 29,
          salePrice: 12,
          rating: 5,
        },
        {
          id: 4,
          title: "The 10X Rule",
          url: "assets/book-1.jpeg",
          originalPrice: 44,
          salePrice: 19,
          rating: 4.5,
        },
        {
          id: 5,
          title: "Be Obsessed Or Be Average",
          url: "assets/book-2.jpeg",
          originalPrice: 32,
          salePrice: 17,
          rating: 4,
        },
        {
          id: 6,
          title: "Rich Dad Poor Dad",
          url: "assets/book-3.jpeg",
          originalPrice: 70,
          salePrice: 12.5,
          rating: 5,
        },
        {
          id: 7,
          title: "Cashflow Quadrant",
          url: "assets/book-4.jpeg",
          originalPrice: 11,
          salePrice: 10,
          rating: 4,
        },
        {
          id: 8,
          title: "48 Laws of Power",
          url: "assets/book-5.jpeg",
          originalPrice: 38,
          salePrice: 17.95,
          rating: 4.5,
        },
        {
          id: 9,
          title: "The 5 Second Rule",
          url: "assets/book-6.jpeg",
          originalPrice: 35,
          salePrice: null,
          rating: 3.5,
        },
        {
          id: 10,
          title: "Your Next Five Moves",
          url: "assets/book-7.jpg",
          originalPrice: 40,
          salePrice: null,
          rating: 4,
        },
        {
          id: 11,
          title: "Mastery",
          url: "assets/book-8.jpeg",
          originalPrice: 30,
          salePrice: null,
          rating: 4.5,
        },
      ]);
    }, 1000);
  });
  return;
}
