import open from "open"
import { Client } from "@notionhq/client"

export function openPage(url, profile = "Default") {
    open(url, { app: { name: "chrome", arguments: [`--profile-directory=${profile}`] }})
}

export function openPageByIdName(pageId, pageName, profile) {
    openPage(`https://www.notion.so/${pageName.replaceAll(".", "-")}-${pageId.replaceAll("-", "")}`, profile)
}

export async function createPage(pageOptions) {
    const notion = new Client({ auth: process.env.TUTI_NOTION_APIKEY })
    const response = await notion.pages.create(pageOptions)

    return response
}

export async function getPageChildren(pageId) {
    const notion = new Client({ auth: process.env.TUTI_NOTION_APIKEY })
    const response = await notion.blocks.children.list({ block_id: pageId })

    return response.results
}

export async function getBlockByTitle(parentId, title) {
    const children = await getPageChildren(parentId)
    return children.find(({ child_page }) => child_page && child_page.title === title)
}

