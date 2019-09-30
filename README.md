# [![own-explorer-logo](https://github.com/OwnMarket/OwnBlockchainExplorerFrontend/blob/master/Source/src/assets/images/logo.png?raw=true)](https://explorer.weown.com) <div style="float:right">Own Blockchain Explorer Frontend</div>

**[Own Blockchain Explorer](https://explorer.weown.com)** is web application powered by [Angular](https://angular.io) framework. By using our **[Blockchain Explorer](https://explorer.weown.com)** you can gain insight into all transactions on the blockchain, check the status of any transaction, and review how many assets you have.

## Quick Start

#### Clone the repository:

```bash
    $ git clone https://github.com/OwnMarket/OwnBlockchainExplorerFrontend.git
    $ cd OwnBlockchainExplorerFrontend/Source
```

#### Install packages:

```bash
    $ npm install
```

#### Generate .env.ts config file

```bash
    $ npm run env
```

## Connect to Own Blockchain Explorer API

To start using our **[Blockchain Explorer](https://explorer.weown.com)** you need to run **[Blockchain Explorer API](https://github.com/OwnMarket/OwnBlockchainExplorer)** localy on your machine or to point on our **testnet** or **mainnet** API.

### Install API localy

---

**[Blockchain Explorer API](https://github.com/OwnMarket/OwnBlockchainExplorer)** is available on GitHub and you can find installation, setup and runing instructions in project [documentation](https://github.com/OwnMarket/OwnBlockchainExplorer).

### Use OWN testnet or mainnet API

---

Easier and more straightforward way to test and use our **[Blockchain Explorer](https://explorer.weown.com)** application is by pointing to our **testnet** or **mainnet** API.

| URL                                 | Name    | Description                             |
| ----------------------------------- | ------- | --------------------------------------- |
| https://test.explorer-api.weown.com | testnet | OWN **testnet** API used for testing    |
| https://explorer-api.weown.com      | mainnet | OWN **mainnet** API used for production |

To use one of those you need to edit **environment.ts** file and update **serverUrl** property.

```typescript
import { env } from "./.env";

export const environment = {
  production: false,
  version: env.npm_package_version + "-dev",
  serverUrl: "https://test.explorer-api.weown.com",
  defaultLanguage: "en-US",
  supportedLanguages: ["en-US"]
};
```

## Serve App localy

To run application locally on your machine:

```bash
    $ ng serve
```

**[Blockchain Explorer](https://explorer.weown.com)** will be served on **localhost:4200**. Open your browser and have fun exploring **OWN** blockchain.

## Run production build

Before building **[Blockchain Explorer](https://explorer.weown.com)** for production you need to edit **environment.prod.ts** file and update **serverUrl** property. It should be same as in **environment.ts** file. After that building for production in easy as runing:

```bash
    $ npm run build
```

Dist folder will be created containing compiled application files and required assets ready to be deployed.

## Serve production build

Testing built application before deployment can be done by using **[http-server](https://www.npmjs.com/package/http-server)** package. You can install it globaly by runing:

```bash
    $ npm install -g http-server
```

Now you can serve and test built application from **dist** folder easily.

```bash
    $ http-server ./dist -c-1
```

**-c-1** _command flag will disable caching_

## Release Notes

### v.1.0.0

- **Validators page** with validator map and statistics, to make choosing a validator to delegate stake to a bit easier.
- **Addresses page** showing top CHX holders by balance.
- **Event filter** on the address info page, enabling filtering of events by type, which is useful when searching for a transfer in the sea of staking rewards.
- **Improved performance** performance significantly boosted.
- **Bug fixes** (including the fix for the annoying "blank page" issue – make sure you clear the browser cache though).

## Additional info

### Libraries

- [Angular](https://angular.io)
- [Bootstrap 4](https://getbootstrap.com)
- [ng-bootsrap](https://ng-bootstrap.github.io/)
- [Font Awesome](http://fontawesome.io)
- [RxJS](http://reactivex.io/rxjs)
- [ngx-translate](https://github.com/ngx-translate/core)

### Coding guides

- [Angular](docs/coding-guides/angular.md)
- [TypeScript](docs/coding-guides/typescript.md)
- [Sass](docs/coding-guides/sass.md)
- [HTML](docs/coding-guides/html.md)
- [Unit tests](docs/coding-guides/unit-tests.md)
- [End-to-end tests](docs/coding-guides/e2e-tests.md)

### Other documentation

- [I18n guide](docs/i18n.md)
- [Working behind a corporate proxy](docs/corporate-proxy.md)
- [Updating dependencies and tools](docs/updating.md)
- [Using a backend proxy for development](docs/backend-proxy.md)
- [Browser routing](docs/routing.md)
