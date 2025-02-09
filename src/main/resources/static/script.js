const API_URL = "http://localhost:8081/livros"; 
const API_URL2 = "http://localhost:8081/generos"; 

// Função para adicionar um novo livro
async function addLivro() {
  const livro = {
    titulo: document.getElementById("titulo").value,
    autor: document.getElementById("autor").value,
    isbn: document.getElementById("isbn").value,
    ano_publicacao: parseInt(document.getElementById("ano_publicacao").value), // Converter para número
    editora: document.getElementById("editora").value,
    sinopse: document.getElementById("sinopse").value,
    idioma: document.getElementById("idioma").value,
    preco: parseFloat(document.getElementById("preco").value), // Converter para número decimal
    genero: {
      id_genero: parseInt(document.getElementById("genero").value), // Converter para número
      nome_genero: "", // Pode ser omitido, pois o backend usa apenas o ID
      status: 1 // Status padrão
    },
    num_paginas: parseInt(document.getElementById("num_paginas").value) // Converter para número
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(livro),
  });

  if (response.ok) {
    alert("Livro cadastrado com sucesso!");
    listarLivros();
  } else {
    alert("Erro ao cadastrar o livro.");
  }
}

// Função para listar livros e gêneros
async function listarLivros() {
  const response = await fetch(`${API_URL}/listall`);
  const response2 = await fetch(`${API_URL2}/listall`);

  const generos = await response2.json();
  const livros = await response.json();

  const livrosCorpo = document.getElementById("livrosCorpo");
  livrosCorpo.innerHTML = ""; // Limpa a tabela de livros

  // Adicionar os livros
  livros.forEach((livro) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${livro.titulo}</td>
      <td>${livro.autor}</td>
      <td>${livro.ano_publicacao}</td>
      <td>${livro.num_paginas}</td>
      <td>${livro.preco}</td>
      <td>${livro.genero ? livro.genero.nome_genero : "N/A"}</td> <!-- Exibir o nome do gênero -->
      <td>
        <button class="btn-visualizar" onclick="mostrarDetalhes(${livro.id_livro})">
          Ver Detalhes
        </button>
        <button class="btn-editar" onclick="mostrarEditar(${livro.id_livro})">
          Atualizar
        </button>
        <button class="btn-deletar" onclick="deletarLivro(${livro.id_livro})">
          Deletar
        </button>
      </td>
    `;
    livrosCorpo.appendChild(row);
  });

  const generosCorpo = document.getElementById("generosCorpo");
  generosCorpo.innerHTML = ""; // Limpa a tabela de gêneros

  // Adicionar os gêneros
  generos.forEach((genero) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${genero.nome_genero}</td>
      <td>
        <button class="btn-visualizar" onclick="mostrarDetalhes2(${genero.id_genero})">
          Ver Detalhes
        </button>
        <button class="btn-editar" onclick="mostrarEditar2(${genero.id_genero})">
          Atualizar
        </button>
        <button class="btn-deletar" onclick="deletarGenero(${genero.id_genero})">
          Deletar
        </button>
      </td>
    `;
    generosCorpo.appendChild(row);
  });
}

// Função para deletar um gênero
async function deletarGenero(id) {
  const response = await fetch(`${API_URL2}/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    alert("Gênero deletado com sucesso!");
    listarLivros(); // Atualiza a lista de livros e gêneros
  } else {
    alert("Erro ao deletar o gênero.");
  }
}

// Função para preencher o formulário de atualização de livro
async function preencherFormularioAtualizacao(id) {
  const response = await fetch(`${API_URL}/${id}`);
  const livro = await response.json();

  document.getElementById("idLivroAtualizar").value = livro.id_livro;
  document.getElementById("tituloAtualizar").value = livro.titulo;
  document.getElementById("autorAtualizar").value = livro.autor;
  document.getElementById("generoAtualizar").value = livro.genero.id_genero; // ID do gênero
  document.getElementById("idiomaAtualizar").value = livro.idioma;
  document.getElementById("precoAtualizar").value = livro.preco;
  document.getElementById("num_paginasAtualizar").value = livro.num_paginas;
  document.getElementById("editoraAtualizar").value = livro.editora;
  document.getElementById("ano_publicacaoAtualizar").value = livro.ano_publicacao;
  document.getElementById("isbnAtualizar").value = livro.isbn;
  document.getElementById("sinopseAtualizar").value = livro.sinopse;
}

// Função para atualizar um livro
async function atualizarLivro() {
  const livroAtualizado = {
    id_livro: document.getElementById("idLivroAtualizar").value,
    titulo: document.getElementById("tituloAtualizar").value,
    autor: document.getElementById("autorAtualizar").value,
    genero: {
      id_genero: parseInt(document.getElementById("generoAtualizar").value), // ID do gênero
      nome_genero: "", // Pode ser omitido
      status: 1 // Status padrão
    },
    idioma: document.getElementById("idiomaAtualizar").value,
    preco: parseFloat(document.getElementById("precoAtualizar").value),
    num_paginas: parseInt(document.getElementById("num_paginasAtualizar").value),
    editora: document.getElementById("editoraAtualizar").value,
    ano_publicacao: parseInt(document.getElementById("ano_publicacaoAtualizar").value),
    isbn: document.getElementById("isbnAtualizar").value,
    sinopse: document.getElementById("sinopseAtualizar").value,
  };

  const idLivro = document.getElementById("idLivroAtualizar").value;

  const response = await fetch(`${API_URL}/${idLivro}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(livroAtualizado),
  });

  if (response.ok) {
    alert("Livro atualizado com sucesso!");
    listarLivros();
  } else {
    alert("Erro ao atualizar o livro.");
  }
}

// Função para deletar um livro
async function deletarLivro(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    alert("Livro deletado com sucesso!");
    listarLivros();
  } else {
    alert("Erro ao deletar o livro.");
  }
}

// Funções para redirecionar para páginas de detalhes ou edição
function mostrarDetalhes(id) {
  window.location.href = `/formLivro?id=${id}&modo=visualizar`;
}

function mostrarDetalhes2(id) {
  window.location.href = `/formGenero?id=${id}&modo=visualizar`;
}

function mostrarEditar(id) {
  window.location.href = `/formLivro?id=${id}&modo=editar`;
}

function mostrarEditar2(id) {
  window.location.href = `/formGenero?id=${id}&modo=editar`;
}

// Carregar livros e Gêneros ao iniciar a página
window.onload = listarLivros;