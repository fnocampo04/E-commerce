TYPE=VIEW
query=select `avellana`.`producto`.`id_prod` AS `id_prod`,`avellana`.`producto`.`nombre` AS `nombre`,`avellana`.`producto`.`valor_venta` AS `valor_venta`,`avellana`.`producto`.`descri` AS `descri`,`avellana`.`producto`.`categoria` AS `categoria`,`avellana`.`producto`.`valor_base` AS `valor_base` from `avellana`.`producto` join `avellana`.`ropa` where `avellana`.`producto`.`id_prod` = `avellana`.`ropa`.`id_prod` union select `avellana`.`producto`.`id_prod` AS `id_prod`,`avellana`.`producto`.`nombre` AS `nombre`,`avellana`.`producto`.`valor_venta` AS `valor_venta`,`avellana`.`producto`.`descri` AS `descri`,`avellana`.`producto`.`categoria` AS `categoria`,`avellana`.`producto`.`valor_base` AS `valor_base` from `avellana`.`producto` join `avellana`.`pantalon` where `avellana`.`producto`.`id_prod` = `avellana`.`pantalon`.`id_prod` union select `avellana`.`producto`.`id_prod` AS `id_prod`,`avellana`.`producto`.`nombre` AS `nombre`,`avellana`.`producto`.`valor_venta` AS `valor_venta`,`avellana`.`producto`.`descri` AS `descri`,`avellana`.`producto`.`categoria` AS `categoria`,`avellana`.`producto`.`valor_base` AS `valor_base` from `avellana`.`producto` join `avellana`.`zapatos` where `avellana`.`producto`.`id_prod` = `avellana`.`zapatos`.`id_prod` order by `valor_venta` desc
md5=1326491aadb01e82896ba270fd93e817
updatable=0
algorithm=0
definer_user=root
definer_host=localhost
suid=2
with_check_option=0
timestamp=0001727741803548939
create-version=2
source=((SELECT producto.id_prod, nombre, valor_venta, descri,producto.categoria,valor_base FROM producto,ropa WHERE producto.id_prod=ropa.id_prod
client_cs_name=utf8mb4
connection_cl_name=utf8mb4_unicode_ci
view_body_utf8=select `avellana`.`producto`.`id_prod` AS `id_prod`,`avellana`.`producto`.`nombre` AS `nombre`,`avellana`.`producto`.`valor_venta` AS `valor_venta`,`avellana`.`producto`.`descri` AS `descri`,`avellana`.`producto`.`categoria` AS `categoria`,`avellana`.`producto`.`valor_base` AS `valor_base` from `avellana`.`producto` join `avellana`.`ropa` where `avellana`.`producto`.`id_prod` = `avellana`.`ropa`.`id_prod` union select `avellana`.`producto`.`id_prod` AS `id_prod`,`avellana`.`producto`.`nombre` AS `nombre`,`avellana`.`producto`.`valor_venta` AS `valor_venta`,`avellana`.`producto`.`descri` AS `descri`,`avellana`.`producto`.`categoria` AS `categoria`,`avellana`.`producto`.`valor_base` AS `valor_base` from `avellana`.`producto` join `avellana`.`pantalon` where `avellana`.`producto`.`id_prod` = `avellana`.`pantalon`.`id_prod` union select `avellana`.`producto`.`id_prod` AS `id_prod`,`avellana`.`producto`.`nombre` AS `nombre`,`avellana`.`producto`.`valor_venta` AS `valor_venta`,`avellana`.`producto`.`descri` AS `descri`,`avellana`.`producto`.`categoria` AS `categoria`,`avellana`.`producto`.`valor_base` AS `valor_base` from `avellana`.`producto` join `avellana`.`zapatos` where `avellana`.`producto`.`id_prod` = `avellana`.`zapatos`.`id_prod` order by `valor_venta` desc
mariadb-version=100432