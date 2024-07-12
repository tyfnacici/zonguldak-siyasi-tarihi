import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Zonguldak Siyasi Tarihi</title>
      </head>
      <body className='bg-white'>
        {children}
      </body>
    </html>
  );
}
