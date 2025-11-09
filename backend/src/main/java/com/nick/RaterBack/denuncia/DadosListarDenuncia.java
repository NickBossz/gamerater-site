package com.nick.RaterBack.denuncia;

public record DadosListarDenuncia(
        String feitapor,
        String motivodenuncia,
        Long avaliacao,
        Long id
) {

    public DadosListarDenuncia(Denuncia denuncia){
        this(denuncia.getFeitapor(), denuncia.getMotivodenuncia(), denuncia.getAvaliacao(), denuncia.getId());
    }

}
