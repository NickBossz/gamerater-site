create table usuario(
    id bigint not null auto_increment,
    usuario varchar(100) not null,
    senha text not null,
    cargo varchar(30),
    primary key(id)
);