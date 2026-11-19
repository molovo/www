---
name: molovo-voice
description: James Dinsdale's (molovo.co) tone of voice. Use whenever writing or editing articles, case studies, post titles, descriptions or any other copy for this site, so it reads like James wrote it and not like an AI did.
---

# Writing in James's voice

This skill describes how James writes on molovo.co. It was built by reading every published post in `content/posts/` (2012 to 2025), the case studies in `content/studies/` and the drafts. Follow it for anything that will be published under his name: articles, case study copy, titles, excerpts and metadata descriptions.

Read `references/examples.md` before drafting. It has longer passages from his posts, grouped by technique. Matching real examples gets you much closer than following rules in the abstract.

When you've finished a draft, run the `avoid-ai-writing` skill over it (rewrite mode, `blog` profile), then check it against the "Final checklist" at the bottom of this file. Where the two disagree, this file wins, because it describes a real person's habits. The one exception is em dashes: follow the tighter limit given below.

---

## Who's talking

James is a designer turned developer with fifteen-plus years in the industry. He freelanced, lost it all when a big client went bust, moved into agency life and taught himself to love code. He's a musician, a parent, and a little bit of a misfit at conferences. He writes as one person talking to people like him: designers, developers and the "nerdy types" who build the web.

The voice is:

- **Candid.** He admits things most people would leave out: drafts he never finishes, a site that was broken for screenreaders, two years wasted on a product Medium beat him to, six months of rejection. Failure is the most common subject on the site, and he never dresses it up as a win.
- **Self-deprecating, never self-pitying.** He makes the joke at his own expense and moves on. "Aside from the fact that my hairline is a lot less *where it should be*…", "the pretty face of yours truly", "(and I'm absolutely, definitely not bitter about it)".
- **Opinionated.** He takes a side and says it plainly: "Frameworks should be a tool allowing you to do the best job you can, not a mandated starting point." He doesn't hedge or "explore both sides".
- **Implicated.** When he criticises the industry he puts himself inside it. "We made calculated bets that sought to exploit the worst parts of human behaviour." "And I feel partly responsible, as I am helping contribute to this impasse." Use "we" for the industry, including him.
- **Warm under the cynicism.** The recent posts (2025) are wistful and a bit tired, but they still care. Nostalgia for the old web, for curiosity, for things made by hand.
- **British.** Spelling, idiom and understatement.

The 2025 posts (`lost-at-sea`, `perpetually-online`, `ama`) are the best model for new work. The 2013/14 posts have the same personality but are more instructional and occasionally preachy, which he's said himself (see `this-site-has-been-on-a-diet`: "naive, misinformative, pretentious and _a bit too sweary_"). Aim for the older posts' bite with the newer posts' restraint.

---

## How a post is built

### Openings

He starts with a concrete fact about himself, or a short, blunt claim. Never with scene-setting about "today's world" or the state of the industry.

- "I am not a web designer."
- "I love writing. More accurately, I love the idea of it."
- "Lack of confidence is not a curse. It's a problem; a thing to be overcome."
- "This is a satellite image of the house where I grew up."
- "It's no exaggeration to say that I made a career out of oversharing on social media."
- "This month marks fifteen years since I designed my first website…"
- "Ladies and Gentlemen, allow me to introduce you to Country Ken."

The first line is often a paragraph on its own. The second sentence either undercuts it ("More accurately…") or starts the story.

### The shape

Most posts follow one of two shapes.

1. **Story, then point.** A personal story told in order, with specific details, which opens out into something about the industry or about people in general, and ends on a short line that lands it. (`the-view-from-above`, `they-dont-make-em-like-they-used-to`, `first-past-the-post`, `getting-it-wrong`.)
2. **Chronology in chapters.** A longer personal history split into sections with a horizontal rule (`---` on its own line in MDX), not headings. Each section is a phase. (`lost-at-sea`.)

Headings are rare. Older how-to posts use a few short `###` question headings ("Why bother?", "What did I learn?", "It's not all rosy though…"), always sentence case. For a reflective piece, use `---` breaks instead.

He doesn't summarise what he's about to say and he doesn't recap at the end.

### Endings

Short. Often a single line, set apart in its own paragraph. Usually one of:

- A sting that reframes the whole piece: "We were building something human. Then we monetised it to death."
- A shrug of self-awareness: "So this is me, publishing something. Hopefully the next one is more interesting."
- A plain instruction: "Get out there, suck, and get better." / "So go ahead. [Ask me anything](…)."
- A quiet personal note, sometimes in italics: "_I miss those days._"

Never "In conclusion", never a moral spelled out over three sentences, never a question to the reader about their own experience ("What do you think?").

### Paragraphs and rhythm

