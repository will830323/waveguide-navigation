# Waveguide Navigation (Panduan)

A Waze- and Amap-style navigation app for Malaysia that installs on Android and iPhone from the browser (PWA), and as an Android APK through PWABuilder. It runs on free OpenStreetMap-based services. Live traffic is optional, with a free TomTom key.

## Features

### Driving guidance
| Feature | Like |
|---|---|
| North-up map with your position kept in the middle, snapping back 10 s after you pan; optional heading-up 3D; Light blue, Landmarks, Satellite and Dark maps | Waze / Amap |
| Turn-by-turn voice in English, Bahasa Melayu and 中文, with exit numbers and signposts ("towards Sentul") | Both |
| **Lane arrows** before junctions: which lanes to be in | Amap |
| **Speed cameras** from map data plus driver reports, with beep and voice warning | Amap / Waze |
| Speed-limit sign and speedometer; beeps when you're over the limit by more than 5 km/h | Waze |
| **Route progress bar** with incidents and cameras along the way | Amap |
| **Faster route found** prompt every 4 minutes, with Switch or Keep | Waze |
| Full **Directions** list: every junction in order, with distances | Both |
| **HUD mode**: big mirrored speed and turns for the windscreen at night (tap the speedometer) | Amap |
| Auto reroute; screen stays on | Both |

### Routes
| Feature | Like |
|---|---|
| **Car, Motorcycle, Bicycle, Walk** modes | Amap |
| Fastest / **Shortest**, **Avoid tolls**, **Avoid highways** (real routing via Valhalla) | Both |
| Up to 3 alternatives; each shows time, traffic delay, tolls, 🚥 traffic-light count, 📷 cameras, and reports on the route | Amap |
| **Live traffic** (TomTom key): coloured roads, traffic-aware ETAs, live incidents | Both |
| **Planned drives**: "arrive by" time works out your leave-by time (with predicted traffic), and adds a Google Calendar reminder | Waze |
| Add stops; Home / Work; recent places; long-press to drop a pin | Both |

### Public transport
| Feature | Like |
|---|---|
| **Drive / Public transport** switch under the search bar | Jalan Nav / Amap |
| Bus, LRT, MRT, monorail, KTM, ETS, ERL and ferry journeys from Transitous timetables | Amap |
| Each option shows its duration, depart → arrive times, changes, walking minutes, line chips in the line's own colour, and an **estimated RM fare**, with **Best / Fastest / Cheapest / Least walking** tags and **● Live** where real-time data exists | Amap |
| Tap an option for detailed steps: where to board, which way, stops on the way, where to get off; drawn on the map | Amap |
| **Leave now / Depart at / Arrive by**, a 🕒 reminder, and sharing the trip as text | Amap |
| **Step-by-step guidance**: walk to the stop → board → stops left → **"Get off at the next stop"** voice and vibration alert | Amap |
| Driving time shown alongside for comparison | Jalan Nav |

### Tourist / traveller mode
Switch it on with the **🧳 Tourist mode** chip under the search bar, or in Settings → Mode. Normal mode keeps the everyday experience.
| Feature | |
|---|---|
| **Along your route**: attractions, Wikipedia landmarks (with photo and short description), culture centres, craft and souvenir shops, malls, restaurants, cafés and hotels, each placed along the route with distance and side (left or right) | Shown on the map and in a list |
| **⭐ Recommended**: places with a Wikipedia entry, and well-known Malaysian food spots matched by name (Yut Kee, Village Park, Line Clear, Hameediyah, Nam Heong and more). Free map data has no star ratings. | Tap one to see it or add it as a stop |
| **Landmark commentary**: "Coming up on your right: Sultan Abdul Samad Building", with a photo card and a Stop button | While driving or walking |
| Tourist chips: ⭐ Famous food, 📸 Sights, ☕ Cafés, 🏨 Hotels, 🛍️ Malls | On a 3 km map around you |

### Walking photo guide
| Feature | |
|---|---|
| **📷 Walking guide with photos**: every turn of a walking route with a street photo, a landmark to look for ("Turn right · look for KFC ahead") and the distance between points | Walking routes |
| The same guide for **public transport walking legs** ("📷 Show the way with photos") and a 📷 Photos button while walking | Public transport |
| Photos: Wikimedia Commons by default; add a free **Mapillary** token in Settings for street-level photos facing your walking direction | |

