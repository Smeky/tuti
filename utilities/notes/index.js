import { program } from "commander"
import { openPage } from "./notion.js"
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

program
    .command("ideas")
    .description("Opens the ideas page in notion\n(pageId is defined via .env)")
    .action(() => {
        openPage(process.env.TUTI_NOTES_IDEAS_URL, process.env.TUTI_NOTES_IDEAS_CHROME_PROFILE)
    })

program.parse()
