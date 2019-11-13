# My Cookbook - Recipe Tracker

This app is being built using React Native and Expo with the end goal being to deploy to both iOS and Android

The app's concept is to be able to store recipes you have created, follow along with the instructions with mobile first design in mind, and be able to easily share the recipes you have made with your friends and family.

This is a work in progress and some aspects are not representative of the final product

## GIF Showcase 
### (Original proof of concept - gif showing new features coming soon)
<img src="/recipe2_1.gif?raw=true" width="300px">

## Features of the app so far:

- [x] Home Screen
  - [x] Video loop background
  - [x] Search bar
  - [x] Main suggested recipe
  - [x] Horizontal scroll recipe cards
  - [x] Horizontal/Vertical swipe to new pages
  - [x] Swipe snaps to pages
- [x] Animated Touch Feedback
- [x] Firebase Firestore backend 
- [x] List of recipes pull from Firestore
  - [x] Automatic refresh using snapshot
  - [x] Ordered by newest posts first
  - [x] Placeholder rows during loading
  - [x] Placeholder Image if none exists
- [x] Detail screen
  - [x] Dynamic render of fields if relevant data exists
  - [x] Tapping on image opens fullscreen, scalable, paged view
- [x] Recipe creation
  - [x] Image picker w/ permissions 
  - [x] Photo saved in Firestore Storage
  - [x] Post saved in Firestore Database
- [x] Recipe deletion
  - [x] Deletion of post deletes associated image
  
## Work In Progress / To-Do:

- [ ] Recipe variations
- [ ] Ability to edit a recipe once posted
- [ ] Check off ingredients and steps
- [ ] User Authentication
  - [ ] user id linked with recipe
  - [ ] user can only see their own recipes
  - [ ] user page
  - [ ] find other users
- [ ] Liking a recipe
- [ ] Filters
- [ ] Seperate recipe categories (ie. My Recipes, Liked, Suggested)
- [ ] Ad integration
  
## Deploy:
 
- [ ] Deploy to Android
- [ ] Deploy to iOS
