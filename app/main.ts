import * as net from 'net';

const ENDPOINT = {
  root: '/',
  echo: '/echo',
};

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    const [request] = data.toString().split('\r\n');
    const [httpMethod, requestTarget, HttpVersion] = request.split(' ');

    const [endpoint, ...params] = requestTarget.split(/(?=\/)/).filter(Boolean);

    switch (endpoint) {
      case ENDPOINT.root: {
        const res = 'HTTP/1.1 200 OK\r\n\r\n';
        socket.write(Buffer.from(res));
        break;
      }
      case ENDPOINT.echo: {
        const echoContent = params.join('').slice(1); // Remove leading slash
        const res = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${echoContent.length}\r\n\r\n${echoContent}`;
        socket.write(Buffer.from(res));
        break;
      }

      default: {
        const res = 'HTTP/1.1 404 Not Found\r\n\r\n';
        socket.write(Buffer.from(res));
      }
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
