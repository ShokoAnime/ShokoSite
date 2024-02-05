+++
title = "Hello Shokofin"
quick = "Meet Shokofin, our Jellyfin plugin."
image = "assets/images/blog/Hello-Shokofin.jpg"
date = 2021-08-29
type = "post"
anime = "Night Raid 1931"
category = ["Update"]
tag = ["Shokofin"]
dev= ["Mohan226", "Revam"]
+++

After being in development for quite some time, we're happy to announce our [Jellyfin](https://jellyfin.org/) plugin is now available to all users. We've previously [talked about Shokofin](https://shokoanime.com/blog/shoko-2021-roadmap/) before and with a starting version of 1.4.7, some of you might be wondering why it took so long for us to announce it.

Originally we had to wait for Jellyfin version 10.7 to be released, as we heavily relied on a change introduced in that version and didn't want to make people install a dev version that could potentially cause damage to their database. We also wanted to do some additional work before officially launching Shokofin and like all are other planned changes, time became our biggest enemy pushing the release back.

##### So tell me, what is Shokofin?

Shokofin is a plugin for [Jellyfin](https://jellyfin.org/) that integrates with Shoko Server, similar to our Plex Plugin, [Shoko Metadata](https://shokoanime.com/blog/tag/shoko-metadata/). It lets Shoko Server do it's job of managing your on-disk library structure and collect metadata about each series, while it lets Jellyfin focus on providing you with an excellent viewing experience using the metadata Shoko Server have collected about your library.

##### What can it do?

As mentioned above, Shokofin enables Jellyfin to collect and use the metadata from Shoko Server. More specifically it allows Jellyfin to access metadata such as titles, ratings, cast/roles, studio/production and tags. It also enables Jellyfin to collect and use images for series/season covers, episode thumbnails and banners stored in Shoko Server in addition to structuring your library using season data provided by TvDB (RIP)/TMDB (soon™️) or generated using Shoko's Group feature.

If you're one of those that fancy a separate movie library then Shokofin provide limited support for keeping separate movies and series libraries — by following some guidelines. A power-feature of this plugin is being able to display titles in different languages, according to your local settings within Jellyfin, or using your global settings from Shoko Server, in addition to being able to display the titles in up to two languages at once (using a little hack). In short, Shokofin helps keep the hassle of managing your anime library to a minimum and watch time to a maximum by allowing Jellyfin to use your managed Shoko Server library as-is, with minimal setup.

Please note, at this time, shared "native" movies and series libraries are not officially supported as-of-yet, but as a workaround you can still display movie entries as normal series.

##### I'm intrigued, what do I need to do to use the plugin?

Glad you asked! There is at least one hard requirement if you want to use this plugin. It's very simple actually, you just need to ensure that every video file managed by Shoko Server have an unique name. It is also recommended that you keep your unrecognized files outside your structured anime library. The easiest way to do this is using a drop source outside your structured library for Shoko Server to pick up new files.

##### Shokofin Roadmap

While in no particular order, we're currently planning on adding the following to the plugin down the road.

- _Somehow_ add support for Jellyfin Genres.
- Add Trailers and Theme Songs (Openings/Ending) in a native fashion to Series/Seasons/Episodes
- Show Metadata for episodes missing from your on-disk collection in Jellyfin.
- Add _proper_ support for collections in Jellyfin when they add it. (Currently waiting on the Jellyfin team to add cross-type ('type' as in a series, a movie, an album and/or a picture entry) collections)

##### Shokofin Download & Install

Check [ShokoDocs](https://docs.shokoanime.com/shokofin/install/) for install instructions.

##### Contributors

This release was made possible by the following people.
