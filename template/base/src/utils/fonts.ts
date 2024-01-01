import {
  Open_Sans as FontBody,
  Poppins as FontHeading,
} from "next/font/google";

export const fontBody = FontBody({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const fontHeading = FontHeading({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
});
