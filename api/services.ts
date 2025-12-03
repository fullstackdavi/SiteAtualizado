import type { VercelRequest, VercelResponse } from '@vercel/node';

const services = [
  { id: "sites-profissionais", title: "Sites Profissionais", icon: "fas fa-globe" },
  { id: "e-commerce", title: "E-commerce", icon: "fas fa-shopping-cart" },
  { id: "landing-pages", title: "Landing Pages", icon: "fas fa-rocket" },
  { id: "identidade-visual", title: "Identidade Visual", icon: "fas fa-paint-brush" },
  { id: "criativos-ia", title: "Criativos com IA", icon: "fas fa-wand-magic-sparkles" },
  { id: "trafego-pago", title: "Tráfego Pago", icon: "fas fa-chart-line" },
  { id: "automacao", title: "Automação", icon: "fas fa-robot" },
  { id: "paginas-vendas", title: "Páginas de Vendas", icon: "fas fa-file-invoice-dollar" },
  { id: "sistemas-personalizados", title: "Sistemas Personalizados", icon: "fas fa-cogs" },
  { id: "consultoria-digital", title: "Consultoria Digital", icon: "fas fa-lightbulb" },
  { id: "presenca-online", title: "Presença Online", icon: "fas fa-share-nodes" },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  return res.status(200).json(services);
}
