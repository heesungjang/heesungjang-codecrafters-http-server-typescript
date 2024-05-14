import * as net from 'net';

const server = net.createServer((socket) => {
  const res = 'HTTP/1.1 200 OK\r\n\r\n';

  socket.write(res);
  socket.pipe(socket);
  socket.end();
});

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log('Logs from your program will appear here!');

// Uncomment this to pass the first stage
server.listen(4221, 'localhost', () => {
  console.log('server is listening on localhost:4221');
});
