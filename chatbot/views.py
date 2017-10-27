from django.shortcuts import render
from django import views
from django.http import JsonResponse, HttpResponse
import requests
from chatterbot.trainers import ListTrainer
import chatterbot
import json
chatbot  = chatterbot.ChatBot("UICHAT")
chatbot.set_trainer(ListTrainer)
class ChatView(views.View):
	def get(self, request, *args, **kwargs):
		print(request.GET)
		text = request.GET['text']
		resp = chatbot.get_response(text)
		if resp.confidence > 0.85:
			return JsonResponse({"response": str(resp)})
		url = "https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27&text=%s&features=concepts" %(text)
		r = requests.get(url=url, auth=requests.auth.HTTPBasicAuth('55ea49b2-c353-463a-8d25-b3c358fa1df3', 'z5AU0l7jtd3c')).json()
		concept = 'general'
		try:
			concept = r['concepts'][0]['text']
		except:
			pass

		dialogflow_data  = {
		"contexts": [
			concept
			],
		"lang": "en",
		"query": text,
		"sessionId": "12345",
		"timezone": "America/New_York"
		}

		r = requests.post('https://api.dialogflow.com/v1/query/', data = json.dumps(dialogflow_data), headers = {"Content-Type":"application/json", "Authorization" : "Bearer f9c47d8715dc43c8a253146498882a5f"})
		if len(r.json()['result']['parameters'].keys()):
			chatbot.train([text,
							  r.json()['result']['speech']])
		return JsonResponse({"response":r.json()['result']['speech']})

class HomeView(views.View):
	def get(self, request, *args, **kwargs):
		return render(request, "index.html",{})
