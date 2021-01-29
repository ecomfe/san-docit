# @sdoc/cli

> Minimalistic San-powered static site generator.

## Installation
Use the package manager yarn to install San Doict as a dev dependency.

```
$ yarn add @sdoc/cli -D
```

## Start
Add config file for site. See example:
[config.js](https://github.com/kidnes/san-docit/blob/master/@sdoc/cli/docs/.sdoc/config.js)

Add package.jons script field:
```
"start": "sdoc start docs"
"build": "sdoc build docs"
```

Start server:
```
npm run start
```

Open: <http://0.0.0.0:8080/>
