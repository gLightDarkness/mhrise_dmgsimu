#!/bin/sh
DB_NAME="master.db"
DB="/root/db/${DB_NAME}"
INIT_SQL="/tmp/data/db_init.sql"
IMPORT_DIR="/tmp/data/csv"

cd $(dirname ${DB})

sqlite3 ${DB_NAME} < ${INIT_SQL}

import_files="${IMPORT_DIR}/*.csv"

for file_path in $import_files; do
    file_name=$(basename $file_path)
    table_name=${file_name%.*}
    temp_file=$(mktemp)
    sed -e '1d' $file_path > $temp_file # 先頭行を削除
    sqlite3 -separator , $DB ".import ${temp_file} ${table_name}"
    rm $temp_file
done