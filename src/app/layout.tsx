import "./globals.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="w-screen min-h-screen antialiased dark:bg-slate-950 dark:text-slate-200">{children}</body>
    </html>
  );
}
