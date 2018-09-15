const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// storage (state)
const messages = [];

const mainHandler = (req, res) => {
  res.send('hello world');
};

const messageReadHandler = (req, res) => {
  // send ALL messages server knows about
  res.send(messages);
};

const userMessageReadHandler = (req, res) => {
  console.log(`someone asked for ${req.params.userName}'s messages`);
  // return all messages for req.pamams.userNames
  const userMessages = messages.filter((message)=>{
    return message.to === req.params.userName;
  });

  res.send(userMessages);
};

const messageCreateHandler = (req, res) => {

  // interpret user request
  const message = {
    time: new Date(),
    text: req.body.text,
    to: req.params.userName
  };

  // remember this message
  messages.push(message);
  console.log('saving message', message);

  // tell them it worked
  res.status(201).send();
};

app.use(bodyParser.json());

app.get('/', mainHandler);

app.get('/messages', messageReadHandler);
app.get('/messages/user/:userName', userMessageReadHandler);

app.post('/messages/user/:userName', messageCreateHandler);

app.listen(3000);
console.log('server running!');