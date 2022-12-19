// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import { TextEncoder } from 'util';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Smart Import initialized!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('smart-imports.helloWorld', async (directory) => {
		console.debug('🔥 selected directory name ', directory);
		if (directory) {
			const selectedFolder = directory.path;
			const files = await vscode.workspace.findFiles(new vscode.RelativePattern(selectedFolder, '**/*.ts'), '**/*.spec.ts');
			const fileNames = files.map((x) => {
				return path.basename(x.path)
			})
			let fileContent = '';
			for (let index = 0; index < fileNames.length; index++) {
				const element = fileNames[index];
				fileContent += `export * from './${element.replace('.ts', '')}';\n`;
			}
			console.debug('🔥 output file content', fileContent);
			const indexFileName = 'index.ts';
			vscode.workspace.fs.writeFile(vscode.Uri.parse(selectedFolder + '/' + indexFileName),
				new TextEncoder().encode(fileContent));
		}
		vscode.window.showInformationMessage('index.ts file generated!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
