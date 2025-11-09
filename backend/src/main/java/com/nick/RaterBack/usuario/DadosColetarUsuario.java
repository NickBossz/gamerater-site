package com.nick.RaterBack.usuario;

import com.nick.RaterBack.usuario.enums.Cargo;
import jakarta.persistence.Enumerated;

public record DadosColetarUsuario(String usuario, String senha, @Enumerated Cargo cargo) {

    public DadosColetarUsuario(Usuario usuario){
        this(usuario.getUsuario(), usuario.getSenha(), usuario.getCargo());
    }

}
