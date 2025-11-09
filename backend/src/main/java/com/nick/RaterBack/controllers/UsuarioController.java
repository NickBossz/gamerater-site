package com.nick.RaterBack.controllers;

import com.nick.RaterBack.usuario.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @PostMapping
    public ResponseEntity<Boolean> criar(@RequestBody DadosCriarUsuario dados){
        try {
            if (repository.findByUsuario(dados.usuario()) != null)
            {return ResponseEntity.ok(false);}

            repository.save(new Usuario(dados));
            return ResponseEntity.ok(true);

        } catch (Exception e) {
            return ResponseEntity.ok(false);
        }

    }

    @DeleteMapping("/{usuario}")
    public void excluir(@PathVariable String usuario){
        repository.delete(repository.findByUsuario(usuario));
    }

    @GetMapping
    public List<DadosListarUsuario> listar(){
        return repository.findAll().stream().map(DadosListarUsuario::new).toList();
    }

    @GetMapping("/{nome}")
    public DadosColetarUsuario getUsuarioByName(@PathVariable String nome) {
        try{
            var usuario = repository.findByUsuario(nome);
            if (usuario != null){
                return new DadosColetarUsuario(usuario);
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }


}
