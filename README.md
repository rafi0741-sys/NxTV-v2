# NXTV — fresh rebuild

Clean-codebase rebuild of the NXTV Android TV IPTV player, focused on a
correct, predictable D-pad remote experience.

## What's new vs the old build

- **Rebuilt D-pad/focus engine.** One unified model. Focus never leaks
  between the sidebar, channel list, and player. Up/Down stays in a column;
  Left/Right moves between columns.
- **Rebuilt fullscreen VOD controls.** A single control row you can fully
  traverse: `« 10 | ▶/❚❚ | 10 » | Next | CC | Audio` plus a scrub bar.
  - Left/Right moves along the row
  - On the scrub bar, Left/Right seeks ±10s
  - Up/Down hops between the button row, the scrub bar, and the Back button
  - OK activates the focused control
- **Working rewind/forward, CC and Audio pickers** (menus appear even when a
  stream has no extra tracks, telling you so).
- **Preview-then-fullscreen.** Picking a title plays it in the preview pane;
  OK or Right on the video goes fullscreen. Back returns to the list.

Carried over: multi-account home screen (Xtream / M3U URL / M3U file),
All / Recent / Favorites, resume & play-from-beginning, next episode,
hardware Back button (via @capacitor/app), NXTV branding + launcher icon.

## Files

    www/index.html   structure + styles
    www/app.js       all logic (focus engine, playback, storage)
    scripts/gen_icons.py       launcher icon generator (NXTV T-remote+V)
    scripts/patch_manifest.py  Android TV leanback manifest
    capacitor.config.json      appId com.nxtv.app / appName NXTV
    package.json               includes @capacitor/app for the Back button
    .github/workflows/build-apk.yml   cloud build (fetches hls.js, makes icons)

## Build (same cloud flow as before)

1. New GitHub repo. Upload all files keeping the folder layout
   (create the dot-folder files via "Add file > Create new file").
2. Actions tab → the APK builds automatically (~4–6 min).
3. Green check → Artifacts → download the APK.
4. On the TV: **uninstall the old NXTV first** (same appId, but this is a
   clean install), then install the new APK.
