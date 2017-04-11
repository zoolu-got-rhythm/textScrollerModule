/**
 * Created by Slime on 11/04/2017.
 */


/** TODO:
 *
 *
 * @param imageSrc
 * @param data
 * @constructor
 */



function Dialogue(imageSrc, data) {
    this.imageSrc = imageSrc;
    this.textData = data;
    this.currentCharacterPosition = 0;
    this.textIsScrolling = false;
    this.textCutOffPoint = 0;
    this.currentDialogueState = "";
    this.proceedDialogueIcon = "&#x21B5;"

    // create image element for talking face
    this.image = document.createElement("img");
    this.image.src = "";
    this.image.height=75;
    this.image.width=75;
    this.image.style.cssFloat = "left";
    // this.image.style.border = "3px solid black";

    // create text box
    this.textBox = document.createElement("div");
    this.textBox.style.paddingTop = "10px";
    this.textBox.style.width = "300px";
    this.textBox.style.height = "100px";
    this.image.style.cssFloat = "left";

    // container
    this.container = document.createElement("div");
    this.container.style.width = "200px";
    this.container.style.height = "70px";

    // append elements to container
    this.container.appendChild(this.image);
    this.container.appendChild(this.textBox);

    this.dialogueSound = document.createElement("audio");
    this.dialogueSound.src = "dialogue.wav";

    this.spawnSound = document.createElement("audio");
    this.spawnSound.src = "spawn.wav";




}

// roll{
// if (currentCharacterPosition == currentTextData.length) isScrolling = false;

// }
Dialogue.prototype.roll = function(){
    console.log(this.proceedDialogueIcon);
    window.requestAnimationFrame(animate);
    this.textIsScrolling = true;
    this.playSpawnSound();
    this.talk();
    var self = this;
    function animate(){
        if(self.currentCharacterPosition < self.textData.length + 1) {
            // console.log("is running");
            // start cutting the text down after 60 characters
            if(self.currentDialogueState.length == 80) {
                self.chopOffXAmountOfCharactersFromDialogueText(30);
            }
            self.currentCharacterPosition++;
            self.currentDialogueState += self.getCurrentCharacterPosition();
            // console.log(self.currentDialogueState);
            window.requestAnimationFrame(animate);
        } else{
            console.log("finished");
            self.textIsScrolling = false;
            // self.textCutOffPoint = 0;
            self.currentDialogueState += self.proceedDialogueIcon;
            self.stopTalking();
            window.cancelAnimationFrame(animate);
        }
        self.displayCurrentDialogueState();
    }
}

Dialogue.prototype.displayCurrentDialogueState = function() {
    this.textBox.innerHTML = this.currentDialogueState;
}

Dialogue.prototype.getCurrentCharacterPosition = function(){
    return this.textData.substring(this.currentCharacterPosition, this.currentCharacterPosition - 1);
}

Dialogue.prototype.chopOffXAmountOfCharactersFromDialogueText = function(n){
    this.currentDialogueState = this.currentDialogueState.substring(n, this.currentDialogueState.length);
}



Dialogue.prototype.talk = function(){
    this.playTalkSound();
    this.image.src = this.imageSrc;
}


Dialogue.prototype.stopTalking = function(){
    this.stopTalkSound();
    this.image.src = "";
}


Dialogue.prototype.playTalkSound = function(){
    this.dialogueSound.play();
}

Dialogue.prototype.stopTalkSound = function(){
    this.dialogueSound.pause();
    this.dialogueSound.currentTime = 0;
}

Dialogue.prototype.playSpawnSound = function(){
    this.spawnSound.play();
}

Dialogue.prototype.getElement = function(){
    return this.container;
}

// app
window.onload = function(){
    var msg = "Hello citizens of the world, we have a situation on our hands with Mr Trump. test data, more and more and moarrrrrrrrrsaddsr sdfdsaffsd dsfsaf fsdfsadf sdfsdaf dsafsadfsdafads sadf";
    var textScroller = new Dialogue("http://rs758.pbsrc.com/albums/xx221/B_Oceander/Obama/Talking_Head.gif~c200", msg);
    var element = textScroller.getElement();
    document.body.appendChild(element);
    textScroller.roll();
}

