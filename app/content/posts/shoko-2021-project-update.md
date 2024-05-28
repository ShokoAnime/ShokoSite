---
title: "Shoko 2021 Project Update"
quick: "Outline of whats planned for Shoko and current status of each program/plugin."
image: "shoko-2021-project-update.webp"
date: "2021-02-28"
anime: "Full Metal Panic!"
tags: [ "Shoko Server", "Shoko Desktop", "Shoko Desktop 2", "Nakamori", "My Anime 3", "Shokofin" ]
---

It's no secret that our team is working on multiple projects under the Shoko umbrella. Some of these projects have been
discussed publicly on our website, on Discord, and other platforms, while others have only been discussed internally
among the team. With the start of a new year, we thought it would be best to outline the current status of all our
projects and talk about some new ones in development.

##### Shoko Desktop 2

Shoko Desktop 2 was first envisioned back in late 2016 and at the time was nothing more than a handful of ideas for
improving the current Shoko Desktop. Over the years, these ideas turned into a foundation for creating a better program
to replace the original Shoko Desktop, which predates every client we currently support. We switched codebases many
times until finally settling on a web-based platform using a framework called [Electron](https://www.electronjs.org/) to
create a desktop application.

However, as we've continued to develop Shoko, our original intention to maintain and support two big projects and three
separate codebases was something we no longer wanted to do. It's a lot of work for people contributing to a project in
their free time. One of the major downfalls of the original Shoko Desktop was the fact that it was a huge and complex
codebase that no one wanted to maintain.

After multiple discussions with the team, we've decided to stop development on Shoko Desktop 2. However, this doesn't
mean we're scrapping the project or keeping the current Shoko Desktop, either, as it has been put into maintenance mode
and eventually will no longer be supported. In addition to being difficult to work on, it is full of basic design flaws
and security vulnerabilities.

Instead, we've decided to incorporate the majority of Shoko Desktop functionality into the Shoko Server Web UI and
create a single place to manage and view your collection. One of the things we will not be adding is file playback. This
is a technical issue rather than a decision based on ideals or workload. Browsers are a strictly controlled environment
with limited playback support, and with nearly all our users using a media player program, it is not something we want
to support lightly. We've done our share of research on the matter, but if you happen to be an expert, feel free to join
us on Discord to chat.

There have been discussions on creating a separate playback program, but at this time it's nothing more than that.

##### My Anime 3

Back in 2018, we put My Anime 3 into [maintenance mode](https://shokoanime.com/blog/my-anime-3-version-3-7-2-released/)
due to a lack of developer support and a focus on other areas. This hasn't changed, but it's important to note that with
the eventual removal of APIv1, My Anime 3 will stop working. Only Shoko Desktop and My Anime 3 use this old API, and
with the consolidation of Shoko Desktop's functionality into the Web UI, we're not going to support an outdated API for
a single project with a dwindling user base.

We are currently evaluating updating My Anime 3 to use the new API but have not made any decisions yet. For current My
Anime 3 users who want to continue using it, we'll be sure to let you know the last version of Shoko that supports My
Anime 3.

##### MediaPortal 2 Plugin

Creating a successor to My Anime 3 for MediaPortal 2 is something we've looked into but will not commit to at this time.
We like what we've seen, but MediaPortal's overall popularity leads us to question how needed an anime plugin is on this
platform. We have made minimal progress on what could be called a plugin, but this is more to see how easy development
and maintenance would be.

If we decide to make a plugin, users can expect it to be a fairly light experience similar to Nakamori (Kodi plugin). It
will not aim to be a fully featured client like My Anime 3.

##### Removing TvDB

Late last year, TheTVDB staff announced that TheTVDB would no longer be free and would instead require
a [subscription](https://thetvdb.com/subscribe) to use its API. We attempted to reach out to find out just how much a
commercial license would cost and to see if there was any kind of open-source discount or program, but they never
responded.

According to one of
the [Jellyfin devs](https://www.reddit.com/r/jellyfin/comments/jrvly5/thetvdb_new_api_and_licensing_model/gbwbom6),
TheTVDB quoted them a price that is completely unreasonable for a project like ours, which has no intention of taking
donations, screening ads, selling or even collecting user info, or any other intent other than providing a service that
we enjoy working on.

Like many other programs that relied on TVDB, we'll be replacing them
with [The Movie Database](https://www.themoviedb.org/?language=en-US), which we already support in part. This means we
will be completely removing TVDB support regardless of whether you decide to pay for it yourself. Our plans include a
plugin system that will allow any dev who wants to add it back and update it to do so at their own responsibility and
leisure.

We're still deciding on how to handle existing TVDB data, as Shoko currently has a fixed set of data providers. It is
likely that we'll decide to remove it all and have Shoko download the data from TMDb.

We will release more info on this after discussing it further at a later date.

According to one of
the [Jellyfin devs](https://www.reddit.com/r/jellyfin/comments/jrvly5/thetvdb_new_api_and_licensing_model/gbwbom6?utm_source=share&utm_medium=web2x&context=3),
TVDB quoted them a price that is completely unreasonable for a project like ours, which has no intention taking
donations, screening ads, selling or even collecting user info, or any other intent other than providing a service that
we enjoy working on.

Like many other programs that relied on TVDB, we'll be replacing them
with [The Movie Database](https://www.themoviedb.org/?language=en-US) which we actually already support, in part. This
does mean we will be completely removing TVDB support regardless if you decide to pay for it yourself. Our plans include
a plugin system that will allow any dev who wants to add it back and update it to do so at their own responsibility and
leisure.

We're still deciding on how to handle existing TvDB data, as Shoko current has a fixed set of data providers. It is
likely that we'll decide to remove it all and have Shoko download the data from TMDb.

We will release more info on this after discussing it more at a later date.

##### The State of Nakamori

We've been asked when Nakamori will get updated to work with the latest version of Kodi. As of Kodi 19, all plugins must
be written in Python 3. Unfortunately, Nakamori is a community plugin made by BigRetroMike, and while we'd love to see
it updated, it's out of our hands. However, da3dsoul, who has put a lot of work into Nakamori, wanted to explain why he
is no longer working on it.

This section is written by **da3dsoul** from his perspective and how it pertains to him. "I" refers to me, da3dsoul, in
this part.

Nakamori has always held an interesting status, as it was developed by someone who hadn't officially joined the team or
worked on the backend of Shoko. Back in 2015, I joined the team and got to work improving Shoko and Nakamori in many
ways. I quickly became a lead dev for both projects, and Nakamori saw consistent improvement and maintenance for the
better part of the past 5 years. After much work, several years, and many fictional tears, I have decided to step away
from Nakamori. This was a big and difficult decision, as I haven't ever completely dropped a project I committed to with
the clear intent of never touching it again, until now. My reasoning for doing so is partially due to having
communication failures with the aforementioned person who started the Nakamori project, and it was causing me
consistent, undue stress for something that I work on for free and have devoted literally more time to than the average
American tenure.

The other, and probably more important reason, as far as you, the users, would care about is regarding Kodi itself.
Making plugins for Kodi is annoying, to put it in words safe for TV-Y7. For the past 5 years, I have spent more time
looking through Kodi's forums and code and chatting with other devs than actually writing any code for Nakamori. It
displays lists of media in a folder-like structure, provides a context menu for those items, and it plays the media
files from those "folders" from a streaming URL with a resume system. Other endeavors have been attempted, but most of
them were either buggy and unreliable or just didn't work. I could fit basically the entire functionality of Nakamori
into one sentence, but despite that, it doesn't seem to work flawlessly.

The reason for this is due to Kodi and Team Kodi's priorities. Kodi is an open-source project by volunteers who
occasionally take donations. This means that they do what they want, and they don't really have any obligations to users
or other devs. We are the same, except that we don't take donations, so I'm not saying this to be rude. It's merely a
statement of context. Unfortunately, this means that things like the plugin system tend to get comparatively little
attention from the developers, and any disagreement about decisions made by Team Kodi are suggestions for the amicable
devs, at best. Their decisions and attitude toward plugin developers have made developing a plugin for Kodi unfeasible
to deliver an experience for users that I would want to put my name on, even if it is a cringy edgelord name from when I
was 10 years old.

Nakamori currently works with this current version (4.x) of Shoko and, at the least, Kodi 17.6. I don't know if it works
for later versions, and I will not check myself. I'll still answer questions if I am able, as I did still write well
over 90% of Nakamori's current codebase, but the longer I go without looking at it, the less useful my advice will be.
That's what it means for me to drop a project.

That said, the state of Nakamori is not set in stone. BigRetroMike, the founder of the project, could decide to pop in
and work on it again. A new developer could take the work we've put in and keep a plugin for Kodi working as best as
they are able to. Like Shoko, you have license to take any or all of the code present in Nakamori for your own use. I
ask that you share your work with the rest of us, but that's merely a request, not part of the terms of use.

##### Ashen

Like us, our friends at [Animeshon](https://animeshon.com/) have multiple projects in the works, and Ashen has taken a
backseat for now. This is because ~~da3dsoul is lazy and plays too many video games~~ their dev team is working hard on
other projects like their Encyclopedia at the moment, and they want Ashen and Detabesu (the ~~terrible~~ fantastic name
of the Encyclopedia section) to be able to handle the volume of users that Shoko will bring.

##### Shokofin

We'll properly introduce Shokofin later, but we've been working on a plugin for Jellyfin that is currently in beta and
waiting on some changes in Jellyfin before we can move forward. Once these changes have been made and/or an updated
version comes out, we can move forward with Shokofin.

##### Developers Wanted

As usual, we're always looking for devs to join our team. If interested, join our Discord and let us know! We always
have plans, big and small, for improvements to the infrastructure of managing our anime collections.
