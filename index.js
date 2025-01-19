// import { Telegraf } from "telegraf"
// import dotenv from "dotenv"

// dotenv.config()

// const bot = new Telegraf(process.env.BOT_TOKEN)
// bot.start((ctx) => ctx.reply('Welcome to euron'))

// bot.command('say_something_about_euron', (ctx) => {
//     ctx.reply('euron is a platform with a vision of one student one subscription')
// })

// bot.on('text', (ctx) => {
//     if (ctx.message.text === 'hi') {
//         ctx.reply('hello')
        
//     }else{
//         ctx.reply('swagat to karo hamara')
//     }
// })

// bot.launch()

import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Base URL for Gemini API (replace with actual API URL)
const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyB-HORWw51_v1UB3YrsPqBr8O7UUPtXS0U";

// Handle text messages from users
bot.on("text", async (ctx) => {
  const userText = ctx.message.text; // Get the text sent by the user

  try {
    // Forward the user's text to Gemini API in JSON format
    const response = await axios.post(`${GEMINI_API_BASE}`, {
         
        contents: [
          {
            parts: [
              {
                text:  JSON.stringify(userText),
              },
            ],
          },
        ],
        generationConfig: { temperature: 0.7, maxOutputTokens: 100 },
    });

    // Send the API's response back to the user
    console.log(response.data.candidates[0].content.parts[0].text);
    
        const generated_text = response.data?.candidates[0]?.content?.parts?.[0]?.text;; 

    ctx.reply(generated_text);
  } catch (error) {
    console.error("Error communicating with Gemini API:", error.message);

    // Send an error message to the user if the API call fails
    ctx.reply("Sorry, something went wrong while processing your request.");
  }
});

// Launch the bot
bot.launch();

// // Graceful shutdown
// process.once("SIGINT", () => bot.stop("SIGINT"));
// process.once("SIGTERM", () => bot.stop("SIGTERM"));

