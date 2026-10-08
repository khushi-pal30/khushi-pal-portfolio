import { GoogleGenerativeAI } from "@google/generative-ai";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";


const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const genAI = new GoogleGenerativeAI(API_KEY);

// Construct the system context from portfolio data
const getSystemContext = () => {
    const skillsList = skills.map(s => s.name).join(", ");

    const experienceList = experience.map(exp =>
        `${exp.role} at ${exp.company} (${exp.duration}): ${exp.description.join(" ")}`
    ).join("\n\n");

    const projectsList = projects.map(p =>
        `${p.title}: ${p.description} (Tags: ${p.tags.join(", ")})`
    ).join("\n\n");

    return `
    You are an intelligent virtual assistant for Khushi Pal's portfolio website.
    Your goal is to answer visitor questions about Khushi's professional background, skills, and projects.
    
    Here is Khushi's profile data:
    
    SKILLS:
    ${skillsList}
    
    EXPERIENCE:
    ${experienceList}
    
    PROJECTS:
    ${projectsList}
    
    CONTACT INFO:
    Email: palkhushi163@gmail.com
    
    INSTRUCTIONS:
    1. Be professional, friendly, and concise.
    2. Answer in the first person plural (e.g., "We", "Khushi") or third person ("Khushi is...").
    3. If asked about something not in the data, politely say you don't have that information but they can contact Khushi directly.
    4. Keep responses short (under 3 sentences) unless asked for details.
    5. Highlight relevant skills or projects when answering general questions.
    6. If the API key is missing or invalid, apologize and provide basic info.
  `;
};

export const getGeminiResponse = async (userMessage: string) => {
    if (!API_KEY) {
        return {
            text: "I'm currently offline because my AI brain (API Key) isn't configured yet. Please contact Khushi directly!",
            options: ["Contact Info"]
        };
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-3.8-flash" });

        const prompt = `
      ${getSystemContext()}
      
      User Question: ${userMessage}
      
      Answer:
    `;

        // Gemini occasionally returns 503 "model overloaded" during traffic
        // spikes — this is temporary on Google's side, not a code issue, so
        // retry a couple of times with a short backoff before giving up.
        let result;
        let lastError: unknown;
        const maxAttempts = 3;
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                result = await model.generateContent(prompt);
                lastError = null;
                break;
            } catch (err) {
                lastError = err;
                const message = err instanceof Error ? err.message : String(err);
                const isOverloaded = message.includes("503") || message.toLowerCase().includes("overload") || message.toLowerCase().includes("high demand");
                if (!isOverloaded || attempt === maxAttempts) throw err;
                await new Promise((r) => setTimeout(r, attempt * 800)); // 800ms, then 1600ms
            }
        }
        if (!result) throw lastError;

        const response = await result.response;
        const text = response.text();

        // Simple heuristic to suggest follow-up options based on the response content
        let options: string[] = [];
        if (text.toLowerCase().includes("project")) options = ["Show Projects", "Skills"];
        else if (text.toLowerCase().includes("experience") || text.toLowerCase().includes("work")) options = ["Experience", "Download Resume"];
        else if (text.toLowerCase().includes("contact") || text.toLowerCase().includes("email")) options = ["Copy Email", "LinkedIn"];
        else options = ["Projects", "Experience", "Contact"];

        return { text, options };
    } catch (error) {
        console.error("Gemini API Error:", error);
        const message = error instanceof Error ? error.message : String(error);
        const isOverloaded = message.includes("503") || message.toLowerCase().includes("overload") || message.toLowerCase().includes("high demand");
        return {
            text: isOverloaded
                ? "My AI service is a bit busy right now (high demand on Google's side). Please try again in a moment!"
                : "I'm having trouble connecting to my AI services right now. Please try again later or contact Khushi directly.",
            options: ["Contact Info"]
        };
    }
};