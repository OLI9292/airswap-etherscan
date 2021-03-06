# airswap-etherscan

## About

Search Ethereum addresses for transaction history and other useful data. Use the QR code scanner to scan an address. Also search blocks for information on the miner and reward.

![screenshots](https://github.com/OLI9292/airswap-etherscan/blob/master/src/Lib/Images/readMeImage.jpeg)

## Setup

Fork the project to your GitHub account

Clone your fork:

```
$ git clone git@github.com:your-github-username/airswap-etherscan.git
```

Install dependencies with recent version of npm:

```
$ npm install -g npm@latest
$ cd airswap-etherscan && npm install
```

Run app on iOS simulator (Xcode installation required):

```
$ npm run ios
```

To test the app on your iPhone, install Expo on your device and use the QR code or address to open the app.

If you have trouble running the project, you might have to install watchman:

```
$ brew update
$ brew install watchman
```

## Technologies

- [Typescript](https://www.typescriptlang.org/) - language
- [React Native](https://facebook.github.io/react-native/) - views
- [Expo](https://expo.io/) - tooling
- [Redux](https://redux.js.org/) - state management
- [Styled Components](https://www.styled-components.com/) - styles
