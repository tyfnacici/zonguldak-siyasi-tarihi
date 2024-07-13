import Navbar from "./components/navbar";
import axios from "axios";
import cheerio from "cheerio";
import Link from "next/link";

async function fetchPages() {
  const url = "https://tr.wikipedia.org/wiki/Kategori:Zonguldak_ilinde_siyaset";
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const generalElections = [];
  const localElections = [];
  const others = [];

  // Remove unwanted elements
  $('li:contains("Şablon:Zonguldak\'ta seçimler")').remove();
  $('li:contains("Zonguldak ili genel seçim sonuçları")').remove();

  $("#mw-pages a").each((index, element) => {
    const title = $(element).text();
    const href = $(element).attr("href");

    if (title.includes("Türkiye genel seçimleri")) {
      generalElections.push({ title, href });
    } else if (title.includes("Türkiye yerel seçimleri")) {
      localElections.push({ title, href });
    } else {
      others.push({ title, href });
    }
  });

  return { generalElections, localElections, others };
}

export default async function Home() {
  const { generalElections, localElections, others } = await fetchPages();

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-6">
        <div className="w-full max-w-6xl space-y-8">
          <CategorySection title="Türkiye Genel Seçimleri" pages={generalElections} />
          <CategorySection title="Türkiye Yerel Seçimleri" pages={localElections} />
          <CategorySection title="Diğer Seçimler" pages={others} />
        </div>
      </div>
    </>
  );
}

function CategorySection({ title, pages }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {pages.map((page, index) => (
          <Link
            key={index}
            href={`/${page.href.replace("/wiki/", "")}`}
            legacyBehavior
          >
            <a className="block bg-slate-200 p-4 rounded shadow-md text-center text-blue-500 hover:bg-blue-100 hover:underline">
              {page.title}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
