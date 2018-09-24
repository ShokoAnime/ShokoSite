# Shoko Website

As with everything else, our website is open-source so if you feel a change needs to be made, submit a PR. There are a few things to keep in mind which we've outlined below. 

# Jekyll Framework

The Shoko website is built using [Jekyll](https://jekyllrb.com/) and will probably be required if you plan to make any major changes. Please check the Jekyll website to learn how to install and properly setup Jekyll, do not ask us for support. 

# Adding A New Blog Post

Blog posts are generally reserved for Shoko related announcements but can be created by program / plugin authors to inform users about a recently released update. Your blog post should contain relevant details about the update and not act as a glorified link to your own site or repo. 

Blog posts are located in the **_posts** folder, we recommend taking a look at an existing blog post for file naming and structure setup.

If you'd like to make a blog post and have questions, please contact **Elemental Crisis** on the **Shoko Discord** for more information.

# Adding / Updating A Program / Plugin

Adding a new program or plugin.

1. Create a new folder in **assets/images/programs-plugins** with the name of your program / plugin.
2. Place all relevant images within that folder, file names should be **The-File-Name** and saved as **.JPG** files.
3. Copy an **existing** program / plugin's data in **_data/downloads.yml**, paste it at the bottom of the file and make all relevant changes. Make sure to **not change the formatting** as YAML is very specific on its formatting and will not compile if incorrect.
4. Build **Jekyll**, if it works then create a PR, if not then fix the error.

Updating a program or plugin.

1. Open **_data/downloads.yml** and modify the program / plugin data as needed. Make sure to **not change the formatting** as YAML is very specific on its formatting and will not compile if incorrect. 
2. If you need to update images, make sure file names are named as **The-File-Name** and saved as **.JPG** files.
3. Build **Jekyll**, if it works then create a PR, if not then fix the error.

Please note, small **Jekyll related issues** will probably be overlooked and fixed by staff as we don't want Jekyll to be the holdup when submitting a program / plugin. Just try not to break everything. 
