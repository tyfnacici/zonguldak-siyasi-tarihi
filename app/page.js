// app/page.js
import axios from 'axios';
import cheerio from 'cheerio';
import Link from 'next/link';

async function fetchPages() {
  const url = 'https://tr.wikipedia.org/wiki/Kategori:Zonguldak_ilinde_siyaset';
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const pages = [];
  $('li:contains("Şablon:Zonguldak\'ta seçimler")').remove();
  $('#mw-pages a').each((index, element) => {
    pages.push({
      title: $(element).text(),
      href: $(element).attr('href')
    });
  });
  return pages;
}

export default async function Home() {
  const pages = await fetchPages();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-6">
      <div className='flex flex-col items-center justify-center text-center gap-y-[10px]'>
      <h1 className="text-2xl font-bold">Zonguldak İlinde Siyaset</h1>
      <p className='pb-6'>Geliştirici: Tayfun Açıcı</p>
      </div>
      <div className="w-full max-w-6xl">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {pages.map((page, index) => (
            <Link key={index} href={`/${page.href.replace('/wiki/', '')}`} legacyBehavior>
              <a className="block bg-slate-200 p-4 rounded shadow-md text-center text-blue-500 hover:bg-blue-100 hover:underline">
                {page.title}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
