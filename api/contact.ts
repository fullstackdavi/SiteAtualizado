import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

let messageId = 1;
const messages: ContactMessage[] = [];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !service || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Dados inválidos. Nome, email, serviço e mensagem são obrigatórios.' 
      });
    }

    const newMessage: ContactMessage = {
      id: messageId++,
      name,
      email,
      phone: phone || '',
      service,
      message
    };

    messages.push(newMessage);

    return res.status(201).json({ 
      success: true, 
      message: 'Mensagem enviada com sucesso!', 
      data: newMessage 
    });
  } catch (error) {
    console.error('Error processing contact:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Erro ao enviar mensagem' 
    });
  }
}
