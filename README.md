# PixelArt
Edit 8x8 Pixel Arts, Save to the Server, and show on  LED Matrix

Made for this [Instructable](https://www.instructables.com/id/LED-Matrix-2/)

## Requirements
* Flask
* [Adafruit NeoPixel Library](https://learn.adafruit.com/neopixels-on-raspberry-pi/python-usage) 
    *Only needed if using it to wirelessly control WS2812 LEDs on a Raspberry Pi or such
    * Just Run `pip3 install RPI.GPIO `, ` pip3 install adafruit-blinka`  and `sudo pip3 install rpi_ws281x adafruit-circuitpython-neopixel`
    
## Running
Just run in the directory as such:
``` sudo python3 WebServer.py```

This can be run on a normal computer

However, to Enable the WS2812 LED Matrix when running on a Raspberry Pi, Change these lines in WebServer.py
```
#player = __import__('PlayOnLEDMatrix')#Only for LED Matrix
player = __import__('DummyPlayer')#If no LED Matrix
```
to these
```
player = __import__('PlayOnLEDMatrix')#Only for LED Matrix
#player = __import__('DummyPlayer')#If no LED Matrix
```
Make sure to connect the data pin of the WS2812 LEDs to **pin 18** of the Raspberry Pi , and connect the LEDs to external power. 
 The LEDs should be chained together such that  the end of 1 row of LEDs is connected to the start of the next row of LEDs and so on.
More details of how exactly to construct such an LED Matrix in the Instructable above.

## Some suggestions
To make it run on bootup of the Raspberry Pi, you could add the run command to /etc/rc.local, right before  the line`exit 0`

## Webpage
Take note that generally on an item you:
1. Click to open
2. Double Click to Remove
3. Right Click to overwrite

When dealing with colors, animation frames, and saved pixel arts and animations on the server

About the savedata, you can just copy the entire text in the text box for the pixel arts and animations and save it in a text document. (To save it locally)
To load the data, just copy and paste the savedata text in the appropriate input field and click on load.
##Also available on Codepen.io!
But cannot store and save Pixel Arts and Animations to the server https://codepen.io/Hackin7/pen/xMbrzp

## Hacks
To keep running the animation currently loaded, run this code in the javascript console
```
var time = 10*1000; //In milliseconds
var intervalID = setInterval(function(){var data = JSON.stringify(showAnimationData());
    POSTrequest("/API/show/animation","data="+JSON.stringify(data));}, time);
```
To stop the interval, run `clearInterval(intervalID);`
