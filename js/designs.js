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
* TODO: Customized color picker
* TODO: Erase option
* TODO: Clear grid
* TODO: Preset sizes
* TODO: Save option
*/


// When size is submitted by the user, call makeGrid()
// This function creates a grid based on the Height and Width inputs
function makeGrid(inputWidth, inputHeight) {
	event.preventDefault();
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
	$('#pixelCanvas').append(table);
}

// Resets the canvas to default
function reset(gridWidth, gridHeight) {
	let confirmDelete = confirm('Do you really want to clear your beautiful work?');
	if (confirmDelete) {
    	makeGrid(gridWidth, gridHeight);	
	};
}

$(document).ready(function() {
	// jQuery variables
	const sizePicker = $("#sizePicker");

	// Variables for color and size input
	let gridWidth = sizePicker.find("input[name='height']").val();//$(inputWidth);
	let gridHeight = sizePicker.find("input[name='width']").val();//$(inputHeight);
	let gridColor = "#000000";

	// Create initial grid
	makeGrid(gridWidth, gridHeight);

	// Listener for the create/submit button
	// This grabs the width and height from the user and replaces the existing grid
	$('#button').on('click', function() {
    	event.preventDefault();

    	gridHeight = sizePicker.find("input[name='width']").val();//$(inputHeight);
		gridWidth = sizePicker.find("input[name='height']").val();//$(inputWidth);

		reset(gridWidth, gridHeight);
	});

	// Picks the color
	$('#colorPicker').on('change', function() {
		gridColor = $(this).val();
	});

	// Calls on the reset function when Reset button is clicked
	$('#reset').on('click', function() {
		reset(30, 30);
	});

	// Uses event delegation so that all tds classes (even ones created after the DOM loads) are affected
	// Changes color to current color when mouse hovers on td
	$('#pixelCanvas').on('mouseover', 'td', function() {
		$(this).css({'background-color': gridColor});
	});
});