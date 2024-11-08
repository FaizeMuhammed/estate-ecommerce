const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const Message = require('./src/models/message')
const Connect = require('./src/config/socketConfig')

const dev = process.env.NODE_ENV !== 'production';
const PORT=process.env.PORT || 3000
const app = next({ dev });
const handle = app.getRequestHandler();
let receiverId;

app.prepare().then(() => {

  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('message', async (msg) => {
      receiverId = msg.receiver;

      try {
        await Connect();
        const cookies = socket.request.headers.cookie || '';
        const parsedCookies = cookie.parse(cookies);
        const token = parsedCookies.token;

        if (!token) {
          console.log('No token provided');
        }
        let decodedToken
        try {
          const secretKey = '123456'
          decodedToken = jwt.verify(token, secretKey)


          const saveMes = await Message.create({
            sender: decodedToken.id,
            receiver: receiverId,
            content: msg.content
          })
          console.log(saveMes, 'hhhhhhhhhhhhhhhhh')
        } catch (error) {
          console.log(error, 'error while sending message')
        }
      } catch (error) {
        console.log(error, 'no token')
      }
      io.emit('message', msg);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log('> Ready on port 3000');
  });
});
