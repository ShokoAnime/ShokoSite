+++
title = "Shoko Version 3.9.4 Released"
image = "assets/images/blog/Version-394-Banner.jpg"
date = 2018-12-30T19:42:46+00:00
type = "post"
version = "3.9.4"
anime = "Beautiful Bones: Sakurako's Investigation"
category = ["Update"]
tag = ["Shoko Desktop", "Shoko Server"]
+++

Shoko Version 3.9.4 is now available for download!

This release addresses various bugs reported since the last update that we felt needed addressing before the next major version. This version also contains a big change which we've addressed below.

For a complete list of changes, check out the [Changelog](https://docs.shokoanime.com/changelog.html).

##### Shoko Analytics

One of the bigger changes we were going to introduce in version 4.0 was the inclusion of a telemetry service. However we didn't want it to get buried by the other features and changes coming with version 4.0 so instead we added a basic version of it into version 3.9.4. With telemetry services being a hot topic these days we wanted to fully explain our reasons for adding it and what data we'll be collecting to avoid any confusion going forward.

Shoko Server is a massive program and will only continue to grow and while we generate logs with data related to Shoko Server's operations, however these logs are only useful to use when provided by our users. Therefore the data we'll be collecting will allow us to target specific issues, add/or update popular features and re-tool less popular ones. Furthermore, **all data collected is non-identifiable.** We don't care about what specific titles you have in your collection or what you watch. We only care about making Shoko better.

Starting with Version 3.9.4, we'll be collecting information related to the following.

-   AniDB - Ban Type (HTTP/UDP)
-   Import - Run Import
-   Import - Run Import (Scan TVDB)
-   Import - Run Import (Scan MovieDB)
-   Import - Run Import (Update TVDB)
-   Import - Run Import (Update All AniDB)
-   Import - Run Import (Update All Stats)
-   Plex - Manually Syncing Plex (Single User)
-   Plex - Token Created
-   Plex - Sync All
-   Server - Startup Status
-   Server - Linux Users
-   Server - Startup Complete
-   Server - Server Shutdown
-   Trakt - Scan for Matches
-   Utility - Removing Missing Files
-   Utility - Validate All Images

##### Opting Out

We only track that the events listed above occur, not anything about them. You may opt-out by setting **GA\_OptOutPlzDont** to **true** in settings.json.

##### Contributors

This release was made possible by the following people.

**Avael, Baine, BigRetroMike, Cazzar & Da3dsoul**