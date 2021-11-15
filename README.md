### Graphics Term Project Team G - 장재혁, 심우석, 조병근, 이민서
# Red Light, Green Light!!

### Youtube - https://www.youtube.com/watch?v=leVCNvBxHCw
### Presentation - [Final_TeamG 장재혁, 심우석, 이민서, 조병근.pdf](https://github.com/dntjr41/Algorithm_TermP/files/7539471/Final_TeamG.pdf)
### Code - https://github.com/dntjr41/Graphics_termProject/tree/main/Graphics_termProject

***

1. Contents
2. Key Features
3. Technical details
4. Member Role

***
# 1. Contents

## Description
Before the tagger look back, the player can move to front or anywhere. But the player can’t move when the tagger looks the player. The player wins when the player reaches to the tagger.  The player also have to avoid obstacle from the tagger.

## Contents
* ![squid1](https://user-images.githubusercontent.com/67234937/141726164-ff90c49a-27bd-4cbe-8355-475155669435.gif)
* ![hurdle](https://user-images.githubusercontent.com/67234937/141726371-a17aa2ff-59ac-4f18-8431-e22fdcca2990.jpg)

* Home page
* Press the start button to move on to the next page.
![home](https://user-images.githubusercontent.com/67234937/141726476-01357aa2-309a-469b-9401-52c8b53082a8.PNG)

* Select the level of game
* You can choose the level of difficulty of the game. If you choose the difficulty level, you’ll move on to the next page.
![select](https://user-images.githubusercontent.com/67234937/141726571-f57dc559-c8d7-489a-ab97-15e1e01cd737.PNG)

* Normal Mode
* Freely moving obstacles(Small squid), Big stable obstacles(Big Squid), Spinning tagger(Girl)
![normal](https://user-images.githubusercontent.com/67234937/141726639-6b222af9-1dc9-40ad-9034-03c668ff99f1.PNG)

* Hard Mode
* More obstacles, faster obstacles, faster tagger rotation than normal
![hard](https://user-images.githubusercontent.com/67234937/141726652-bb55e176-c511-41d4-8e6e-1d8e8bcd92f0.PNG)

### You win when you reach the blue finish line
* ![전체 화면2](https://user-images.githubusercontent.com/67234937/141726768-763c5859-6309-4ab0-ab68-d347cf308c5e.PNG)
* ![전체 화면](https://user-images.githubusercontent.com/67234937/141726779-fda4a39b-4946-4073-91f0-002a2d7d41c1.PNG)
* ![이김](https://user-images.githubusercontent.com/67234937/141726818-fa9f88ac-6b0b-451a-a89d-978016f4fced.PNG)

### Game over
* When you're caught by the tagger
* ![술래에게](https://user-images.githubusercontent.com/67234937/141726970-72bb016a-65fa-4d6a-8395-6f6af81c0da9.PNG)
* Obstacle Collision
* ![장애물](https://user-images.githubusercontent.com/67234937/141726990-a5cada15-546d-4351-82f1-521213ddf642.PNG)
* Time over
* ![time out2](https://user-images.githubusercontent.com/67234937/141726997-cc3151f1-a946-41cb-8ea8-593c7ef10d7b.PNG)

***
# 2. Key Features
### Plentiful scenery
### Available see various angles
### More Extreme Red light, Green light
### Available adjust the level of difficulty
### 3D model Use
*  We use various model including GLTF model, FBX model and use it for background and game character
### Animation
* We use Animation in moving character, obstacles movement, tagger rotation
### Event Handler
* Movement through keyboard Collision with obstacles Movement when Tagger look back
### Rotate Camera Position
* Change the viewpoint of camera with the mouse
![풍경 gif](https://user-images.githubusercontent.com/67234937/141727529-1efb46d5-09a5-4384-9195-2f7ce5df5f26.gif)
![장애물 gif](https://user-images.githubusercontent.com/67234937/141727527-6d109ee0-6ed7-40e8-bf22-b4c0ae41207f.gif)

***
# 3. Technology details
### Skybox - Cube
![skybox](https://user-images.githubusercontent.com/67234937/141804654-a61bcdb7-fdc9-4110-9390-44ab7aa81166.PNG)

### Model - Background
![background](https://user-images.githubusercontent.com/67234937/141804679-8606f645-9bc6-4be9-9833-a8b8f334a6cf.PNG)

### Light source
![light source](https://user-images.githubusercontent.com/67234937/141804698-6d332bfe-2d24-4c43-bb1f-8205ea7354ed.PNG)

### Model
![model](https://user-images.githubusercontent.com/67234937/141804821-e500348b-5084-4a5c-8934-c1481fa09696.PNG)

### Animation Model
![animation model](https://user-images.githubusercontent.com/67234937/141804830-fb6214e4-75a4-4ba8-8a89-12d1ee852bde.PNG)

### Animation Model Mixer
![animation model mixer](https://user-images.githubusercontent.com/67234937/141804833-eca79fef-230b-4ead-99f4-62e2fe530b42.PNG)

### Keyboard
![keyboard](https://user-images.githubusercontent.com/67234937/141804868-ac9ff2dd-89ff-4661-aa6b-7c68b4599f27.PNG)
![keyboard2](https://user-images.githubusercontent.com/67234937/141804870-ddd368c7-a8c5-482b-9ab4-6b9042ff00e1.PNG)

### Timer
![timer](https://user-images.githubusercontent.com/67234937/141804930-af7b7654-850d-45c9-89db-6477b87ba4f7.PNG)

### Audio
![audio](https://user-images.githubusercontent.com/67234937/141804936-04072959-2238-4466-a620-5c7179bb61ba.PNG)
* Normal Mode - https://user-images.githubusercontent.com/67234937/141805760-50bd9fcf-7743-4572-9ac6-1fcad09298b3.mp4
* Hard Mode - https://user-images.githubusercontent.com/67234937/141805777-91769196-44a7-4295-99c4-b4cc973ae4d2.mp4

### 3D Text
![3d text](https://user-images.githubusercontent.com/67234937/141805844-899c2671-7274-4c12-9232-7e528c1b8a2d.PNG)
![3d text2](https://user-images.githubusercontent.com/67234937/141805847-579de6ce-0e96-43a4-8d7e-56f21e8c6a16.PNG)
![3d text3](https://user-images.githubusercontent.com/67234937/141805852-214e012f-1e5b-43f4-a1d3-f3042b93edb4.PNG)

### Obstacle - No move squid
![obstacle big](https://user-images.githubusercontent.com/67234937/141804983-4598e937-35a7-48a8-8b26-9d146e51e523.PNG)

### Obstacle - Move squid
![obstacle small](https://user-images.githubusercontent.com/67234937/141804976-e6f16fae-3849-4167-b475-bd0795c9b9ec.PNG)

***
# Demo Page
### If you want to listen to the sound effects in the game, <br>please click the link.
* Win <br>
https://user-images.githubusercontent.com/67234937/141728386-741fa6a6-d8f4-4e45-92af-b7021ff27f2a.mp4 <br>
![win gif](https://user-images.githubusercontent.com/67234937/141728824-021f70bb-4b77-41d4-b7ac-54f1c9c86bc5.gif)

* Caught by tagger <br>
https://user-images.githubusercontent.com/67234937/141728389-c487cab8-93d7-4e05-ad35-5145e6380591.mp4 <br>
![caught by tagger gif](https://user-images.githubusercontent.com/67234937/141728830-a979893a-3540-495e-9bf4-e254d85e256e.gif)

* Obstacle Collision <br>
https://user-images.githubusercontent.com/67234937/141728395-43120901-2306-4cb5-930d-9b30b65d7ef1.mp4 <br>
![obstacle collision gif](https://user-images.githubusercontent.com/67234937/141728827-f5924b7b-8c36-4a29-98bb-98675769f119.gif)

* Hard Mode <br>
https://user-images.githubusercontent.com/67234937/141728398-e56b8d30-eb1a-48b6-8594-39c1084307a6.mp4 <br>
![hard mode gif](https://user-images.githubusercontent.com/67234937/141728835-6c6e99f5-b782-4ec6-8a3d-0b6796d69016.gif)

***
# 4. Member Roles
* 장재혁 201533667 - jjwjjw215@gmail.com <br>
Camera Rotation, Event Handler(Keyboard), Animation model Insertion

* 심우석 201636417 - qkqh8639@gmail.com <br>
Skybox + landscape, Set light source, Sound effect, obstacle animation

* 이민서 201835486 - lmslmsms0616@gmail.com <br>
obstacle collision, Event Handler, Animation

* 조병근 201835228 - jbg0528@gmail.com <br>
Make movement restricted area, Event Handler, Animation
