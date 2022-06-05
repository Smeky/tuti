import "dotenv/config"
import { program } from "commander"
import { fork } from "child_process"
import packagejson from "./package.json" assert { type: "json" }

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
