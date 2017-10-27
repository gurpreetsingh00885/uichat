from django.shortcuts import render
from django import views
from django.http import JsonResponse, HttpResponse
import requests

class ChatView(views.View):
	def get(self, request, *args, **kwargs):
		text = request.GET['text']
		url = "https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27&text=%s&features=concepts" %(text)
		r = requests.get(url=url, auth=requests.auth.HTTPBasicAuth('55ea49b2-c353-463a-8d25-b3c358fa1df3', 'z5AU0l7jtd3c')).json()
		if "error" in r:
			return JsonResponse(r)
		concept = 'general'
		try:
			concept = r['concepts'][0]['text']
		except:
			pass
		print(concept)
		return JsonResponse(r)
