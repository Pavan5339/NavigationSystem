# NavigationSystem
# **School Bus Tracking System**

## **Overview**
The **School Bus Tracking System** is a web-based application designed to provide real-time tracking of school buses. It calculates the shortest route between two locations, dynamically updates the bus's location, and displays the results on an interactive map.

---

## **Features**
- **Live Tracking**: Displays the bus's current location in real-time.
- **Route Optimization**: Uses GPS coordinates and algorithms to calculate the shortest route.
- **Interactive Map**: Visualizes the route and live updates using Leaflet.js.

---

## **Technologies Used**

### **Frontend**
- **HTML**: Provides the structure of the web application.
- **CSS**: Styles the interface for a clean and user-friendly design.
- **JavaScript**: Implements map interactions and dynamic updates.
- **Leaflet.js**: Renders the interactive map and displays routes.

### **Backend**
- **Python (Flask)**: Manages API requests and routing logic.
- **OpenRouteService API**: Generates optimal routes using GPS data.

---

## **Project Structure**
```
school-bus-tracking/
│
├── public/
│   ├── index.html        # Main HTML file for the application
│   ├── styles.css        # CSS for styling
│   └── assets/           # Images or other assets
│
├── src/
│   ├── map.js            # JavaScript for map logic
│   └── app.py            # Flask backend logic
│
├── requirements.txt      # Python dependencies
└── README.md             # Project documentation
```

---

## **How to Run**

### **Prerequisites**
- Python 3.x installed on your machine.
- OpenRouteService API key (create a free account at [OpenRouteService](https://openrouteservice.org/sign-up/)).

### **Steps**
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/school-bus-tracking.git
   cd school-bus-tracking
   ```

2. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Add Your API Key**:
   - In `app.py`, replace the placeholder with your OpenRouteService API key:
     ```python
     ORS_API_KEY = "your-api-key-here"
     ```

4. **Run the Application**:
   ```bash
   python app.py
   ```

5. **View the Application**:
   - Open your browser and navigate to `http://127.0.0.1:5000/`.

---

## **Future Enhancements**
- Integrate live traffic data for dynamic route adjustments.
- Add notifications for parents when the bus is near their stop.
- Develop a mobile app version for enhanced accessibility.

---

## **Contributors**
- [pavan5339](https://github.com/pavan5339)

---


