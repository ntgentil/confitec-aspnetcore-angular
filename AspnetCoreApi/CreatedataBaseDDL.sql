CREATE DATABASE confite_api;
GO;

CREATE TABLE confite_api.dbo.Usuarios (
	Id int NOT NULL,
	Nome varchar(25) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Sobrenome varchar(25) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Email varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	DataNascimento datetime NULL,
	DataCadastro datetime NULL,
	IdEscolaridade int NOT NULL,
	CONSTRAINT PK__Usuario__3214EC07034ADB74 PRIMARY KEY (Id)
) GO;

ALTER TABLE confite_api.dbo.Usuarios ADD CONSTRAINT Usuarios_FK FOREIGN KEY (IdEscolaridade) REFERENCES confite_api.dbo.Escolaridade(Id) GO;;