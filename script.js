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
    return ''; // Return an empty string if table is empty
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

  // Copy the data to clipboard
  navigator.clipboard.writeText(data)
    .then(() => {
      alert('Devices table information has been copied');
    })
    .catch(err => console.error('Unable to copy devices table information to clipboard', err));

  return data; // Return the formatted data
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
    return ''; // Return an empty string if fields are missing
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

  // Copy the data to clipboard
  navigator.clipboard.writeText(data)
    .then(() => {
      alert('Aircheck data has been copied');
    })
    .catch(err => console.error('Unable to copy aircheck data to clipboard', err));

  return data; // Return the formatted data
}


function copyBothData() {
  // Validate part 1 data
  var deviceInput = document.querySelectorAll('.deviceInput');
  var macInput = document.querySelectorAll('.macInput');
  var primaryBandInput = document.querySelectorAll('.primaryBandInput');
  var missingPart1Fields = [];

  for (var i = 0; i < deviceInput.length; i++) {
    if (!deviceInput[i].value || !macInput[i].value || !primaryBandInput[i].value) {
      missingPart1Fields.push('Device ' + (i + 1));
    }
  }

  // Validate table data
  var table = document.getElementById('dataTable');
  var rows = table.querySelectorAll('tr');
  var missingTableData = rows.length <= 1 ? ['Devices Table'] : [];

  // Validate part 2 data
  const part2Form = document.getElementById('part2Form');
  const aircheckSections = part2Form.querySelectorAll('.aircheck');
  var missingPart2Fields = [];

  aircheckSections.forEach(section => {
    const inputs = section.querySelectorAll('input');
    inputs.forEach(input => {
      if (!input.value) {
        const label = input.parentElement.querySelector('b').textContent.trim();
        missingPart2Fields.push(label);
      }
    });
  });

  var missingItems = missingPart1Fields.concat(missingTableData, missingPart2Fields);

  if (missingItems.length > 0) {
    alert('Please fill in the following fields:\n\n' + missingItems.join('\n'));
    return;
  }

  // If all data is filled, proceed with copying both parts
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

function validatePart3() {
  const webConnectionSpeed = document.getElementById('webConnectionSpeed').value.trim();
  const downloadTime = document.getElementById('downloadTime').value.trim();
  const internalSpeedTest = document.getElementById('internalSpeedTest').value.trim();
  const stayConnected = document.querySelector('input[name="stayConnected"]:checked');
  const disconnectTime = document.getElementById('disconnectTime').value.trim();

  const missingFields = [];

  if (!webConnectionSpeed) {
    missingFields.push('Check web connection speed');
  }
  if (!downloadTime) {
    missingFields.push('Time to download file');
  }
  if (!internalSpeedTest) {
    missingFields.push('Internal Speed Test');
  }
  if (!stayConnected) {
    missingFields.push('Does the Dell Latitude stay connected to the AP?');
  } else if (stayConnected.value === 'No' && !disconnectTime) {
    missingFields.push('If not, how long does it stay connected?');
  }

  if (missingFields.length > 0) {
    alert('Please fill in the following fields for Dell Latitude Metrics:\n\n' + missingFields.join('\n'));
    return false; // Prevent form submission
  }

  return true; // Proceed with form submission
}

function copyDellMetricsData() {
  const webConnectionSpeed = document.getElementById('webConnectionSpeed').value.trim();
  const downloadTime = document.getElementById('downloadTime').value.trim();
  const internalSpeedTest = document.getElementById('internalSpeedTest').value.trim();
  const stayConnected = document.querySelector('input[name="stayConnected"]:checked');
  const disconnectTime = stayConnected && stayConnected.value === 'No' ? document.getElementById('disconnectTime').value.trim() : 'N/A';

  // Check if any required field is missing
  if (!webConnectionSpeed || !downloadTime || !internalSpeedTest || !stayConnected) {
    alert('Please fill in all required fields.');
    return ''; // Return an empty string if any required field is missing
  }

  const stayConnectedValue = stayConnected.value;

  const data = `
  -----------------------------------
  Dell Latitude Metrics:
  -----------------------------------
  Check web connection speed (https://drive.google.com/drive/folders/14y3VaiITf_gjgzD16fJSlJOUobo88rWl 10MB file): ${webConnectionSpeed}
  Time to download file: ${downloadTime}
  Internal Speed Test (https://baldr.ucc.nau.edu/stc/speed/): ${internalSpeedTest}
  Does the Dell Latitude stay connected to the AP? : ${stayConnectedValue}
  ${stayConnectedValue === 'No' ? 'If not, how long does it stay connected? : ' + disconnectTime : ''}
  
  In addition, Student Tech should ensure that the troubleshooting steps listed for the phones tech have been completed.
  An Ethernet cable is also brought to the user so they can stay connected while we continue the troubleshooting process. If the user just wants to use Ethernet instead and stop troubleshooting, ticket closed.
  If troubleshooting by Student tech fixes connectivity problems, ticket closed. This should be added as a "Work Note" in the open ServiceNow ticket.
  `;

  // Copy the metrics data only (excluding the function definition)
  navigator.clipboard.writeText(data)
    .then(() => alert('Dell Latitude Metrics Info has been copied to the clipboard'))
    .catch(err => console.error('Unable to copy Dell Latitude Metrics Info to clipboard', err));
}

function copyAllMetricsData() {
  // Validate part 1 data
  var deviceInput = document.querySelectorAll('.deviceInput');
  var macInput = document.querySelectorAll('.macInput');
  var primaryBandInput = document.querySelectorAll('.primaryBandInput');
  var missingPart1Fields = [];

  for (var i = 0; i < deviceInput.length; i++) {
    if (!deviceInput[i].value || !macInput[i].value || !primaryBandInput[i].value) {
      missingPart1Fields.push('Device ' + (i + 1));
    }
  }

  // Validate table data
  var table = document.getElementById('dataTable');
  var rows = table.querySelectorAll('tr');
  var missingTableData = rows.length <= 1 ? ['Devices Table'] : [];

  // Validate part 2 data
  const part2Form = document.getElementById('part2Form');
  const aircheckSections = part2Form.querySelectorAll('.aircheck');
  var missingPart2Fields = [];

  aircheckSections.forEach(section => {
    const inputs = section.querySelectorAll('input');
    inputs.forEach(input => {
      if (!input.value) {
        const label = input.parentElement.querySelector('b').textContent.trim();
        missingPart2Fields.push(label);
      }
    });
  });

  // Validate part 3 data
  const webConnectionSpeed = document.getElementById('webConnectionSpeed').value.trim();
  const downloadTime = document.getElementById('downloadTime').value.trim();
  const internalSpeedTest = document.getElementById('internalSpeedTest').value.trim();
  const stayConnected = document.querySelector('input[name="stayConnected"]:checked');
  const disconnectTime = document.getElementById('disconnectTime').value.trim();
  var missingPart3Fields = [];

  if (!webConnectionSpeed || !downloadTime || !internalSpeedTest || !stayConnected) {
    missingPart3Fields.push('Dell Latitude Metrics fields');
  }

  var missingItems = missingPart1Fields.concat(missingTableData, missingPart2Fields, missingPart3Fields);

  if (missingItems.length > 0) {
    alert('Please fill in the following fields:\n\n' + missingItems.join('\n'));
    return;
  }

  // If all data is filled, proceed with copying all parts
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

  var part3Data = '';
  part3Data += '-----------------------------------\n';
  part3Data += 'DELL LATITUDE METRICS:\n';
  part3Data += '-----------------------------------\n';
  part3Data += 'Check web connection speed (https://drive.google.com/drive/folders/14y3VaiITf_gjgzD16fJSlJOUobo88rWl 10MB file): ' + webConnectionSpeed + '\n';
  part3Data += 'Time to download file: ' + downloadTime + '\n';
  part3Data += 'Internal Speed Test (https://baldr.ucc.nau.edu/stc/speed/): ' + internalSpeedTest + '\n';
  part3Data += 'Does the Dell Latitude stay connected to the AP? : ' + (stayConnected ? stayConnected.value : 'N/A') + '\n';
  if (stayConnected && stayConnected.value === 'No') {
    part3Data += 'If not, how long does it stay connected? : ' + disconnectTime + '\n';
  }

  // Additional information
  part3Data += '\nIn addition, Student Tech should ensure that the troubleshooting steps listed for the phones tech have been completed.\n';
  part3Data += 'An Ethernet cable is also brought to the user so they can stay connected while we continue the troubleshooting process. If the user just wants to use Ethernet instead and stop troubleshooting, ticket closed.\n';
  part3Data += 'If troubleshooting by Student tech fixes connectivity problems, ticket closed. This should be added as a "Work Note" in the open ServiceNow ticket.\n';

  var combinedData = part1Data + '\n' + part2Data + '\n' + part3Data;

  navigator.clipboard.writeText(combinedData)
    .then(() => alert('All Metrics Info has been copied to the clipboard'))
    .catch(err => console.error('Unable to copy All Metrics Info to clipboard', err));
}

