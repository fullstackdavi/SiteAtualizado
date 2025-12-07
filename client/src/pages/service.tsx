import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "wouter";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { services } from "@/components/services-section";
import { AnimatedBenefitCard } from "@/components/animated-benefit-card";
import gsap from "gsap";

import sitesProfissionaisImg1 from "@assets/generated_images/professional_website_multi-device_mockup.png";
import sitesProfissionaisImg2 from "@assets/generated_images/professional_website_desktop_mockup.png";
import sitesProfissionaisImg3 from "@assets/generated_images/professional_website_mobile_mockup.png";
import sitesProfissionaisImg4 from "@assets/generated_images/website_design_process_mockup.png";
import sitesProfissionaisImg5 from "@assets/generated_images/website_analytics_dashboard_mockup.png";
import sitesProfissionaisImg6 from "@assets/generated_images/website_laptop_office_mockup.png";

import ecommerceImg1 from "@assets/generated_images/e-commerce_multi-device_mockup.png";
import ecommerceImg2 from "@assets/generated_images/e-commerce_desktop_store_mockup.png";
import ecommerceImg3 from "@assets/generated_images/e-commerce_mobile_app_mockup.png";
import ecommerceImg4 from "@assets/generated_images/e-commerce_checkout_mockup.png";
import ecommerceImg5 from "@assets/generated_images/e-commerce_admin_dashboard_mockup.png";
import ecommerceImg6 from "@assets/generated_images/e-commerce_tablet_product_mockup.png";

import landingPagesImg1 from "@assets/generated_images/landing_page_multi-device_mockup.png";
import landingPagesImg2 from "@assets/generated_images/landing_page_desktop_mockup.png";
import landingPagesImg3 from "@assets/generated_images/landing_page_mobile_mockup.png";
import landingPagesImg4 from "@assets/generated_images/landing_page_ab_testing_mockup.png";
import landingPagesImg5 from "@assets/generated_images/landing_page_analytics_mockup.png";
import landingPagesImg6 from "@assets/generated_images/landing_page_workspace_mockup.png";

import identidadeVisualImg1 from "@assets/generated_images/brand_identity_multi-device_mockup.png";
import identidadeVisualImg2 from "@assets/generated_images/brand_identity_logo_desktop_mockup.png";
import identidadeVisualImg3 from "@assets/generated_images/brand_style_guide_tablet_mockup.png";
import identidadeVisualImg4 from "@assets/generated_images/brand_stationery_mockup.png";
import identidadeVisualImg5 from "@assets/generated_images/brand_social_media_kit_mockup.png";
import identidadeVisualImg6 from "@assets/generated_images/brand_identity_applications_mockup.png";

import criativosIaImg1 from "@assets/generated_images/ai_creatives_multi-device_mockup.png";
import criativosIaImg2 from "@assets/generated_images/ai_advertising_creatives_mockup.png";
import criativosIaImg3 from "@assets/generated_images/ai_thumbnails_mockup.png";
import criativosIaImg4 from "@assets/generated_images/ai_art_generation_mockup.png";
import criativosIaImg5 from "@assets/generated_images/ai_social_media_posts_mockup.png";
import criativosIaImg6 from "@assets/generated_images/ai_motion_graphics_mockup.png";

import trafegoPagoImg1 from "@assets/generated_images/paid_traffic_multi-device_mockup.png";
import trafegoPagoImg2 from "@assets/generated_images/google_ads_dashboard_mockup.png";
import trafegoPagoImg3 from "@assets/generated_images/facebook_ads_manager_mockup.png";
import trafegoPagoImg4 from "@assets/generated_images/ad_performance_analytics_mockup.png";
import trafegoPagoImg5 from "@assets/generated_images/remarketing_campaign_mockup.png";
import trafegoPagoImg6 from "@assets/generated_images/traffic_reports_mockup.png";

import automacaoImg1 from "@assets/generated_images/automation_multi-device_mockup.png";
import automacaoImg2 from "@assets/generated_images/chatbot_builder_mockup.png";
import automacaoImg3 from "@assets/generated_images/whatsapp_chatbot_mockup.png";
import automacaoImg4 from "@assets/generated_images/automation_workflow_mockup.png";
import automacaoImg5 from "@assets/generated_images/lead_qualification_bot_mockup.png";
import automacaoImg6 from "@assets/generated_images/automation_analytics_mockup.png";

import paginasVendasImg1 from "@assets/generated_images/sales_page_multi-device_mockup.png";
import paginasVendasImg2 from "@assets/generated_images/sales_page_desktop_mockup.png";
import paginasVendasImg3 from "@assets/generated_images/sales_page_mobile_mockup.png";
import paginasVendasImg4 from "@assets/generated_images/sales_copywriting_mockup.png";
import paginasVendasImg5 from "@assets/generated_images/sales_checkout_mockup.png";
import paginasVendasImg6 from "@assets/generated_images/sales_funnel_mockup.png";

import sistemasImg1 from "@assets/generated_images/custom_systems_multi-device_mockup.png";
import sistemasImg2 from "@assets/generated_images/custom_crm_system_mockup.png";
import sistemasImg3 from "@assets/generated_images/inventory_system_mockup.png";
import sistemasImg4 from "@assets/generated_images/custom_mobile_app_mockup.png";
import sistemasImg5 from "@assets/generated_images/admin_dashboard_mockup.png";
import sistemasImg6 from "@assets/generated_images/system_architecture_mockup.png";

