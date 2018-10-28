CREATE SCHEMA if not exists main
  AUTHORIZATION postgres;

create table if not exists main.cls_base_classifier
(
    name character varying(255) NOT NULL,
    code character varying(32) NOT NULL
)
;
create table if not exists main.cls_role(
   id BIGSERIAL PRIMARY KEY
)
INHERITS (main.cls_base_classifier)
;
create table if not exists main.cls_user(
   id BIGSERIAL PRIMARY KEY,
   id_role integer NOT NULL,
   viber_id character varying(255),
   CONSTRAINT fk_id_role FOREIGN KEY (id_role)
      REFERENCES main."cls_role" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
INHERITS (main.cls_base_classifier)
;
create table if not exists main.cls_room(
   id BIGSERIAL PRIMARY KEY,
   id_user integer NOT NULL,
   name character varying(255) NOT NULL,
   CONSTRAINT fk_id_user FOREIGN KEY (id_user)
      REFERENCES main."cls_user" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
;
create table if not exists main.reg_room_balance(
   id BIGSERIAL PRIMARY KEY,
   id_room integer NOT NULL,
   date_create timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
   sum decimal(15,2) not null,
   CONSTRAINT fk_id_room FOREIGN KEY (id_room)
      REFERENCES main."cls_room" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
;