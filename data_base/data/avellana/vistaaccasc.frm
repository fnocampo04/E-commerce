TYPE=VIEW
query=(select `avellana`.`producto`.`id_prod` AS `id_prod`,`avellana`.`producto`.`nombre` AS `nombre`,`avellana`.`producto`.`valor_venta` AS `valor_venta`,`avellana`.`producto`.`descri` AS `descri`,`avellana`.`producto`.`categoria` AS `categoria`,`avellana`.`producto`.`valor_base` AS `valor_base` from `avellana`.`producto` join `avellana`.`accesorio` where `avellana`.`producto`.`id_prod` = `avellana`.`accesorio`.`id_prod` order by `avellana`.`producto`.`valor_venta`)
md5=ae60c64e32c53f0a07701e7e508bf05d
updatable=1
algorithm=0
definer_user=root
definer_host=localhost
suid=2
with_check_option=0
timestamp=0001727738948077221
create-version=2
source=(SELECT producto.id_prod, nombre, valor_venta, descri,producto.categoria,valor_base FROM producto,accesorio WHERE producto.id_prod=accesorio.id_prod ORDER BY valor_venta Asc)
client_cs_name=utf8mb4
connection_cl_name=utf8mb4_unicode_ci
view_body_utf8=(select `avellana`.`producto`.`id_prod` AS `id_prod`,`avellana`.`producto`.`nombre` AS `nombre`,`avellana`.`producto`.`valor_venta` AS `valor_venta`,`avellana`.`producto`.`descri` AS `descri`,`avellana`.`producto`.`categoria` AS `categoria`,`avellana`.`producto`.`valor_base` AS `valor_base` from `avellana`.`producto` join `avellana`.`accesorio` where `avellana`.`producto`.`id_prod` = `avellana`.`accesorio`.`id_prod` order by `avellana`.`producto`.`valor_venta`)
mariadb-version=100432
