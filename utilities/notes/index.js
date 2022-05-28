const { program } = require("commander")
const packagejson = require("./package.json")

program
    .name(packagejson.name)
    .description(packagejson.description)
    .version(packagejson.version)

program.command("standup")
    .description("Create a new notion page from template with current date as title")
    .action(() => {
        console.log("Notes standup run");
    })

program.parse()
