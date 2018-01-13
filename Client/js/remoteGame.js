var remoteGame = function (socket) {
    var game;
    var currL;
    var nextL;
    var doms = {
        gameDiv: document.getElementById('remoteGame'),
        nextDiv: document.getElementById('remoteNext'),
        gameTimeDiv: document.getElementById('remoteTime'),
        gameScoreDiv: document.getElementById('remoteScore'),
    };

    // 绑定按钮事件
    var bindEvents = function (socket) {
        socket.on('start', function (data) {
            game = new Game();

        })
        socket.on('init', function (data) {
            currL = new Square(data.type, data.dir);

        })
        socket.on('curr', function (data) {
            currL = [];
            currL = new Square(data.type, data.dir);
        })
        socket.on('next', function (data) {
            nextL = new Square(data.type, data.dir);
            game.init(doms, currL, nextL);
        })
        socket.on('left', function (data) {
            game.left();

        })
        socket.on('right', function (data) {
            game.right();

        })
        socket.on('down', function (data) {
            game.down();

        })
        socket.on('fastDown', function (data) {
            game.fastDown();

        })
        socket.on('rotate', function (data) {
            game.rotate();

        })
        socket.on('addLineData', function (data) {
            game.randomCreateline(data.length, data);
            game.refreshSocket();
            console.log('remote call data',data);
        })
        socket.on('removeY', function (data) {
            game.removeY();
        })
        socket.on('upTimeSocre', function (data) {
            game.upTimeSocre(doms.gameTimeDiv, data.gameTime);
            game.upTimeSocre(doms.gameScoreDiv, data.gameScore);
        })
        socket.on('lose', function (data) {
            document.getElementsByClassName('localLose').innerHTML = '你赢了'
            document.getElementsByClassName('remoteLose').innerHTML = '你输了'
        })
    }

    bindEvents(socket);
}
