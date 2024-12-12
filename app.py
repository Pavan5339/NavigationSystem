from flask import Flask, render_template, request, jsonify
import openrouteservice

app = Flask(__name__)

# Initialize OpenRouteService client with your API key
ORS_API_KEY = "your_key"  # Replace with your actual OpenRouteService API key
client = openrouteservice.Client(key=ORS_API_KEY)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/route', methods=['POST'])
def get_route():
    data = request.json
    start = data.get('start')
    end = data.get('end')

    print(f"Received start: {start}, end: {end}")

    try:
        # Request a route from OpenRouteService
        route = client.directions(
            coordinates=[start, end],
            profile='driving-car',
            format='geojson'
        )
        print(f"Route received: {route}")
        return jsonify(route)
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
