# Sample SPA app seed

A simple SPA using play framework application with React js as frontend app.

Features

- Play framework (Scala)
- Slick (Scala) with H2 database (Embedded/Server mode)
- React
- Redux
- Redux-saga
- Sass/Scss
- Webpack
- Babel
- Neutrino

React app exist in the ui folder

Not bundled together by single command so consider running differently Play app and React app in different terminals

#Play

`sbt run` which runs app on port 9000

Check conf/application.conf to manage H2 connection

#React

`cd ui && npm start` or `yarn start`  which runs app on port 5000

