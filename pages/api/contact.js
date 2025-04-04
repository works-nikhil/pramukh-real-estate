import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Create a new page in the Notion database
    const response = await notion.pages.create({
      parent: {
        type: "database_id",
        database_id: process.env.NOTION_CONTACT_DATABASE_ID
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: req.body.name
              }
            }
          ]
        },
        Email: {
          email: req.body.email
        },
        Contact: {
          phone_number: req.body.phone
        },
        Requirements: {
          rich_text: [
            {
              text: {
                content: req.body.requirements
              }
            }
          ]
        },
        Status: {
          status: {
            name: "New"
          }
        }
      }
    });
    
    return res.status(200).json({ 
      message: 'Contact form submitted successfully',
      pageId: response.id 
    });
  } catch (error) {
    console.error('Error creating Notion page:', error);
    return res.status(500).json({ 
      error: 'Failed to submit contact form',
      details: error.message 
    });
  }
} 