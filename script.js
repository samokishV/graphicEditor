previousFigureElement='null';
element='null'
previousFigureOption = 'null';
figureOption ='stroke';
isDrawing = false;

function changeFigure(figure, a) {

	// Возвращаем ранее выбранный элемент <img> в нормальное состояние
	if (previousFigureElement!='null') previousFigureElement.className='normal'

	// Меняем стиль элемента <img>, по которому щелкнули
	a.className='active'
	
	element = figure;

	show_parametrs();

	show_options();

	if (element=='text') drawText(context3)

	previousFigureElement = a;
	
}

function show_parametrs() {

	if (element=='rect' || element=='roundRect' || element=='circle' || element=='ellipse' || element=='text') {
		stroke.style.visibility = 'visible';
		fill_and_stroke.style.visibility = 'visible';
		fill.style.visibility = 'visible';

		}

	else if (element=='line' || element=='pen' || element=='eraser') {

		stroke.style.visibility = 'hidden';
		fill_and_stroke.style.visibility = 'hidden';
		fill.style.visibility = 'hidden';
		}

}

function show_options() {

	if (element=='null') {

		option1.style.visibility = 'hidden';
		option2.style.visibility = 'hidden';
		option3.style.visibility = 'hidden';
                text1.style.visibility = 'hidden';
		text2.style.visibility = 'hidden';
		text3.style.visibility = 'hidden';
		example3.style.visibility = 'hidden';
		
		}

	
	if (element!='null') {

		option1.style.visibility = 'visible';
		option1.className = 'ToolbarOption';
		option2.style.visibility = 'visible';
		option3.style.visibility = 'visible';
		special_option.style.visibility = 'hidden';
		special_option.className='Toolbarhidden'
		text1.style.visibility = 'hidden'
		text1.className='Toolbarhidden'


	if (element!='text') {
		
		text1.style.visibility = 'hidden';
		text2.style.visibility = 'hidden';
		text3.style.visibility = 'hidden';
		example3.style.visibility = 'hidden';		

		}

	if (element=='text') {
		special_option.className='Toolbarhidden'
		text1.className='Toolbar2'
		text1.style.visibility = 'visible';
		text2.style.visibility = 'visible';
		text3.style.visibility = 'visible';
		example3.style.visibility = 'visible';		

		}

	if (element=='pen') { 

                special_option.style.visibility ='visible'
		special_option.className = 'Toolbar2';
 
		}

	if (element!='pen') { 

                special_option.style.visibility ='hidden'
 		special_option.className='Toolbarhidden'
                
		}

	if (element!='pen' && element!='text') {
		
		special_option.className ='Toolbar2'

		}

	}

}

function change_value() {
opasity_value.innerHTML=opasity.value;
}

function change_value2() {
strokeWidth_value.innerHTML=strokeWidth.value;
}

function changeFigureStyle(option, b) {
	
	stroke.style.outline = "6px solid #F2F7FE";

	// Возвращаем ранее выбранный элемент <div> в нормальное состояние
	if (previousFigureOption!='null') previousFigureOption.style.outline="6px solid #F2F7FE";

	// Меняем стиль элемента <div>, по которому щелкнули
	b.style.outline='6px solid #A8D8FF'; 
	
	figureOption = option;

	previousFigureOption = b;

	drawText(context3)
	
}

function changeColor() {
context2.fillStyle = fillColor.value
context2.strokeStyle = strokeColor.value
context3.fillStyle = fillColor.value
context3.strokeStyle = strokeColor.value
}

function fillAndStroke(context) {

	changeColor();

	text_string = stroka.value
	if (stroka.value=='') text_string = "Example"	


	if (element!='eraser' && element!='pen') {context.globalAlpha = opasity.value;
                                                 context.lineWidth = strokeWidth.value;}
	
	if (figureOption=='fill') {
		

	if (element=='text') {context.fillText(text_string, x, y);}

	if (element!='text') context.fill()

	}

	if (figureOption=='fill_and_stroke') {

		if (element!='text') {context.fill(); context.stroke();} 
		if (element=='text') {	
                        context.fillText(text_string, x, y);
			context.strokeText(text_string, x, y);
			}
	}

	if (figureOption=='stroke') {

		if (element!='text') context.stroke();
		if (element=='text') context.strokeText(text_string, x, y);}
}