### Nearby map (3 km)
| Feature | |
|---|---|
| **🗺️ Show everything on the map**: hotels, cafés, restaurants, EV charging, petrol, parking, ATMs, malls, convenience stores and sights within a 3 km circle, with category filters and ⭐ well-known places | Nearby |
| Single categories also search 3 km first, then widen to 15 km if nothing is found | |

### Nearby & social
| Feature | Like |
|---|---|
| **Nearby**: petrol, EV charging, parking, food, convenience store, ATM, surau and mosque, toilets, hospital and clinic, hotel, car repair, police station. While driving, places on your route come first | Amap |
| **Parking near the destination** offered about 1 km before you arrive | Waze |
| Hazard reports: police, accident, jam, flood, roadworks, pothole, camera, object, road closed. "Still there? 👍 / 👎" as you pass one | Waze |
| **Share ETA** and **share live location**: friends open your link and watch your car move | Waze / Amap |
| **Points and levels** for reports, confirmations and trips | Waze |
| **Voice commands**: "navigate to KLCC", "report police", "find petrol nearby", "go home" (EN / BM / 中文) | Both |

## Put it on your phone

GPS only works over **https**:

1. In a GitHub repo, upload every file in this folder: `index.html`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`, `maskable-512.png`, `logo-96.png`.
2. Go to **Settings → Pages → Deploy from a branch → main / root**.
3. Open `https://<username>.github.io/<repo>/` on your phone and install it: Chrome ⋮ → Install app.
4. For an APK: pwabuilder.com → your link → Package for stores → Android.

## Live traffic (optional, free)

1. Sign up at **developer.tomtom.com**, then copy your API key from **My Dashboard**.
2. In the app, go to **Settings → Live traffic → TomTom API key** and paste it.
3. The free tier covers personal use. Tiles and API calls count against the daily limit shown on your dashboard.

## Shared reports and live location (optional, free)

1. console.firebase.google.com → Add project → **Realtime Database** → Create (Singapore `asia-southeast1`), in test mode.
2. In the app, go to **Settings → Community → Shared database** and paste the URL.
3. Share live location from the **Share** button while driving. Friends open the link; it already carries the database address.

Test-mode rules expire after 30 days. For long-term use:

```json
{ "rules": {
  "reports": { ".read": true, "$id": { ".write": true, ".validate": "newData.hasChildren(['type','lat','lng','t'])" } },
  "live":    { "$code": { ".read": true, ".write": true, ".validate": "newData.hasChildren(['lat','lng','t']) || !newData.exists()" } }
} }
```

## Limits to know

- **Without a TomTom key**, times are free-flow estimates plus delays from driver reports.
- **Lane arrows** need OSM lane data. They show on most highways and many city junctions, but not on motorcycle or avoid-preference routes, which come from Valhalla.
- **Speed cameras and traffic lights** come from OpenStreetMap, so coverage depends on how well your area is mapped. Driver reports fill the gaps.
- **Voice commands** need Chrome's speech recognition and the microphone permission.
- **Public transport** timetables come from Transitous. Coverage in Malaysia depends on which operators publish open data, and fares are estimates (adult, cashless).
- **Tourist places and photos** come from OpenStreetMap, Wikipedia and Wikimedia Commons, so coverage is best in cities and tourist areas. Street photos may be from a nearby spot or an earlier year.
- **Leave-by reminders** pop up only while the app is open. The Google Calendar event reminds you even when it's closed.
- **The free public servers** (OSRM, FOSSGIS Valhalla, Photon, Overpass) suit personal use and testing. For many users, self-host them or switch providers: change the URLs in `CFG` and `MODES` at the top of the script.
- **Satellite imagery** is from Esri, for personal use. Check its terms before a public release.

Map © OpenStreetMap contributors · OpenFreeMap · Routing OSRM & Valhalla (FOSSGIS) · Search Photon · Places Overpass · Traffic © TomTom · Imagery © Esri.
