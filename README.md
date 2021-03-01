# React Chat with XMPP

### Features
You can do:
- Login and logout: useful to identify who is going to interact with the system
- See who is online: useful to identify for who you want to send a message
- Send 'Hi' to someone: the first step to communicate with someone
- Rooms
  - See the available rooms and the number of users there
  - Create a new room with random name
  - Join to a specific room
  - Send 'Hello' to everyone in a specific room
  - Delete a room
- User Management
  - Add a user with random username and default password `123456`
  - Delete a specific user (in progress)

Tip: you can update the available data by clicking on the update button

### Running the application 

You should add a `.env` file based on the `.env.example` with correct credentials.

For development proposals, you can run:

`./run-app-deploy.sh dev` 
or 
`docker-compose up -d --build`

Open [http://localhost:3001](http://localhost:3001).
