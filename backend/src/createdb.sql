CREATE SCHEMA "Konecta";

create table "Konecta".usuarios (
	id serial4 not null,
	nombre varchar(100) not null,
	correo varchar(100) not null,
	contrasena varchar(255) not null,
	rol varchar(50) not null,
	constraint usuarios_correo_key unique (correo),
	constraint usuarios_pkey primary key (id)
);

CREATE TABLE "Konecta".empleado (
	id int4 DEFAULT nextval('"Konecta".usuarios_id_seq'::regclass) NOT NULL,
	fecha_ingreso date NULL,
	nombre varchar(50) NULL,
	salario numeric NULL,
	CONSTRAINT empleado_pk PRIMARY KEY (id)
);

CREATE TABLE "Konecta".solicitud (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	codigo varchar(50) NULL,
	descripcion varchar(50) NULL,
	resumen varchar(50) NULL,
	id_empleado int4 NULL,
	CONSTRAINT solicitud_pkey PRIMARY KEY (id)
);

ALTER TABLE "Konecta".solicitud ADD CONSTRAINT solicitud_empleado_fk FOREIGN KEY (id_empleado) REFERENCES "Konecta".empleado(id);
