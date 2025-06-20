'use server';

/**
 * @fileOverview An AI agent for summarizing research papers.
 *
 * - summarizeResearchPaper - A function that summarizes the content of a research paper.
 * - SummarizeResearchPaperInput - The input type for the summarizeResearchPaper function.
 * - SummarizeResearchPaperOutput - The return type for the summarizeResearchPaper function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeResearchPaperInputSchema = z.object({
  paperText: z
    .string()
    .describe('The text content of the research paper to be summarized.'),
});
export type SummarizeResearchPaperInput = z.infer<
  typeof SummarizeResearchPaperInputSchema
>;

const SummarizeResearchPaperOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the research paper content.'),
});
export type SummarizeResearchPaperOutput = z.infer<
  typeof SummarizeResearchPaperOutputSchema
>;

export async function summarizeResearchPaper(
  input: SummarizeResearchPaperInput
): Promise<SummarizeResearchPaperOutput> {
  return summarizeResearchPaperFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeResearchPaperPrompt',
  input: {schema: SummarizeResearchPaperInputSchema},
  output: {schema: SummarizeResearchPaperOutputSchema},
  prompt: `You are an expert AI research paper summarizer.

  Summarize the following research paper. Be concise and accurate.
  
  Research Paper:
  {{paperText}}`,
});

const summarizeResearchPaperFlow = ai.defineFlow(
  {
    name: 'summarizeResearchPaperFlow',
    inputSchema: SummarizeResearchPaperInputSchema,
    outputSchema: SummarizeResearchPaperOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
