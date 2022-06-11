import open from "open"
import { Client } from "@notionhq/client"

export function openPage(url, profile = "Default") {
    open(url, { app: { name: "chrome", arguments: [`--profile-directory=${profile}`] }})
}

export async function createPage(pageOptions) {
    const notion = new Client({ auth: process.env.TUTI_NOTION_APIKEY })
    const response = await notion.pages.create(pageOptions)

    return response
}