window.onload = function() {

      canvas2 = document.getElementById("example2");
	  IMG = new Image();
	  IMG.src=canvas2.toDataURL();
	  if (canvas2.getContext) context2 = canvas2.getContext("2d");
	  else all.style.visibility = "hidden" 

      // канва для отображения результатов настройки текста
      canvas3 = document.getElementById("example3");
      context3 = canvas3.getContext("2d");

      // Подключаем требуемые для рисования события
      canvas2.onmousedown = startDrawing;
      window.onmouseup = stopDrawing;
      window.onmousemove = draw;


      //определяем цвет заливки и обводки
      changeColor()


      pre_x = 'null';
      pre_x3 = 'null';
      pre_y = 'null';
      pre_y3 = 'null';


	//отображаем текущее значение прозрачности
	change_value()

	//отображаем текущую толщину обводки
	change_value2()

        // скрываем настройки 
        show_options()

	}

function  fonovka(){
	
	context2.globalAlpha = '1'
	context2.clearRect(0, 0, canvas2.width, canvas2.height)
	IMG.src=canvas2.toDataURL();
	}


function startDrawing(e) {

//определяем, можно ли рисовать данной клавишей мыши
// 1 - левая клавиша мыши
// 2 - колесико
// 3 - правая клавиша мыши


if (e.which==1) isDrawing = true;
if(e.which==2) isDrawing = false;
if(e.which==3) isDrawing = false;


//координаты клика мыши
x = e.pageX - canvas2.offsetLeft;
y = e.pageY - canvas2.offsetTop;

	//Нажатием левой кнопки мыши помещаем "карандаш" на холст
	if (element=='pen') {context2.beginPath(); context2.moveTo(x, y); if(pen_type.value=='h' || pen_type.value=='v' || pen_type.value=='hv') {context2.moveTo(x, y); }}

	if (element=='eraser' && e.which==1) {context2.beginPath(); context2.fillStyle='white'; R=strokeWidth.value*10;  drawCircle(context2); }
	if (element=='text' && e.which==1) {context2.beginPath(); drawText(context2)}
}

function curent_width_height(e){
rect_width = e.pageX - canvas2.offsetLeft - x;
rect_height = e.pageY - canvas2.offsetTop - y;
}

function drawRect(context) {
context.beginPath();
context.rect(x, y, rect_width, rect_height);
fillAndStroke(context)	
}

function current_width_height_and_start_point(){
rect_width = Math.abs(x2 - x);
rect_height = Math.abs(y2 - y)

if(x2 > x || x2 == x) start_x = x;
if(x > x2) start_x = x2;
if(y2 > y || y2 == y) start_y = y;
if(y > y2) start_y = y2;

}

function roundRect(context, x3, y3, w, h, r) { 

if (w<2*r && w<h) r = w/2
if (h<2*r && (h<w || h==w)) r = h/2
if (w>2*r && h>2*r) r = 20

  context.beginPath();
  context.moveTo(x3 + r, y3);
  context.lineTo(x3 + w - r, y3);
  context.quadraticCurveTo(x3 + w, y3, x3 + w, y3 + r);
  context.lineTo(x3 + w, y3 + h - r);
  context.quadraticCurveTo(x3 + w, y3 + h, x3 + w - r, y3 + h);
  context.lineTo(x3 + r, y3 + h);
  context.quadraticCurveTo(x3, y3 + h, x3, y3 + h - r);
  context.lineTo(x3, y3 + r);
  context.quadraticCurveTo(x3, y3, x3 + r, y3);
  context.closePath();
  fillAndStroke(context)
 	
}


function curent_radius(e){
R_x = e.pageX - canvas2.offsetLeft - x;
R_y = e.pageY - canvas2.offsetTop - y;
R =  Math.sqrt(R_y*R_y+R_x*R_x)
}

function drawCircle(context) {

context.beginPath();
context.arc(x, y, R, 0, 2*Math.PI);
if (element=='eraser') {context2.globalAlpha = opasity.value; context2.fill(); }
else fillAndStroke(context)
	
}

function curent_params(e){
pageX = e.pageX - canvas2.offsetLeft
pageY = e.pageY - canvas2.offsetTop
if (pageX > x || pageX == x) 
	{R_x = (pageX - x)/2; centerX= R_x + x}
if (pageX < x) 
	{R_x = (x - pageX)/2; centerX= x - R_x}
if (pageY > y || pageY == y) 
	{R_y = (pageY - y)/2; centerY= R_y + y}
if (pageY < y) 
	{R_y = (y - pageY)/2; centerY= y - R_y}
}

