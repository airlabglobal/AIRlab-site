"use client";

import { useState, useTransition } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { summarizePaperAction } from '@/app/actions/summarizePaperAction';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, FileText } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const SummarizeSchema = z.object({
  paperText: z.string().min(100, { message: "Paper text must be at least 100 characters." }).max(50000, {message: "Paper text must be less than 50,000 characters."}),
});

type SummarizeFormValues = z.infer<typeof SummarizeSchema>;

export default function PaperSummarizer() {
  const [summary, setSummary] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SummarizeFormValues>({
    resolver: zodResolver(SummarizeSchema),
  });

  const onSubmit: SubmitHandler<SummarizeFormValues> = (data) => {
    setSummary(null);
    startTransition(async () => {
      try {
        const result = await summarizePaperAction(data);
        if (result.success && result.data) {
          setSummary(result.data.summary);
          toast({
            title: "Summary Generated",
            description: "The research paper has been summarized successfully.",
          });
        } else {
          setSummary(`Error: ${result.error || 'Failed to summarize paper.'}`);
           toast({
            title: "Summarization Error",
            description: result.error || 'Failed to summarize paper.',
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Summarization error:", error);
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
        setSummary(`Error: ${errorMessage}`);
        toast({
          title: "Summarization Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="paperText" className="font-headline text-lg">Paper Text</Label>
          <Textarea
            id="paperText"
            {...register('paperText')}
            rows={10}
            placeholder="Paste the full text of the research paper here..."
            className="mt-1 border-input focus:border-primary"
            disabled={isPending}
          />
          {errors.paperText && <p className="text-sm text-destructive mt-1">{errors.paperText.message}</p>}
        </div>
        <Button type="submit" disabled={isPending} className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Summarizing...
            </>
          ) : (
            <>
             <FileText className="mr-2 h-4 w-4" />
              Summarize Paper
            </>
          )}
        </Button>
      </form>

      {summary && (
        <Card className="mt-6 bg-background shadow-md">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none font-body whitespace-pre-wrap">
              {summary}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
