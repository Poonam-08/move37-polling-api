export default function setupSocket(io) {
  io.on('connection', socket => {
    console.log('Client connected:', socket.id);

    socket.on('joinPoll', pollId => {
      socket.join(`poll-${pollId}`);
      console.log(`Client joined poll-${pollId}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}
