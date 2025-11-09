package com.nick.RaterBack.controllers;

import com.nick.RaterBack.avaliacao.Avaliacao;
import com.nick.RaterBack.avaliacao.AvaliacaoRepository;
import com.nick.RaterBack.avaliacao.DadosCriarAvaliacao;
import com.nick.RaterBack.avaliacao.DadosListarAvaliacao;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/avaliacoes")
public class AvaliacaoController {

    @Autowired
    private AvaliacaoRepository repository;

    @Transactional
    @PostMapping
    public void criar(@RequestBody DadosCriarAvaliacao dados){
        repository.save(new Avaliacao(dados));
    }

    @GetMapping
    public List<DadosListarAvaliacao> listar(){
        return repository.findAll().stream().map(DadosListarAvaliacao::new).toList();
    }

    @GetMapping("/{id}")
    public DadosListarAvaliacao getById(@PathVariable Long id){
        var avaliacao = repository.getReferenceById(id);
        return new DadosListarAvaliacao(avaliacao);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id){
        repository.delete(repository.getReferenceById(id));
    }

}
