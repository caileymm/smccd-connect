function openTab(tabName) {
  var tabs = document.getElementsByClassName('tab');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].style.display = 'none';
  }
  document.getElementById(tabName).style.display = 'block';
}

openTab('tab1');

function addRow() {
  var table = document.getElementById("schedule");
  var originalRow = table.rows[1];
  var clonedRow = originalRow.cloneNode(true);
  table.appendChild(clonedRow);
}

function removeRow() {
  var table = document.getElementById("schedule");
  var lastRowIndex = table.rows.length - 1;
  if (lastRowIndex > 1) {
        table.deleteRow(lastRowIndex);
  }
}

var campuses = ["canada", "cañada", "canada college", "cañada college", "csm", "college of san mateo", "skyline", "skyline college"];
var locations = ["canada", "cañada", "canada college", "cañada college", "csm", "college of san mateo", "skyline", "skyline college", "alameda", "albany", "american canyon", "antioch", "atherton", "belmont", "belvedere", "benicia", "berkeley", "brentwood", "brisbane", "burlingame", "calistoga", "campbell", "clayton", "cloverdale", "colma", "concord", "corte madera", "cotati", "cupertino", "daly city", "danville", "dixon", "dublin", "east palo alto", "el cerrito", "emeryville", "fairfax", "fairfield", "foster city", "fremont", "gilroy", "half moon bay", "hayward", "healdsburg", "hercules", "hillsborough", "lafayette", "larkspur", "livermore", "los altos", "los altos hills", "los gatos", "martinez", "menlo park", "mill valley", "millbrae", "milpitas", "monte sereno", "moraga", "morgan hill", "mountain view", "napa", "newark", "north fair oaks", "novato", "oakland", "oakley", "orinda", "pacifica", "palo alto", "petaluma", "piedmont", "pinole", "pittsburg", "pleasant hill", "pleasanton", "portola valley", "redwood city", "richmond", "rio vista", "rohnert park", "ross", "st. helena", "san anselmo", "san bruno", "san carlos", "san francisco", "san jose", "san leandro", "san mateo", "san pablo", "san rafael", "san ramon", "santa clara", "santa rosa", "saratoga", "sausalito", "sebastopol", "sonoma", "south san francisco", "suisun city", "sunnyvale", "tiburon", "union city", "vacaville", "vallejo", "walnut creek", "windsor", "woodside", "yountville"];

function submit() {
  // input checks
  var checkPass = true;

  var name = document.getElementById("name");
  var nameValue = document.getElementById("name").value;
  if (nameValue === "") {
    showError(name);
    alert("Please enter your name.");
    checkPass = false;
  }

  var email = document.getElementById("email");
  var emailValue = email.value;
  var splitEmailValue = emailValue.split("@");
  if (!(emailValue.endsWith("@my.smccd.edu") || emailValue.endsWith("@smccd.edu")) || splitEmailValue[0] == "") {
    console.log(splitEmailValue[0]);
    showError(email);
    alert("Please enter a valid SMCCD email address.");
    checkPass = false;
  }

  table = document.getElementById("schedule");
  var rows = table.getElementsByTagName("tr");

  for (var i = 1; i < rows.length; i++) {
      var cells = rows[i].getElementsByTagName("td");
      var startingLocation = cells[2].querySelector('input');
      var destination = cells[3].querySelector('input');
      var startingLocationValue = startingLocation.value.toLowerCase();
      var destinationValue = destination.value.toLowerCase();

      var index = locations.indexOf(startingLocationValue);
      var index1 = locations.indexOf(destinationValue);
      if (index === -1) {
          showError(startingLocation);
          alert("Please enter valid starting location(s) (SMCCD campus or Bay Area city).");
          checkPass = false;
      }
      if (index1 === -1) {
          showError(destination);
          alert("Please enter valid destination(s) (SMCCD campus or Bay Area city).");
          checkPass = false;
      }

      index = campuses.indexOf(startingLocationValue);
      index1 = campuses.indexOf(destinationValue);
      if (index === -1 && index1 === -1) {
          showError(startingLocation);
          showError(destination);
          alert("Either the starting location or the destination has to be an SMCCD campus.");
          checkPass = false;
      }

      if (startingLocationValue === destinationValue) {
          showError(startingLocation);
          showError(destination);
          alert("Starting location and destination cannot be the same.");
          checkPass = false;
      }
  }

  if (checkPass === true) {
    // - IMPLEMENT SERVER AND DATABASE
    // - search for user in database via email
    // - if user exists, update their schedule
    // - if user does not exist, create a new user and add their schedule
    // - delete database every semester!!
    for (var i = 1; i < rows.length; i++) {
      var cells = rows[i].getElementsByTagName("td");
      var startingLocation = cells[2].querySelector('input');
      var destination = cells[3].querySelector('input');
      var startingLocationValue = startingLocation.value.toLowerCase();
      var destinationValue = destination.value.toLowerCase();
      removeError(name);
      removeError(email);
      removeError(startingLocation);
      removeError(destination);
    }
    openTab('tab2');
  }
}

function showError(inputElement) {
  inputElement.style.border = '0.5px solid red';
}

function removeError(inputElement) {
  inputElement.style.border = 'none';
}

function connect() {
  // - output priority queue for either drivers or riders
  //   - priority queue...
  //     - for drivers inlcudes all RIDERS with same day, time, starting location, AND destination (same course/work title increases priority)
  //     - for riders includes all DRIVERS with same day, time, starting location, AND destination (same course/work title increases priority)
}
