let history = [];
let past_commands = [['', null]];

function echo(string) {
    return string;
}

// console.log(history, past_commands);
let count = 0;
while (true) {
    if (count == 10) {
        break;
    }
    let command = "hi" + count;
    history.push(command);
    let result = echo(command)
    past_commands[past_commands.length -1] = [command, result]
    past_commands.push(['', null])
    count = count + 1
}
// console.log(history, past_commands);
// past_commands = []
// console.log(history, past_commands);

let string = "rm -r1";
if (string.match('rm -rf')) {
    console.log("yes");
}