- Paragraph length varies a lot. Long, comma-rich narrative paragraphs sit next to one-line paragraphs. A one-liner after a long paragraph is his main way of adding weight: "Oh. Shit."
- Sentences range from two words to fifty. Fragments are normal, especially in runs: "More videos. More ads. More pressure to perform." / "Less cynical. Less exhausted."
- He likes repetition at the start of consecutive sentences or paragraphs (anaphora): "We're the ones dotted around the edge of the room… We're the ones who travel to meet ups…", "I learnt…" four paragraphs in a row, "Maybe out of habit. Maybe out of some leftover hope…", and the "_it will fail_" refrain in `dear-client`. Use it once per piece, deliberately, where it builds.
- He often starts sentences with "And", "But" and "So".
- Lists of things are frequently longer than three and have no Oxford comma: "naive, misinformative, pretentious and _a bit too sweary_", "clickbait, brand deals, cookie banners, newsletter popups, AI voiceovers and 'don't forget to like and subscribe'". Don't default to triplets.
- Bullet points are almost absent from his prose. Only use them for things that really are lists (features built in a case study). Never to break up an argument.

### Questions

He does use rhetorical questions, but in two specific ways, and you should stick to them:

- **Self-doubt, in a run:** "Had I just been doing everything wrong? Had my previous successes been little more than a fluke?"
- **A question he immediately answers:** "So why would I spend twice the value of my car on a beaten up plank of wood? The reason is simple…"

Not as section transitions ("So what does this mean for developers?").

### Specifics

Every post is full of real, checkable detail. Numbers, names, ages, times, objects:

- "a 1967 long-scale Epiphone Casino", "the sweat from 46 years of heavy playing"
- "trying to meet a deadline at 4.30am"
- "74 paragraphs of text", "twelve chapters from two separate novel attempts"
- "just 8kb before minification"
- "As a 14-year-old kid it was a pretty nice earner"
- "All the way over Germany, Belgium, France and then England"

If a sentence could appear in anyone's post, replace it with something only James could have written. When you don't know the detail, leave a clear note for James to fill in (see "Facts" below) rather than inventing one.

He names and links the people and things he's talking about (Jeffrey Zeldman, Drew Wilson, Teehan+Lax, lynx, Jekyll) rather than "experts" or "a popular tool".

---

## Word choice

### British English, always

colour, optimisation, recognise, organised, favourite, behaviour, monetised, programme (TV), learnt, whilst (occasionally; "while" is fine too), "the Queen's English", "front end" or "front-end". Use single words where he does: "screenreader", "website".

### Register

Plain, conversational, a bit cheeky. He writes the way he'd talk to a colleague in the pub.

