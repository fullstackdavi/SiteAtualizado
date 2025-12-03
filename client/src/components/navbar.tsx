import { useState, useEffect, useRef, memo, useCallback } from "react";
import { Link, useLocation } from "wouter";
import gsap from "gsap";

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#solucoes", label: "Soluções" },
];

export function Navbar() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const scrollingDown = currentY > lastScrollY.current;
          
          if (currentY > 50 && scrollingDown && !isMinimized) {
            setIsMinimized(true);
          } else if (currentY <= 50 || (!scrollingDown && isMinimized)) {
            setIsMinimized(false);
          }
          
          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMinimized]);

  useEffect(() => {
    if (!navContainerRef.current) return;
    
    if (animationRef.current) {
      animationRef.current.kill();
    }

    if (isMinimized) {
      animationRef.current = gsap.to(navContainerRef.current, {
        scale: 0.92,
        backgroundColor: 'rgba(10, 15, 30, 0.4)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 200, 0, 0.08)',
        padding: '8px 20px',
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      animationRef.current = gsap.to(navContainerRef.current, {
        scale: 1,
        backgroundColor: 'rgba(10, 15, 30, 0)',
        backdropFilter: 'blur(0px)',
        WebkitBackdropFilter: 'blur(0px)',
        borderRadius: '0px',
        boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
        padding: '12px 24px',
        duration: 0.5,
        ease: "power2.out",
      });
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [isMinimized]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        const navHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - navHeight,
          behavior: "smooth"
        });
      }
      setIsMobileMenuOpen(false);
    }
  }, []);

  const isProductPage = location.startsWith("/servico");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 md:py-6" data-testid="navbar">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <div 
          ref={navContainerRef}
          className="flex items-center justify-between md:justify-center gap-4 md:gap-8 lg:gap-12 transform-gpu"
          style={{
            padding: '12px 24px',
            backgroundColor: 'rgba(10, 15, 30, 0)',
            backdropFilter: 'blur(0px)',
            WebkitBackdropFilter: 'blur(0px)',
            borderRadius: '0px',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
            willChange: 'transform, background-color, backdrop-filter, border-radius, box-shadow, padding',
          }}
        >
          <Link href="/" className="flex items-center group flex-shrink-0" data-testid="link-logo">
            <div 
              className="rounded-xl flex items-center justify-center flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              }}
            >
              <i className="fas fa-bolt text-black text-base sm:text-lg" />
            </div>
            
            <div className="flex items-center ml-2 sm:ml-3">
              <span className="text-lg sm:text-xl font-bold text-white group-hover:text-[#FFD700] transition-colors leading-tight whitespace-nowrap">
                Digital<span className="text-[#FFD700]">Soluctions</span>
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {isProductPage ? (
              <Link 
                href="/" 
                className="text-white/70 hover:text-[#FFD700] transition-colors font-medium whitespace-nowrap text-sm lg:text-base"
                data-testid="link-back-home"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Voltar ao Início
              </Link>
            ) : (
              navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-white/70 hover:text-[#FFD700] transition-colors font-medium whitespace-nowrap text-sm lg:text-base"
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              ))
            )}
          </div>

          <a
            href="https://wa.me/5531993640574?text=Olá, quero impulsionar meu negócio... 🚀"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 rounded-xl font-semibold text-sm flex-shrink-0 hover:shadow-[0_4px_20px_rgba(255,215,0,0.3)] active:scale-[0.98] transition-all py-2.5 px-4 lg:py-3 lg:px-5"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              color: '#000000',
            }}
            data-testid="button-whatsapp-nav"
          >
            <i className="fab fa-whatsapp text-lg"></i>
            <span className="whitespace-nowrap">
              Fale Conosco
            </span>
          </a>

          <button
            className="md:hidden p-2 text-white hover:text-[#FFD700] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu"
          >
            <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"} text-2xl`}></i>
          </button>
        </div>
      </div>

      <div 
        className="container mx-auto px-4 sm:px-6 md:hidden"
        style={{
          maxHeight: isMobileMenuOpen ? '400px' : '0px',
          opacity: isMobileMenuOpen ? 1 : 0,
          marginTop: isMobileMenuOpen ? '12px' : '0px',
          overflow: 'hidden',
          transition: 'all 0.3s ease-out'
        }}
      >
        <div 
          className="p-5 space-y-3 rounded-2xl"
          style={{
            background: 'rgba(10, 15, 30, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 200, 0, 0.12)'
          }}
        >
          {isProductPage ? (
            <Link
              href="/"
              className="block text-white/70 hover:text-[#FFD700] transition-colors font-medium py-2 text-center"
              onClick={() => setIsMobileMenuOpen(false)}
              data-testid="link-mobile-back"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Voltar ao Início
            </Link>
          ) : (
            navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block text-white/70 hover:text-[#FFD700] transition-colors font-medium py-2 text-center"
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))
          )}
          <a
            href="https://wa.me/5531993640574?text=Olá, quero impulsionar meu negócio... 🚀"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-4 py-3 px-6 rounded-xl font-semibold"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              color: '#000000',
            }}
            data-testid="button-whatsapp-mobile"
          >
            <i className="fab fa-whatsapp text-lg"></i>
            Fale Conosco
          </a>
        </div>
      </div>
    </nav>
  );
}

export const MemoizedNavbar = memo(Navbar);
