CREATE OR REPLACE FUNCTION main.max_slice_room(pid_room int, pdate_create timestamp) RETURNS table(_id_room int, _date_create timestamp) AS
$$
BEGIN
  RETURN QUERY select id_room as _id_room, max(date_create) as _date_create from main.reg_room_balance
	where id_room = pid_room and date_create <= pdate_create
	group by _id_room;
END
$$ LANGUAGE plpgsql
;
CREATE OR REPLACE FUNCTION main.max_slice_room_balance(pid_room int, pdate_create timestamp)
RETURNS table(id bigint, id_room int, date_create timestamp, sum decimal(15,2)
) AS
$$
BEGIN
  RETURN QUERY select rrb.id as id, _id_room as id_room, _date_create as date_create, rrb.sum as sum
		from main.reg_room_balance as rrb
		inner join
		main.max_slice_room(pid_room, pdate_create)
		on rrb.id_room = _id_room and rrb.date_create = _date_create;
END
$$ LANGUAGE plpgsql
;
CREATE OR REPLACE FUNCTION main.max_slice_room_balance_info(pid_room int, pdate_create timestamp)
RETURNS table(
id bigint,
id_room int,
date_create timestamp,
sum decimal(15,2),
room_name character varying(255),
user_id bigint,
user_name character varying(255),
user_code character varying(32),
viber_id character varying(255)
) AS
$$
BEGIN
  RETURN QUERY select mslrb.*, r.name as room_name, u.id as user_id, u.name as user_name, u.code as user_code, u.viber_id as viber_id
		from main.max_slice_room_balance(pid_room, pdate_create) as mslrb
		inner join main.cls_room as r
		on mslrb.id_room = r.id
		inner join main.cls_user as u
		on r.id_user = u.id;
END
$$ LANGUAGE plpgsql
;
------ rooms ------
CREATE OR REPLACE FUNCTION main.max_slice_rooms(pdate_create timestamp) RETURNS table(_id_room int, _date_create timestamp) AS
$$
BEGIN
  RETURN QUERY select id_room as _id_room, max(date_create) as _date_create from main.reg_room_balance
	where date_create <= pdate_create
	group by _id_room;
END
$$ LANGUAGE plpgsql
;
CREATE OR REPLACE FUNCTION main.max_slice_rooms_balance(pdate_create timestamp)
RETURNS table(id bigint, id_room int, date_create timestamp, sum decimal(15,2)
) AS
$$
BEGIN
  RETURN QUERY select rrb.id as id, _id_room as id_room, _date_create as date_create, rrb.sum as sum
		from main.reg_room_balance as rrb
		inner join
		main.max_slice_rooms(pdate_create)
		on rrb.id_room = _id_room and rrb.date_create = _date_create;
END
$$ LANGUAGE plpgsql
;
CREATE OR REPLACE FUNCTION main.max_slice_rooms_balance_info(pviber_id character varying(255), pdate_create timestamp)
RETURNS table(
id bigint,
id_room int,
date_create timestamp,
sum decimal(15,2),
room_name character varying(255),
user_id bigint,
user_name character varying(255),
user_code character varying(32),
viber_id character varying(255)
) AS
$$
BEGIN
  RETURN QUERY select mslrb.*, r.name as room_name, u.id as user_id, u.name as user_name, u.code as user_code, u.viber_id as viber_id
		from main.max_slice_rooms_balance(pdate_create) as mslrb
		inner join main.cls_room as r
		on mslrb.id_room = r.id
		inner join main.cls_user as u
		on r.id_user = u.id
		where u.viber_id = pviber_id
		;
END
$$ LANGUAGE plpgsql
;