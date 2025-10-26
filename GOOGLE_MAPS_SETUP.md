# Google Maps Setup Instructions

The website includes an interactive Google Map showing the lab's location. To enable it, you need a Google Maps API key.

## Steps to Get a Google Maps API Key:

### 1. Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### 2. Create a New Project (if needed)
- Click on the project dropdown at the top
- Click "New Project"
- Name it (e.g., "Vision Lab Website")
- Click "Create"

### 3. Enable Google Maps JavaScript API
- Go to "APIs & Services" → "Library"
- Search for "Maps JavaScript API"
- Click on it and press "Enable"

### 4. Create API Key
- Go to "APIs & Services" → "Credentials"
- Click "Create Credentials" → "API Key"
- Copy the generated API key

### 5. (Optional but Recommended) Restrict Your API Key
- Click on your API key to edit it
- Under "Application restrictions":
  - Choose "HTTP referrers (web sites)"
  - Add your website domain (e.g., `yourwebsite.com/*`)
- Under "API restrictions":
  - Choose "Restrict key"
  - Select "Maps JavaScript API"
- Click "Save"

### 6. Add API Key to Your Website
Open `index.html` and replace `YOUR_API_KEY` with your actual API key:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_ACTUAL_API_KEY_HERE&callback=initMap" async defer></script>
```

## Update Map Location

To change the map location, edit `info.json`:

```json
"contact": {
  "map": {
    "latitude": 39.9543,
    "longitude": -75.1894,
    "zoom": 16
  }
}
```

## Finding Coordinates

1. Go to Google Maps
2. Right-click on your location
3. Click on the coordinates to copy them
4. Update the `latitude` and `longitude` in `info.json`

## Testing Locally

If you're testing locally without a server, the map might not work due to CORS restrictions. Use a local server:

```bash
# Python 3
python -m http.server 8000

# Or use VS Code Live Server extension
```

Then visit: `http://localhost:8000`

## Pricing

Google Maps offers a free tier:
- $200 monthly credit (covers ~28,000 map loads)
- Most small websites stay within the free tier

## Need Help?

Official documentation: https://developers.google.com/maps/documentation/javascript/get-api-key

