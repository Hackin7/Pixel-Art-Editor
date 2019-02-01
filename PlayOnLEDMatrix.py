import time
import board
import neopixel
size=64
pixels = neopixel.NeoPixel(board.D18, size)

textIMG = {}

def toShowFrame(matrixList):
    for i in range(size):
        pixels[i] = tuple(matrixList[i])

import time
def toShowAnimation(animation):
    for frame in animation['frames']:
        toShowFrame(frame)
        #toShowFrame(frame)
        #toShowFrame(frame)
        time.sleep(int(int(animation['timing'])/1000)) #in ms
    
