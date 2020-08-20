+++
title = "Announcing a New Plugin - ShokoMetadata"
image = "assets/images/blog/Shoko-Metadata-Banner.jpg"
date = 2017-03-12T04:15:48+00:00
type = "post"
anime = "Angel Beats"
category = ["Update"]
tag = ["ShokoMetadata"]
+++

For the last couple of weeks, Cazzar has been working on a new Plex plugin called, Shoko Metadata.

There recently has been the release for version 1.0.0 as this has been deemed the latest stable version working alongside Shoko Server 3.7.0.4. Though at the time of writing, the current version has little documentation due to being an early release.

##### What is it?

Firstly, I should get into what this does. Simply put, this plugin for Plex allows you to have the series information for your libraries, as well as tagging derived from the AniDB tags. There is also the optional Scanner included in the package, which when in use lets you use your own naming structure.

For those who have used other plugins, think HAMA, but instead of polling AniDB directly, it asks Shoko for the information.

![Shoko Metadata - Collection](/assets/images/blog/Shoko-Metadata-Collection-View.jpg)

##### Why this but not Shoko on Plex?

Designing this implementation one of the main uses is when you either want to save network bandwidth (more later, and some examples) or, most of your data is stored on a file system accessible via Plex.

Don't get me wrong, Shoko on Plex has its use-cases and Shoko Metadata is in no way intended to supersede Shoko on Plex, personally I have both installed. When designing this plugin, I have been focusing on a personal use case.

##### But you may ask; how would this save network data?

If you have Shoko operating off files on something like a NAS and you stream via Shoko On Plex you will notice that there is at minimum the stream between ShokoServer and Plex and then to the watching client -- With everything , that's perfectly fine. But now bring into mind, you might have something like your Shoko server somewhere else on the network, for Plex's DirectPlay feature, you would be looking at about 3 times bandwidth being used.

This does also work around some of the intrinsic limitations of using a Plex Channel, for example the On Deck function is one of the main features of actually being able to use Shoko Metadata and soon (this is currently planned, and in the design phase) I am looking at adding a new feature which is syncing the watch status between both sides.

##### How to use it

Usage is quite standard for those more experienced with plugins, though using the series scanner is a little bit more complicated.

*   Download a copy of the latest version of ShokoMetadata which is available [here](https://github.com/Cazzar/ShokoMetadata.bundle/releases).
*   Extract the release into the plugins folder which you can find [here](https://support.plex.tv/articles/201106098-how-do-i-find-the-plug-ins-folder/).
*   We need to copy the file **Contents/Resources/Series/Shoko Series Scanner.py** out of this folder and into **Plex Media Server/Scanners/Series** creating the directory if necessary.
*   Please note we also need to make sure we edit the **Prefs** array in this scanner file to point towards the Shoko Server.
*   When adding the series to Plex, we need to select the Advanced option to allow us to change the scanner as well as the metadata provider.
*   Configure the options for the Metadata Provider (either _ShokoTV_ or _ShokoMovies_) to point towards Shoko and configure the optional tag information.
*   ???
*   Profit!

##### What's the difference and when should I use this?

To boil this down and minimize confusion about which is best used in which scenario, it would be best for me to explain now in terms on when to use both plugins.

If you have any files on the cloud and don't have the know-how to mount them as a directory on your PC, Shoko On Plex would be the best implementation.

Another thing that this does have over the Shoko on Plex is the benefits of having this as a plex library.

*   Native "On Deck" feature.
*   Live subtitle switching
*   Native Plex searching
*   and more!

If you use the Group filters, the existing plugin, Shoko On Plex would be best for you as I have no intention to implement group filters, as there is no clean way to do this. Whilst Shoko On Plex does not have an initial scanning period where it detects the files, ShokoMetadata does, as plex then needs to learn some basic information about the files and generate some thumbnails for the episodes though this only is during the beginning of setting up.

If you have any further queries about this, join us on discord and you can discuss on the **#plex** channel.