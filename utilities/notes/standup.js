import { Client } from "@notionhq/client"
import open from "open"
import flatCache from "flat-cache"

function openInBrowser(url) {
    open(url, { app: { name: "chrome", arguments: [`--profile-directory=${process.env.TUTI_NOTES_STANDUP_CHROME_PROFILE || "Default"}`] }})
}

function loadCache() {
    return flatCache.load(".cache", process.env.TUTI_UTILITY_DIR)
}

function readLastCreatedPage() {
    const cache = loadCache()
    return {
        pageName: cache.getKey("standupPageName"),
        pageUrl: cache.getKey("standupPageUrl"),
    }
}

function writeLastCreatedPage(pageName, pageUrl) {
    const cache = loadCache()
    cache.setKey("standupPageName", pageName)
    cache.setKey("standupPageUrl", pageUrl)
    cache.save()
}

async function createPage(pageName) {
    const notion = new Client({ auth: process.env.TUTI_NOTION_APIKEY })
    const response = await notion.pages.create({
      parent: {
        page_id: process.env.TUTI_NOTION_PAGEID,
      },
      properties: {
        title: {
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: pageName,
              },
            },
          ],
        },
      },
      children: [
        {
          object: "block",
          type: "heading_3",
          heading_3: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "Topics:",
                },
              },
            ],
          },
        }
      ],
    })

    return response
}

export default async () => {
    const pageName = new Date().toLocaleDateString("cs-CS").split(". ").join(".")
    const inCache = readLastCreatedPage()

    // If today's page has already been created
    if (inCache.pageName === pageName) {
        // Todo: check if exists on notion (deleted by user)
        openInBrowser(inCache.pageUrl)
    }
    else {
        // Todo: check if page exists on notion
        const res = await createPage(pageName)
        writeLastCreatedPage(pageName, res.url)
        openInBrowser(res.url)
    }
}
