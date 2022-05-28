import { program } from "commander"
import createStandup from "./standup.js"
import packagejson from "./package.json" assert { type: "json" }

program
    .name(packagejson.name)
    .description(packagejson.description)
    .version(packagejson.version)

program
    .command("standup")
    .description("Create a new notion page from template with current date as title")
    .action(createStandup)

program.parse()
