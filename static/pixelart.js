var elements = {}
elements.grid = document.getElementById('grid');

elements.size = {};
elements.size.rows = document.getElementById('rows');
elements.size.columns = document.getElementById('columns');

elements.color = {};
elements.color.colorpicker = document.getElementById('colorvalue');
elements.color.coloroptions = document.getElementById('coloroptions');
elements.color.setcolor = document.getElementById('setcolor');

elements.data = {};
elements.data.output=document.getElementById('metadata');
elements.data.input=document.getElementById('metadatainput');
elements.data.loading = document.getElementById('dataloading');

elements.animation = {};
elements.animation.add = document.getElementById('addframe');
elements.animation.frames = document.getElementById('frames');
elements.animation.timing = document.getElementById('timing');
elements.animation.repeat = document.getElementById('repeat');
elements.animation.play = document.getElementById('play');

elements.animationdata = {};
elements.animationdata.output=document.getElementById('animationdata');
elements.animationdata.input=document.getElementById('animationdatainput');
elements.animationdata.loading = document.getElementById('animationdataloading');

var rows=8;
var columns=8;

elements.size.rows.value = rows;
elements.size.columns.value = columns;
elements.size.rows.onchange = function(){
  rows=document.getElementById('rows').value;
  setGrid();
}
elements.size.columns.onchange = function(){
  columns=document.getElementById('columns').value;
  setGrid();
}
//Color////////////////////////////////////////////////////////////////
var color= elements.color.colorpicker.value;
elements.color.colorpicker.onchange = function(){
  color = elements.color.colorpicker.value;
}


function addColors(color){
  var option = document.createElement("button");
  option.style.backgroundColor = color;
  option.setAttribute("onclick","color='"+color+"';document.getElementById('colorvalue').value=color;");
  option.setAttribute("ondblclick","this.parentNode.removeChild(this);");
  option.setAttribute("class","colorchoice")
  elements.color.coloroptions.innerHTML += option.outerHTML+'  ';
}
elements.color.setcolor .setAttribute("onclick",'addColors(color);');
addColors("#ffffff");
addColors("rgb(0,0,0)");

//Grid/////////////////////////////////////////////////////////////////
function setGrid(){
  var pixel = document.createElement("td");
  pixel.setAttribute("onmouseover",'setPixelColour(this,false)');
  pixel.setAttribute("onmousedown",'setPixelColour(this,true);');
  //pixel.style.backgroundColor='rgb(255,255,255)';
  pixel.style.backgroundColor='rgb(0,0,0)';
  var row = document.createElement("tr");
  row.innerHTML += (pixel.outerHTML).repeat(columns);
  
  elements.grid.innerHTML = row.outerHTML.repeat(rows);
}

var painting=false;
elements.grid.onmousedown = function(){painting=true;}
elements.grid.onmouseup = function(){painting=false;}
function setPixelColour(pixel,overwrite){  
  if (painting || overwrite){
    pixel.style.backgroundColor = color;
  }
}

setGrid();

//Save Frame////////////////////////////////////////////////////////
function metadata(){
  var data = {};
  data.rows = rows;
  data.columns = columns;
  data.matrix = [];
  
  var rowslist = elements.grid.childNodes[0].childNodes;
  rowslist.forEach(function(row){
    row.childNodes.forEach(function(pixel){
      data.matrix.push(pixel.style.backgroundColor);
    });
  });
  
  return data;
}

function loadmetadata(data){
  rows = data.rows;
  columns = data.columns;
  setGrid();
  var counter = 0;
  
  var rowslist = elements.grid.childNodes[0].childNodes;
  rowslist.forEach(function(row){
    row.childNodes.forEach(function(pixel){
      pixel.style.backgroundColor = data.matrix[counter];
      counter++;
    });
  });
  
}

elements.data.output.value = JSON.stringify(metadata());
elements.data.output.onmouseover=function(){
  elements.data.output.value = JSON.stringify(metadata());
}

elements.data.loading.onclick = function(){
  alert('Loading Data:'+elements.data.input.value);
  loadmetadata(JSON.parse(
    elements.data.input.value
  ));
}

//Animation/////////////////////////////////////////////////
var animation = [];
function addFrame(data){
  animation.push(data);
  showFrames();
}
function removeFrame(i){
  animation.splice(i,1);
  showFrames();
}
function overwriteFrame(data,i){
  alert('Overwriting Frame '+i);
  animation[i] = data;
  showFrames();
}
function showFrames(){
  elements.animation.frames.innerHTML = '';
  for (var i=0;i<animation.length;i++){
    var option = document.createElement("button");
    option.innerHTML = i;
    option.setAttribute("onclick","loadmetadata(animation["+i+"]);");
    option.setAttribute("ondblclick","removeFrame("+i+")");
    option.setAttribute("oncontextmenu", "overwriteFrame(metadata(),"+i+")");
    //option.setAttribute("class","colorchoice")
    elements.animation.frames.innerHTML += option.outerHTML+'  ';
  }
}
elements.animation.add.setAttribute("onclick",'addFrame(metadata());');


//Play Animation////////////////////////////////
elements.animation.timing.value = 500; //inms

function playAnimation(frame){
  if (animation.length == 0){alert("No Frames To Play!");return;}
  loadmetadata(animation[frame]);
  if (frame == animation.length-1 && elements.animation.repeat.checked){
    setTimeout(function(){playAnimation(0)}, elements.animation.timing.value);
  }
  else if (frame < animation.length){
    setTimeout(function(){playAnimation(frame+1)},elements.animation.timing.value);
  }
}
elements.animation.play.onclick = function(){playAnimation(0);}
//Save animation/////////////////////////////////
function showAnimationData(){
  var data = {};
  data.frames = animation;
  data.timing = elements.animation.timing.value;
  data.repeat = elements.animation.repeat.checked;
  return data;
}

elements.animationdata.output.value = JSON.stringify(showAnimationData());
elements.animationdata.output.onmouseover=function(){
  elements.animationdata.output.value = JSON.stringify(showAnimationData());
}


function loadAnimationData(data){
  animation = data.frames;
  elements.animation.timing.value = data.timing;
  elements.animation.repeat.checked = data.repeat;
  showFrames();
}

elements.animationdata.loading.onclick = function(){
  alert('Loading Animation:'+elements.animationdata.input.value);
  var data = JSON.parse(
    elements.animationdata.input.value
  );
  loadAnimationData(data);
}
