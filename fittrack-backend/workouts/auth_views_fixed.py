from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings
from django.utils.crypto import get_random_string
from rest_framework.authtoken.models import Token
from .models import OTP
import json

@csrf_exempt
@require_http_methods(["POST"])
def register(request):
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        email = data.get('email', '')
        
        if not username or not password:
            return JsonResponse({'error': 'Username and password required'}, status=400)
        
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)
        
        user = User.objects.create_user(username=username, password=password, email=email)
        token, _ = Token.objects.get_or_create(user=user)
        
        return JsonResponse({
            'token': token.key,
            'username': user.username,
            'user_id': user.id
        })
    except Exception as e:
        return JsonResponse({'error': 'Registration failed'}, status=400)

@csrf_exempt
@require_http_methods(["POST"])
def login(request):
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return JsonResponse({'error': 'Username and password required'}, status=400)
        
        user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return JsonResponse({
                'token': token.key,
                'username': user.username,
                'user_id': user.id
            })
        
        return JsonResponse({'error': 'Invalid credentials'}, status=401)
    except Exception as e:
        return JsonResponse({'error': 'Login failed'}, status=400)

@csrf_exempt
@require_http_methods(["POST"])
def forgot_password(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        
        if not email:
            return JsonResponse({'error': 'Email required'}, status=400)
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({'error': 'Email not found'}, status=404)
        
        # Generate OTP
        otp = get_random_string(length=6, allowed_chars='0123456789')
        
        # Clear old OTPs for this email
        OTP.objects.filter(email=email).delete()
        
        # Save new OTP
        OTP.objects.create(email=email, otp=otp)
        
        # Send email
        try:
            send_mail(
                subject='FitTrack Password Reset Code',
                message=f'Your password reset code is: {otp}\n\nThis code will expire in 10 minutes.',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
                fail_silently=False,
            )
            return JsonResponse({'message': f'Reset code sent to {email}! Code: {otp}'})
        except Exception as mail_error:
            return JsonResponse({'message': f'Code generated: {otp} (Email service unavailable)'})
            
    except Exception as e:
        return JsonResponse({'error': 'Service error'}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def reset_password(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        code = data.get('code')
        new_password = data.get('new_password')
        
        if not email or not code or not new_password:
            return JsonResponse({'error': 'Email, code, and new password required'}, status=400)
        
        # Find valid OTP
        otp_obj = OTP.objects.filter(email=email, otp=code).first()
        if not otp_obj or not otp_obj.is_valid():
            return JsonResponse({'error': 'Invalid or expired code'}, status=400)
        
        # Reset password
        try:
            user = User.objects.get(email=email)
            user.set_password(new_password)
            user.save()
            
            # Clear OTP
            otp_obj.delete()
            
            return JsonResponse({'message': 'Password reset successfully'})
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
            
    except Exception as e:
        return JsonResponse({'error': 'Reset failed'}, status=400)