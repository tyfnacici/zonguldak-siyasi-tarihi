// app/[slug]/page.js
import axios from 'axios';
import cheerio from 'cheerio';
import Link from 'next/link';

async function fetchPageContent(slug) {
  const url = `https://tr.wikipedia.org/wiki/${slug}`;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  // İstenmeyen elementleri kaldırıyoruz
  $('#Kaynakça').remove();
  $('.navbox').remove();
  $('.mw-editsection').remove();
  $('.references').remove();
  $('.printfooter').remove();
  $('caption').remove();
  $('h1').remove();
  $('h2').remove();

  // İstenen class'lara sahip elemanları çekiyoruz
  const firstHeading = $('.firstHeading').html();
  const bodyContent = $('.mw-body-content').html();
  const wikitable = $('.wikitable').html();

  return {
    firstHeading: firstHeading || null,
    bodyContent: bodyContent || null,
    wikitable: wikitable || null,
  };
}

export default async function Page({ params }) {
  const { slug } = params;
  const content = await fetchPageContent(slug);

  return (
    <div>
      <Link href="/" legacyBehavior>
        <a>Geri Dön</a>
      </Link>
      {content.firstHeading && (
        <div>
          <h1 dangerouslySetInnerHTML={{ __html: content.firstHeading }} />
        </div>
      )}
      {content.bodyContent && (
        <div dangerouslySetInnerHTML={{ __html: content.bodyContent }} />
      )}
      {content.wikitable && (
        <div dangerouslySetInnerHTML={{ __html: content.wikitable }} />
      )}
    </div>
  );
}
