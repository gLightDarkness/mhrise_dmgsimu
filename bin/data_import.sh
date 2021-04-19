#!/bin/sh

cd $(dirname $0)
docker exec mhrise_dmgsimu_db sh /tmp/bin/data_import.sh