import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта BaniDzen на почту ruslan399885@gmail.com"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    message = body.get('message', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и телефон обязательны'}, ensure_ascii=False)
        }

    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    from_email = 'ruslan399885@gmail.com'
    to_email = 'ruslan399885@gmail.com'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта BaniDzen — {name}'
    msg['From'] = from_email
    msg['To'] = to_email

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #faf8f4; border-radius: 12px;">
      <h2 style="color: #5c3a1e; margin-bottom: 8px;">🌲 Новая заявка с сайта BaniDzen</h2>
      <hr style="border: 1px solid #e8e0d0; margin-bottom: 20px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; color: #888; font-size: 13px; width: 120px;">Имя</td>
          <td style="padding: 10px 0; color: #2d1f0e; font-weight: 600;">{name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888; font-size: 13px;">Телефон</td>
          <td style="padding: 10px 0; color: #2d1f0e; font-weight: 600;"><a href="tel:{phone}" style="color: #5c3a1e;">{phone}</a></td>
        </tr>
        {"" if not message else f'''<tr>
          <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">Сообщение</td>
          <td style="padding: 10px 0; color: #2d1f0e;">{message}</td>
        </tr>'''}
      </table>
      <p style="margin-top: 24px; font-size: 12px; color: #aaa;">Письмо отправлено автоматически с сайта banidzen.ru</p>
    </div>
    """

    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(from_email, smtp_password)
        server.sendmail(from_email, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True, 'message': 'Заявка отправлена'})
    }