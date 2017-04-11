/**
 * Created by Slime on 11/04/2017.
 */

function Dialogue(imageSrc, data) {
    this.imageSrc = imageSrc;
    this.textData = data;
    this.currentCharacterPosition = 0;
    this.textIsScrolling = false;

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
    window.requestAnimationFrame(animate);
    this.textIsScrolling = true;
    this.playSpawnSound();
    this.talk();
    var self = this;
    function animate(){
        if(self.currentCharacterPosition < self.textData.length + 1) {
            console.log("is running");
            self.currentCharacterPosition++;
            window.requestAnimationFrame(animate);
        } else{
            console.log("finished");
            self.textIsScrolling = false;
            self.stopTalking();
            window.cancelAnimationFrame(animate);
        }
        self.displayCurrentDialogueState();
    }
}

Dialogue.prototype.displayCurrentDialogueState = function(){
    this.textBox.innerHTML = this.textData.substring(0, this.currentCharacterPosition - 1);
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

window.onload = function(){
    var msg = "Hello citizens of the world, we have a situation on our hands with Mr Trump.";
    var textScroller = new Dialogue("http://rs758.pbsrc.com/albums/xx221/B_Oceander/Obama/Talking_Head.gif~c200", msg);
    var element = textScroller.getElement();
    document.body.appendChild(element);
    textScroller.roll();
}

