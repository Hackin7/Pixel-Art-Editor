rows=8
columns=8

import json

#rgbString = input()
#data = json.load(input())

###Convert to LED Matrix Data###############################
def toRGBValues(rgbString):
    data = rgbString[4:-1].split(",")
    for i,colorStr in enumerate(data):
        data[i] = int(colorStr)
    return data
#print(toRGBValues(rgbString))

def toBlackWhite(rgbString):
    data = toRGBValues(rgbString)
    if data != (0,0,0): return 1
    else:return 0

def toMatrixList(webDataText):
    data = webDataText#json.loads(webDataText)
    matrixList = [(0,0,0) for i in range(rows*columns)]
    for i,rgbString in enumerate(data['matrix']):
        matrixList[i] = toRGBValues(rgbString)
    return matrixList

def toAnimation(webDataText):
    data = json.loads(webDataText)
    for i,frame in enumerate(data['frames']):
        data['frames'][i] = toMatrixList(frame)
    return data
    
###Convert to Web Data########################################
def toRGBString(rgbValues):
    return 'rgb'+str(tuple(rgbValues))

def toWebFrameData(matrixList):
    data = {}
    data['rows'] = rows
    data['columns'] = columns
    data['matrix'] = ['rgb(0,0,0)' for i in range(leds)]
    for i,rgbValues in enumerate(matrixList):
        data['matrix'] [i] = toRGBString(RGBValues)
    return json.dump(data)

def toWebAnimationData(animationData):
    for i,frame in enumerate(animationData['frames']):
        animationData['frames'][i] = json.load(toWebFrameData(frame))
    return json.dump(animationData)

#print(toRGBString(toRGBValues(rgbString)))
