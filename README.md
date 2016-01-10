## Synopsis

* Spawn Express apps on multiple ports as different processes.
* Master process restarts a child process if it's terminated.
* Use with nginx or your favorite load balancer.

## Code Example

```
npm install express-spawner
```

```
var es = require('express-spawner')(process.cwd()+'/');

es.spawnServerForever({
    ports: [9001, 9002, 9003],
    appPath: 'sampleApp.js',
});

```

### TODO
- [ ] Return Promise when servers are up
- [ ] Pretty debug logs
- [ ] Tests