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
	console.log('Congratulations, your extension "smart-imports" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('smart-imports.helloWorld', async (folder) => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// console.debug('🔥 foldername ', folder);
		let newUri = folder;  // folder will be undefined when triggered by keybinding
		if (folder) {                       // so triggered by a keybinding
			// const originalClipboard = await vscode.env.clipboard.readText();

			// await vscode.commands.executeCommand('copyFilePath');
			// folder = await vscode.env.clipboard.readText();  // returns a string
			// newUri = await vscode.Uri.file(folder);          // make it a Uri 


			const selectedFolder = folder.path;
			const files = await vscode.workspace.findFiles(new vscode.RelativePattern(selectedFolder, '**/*.ts'), '**/node_modules/**');
			// console.debug('🔥 files', files);
			const fileNames = files.map((x) => {
				return path.basename(x.path)
			})
			console.debug('🔥 filenames', fileNames);
			let line = '';
			// const output = fileNames.map((fileName)=>{
			// 	line += `export * from './${fileName}'\n` ;
			// });
			for (let index = 0; index < fileNames.length; index++) {
				const element = fileNames[index];
				// console.debug('🔥 fileName', element);
				line += `export * from './${element.replace('.ts', '')}';\n`;
			}
			console.debug('🔥 output file content', line);
			const indexFileName = 'index.ts';
			vscode.workspace.fs.writeFile(vscode.Uri.parse(selectedFolder + '/' + indexFileName), new TextEncoder().encode(line));
			// await vscode.env.clipboard.writeText(originalClipboard);

			// see note below for parsing multiple files/folders
			// newUri = await vscode.Uri.file(folder);          // make it a Uri 
		}
		vscode.window.showInformationMessage('Om Namah Shivay!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
