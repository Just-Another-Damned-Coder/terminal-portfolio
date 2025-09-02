
class CommandParser {
    constructor () {
        this.available_commands = ['ls','username', 'clear', 'whoami'];
        // Create a case-insensitive regex pattern from available commands
        this.pattern = new RegExp(`^(${this.available_commands.join('|')})$`, 'i');
    }
    hasCapitalLetters(text) {
        // Regex checks for any uppercase (A-Z)
        return /[A-Z]/.test(text);
    }
    check(text) {
        text = text.trim().split(/\s+/)[0];
        if (this.pattern.test(text)) {
            if (this.hasCapitalLetters(text)){
                return [false, ["ERROR", 2, "Misuse of shell builtins."]];
            }
            else return [true, text.match(this.pattern)[1]];
        }
        else{
            return [false, ["ERROR", 127, "Command not found."]]
        }
    }
    parse(text) {
        let value = this.check(text);
        if (value[0]) {
            switch (value[1]) {
                case 'username':
                    console.log("username was recognized.");
                    return true;
                default:
                    console.log("Unknown command.");
                }
        }
        else return value;
    }
}

let c = new CommandParser();
console.log(c.parse('username   moris'));