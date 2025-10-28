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
    cache: "no-store",
  });

  const result = await res.json();
  const rekomendasi: Kos[] = result.data || [];

  const images = [
    "/image/gambar1.jpg",
    "/image/gambar2.jpg",
    "/image/gambar3.jpg",
    "/image/gambar4.jpg",
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[600px] md:min-h-[700px] overflow-hidden">
        <div className="container mx-auto px-4 py-12 md:py-0">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center min-h-[600px] md:min-h-[700px]">
            {/* Left Content */}
            <div className="flex flex-col justify-center space-y-6 z-10 order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4E635E] leading-tight">
                Belum punya kos?{" "}
                <span className="block text-[#A6B4AE] mt-2">
                  Temukan pilihan terbaikmu!
                </span>
              </h1>
              <p className="text-[#4E635E]/80 text-base md:text-lg max-w-md">
                Jelajahi kos yang nyaman, aman, dan sesuai kebutuhanmu hanya di{" "}
                <strong className="text-[#4E635E]">KosHunter</strong>.
              </p>
              <div>
                <button className="bg-[#4E635E] text-white rounded-full px-8 py-6 text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Temukan Sekarang
                </button>
              </div>
            </div>

            {/* Right Slideshow */}
            <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl order-1 md:order-2">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="absolute inset-0 opacity-0"
                  style={{
                    animation: `fadeShow 16s ease-in-out infinite`,
                    animationDelay: `${index * 4}s`,
                  }}
                >
                  <Image
                    src={img}
                    alt={`Kos slideshow ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading={index === 0 ? "eager" : "lazy"}
                    priority={index === 0}
                  />
                </div>
              ))}

              {/* Slideshow indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full bg-white/50 transition-all duration-300"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rekomendasi Kos */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4E635E] mb-2">
            Rekomendasi Kos Untukmu
          </h2>
          <p className="text-[#4E635E]/60">
            Pilihan kos terbaik yang kami rekomendasikan khusus untuk kamu
          </p>
        </div>

        {/* Horizontal scroll container */}
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
          {rekomendasi.map((kos) => (
            <Link
              key={kos.idKos}
              href={`/society/kos/${kos.idKos}`}
              className="flex-shrink-0 w-72 md:w-80 group cursor-pointer"
            >
              <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Image with lazy loading */}
                <Image
                  src={
                    kos.foto.length > 0
                      ? `${BASE_IMAGE_KOS}/${kos.foto[0].foto}`
                      : "/image/no-image.jpg"
                  }
                  alt={kos.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 288px, 320px"
                  loading="lazy"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/80"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="text-lg md:text-xl font-semibold mb-1 truncate group-hover:text-[#A6B4AE] transition-colors duration-300">
                    {kos.name}
                  </h3>
                  <p className="text-sm opacity-90 truncate mb-2">{kos.address}</p>
                  <p className="text-base font-bold">{kos.price_per_month}</p>
                </div>

                {/* Hover indicator */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#4E635E] text-white py-12 px-4 mt-20 rounded-3xl">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold mb-3">KosHunter</h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Temukan kos terbaik dengan mudah, cepat, dan terpercaya.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-semibold mb-3 text-lg">Navigasi</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-white/80 hover:text-white transition-colors duration-200"
                  >
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tentang"
                    className="text-white/80 hover:text-white transition-colors duration-200"
                  >
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bantuan"
                    className="text-white/80 hover:text-white transition-colors duration-200"
                  >
                    Bantuan
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-3 text-lg">Kontak</h4>
              <div className="space-y-2 text-sm text-white/80">
                <p>Email: darianaliapr@gmail.com</p>
                <p>Instagram: @darianaliapr</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/20 mt-8 pt-6 text-center">
            <p className="text-sm text-white/70">
              © {new Date().getFullYear()} Darian Ali Aprianto.
            </p>
          </div>
        </div>
      </footer>

      {/* <style jsx>{`
        @keyframes fadeShow {
          0%, 20% {
            opacity: 1;
            transform: scale(1);
          }
          25%, 100% {
            opacity: 0;
            transform: scale(1.05);
          }
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style> */}
    </div>
  );
}

