# librestack-react

Build vanilla.js applications with Typescript and JSX (TSX).

Allows building component-based reactive UIs with Typescript checking and JSX
support in a familiar react-like way, but without the overhead.

Minimal.

NB: this is not intended to be a drop-in replacement for react.  If you want
a fully-featured react, you probably want the real thing.  If you just want to
compose a UI with components and JSX, then you might find this a useful starting
point.

## Install

### via npm

```
# inside your project
npm install @librestack/react --save-dev
```

### from github

```
git clone git@github.com:librestack/librestack-react.git
cd librestack-react
npm install
npm start
```
## Examples

### statetest

Example with redux.  Light state can be toggled with button, and is toggled every 2s by a timer.

```
cd examples/statetest
npm i
npm start
```

## License

GPL2+
