package com.nick.RaterBack.avaliacao;

public record DadosListarAvaliacao(
        String nomedojogo,
        String avaliacao,
        String usuarioqueenviou,
        Long id,
        Byte estrela
) {

    public DadosListarAvaliacao(Avaliacao avaliacao){
        this(avaliacao.getNomedojogo(), avaliacao.getAvaliacao(), avaliacao.getUsuarioqueenviou(), avaliacao.getId(),avaliacao.getEstrela());
    }

}
