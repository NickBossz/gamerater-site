package com.nick.RaterBack.usuario;

import com.nick.RaterBack.usuario.enums.Cargo;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public record DadosCriarUsuario(
        String usuario,
        String senha,

        @Enumerated(EnumType.STRING)
        Cargo cargo
) {
}
