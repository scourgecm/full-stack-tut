import Server from "socket.io";

export function startServer() {
    const io = new Server().attach(3000);

    store.subscribe(
        () => io.emmit('state', store.getState().toJS())
    );

    io.on('connection', (socket) => {
        socket.emit('state', store.getState().toJS());
        socket.on('action', store.dispatch.bind(store));
    });
}