import _notion from "./notion.js"
const notion = _notion(process.env.TUTI_NOTES_IDEAS_APIKEY)

export function openIdeas() {
    notion.openPage(process.env.TUTI_NOTES_IDEAS_URL, process.env.TUTI_NOTES_IDEAS_CHROME_PROFILE)
}

export async function appendToIdeas(str) {

}
