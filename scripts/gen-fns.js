const fs = require('fs');
const path = require('path');

// Read the input array from the paste.txt file
const inputData = fs.readFileSync('level-1-fns.json', 'utf8');
const fileNames = JSON.parse(inputData);

// Define the target directory
const targetDir = path.join(__dirname, 'src', 'fn');

// Function to create a TypeScript file with initial content
function createTsFile(fileName) {
	// Ensure the target directory exists
	fs.mkdirSync(targetDir, { recursive: true });

	const filePath = path.join(targetDir, `${fileName}.ts`);

	// Create the initial content for the file
	const fileContent = `export function ${fileName}() {

}
`;

	// Create a TypeScript file with the initial content
	fs.writeFile(filePath, fileContent, (err) => {
		if (err) {
			console.error(`Error creating file ${fileName}.ts:`, err);
		} else {
			console.log(`Created file: ${filePath}`);
		}
	});
}

// Create TypeScript files for each name in the array
fileNames.forEach(createTsFile);
// fileNames.forEach((f) => console.log(f));

console.log('File creation process completed.');
