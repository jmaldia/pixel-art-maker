/*
* Pixel Art Maker - JS File
* Created by Jon Maldia
* 
* FEATURES
* Must have:
* DONE: Grid maker 
* DONE: Color picker
* DONE: Ability to draw
* 
* Nice to have:
* DONE: Reset button
* DONE: Customized color picker
* DONE: Erase option
* DONE: Clear grid
* DONE: Preset sizes
* TODO: Save option
*/

// jQuery variables
const sizePicker = $("#sizePicker");
const currentColor = $('.current-color')
const small = $("#small");
const medium = $("#medium");
const large = $("#large");
const pixelCanvas = $('#pixelCanvas');
const savedImageBox = $('.saved-image-box');
const saveButton = $('#save-button');
let getCanvas = "";

// When size is submitted by the user, call makeGrid()
// This function creates a grid based on the Height and Width inputs
function makeGrid(inputWidth, inputHeight) {
	let table = "";

	for (let row = 0; row < inputHeight; row++) {
		$('.row').remove();
		table += "<tr class='row'>";
		for (let column = 0; column < inputWidth; column++) {
			if (column % 2 === 0 && row % 2 == 1) {
				table += "<td class='grey'></td>";
			} else if (column % 2 === 1 && row % 2 == 0) {
				table += "<td class='grey'></td>";
			} else {
				table += "<td class='white'></td>";
			}
		}
		table += "</tr>";
	}
	pixelCanvas.append(table);
}

// Resets the canvas to default - Modal for confirm
function reset(gridWidth, gridHeight){
	$( "#dialog-confirm" ).dialog({
		resizable: false,
		height: "auto",
		width: 400,
		modal: true,
		buttons: {
			"Reset Canvas": function() {
			  $( this ).dialog( "close" );
			  makeGrid(gridWidth, gridHeight);
			},
			Cancel: function() {
			  $( this ).dialog( "close" );
			}
		}
	});
}


// Download to image
function saveImage() {
	html2canvas(pixelCanvas, {
		onrendered: function (canvas) {
			// Creates a new link for download
			let imageURI = canvas.toDataURL();
			let myLink = document.createElement('a');
			myLink.download = "yourart.png";
			myLink.href = imageURI;
			document.body.appendChild(myLink);
			myLink.click();
		}
	});
}



$(document).ready(function() {
	// Variables for color and size input
	let gridWidth = 15;
	let gridHeight = 15;
	let gridColor = "#000000";

	// Create initial grid
	makeGrid(gridWidth, gridHeight);

	// Listener for the create/submit button
	// This grabs the width and height from the user and replaces the existing grid
	$('#button-small').on('click', function() {
		event.preventDefault();
		gridHeight = small.find("input[name='width']").val();
		gridWidth = small.find("input[name='height']").val();

		reset(gridWidth, gridHeight);
	});

	$('#button-medium').on('click', function() {
		event.preventDefault();
		gridHeight = medium.find("input[name='width']").val();
		gridWidth = medium.find("input[name='height']").val();

		reset(gridWidth, gridHeight);
	});

	$('#button-large').on('click', function() {
		event.preventDefault();
		gridHeight = large.find("input[name='width']").val();
		gridWidth = large.find("input[name='height']").val();

		reset(gridWidth, gridHeight);
	});

	$('#button').on('click', function() {
		event.preventDefault();
		gridHeight = sizePicker.find("input[name='width']").val();//$(inputHeight);
		gridWidth = sizePicker.find("input[name='height']").val();//$(inputWidth);

		reset(gridWidth, gridHeight);
	});




	// Picks the color
	$('.color').on('focus', function() {
		gridColor = $(this).val();
		$(this).fadeIn(100).fadeOut(100).fadeIn(100); // Makes the box flash

		currentColor.css({'background-color': gridColor});
	});

	// Calls on the reset function when Reset button is clicked
	$('#reset').on('click', function() {
		reset(15, 15);
	});

	// Uses event delegation so that all tds classes (even ones created after the DOM loads) are affected
	// Changes color to current color when mouse hovers on td
	pixelCanvas.on('mousedown mouseover', 'td', function(event) {
		if(event.buttons == 1) {
			// Checks if cell is colored
			if ($(this).hasClass('white') && $(this).hasClass('colored') && $(this).css('background-color') != 'rgb(255, 255, 255)') {
				$(this).css({'background-color': gridColor}).removeClass('colored');
			} else if ($(this).hasClass('grey') && $(this).hasClass('colored') && $(this).css('background-color') != 'rgb(220, 221, 225)') {
				$(this).css({'background-color': gridColor}).removeClass('colored');
			} else if ($(this).hasClass('white') && $(this).css('background-color') != 'rgb(255, 255, 255)') {
				$(this).css({'background-color': '#ffffff'});
			} else if ($(this).hasClass('grey') && $(this).css('background-color') != 'rgb(220, 221, 225)') {
				$(this).css({'background-color': '#dcdde1'});
			} else {
				$(this).css({'background-color': gridColor}).addClass('colored');	
			}
		}
	});


	// Erase Grid
	pixelCanvas.delegate('td', 'eraseWork', function() {
		if ($(this).hasClass('white')) {
			$(this).css({'background-color': '#ffffff'});
		} else if ($(this).hasClass('grey')) {
			$(this).css({'background-color': '#dcdde1'});
		}
	});

	$('#erase').click(function() {
		$('td').trigger('eraseWork');
	});


	$('.range-colors').on('change', function(){
		let red = $('#slider-red').val();
		let green = $('#slider-green').val();
		let blue = $('#slider-blue').val();
		gridColor = `rgb(${red}, ${green}, ${blue})`

		console.log(`rgb(${red}, ${green}, ${blue})`);
		console.log($(this).find('.range-slider-range').val());
		$(this).find('.range-slider-value').html($(this).find('.range-slider-range').val());

		currentColor.css({'background-color': `${gridColor}`});

	});





});