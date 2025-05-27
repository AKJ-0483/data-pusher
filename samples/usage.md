# How to Use the APIs

## Create Account

curl -X POST http://localhost:3000/accounts \
 -H "Content-Type: application/json" \
 -d @samples/create-account.json

## Create Destination

curl -X POST http://localhost:3000/accounts/<accountId>/destinations \
 -H "Content-Type: application/json" \
 -d @samples/create-destination.json

## Send Incoming Data

curl -X POST http://localhost:3000/server/incoming_data \
 -H "Content-Type: application/json" \
 -H "CL-X-TOKEN: <appSecretToken>" \
 -d @samples/incoming-payload.json
