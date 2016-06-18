from django.conf import settings

import requests

def getip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def verify_recaptcha(reqst):
    ip = getip(reqst)
    id = reqst.POST.get('g-recaptcha-response', None)
    if not id:
        return False
    payload = {
    'secret': settings.RECAPTCHA_SECRET,
    'response': id,
    'remoteip': ip
    }
    req = requests.post('https://www.google.com/recaptcha/api/siteverify',
    data=payload)
    return req.json()['success']
