from django.contrib import admin
from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('', views.index),
    path('products', views.ProductsView.as_view()),
    path('products/<int:pk>', views.ProductsView.as_view()),
     path('products/count', views.count_products),
    # path('products', views.products),
    # path('addproduct', views.addproduct),
    # path('delproduct/<int:pk>', views.delproduct),
    # path('updateproduct/<int:id>', views.updateproduct),
    path('login', TokenObtainPairView.as_view()),
    path('members', views.members),
    path('register', views.register),
   
]

