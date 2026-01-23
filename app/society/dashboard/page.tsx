import Image from "next/image";
import Link from "next/link";
import { BASE_API_URL, BASE_IMAGE_KOS } from "@/global";

type Kos = {
    idKos: string;
    name: string;
    address: string;
    price_per_month: string;
    foto: { foto: string }[];
}

export default async function DashboardPage() {
    const res = await fetch(`${BASE_API_URL}/kos/recommendations`, {
        cache: "no-store"
    })
    const result = await res.json();
    const rekomendasi: Kos[] = result.data || []

    const images = [
    "/image/gambar1.jpg",
    "/image/gambar2.jpg",
    "/image/gambar3.jpg",
    "/image/gambar4.jpg",    
    ]

    return (
        <div className="flex flex-col w-full bg-white overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative w-full min-h-[600px] md:min-h-[700px] overflow-hidden">
                <div className="container mx-auto px-4 py-12 md:py-0">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center min-h-[600px] md:min-h-[700px]">
                    {/* Left Content */}
                    <div className="flex flex-col justify-center space-y-6 z-10 order-2 md:order-1 text-center md:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#4E635E] leading-tight">
                        Belum punya kos?{" "}
                        <span className="block text-[#A6B4AE] mt-2">
                        Temukan pilihan terbaikmu!
                        </span>
                    </h1>
                    <p className="text-[#4E635E]/80 text-base md:text-lg max-w-md mx-auto md:mx-0">
                        Jelajahi kos yang nyaman, aman, dan sesuai kebutuhanmu hanya di{" "}
                        <strong className="text-[#4E635E]">KosHunter</strong>.
                    </p>
                    <div>
                        <Link 
                            className="bg-[#4E635E] text-white rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                            href={"/society/kos"}
                        >
                        Temukan Sekarang
                        </Link>
                    </div>
                    </div>

                    {/* Right Slideshow */}
                    <div className="relative h-64 sm:h-80 md:h-[600px] rounded-3xl overflow-hidden shadow-2xl order-1 md:order-2">
                    {images.map((img, index) => (
                        <div
                        key={index}
                        className="absolute inset-0 opacity-0 animate-fade"
                        style={{
                            animationDelay: `${index * 4}s`,
                        }}
                        >
                        <Image
                            src={img}
                            alt={`Kos slideshow ${index + 1}`}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={index === 0}
                        />
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            </section>

            {/* Rekomendasi Kos */}
            <section className="container mx-auto px-4 py-12 sm:py-16">
                <div className="mb-8 text-center md:text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#4E635E] mb-2">
                    Rekomendasi Kos Untukmu
                </h2>
                <p className="text-[#4E635E]/60 text-sm sm:text-base">
                    Pilihan kos terbaik yang kami rekomendasikan khusus untuk kamu
                </p>
                </div>

                {/* Horizontal scroll container */}
                <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth -mx-4 px-4">
                {rekomendasi.map((kos) => (
                    <Link
                    key={kos.idKos}
                    href={`/society/kos`}
                    className="flex-shrink-0 w-64 sm:w-72 md:w-80 group cursor-pointer snap-start"
                    >
                    <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                        <Image
                        src={
                            kos.foto && kos.foto.length > 0
                            ? `${BASE_IMAGE_KOS}/${kos.foto[0].foto}`
                            : "/image/no-image.jpg"
                        }
                        alt={kos.name}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 256px, 320px"
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/80"></div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                        <h3 className="text-lg font-semibold mb-1 truncate group-hover:text-[#A6B4AE] transition-colors duration-300">
                            {kos.name}
                        </h3>
                        <p className="text-xs sm:text-sm opacity-90 truncate mb-1 sm:mb-2">
                            {kos.address}
                        </p>
                        <p className="text-sm sm:text-base font-bold">
                            {kos.price_per_month}
                        </p>
                        </div>

                        {/* Hover indicator */}
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 sm:w-10 h-8 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg
                            className="w-4 sm:w-5 h-4 sm:h-5 text-white"
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
            <footer className="bg-[#4E635E] text-white py-12 px-4 mt-20 rounded-t-3xl">
                <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left">
                    <div>
                    <h3 className="text-2xl font-bold mb-3">KosHunter</h3>
                    <p className="text-sm text-white/80 leading-relaxed max-w-sm mx-auto md:mx-0">
                        Temukan kos terbaik dengan mudah, cepat, dan terpercaya.
                    </p>
                    </div>

                    <div>
                    <h4 className="font-semibold mb-3 text-lg">Navigasi</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                        <Link
                            href="/society/dashboard"
                            className="text-white/80 hover:text-white transition-colors duration-200"
                        >
                            Beranda
                        </Link>
                        </li>
                        <li>
                        <Link
                            href=""
                            className="text-white/80 hover:text-white transition-colors duration-200"
                        >
                            Tentang Kami
                        </Link>
                        </li>
                        <li>
                        <Link
                            href=""
                            className="text-white/80 hover:text-white transition-colors duration-200"
                        >
                            Bantuan
                        </Link>
                        </li>
                    </ul>
                    </div>

                    <div>
                    <h4 className="font-semibold mb-3 text-lg">Kontak</h4>
                    <div className="space-y-2 text-sm text-white/80">
                        <p>Email: darianaliapr@gmail.com</p>
                        <p>Instagram: @darianaliapr</p>
                    </div>
                    </div>
                </div>

                <div className="border-t border-white/20 mt-8 pt-6 text-center">
                    <p className="text-sm text-white/70">
                    © {new Date().getFullYear()} Darian Ali Aprianto.
                    </p>
                </div>
                </div>
            </footer>
        </div>
    )
}