package com.nick.RaterBack.usuario;

import com.nick.RaterBack.avaliacao.DadosCriarAvaliacao;
import com.nick.RaterBack.usuario.enums.Cargo;
import jakarta.persistence.*;
import lombok.*;

@Entity(name = "usuarios")
@Table(name = "usuario")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Getter
@Setter
public class Usuario {

    public Usuario(DadosCriarUsuario dados){
        this.usuario = dados.usuario();
        this.senha = dados.senha();
        this.cargo = Cargo.CLIENTE;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    private String usuario;
    private String senha;

    @Enumerated(EnumType.STRING)
    private Cargo cargo;

}
