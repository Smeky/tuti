import fs from "fs"
import path from "path"
import root from "./root.js"
import dotenv from "dotenv"
dotenv.config({ path: path.resolve(root + "/.env") })

import { program } from "commander"
import { fork } from "child_process"

const packagejson = JSON.parse(fs.readFileSync(new URL("../package.json", import.meta.url)));

export default (function() {
    program
        .name(packagejson.name)
        .description(packagejson.description)
        .version(packagejson.version)
    
    program
        .command("notes")
        .description("[Todo: fill description from module's package.json]")
        .argument("[args...]")
        .action((args) => {
            process.env.TUTI_UTILITY_DIR = path.resolve(root, "lib/modules/notes")
            fork(process.env.TUTI_UTILITY_DIR, args)
        })
    
    program.parse()
})()
