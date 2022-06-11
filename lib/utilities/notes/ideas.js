import { openPage } from "./notion.js"

export function openIdeas() {
    openPage(process.env.TUTI_NOTES_IDEAS_URL, process.env.TUTI_NOTES_IDEAS_CHROME_PROFILE)
}

export async function appendToIdeas(str) {
    const notion = new Client({ auth: process.env.TUTI_NOTION_APIKEY })
}
