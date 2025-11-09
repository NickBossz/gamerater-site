package com.nick.RaterBack.usuario;

import com.nick.RaterBack.usuario.enums.Cargo;
import jakarta.persistence.Enumerated;

public record DadosListarUsuario(String usuario, @Enumerated Cargo cargo) {

    public DadosListarUsuario(Usuario user){
        this(user.getUsuario(), user.getCargo());
    }

}
