# Research Project Dashboard

### Table of Contents

- [Description](#description)
- [System Requirements](#system-requirements)
- [Usage](#usage)
- [Dependencies](#dependencies)

## <a name="description"></a> Description

A dashboard web application developed to facilitate research project management.

## <a name="system-requirements"></a> System Requirements

- `nodejs >= 12.0.0`
- `npm >= 6.9.0

## <a name="usage"></a> Usage

On Unix-based operating systems,

run the following command in Terminal:

```
chmod +x deploy.sh
./deploy.sh
```

On Windows,

run the following command in either the command prompt (`cmd`) or powershell:

```
.\deploy.bat
```

### Remarks

If you are using `12.17.0 > nodejs >= 12.0.0`, edit `server/package.json` as below:

from

```jsonc
 "scripts": {
    "serve": "node ./src/index.js",
    // ...
  },
```

to

```jsonc
 "scripts": {
    "serve": "node --experimental-modules ./src/index.js",
    // ...
  },
```

Add `--experimental-modules` flag.

## <a name="dependencies"></a> Dependencies

> Dependencies that are commonly found in client and server.

### devDependencies

- `eslint`
  - `eslint-config-airbnb`
  - `eslint-config-prettier`
  - `eslint-plugin-import`
  - `eslint-plugin-prettier`
- `nodemon`
- `prettier`
- `jest`
