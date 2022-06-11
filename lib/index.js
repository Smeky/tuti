import path from "path"
import root from "./root.js"
import dotenv from "dotenv"
dotenv.config({ path: path.resolve(root + "/.env") })

import { program } from "commander"
import { fork } from "child_process"
import packagejson from "../package.json" assert { type: "json" }

export default (function() {
    program
        .name(packagejson.name)
        .description(packagejson.description)
        .version(packagejson.version)
    
    program
        .command("notes")
        .description("[Todo: fill description from utility package.json]")
        .argument("[args...]")
        .action((args) => {
            process.env.TUTI_UTILITY_DIR = path.resolve(root, "lib/utilities/notes")
            fork(process.env.TUTI_UTILITY_DIR, args)
        })
    
    program.parse()
})()