function draw_ellipce(context) {
context.save();
if (R_x > R_y || R_x == R_y) { 
	R=R_x;
	scale_y=R_y/R_x; 
	scale_x=1; 
	if (scale_y!=0) centerY= centerY/scale_y
	context.scale(1, scale_y)
	}
if (R_x < R_y) { 
	R=R_y;
	scale_x=R_x/R_y; 
	scale_y=1; 
	if (scale_x!=0) centerX= centerX/scale_x
	context.scale(scale_x, 1)
	}

context.beginPath();
context.translate(centerX, centerY)
if (scale_y!=0 && scale_x!=0) context.arc(0, 0, R, 0, 2*Math.PI);
context.restore();
fillAndStroke(context);
}

function curent_coords(e){
x2 = e.pageX - canvas2.offsetLeft;
y2 = e.pageY - canvas2.offsetTop;

if (element=='eraser') {x=x2, y=y2}
 
}

function previous_coords() {
x_before = x2;
y_before = y2;
}

function drawLine(context) {

context.beginPath();
context.moveTo(x, y)
context.lineTo(x2, y2);
context.lineWidth=strokeWidth.value;
context.globalAlpha = opasity.value;
context.stroke();
}

function drawLine2(context) {

context.lineWidth = strokeWidth.value;
context.globalAlpha = opasity.value;
context.lineCap = 'round';
difference = x - x2;
var x3 = x + difference;
difference2 = y - y2;
var y3 = y + difference2;

	context2.beginPath();
	if (pre_x!='null') context2.moveTo(pre_x, pre_y);
	else context2.moveTo(x, y);
	context2.lineTo(x2, y2);
        context2.stroke();
        context2.beginPath();
	if (pre_x!='null' && pen_type.value=="h") context2.moveTo(pre_x3, pre_y);
	if (pre_x!='null' && pen_type.value=="v") context2.moveTo(pre_x, pre_y3);
	if (pre_x!='null' && pen_type.value=="hv") context2.moveTo(pre_x3, pre_y3);
        if (pre_x=='null') context2.moveTo(x, y);
	if (pen_type.value=="h") context2.lineTo(x3, y2);
	if (pen_type.value=="v") context2.lineTo(x2, y3);
	if (pen_type.value=="hv") context2.lineTo(x3, y3);
	context2.stroke();
	pre_x = x2;
	pre_x3 = x3;
	pre_y = y2;
	pre_y3 = y3;

}

function drawText(context) {

	if (styl.value=='обычый') {
	S = 'normal';
	}

	if (styl.value=='курсив') {
	S = 'italic normal';
	}

	if (styl.value=='жирный') {
	S = 'normal bold';
	}

	if(styl.value=='жирный курсив') {
	S = 'italic bold'
	}

kegl = razmer.value +'px'
context.font = S +" " +kegl+" "+family.value;

if (context==context3) {x=10; y=canvas3.height/2; context3.clearRect(0, 0, canvas3.width, canvas3.height)}

fillAndStroke(context)

}



function draw(e) {
if (isDrawing == true) {

        if (element!='pen' && element!='eraser' && element!='text') {
context2.clearRect(0, 0, canvas2.width, canvas2.height)
context2.fillStyle = 'white';
context2.globalAlpha = 1;
context2.rect(0, 0, canvas2.width, canvas2.height);
context2.fill();
context2.drawImage(IMG, 0, 0) }

	if (element=='rect') {curent_width_height(e); drawRect(context2)}
	if (element=='roundRect') {curent_coords(e); current_width_height_and_start_point(); roundRect(context2, start_x, start_y, rect_width, rect_height, 20);}
	if (element=='circle') {curent_radius(e); drawCircle(context2)}
	if (element=='ellipse') {curent_params(e); draw_ellipce(context2)}
	if (element=='line') {curent_coords(e); drawLine(context2)}
	if (element=='pen') {

		curent_coords(e); 

		if (pen_type.value=="simple") drawLine2(context2);

		if (pen_type.value=="h" || pen_type.value=="v" || pen_type.value=="hv") drawLine2(context2); 
  	        	
	
		}

	if (element=='eraser') {curent_coords(e); drawCircle(context2);}
}


}

function stopDrawing(e) {
isDrawing = false;
IMG.src=canvas2.toDataURL();			

if (element=='pen') {
pre_x = 'null';
pre_x3 = 'null';
pre_y = 'null';
pre_y3 = 'null';
}

}