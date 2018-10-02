#!/bin/bash

# create tables in psql using schema file
# psql -d spotify -f dataGen/schema.psql

# COPY all records from artist files
cat $(pwd)/dataGen/CSVdata/artists/artists*.csv | psql -d spotify -c "COPY artists(id, name) from stdin with delimiter '|'"

# COPY all records from albums files
cat $(pwd)/dataGen/CSVdata/albums/albums*.csv | psql -d spotify -c "COPY albums(id, artist_id, name, image, published_year) from stdin with delimiter '|'"

# COPY all records from songs files
cat $(pwd)/dataGen/CSVdata/songs/songs*.csv | psql -d spotify -c "COPY songs(id, album_id, artist_id, name, streams, length, popularity, in_library) from stdin with delimiter '|'"
