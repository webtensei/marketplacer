#!/bin/bash

# Запускаем все сервисы параллельно с разными цветами и префиксами
concurrently \
  --names "gateway,auth,user,team" \
  --prefix-colors "cyan,yellow,green,blue" \
  --prefix "[{name}]" \
  --timestamp-format "HH:mm:ss" \
  "nx serve api-gateway" \
  "nx serve auth-service" \
  "nx serve user-service" \
  "nx serve team-service" 