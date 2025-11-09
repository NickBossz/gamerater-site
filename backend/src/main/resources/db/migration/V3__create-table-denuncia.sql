create table denuncia(
    id bigint not null auto_increment,
    feitapor varchar(100) not null,
    motivodenuncia text not null,
    avaliacao bigint,
    primary key(id)
);