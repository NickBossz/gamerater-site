package com.nick.RaterBack.avaliacao;

public record DadosCriarAvaliacao
        (
                String nomedojogo,
                String avaliacao,
                String usuarioqueenviou,
                Byte estrela
        ) {
}
