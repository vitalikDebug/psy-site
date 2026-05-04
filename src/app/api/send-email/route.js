// src/app/api/send-email/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const data = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ev.brazhko@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    const tagsString = data.selectedTags.length > 0
      ? data.selectedTags.join(', ')
      : 'Не выбраны';

    // Формируем КРАСИВОЕ HTML письмо
    const mailOptions = {
      from: 'ev.brazhko@gmail.com',
      to: 'ev.brazhko@gmail.com',
      subject: `🔥 Новая заявка: ${data.name} - ${data.course || 'Консультация'}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 40px 20px; color: #333;">
          
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; padding: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <h2 style="color: #A078C4; margin-top: 0; border-bottom: 2px solid #f3e1f5; padding-bottom: 15px;">Новая заявка с сайта</h2>
            
            <table width="100%" cellpadding="10" cellspacing="0" style="font-size: 15px;">
              <tr><td width="30%" style="color: #777;"><strong>Имя:</strong></td><td>${data.name}</td></tr>
              <tr style="background-color: #fdfbfe;"><td style="color: #777;"><strong>Для кого:</strong></td><td>${data.type === 'child' ? 'Для ребенка' : 'Для взрослого'}</td></tr>
              <tr><td style="color: #777;"><strong>Возраст:</strong></td><td>${data.age || '—'}</td></tr>
              <tr style="background-color: #fdfbfe;"><td style="color: #777;"><strong>Контакт:</strong></td><td><strong>${data.phone}</strong></td></tr>
              <tr><td style="color: #777;"><strong>Город:</strong></td><td>${data.city || '—'}</td></tr>
              <tr style="background-color: #fdfbfe;"><td style="color: #777;"><strong>Формат:</strong></td><td>${data.course || '—'}</td></tr>
            </table>

            <div style="margin-top: 25px; background-color: #fdfbfe; padding: 20px; border-radius: 12px; border: 1px dashed #d8b4fe;">
              <p style="margin-top: 0; color: #777; font-size: 14px;"><strong>Беспокоит (теги):</strong></p>
              <p style="margin: 5px 0 15px 0; color: #333;">${tagsString}</p>
              
              <p style="margin-top: 0; color: #777; font-size: 14px;"><strong>Комментарий:</strong></p>
              <p style="margin: 0; color: #333; font-style: italic;">${data.problemText || 'Нет комментария'}</p>
            </div>
          </div>

          <div style="max-width: 600px; margin: 30px auto 0; padding: 0 20px;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-right: 25px;">
                  <img src="https://i.ibb.co/0Vh7xy11/Chat-GPT-Image-18-2026-15-47-25.png" alt="Logo" width="80" style="display: block; border-radius: 50%;" />
                </td>
                
                <td style="border-left: 2px solid #A078C4; padding-left: 25px;">
                  <strong style="font-size: 18px; color: #333; letter-spacing: 0.5px;">ЮЛИЯ ШКАРАНДА</strong><br>
                  <span style="font-size: 14px; color: #A078C4; font-style: italic;">Семейный психолог, заиколог</span>
                  
                  <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 12px; font-size: 12px; color: #666; line-height: 1.6;">
                    <tr>
                      <td style="padding-right: 15px;"><strong>Telegram:</strong></td>
                      <td>@julia_shkaranda</td>
                    </tr>
                    <tr>
                      <td style="padding-right: 15px;"><strong>Сайт:</strong></td>
                      <td><a href="https://yourwebsite.com" style="color: #666; text-decoration: none;">yourwebsite.com</a></td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
          
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Письмо успешно отправлено" }, { status: 200 });
  } catch (error) {
    console.error("Ошибка при отправке письма:", error);
    return NextResponse.json({ error: "Ошибка при отправке письма" }, { status: 500 });
  }
}