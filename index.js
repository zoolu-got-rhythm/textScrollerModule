/**
 * Created by Slime on 11/04/2017.
 */
// app
window.onload = function(){
    var msg = "Hello citizens of the world, we have a situation on our hands with Mr Trump. test data, more and more and moarrrrrrrrrsaddsr sdfdsaffsd dsfsaf fsdfsadf sdfsdaf dsafsadfsdafads sadf";
    var textScroller = new Dialogue("http://rs758.pbsrc.com/albums/xx221/B_Oceander/Obama/Talking_Head.gif~c200", msg);
    var element = textScroller.getElement();
    document.body.appendChild(element);
    textScroller.roll();
}
