# react-firebase-contatos
A application to manage contacts using React JS + Firebase (Functions and Firestore)

#DEV LOCAL

1. Into `functions` folder, execute `nodemon server.js` to init server in port `:8080`.
2. Into `app` folder, execute `yarn start` to init application React JS in port `:3000`.

#Public in your Firebase Account

1. Into root folder in project, `firebase use --project {{YOUR_PROJECT_NAME}}` to associate with your project.
2. `npm run deploy` to update functions defines.
3. Run `app/build.sh` to publish hosting files
