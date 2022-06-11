import { createPage, openPage } from "./notion.js"
import flatCache from "flat-cache"

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

function getPageOptions(pageName) {
    return {
        parent: {
            page_id: process.env.TUTI_NOTES_STANDUP_PAGEID,
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
            },
        ],
    }
}

export default async () => {
    const pageName = new Date().toLocaleDateString("cs-CS").split(". ").join(".")
    const inCache = readLastCreatedPage()

    // If today's page has already been created
    if (inCache.pageName === pageName) {
        // Todo: check if exists on notion (deleted by user)
        openPage(inCache.pageUrl, process.env.TUTI_NOTES_STANDUP_CHROME_PROFILE)
    }
    else {
        // Todo: check if page exists on notion
        const res = await createPage(getPageOptions(pageName))
        writeLastCreatedPage(pageName, res.url)
        openPage(res.url, process.env.TUTI_NOTES_STANDUP_CHROME_PROFILE)
    }
}
