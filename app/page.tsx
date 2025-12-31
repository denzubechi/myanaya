"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll("[data-animate]");
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.7;
        if (isVisible) {
          setTimeout(() => {
            el.classList.add("animate-in");
          }, index * 100);
        }
      });

      // Track scroll progress for animations
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const FloatingFlower = ({
    delay,
    size = "w-2 h-2",
  }: {
    delay: number;
    size?: string;
  }) => (
    <div
      className={`absolute ${size} bg-blush-pink rounded-full opacity-60`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `-10px`,
        animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  );

  const FlowerDecoration = ({ animate = false }: { animate?: boolean }) => (
    <div
      className={`flex justify-center my-12 sm:my-16 lg:my-20 ${
        animate ? "animate-pulse" : ""
      }`}
    >
      <div className="relative w-16 h-16 sm:w-20 sm:h-20">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-blush-pink/30 drop-shadow-sm"
          style={animate ? { animation: "spin 20s linear infinite" } : {}}
        >
          <g>
            {/* Petals */}
            <circle cx="50" cy="20" r="10" fill="currentColor" opacity="0.8" />
            <circle cx="80" cy="30" r="10" fill="currentColor" opacity="0.7" />
            <circle cx="80" cy="70" r="10" fill="currentColor" opacity="0.8" />
            <circle cx="50" cy="80" r="10" fill="currentColor" opacity="0.7" />
            <circle cx="20" cy="70" r="10" fill="currentColor" opacity="0.8" />
            <circle cx="20" cy="30" r="10" fill="currentColor" opacity="0.7" />
            {/* Center */}
            <circle cx="50" cy="50" r="12" fill="currentColor" opacity="0.9" />
          </g>
        </svg>
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="bg-gradient-to-b from-cream via-warm-white to-cream min-h-screen overflow-x-hidden"
    >
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-blush-pink/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-xl sm:text-2xl font-light text-rose-brown">
              My Anaya
            </h1>
            <button
              onClick={() =>
                document
                  .getElementById("final")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-sm sm:text-base text-rose-brown/70 hover:text-rose-brown transition-colors duration-300"
            >
              Our Story
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 sm:top-20 left-4 sm:left-20 w-24 sm:w-32 h-24 sm:h-32 bg-blush-pink/20 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-16 sm:bottom-32 right-2 sm:right-10 w-32 sm:w-40 h-32 sm:h-40 bg-warm-beige/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative z-10 text-center max-w-2xl" data-animate>
          <div className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light text-rose-brown mb-4 sm:mb-6 leading-tight">
            As the year comes to an end...
          </div>
          <div className="text-base sm:text-xl lg:text-2xl text-rose-brown/70 font-light leading-relaxed px-2">
            with flowers in bloom, there's a story I want you to read.
          </div>
        </div>

        <button
          onClick={() =>
            document
              .getElementById("story")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 inline-flex flex-col items-center gap-2 text-rose-brown/70 hover:text-rose-brown transition-colors duration-300 group"
        >
          <span className="text-xs sm:text-sm tracking-widest uppercase">
            Scroll to continue
          </span>
          <ChevronDown className="w-4 sm:w-5 h-4 sm:h-5 animate-bounce" />
        </button>

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <FloatingFlower
              key={`petal-${i}`}
              delay={i * 0.4}
              size="w-1.5 h-1.5 sm:w-2 sm:h-2"
            />
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section
        id="story"
        className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-2xl mx-auto">
          <div
            data-animate
            className="mb-12 sm:mb-16 lg:mb-20 opacity-0 transition-all duration-700"
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-rose-brown mb-6 sm:mb-8">
              When You Came to Visit
            </h2>
            <p className="text-base sm:text-lg text-rose-brown/70 font-light leading-relaxed mb-4 sm:mb-6">
              I remember that day so clearly. You came to see my sister,
              stepping into our home like spring itself had arrived. I was
              asleep when you got therecompletely unaware of how that moment
              would change everything.
            </p>
            <p className="text-base sm:text-lg text-rose-brown/70 font-light leading-relaxed">
              But the moment I woke and met you, something shifted. We clicked
              instantly, effortlessly. It was like meeting someone you'd always
              known but never found. That same day, I knew you were different.
              You were the one.
            </p>
          </div>

          <FlowerDecoration />
        </div>
      </section>

      {/* Connection Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-blush-pink/5">
        <div className="max-w-2xl mx-auto">
          <div
            data-animate
            className="mb-12 sm:mb-16 opacity-0 transition-all duration-700"
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-rose-brown mb-6 sm:mb-8">
              A Natural Connection
            </h2>
            <p className="text-base sm:text-lg text-rose-brown/70 font-light leading-relaxed mb-4 sm:mb-6">
              What struck me most was how natural it all felt. There was no
              awkwardness, no second-guessing. With you, everything flowed like
              it was meant to be. Your laugh, your presence, the way you saw the
              world, it all resonated with something deep within me.
            </p>
            <p className="text-base sm:text-lg text-rose-brown/70 font-light leading-relaxed">
              In that effortless connection, I found home. Not in a place, but
              in a person. In you.
            </p>
          </div>
        </div>
      </section>

      {/* Ups and Downs Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div
            data-animate
            className="mb-12 sm:mb-16 opacity-0 transition-all duration-700"
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-rose-brown mb-6 sm:mb-8">
              Through the Seasons
            </h2>
            <p className="text-base sm:text-lg text-rose-brown/70 font-light leading-relaxed mb-4 sm:mb-6">
              Like any beautiful story, ours has had its chapters of challenge.
              We've known ups and downs, moments where growth felt painful and
              understanding seemed distant. But in those difficult seasons, I
              learned something profound about us.
            </p>
            <p className="text-base sm:text-lg text-rose-brown/70 font-light leading-relaxed mb-4 sm:mb-6">
              We chose each other. Again and again. Not because things were
              easy, but because what we have is worth fighting for. Every
              struggle became a thread that wove us closer together, creating
              something stronger than before.
            </p>
            <p className="text-base sm:text-lg text-rose-brown/70 font-light leading-relaxed">
              You've taught me that real love isn't just the honeymoon phase,
              it's the commitment to see someone through their darkness and help
              them find their light again.
            </p>
          </div>

          <FlowerDecoration animate />
        </div>
      </section>

      {/* Promise Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-warm-white/50">
        <div className="max-w-2xl mx-auto">
          <div
            data-animate
            className="mb-12 sm:mb-16 opacity-0 transition-all duration-700"
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-rose-brown mb-6 sm:mb-8">
              My Promise to You
            </h2>
            <p className="text-base sm:text-lg text-rose-brown/70 font-light leading-relaxed mb-4 sm:mb-6">
              As this year closes and we step into what's next, I want you to
              know something that burns steadily in my heart: my deepest wish is
              to always see you win.
            </p>
            <p className="text-base sm:text-lg text-rose-brown/70 font-light leading-relaxed mb-4 sm:mb-6">
              I want to be there for your growth, your healing, your triumphs. I
              want to celebrate every victory, no matter how small. I want to
              hold you through the hard times and remind you of your strength
              when you forget it.
            </p>
            <p className="text-base sm:text-lg text-rose-brown/70 font-light leading-relaxed">
              You are the bloom that makes my year complete. And I promise to
              water that bloom, to help it grow, to protect it from storms, and
              to stand in awe of its beauty every single day.
            </p>
          </div>
        </div>
      </section>

      {/* Final Section */}
      <section
        id="final"
        className="relative min-h-screen flex flex-col items-center justify-center py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 sm:top-10 right-4 sm:right-20 w-32 sm:w-48 h-32 sm:h-48 bg-blush-pink/20 rounded-full blur-3xl" />
          <div className="absolute bottom-8 sm:bottom-20 left-2 sm:left-10 w-40 sm:w-56 h-40 sm:h-56 bg-warm-beige/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center max-w-3xl" data-animate>
          <div className="font-serif text-5xl sm:text-6xl lg:text-8xl font-light text-rose-brown mb-6 sm:mb-8 leading-tight">
            My Anaya
          </div>

          <p className="text-lg sm:text-xl lg:text-2xl text-rose-brown/60 font-light leading-relaxed mb-8 sm:mb-12 px-2">
            This is my story for you. A story of meeting you, loving you,
            growing with you, and promising to always see the best in you and
            fight for us.
          </p>

          <div className="space-y-3 sm:space-y-4">
            <p className="text-base sm:text-lg text-rose-brown/70 font-light">
              Thank you for being the bloom that makes my year complete.
            </p>
            <p className="text-base sm:text-lg text-rose-brown/70 font-light">
              Here's to the next chapter we write together.
            </p>
            <p className="text-xl sm:text-2xl font-serif text-rose-brown mt-6 sm:mt-8">
              Always yours, Sucre ❤️
            </p>
            <p className="text-base sm:text-xl text-rose-brown/60 font-light">
              With all my love.
            </p>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={`final-petal-${i}`}
              className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-blush-pink rounded-full opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float-slow ${
                  6 + Math.random() * 4
                }s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          20% {
            opacity: 0.4;
          }
          80% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-50px) translateX(50px);
            opacity: 0;
          }
        }

        [data-animate] {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