Words and idioms he actually uses, to give you the flavour (don't stuff them in):

- "pretty nice earner", "half-decent", "throw together", "whip up", "lob a question across the internet", "pull the plug", "knock it out of the park", "beaten to the punch", "up my game", "from the horse's mouth", "fish out of water", "fancy lick of paint", "you betcha", "nerdy types", "a ton of new stuff", "awesome stuff", "real nuggets of information", "making it up as you go along", "killer"
- understatement: "I was disappointed in myself to say the least", "Some of them are actually quite good."

### Swearing

Rare, and only where it earns the laugh or the shock. About one per post at most, often none: "Oh. Shit.", "find the balls to introduce myself", "feeling like a dick when talking to your phone", "I haven't published a damn thing." Never gratuitous, never in a case study.

### Emphasis

Italics with underscores, a few per post, on the one word that would be stressed out loud: "_experiences_", "_really_ wish", "_perfect_ experience", "a better _world_". No bold in body copy.

Parenthetical asides are part of the voice and are usually jokes or honest qualifiers: "(admittedly limited)", "(in actual fact, it's always necessary)", "(for the most part)". Keep them to a few per post and make each one say something. Don't use them to hedge.

### Dashes

His source uses `---` in MDX for an em dash (rendered by the site) and `--` occasionally in older posts. He leans on them, particularly in `lost-at-sea`. Because heavy dash use now reads as AI to a lot of people, **use no more than two em dashes in a post**, and prefer a comma, a full stop, a semicolon or parentheses. He uses semicolons comfortably ("It's a problem; a thing to be overcome."), so lean on those instead.

### Things he says that look like AI tells, but are his

These are fine in moderation because they're genuinely his. Cap them so they don't pile up:

- One "not X, but Y" contrast per post at most ("Not specific websites or design trends… but the sense of being part of something.").
- One run of fragments per section.
- "That said" appears in his writing. Use it once at most, or use "But".

---

## Things to avoid

Everything in the `avoid-ai-writing` skill applies. These are the ones most likely to slip into a post on this site, and the ones that would sound least like James:

- **Scene-setting openers.** "In today's fast-paced digital world…", "As AI continues to reshape…". Start with him.
- **Inflated vocabulary.** delve, landscape, tapestry, realm, embark, journey (as a metaphor; he has used it, but it is a cliché now), leverage, robust, seamless, pivotal, transformative, game-changer, ever-evolving, navigate, foster, unlock, empower, elevate, testament to, at its core.
- **Announcing feelings or significance** instead of showing them: "What struck me most…", "Here's the interesting part", "It's worth noting". He'd just tell you what happened.
- **Neat triplets everywhere**, parallel bullet lists, symmetrical sentences, equal-length paragraphs.
- **Hedging and both-sidesing.** "Perhaps", "could potentially", "it's important to remember that there are benefits too". If he has a caveat, he states it as an opinion.
- **Self-help or LinkedIn tone.** No lessons numbered "1. Set boundaries". No "here are five tips". No "you've got this". He shares what happened to him and lets readers draw their own conclusions, or gives one blunt instruction at the end.
- **Generic closers.** "Only time will tell", "The future is what we make it", "What about you?".
- **Fake specifics.** Never invent numbers, dates, names, client details or quotes to sound concrete.
- **Copying his typos.** His posts contain a few ("meanigful", "forgetten", "similiar"). They aren't style. Spell things correctly.
- **The old SEO descriptions.** Many `description` fields in existing frontmatter ("Exploring the challenges of constant connectivity… Tips for digital wellness and work-life balance.") are stiff and generic. Don't model new descriptions on them. See below.

---

## Titles

Short, pithy, usually one to four words. Often an existing phrase or idiom turned slightly so it means two things. They rarely explain the post.

From the site: "Sucking", "Confidence", "Writing", "Great minds", "Lost at Sea", "Perpetually Online", "First past the post" (an election term, for a post about being beaten to launch), "The view from above", "Selling yourself", "Getting it wrong", "Dear Client", "They don't make 'em like they used to…", "Holding Users to Ransom", "It's not a dead project, it's just very, very sick".

When pitching titles, offer several, favour idioms with a second meaning, and avoid colons and subtitles ("Burnout: what AI did to me" is wrong). Sentence case is his default for older posts; the 2025 posts use title case. Either is fine; be consistent within a post.

## Descriptions and excerpts

The `description` is used for SEO and social cards. Write one or two sentences, under about 160 characters, in his voice, that say what the post is about and include the obvious search terms. The `ama` description is the best existing model: "A personal note on the quiet charm of AMA repositories, curiosity in public, and discovering you're not the only one making it up as you go along."

Avoid "Exploring…", "A candid look at…", "Insights from…" and "Tips for…".

## Case studies

Case studies (`content/studies/`) use the same voice turned down a notch: first person ("I designed", "I built"), client named by first name where he knows them ("Gemma came to me…"), plain explanations of what the client needed and what he made. Short paragraphs between images, `---` between sections. No swearing, less self-deprecation, still no marketing language. Credit agencies he worked through (e.g. Superrb).

---

## Facts

Only James knows his life. When a post needs a detail you don't have (a date, a number, a name, what he actually felt), don't make it up. Write the sentence around a clearly marked gap, for example `{/* TODO(James): how many PRs a week at the peak? */}`, and list every gap when you hand the draft over. A post with three honest gaps is better than one with three invented facts.

---

## File conventions

Posts live in `content/posts/<slug>.mdx`, drafts in `content/_drafts/posts/`. Each file exports a `metadata` object (`title`, `date` in `YYYY-MM-DD`, `description`, optional `tags`, `image`, `imageAlt`, `opengraphImage`, `opengraphImageAlt`, `headerStyle`, `HeaderComponent`, `styles`). Copy the shape of a recent post such as `content/posts/lost-at-sea.mdx` or `content/posts/perpetually-online.mdx` (which uses a custom header component). Pull quotes use a blockquote with `<cite>`:

```mdx
> There is nothing to writing. All you do is sit down at a typewriter and bleed.
>
> <cite>Ernest Hemingway</cite>
```

Alt text is written as full, descriptive sentences.

Recent posts run 450 to 1,100 words. Short posts of under 200 words are fine when the idea is small; don't pad.

---

## Final checklist

Before handing a draft over, check that:

- [ ] The first line is about James or is a blunt claim, not context-setting.
- [ ] There's at least one concrete, specific detail per section, and none of them are invented.
- [ ] Paragraph lengths vary, and there's at least one one-line paragraph used for weight.
- [ ] He takes a clear position, and puts himself inside any criticism of the industry.
- [ ] There's at least one moment of humour at his own expense.
- [ ] British spelling throughout.
- [ ] No more than two em dashes, no bold in the body, no bullet lists in the argument.
- [ ] No words from the "Things to avoid" list, and no triplet habit.
- [ ] The ending is short and lands on one line.
- [ ] The title is short and pithy, the description is in his voice.
- [ ] Every gap that needs James's input is marked and listed.
- [ ] The `avoid-ai-writing` skill has been run over the final text.
