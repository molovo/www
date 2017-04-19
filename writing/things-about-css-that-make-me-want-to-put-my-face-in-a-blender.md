---
title: "Things about CSS that make me want to put my face in a blender"
date: 2013-10-16 13:49:47
---

#### Padding

When you enter a margin value such as:

```css
margin: 12% 24%;
```

the vertical value is taken as a percentage of the height of the parent and the horizontal value is taken as a percentage of the  width of the parent. This makes sense.

If I enter the same values as padding:

```css
padding: 12% 24%;
```

the vertical value is taken from the width of the element (horizontal), and the horizontal value is taken from the height of the element (vertical). **This is stupid**.

The only time this has *ever* been of any use to me whatsoever in four years of writing CSS has been when forcing the aspect ratio of an element like so:

```css
height: 0;
padding: 0 0 50%;  /* Forces a 2:1 aspect ratio. */
```

You know what would be far more useful? Make the horizontal and vertical the right way around, and give us an aspect ratio property. Not only would this make aspect ratios an *actualproperthing&trade;* rather than a hack, it also allow us to **finally** vertically center things properly.

```css
/* 25% of the element's height will be
    whitespace above and below its children,
    making them vertically centered (Hurrah!) */
padding: 25% 0;

/* The elements width will be double that
    of its height, which is determined by
    the flow of content. */
height: auto;
width: auto;
aspect-ratio: 1 2;
```

---

#### Exes and Whys?

```css
margin: Y X;
padding: Y X;
border: Y X;
outline: Y X;
background-position: X Y;
transform: translate(X, Y);
transform: scale(X, Y);
```

Why, dear God, Why???

---

#### Fixed positioned elements

I set some elements at a certain size.

```css
.parent {
  width: 50%;
}
    .parent .child {
      width: 30%;
    }
```

`.child` is 30% of the width of it's parent. Nice and easy. Then I add `position: fixed;` to the child.

```css
.parent {
  width: 50%;
}
    .parent .child {
      width: 30%;
      position: fixed;
    }
```

Boom! `.child` has now doubled in width. That makes sense doesn't it? **No.**

---

#### Borders

I only ever use solid borders, because anything else is harder to see than a true word in the Daily Mail.

I want to write

```css
border: blue;
```

and have it give me a 1px wide, solid blue border.

```css
border: 5px blue;
```

gives me a 5px, solid blue border. Easy peasy.

---

#### Posititioning

```css
background-position: top center;
```

is a nice easy way to position a background. At the moment, to absolutely position an element in this way, I have to do this:

```css
width: 300px;
position: absolute;
top: 0;
left: 50%;
margin-left: -150px;
```

If the width is dynamic, the above is impossible without a javascript hack. This would be better:

```css
position: top center;  /* Boom! */
```

---

I've been Ranty Donaldson and this is the 9 o'clock news. Have a spiffing day.
