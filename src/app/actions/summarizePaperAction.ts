"use server";

import { z } from "zod";
import { summarizeResearchPaper, type SummarizeResearchPaperInput, type SummarizeResearchPaperOutput } from "@/ai/flows/summarize-research-paper";

const SummarizeSchema = z.object({
  paperText: z.string().min(1, { message: "Paper text cannot be empty." }),
});

interface ActionResult {
  success: boolean;
  data?: SummarizeResearchPaperOutput;
  error?: string;
}

export async function summarizePaperAction(
  input: SummarizeResearchPaperInput
): Promise<ActionResult> {
  try {
    const validatedInput = SummarizeSchema.safeParse(input);
    if (!validatedInput.success) {
      return { success: false, error: validatedInput.error.errors.map(e => e.message).join(', ') };
    }

    const summaryOutput = await summarizeResearchPaper(validatedInput.data);
    return { success: true, data: summaryOutput };
  } catch (error) {
    console.error("Error in summarizePaperAction:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during summarization.";
    return { success: false, error: errorMessage };
  }
}
