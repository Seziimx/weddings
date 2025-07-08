from flask import Flask, render_template, request, redirect, url_for, Response
import sqlite3
import os
import requests
from dotenv import load_dotenv
# Загружаем .env переменные
load_dotenv()

# Читаем переменные
BOT_TOKEN = os.getenv("BOT_TOKEN")
CHAT_ID = os.getenv("CHAT_ID")

app = Flask(__name__)
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

# Отправка сообщения в Telegram
def send_message(chat_id, text):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    payload = {"chat_id": chat_id, "text": text}
    requests.post(url, data=payload)

# Webhook от Telegram
@app.route(f"/{BOT_TOKEN}", methods=["POST"])
def telegram_webhook():
    data = request.get_json()

    if "message" in data:
        from_chat = str(data["message"]["chat"]["id"])
        text = data["message"].get("text", "")

        if from_chat != CHAT_ID:
            send_message(from_chat, "Тек қана әкімшілік үшін 👮‍♀️")
            return "ok", 200

        if text == "/guests":
            conn = sqlite3.connect("guests.db")
            cursor = conn.cursor()
            cursor.execute("SELECT name, phone, relation, gift FROM guests")
            rows = cursor.fetchall()
            conn.close()

            if not rows:
                send_message(from_chat, "Қонақтар әзірге тіркелмеген.")
            else:
                message = "📋 Қонақтар тізімі:\n\n"
                for row in rows:
                    message += f"👤 {row[0]} | 📱 {row[1]} | 🤝 {row[2]} | 🎁 {row[3]} ₸\n"
                send_message(from_chat, message)

    return "ok", 200


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