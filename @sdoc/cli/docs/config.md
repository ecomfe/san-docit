# config.md

> Minimalistic San-powered static site generator.

## Prepare

```
$ npm i
```

## Dev

First, run dev script:

```
$ npm start
```

And then, open <http://localhost:8888/>

## Build

```
$ npm run build
```

Start static server at `dist`

```
$ type serve >/dev/null 2>&1 || npm i -g serve
$ serve dist -p 9999
```

Open <http://localhost:9999/>
