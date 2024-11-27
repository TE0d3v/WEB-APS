# WEB-APS 📚

Sistema de Gestão de Biblioteca com Interface Web desenvolvido para a disciplina de **Análise e Desenvolvimento de Sistemas**.

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estruturação da página.
- **CSS3**: Estilização responsiva e design intuitivo.
- **JavaScript**: Lógica para gerenciamento de itens, usuários e controle de empréstimos.

## 🎨 Funcionalidades

1. **Gerenciamento de Itens**
   - Adicionar, listar e categorizar itens (livros, revistas, DVDs).
   - Verificação de disponibilidade e status (disponível/emprestado).

2. **Gerenciamento de Usuários**
   - Cadastro de diferentes tipos de usuários: Aluno, Professor e Visitante.
   - Limitações de empréstimos por tipo de usuário.

3. **Empréstimos e Devoluções**
   - Controle de disponibilidade e atualização dinâmica de exemplares.
   - Cálculo de prazos de devolução e aplicação de multas em caso de atraso.

4. **Interface Web**
   - Formulários para cadastro de itens e usuários.
   - Tabela interativa para listagem de itens com opções de ação.
   - Layout responsivo utilizando Flexbox/Grid.

## 🚀 Como Executar

1. Clone o repositório:

   ```bash
   git clone https://github.com/TE0d3v/WEB-APS.git

## 📂 Estrutura do Projeto

WEB-APS/

├── index.html &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ***Estrutura HTML da página***

├── style.css  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ***Estilização CSS***

├── script.js  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ***Lógica JavaScript para funcionalidades***

└── README.md &nbsp; ***Documentação do projeto***

## 📚 Descrição Técnica 

- **Classes JavaScript** para gerenciamento de itens (livros, revistas, DVDs) e usuários (alunos, professores, visitantes).

- **Verificação dinâmica** de disponibilidade de itens e cálculo automático de prazos de devolução.

- **Estilização diferenciada** para cada tipo de item e statu
   - Verde para livros, azul para revistas e roxo para DVDs.
   -  Itens disponíveis e emprestados exibidos com cores distintas.
  
- **Responsividade** implementada com Flexbox e Grid para garantir uma interface intuitiva em diferentes tamanhos de tela.

## 📝 Requisitos Implementados
- Cadastro e gerenciamento de itens e usuários por meio de formulários interativos.
- Controle de empréstimos com limites específicos para cada tipo de usuário:
  - Alunos podem emprestar até 3 itens.
  - Professores podem emprestar até 5 itens.
  - Visitantes podem apenas consultar itens.
- Geração automática de multas em caso de atraso na devolução:
  - 15 dias para alunos.
  - 30 dias para professores.
