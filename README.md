# UIChat

An intelligent chatbot that communicates with other chatbots when not able to answer to a query and learns during the process.

## How to test the app.

Follow the steps below to start the development server on localhost.
__Install python3 if you haven't already__
__python-virtualenv is also required.__
1. Create a virtual environment:
```
$ virtualenv -m python3 env
```

2. Activate the virtual environment:
```
$ cd env
$ source bin/activate
```

3. Clone this repo:
```
(env) $ git clone https://github.com/gurpreetsingh00885/uichat.git
```

4. Install the requirements:
```
(env) $ pip3 install -r requirements.txt
```

5. Run the migrations and collect staticfiles.
```
(env) $ cd uichat
(env) $ python manage.py migrate
(env) $ python manage.py collectstatic
```

6. Start the server:
```
(env) $ python manage.py runserver
```

7. Open (http://localhost:8000/) in your web browser.


