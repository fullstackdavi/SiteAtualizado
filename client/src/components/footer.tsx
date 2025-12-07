import { Link } from "wouter";
import { memo } from "react";

export function Footer() {
  return (
    <footer className="relative border-t border-[#FFD700]/10 py-8 bg-black/60 backdrop-blur-sm" data-testid="footer">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          <Link href="/" className="flex items-center gap-2" data-testid="link-footer-logo">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center gold-glow">
              <i className="fas fa-bolt text-black text-lg"></i>
            </div>
            <span className="text-xl font-bold text-white">
              Digital<span className="gold-text-glow">Soluctions</span>
            </span>
          </Link>

          <p className="text-white/40 text-sm">
            &copy; 2025 Digital Soluctions. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export const MemoizedFooter = memo(Footer);
