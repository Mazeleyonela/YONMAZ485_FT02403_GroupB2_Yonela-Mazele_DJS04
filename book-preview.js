import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';
import './book-preview.js'; // Import the custom element definition

let page = 1;
let matches = books;

const createBookPreviewElement = (book) => {
    const { author, id, image, title } = book;
    const element = document.createElement('book-preview');
    element.data = {
        id,
        image,
        title,
        authorName: authors[author]
    };
    return element;
};

// Initial Render
const starting = document.createDocumentFragment();
for (const book of matches.slice(0, BOOKS_PER_PAGE)) {
    starting.appendChild(createBookPreviewElement(book));
}
document.querySelector('[data-list-items]').appendChild(starting);

// Other parts of your code...

document.querySelector('[data-list-button]').addEventListener('click', () => {
    const fragment = document.createDocumentFragment();
    for (const book of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        fragment.appendChild(createBookPreviewElement(book));
    }
    document.querySelector('[data-list-items]').appendChild(fragment);
    page += 1;
});

document.querySelector('[data-list-items]').addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
        if (active) break;
        if (node?.dataset?.preview) { active = node.dataset.preview }
    }

    if (!active) return;

    const book = books.find(book => book.id === active);
    if (!book) return;

    document.querySelector('[data-list-active]').open = true;
    document.querySelector('[data-list-blur]').src = book.image;
    document.querySelector('[data-list-image]').src = book.image;
    document.querySelector('[data-list-title]').innerText = book.title;
    document.querySelector('[data-list-subtitle]').innerText = `${authors[book.author]} (${new Date(book.published).getFullYear()})`;
    document.querySelector('[data-list-description]').innerText = book.description;
});
