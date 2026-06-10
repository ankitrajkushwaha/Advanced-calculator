
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import mysql.connector
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

API_KEY = os.getenv("API_KEY", "1791a63bdf6088fb7990bdb1")

DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", "myself2244"),
    "database": os.getenv("DB_NAME", "currency_converter")
}

@app.route("/convert", methods=["GET"])
def convert_currency():
    base = request.args.get("base", "USD")
    target = request.args.get("target", "INR")
    try:
        amount = float(request.args.get("amount", 1))
    except ValueError:
        return jsonify({"error": "Invalid amount"}), 400

    api_url = f"https://v6.exchangerate-api.com/v6/{API_KEY}/latest/{base}"
    try:
        response = requests.get(api_url)
        data = response.json()
        if "conversion_rates" not in data or target not in data["conversion_rates"]:
            return jsonify({"error": "Conversion failed"}), 500

        rate = data["conversion_rates"][target]
        converted = amount * rate

        # Optional: log the conversion in the database
        try:
            conn = mysql.connector.connect(**DB_CONFIG)
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO conversions (base_currency, target_currency, amount) VALUES (%s, %s, %s)",
                (base, target, amount)
            )
            conn.commit()
            cursor.close()
            conn.close()
        except mysql.connector.Error as e:
            print("DB Error:", e)

        return jsonify({
            "base": base,
            "target": target,
            "rate": rate,
            "amount": amount,
            "converted": converted
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
