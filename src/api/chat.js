import { Document } from "./entities";
import { InvokeLLM } from "./integrations";

/**
 * Send a chat query to the LLM with additional context from stored documents.
 * Performs a document search using Document.list to gather contextual data.
 * @param {string} prompt - User question or prompt.
 * @returns {Promise<any>} LLM response.
 */
export async function chat(prompt) {
  let context = "";
  try {
    const docs = await Document.list({ search: prompt, limit: 5 });
    if (Array.isArray(docs) && docs.length) {
      context = docs
        .map((d) => `${d.title || ""}${d.description ? " - " + d.description : ""}`)
        .join("\n");
    }
  } catch (error) {
    console.error("Error fetching context documents:", error);
  }

  try {
    return await InvokeLLM({ prompt, context });
  } catch (error) {
    console.error("Error invoking LLM:", error);
    throw error;
  }
}
