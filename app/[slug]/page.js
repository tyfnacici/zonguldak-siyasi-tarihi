// app/[slug]/page.js
import axios from 'axios';
import cheerio from 'cheerio';
import { notFound } from 'next/navigation';
import Head from 'next/head';

// Wikipedia'dan içerik çekme fonksiyonu
async function fetchPageContent(slug) {
  try {
    const url = `https://tr.wikipedia.org/wiki/${slug}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const title = $('title').text().replace(' - Vikipedi', '');
    let content = $('.mw-parser-output').html();

    // İçeriği temizleme
    content = cleanContent(content);
    return { title, content };
  } catch (error) {
    console.error('İçerik alınırken bir hata oluştu:', error);
    notFound();
  }
}

// İçerikteki gereksiz elemanları temizleme fonksiyonu
const cleanContent = (html) => {
  const $ = cheerio.load(html);

  // Belirli id'lere sahip elemanları kaldır
  $('#Kaynakça').remove();
  $('.navbox').remove();
  $('.mw-editsection').remove();
  $('.references').remove();
  $('.printfooter').remove();
  $('caption').remove();
  $('h1').remove();
  $('h2').remove();
  $('h3').remove();

  // Belirli metin içeren liste elemanlarını kaldır
  $('ul li').each((index, element) => {
    const text = $(element).text();
    if (text.includes('Bazı Metin')) {  // "Bazı Metin" yerine hedef metni yazın
      $(element).remove();
    }
  });

  // İçeriği döndür
  return $.html();
};

export default async function Page({ params }) {
  const { slug } = params;
  const { title, content } = await fetchPageContent(slug);

  if (!content) {
    notFound();
  }

  return (
    <>
      <Head>
        <title className='text-black'>{title}</title>
        <meta name="description" content={`Wikipedia sayfası: ${title}`} />
      </Head>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex items-center justify-center">
        <div className="container mx-auto max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden p-6 space-y-6">
          <a href="/" className="block text-center text-blue-600 hover:underline text-lg">Geri Dön</a>
          <h1 className="text-2xl text-black font-bold md:text-3xl lg:text-4xl text-center">{title}</h1>
          <div className="prose lg:prose-xl mx-auto flex items-center text-black flex-col gap-y-8" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </>
  );
}
