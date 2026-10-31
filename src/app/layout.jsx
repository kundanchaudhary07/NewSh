import './globals.css';

export const metadata = {
  title: 'Happy Birthday POOJA · 1 November',
  description: 'A special birthday celebration for POOJA.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark min-h-screen antialiased">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="256x256" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=Caveat:wght@400;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&family=Space+Mono:wght@400;700&family=Work+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen w-full m-0 p-0 bg-black text-white selection:bg-amber-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
