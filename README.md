# My Cookbook - Recipe Tracker

This app is being built using React Native and Expo with the end goal being to deploy to both iOS and Android

The app's concept is to be able to store recipes you have created, follow along with the instructions with mobile first design in mind, and be able to easily share the recipes you have made with your friends and family.

This is a work in progress and some aspects are not representative of the final product

## Showcase 
### Original proof of concept
<img src="/recipe2_1.gif?raw=true" width="300px">

### Latest Iteration Screenshots
| Home Feed | Add a recipe |
| :-------: | :-------: |
| <img src="/Screenshot_20200314-134624.png?raw=true" width="300px"> | <img src="/Screenshot_20200314-134634.png?raw=true" width="300px"> |

| Details | Profile |
| :-------: | :-------: |
| <img src="/Screenshot_20200314-134703.png?raw=true" width="300px"> | <img src="/Screenshot_20200314-134954.png?raw=true" width="300px"> |


## Features of the app so far:

- [x] Home Screen
  - [x] Dynamic Recipe cards
    - [x] Username and icon
    - [x] Image
    - [x] Title, time, makes, and description
- [x] Animated Touch Feedback
- [x] Firebase Firestore backend 
  - [x] List of recipes pull from Firestore
  - [x] Uses seperate top level subcollections
  - [x] Automatic refresh using snapshot
  - [x] Ordered by newest posts first
  - [x] Placeholder rows during loading
  - [x] Placeholder Image if none exists
- [x] Detail screen
  - [x] Dynamic render of fields if relevant data exists
  - [x] Tapping on image opens fullscreen, scalable, paged view
  - [x] Shows saved state or gives ability to delete
- [x] Recipe creation
  - [x] Image picker w/ permissions 
  - [x] Photo saved in Firestore Storage
  - [x] Post saved in Firestore Database
  - [x] Recipes can be toggled public/private
  - [x] Adding ingredients and directions is animated
  - [x] Ability to delete added ingredients/directions
  - [x] Ability to reorder directions
- [x] Recipe deletion
  - [x] Deletion of post deletes associated image and data
- [x] User Authentication
  - [x] Login/Logout using Google Account (more to come)
  - [x] User persists app restarts
  - [x] Automatic Auth flow
  - [x] User can see all of their own recipes
  - [x] User page
- [x] Discover recipes created by other users
- [x] Save recipes created by other users
 
## Work In Progress / To-Do:

- [ ] Save recipe drafts
- [ ] Check off ingredients and steps
- [ ] Filter recipes by category, tag, etc
- [ ] Show Recently viewed
- [ ] Facebook login
- [ ] Email verification
- [ ] User Discovery
  - [ ] Find other users
  - [ ] Able to follow other users
- [ ] Ad integration
  
## Deploy:
 
- [ ] Deploy to Android
- [ ] Deploy to iOS
