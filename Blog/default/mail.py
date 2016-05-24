import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from django.conf import settings

def _sendmail(fro, to, msg, host="localhost", port=25, starttls=False,
username=None, password=None):
    server = smtplib.SMTP(host, port)
    try:
        if starttls:
            server.starttls()
        if username:
            server.login(username, password)
        server.sendmail(fro, to, msg.as_string())
        return True
    except smtplib.SMTPException as e:
        print(e)
        return False
    finally:
        server.quit()

def sendmail(name, email, subject, msg):
    html = settings.EMAIL_HTML.format(name=name, email=email, message=msg)
    text = settings.EMAIL_TEXT.format(name=name, email=email, message=msg)
    fro = settings.EMAIL_FROM.format(name=name)
    to = settings.EMAIL_TO
    message = MIMEMultipart('alternative')
    message['From'] = fro
    message['To'] = ",".join(to)
    message['Subject'] = subject
    p1, p2 = MIMEText(text, 'text'), MIMEText(html, 'html')
    message.attach(p1)
    message.attach(p2)
    return _sendmail(fro, to, message, host=settings.SMTP_HOST,
    port=settings.SMTP_PORT, starttls=settings.SMTP_STARTTLS,
    username=settings.SMTP_AUTH_USERNAME,
    password=settings.SMTP_AUTH_PASSWORD)
