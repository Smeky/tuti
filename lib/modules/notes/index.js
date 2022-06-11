import { program } from "commander"
import { appendToIdeas, openIdeas } from "./ideas.js"
import openStandup from "./standup.js"
import packagejson from "./package.json" assert { type: "json" }

program
    .name(packagejson.name)
    .description(packagejson.description)
    .version(packagejson.version)

program
    .command("standup")
    .description("Create a new notion page from template with current date as title")
    .action(openStandup)

program
    .command("ideas")
    .argument("[note]", "Appends the note to ideas, if provided")
    .description("Opens the ideas page in notion\n(pageId is defined via .env)")
    .action((note) => {
        if (note) {
            appendToIdeas(note)
        }

        openIdeas(process.env.TUTI_NOTES_IDEAS_URL, process.env.TUTI_NOTES_IDEAS_CHROME_PROFILE)
    })

program.parse()
