import { Client } from "@notionhq/client"
import open from "open"

export default async () => {
  const pageName = new Date().toLocaleDateString("cs-CS").split(". ").join(".")
  const notion = new Client({ auth: process.env.TUTI_NOTION_APIKEY })

  const response = await notion.pages.create({
    parent: {
      page_id: process.env.TUTI_NOTION_PAGEID,
    },
    properties: {
      title: {
        type: 'title',
        title: [
          {
            type: "text",
            text: {
              content: pageName
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

  console.log(`Page "${pageName}" created successfully. ${response.url}`)
  open(response.url, { app: { name: "chrome", arguments: [`--profile-directory=${process.env.TUTI_NOTES_STANDUP_CHROME_PROFILE || "Default"}`] }})
}
