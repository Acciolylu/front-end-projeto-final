/*package br.edu.ifba.demo.frontend.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import br.edu.ifba.demo.frontend.dto.LivroDTO;

@Service

public class LivroService {

    private final String BACK_URL = "http://localhost:8081/livros";

    private final RestTemplate restTemplate = new RestTemplate();

    public List<LivroDTO> listAll() {
        return List.of(restTemplate.getForObject(BACK_URL + "/listall", LivroDTO[].class));
    }

    public LivroDTO getById(Long id) {
        return restTemplate.getForObject(BACK_URL + "/findById/" + id, LivroDTO.class);
    }

    public LivroDTO getByIsbn(String isbn) {
        return restTemplate.getForObject(BACK_URL + "/findByIsbn/" + isbn, LivroDTO.class);
    }

    public LivroDTO getByTitulo(String titulo) {
        return restTemplate.getForObject(BACK_URL + "/findByTitulo/" + titulo, LivroDTO.class);
    }

    public LivroDTO save(LivroDTO livro) {
        return restTemplate.postForObject(BACK_URL, livro, LivroDTO.class);
    }

    public void delete(Long id) {
        restTemplate.delete(BACK_URL + "/delete/" + id);
    }
    
}*/
    

