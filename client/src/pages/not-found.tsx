import { Link } from "wouter";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col" data-testid="page-not-found">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="text-[150px] md:text-[200px] font-bold leading-none">
                <span className="neon-text">4</span>
                <span className="text-white">0</span>
                <span className="neon-text">4</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Página não encontrada
            </h1>
            
            <p className="text-white/60 text-lg mb-8">
              A página que você está procurando não existe ou foi movida. 
              Mas não se preocupe, podemos ajudá-lo a encontrar o que precisa.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="btn-primary flex items-center gap-2"
                data-testid="button-go-home"
              >
                <i className="fas fa-home"></i>
                Voltar ao Início
              </Link>
              <a
                href="https://wa.me/5531993640574?text=Olá, quero impulsionar meu negócio... 🚀"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
                data-testid="button-contact-help"
              >
                <i className="fab fa-whatsapp"></i>
                Precisa de Ajuda?
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}