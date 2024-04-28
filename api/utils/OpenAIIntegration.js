import OpenAI from "openai";
import { useState } from "react";
import { aiPrompt } from "../utils/gradingPrompt"; // Importing aiPrompt from gradingPrompt.js

export async function evaluateAnswerSheets(uploadedImageUrls) {
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true, // Adjust based on deployment environment
    });
  
    const completion = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "system",
          content: aiPrompt, // Using the imported aiPrompt
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Question Paper:" }, // Assuming question paper URL is available elsewhere
            // ... (Use the previously obtained question paper URL)
          ],
        },
        {
          role: "user",
          content: [ // Loop through uploadedImageUrls to include each answer key
            { type: "text", text: "Answer Key:" },
            {
              type: "image_url",
              image_url: {
                url: uploadedImageUrls[0], // Replace with URL from loop
              },
            },
          ],
        },
        // Include additional answer keys as needed within the loop
        {
          role: "user",
          content: [
            { type: "text", text: "Answer Sheet:" },
            {
              type: "image_url",
              image_url: {
                url: uploadedImageUrls[uploadedImageUrls.length - 1], // Last URL
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });
  
    // Handle the response (same logic as in your Home.js component)
    console.log(completion);
    console.log(completion.choices[0].message.content);
  }
