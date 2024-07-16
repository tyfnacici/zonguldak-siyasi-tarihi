import Navbar from "./components/navbar";
import axios from "axios";
import cheerio from "cheerio";
import CategorySection from "./components/categorySection";

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

  // Sort by year (assuming the year is the first 4 digits in the title)
  const extractYear = (title) => {
    const match = title.match(/(\d{4})/);
    return match ? parseInt(match[0], 10) : null;
  };

  const sortByYear = (a, b) => extractYear(a.title) - extractYear(b.title);

  generalElections.sort(sortByYear);
  localElections.sort(sortByYear);
  others.sort(sortByYear);

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