function addDevice() {
    var deviceInput = document.querySelectorAll('.deviceInput');
    var macInput = document.querySelectorAll('.macInput');
    var primaryBandInput = document.querySelectorAll('.primaryBandInput');
  
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
  
  function clearFormFields() {
    var inputs = document.querySelectorAll('input[type=text]');
    inputs.forEach(input => {
      input.value = '';
    });
  }
  
  function copyToTable() {
    var table = document.getElementById('dataTable');
    var range = document.createRange();
    range.selectNode(table);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  }
  
  function copyPart2Data() {
    const part2Form = document.getElementById('part2Form');
    const aircheckSections = part2Form.querySelectorAll('.aircheck');
    let data = '';
    
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
