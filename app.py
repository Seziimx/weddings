from flask import Flask, render_template, request, redirect, url_for, Response
import sqlite3
import os
import requests
from dotenv import load_dotenv
# Загружаем переменные из .env (локально)
load_dotenv()

app = Flask(__name__)

# Telegram Bot Token и твой chat_id
token = os.getenv("BOT_TOKEN")
chat_id = os.getenv("CHAT_ID")

# База данных — если файла нет, создаём таблицу
def init_db():
    if not os.path.exists("guests.db"):
        conn = sqlite3.connect("guests.db")
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE guests (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                phone TEXT NOT NULL,
                relation TEXT NOT NULL,
                comment TEXT,
                gift TEXT NOT NULL
            )
        ''')
        conn.commit()
        conn.close()

init_db()

# Главная страница
@app.route("/")
def index():
    return render_template("index.html")

# Обработка формы
@app.route("/submit", methods=["POST"])
def submit():
    name = request.form["name"]
    phone = request.form["phone"]
    relation = request.form["relation"]
    comment = request.form["comment"]
    gift = request.form["gift"]

    # Сохраняем в БД
    conn = sqlite3.connect("guests.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO guests (name, phone, relation, comment, gift) VALUES (?, ?, ?, ?, ?)",
               (name, phone, relation, comment, gift))
    conn.commit()
    conn.close()

    # Отправляем в Telegram
    send_to_telegram(name, phone, relation,  comment, gift)

    return redirect(url_for("thanks"))

# Спасибо-страница
@app.route("/thanks")
def thanks():
    return render_template("thanks.html")

# Просмотр гостей (защищено логином)
@app.route("/guests")
def show_guests():
    auth = request.authorization
    if not auth or not (auth.username == "admin" and auth.password == "1234"):
        return Response("Тек қана әкімшілік үшін 👮‍♀️", 401, {"WWW-Authenticate": 'Basic realm="Login Required"'})

    conn = sqlite3.connect("guests.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM guests")
    guests = cursor.fetchall()
    conn.close()

    return render_template("guests.html", guests=guests)

# Функция отправки в Telegram
def send_to_telegram(name, phone, relation, comment, gift):
    token = os.getenv("BOT_TOKEN")
    chat_id = os.getenv("CHAT_ID")
    
    message = f"""
📋 Жаңа қонақ!
👤 Аты: {name}
📱 Телефон: {phone}
🤝 Туыстық қатысы: {relation}
🎁 Кәде: {gift} ₸
📝 Тілегі: {comment if comment else '—'}
    """

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": message
    }
    try:
        requests.post(url, json=payload)
    except Exception as e:
        print(f"❌ Telegram-ға жіберу қатесі: {e}")



# Запуск сервера
if __name__ == "__main__":
    app.run(debug=True)