document.getElementById('new-book').addEventListener('click', () => {
    const formContainer = document.getElementById('form-container');
    if(!formContainer.classList.contains('hidden')) {
        formContainer.classList.add('hidden');
    } else {
        formContainer.classList.remove('hidden');
    }
})

let myLibrary = [];
let removedFromLibrary = [];
let bookInfo = ['title', 'author', 'pages', 'haveIRead'];

const tableBody = document.getElementById('table-body');

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

Book.prototype.haveIRead = function(readOrNo) {
    if(readOrNo == 'no') {
        this.haveIRead = 'I have not read it';
        } else {
        this.haveIRead = 'I have read it';
        }
}

document.getElementById('submit-button').addEventListener('click', (event) => {
    event.preventDefault();

    addBookToLibrary();

    const inputFields = document.getElementsByTagName('input');
    for (let i = 0; i < inputFields.length; i++) {
        inputFields[i].value = '';
    }
})


function addBookToLibrary() {

    const myTitle = document.getElementsByTagName('input')[0].value;
    const myAuthor = document.getElementsByTagName('input')[1].value;
    const myPages = document.getElementsByTagName('input')[2].value;
    const checkedRadioButtons = document.querySelectorAll('input[type="radio"]:checked');
    const haveIReadBook = Array.from(checkedRadioButtons).map((radio) => radio.value);

    const myBook = new Book(myTitle, myAuthor, myPages);
    myBook.haveIRead(haveIReadBook);

    myLibrary.push(myBook);

    loopArray();

}

function loopArray() {

    let i = 0;

    const tableRow = document.createElement('tr');
    tableBody.appendChild(tableRow);

    myLibrary.forEach((book) => {
        for(let j = 0; j < 4; j++) {
            const tableData = document.createElement('td');
            tableRow.appendChild(tableData);
            tableData.textContent = book[bookInfo[i]];

            i++;
        }
        j = 0;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Delete book';
        tableRow.appendChild(removeButton);

        removeButton.addEventListener('click', (event) => {
            event.target.parentNode.remove();
        });

        const readStatusButton = document.createElement('button');
        readStatusButton.textContent = 'Change read status';
        tableRow.appendChild(readStatusButton);

        readStatusButton.addEventListener('click', (event) => {
            const buttonParent = event.target.parentNode;
            const readStatus = buttonParent.children[3];
            if(readStatus.textContent == 'I have not read it') {
                readStatus.textContent = 'I have read it';
            } else {
                readStatus.textContent = 'I have not read it';
            }
        });
    })
    removedFromLibrary.push(myLibrary[0]);
    myLibrary = [];

}