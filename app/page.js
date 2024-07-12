import axios from 'axios';
import cheerio from 'cheerio';
import Link from 'next/link';

async function fetchPages() {
  const url = 'https://tr.wikipedia.org/wiki/Kategori:Zonguldak_ilinde_siyaset';
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const pages = [];
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
    <div>
      <h1>Zonguldak İlinde Siyaset</h1>
      <ul>
        {pages.map((page, index) => (
          <li key={index}>
            <Link href={`/${page.href.replace('/wiki/', '')}`} legacyBehavior>
              <a>{page.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
