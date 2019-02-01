from flask import Flask, render_template, request
app = Flask(__name__)

converter = __import__('ConvertWebData')
player = __import__('PlayOnLEDMatrix')#Only for LED Matrix

import json, os
animationsfile = 'UserData/animations.json'
pixelartfile = 'UserData/pixelarts.json'
class Database:
    def __init__(self):
        if os.path.isfile(animationsfile):
            with open(animationsfile,"r") as f:
                self.animations = json.load(f)
        else: self.animations={}
        
        if os.path.isfile(pixelartfile):
            with open(pixelartfile,"r") as f:
                self.pixelarts = json.load(f)
        else:self.pixelarts = {}
        
    def write(self):
        with open(animationsfile,"w") as f:
            json.dump(self.animations,f)
        with open(pixelartfile,"w") as f:
            json.dump(self.pixelarts,f)
        
        
        
        
database = Database()
#print(database.pixelarts,database.animations)

@app.route('/')
def index():
    return render_template('main.html',
    showText=render_template('showtext.html'),
    pixelart=render_template('pixelart.html'),
    pixelartdatabase=render_template('pixelartdatabase.html'))

@app.route('/showtext') 
def t():
    return render_template('showtext.html')

@app.route('/pixelart') 
def pixelart():
    return render_template('pixelart.html')

###Show on LED Matrix#################################
@app.route('/API/show/text',methods=['POST']) 
def showText():
    if request.method=='POST':
        data = str(request.form['data'])
        print(data)#Insert LED Matrix Code Here
        return "TextShown"
        
@app.route('/API/show/pixelart',methods=['POST']) 
def showPixelArt():
    if request.method=='POST':
        data = json.loads(str(request.form['data']))
        print(data)#Insert LED Matrix Code Here
        print(converter.toMatrixList(data))
        player.toShowFrame(converter.toMatrixList(data))#Only for LED Matrix
        return "Pixel Art Shown"

@app.route('/API/show/animation',methods=['POST']) 
def showAnimations():
    if request.method=='POST':
        data = json.loads(str(request.form['data']))
        print(data)#Insert LED Matrix Code Here
        print(converter.toAnimation(data))
        player.toShowAnimation(converter.toAnimation(data))#Only for LED Matrix
        return "Animation Shown"

###Get List ###########################################
@app.route('/API/get/pixelarts',methods=['GET']) 
def getPixelArt():
    return str(database.pixelarts)

@app.route('/API/get/animations',methods=['GET']) 
def getAnimations():
    return str(database.animations)

###Store#############################################
@app.route('/API/store/pixelart',methods=['POST']) 
def storePixelArt():
    if request.method=='POST':
        data = json.loads(str(request.form['data']))
        name = request.form['name']
        database.pixelarts[name] = data
        database.write()
        return "Pixel Art Sent"

@app.route('/API/store/animation',methods=['POST']) 
def storeAnimations():
    if request.method=='POST':
        data = json.loads(str(request.form['data']))
        name = request.form['name']
        database.animations[name] = data
        database.write()
        return "Animation Sent"
        
###Remove##########################################
@app.route('/API/remove/pixelart',methods=['POST'])
def removePixelArt():
    if request.method=='POST':
        name = str(request.form['name'])
        try:del database.pixelarts[name]
        except:pass
        database.write()
    return "Pixel Art Deleted"
    
@app.route('/API/remove/animation',methods=['POST'])
def removeAnimation():
    if request.method=='POST':
        name = str(request.form['name'])
        try: del database.animations[name]
        except:pass
        database.write()
    return "Animation Deleted"


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
