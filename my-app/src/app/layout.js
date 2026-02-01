import "./globals.css";

export const metadata = {
  title: "Rithwik — Video Editor & Motion Designer",
  description: "Rithwik's creative portfolio — a cinematic showcase of video editing, motion design, and visual storytelling. Turning footage into cinematic experiences.",
  keywords: "video editor, motion designer, portfolio, cinematic, After Effects, Premiere Pro, DaVinci Resolve",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
