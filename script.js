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

  if (!webConnectionSpeed || !downloadTime || !internalSpeedTest || !stayConnected) {
    alert('Please fill in all required fields.');
    return;
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
  If not, how long does it stay connected? : ${disconnectTime}
  
  In addition, Student Tech should ensure that the troubleshooting steps listed for the phones tech have been completed.
  An Ethernet cable is also brought to the user so they can stay connected while we continue the troubleshooting process. If the user just wants to use Ethernet instead and stop troubleshooting, ticket closed.
  If troubleshooting by Student tech fixes connectivity problems, ticket closed. This should be added as a "Work Note" in the open ServiceNow ticket.
  `;

  navigator.clipboard.writeText(data)
    .then(() => alert('Dell Metrics Data copied to clipboard'))
    .catch(err => console.error('Unable to copy Dell Metrics Data to clipboard', err));
}

function copyAllInfo() {
  // Copy Part 1 data
  var part1Data = copyToTable();

  // Copy Part 2 data
  var part2Data = copyPart2Data();

  // Copy Part 3 data
  var part3Data = copyDellMetricsData();

  // Combine all parts into one string
  var allData = part1Data + '\n\n' + part2Data + '\n\n' + part3Data;

  // Copy the combined data to the clipboard
  navigator.clipboard.writeText(allData)
    .then(() => alert('All information copied to clipboard'))
    .catch(err => console.error('Unable to copy all information to clipboard', err));
}