import redesSociaisImg1 from "@assets/generated_images/social_media_multi-device_mockup.png";
import redesSociaisImg2 from "@assets/generated_images/content_calendar_mockup.png";
import redesSociaisImg3 from "@assets/generated_images/social_analytics_dashboard_mockup.png";
import redesSociaisImg4 from "@assets/generated_images/social_media_posts_mockup.png";
import redesSociaisImg5 from "@assets/generated_images/social_engagement_mockup.png";
import redesSociaisImg6 from "@assets/generated_images/social_media_report_mockup.png";

import consultoriaImg1 from "@assets/generated_images/consultancy_multi-device_mockup.png";
import consultoriaImg2 from "@assets/generated_images/strategy_presentation_mockup.png";
import consultoriaImg3 from "@assets/generated_images/business_analysis_mockup.png";
import consultoriaImg4 from "@assets/generated_images/consultancy_meeting_mockup.png";
import consultoriaImg5 from "@assets/generated_images/action_plan_mockup.png";
import consultoriaImg6 from "@assets/generated_images/digital_audit_report_mockup.png";

import presencaOnlineImg1 from "@assets/generated_images/online_presence_multi-device_mockup.png";
import presencaOnlineImg2 from "@assets/generated_images/google_business_profile_mockup.png";
import presencaOnlineImg3 from "@assets/generated_images/social_media_profiles_mockup.png";
import presencaOnlineImg4 from "@assets/generated_images/local_seo_results_mockup.png";
import presencaOnlineImg5 from "@assets/generated_images/online_reputation_mockup.png";
import presencaOnlineImg6 from "@assets/generated_images/business_directories_mockup.png";

const serviceGalleryImages: Record<string, string[]> = {
  "sites-profissionais": [sitesProfissionaisImg1, sitesProfissionaisImg2, sitesProfissionaisImg3, sitesProfissionaisImg4, sitesProfissionaisImg5, sitesProfissionaisImg6],
  "e-commerce": [ecommerceImg1, ecommerceImg2, ecommerceImg3, ecommerceImg4, ecommerceImg5, ecommerceImg6],
  "landing-pages": [landingPagesImg1, landingPagesImg2, landingPagesImg3, landingPagesImg4, landingPagesImg5, landingPagesImg6],
  "identidade-visual": [identidadeVisualImg1, identidadeVisualImg2, identidadeVisualImg3, identidadeVisualImg4, identidadeVisualImg5, identidadeVisualImg6],
  "criativos-ia": [criativosIaImg1, criativosIaImg2, criativosIaImg3, criativosIaImg4, criativosIaImg5, criativosIaImg6],
  "trafego-pago": [trafegoPagoImg1, trafegoPagoImg2, trafegoPagoImg3, trafegoPagoImg4, trafegoPagoImg5, trafegoPagoImg6],
  "automacao": [automacaoImg1, automacaoImg2, automacaoImg3, automacaoImg4, automacaoImg5, automacaoImg6],
  "paginas-vendas": [paginasVendasImg1, paginasVendasImg2, paginasVendasImg3, paginasVendasImg4, paginasVendasImg5, paginasVendasImg6],
  "sistemas-personalizados": [sistemasImg1, sistemasImg2, sistemasImg3, sistemasImg4, sistemasImg5, sistemasImg6],
  "gestao-redes-sociais": [redesSociaisImg1, redesSociaisImg2, redesSociaisImg3, redesSociaisImg4, redesSociaisImg5, redesSociaisImg6],
  "consultoria-digital": [consultoriaImg1, consultoriaImg2, consultoriaImg3, consultoriaImg4, consultoriaImg5, consultoriaImg6],
  "presenca-online": [presencaOnlineImg1, presencaOnlineImg2, presencaOnlineImg3, presencaOnlineImg4, presencaOnlineImg5, presencaOnlineImg6]
};

const serviceWhatsAppMessages: Record<string, string> = {
  "sites-profissionais": "Olá! Quero criar um site profissional para meu negócio. Podem me ajudar? 💻",
  "e-commerce": "Olá! Tenho interesse em criar uma loja virtual. Gostaria de saber mais! 🛒",
  "landing-pages": "Olá! Preciso de uma landing page de alta conversão para minha campanha. 🎯",
  "identidade-visual": "Olá! Quero desenvolver uma identidade visual profissional para minha marca. 🎨",
  "criativos-ia": "Olá! Tenho interesse em criativos feitos com IA para minhas campanhas. 🤖",
  "trafego-pago": "Olá! Quero escalar minhas vendas com tráfego pago. Podem me ajudar? 📈",
  "automacao": "Olá! Preciso automatizar meu atendimento com chatbots. Como funciona? 🤖",
  "paginas-vendas": "Olá! Quero uma página de vendas que realmente converta. Podem me ajudar? 💰",
  "sistemas-personalizados": "Olá! Preciso de um sistema sob medida para meu negócio. Vamos conversar? ⚙️",
  "gestao-redes-sociais": "Olá! Quero profissionalizar a gestão das minhas redes sociais. 📱",
  "consultoria-digital": "Olá! Preciso de uma consultoria estratégica para meu negócio digital. 🎯",
  "presenca-online": "Olá! Quero fortalecer a presença online da minha empresa. 🌐"
};

