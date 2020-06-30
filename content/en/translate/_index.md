+++
title = "Shoko Website Translation"
lastMod = 2019-05-13
layout = "single-page"
+++

First off, we want to say thank you for taking the time to translate the Shoko Website! Our goal is to reach as many users as possible and by translating the website, you're helping us make that happen. 

We've made this quick guide to hopefully make the process easier, please let us know if there are any issues or if you have any ideas on improving it. 

##### Getting Started

We suggest forking the Shoko Website repo as this will make it much easier to submit your changes and even make updates when needed. After doing that you'll need to modify the **config.toml** file and add your language, below is an example of adding **German** as a selectable language. 

```toml
	[languages.de]
		contentDir = "content/de"
		title = "Shoko"
		languageName = "German"
		weight = 2
```

<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Parameter</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>languages.xx</td>
      <td>Replace <strong>xx</strong> with your language's <strong>language code</strong>.</td>
    </tr>
    <tr>
      <td>contentDir</td>
      <td>The physical location of the files.</td>
    </tr>
    <tr>
      <td>title</td>
      <td>The website titles, leave as <strong>Shoko</strong>.</td>
    </tr>
    <tr>
      <td>languageName</td>
      <td>The name of the language shown in the drop-down.</td>
    </tr>
    <tr>
      <td>weight</td>
      <td>Determines the languages place in the language drop-down.</td>
    </tr>
  </tbody>
</table>

Once done there are three areas where the translatable files are kept.

##### Content Folder

Create a new folder in the **content** folder and name it same as the **language code** you used in the **config.toml** file. Copy the files you want to translate from the **en** folder into your newly created folder. Make sure to preserve spelling and directory structure. You do not have to copy every single file, we've set Hugo up so if a translated version of the file is not available, it will default to the **English** version. You do however have to make sure all **sub-folders** exists as well as all **_index.md** files, so the site will render the page. 

##### Data Folder

Create a new folder in the **data** folder and name it same as the **language code** you used in the **config.toml** file. When working with .JSON files, be aware spacing is critical and improper spacing can break the file. Like the content section, you do not have to translate each .JSON file as it will default to the **English** version if there isn't a translated file.

##### il8n Folder

Create a new file in the **il8n** folder and name it same as the **language code** you used in the **config.toml** file then copy the contents of **en.toml** into it. 

```toml
[support]
other = "Support"
```
In the above example, **[support]** is the key and should be left as-is. The only part you will translate is the part in quotation marks which, using the example above would be **"Support"**. If you make any changes to the key, anywhere that key is used will be blank. 

##### Working With Content Blocks

Certain files will have it's contents broken into what we call **Contnet Blocks** which are used to separate out the content on the page. These 

```md
||ContentBlock||

Shoko is an anime cataloging program designed to automate the entire process of cataloging your anime collection regardless of the size and number of files in your collection. With Shoko, you'll spend more time watching and building your collection instead of organizing it.
```

It's important to note that these sections **cannot be moved or rearranged** without breaking the page's layout as these locations are hardcoded. 