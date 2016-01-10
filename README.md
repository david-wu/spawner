## Synopsis

Spawns Express apps on multiple ports as different processes.
The master process restarts a process if it's terminated.
Use with nginx.

## Code Example

```
var es = require('express-spawner');

es.spawnServerForever({
    ports: [9001, 9002, 9003],
    appPath: './sampleApp.js',
});

```