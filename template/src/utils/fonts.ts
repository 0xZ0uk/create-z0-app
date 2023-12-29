import {
	Open_Sans as FontSans,
	Playfair_Display as FontSerif,
} from "next/font/google";

export const fontSans = FontSans({
	weight: ["400", "700"],
	subsets: ["latin"],
	variable: "--font-sans",
});

export const fontSerif = FontSerif({
	weight: ["400", "700"],
	subsets: ["latin"],
	variable: "--font-serif",
});
