import './globals.css';

export const metadata = {
  title: 'Zonguldak Siyasi Tarihi',
  description: 'Zonguldak ilinin siyasi tarihi, seçim sonuçları ve siyasi partiler hakkında detaylı bilgiler.',
  keywords: 'Zonguldak, siyasi tarih, seçim sonuçları, siyasi partiler, Türkiye, Kömürkent, Zonguldakspor, Kömürspor, 67',
  author: 'Tayfun Açıcı',
  openGraph: {
    title: 'Zonguldak Siyasi Tarihi',
    description: 'Zonguldak ilinin siyasi tarihi, seçim sonuçları ve siyasi partiler hakkında detaylı bilgiler.',
    url: 'https://zonguldak-siyasi-tarihi.vercel.app', // Site URL'sini buraya ekleyin
    type: 'website',
    locale: 'tr_TR',
  },
};

export default function RootLayout({ children }) {

  return (
    <html lang="tr">
      <head>
      <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:locale" content={metadata.openGraph.locale} />
        <title>{metadata.title}</title>
      </head>
      <body className="bg-white">
        {children}
      </body>
    </html>
  );
}
