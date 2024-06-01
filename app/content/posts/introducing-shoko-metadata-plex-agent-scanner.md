---
title: "Introducing Shoko Metadata - Our Plex Agent and Scanner"
quick: 'A new Plex plugin allowing users to watch their anime collection within Plex.'
image: "introducing-shoko-metadata.webp"
date: "2017-03-12"
anime: "Angel Beats"
tags: ["Shoko Metadata"]
---

For the last couple of weeks, **Cazzar** has been working on a new Plex plugin called Shoko Metadata.

Recently, version 1.0.0 was released, marking it as the latest stable version working alongside Shoko Server 3.7.0.4.
However, at the time of writing, the current version has little documentation due to being an early release.

#### What is Shoko Metadata?

Firstly, let's discuss what this plugin does. Simply put, this plugin for Plex allows you to have series information for
your libraries, as well as tagging derived from AniDB tags. There is also an optional Scanner included in the package,
which, when in use, lets you use your own naming structure.

For those who have used other plugins, think HAMA, but instead of polling AniDB directly, it asks Shoko for the
information.

![Shoko Metadata - Collection](/images/blog/introducing-shoko-metadata-collection-view.webp)

#### Why This Instead of Shoko on Plex?

One of the main uses of this implementation is when you either want to save network bandwidth (more on this later, with
some examples) or most of your data is stored on a file system accessible via Plex.

Shoko on Plex has its use-cases, and Shoko Metadata is in no way intended to supersede Shoko on Plex. Personally, I have
both installed. When designing this plugin, I have been focusing on a personal use case.

#### But You May Ask, How Would This Save Network Data?

If you have Shoko operating off files on something like a NAS and you stream via Shoko On Plex, you will notice that
there is at minimum the stream between ShokoServer and Plex and then to the watching client. With everything, that's
perfectly fine. But now consider if your Shoko server is somewhere else on the network. For Plex's DirectPlay feature,
you would be looking at about three times the bandwidth being used.

This also works around some intrinsic limitations of using a Plex Channel. For example, the On Deck function is one of
the main features of being able to use Shoko Metadata. Soon (this is currently planned and in the design phase), I am
looking at adding a new feature that syncs the watch status between both sides.

#### How To Use It

Usage is quite standard for those more experienced with plugins, though using the series scanner is a bit more
complicated.

* Download a copy of the latest version of ShokoMetadata
  available [here](https://github.com/Cazzar/ShokoMetadata.bundle/releases).
* Extract the release into the plugins folder, which you can
  find [here](https://support.plex.tv/articles/201106098-how-do-i-find-the-plug-ins-folder/).
* Copy the file **Contents/Resources/Series/Shoko Series Scanner.py** out of this folder and into **Plex Media
  Server/Scanners/Series**, creating the directory if necessary.
* Make sure to edit the **Prefs** array in this scanner file to point towards the Shoko Server.
* When adding the series to Plex, select the Advanced option to allow changing the scanner and the metadata provider.
* Configure the options for the Metadata Provider (either _ShokoTV_ or _ShokoMovies_) to point towards Shoko and
  configure the optional tag information.
* ???
* Profit!
* 
#### What's The Difference And When Should I Use This?

To minimize confusion about which is best used in which scenario, let me explain when to use both plugins.

If you have any files on the cloud and don't know how to mount them as a directory on your PC, Shoko On Plex would be
the best implementation.

Shoko Metadata has the benefits of being a Plex library:

* Native "On Deck" feature
* Live subtitle switching
* Native Plex searching
* And more!

If you use the Group filters, the existing plugin, Shoko On Plex, would be best for you as I have no intention of
implementing group filters. There is no clean way to do this. While Shoko On Plex does not have an initial scanning
period where it detects the files, ShokoMetadata does, as Plex needs to learn some basic information about the files and
generate thumbnails for the episodes. This only occurs during the initial setup.

If you have any further queries, join us on Discord and discuss in the **#plex** channel.

