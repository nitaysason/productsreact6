from django.shortcuts import render
from rest_framework import serializers
from .models import Product
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user:
        login(request, user)
        return Response({'username': user.username, 'name': user.first_name}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def count_products(request):
    user = request.user
    product_count = user.product_set.count()
    return Response({'count': product_count})


@api_view(['GET'])
def index(request):
    return Response("hhhhhhhhhhh")

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def members(req):
    return Response('members only- yaya')

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
    def create(self, validated_data):
        user = self.context['user']
        print(user)
        return Product.objects.create(**validated_data,user=user)

@api_view(['POST'])
def register(request):
    user = User.objects.create_user(
                username=request.data['username'],
                email=request.data['email'],
                password=request.data['password']
            )
    user.is_active = True
    user.is_staff = True
    user.save()
    return Response("new user born")

@permission_classes([IsAuthenticated])
class ProductsView(APIView):
    def get(self, request):
        user=request.user
        # print( request.user)
        # my_model = Product.objects.all()
        my_model = user.product_set.all()
        serializer = ProductSerializer(my_model, many=True)
        return Response(serializer.data)
    
    def post(self, request,pk=None):
        # usr =request.user
        # print(usr)
        serializer = ProductSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    def put(self, request,pk=-1):
        my_model = Product.objects.get(pk=pk)
        serializer = ProductSerializer(my_model, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    def delete(self, request, pk=-1):
        print(pk)
        my_model = Product.objects.get(pk=pk)
        my_model.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




