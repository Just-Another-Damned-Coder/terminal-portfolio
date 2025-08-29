export function echo(string) {
    if (string.match('rm -rf')) {
        return "lol!";
    }
    return string
}