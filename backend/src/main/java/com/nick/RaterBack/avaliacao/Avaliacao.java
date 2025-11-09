package com.nick.RaterBack.avaliacao;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "avaliacao")
@Entity(name = "avaliacoes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Avaliacao {

    public Avaliacao(DadosCriarAvaliacao dados){
        this.estrela = dados.estrela();
        this.avaliacao = dados.avaliacao();
        this.nomedojogo = dados.nomedojogo();
        this.usuarioqueenviou = dados.usuarioqueenviou();
    }

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Byte estrela;

    private String avaliacao;
    private String nomedojogo;
    private String usuarioqueenviou;


}
