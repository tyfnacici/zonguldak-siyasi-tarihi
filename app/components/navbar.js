import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white text-blue-600 p-4 border-b-[2px] border-slate-200 md:text-lg text-xl">
      <div className="container flex flex-col md:flex-row mx-auto gap-y-6 md:gap-y-0 justify-between items-center">
        <div className="text-black text-center md:text-2xl text-4xl font-bold">Zonguldak İlinde Siyaset</div>
        <div className="md:gap-x-14 gap-x-5 flex text-center justify-center items-center">
          <Link href="/" className='hover:underline flex'>
            Ana Sayfa
          </Link>
          <Link href="/hakkinda" className="hover:underline">
            Hakkında
          </Link>
          <Link href="/iletisim" className="hover:underline">
            İletişim
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
