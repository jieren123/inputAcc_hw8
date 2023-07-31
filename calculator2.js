buttonOrder = ["#button7","#button8","#button9","#buttonDivide","#button4","#button5","#button6","#buttonMultiply","#button1","#button2","#button3","#buttonAdd","#button0","#buttonClear","#buttonEquals","#buttonSubtract"];

function selectItem(name) {
	$("button").removeClass("cursor");
	$(name).addClass("cursor")
}

function getSelectedItem() {
	selected = $(".cursor");
	if (selected.length == 0) {
		return null;
	}
	else {
		return "#" + selected.first().attr('id')
	} 
}

function selectNext() {
	selected = getSelectedItem()
	if (selected == null) {
		selectItem(buttonOrder[0]);
	} else {
		index = buttonOrder.indexOf(selected);
		index = (index + 1) % buttonOrder.length;
		selectItem(buttonOrder[index])
	}
}

function clickSelectedItem() {
	whichButton = getSelectedItem();
	if (whichButton != null) {
		$(whichButton).click();
	}
}

//one button interface
var scanIntervalId;
function startScanning() {
	if (scanIntervalId) {
		clearInterval(scanIntervalId);
	}
	scanIntervalId = setInterval(selectNext, 1000); // Change button every 1000 ms (1 second)
}

$(document).keypress(function(event) {
	if (event.key == 'a') {
		if (scanIntervalId) {
			clearInterval(scanIntervalId);
			scanIntervalId = null;
		}

		clickSelectedItem();

		setTimeout(startScanning, 500); // Wait 500 ms (0.5 seconds) to restart scanning
	}
});

startScanning();

// calculator stuff below here
firstValue = null;
operation = null;
addingNumber = false;

digits = "0123456789"
operators = "+-*/"

$(".calcButton").click(function(event) {
	buttonLabel = $(this).text();
	
	if (digits.indexOf(buttonLabel) != -1) {
		if (!addingNumber) {
			$("#number_input").val("")
		}
		$("#number_input").val($("#number_input").val() + buttonLabel);
		addingNumber = true;
	} else if (operators.indexOf(buttonLabel) != -1) {
		if (addingNumber) {
			if (firstValue == null) {
				firstValue = $("#number_input").val();
				addingNumber = false;
			} else if (firstValue != null) {
				secondValue = $("#number_input").val();
				evaluateExpression(firstValue,operation,secondValue)
				firstValue = $("#number_input").val();
				addingNumber = false;
			}
		}
		operation = buttonLabel;
	} else if (buttonLabel == "C") {
		$("#number_input").val("");
		firstValue = null;
		operation = null;
		addingNumber = false;
	} else if (buttonLabel == "=") {
		if (firstValue != null && operation != null && addingNumber) {
			secondValue = $("#number_input").val();
			evaluateExpression(firstValue,operation,secondValue);
			firstValue = null;
			operation = null;
			addingNumber = true
		}
	}
})

function evaluateExpression(first,op,second) {
	output = 0;
	if (op == "+") {
		output = parseInt(first) + parseInt(second);
	} else if (op == "-") {
		output = parseInt(first) - parseInt(second);
	} else if (op == "*") {
		output = parseInt(first) * parseInt(second);
	} else if (op == "/") {
		output = parseInt(first) / parseInt(second);
	}
	
	$("#number_input").val(output.toString());
}
