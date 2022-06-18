import open from "open"
import { Client } from "@notionhq/client"

export default function(apiKey) {
    let _client = null
    const notion = () => _client ?? (_client = new Client({ auth: apiKey }))

    function openPage(url, profile = "Default") {
        open(url, { app: { name: "chrome", arguments: [`--profile-directory=${profile}`] }})
    }
    
    function openPageByIdName(pageId, pageName, profile) {
        openPage(`https://www.notion.so/${pageName.replaceAll(".", "-")}-${pageId.replaceAll("-", "")}`, profile)
    }
    
    async function createPage(pageOptions) {
        const response = await notion().pages.create(pageOptions)
    
        return response
    }
    
    async function getPageChildren(pageId) {
        const response = await notion().blocks.children.list({ block_id: pageId })
    
        return response.results
    }
    
    async function getBlockByTitle(parentId, title) {
        const children = await getPageChildren(parentId)
        return children.find(({ child_page }) => child_page && child_page.title === title)
    }

    return {
        openPage,
        openPageByIdName,
        createPage,
        getPageChildren,
        getBlockByTitle,        
    }
}
