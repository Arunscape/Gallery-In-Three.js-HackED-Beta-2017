# [Gallery in Three.js](https://arunscape.github.io/Gallery-In-Three.js-HackED-Beta-2017/)
###### A project written in Javascript at
#### HackED Beta 2017,
###### a 24-hour hackathon hosted by
#### University of Alberta Computer Engineering Club

#### Winner in category: "Best Web/Data Hack"

https://arunscape.github.io/Gallery-In-Three.js-HackED-Beta-2017/

---
#### Project contributors:
* [Arun Woosaree](https://github.com/Arunscape/)
* [Tamara Bojovic](https://github.com/bojotamara/)
* [Christian Lo](https://github.com/ChrisChrisLoLo)
* [Amir Shukayev](https://github.com/amirshukayev)
* [Pranavkumar Bodawala](https://github.com/PranavB6)  
---

## What it does:
Gallery in Three.js is a 3-D gallery app made in  [Three.js](https://threejs.org/), which is a 3-D Javascript library. The web application has three modes, in which GIFS are displayed on the walls in a hallway that you can walk through:

### [Snowboard Mode](https://arunscape.github.io/Gallery-In-Three.js-HackED-Beta-2017/snowboard.html)
The most basic of the three modes, has snowboarding GIFs.

![preview of Snowboard Mode](/images/snowboardmode.PNG)

### [Party Mode](https://arunscape.github.io/Gallery-In-Three.js-HackED-Beta-2017/party.html)
We don't know what social interaction would feel like, but this felt good enough.

Features:
- GIFs randomly loaded from gfycat's top 100 [trending GIFs](https://gfycat.com/gifs/tag/Trending)
- Lights that change colour
- Wobbly Camera

![preview of Party Mode](/images/partymode.PNG)

###### Note: Party Mode can be resource intensive (taxes bandwidth and CPU), so we also made a more [lightweight version](https://arunscape.github.io/Gallery-In-Three.js-HackED-Beta-2017/partySmall.html) which loads fewer GIFs,

### [Horror Mode](https://arunscape.github.io/Gallery-In-Three.js-HackED-Beta-2017/horror_mode.html)
Okay, maybe this isn't actually scary but it definitely looks cool.

Features:
- Flashing lights
- Random Teleportation

![preview of Horror Mode](/images/horrormode.PNG)

 ---
 ###### Note: All GIFs are loaded from [gfycat](https://gfycat.com/). Party mode uses gfycat's API to fetch 100 top trending GIFs as links in a JSON object, then randomly selects GIFs to display. This functionality could easily have also been implemented in Snowboard Mode and Horror Mode as well, but it was more of a proof of concept. We wanted to focus on improving the other modes once Party Mode was finalized, so the GIFs in Snowboard and Horror Mode are just direct links.

## Controls:
Use the arrow keys on your keyboard to move

 <img src="/images/arrowkeys.png" width="200">

Pressing the spacebar will toggle the camera automatically rotating slowly on all modes, except for the "full" Party Mode


## Our Backstory:

This was our first hackathon. We went in not knowing what to expect, or what to do. Initially, we thought that we would do something with our Arduinos, since all of us knew how to code in C++ for the Arduino from a common course that we were taking. Instead, we threw everything out the window and started from scratch, not knowing anything about Javascript. The first 5 hours or so were dedicated to doing some exercises on Codecademy! It was quite the learning experience, and we're all very happy to have participated.
