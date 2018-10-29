
insert into main.cls_user(code, name, id_role, viber_id) values
('user_1', 'user_1', (select id from main.cls_role where code = 'USER' fetch first 1 rows only),'Fg0PzdflNiISC2ztCsjEGQ==')
;
insert into main.cls_room(id_user, name) values
((select id from  main.cls_user where code = 'user_1' fetch first 1 rows only), 'ул. Тестовая 1 кв. 100')
;
insert into main.reg_room_balance(id_room, date_create, sum) values
( (select id from main.cls_room where name = 'ул. Тестовая 1 кв. 100' fetch first 1 rows only),
  '2018-05-22 21:25:35.96701', 1890.11
),
( (select id from main.cls_room where name = 'ул. Тестовая 1 кв. 100' fetch first 1 rows only),
  '2018-06-22 21:25:35.96701', 2890.11
),
( (select id from main.cls_room where name = 'ул. Тестовая 1 кв. 100' fetch first 1 rows only),
  '2018-07-22 21:25:35.96701', 3890.11
),
( (select id from main.cls_room where name = 'ул. Тестовая 1 кв. 100' fetch first 1 rows only),
  '2018-08-22 21:25:35.96701', 4890.11
),
( (select id from main.cls_room where name = 'ул. Тестовая 1 кв. 100' fetch first 1 rows only),
  '2018-09-22 21:25:35.96701', 5890.11
),
( (select id from main.cls_room where name = 'ул. Тестовая 1 кв. 100' fetch first 1 rows only),
  '2018-10-22 21:25:35.96701', 2390.11
)
;