const serviceDetails: Record<string, {
  heroSubtitle: string;
  longDescription: string;
  benefits: { icon: string; title: string; description: string }[];
  faq: { question: string; answer: string }[];
  cta: { title: string; description: string };
}> = {
  "sites-profissionais": {
    heroSubtitle: "Websites modernos, rápidos e otimizados para converter visitantes em clientes fiéis.",
    longDescription: "Desenvolvemos sites profissionais que representam sua marca com excelência. Utilizamos as tecnologias mais modernas do mercado para garantir velocidade, segurança e uma experiência de usuário impecável. Cada projeto é único e personalizado para atender às necessidades específicas do seu negócio, com foco total em resultados e conversão.",
    benefits: [
      { icon: "fas fa-mobile-alt", title: "100% Responsivo", description: "Perfeito em qualquer dispositivo: desktop, tablet ou smartphone" },
      { icon: "fas fa-search", title: "SEO Otimizado", description: "Estrutura preparada para ranquear no Google e atrair tráfego orgânico" },
      { icon: "fas fa-bolt", title: "Alta Velocidade", description: "Carregamento ultrarrápido para melhor experiência e conversão" },
      { icon: "fas fa-shield-alt", title: "Segurança SSL", description: "Certificado de segurança incluso para proteger seus visitantes" },
      { icon: "fas fa-edit", title: "Painel Administrativo", description: "Gerencie conteúdo de forma simples e intuitiva" },
      { icon: "fas fa-chart-line", title: "Analytics Integrado", description: "Acompanhe métricas e entenda o comportamento dos visitantes" }
    ],
    faq: [
      { question: "Quanto tempo leva para desenvolver um site?", answer: "O prazo varia de 15 a 45 dias úteis, dependendo da complexidade do projeto. Sites institucionais mais simples ficam prontos em 15-20 dias, enquanto projetos mais robustos podem levar até 45 dias." },
      { question: "O site será otimizado para celular?", answer: "Sim! Todos os nossos sites são desenvolvidos com design responsivo, garantindo uma experiência perfeita em qualquer dispositivo - desktop, tablet ou smartphone." },
      { question: "Vocês oferecem hospedagem?", answer: "Sim, oferecemos planos de hospedagem profissional com SSL gratuito, backups automáticos e suporte técnico especializado." },
      { question: "Posso editar o conteúdo do site depois?", answer: "Absolutamente! Desenvolvemos com painéis administrativos intuitivos que permitem você atualizar textos, imagens e conteúdo de forma simples." }
    ],
    cta: { title: "Pronto para ter um site profissional?", description: "Entre em contato agora e receba um orçamento personalizado para o seu projeto." }
  },
  "e-commerce": {
    heroSubtitle: "Lojas virtuais completas e profissionais para vender online com segurança e eficiência.",
    longDescription: "Criamos e-commerces robustos e escaláveis que transformam visitantes em compradores. Nossa solução inclui gestão de produtos, múltiplas formas de pagamento, controle de estoque, cálculo de frete automático e muito mais. Tudo pensado para maximizar suas vendas online.",
    benefits: [
      { icon: "fas fa-credit-card", title: "Múltiplos Pagamentos", description: "PIX, cartões, boleto e mais opções para seus clientes" },
      { icon: "fas fa-boxes", title: "Gestão de Estoque", description: "Controle completo de produtos e inventário" },
      { icon: "fas fa-truck", title: "Frete Automático", description: "Integração com Correios e transportadoras" },
      { icon: "fas fa-shopping-cart", title: "Checkout Otimizado", description: "Processo de compra simplificado para mais conversões" },
      { icon: "fas fa-chart-bar", title: "Dashboard de Vendas", description: "Relatórios detalhados de vendas e desempenho" },
      { icon: "fas fa-headset", title: "Suporte Completo", description: "Acompanhamento e suporte técnico especializado" }
    ],
    faq: [
      { question: "Quais meios de pagamento posso usar?", answer: "Integramos com os principais gateways do mercado: Mercado Pago, PagSeguro, Stripe, PayPal, além de PIX, boleto e cartões de crédito/débito." },
      { question: "Quanto custa manter um e-commerce?", answer: "Os custos mensais incluem hospedagem (a partir de R$99/mês) e taxas das operadoras de pagamento. Não cobramos comissão sobre vendas." },
      { question: "Posso vender para outros países?", answer: "Sim! Configuramos seu e-commerce para aceitar múltiplas moedas e idiomas, permitindo vendas internacionais." },
      { question: "Como funciona a gestão de estoque?", answer: "O sistema atualiza automaticamente o estoque a cada venda, com alertas de baixo estoque e possibilidade de integração com ERPs." }
    ],
    cta: { title: "Pronto para vender online?", description: "Solicite uma demonstração e veja como podemos alavancar suas vendas." }
  },
  "landing-pages": {
    heroSubtitle: "Páginas de alta conversão projetadas para capturar leads e maximizar resultados de campanhas.",
    longDescription: "Nossas landing pages são desenvolvidas com foco total em conversão. Utilizamos técnicas avançadas de copywriting, design persuasivo e psicologia de vendas para criar páginas que realmente convertem. Ideais para campanhas de tráfego pago, lançamentos de produtos e captação de leads qualificados.",
    benefits: [
      { icon: "fas fa-bullseye", title: "Alta Conversão", description: "Design e copy otimizados para maximizar resultados" },
      { icon: "fas fa-vial", title: "A/B Testing", description: "Teste diferentes versões para encontrar a melhor performance" },
      { icon: "fas fa-mobile-alt", title: "Mobile First", description: "Otimizada para converter em dispositivos móveis" },
      { icon: "fas fa-tachometer-alt", title: "Carregamento Rápido", description: "Performance extrema para não perder visitantes" },
      { icon: "fas fa-plug", title: "Integrações", description: "Conecta com seu CRM, e-mail marketing e mais" },
      { icon: "fas fa-chart-pie", title: "Tracking Completo", description: "Pixels e eventos configurados para rastrear conversões" }
    ],
    faq: [
      { question: "O que é uma landing page?", answer: "É uma página focada em um único objetivo: converter visitantes em leads ou clientes. Diferente de um site, ela não tem navegação - o visitante só pode tomar a ação desejada." },
      { question: "Qual a diferença para um site comum?", answer: "Sites têm múltiplas páginas e objetivos. Landing pages são focadas em uma única ação (preencher formulário, comprar, etc.), resultando em taxas de conversão muito maiores." },
      { question: "Vocês escrevem os textos?", answer: "Sim! Nossa equipe de copywriting desenvolve textos persuasivos baseados em gatilhos mentais e técnicas de vendas comprovadas." },
      { question: "Como acompanho os resultados?", answer: "Configuramos pixels de rastreamento e integramos com Google Analytics, permitindo acompanhar cada conversão em tempo real." }
    ],
    cta: { title: "Quer multiplicar suas conversões?", description: "Fale conosco e descubra como uma landing page profissional pode transformar seus resultados." }
  },
  "identidade-visual": {
    heroSubtitle: "Branding completo que posiciona sua marca como referência no mercado.",
    longDescription: "Desenvolvemos identidades visuais memoráveis que comunicam os valores e a essência da sua marca. Do logotipo à papelaria completa, criamos uma identidade coerente e profissional que destaca seu negócio da concorrência e gera conexão genuína com seu público.",
    benefits: [
      { icon: "fas fa-copyright", title: "Logo Profissional", description: "Design único e memorável para sua marca" },
      { icon: "fas fa-palette", title: "Paleta de Cores", description: "Cores estratégicas que comunicam sua essência" },
      { icon: "fas fa-font", title: "Tipografia", description: "Fontes selecionadas para reforçar sua identidade" },
      { icon: "fas fa-book", title: "Manual de Marca", description: "Guia completo de aplicação da identidade" },
      { icon: "fas fa-id-card", title: "Papelaria", description: "Cartões, envelopes, papel timbrado e mais" },
      { icon: "fas fa-share-alt", title: "Social Media Kit", description: "Templates prontos para suas redes sociais" }
    ],
    faq: [
      { question: "O que está incluso no pacote de identidade visual?", answer: "Inclui logo em múltiplos formatos, paleta de cores, tipografia, manual de marca, papelaria básica (cartão, envelope, papel timbrado) e kit para redes sociais." },
      { question: "Quantas opções de logo vocês apresentam?", answer: "Desenvolvemos 3 conceitos distintos de logo, e após a escolha, fazemos refinamentos ilimitados até a aprovação final." },
      { question: "Recebo os arquivos originais?", answer: "Sim! Entregamos todos os arquivos em formatos vetoriais (AI, EPS, SVG) e imagem (PNG, JPG) em alta resolução." },
      { question: "Posso registrar a marca depois?", answer: "Absolutamente! Entregamos a identidade pronta para registro no INPI, inclusive com pesquisa prévia de disponibilidade." }
    ],
    cta: { title: "Pronto para uma marca inesquecível?", description: "Solicite um orçamento e dê o próximo passo na profissionalização do seu negócio." }
  },
  "criativos-ia": {
    heroSubtitle: "Artes profissionais criadas com inteligência artificial para suas campanhas e redes sociais.",
    longDescription: "Utilizamos as mais avançadas ferramentas de IA para criar artes únicas e impactantes para seus anúncios, posts, thumbnails e materiais de marketing. Combinamos tecnologia de ponta com expertise criativa para entregar peças que se destacam no feed e geram engajamento.",
    benefits: [
      { icon: "fas fa-ad", title: "Criativos para Ads", description: "Artes otimizadas para Facebook, Instagram e Google" },
      { icon: "fas fa-play", title: "Thumbnails", description: "Capas atrativas para vídeos no YouTube e Reels" },
      { icon: "fas fa-images", title: "Posts Sociais", description: "Artes para feed, stories e carrosséis" },
      { icon: "fas fa-film", title: "Motion Graphics", description: "Animações e vídeos curtos para engajamento" },
      { icon: "fas fa-clock", title: "Entrega Rápida", description: "Artes prontas em até 24 horas" },
      { icon: "fas fa-infinity", title: "Variações", description: "Múltiplas versões para testes A/B" }
    ],
    faq: [
      { question: "Como funciona a criação com IA?", answer: "Combinamos prompts estratégicos em ferramentas como Midjourney e DALL-E com refinamento manual, garantindo resultados únicos e alinhados à sua marca." },
      { question: "As imagens são exclusivas?", answer: "Sim! Cada criação é única e desenvolvida especificamente para seu projeto, com direitos de uso comercial inclusos." },
      { question: "Vocês criam vídeos também?", answer: "Sim! Criamos motion graphics, animações e vídeos curtos para Reels, TikTok e anúncios em vídeo." },
      { question: "Qual o prazo de entrega?", answer: "Para artes estáticas, entregamos em até 24h. Vídeos e animações podem levar de 2 a 5 dias úteis." }
    ],
    cta: { title: "Quer criativos que convertem?", description: "Entre em contato e receba uma proposta personalizada para suas necessidades." }
  },
  "trafego-pago": {
    heroSubtitle: "Gestão profissional de anúncios para atrair clientes qualificados e escalar suas vendas.",
    longDescription: "Nossa equipe de especialistas gerencia suas campanhas de tráfego pago com foco total em ROI. Trabalhamos com Google Ads, Facebook Ads, Instagram Ads e outras plataformas, otimizando constantemente para maximizar resultados e reduzir custo por aquisição.",
    benefits: [
      { icon: "fab fa-google", title: "Google Ads", description: "Campanhas de pesquisa, display e YouTube" },
      { icon: "fab fa-facebook", title: "Meta Ads", description: "Facebook e Instagram com segmentação avançada" },
      { icon: "fas fa-chart-line", title: "Otimização Contínua", description: "Monitoramento e ajustes diários nas campanhas" },
      { icon: "fas fa-file-alt", title: "Relatórios Detalhados", description: "Acompanhe resultados com transparência total" },
      { icon: "fas fa-bullseye", title: "Públicos Qualificados", description: "Segmentação precisa para atrair quem compra" },
      { icon: "fas fa-sync", title: "Remarketing", description: "Recupere visitantes e aumente conversões" }
    ],
    faq: [
      { question: "Quanto devo investir em anúncios?", answer: "Depende do seu mercado e objetivos. Recomendamos um investimento mínimo de R$1.500/mês para resultados consistentes, mas analisamos cada caso individualmente." },
      { question: "Vocês cobram sobre o valor investido?", answer: "Não. Cobramos uma taxa fixa de gestão, independente do quanto você investe. Isso garante que nosso foco seja performance, não aumentar seu investimento." },
      { question: "Quando vou começar a ver resultados?", answer: "Os primeiros resultados aparecem em 2-4 semanas. Campanhas otimizadas e maduras (2-3 meses) tendem a ter performance significativamente melhor." },
      { question: "Vocês criam os anúncios?", answer: "Sim! Desenvolvemos textos, imagens e vídeos otimizados para cada plataforma e objetivo de campanha." }
    ],
    cta: { title: "Quer escalar suas vendas com tráfego pago?", description: "Agende uma análise gratuita e descubra o potencial do seu negócio." }
  },
  "automacao": {
    heroSubtitle: "Chatbots e automações inteligentes para escalar seu atendimento e operações.",
    longDescription: "Implementamos chatbots e fluxos de automação que trabalham 24/7 pelo seu negócio. Automatizamos atendimento, qualificação de leads, agendamentos, vendas e muito mais, liberando seu tempo para focar no que realmente importa.",
    benefits: [
      { icon: "fas fa-robot", title: "Chatbots Inteligentes", description: "Atendimento automatizado 24 horas por dia" },
      { icon: "fas fa-diagram-project", title: "Fluxos Automáticos", description: "Automação de processos repetitivos" },
      { icon: "fas fa-plug", title: "Integrações", description: "Conecta com CRM, e-mail, WhatsApp e mais" },
      { icon: "fas fa-filter", title: "Qualificação de Leads", description: "Filtre automaticamente os leads mais quentes" },
      { icon: "fas fa-calendar-check", title: "Agendamentos", description: "Sistema de agendamento automático" },
      { icon: "fas fa-chart-bar", title: "Analytics", description: "Métricas detalhadas de performance" }
    ],
    faq: [
      { question: "Qual plataforma vocês usam?", answer: "Trabalhamos com diversas plataformas: ManyChat, Botpress, DialogFlow, e soluções personalizadas, escolhendo a melhor para cada projeto." },
      { question: "O chatbot entende português corretamente?", answer: "Sim! Configuramos o processamento de linguagem natural para entender variações, gírias e erros de digitação comuns em português brasileiro." },
      { question: "Posso integrar com meu sistema atual?", answer: "Na maioria dos casos, sim. Trabalhamos com APIs e integrações como Zapier e Make para conectar praticamente qualquer ferramenta." },
      { question: "E se o cliente quiser falar com um humano?", answer: "Configuramos transferência automática para atendente quando necessário, garantindo que casos complexos sejam tratados por pessoas." }
    ],
    cta: { title: "Pronto para automatizar seu negócio?", description: "Fale conosco e descubra como economizar tempo e escalar seu atendimento." }
  },
  "paginas-vendas": {
    heroSubtitle: "Páginas persuasivas que transformam visitantes em compradores.",
    longDescription: "Desenvolvemos páginas de vendas com copywriting estratégico e design otimizado para conversão. Aplicamos gatilhos mentais, provas sociais e técnicas de persuasão comprovadas para maximizar suas vendas online.",
    benefits: [
      { icon: "fas fa-pen-fancy", title: "Copywriting Estratégico", description: "Textos persuasivos que vendem" },
      { icon: "fas fa-layer-group", title: "Design de Conversão", description: "Layout otimizado para vendas" },
      { icon: "fas fa-brain", title: "Gatilhos Mentais", description: "Técnicas de persuasão aplicadas" },
      { icon: "fas fa-users", title: "Provas Sociais", description: "Depoimentos e cases de sucesso" },
      { icon: "fas fa-stopwatch", title: "Urgência e Escassez", description: "Elementos que aceleram a decisão" },
      { icon: "fas fa-check-circle", title: "Garantias", description: "Elementos que eliminam objeções" }
    ],
    faq: [
      { question: "Qual a diferença para uma landing page?", answer: "A página de vendas é mais longa e completa, focada em vender produtos/serviços de maior valor. Inclui mais provas sociais, garantias e trabalha mais objeções." },
      { question: "Vocês escrevem o texto de vendas?", answer: "Sim! Nossa equipe de copywriters desenvolve o texto completo, baseado em pesquisa do seu produto, mercado e público-alvo." },
      { question: "Posso usar para infoprodutos?", answer: "Absolutamente! Temos vasta experiência com páginas de vendas para cursos, mentorias, ebooks e outros produtos digitais." },
      { question: "Como funciona o processo?", answer: "Fazemos uma pesquisa profunda sobre seu produto e público, desenvolvemos o copy, depois o design, e entregamos pronta para rodar." }
    ],
    cta: { title: "Quer uma página que realmente vende?", description: "Solicite um orçamento e prepare-se para ver seus números subirem." }
  },
  "sistemas-personalizados": {
    heroSubtitle: "Sistemas sob medida para otimizar processos e escalar seu negócio.",
    longDescription: "Desenvolvemos sistemas personalizados que resolvem problemas específicos do seu negócio. De CRMs a sistemas de gestão, criamos ferramentas que automatizam processos, aumentam produtividade e proporcionam controle total das operações.",
    benefits: [
      { icon: "fas fa-cogs", title: "Sob Medida", description: "Desenvolvimento específico para suas necessidades" },
      { icon: "fas fa-cloud", title: "Na Nuvem", description: "Acesse de qualquer lugar, a qualquer hora" },
      { icon: "fas fa-lock", title: "Segurança", description: "Proteção de dados e backups automáticos" },
      { icon: "fas fa-users-cog", title: "Multi-usuários", description: "Controle de acessos e permissões" },
      { icon: "fas fa-mobile", title: "Responsivo", description: "Funciona em computador, tablet e celular" },
      { icon: "fas fa-headset", title: "Suporte", description: "Manutenção e suporte técnico inclusos" }
    ],
    faq: [
      { question: "Quanto custa um sistema personalizado?", answer: "O valor varia conforme a complexidade. Projetos simples partem de R$5.000, enquanto sistemas mais robustos podem chegar a R$50.000 ou mais." },
      { question: "Qual o prazo de desenvolvimento?", answer: "Sistemas simples levam de 30 a 60 dias. Projetos mais complexos podem levar de 3 a 6 meses." },
      { question: "Posso integrar com ferramentas que já uso?", answer: "Sim! Desenvolvemos integrações com ERPs, CRMs, ferramentas de pagamento, e-mail e praticamente qualquer sistema que tenha API." },
      { question: "O que acontece depois da entrega?", answer: "Oferecemos planos de manutenção e suporte para garantir que o sistema continue funcionando perfeitamente e evoluindo conforme suas necessidades." }
    ],
    cta: { title: "Precisa de um sistema específico?", description: "Conte-nos sobre seu desafio e desenvolvemos a solução ideal." }
  },
  "gestao-redes-sociais": {
    heroSubtitle: "Gestão completa das suas redes sociais para engajar e crescer sua audiência.",
    longDescription: "Cuidamos de toda a sua presença nas redes sociais, desde o planejamento de conteúdo até a interação com seguidores. Desenvolvemos estratégias personalizadas para cada plataforma, criamos conteúdo relevante e gerenciamos sua comunidade para construir uma marca forte e engajada.",
    benefits: [
      { icon: "fas fa-calendar-alt", title: "Planejamento de Conteúdo", description: "Calendário editorial estratégico" },
      { icon: "fas fa-pen", title: "Criação de Posts", description: "Artes e textos profissionais" },
      { icon: "fas fa-comments", title: "Gestão de Comunidade", description: "Interação com seguidores e DMs" },
      { icon: "fas fa-chart-line", title: "Relatórios Mensais", description: "Métricas e insights detalhados" },
      { icon: "fas fa-hashtag", title: "Estratégia de Hashtags", description: "Alcance orgânico maximizado" },
      { icon: "fas fa-video", title: "Conteúdo em Vídeo", description: "Reels, Stories e conteúdo dinâmico" }
    ],
    faq: [
      { question: "Quantos posts por semana?", answer: "Depende do plano contratado. Oferecemos desde 3 posts por semana até publicações diárias em múltiplas plataformas." },
      { question: "Vocês respondem os comentários?", answer: "Sim! Fazemos gestão completa de comunidade, respondendo comentários, DMs e interagindo com seguidores em nome da marca." },
      { question: "Quais redes vocês gerenciam?", answer: "Trabalhamos com Instagram, Facebook, LinkedIn, TikTok e YouTube. Adaptamos a estratégia para cada plataforma." },
      { question: "Preciso aprovar os posts antes?", answer: "Sim, enviamos o calendário de conteúdo para aprovação prévia. Você tem controle total sobre o que é publicado." }
    ],
    cta: { title: "Quer uma presença forte nas redes?", description: "Fale conosco e deixe sua marca se destacar no digital." }
  },
  "consultoria-digital": {
    heroSubtitle: "Análise estratégica e plano de ação personalizado para seu negócio digital.",
    longDescription: "Oferecemos consultoria especializada para posicionar sua marca no digital. Analisamos sua situação atual, identificamos oportunidades e desenvolvemos um plano de ação claro e executável para alcançar seus objetivos de negócio.",
    benefits: [
      { icon: "fas fa-search-plus", title: "Diagnóstico Completo", description: "Análise 360° da sua presença digital" },
      { icon: "fas fa-map", title: "Plano de Ação", description: "Roadmap detalhado e prioritizado" },
      { icon: "fas fa-bullseye", title: "Estratégia", description: "Posicionamento e diferenciação" },
      { icon: "fas fa-graduation-cap", title: "Mentoria", description: "Acompanhamento e direcionamento" },
      { icon: "fas fa-file-contract", title: "Documentação", description: "Relatórios e materiais de apoio" },
      { icon: "fas fa-sync", title: "Follow-up", description: "Reuniões de acompanhamento" }
    ],
    faq: [
      { question: "Como funciona a consultoria?", answer: "Fazemos uma análise profunda do seu negócio, mercado e concorrência, depois desenvolvemos um plano estratégico personalizado com ações práticas." },
      { question: "Vocês executam as ações também?", answer: "A consultoria foca no planejamento estratégico. Se desejar, podemos executar as ações recomendadas através de outros serviços da agência." },
      { question: "Quantas reuniões estão incluídas?", answer: "O pacote padrão inclui 4 reuniões: diagnóstico, apresentação do plano, e 2 follow-ups mensais. Pacotes estendidos têm mais encontros." },
      { question: "Para quem é indicado?", answer: "Ideal para empresários que querem estruturar ou reestruturar sua presença digital, lançar novos projetos ou escalar operações existentes." }
    ],
    cta: { title: "Quer uma visão estratégica do seu negócio?", description: "Agende uma conversa e descubra como podemos ajudar." }
  },
  "presenca-online": {
    heroSubtitle: "Setup completo da sua presença digital em todas as plataformas relevantes.",
    longDescription: "Configuramos e otimizamos toda sua presença online: Google Meu Negócio, redes sociais, diretórios e muito mais. Garantimos que seu negócio seja encontrado quando clientes procurarem por produtos ou serviços como os seus.",
    benefits: [
      { icon: "fab fa-google", title: "Google Meu Negócio", description: "Perfil otimizado para buscas locais" },
      { icon: "fas fa-share-nodes", title: "Redes Sociais", description: "Perfis configurados e otimizados" },
      { icon: "fas fa-map-marker-alt", title: "SEO Local", description: "Apareça nas buscas da sua região" },
      { icon: "fas fa-list", title: "Diretórios", description: "Cadastro em sites relevantes" },
      { icon: "fas fa-star", title: "Avaliações", description: "Estratégia para captar reviews" },
      { icon: "fas fa-link", title: "Link Building", description: "Construção de autoridade online" }
    ],
    faq: [
      { question: "O que está incluso no setup?", answer: "Configuração do Google Meu Negócio, criação/otimização de perfis em redes sociais, cadastro em diretórios relevantes e configuração básica de SEO." },
      { question: "Em quais redes sociais vocês trabalham?", answer: "Facebook, Instagram, LinkedIn, TikTok, YouTube, Pinterest e outras conforme a relevância para seu negócio." },
      { question: "Quanto tempo para aparecer no Google?", answer: "O Google Meu Negócio pode começar a aparecer em 24-48h. Para resultados de SEO orgânico, o prazo é de 3-6 meses." },
      { question: "Vocês gerenciam as redes depois?", answer: "O setup é focado na configuração inicial. Oferecemos planos de gestão contínua como serviço adicional." }
    ],
    cta: { title: "Quer ser encontrado online?", description: "Fale conosco e coloque seu negócio no mapa digital." }
  }
};

