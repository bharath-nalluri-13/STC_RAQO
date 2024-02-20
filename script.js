function addDevice() {
  var deviceInput = document.querySelectorAll('.deviceInput');
  var macInput = document.querySelectorAll('.macInput');
  var primaryBandInput = document.querySelectorAll('.primaryBandInput');

  // Check if any input field is empty
  for (var i = 0; i < deviceInput.length; i++) {
    if (!deviceInput[i].value || !macInput[i].value || !primaryBandInput[i].value) {
      alert('Please fill in all fields for Device ' + (i + 1));
      return; // Exit function if any field is empty
    }
  }

  var tableBody = document.getElementById('tableBody');
  var newRow = tableBody.insertRow();

  for (var i = 0; i < deviceInput.length; i++) {
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

  // Check if the table is empty
  if (rows.length <= 1) {
    alert('Table data is empty');
    return; // Exit function if table is empty
  }

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
    .then(() => alert('Device Information data copied to clipboard'))
    .catch(err => console.error('Unable to copy Device Information to clipboard', err));
}

function copyPart2Data() {
  const part2Form = document.getElementById('part2Form');
  const aircheckSections = part2Form.querySelectorAll('.aircheck');

  let missingFields = [];

  aircheckSections.forEach(section => {
    const inputs = section.querySelectorAll('input');
    inputs.forEach(input => {
      if (!input.value) {
        const label = input.parentElement.querySelector('b').textContent.trim();
        missingFields.push(label);
      }
    });
  });

  if (missingFields.length > 0) {
    alert('Please fill in the following fields for Aircheck Metrics:\n\n' + missingFields.join('\n'));
    return;
  }

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
    .then(() => alert('AirCheck Metrics data copied to clipboard'))
    .catch(err => console.error('Unable to copy AirCheck Metrics data to clipboard', err));
}

function copyBothData() {
  // Validate part 1 data
  var deviceInput = document.querySelectorAll('.deviceInput');
  var macInput = document.querySelectorAll('.macInput');
  var primaryBandInput = document.querySelectorAll('.primaryBandInput');

  for (var i = 0; i < deviceInput.length; i++) {
    if (!deviceInput[i].value || !macInput[i].value || !primaryBandInput[i].value) {
      alert('Please fill in all fields for Device ' + (i + 1));
      return; // Exit function if any field is empty
    }
  }

  // Validate table data
  var table = document.getElementById('dataTable');
  var rows = table.querySelectorAll('tr');
  if (rows.length <= 1) {
    alert('Devices Table is empty');
    return; // Exit function if table is empty
  }

  // Validate part 2 data
  const part2Form = document.getElementById('part2Form');
  const aircheckSections = part2Form.querySelectorAll('.aircheck');
  aircheckSections.forEach(section => {
    const inputs = section.querySelectorAll('input');
    inputs.forEach(input => {
      if (!input.value) {
        const label = input.parentElement.querySelector('b').textContent.trim();
        alert('Please fill in ' + label);
        return; // Exit function if any field is empty
      }
    });
  });

  // Part 1 Data
  var part1Data = '';
  part1Data += '-----------------------------------\n';
  part1Data += 'DEVICES INFORMATION:\n';
  part1Data += '-----------------------------------\n';

  rows.forEach((row, rowIndex) => {
    if (rowIndex > 0) {
      var cells = row.querySelectorAll('td');
      part1Data += 'Device ' + (rowIndex) + ':\n';
      cells.forEach((cell, cellIndex) => {
        var label = table.querySelector('th:nth-child(' + (cellIndex + 1) + ')').textContent.trim();
        part1Data += label + (rowIndex) + ': ' + cell.innerHTML.trim() + '\n';
      });
      part1Data += '\n';
    }
  });

  // Part 2 Data
  var part2Data = '';
  part2Data += '-----------------------------------\n';
  part2Data += 'AIR-CHECK METRICS:\n';
  part2Data += '-----------------------------------\n';

  aircheckSections.forEach(section => {
    const heading = section.querySelector('h3').textContent.trim();
    part2Data += `${heading}\n`;

    const inputs = section.querySelectorAll('input');
    inputs.forEach(input => {
      const label = input.parentElement.querySelector('b').textContent.trim();
      part2Data += `${label}: ${input.value}\n`;
    });
    part2Data += '\n';
  });

  var combinedData = part1Data + '\n' + part2Data;

  navigator.clipboard.writeText(combinedData)
    .then(() => alert('Devices and AirCheck Metrics Info has been copied to the clipboard'))
    .catch(err => console.error('Unable to copy Devices and AirCheck Metrics Info combined to clipboard', err));
}
