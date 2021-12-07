import os from 'os';
import { stdin, stdout } from 'process';

const endLineRegex = /(\r\n|\n|\r)/g;

const removeEndLineSymbols = str => str.replace(endLineRegex, '');
const reverseString = str => str.split('').reverse().join('');
const reverseStringExceptEndLine = str => reverseString(removeEndLineSymbols(str)).concat(os.EOL);

stdin.on('data', input => stdout.write(reverseStringExceptEndLine(input.toString())));

// Using streams
// import { Transform } from 'stream';

// const reverseStringStream = new Transform({
//     transform(chunk, encoding, callback) {
//         callback(null, reverseStringExceptEndLine(chunk.toString()));
//     }
// });

// stdin.pipe(reverseStringStream).pipe(stdout);
