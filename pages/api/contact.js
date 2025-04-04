import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, requirements } = req.body;

  // Validate required fields
  if (!name || !email || !requirements) {
    return res.status(400).json({ error: 'Name, email, and requirements are required' });
  }

  try {
    // Initialize Notion client
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });

    // Create a new page in the contact submissions database
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_CONTACT_DATABASE_ID,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        Email: {
          email: email,
        },
        Phone: {
          rich_text: [
            {
              text: {
                content: phone || 'Not provided',
              },
            },
          ],
        },
        Requirements: {
          rich_text: [
            {
              text: {
                content: requirements,
              },
            },
          ],
        },
        Status: {
          select: {
            name: 'New',
          },
        },
        Date: {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    });

    console.log('Contact form submission saved to Notion:', response.id);
    
    res.status(200).json({ 
      success: true, 
      message: 'Contact form submitted successfully' 
    });
  } catch (error) {
    console.error('Error saving contact form to Notion:', error);
    res.status(500).json({ 
      error: 'Failed to submit contact form',
      details: error.message 
    });
  }
} 