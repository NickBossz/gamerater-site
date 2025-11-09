package com.nick.RaterBack.controllers;

import com.nick.RaterBack.denuncia.DadosCriarDenuncia;
import com.nick.RaterBack.denuncia.DadosListarDenuncia;
import com.nick.RaterBack.denuncia.Denuncia;
import com.nick.RaterBack.denuncia.DenunciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/denuncias")
public class DenunciaController {

    @Autowired
    private DenunciaRepository repository;

    @PostMapping
    public void criar(@RequestBody DadosCriarDenuncia dados){
        repository.save(new Denuncia(dados));
    }

    @GetMapping
    public List<DadosListarDenuncia> listar(){
        return repository.findAll().stream().map(DadosListarDenuncia::new).toList();
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        repository.delete(repository.getReferenceById(id));
    }

    @GetMapping("/{id}")
    public DadosListarDenuncia getByID(@PathVariable Long id){
        return new DadosListarDenuncia(repository.getReferenceById(id));
    }

}
