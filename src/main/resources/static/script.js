const API_URL = "http://localhost:8081/livros";
    
      
    async function addLivro() {
        const livro = {
          titulo: document.getElementById("titulo").value,
          autor: document.getElementById("autor").value,
          isbn: document.getElementById("isbn").value,
          ano_publicacao: document.getElementById("ano_publicacao").value,
          editora: document.getElementById("editora").value,
          sinopse: document.getElementById("sinopse").value,
          idioma: document.getElementById("idioma").value,
          preco: document.getElementById("preco").value,
          genero: document.getElementById("genero").value,
          num_paginas: document.getElementById("num_paginas").value
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


      async function listarLivros() {
        const response = await fetch(`${API_URL}/listall`);
        const livros = await response.json();

        const tabelaCorpo = document.getElementById("tabelaCorpo");
        tabelaCorpo.innerHTML = "";

        livros.forEach((livro) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                    <td>${livro.id_livro}</td>
                    <td>${livro.titulo}</td>
                    <td>${livro.autor}</td>
                    
                   <td>
                        <button 
                            onclick="consultarPorId2(${livro.id_livro})" 
                            style="background-color: ; color: white; cursor: pointer; font-size: 14px; font-weight: bold; !important;">
                            Detalhes
                        </button>
                        <button 
                            onclick="deletarLivro(${livro.id_livro})" 
                            style="background-color: red; color: white; border: none; padding: 10px 20px; cursor: pointer; font-size: 14px; font-weight: bold; !important;">
                            Deletar
                        </button>
                    </td>
                `;
          tabelaCorpo.appendChild(row);
        });
      }

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

      async function consultarPorId() {
        const id = document.getElementById("idConsulta").value;
        const response = await fetch(`${API_URL}/${id}`);
        const livro = await response.json();

        if (livro) {
          mostrarDetalhes(livro);
        } else {
          alert("Livro não encontrado.");
        }
      }

      async function consultarPorId2(ID) {
        const response = await fetch(`${API_URL}/${ID}`);
        const livro = await response.json();

        if (livro) {
          mostrarDetalhes(livro);

       
          window.scrollTo(0, document.body.scrollHeight);
        } else {
          alert("Livro não encontrado.");
        }
      }


      async function consultarPorIsbn() {
        const isbn = document.getElementById("isbnConsulta").value;
        const response = await fetch(`${API_URL}/isbn/${isbn}`);
        const livro = await response.json();

        if (livro) {
          mostrarDetalhes(livro);
        } else {
          alert("Livro não encontrado.");
        }
      }


      async function consultarPorTitulo() {
        const titulo = document.getElementById("tituloConsulta").value;
        const response = await fetch(`${API_URL}/titulo/${titulo}`);
        const livros = await response.json();

        if (livros.length > 0) {
          mostrarDetalhes(livros[0]);
        } else {
          alert("Livro não encontrado.");
        }
      }

  
      function mostrarDetalhes(livro) {
        const detalhesDiv = document.getElementById("detalhesLivro");

        detalhesDiv.innerHTML = `
        <h3>Detalhes do Livro</h3>
        <p><strong>Título:</strong> ${livro.titulo}</p>
        <p><strong>Autor:</strong> ${livro.autor}</p>
        <p><strong>ISBN:</strong> ${livro.isbn}</p>
        <p><strong>Gênero:</strong> ${livro.genero}</p>
        <p><strong>Idioma:</strong> ${livro.idioma}</p>
        <p><strong>Preço:</strong> ${livro.preco}</p>
        <p><strong>Número de Páginas:</strong> ${livro.num_paginas}</p>
        <p><strong>Editora:</strong> ${livro.editora}</p>
        <p><strong>Ano de Publicação:</strong> ${livro.ano_publicacao}</p>
        <p><strong>Sinopse:</strong> ${livro.sinopse}</p>
    `;
      }

  
      window.onload = listarLivros;