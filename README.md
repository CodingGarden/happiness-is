# Happiness is...

An app that detects "Happiness is..." messages in twitch chat and aggregates them for others to read.

## TODO

* [x] Setup the server
* [x] Setup a docker container with Postgres
* [x] Listen for twitch chats
  * [x] parse message
  * [x] insert into DB
* [x] endpoint to get all messages
* [x] Setup the client
* [x] Show all messages in frames
* [x] Validate message length...
* [x] Set padding style for each frame
* [ ] DEPLOY

## Ideas

* [x] Background image for museum wall
* [x] Background for frames
* [x] Spacing between frames
* [x] Randomize frame
* Random spacing above / below frames
* [x] Randomize displayed messages
  * [ ] Use tablesample instead of random()...
* [ ] Use cinemagraphs as the background
* [ ] Show spotlight above frame
* [ ] Paginate API response
* [ ] Infinite Scroll

## Image Credits

* http://www.pngall.com/gold-frame-png/download/17462
* http://www.pngall.com/gold-frame-png/download/17568
* http://www.pngall.com/gold-frame-png/download/17652
* http://www.pngall.com/gold-frame-png/download/17719
* http://www.pngall.com/gold-frame-png/download/17604

## Deployed instance

* https://happiness-is.surge.sh