function AnimatedRelatedServiceCard({ 
  service, 
  index 
}: { 
  service: { id: string; title: string; icon: string }; 
  index: number 
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || !iconRef.current || !glowRef.current) return;

    const card = cardRef.current;
    const icon = iconRef.current;
    const glow = glowRef.current;
    const particles = particlesRef.current;

    gsap.set(icon, { transformOrigin: "center center" });
    
    const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
    floatTl.to(icon, {
      y: -4,
      rotation: 5,
      duration: 1.5,
      ease: "sine.inOut",
      delay: index * 0.2
    });

    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.02,
        y: -5,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(icon, {
        scale: 1.3,
        rotation: 15,
        duration: 0.4,
        ease: "back.out(1.7)"
      });
      gsap.to(glow, {
        opacity: 1,
        scale: 1.5,
        duration: 0.4,
        ease: "power2.out"
      });
      if (particles) {
        gsap.to(particles.children, {
          opacity: 1,
          scale: 1,
          stagger: 0.05,
          duration: 0.3
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.to(glow, {
        opacity: 0,
        scale: 1,
        duration: 0.3
      });
      if (particles) {
        gsap.to(particles.children, {
          opacity: 0,
          scale: 0,
          duration: 0.2
        });
      }
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      floatTl.kill();
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [index]);

  return (
    <Link
      ref={cardRef}
      href={`/servico/${service.id}`}
      className="glass-card p-4 flex items-center gap-4 group relative overflow-visible"
      data-testid={`related-service-${service.id}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon/20 to-neon/5 flex items-center justify-center flex-shrink-0 relative">
        <div 
          ref={glowRef}
          className="absolute inset-0 rounded-xl bg-neon/30 blur-xl opacity-0"
          style={{ transform: "translateZ(-10px)" }}
        />
        <div
          ref={particlesRef}
          className="absolute inset-0 pointer-events-none"
        >
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-neon rounded-full opacity-0"
              style={{
                top: `${20 + i * 20}%`,
                left: `${10 + i * 25}%`,
                transform: "scale(0)"
              }}
            />
          ))}
        </div>
        <div ref={iconRef} className="relative z-10">
          <i className={`${service.icon} text-neon text-lg`}></i>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-white font-medium group-hover:text-neon transition-colors duration-300">
          {service.title}
        </h3>
        <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-neon to-transparent transition-all duration-500 mt-1" />
      </div>
      <i className="fas fa-arrow-right text-white/30 group-hover:text-neon group-hover:translate-x-1 transition-all duration-300"></i>
    </Link>
  );
}

function ServiceGallery({ serviceId, serviceTitle }: { serviceId: string; serviceTitle: string }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = serviceGalleryImages[serviceId] || [];
  
  if (images.length === 0) {
    return (
      <div 
        className="aspect-video rounded-xl bg-gradient-to-br from-neon/10 to-neon/5 flex items-center justify-center overflow-hidden"
        data-testid="image-service-gallery-placeholder"
      >
        <i className="fas fa-image text-neon text-4xl opacity-30"></i>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="aspect-video rounded-xl overflow-hidden glass-card p-2">
        <img 
          src={images[selectedImage]} 
          alt={`${serviceTitle} - Imagem ${selectedImage + 1}`}
          className="w-full h-full object-cover rounded-lg"
          data-testid={`image-service-gallery-main-${serviceId}`}
        />
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-video rounded-lg overflow-hidden transition-all ${
              selectedImage === index 
                ? "ring-2 ring-neon scale-105" 
                : "opacity-60 hover:opacity-100"
            }`}
            data-testid={`button-gallery-thumb-${serviceId}-${index}`}
            aria-label={`Ver imagem ${index + 1} de ${serviceTitle}`}
          >
            <img 
              src={img} 
              alt={`${serviceTitle} - Miniatura ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ServicePage() {
  const params = useParams();
  const serviceId = params.id as string;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [serviceId]);

  const service = services.find(s => s.id === serviceId);
  const details = serviceDetails[serviceId];

  if (!service || !details) {
    return (
      <div className="min-h-screen relative z-10 flex items-center justify-center" data-testid="page-service-not-found">
        <Navbar />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Serviço não encontrado</h1>
          <p className="text-white/60 mb-8">O serviço que você está procurando não existe.</p>
          <Link href="/" className="btn-primary">
            Voltar ao Início
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative z-10" data-testid={`page-service-${serviceId}`}>
      <Navbar />
      
      <section className="pt-32 pb-16 relative" data-testid="service-hero">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-white/20 rounded-xl">
              <i className={`${service.icon} text-neon`}></i>
              <span className="text-sm text-white/80">Serviço</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              {details.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="service-gallery">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Veja nossos <span className="neon-text">trabalhos</span>
            </h2>
            <ServiceGallery serviceId={serviceId} serviceTitle={service.title} />
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="service-description">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Sobre o Serviço</h2>
            <p className="text-white/70 text-lg leading-relaxed">
              {details.longDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="service-benefits">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              O que está <span className="neon-text">incluso</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {details.benefits.map((benefit, index) => (
                <AnimatedBenefitCard
                  key={index}
                  icon={benefit.icon}
                  title={benefit.title}
                  description={benefit.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="service-faq">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Perguntas <span className="neon-text">Frequentes</span>
            </h2>
            <div className="space-y-4">
              {details.faq.map((item, index) => (
                <div
                  key={index}
                  className="glass-card overflow-hidden"
                  data-testid={`faq-item-${index}`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                    data-testid={`faq-button-${index}`}
                  >
                    <span className="text-white font-medium pr-4">{item.question}</span>
                    <i className={`fas fa-chevron-down text-neon transition-transform ${
                      openFaqIndex === index ? "rotate-180" : ""
                    }`}></i>
                  </button>
                  <div className={`transition-all duration-300 ${
                    openFaqIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}>
                    <div className="px-6 pb-6 text-white/70">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" data-testid="service-cta">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-card p-12 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-neon/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-neon/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {details.cta.title}
                </h2>
                <p className="text-white/70 mb-8 max-w-xl mx-auto">
                  {details.cta.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={`https://wa.me/5531993640574?text=${encodeURIComponent(serviceWhatsAppMessages[serviceId!] || `Olá! Tenho interesse no serviço de ${service.title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center gap-2"
                    data-testid="button-service-whatsapp"
                  >
                    <i className="fab fa-whatsapp"></i>
                    Falar no WhatsApp
                  </a>
                  <Link
                    href="/#contato"
                    className="btn-secondary flex items-center gap-2"
                    data-testid="button-service-contact"
                  >
                    <i className="fas fa-envelope"></i>
                    Enviar E-mail
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-white/5" data-testid="service-related">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Outros Serviços
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.filter(s => s.id !== serviceId).slice(0, 4).map((relatedService, index) => (
              <AnimatedRelatedServiceCard
                key={relatedService.id}
                service={relatedService}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
