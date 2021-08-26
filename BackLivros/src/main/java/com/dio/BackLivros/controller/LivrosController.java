package com.dio.BackLivros.controller;

import com.dio.BackLivros.exceptions.ResourceNotFoundException;
import com.dio.BackLivros.model.Livros;
import com.dio.BackLivros.repository.LivrosRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("")
public class LivrosController {

    @Autowired
    private LivrosRepository livrosRepository;

    @GetMapping("/livros")
    public List<Livros> getAllLivros(){
        return livrosRepository.findAll();
    }

    @GetMapping("/livros/{id}")
    public ResponseEntity<Livros> getLivroById (@PathVariable(value = "id") Long livroId)
            throws ResourceNotFoundException {
        Livros livros = livrosRepository.findById(livroId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found ::" + livroId));
        return ResponseEntity.ok().body(livros);
    }

    @PostMapping("/livros")
    public Livros createLivros (@Valid @RequestBody Livros livros){
        return livrosRepository.save(livros);
    }

    @PutMapping("/livros/{id}")
    public ResponseEntity<Livros> updateLivro(@PathVariable (value = "id") Long livroId, @Valid @RequestBody Livros livroDetails)
            throws ResourceNotFoundException{
        Livros livros = livrosRepository.findById(livroId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found for this id::" + livroId));
        livros.setTitulo(livroDetails.getTitulo());
        livros.setAutor(livroDetails.getAutor());
        livros.setEditora(livroDetails.getEditora());
        livros.setUrlFoto(livroDetails.getUrlFoto());
        livros.setAnoLancamento(livroDetails.getAnoLancamento());
        livros.setDescricao(livroDetails.getDescricao());
        livros.setGenero(livroDetails.getGenero());
        final Livros updateLivro = livrosRepository.save(livros);
        return ResponseEntity.ok(updateLivro);
    }

    @DeleteMapping("/livros/{id}")
    public Map<String, Boolean> deleteLivro(@PathVariable(value = "id") Long livroId)
            throws ResourceNotFoundException{
        Livros livros = livrosRepository.findById(livroId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found for this id::" + livroId));
        livrosRepository.delete(livros);
        Map<String, Boolean> response = new HashMap< >();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
