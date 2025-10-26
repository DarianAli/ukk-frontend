// import Image from "next/image";

// const images = [
//   "/image/gambar1.jpg",
//   "/image/gambar2.jpg",
//   "/image/gambar3.jpg",
//   "/image/gambar4.jpg",
// ];

// const DashboardPage = () => {
//   return (
//     <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden bg-white">
//       {/* Left Section */}
//       <div className="md:w-1/2 flex flex-col justify-center items-start px-10 space-y-6">
//         <h1 className="text-5xl font-bold text-[#4E635E] leading-tight">
//           Belum punya kos? <br />
//           <span className="text-[#A6B4AE]">Temukan pilihan terbaikmu!</span>
//         </h1>
//         <p className="text-[#4E635E] text-lg max-w-md">
//           Jelajahi kos yang nyaman, aman, dan sesuai kebutuhanmu hanya di{" "}
//           <strong>KosHunter</strong>.
//         </p>
//         <button className="bg-[#4E635E] text-white px-6 py-3 rounded-full hover:bg-[#3b504b] transition">
//           Temukan Sekarang
//         </button>
//       </div>

//       {/* Right Section - Auto Slideshow */}
//       <div className="md:w-1/2 relative h-full overflow-hidden rounded-l-3xl">
//         {images.map((src, index) => (
//           <div
//             key={index}
//             className="absolute inset-0 opacity-0 animate-fadeShow"
//             style={{
//               animationDelay: `${index * 4}s`,
//               animationDuration: `${images.length * 4}s`,
//             }}
//           >
//             <Image
//               src={src}
//               alt={`Foto kamar ${index + 1}`}
//               fill
//               className="object-cover"
//               sizes="50vw"
//               priority={index === 0}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;



import Image from "next/image";
import Link from "next/link";
import { BASE_IMAGE_KOS, BASE_API_URL } from "@/global";

type Kos = {
  idKos: number;
  name: string;
  address: string;
  price_per_month: string;
  foto: { foto: string }[];
};

export default async function DashboardPage() {
  const res = await fetch(`${BASE_API_URL}/kos/recommendations`, {
    cache: "no-store", // agar setiap refresh dapat random
  });

  const result = await res.json();
  const rekomendasi: Kos[] = result.data || [];


  // Gambar untuk slideshow
  const images = [
    "/image/gambar1.jpg",
    "/image/gambar2.jpg",
    "/image/gambar3.jpg",
    "/image/gambar4.jpg",
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Section: Hero */}
      <div className="flex flex-col md:flex-row w-full overflow-hidden">
        {/* Left Section */}
        <div className="md:w-1/2 flex flex-col justify-center items-start px-10 space-y-6">
          <h1 className="text-5xl font-bold text-[#4E635E] leading-tight">
            Belum punya kos? <br />
            <span className="text-[#A6B4AE]">Temukan pilihan terbaikmu!</span>
          </h1>
          <p className="text-[#4E635E] text-lg max-w-md">
            Jelajahi kos yang nyaman, aman, dan sesuai kebutuhanmu hanya di{" "}
            <strong>KosHunter</strong>.
          </p>
          <button className="bg-[#4E635E] text-white px-6 py-3 rounded-full hover:bg-[#3b504b] transition">
            Temukan Sekarang
          </button>
        </div>

        {/* Right Section - Auto Slideshow */}
        <div className="md:w-1/2 relative h-[90vh] overflow-hidden rounded-l-3xl">
          {images.map((src, index) => (
            <div
              key={index}
              className="absolute inset-0 opacity-0 animate-fadeShow"
              style={{
                animationDelay: `${index * 4}s`,
                animationDuration: `${images.length * 4}s`,
              }}
            >
              <Image
                src={src}
                alt={`Foto kos ${index + 1}`}
                fill
                className="object-cover"
                sizes="50vw"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Section: Rekomendasi Kos */}
      <section className="mt-10 px-10">
        <h2 className="text-3xl font-semibold text-[#4E635E] mb-6">
          Rekomendasi Kos Untukmu
        </h2>
        <div className="flex overflow-x-auto space-x-6 scrollbar-hide">
  {rekomendasi.map((kos) => (
    <Link
      key={kos.idKos}
      href={`/society/kos/${kos.idKos}`}
      className="flex-shrink-0 relative w-72 h-48 rounded-2xl overflow-hidden group"
    >
      {/* Foto background */}
      <Image
        src={
          kos.foto.length > 0
            ? `${BASE_IMAGE_KOS}/${kos.foto[0].foto}`
            : "/image/no-image.jpg"
        }
        alt={kos.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Overlay hitam transparan */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] transition-opacity duration-300 group-hover:bg-black/60"></div>

      {/* Teks nama & alamat */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-lg font-semibold truncate">{kos.name}</h3>
        <p className="text-sm opacity-90 truncate">{kos.address}</p>
      </div>
    </Link>
  ))}
</div>
      </section>
      <footer className="bg-[#2E3B36] text-white py-10 px-10 mt-20 rounded-3xl">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div>
      <h3 className="text-xl font-semibold mb-2">KosHunter</h3>
      <p className="text-sm text-gray-300">
        Temukan kos terbaik dengan mudah, cepat, dan terpercaya.
      </p>
    </div>
    <div>
      <h4 className="font-semibold mb-2">Navigasi</h4>
      <ul className="space-y-1 text-sm text-gray-300">
        <li><a href="/" className="hover:text-white">Beranda</a></li>
        <li><a href="/tentang" className="hover:text-white">Tentang Kami</a></li>
        <li><a href="/bantuan" className="hover:text-white">Bantuan</a></li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold mb-2">Kontak</h4>
      <p className="text-sm text-gray-300">Email: darianaliapr@gmail.com</p>
      <p className="text-sm text-gray-300">Instagram: @darianaliapr</p>
    </div>
  </div>
  <div className="border-t border-gray-600 mt-8 pt-4 text-center text-sm text-gray-400">
    © {new Date().getFullYear()} Darian Ali Aprianto.
  </div>
</footer>
    </div>
  );
}

