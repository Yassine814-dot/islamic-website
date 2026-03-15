import axios from "axios";
import quotesData from "../data/quotes.json";

// Simple keyword-based response generator (fallback)
const getKeywordResponse = (question) => {
  const keywords = {
    patience: {
      text: "Allah says: 'Indeed, Allah is with the patient.'",
      arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
      source: "Qur'an 2:153",
    },
    foi: {
      text: "The Prophet Muhammad (peace be upon him) said: 'None of you truly believes until he loves for his brother what he loves for himself.'",
      arabic:
        "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
      source: "Sahih al-Bukhari 13",
    },
    knowledge: {
      text: "Seeking knowledge is an obligation upon every Muslim.",
      arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
      source: "Sunan Ibn Majah 224",
    },
    character: {
      text: "The best among you are those who have the best manners and character.",
      arabic: "إِنَّ مِنْ خِيَارِكُمْ أَحَاسِنَكُمْ أَخْلَاقًا",
      source: "Sahih al-Bukhari 3559",
    },
  };

  const lowerQuestion = question.toLowerCase();

  if (lowerQuestion.includes("patience") || lowerQuestion.includes("sabr")) {
    return keywords.patience;
  } else if (
    lowerQuestion.includes("foi") ||
    lowerQuestion.includes("iman") ||
    lowerQuestion.includes("croyance")
  ) {
    return keywords.foi;
  } else if (
    lowerQuestion.includes("connaissance") ||
    lowerQuestion.includes("savoir") ||
    lowerQuestion.includes("knowledge")
  ) {
    return keywords.knowledge;
  } else if (
    lowerQuestion.includes("comportement") ||
    lowerQuestion.includes("caractère") ||
    lowerQuestion.includes("morale")
  ) {
    return keywords.character;
  } else {
    // Random quote from the collection
    const randomQuote =
      quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
    return {
      text: randomQuote.text,
      arabic: randomQuote.arabic,
      source: randomQuote.source,
    };
  }
};

export const getAIResponse = async (question) => {
  // Try to use OpenAI API if key is available
  if (process.env.REACT_APP_OPENAI_API_KEY) {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are an Islamic AI assistant specialized in providing quotes and explanations from the Quran and authentic Hadiths (Sahih al-Bukhari and Sahih Muslim). 
              Provide responses in this JSON format: 
              {
                "text": "quote or explanation",
                "arabic": "arabic text if available",
                "source": "source reference"
              }
              Be respectful, accurate, and concise.`,
            },
            {
              role: "user",
              content: question,
            },
          ],
          temperature: 0.7,
          max_tokens: 300,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiResponse = response.data.choices[0].message.content;

      // Try to parse JSON response
      try {
        return {
          ...JSON.parse(aiResponse),
          sender: "ai",
        };
      } catch {
        // If not JSON, return as text
        return {
          text: aiResponse,
          sender: "ai",
        };
      }
    } catch (error) {
      console.error("OpenAI API error:", error);
      // Fallback to keyword response
      return {
        ...getKeywordResponse(question),
        sender: "ai",
      };
    }
  } else {
    // Use keyword response if no API key
    return {
      ...getKeywordResponse(question),
      sender: "ai",
    };
  }
};
