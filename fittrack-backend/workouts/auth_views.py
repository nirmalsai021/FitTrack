from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.conf import settings
import secrets

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email', '')
        
        # Validation
        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        if email and User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.create_user(username=username, password=password, email=email)
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            'token': token.key,
            'user_id': user.id,
            'username': user.username
        })
    except Exception as e:
        print(f"Registration error: {str(e)}")
        return Response({'error': 'Registration failed'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        
        print(f"Login attempt for username: {username}")
        
        # Validation
        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if user exists
        if not User.objects.filter(username=username).exists():
            return Response({'error': 'User does not exist'}, status=status.HTTP_401_UNAUTHORIZED)
        
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            print(f"Login successful for: {username}")
            return Response({
                'token': token.key,
                'user_id': user.id,
                'username': user.username
            })
        else:
            print(f"Authentication failed for: {username}")
            return Response({'error': 'Invalid password'}, status=status.HTTP_401_UNAUTHORIZED)
            
    except Exception as e:
        print(f"Login error: {str(e)}")
        return Response({'error': 'Login failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([AllowAny])
def forgot_password(request):
    email = request.data.get('email')
    
    try:
        user = User.objects.get(email=email)
        reset_code = secrets.token_hex(3).upper()
        
        # Store reset code in user's last_name field temporarily
        user.last_name = reset_code
        user.save()
        
        try:
            print(f"Sending reset code {reset_code} to: {email}")
            send_mail(
                'FitTrack Password Reset Code',
                f'Your FitTrack password reset code is: {reset_code}\n\nEnter this code in the app to reset your password.\n\nIf you did not request this, please ignore this email.',
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=True,
            )
            print(f"Email process completed for {email}")
        except Exception as mail_error:
            print(f"Email error: {str(mail_error)}")
            print(f"Backup - Reset code for {email}: {reset_code}")
        
        return Response({'message': f'Reset code sent to {email}! Check your email and spam folder. Code: {reset_code}'})
    except User.DoesNotExist:
        return Response({'error': 'Email not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(f"General error: {str(e)}")
        return Response({'error': 'Password reset service unavailable'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password(request):
    try:
        email = request.data.get('email')
        code = request.data.get('code')
        new_password = request.data.get('new_password')
        
        print(f"Reset password attempt for email: {email}, code: {code}")
        
        # Validation
        if not email or not code or not new_password:
            return Response({'error': 'Email, code, and new password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        if len(new_password) < 6:
            return Response({'error': 'Password must be at least 6 characters'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(email=email)
            print(f"User found: {user.username}, stored code: {user.last_name}")
            
            if user.last_name == code.upper():
                user.set_password(new_password)
                user.last_name = ''  # Clear the reset code
                user.save()
                print(f"Password reset successful for: {email}")
                return Response({'message': 'Password reset successfully'})
            else:
                print(f"Code mismatch. Expected: {user.last_name}, Got: {code}")
                return Response({'error': 'Invalid or expired reset code'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            print(f"User not found for email: {email}")
            return Response({'error': 'Email not found'}, status=status.HTTP_404_NOT_FOUND)
            
    except Exception as e:
        print(f"Reset password error: {str(e)}")
        return Response({'error': 'Password reset failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)