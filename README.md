# Infomentum Test

![Infomentum](https://www.infomentum.com/hs-fs/hubfs/CLEAN-images/logos/Infomentum_logo_with_strapline_white.png)

Coded by Robert Koteles, Senior Frontend Developer, 2020

## Remarks
1. I have decided to write this code with using Handlebars. To be honest using handlebars template for all panels could be the easiest way to make this task done but decided to store panel data in JSON files and loaded into JavaScript variable by Gulp when building the project. From that point data is handled by Vanilla JavaScript that shows my skills. Yeah, this way needed more effort but at least you can see how I work with JavaScript.
2. As iPhone 5 has 320px wide screen that’s the minimum I have ever seen the solution is full responsive until that breakpoint, not below.
3. For emoticons a background pattern is used (saved out from design) but that pattern is not exact. Icons are misaligned by few pixels left/right/top/bottom and width and height of icons are also not consistent. It occurs little lines appearing next to the icons on the page (sad, neutral, happy).
4. Design said (almost) nothing about mobile view so jsut used my fantasy and created a mobile look for the elements. Having a nice User Experience was kept in my mind while created mobile view.
5. Solution is "mobile first".
6. Assets of the final slides (output) are not vectors in design, the are saved out as JPG. It defines the quality so will be so much pixelised when browsing the page on large screens.

## Design

Link:

```
https://www.figma.com/file/PYPKPwgbir0GxxxKfPDz7tke/Infomentum---Test?node-id=0%3A1
```

## GIT Hub

Link:
[https://github.com/kotelesroberto/infomentum_test](https://github.com/kotelesroberto/infomentum_test)
```
https://github.com/kotelesroberto/infomentum_test.git
```

## Assets

In the **assets** folder of the project.

## Working with the code

Open the folder in Terminal and type: "gulp build". It generates the final BUILD folder including the files for local development.

```
gulp build
```

(Running gulp is essential as includes BABEL)