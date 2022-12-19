# Smart Import TypeScript VS Code Extension

The Smart Import extension will help you organize your TypeScript applications like Angular.

## Features

In TypeScript applications, we can define class, interface, enum and other types in a separate files, and import them in the consumer using `import` syntax.
For example
```ts
import { AuthService } from './@services/auth.service';
import { AzureNotificationService } from './@services/azure-notification.service';
import { AppService } from './@services/app-service';
```

This approach clutter codebase a lot with many import statements for each file.

However, using `index.ts` file in a folder can solve this problem. For example, we can create `index.ts` file in `services` folder and export all types.

```ts
export * from './auth.service';
export * from './azure-notification.service';
export * from './app.service';
```
Now, we can simply use one `import` statement to import all these services.

```ts
import { AppService, AuthService, AzureNotificationService } from './@services';
```

<img src="/src/images/smart-import-demo.gif?raw=true">

> Smart Import: This extension allow you to select a directory in Explorer and create an `index.ts` file for all `.ts` files (excluding `.spec.ts` files). Every time you add/remove files from a directory, just re-run the extension and it will update the entries in `index.ts` file.

## Requirements

This extension has been tested with Angular projects. However, this can be used with any other web frameworks with TypeScript support e.g. Vue.js, React.js, Node.js etc.

## Extension Settings

This extension contributes the following settings:

* `explorer/context`: Show a menu option in explorer context menu.

## Known Issues

The extension generate `index.ts` file for a selected directory only. If there are any sub-directory, they won't be processed.

## Release Notes



### 1.0.0

This is a first version of the extension. Feel free to open an issue with any bugs or feature requests.

**Cheers!**
