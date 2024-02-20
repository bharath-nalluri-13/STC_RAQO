function addDevice() {
  var deviceInput = document.querySelectorAll('.deviceInput');
  var macInput = document.querySelectorAll('.macInput');
  var primaryBandInput = document.querySelectorAll('.primaryBandInput');

  // Check if any input field is empty
  if (deviceInput.length === 0 || macInput.length === 0 || primaryBandInput.length === 0) {
    alert('All fields are mandatory');
    return;
  }

  var tableBody = document.getElementById('tableBody');
  var newRow = tableBody.insertRow();

  for (var i = 0; i < deviceInput.length; i++) {
    if (!deviceInput[i].value || !macInput[i].value || !primaryBandInput[i].value) {
      alert('All fields are mandatory');
      return;
    }
    var cell = newRow.insertCell(i);
    cell.innerHTML = deviceInput[i].value;
  }

  for (var i = 0; i < macInput.length; i++) {
    var cell = newRow.insertCell(i + 1);
    cell.innerHTML = macInput[i].value;
  }

  for (var i = 0; i < primaryBandInput.length; i++) {
    var cell = newRow.insertCell(i + 2);
    cell.innerHTML = primaryBandInput[i].value;
  }

  clearFormFields();
}

function copyToTable() {
  var table = document.getElementById('dataTable');
  var rows = table.querySelectorAll('tr');
  var data = '';

  // Add header for device information
  data += '-----------------------------------\n';
  data += 'DEVICES INFORMATION:\n';
  data += '-----------------------------------\n';

  // Iterate over each row in the table
  rows.forEach((row, rowIndex) => {
    // If it's not the header row
    if (rowIndex > 0) {
      // Get the cells of the current row
      var cells = row.querySelectorAll('td');
      
      // Add a new line for each device entry
      data += 'Device ' + (rowIndex) + ':\n';

      // Iterate over the cells of the current row
      cells.forEach((cell, cellIndex) => {
        // Get the corresponding label from the table header
        var label = table.querySelector('th:nth-child(' + (cellIndex + 1) + ')').textContent.trim();
        // Append the label and cell's content to the data string
        data += label + (rowIndex) + ': ' + cell.innerHTML.trim() + '\n';
      });

      // Add an extra line break after each row
      data += '\n';
    }
  });

  // Copy the formatted data to the clipboard
  navigator.clipboard.writeText(data)
    .then(() => alert('Table data copied to clipboard'))
    .catch(err => console.error('Unable to copy table data to clipboard', err));
}


function copyPart2Data() {
  const part2Form = document.getElementById('part2Form');
  const aircheckSections = part2Form.querySelectorAll('.aircheck');
  let data = '';

  // Add header for air-check metrics
  data += '-----------------------------------\n';
  data += 'AIR-CHECK METRICS:\n';
  data += '-----------------------------------\n';

  aircheckSections.forEach(section => {
    // Get the heading of the subsection
    const heading = section.querySelector('h3').textContent.trim();
    data += `${heading}\n`;

    // Get input fields within the subsection
    const inputs = section.querySelectorAll('input');
    inputs.forEach(input => {
      const label = input.parentElement.querySelector('b').textContent.trim();
      data += `${label}: ${input.value}\n`;
    });

    // Add a separator between sections
    data += '\n';
  });

  navigator.clipboard.writeText(data)
    .then(() => alert('Part 2 data copied to clipboard'))
    .catch(err => console.error('Unable to copy Part 2 data to clipboard', err));
}

function copyBothData() {
  // Part 1 Data
  var table = document.getElementById('dataTable');
  var rows = table.querySelectorAll('tr');
  var part1Data = '';

  // Add heading for Part 1 data
  part1Data += '-----------------------------------\n';
  part1Data += 'DEVICES INFORMATION:\n';
  part1Data += '-----------------------------------\n';

  // Iterate over each row in the table
  rows.forEach((row, rowIndex) => {
    // If it's not the header row
    if (rowIndex > 0) {
      // Get the cells of the current row
      var cells = row.querySelectorAll('td');
      
      // Add a new line for each device entry
      part1Data += 'Device ' + (rowIndex) + ':\n';

      // Iterate over the cells of the current row
      cells.forEach((cell, cellIndex) => {
        // Get the corresponding label from the table header
        var label = table.querySelector('th:nth-child(' + (cellIndex + 1) + ')').textContent.trim();
        // Append the label and cell's content to the data string
        part1Data += label + (rowIndex) + ': ' + cell.innerHTML.trim() + '\n';
      });

      // Add an extra line break after each row
      part1Data += '\n';
    }
  });

  // Part 2 Data
  const part2Form = document.getElementById('part2Form');
  const aircheckSections = part2Form.querySelectorAll('.aircheck');
  let part2Data = '';

  // Add heading for Part 2 data
  part2Data += '-----------------------------------\n';
  part2Data += 'AIR-CHECK METRICS:\n';
  part2Data += '-----------------------------------\n';

  aircheckSections.forEach(section => {
    // Get the heading of the subsection
    const heading = section.querySelector('h3').textContent.trim();
    part2Data += `${heading}\n`;

    // Get input fields within the subsection
    const inputs = section.querySelectorAll('input');
    inputs.forEach(input => {
      const label = input.parentElement.querySelector('b').textContent.trim();
      part2Data += `${label}: ${input.value}\n`;
    });

    // Add a separator between sections
    part2Data += '\n';
  });

  // Combine Part 1 and Part 2 data
  var combinedData = part1Data + '\n' + part2Data;

  // Copy the combined data to the clipboard
  navigator.clipboard.writeText(combinedData)
    .then(() => alert('Part 1 and Part 2 data combined copied to clipboard'))
    .catch(err => console.error('Unable to copy Part 1 and Part 2 data combined to clipboard', err));
}
