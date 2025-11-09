create table avaliacao(
    id bigint not null auto_increment,
    nomedojogo varchar(100) not null,
    avaliacao text not null,
    estrela tinyint not null,
    usuarioqueenviou varchar(100) not null,
    primary key(id)
);