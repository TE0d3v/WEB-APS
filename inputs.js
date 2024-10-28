class Item {
  constructor(type, title, author, year, quantity) {
    this.type = type;
    this.title = title;
    this.author = author;
    this.year = year;
    this.quantity = quantity;
    this.available = quantity;
  }

  borrowItem() {
    if (this.available > 0) {
      this.available--;
      return true;
    }
    return false;
  }

  returnItem() {
    this.available++;
  }
}

class User {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.borrowedItems = 0;
  }

  getReturnDays() {
    return this.type === "Aluno" ? 15 : 30;
  }

  getLateFee(daysLate) {
    const dailyFee = 2;
    return daysLate * dailyFee;
  }

  canBorrow() {
    if (this.type === "Visitante") {
      alert("Visitantes apenas podem consultar itens.");
      return false;
    }
    const limit = this.type === "Aluno" ? 3 : 5;
    return this.borrowedItems < limit;
  }

  borrowItem() {
    this.borrowedItems++;
  }

  returnBorrowedItem() {
    this.borrowedItems--;
  }
}

class Loan {
  constructor(item, user, loanDate, returnDate) {
    this.item = item;
    this.user = user;
    this.loanDate = loanDate;
    this.returnDate = returnDate;
    this.returned = false;
  }

  returnItem() {
    this.returned = true;
  }

  calculateLateFee() {
    const today = new Date();
    const daysLate = Math.ceil((today - this.returnDate) / (1000 * 60 * 60 * 24));
    return daysLate > 0 ? this.user.getLateFee(daysLate) : 0;
  }
}

const items = [];
const users = [];
const loans = [];

function addItem() {
  const type = document.getElementById("item-type").value;
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;
  const quantity = parseInt(document.getElementById("quantity").value);

  const newItem = new Item(type, title, author, year, quantity);
  items.push(newItem);

  updateItemTable();
}

function addUser() {
  const name = document.getElementById("user-name").value;
  const type = document.getElementById("user-type").value;

  const newUser = new User(name, type);
  users.push(newUser);

  alert(`${name} foi adicionado(a) como ${type}.`);
  updateUserList();
}

function updateUserList() {
  const userList = document.getElementById("user-list");
  userList.innerHTML = "";

  users.forEach(user => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<span>${user.name} (${user.type})</span> Itens Emprestados: ${user.borrowedItems}`;
    userList.appendChild(listItem);
  });
}

function updateItemTable() {
  const tableBody = document.getElementById("items-table").querySelector("tbody");
  tableBody.innerHTML = "";

  items.forEach(item => {
    const row = document.createElement("tr");
    row.classList.add(item.available > 0 ? "status-disponivel" : "status-emprestado");

    row.innerHTML = `
      <td class="item-${item.type.toLowerCase()}">${item.type}</td>
      <td>${item.title}</td>
      <td>${item.author}</td>
      <td>${item.year}</td>
      <td>${item.available}</td>
      <td>
        <button onclick="borrowItem('${item.title}')">Emprestar</button>
        <button onclick="returnItem('${item.title}')">Devolver</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function borrowItem(title) {
  const item = items.find(i => i.title === title);
  const userName = prompt("Digite o nome do usuário:");

  const user = users.find(u => u.name === userName);
  if (!user || !item) {
    alert("Usuário ou item não encontrado.");
    return;
  }

  if (!user.canBorrow() || !item.borrowItem()) {
    alert("Empréstimo não autorizado.");
    return;
  }

  const loanDate = new Date();
  const returnDate = new Date(loanDate);
  returnDate.setDate(loanDate.getDate() + user.getReturnDays());

  const newLoan = new Loan(item, user, loanDate, returnDate);
  loans.push(newLoan);

  user.borrowItem();
  updateItemTable();
  updateUserList();
}

function returnItem(title) {
  const item = items.find(i => i.title === title);
  const userName = prompt("Digite o nome do usuário para devolver:");

  const user = users.find(u => u.name === userName);
  const loan = loans.find(l => l.item.title === title && l.user.name === userName && !l.returned);

  if (!loan) {
    alert("Empréstimo não encontrado.");
    return;
  }

  const lateFee = loan.calculateLateFee();
  loan.returnItem();
  item.returnItem();
  user.returnBorrowedItem();

  updateItemTable();
  updateUserList();

  alert(lateFee > 0 ? `Item devolvido com multa de: ${lateFee} unidades.` : "Item devolvido com sucesso.");
}


