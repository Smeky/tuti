import path from "path"
import { fileURLToPath } from "url"

export default (function() {
    return path.resolve(fileURLToPath(import.meta.url), "../..")
})()
