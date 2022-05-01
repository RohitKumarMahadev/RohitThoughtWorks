---
title: "iOS Home Screen: With Scriptable and Widgetsmith"
date: "2020-09-28"
---

with iOS14, Apple has given users the ability to add custom widgets, rearrange favorite apps on Home Screen pages. Like every other Apple user, I am very much excited to have control over customization of app layout which has never been Apple's thing.

So I spent some time toying around with couple of native app widgets and eventually get bored with static content being displayed in different sizes which makes me to look out for [Widgetsmith](https://apps.apple.com/us/app/widgetsmith/id1523682319).It comes with customizable widgets that can **dynamically scheduled** to appear on your home screen by the rules you define. For example weather in the morning, calendar during your day, activity ring as you wrap up your day.

Widgetsmith is nice, but it has only handful of widgets available out of box. I pondered to customize even further with my preferred content like a random idea or greetings to show up on the screen every time you pick up the phone. How cool is that?! This needs a provision to display dynamic content on a customizable widget. [Scriptable](https://scriptable.app/) is exactly what is required to make this possible.

With few lines of Javascript(JS) in Scriptable(You can copy+paste code in the phone right away) along with clock widget using Widgetsmith, I managed to set up my homescreen like this.

![Rohit's Home Screen](/images/HomeScreen.jpeg "Powered up with Scriptable and Widgetsmith")
