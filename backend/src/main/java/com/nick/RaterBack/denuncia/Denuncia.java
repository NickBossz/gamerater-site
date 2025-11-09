package com.nick.RaterBack.denuncia;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "denuncias")
@Table(name = "denuncia")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Getter
@Setter
public class Denuncia {

    public Denuncia(DadosCriarDenuncia dados){
        this.feitapor = dados.feitapor();
        this.avaliacao = dados.avaliacao();
        this.motivodenuncia = dados.motivodenuncia();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String feitapor;
    private String motivodenuncia;
    private Long avaliacao;


}
