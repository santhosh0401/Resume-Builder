import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { PersonalInfo } from "@/types/resume";

/**
 * Generate a short professional summary from the provided personal info.
 * This is a deterministic, client-side helper (no network calls).
 */
export function generateSummary(info: PersonalInfo, opts?: { tone?: 'professional' | 'friendly', maxSentences?: number }) {
  const tone = opts?.tone ?? 'professional';
  const max = opts?.maxSentences ?? 3;

  const pieces: string[] = [];

  if (info.title) {
    pieces.push(`${info.title} with proven experience in building scalable web applications and collaborating across teams.`);
  } else {
    pieces.push(`Results-driven software professional with experience building web applications.`);
  }

  // add optional highlights based on contact fields existence
  const extras: string[] = [];
  if (info.linkedin) extras.push('professional networking and open-source contributions');
  if (info.github) extras.push('hands-on projects and code samples');
  if (extras.length) pieces.push(`Skilled in ${extras.join(' and ')}.`);

  // tone variations
  if (tone === 'friendly') {
    pieces.push(`Eager to learn, collaborate, and deliver impact on user-facing products.`);
  } else {
    pieces.push(`Passionate about delivering robust, maintainable solutions that drive measurable results.`);
  }

  // Combine and limit sentences
  const sentences = pieces.join(' ').split(/(?<=\.)\s+/).filter(Boolean).slice(0, max);
  const summary = sentences.join(' ');
  return summary.trim();
}

/**
 * Copy text to clipboard with a safe fallback.
 */
export async function copyToClipboard(text: string) {
  if (!text) return false;
  try {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (e) {
    // fallthrough to execCommand
  }

  // fallback for older browsers
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    return true;
  } catch (e) {
    return false;
  }
}
