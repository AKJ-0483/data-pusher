# Data Pusher

An Express.js web application that receives JSON data via webhook and pushes it to multiple destination URLs based on account configuration.

## Features
- Manage Accounts with unique app secret tokens
- Manage multiple Destinations per Account (with custom URL, method, headers)
- Receive and forward JSON payloads via `/server/incoming_data`

## Tech Stack
- Node.js + Express
- SQLite + Sequelize ORM

## Setup

```bash
npm install
npm run start
