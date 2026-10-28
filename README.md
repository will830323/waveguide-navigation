# Waveguide Navigation

A Waze-style driving navigation app for Malaysia that installs on Android and iPhone as a home-screen app (PWA). No API keys and no running costs: it uses free OpenStreetMap-based services.

## Features

| Feature | Waze equivalent |
|---|---|
| 3D heading-up driving view, auto day/night map | Driving view, night mode |
| Up to 3 alternative routes, "Best" picked on time **including reported delays** | Route options that avoid jams |
| Turn-by-turn voice in English, Bahasa Melayu and 中文 | Voice directions |
| Auto reroute when you leave the route | Recalculating |
| Hazard reports: police, accident, jam, flood, roadworks, pothole, speed camera, object | Report button |
| "Still there? 👍 / 👎" as you pass a report; reports expire on their own | Thanks / Not there |
| Shared reports between drivers (optional, Firebase) | Community |
| Speed limit sign + speedometer, beep and voice when > limit + 5 km/h | Speedometer alerts |
| Petrol stations nearby, add as a stop mid-drive | Gas stations / Add a stop |
| Share ETA (WhatsApp etc.) | Send ETA |
| Home / Work, recent places, long-press to drop a pin | Favourites |
| Toll tag per route, avoid-tolls preference | Avoid toll roads |
| Test drive mode to preview a route | — |
| Screen stays on while navigating | — |

## Put it on your phone (10 minutes)

GPS only works over **https**, so host the folder somewhere free:

1. Create a GitHub repo (e.g. `waveguide`) and upload every file in this folder, keeping the `icons/` folder.
2. Repo **Settings → Pages → Source: Deploy from a branch → main / root**. Wait a minute.
3. Open `https://<your-username>.github.io/waveguide/` on your phone.
4. Android Chrome: menu ⋮ → **Install app**. iPhone Safari: Share → **Add to Home Screen**.
5. Allow location when asked.

Netlify Drop (drag the folder onto app.netlify.com/drop) also works.

## Shared reports between drivers (optional)

By default reports stay on your phone. To share them with friends, like Waze's community layer:

1. console.firebase.google.com → Add project → **Build → Realtime Database → Create database** (region: Singapore `asia-southeast1`), start in **test mode**.
2. Copy the database URL (looks like `https://xxx-default-rtdb.asia-southeast1.firebasedatabase.app`).
3. In the app: Settings → **Shared reports** → paste the URL. Everyone who pastes the same URL sees the same reports, refreshed every 30 s.

Test mode rules are open and expire after 30 days. For long-term use, set rules that only allow the `reports` path:

```json
{ "rules": { "reports": { ".read": true, "$id": { ".write": true,
  ".validate": "newData.hasChildren(['type','lat','lng','t'])" } } } }
```

## Make a real Android app (APK / Play Store)

Once hosted, go to **pwabuilder.com**, enter your GitHub Pages URL, and download the Android package. It wraps this same app in a Trusted Web Activity you can sideload or publish to Google Play.

## Limits to know

- **No live traffic speeds.** Route times are OSRM free-flow estimates; delays come from driver reports (jam +6 min, accident +8, flood +15, roadworks +3). Real traffic needs a paid feed (TomTom, HERE, Google).
- **Avoid tolls** prefers a toll-free alternative when OSRM returns one; the public OSRM server can't force toll-free routing.
- **Speed limits** come from OpenStreetMap `maxspeed`. A dashed ring means the road has no tag and the value is a Malaysian default for that road type.
- The free public servers (OSRM demo, Photon, Overpass) are fine for personal use and testing. For many users, self-host OSRM/Valhalla or use a paid provider, and change the URLs in `CFG` at the top of the script.
- Keep the phone screen on and the app in front; browsers pause GPS for background web apps.

## Files

- `index.html` — the whole app (MapLibre GL 4.7.1 from cdnjs)
- `manifest.webmanifest`, `sw.js`, `icons/` — install as an app and open instantly

Map © OpenStreetMap contributors · tiles OpenFreeMap · routing OSRM · search Photon (Komoot) · limits & stations Overpass API.
