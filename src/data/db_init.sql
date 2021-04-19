DROP TABLE IF EXISTS weapon_type;
CREATE TABLE weapon_type(`id` INTEGER, `name` TEXT, `order` INTEGER);

DROP TABLE IF EXISTS element_type;
CREATE TABLE element_type(`id` INTEGER, `name` TEXT, `order` INTEGER);

DROP TABLE IF EXISTS damage_type;
CREATE TABLE damage_type(`id` INTEGER, `name` TEXT);

DROP TABLE IF EXISTS trigger_type;
CREATE TABLE trigger_type(`id` INTEGER, `name` TEXT);

DROP TABLE IF EXISTS weapon_motion;
CREATE TABLE weapon_motion(`id` INTEGER, `weapon_type` INTEGER, `name` TEXT, `value` INTEGER, `element_rate` REAL, `damage_type` TEXT, `element_id` INTEGER, `element_value` INTEGER);

DROP TABLE IF EXISTS weapon;
CREATE TABLE weapon(`id` INTEGER, `weapon_type` INTEGER, `name` TEXT, `offense_value` INTEGER, `critical_rate` INTEGER, `element_type` INTEGER, `element_value` INTEGER, `dragon_skill_slot_num` INTEGER, `dragon_skill_set_id` INTEGER);

DROP TABLE IF EXISTS skill;
CREATE TABLE skill(`id` INTEGER, `name` TEXT, `max_level` INTEGER, `trigger_type` TEXT);

DROP TABLE IF EXISTS skill_effect;
CREATE TABLE skill_effect(`id` INTEGER, `skill_id` INTEGER, `level` INTEGER, `offense_value` INTEGER, `offense_rate` REAL, `critical_value` INTEGER, `element_type` INTEGER, `element_value` INTEGER, `element_rate` REAL, `critical_physical_damage_rate` REAL, `critical_element_damage_rate` REAL);

DROP TABLE IF EXISTS monster;
CREATE TABLE monster(`id` INTEGER, `name` TEXT);

DROP TABLE IF EXISTS monster_parts;
CREATE TABLE monster_parts(`id` INTEGER, `monster_id` INTEGER, `parts_id` INTEGER, `name` TEXT, `sever_value` INTEGER, `blunt_value` INTEGER, `shot_value` INTEGER, `element_value_fire` INTEGER, `element_value_water` INTEGER, `element_value_thunder` INTEGER, `element_value_ice` INTEGER, `element_value_dragon` INTEGER, `order` INTEGER);