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
7. About error messages: I tried to create a super easy Ux for the visitor that has not too much confusig messages. For this reason a "NEXT" button is disabled until an answer is selected, not needed to use any error message here. In popup when user subscribes/unsubscribes the error message is the background colour of the input field. If unsubscription/subscription is success a little green mark is appearing on the panel.
8. As footer of panel goes fixed on mobile it covers the area behind. For this reason a script sets the 'padding bottom' property of body when on mobile. Value of this padding is equal to height of fixed footer, it makes all content on the page visible.
9. Performance: for better performance replacing DOM elements are minimal. Instead of fully redrawing the question panel the script changes simple classes and content of items that makes the application faster and less performance consuming.

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