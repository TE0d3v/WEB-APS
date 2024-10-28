// Classe Item
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
    if (this.available < this.quantity) this.available++;
  }
}

// Classe User
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
    if (this.borrowedItems > 0) this.borrowedItems--;
  }
}

// Classe Loan
class Loan {
  constructor(item, user, loanDate) {
    this.item = item;
    this.user = user;
    this.loanDate = loanDate;
    this.returnDate = new Date(loanDate);
    this.returnDate.setDate(loanDate.getDate() + user.getReturnDays());
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

// Arrays para armazenamento
const items = [];
const users = [];
const loans = [];

// Função para adicionar itens
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

// Função para adicionar usuários
function addUser() {
  const name = document.getElementById("user-name").value;
  const type = document.getElementById("user-type").value;

  const newUser = new User(name, type);
  users.push(newUser);

  alert(`${name} foi adicionado(a) como ${type}.`);
  updateUserList();
}

// Função para atualizar a lista de usuários
function updateUserList() {
  const userListContainer = document.getElementById("user-list");

  if (!userListContainer) {
    console.error("Elemento com id 'user-list' não encontrado.");
    return;
  }

  userListContainer.innerHTML = users.length === 0 
    ? "<p>Nenhum usuário cadastrado.</p>" 
    : users.map(user => `
      <div class="user-item">
        <h3>${user.name} (${user.type})</h3>
        <div class="borrowed-items">
          <strong>Itens emprestados:</strong>
          <ul>
            ${user.borrowedItems > 0 ? `<li>${user.borrowedItems} itens</li>` : '<li>Nenhum item emprestado</li>'}
          </ul>
        </div>
      </div>
    `).join('');
}

// Função para atualizar a tabela de itens
function updateItemTable() {
  const tableBody = document.getElementById("items-table").querySelector("tbody");
  tableBody.innerHTML = items.map(item => `
    <tr class="${item.available > 0 ? "status-disponivel" : "status-emprestado"}">
      <td class="item-${item.type.toLowerCase()}">${item.type}</td>
      <td>${item.title}</td>
      <td>${item.author}</td>
      <td>${item.year}</td>
      <td>${item.available}</td>
      <td>
        <button onclick="borrowItem('${item.title}')">Emprestar</button>
        <button onclick="returnItem('${item.title}')">Devolver</button>
      </td>
    </tr>
  `).join('');
}

// Função para emprestar um item
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
  loans.push(new Loan(item, user, loanDate));

  user.borrowItem();
  updateItemTable();
  updateUserList();
}

// Função para devolver um item
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


