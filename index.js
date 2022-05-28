const { program } = require("commander")
const { fork } = require("child_process")
const packagejson = require("./package.json")

program
    .name(packagejson.name)
    .description(packagejson.description)
    .version(packagejson.version)

program
    .command("notes")
    .description("[Todo: fill description from utility package.json]")
    .argument("[args...]")
    .action((args) => {
        fork("utilities/notes", args)
    })

program.parse()

const test = "haf"
console.log(test)
