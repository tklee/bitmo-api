#!/bin/sh

SERVER_ROOT=`dirname $0`/../server

start_server() {
  node ${SERVER_ROOT}/app.js
}

case $1 in
start)
  start_server
  ;;
*)
  start_server
  ;;
esac
