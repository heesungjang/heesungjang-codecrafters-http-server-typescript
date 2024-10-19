import * as net from 'net';

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    const [request] = data.toString().split('\r\n');
    const [httpMethod, requestTarget, HttpVersion] = request.split(' ');

    if (requestTarget === '/') {
      const res = 'HTTP/1.1 200 OK\r\n\r\n';
      socket.write(res);
    } else {
      const res = 'HTTP/1.1 404 Not Found\r\n\r\n';
      socket.write(res);
    }

    socket.pipe(socket);
    socket.end();
  });

  // const address = connection.address();
});

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log('Logs from your program will appear here!');

// Uncomment this to pass the first stage
server.listen(4221, 'localhost', () => {
  console.log('server is listening on localhost:4221');
});
