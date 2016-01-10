var es = require('../index.js')(process.cwd());

es.spawnServerForever({
    ports: [9001, 9002, 9003],
    appPath: '/sampleApp.js',
});


