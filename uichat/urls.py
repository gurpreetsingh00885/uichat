from django.conf.urls import url, include
from django.contrib import admin
from chatbot.views import HomeView


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/chatbot/', include('chatbot.urls')),
    url(r'^', HomeView.as_view()),
]
