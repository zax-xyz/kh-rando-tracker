var roxCounter = 0;
var twilightCounter = 0;
var hollowCounter = 0;
var lodCounter = 0;
var olympusCounter = 0;
var beastCounter = 0;
var portCounter = 0;
var agrabahCounter = 0;
var halloweenCounter = 0;
var prideCounter = 0;
var disneyCounter = 0;
var spaceCounter = 0;
var twtnwCounter = 0;
var atlanticaCounter = 0;
var hundredCounter = 0;
var valorCounter = 0;
var wisdomCounter = 0;
var limitCounter = 0;
var masterCounter = 0;
var finalCounter = 0;
var fireCounter = 0;
var blizzardCounter = 0;
var thunderCounter = 0;
var cureCounter = 0;
var reflectCounter = 0;
var magnetCounter = 0;
var nonExistingCounter = 0;
var promiseCounter = 0;
var connectionsCounter = 0;
var tranquilCounter = 0;


function displayRox() {
  if (roxCounter % 2 == 0) {
    $("#Roxas").removeClass("opaque");
  }
  else if (roxCounter % 2 == 1) {
    $("#Roxas").addClass("opaque");
  }
  roxCounter++;
}

function displayTwilight() {
  if (twilightCounter % 4 == 0) {
    $("#twilight").removeClass("opaque");
  }
  else if (twilightCounter % 4 == 1) {
    $("#twilight2").removeClass("hidden");
  }
  else if (twilightCounter % 4 == 2) {
    $("#twilight2").addClass("hidden");
    $("#twilight3").removeClass("hidden");
  }
  else if (twilightCounter % 4 == 3) {
    $("#twilight3").addClass("hidden");
    $("#twilight").addClass("opaque");
  }
  twilightCounter++;
}

function displayHollow() {
  if (hollowCounter % 4 == 0) {
    $("#hollow").removeClass("opaque");
  }
  else if (hollowCounter % 4 == 1) {
    $("#hollow2").removeClass("hidden");
  }
  else if (hollowCounter % 4 == 2) {
    $("#hollow2").addClass("hidden");
    $("#hollow3").removeClass("hidden");
  }
  else if (hollowCounter % 4 == 3) {
    $("#hollow3").addClass("hidden");
    $("#hollow").addClass("opaque");
  }
  hollowCounter++;
}

function displayLod() {
  if (lodCounter % 3 == 0) {
    $("#lod").removeClass("opaque");
  }
  else if (lodCounter % 3 == 1) {
    $("#lod2").removeClass("hidden");
  }
  else if (lodCounter % 3 == 2) {
    $("#lod2").addClass("hidden");
    $("#lod").addClass("opaque");
  }
  lodCounter++;
}

function displayOlympus() {
  if (olympusCounter % 3 == 0) {
    $("#olympus").removeClass("opaque");
  }
  else if (olympusCounter % 3 == 1) {
    $("#olympus2").removeClass("hidden");
  }
  else if (olympusCounter % 3 == 2) {
    $("#olympus2").addClass("hidden");
    $("#olympus").addClass("opaque");
  }
  olympusCounter++;
}

function displayCastle() {
  if (beastCounter % 3 == 0) {
    $("#beastCastle").removeClass("opaque");
  }
  else if (beastCounter % 3 == 1) {
    $("#beastCastle2").removeClass("hidden");
  }
  else if (beastCounter % 3 == 2) {
    $("#beastCastle2").addClass("hidden");
    $("#beastCastle").addClass("opaque");
  }
  beastCounter++;
}

function displayPort() {
  if (portCounter % 3 == 0) {
    $("#portRoyale").removeClass("opaque");
  }
  else if (portCounter % 3 == 1) {
    $("#portRoyale2").removeClass("hidden");
  }
  else if (portCounter % 3 == 2) {
    $("#portRoyale2").addClass("hidden");
    $("#portRoyale").addClass("opaque");
  }
  portCounter++;
}

function displayAgrabah() {
  if (agrabahCounter % 3 == 0) {
    $("#agrabah").removeClass("opaque");
  }
  else if (agrabahCounter % 3 == 1) {
    $("#agrabah2").removeClass("hidden");
  }
  else if (agrabahCounter % 3 == 2) {
    $("#agrabah2").addClass("hidden");
    $("#agrabah").addClass("opaque");
  }
  agrabahCounter++;
}

function displayHalloween() {
  if (halloweenCounter % 3 == 0) {
    $("#halloweenTown").removeClass("opaque");
  }
  else if (halloweenCounter % 3 == 1) {
    $("#halloweenTown2").removeClass("hidden");
  }
  else if (halloweenCounter % 3 == 2) {
    $("#halloweenTown2").addClass("hidden");
    $("#halloweenTown").addClass("opaque");
  }
  halloweenCounter++;
}

function displayPride() {
  if (prideCounter % 3 == 0) {
    $("#prideLands").removeClass("opaque");
  }
  else if (prideCounter % 3 == 1) {
    $("#prideLands2").removeClass("hidden");
  }
  else if (prideCounter % 3 == 2) {
    $("#prideLands2").addClass("hidden");
    $("#prideLands").addClass("opaque");
  }
  prideCounter++;
}

function displayDisney() {
  if (disneyCounter % 2 == 0) {
    $("#disneyCastle").removeClass("opaque");
  }
  else if (disneyCounter % 2 == 1) {
    $("#disneyCastle").addClass("opaque");
  }
  disneyCounter++;
}

function displaySpace() {
  if (spaceCounter % 3 == 0) {
    $("#spaceParanoids").removeClass("opaque");
  }
  else if (spaceCounter % 3 == 1) {
    $("#spaceParanoids2").removeClass("hidden");
  }
  else if (spaceCounter % 3 == 2) {
    $("#spaceParanoids2").addClass("hidden");
    $("#spaceParanoids").addClass("opaque");
  }
  spaceCounter++;
}

function displayTwtnw() {
  if (twtnwCounter % 2 == 0) {
    $("#twtnw").removeClass("opaque");
  }
  else if (twtnwCounter % 2 == 1) {
    $("#twtnw").addClass("opaque");
  }
  twtnwCounter++;
}

function displayAtlantica() {
  if (atlanticaCounter % 6 == 0) {
    $("#atlantica").removeClass("opaque");
  }
  else if (atlanticaCounter % 6 == 1) {
    $("#atlantica2").removeClass("hidden");
  }
  else if (atlanticaCounter % 6 == 2) {
    $("#atlantica2").addClass("hidden");
    $("#atlantica3").removeClass("hidden");
  }
  else if (atlanticaCounter % 6 == 3) {
    $("#atlantica3").addClass("hidden");
    $("#atlantica4").removeClass("hidden");
  }
  else if (atlanticaCounter % 6 == 4) {
    $("#atlantica4").addClass("hidden");
    $("#atlantica5").removeClass("hidden");
  }
  else if (atlanticaCounter % 6 == 5) {
    $("#atlantica5").addClass("hidden");
    $("#atlantica").addClass("opaque");
  }
  atlanticaCounter++;
}

function displayHundred() {
  if (hundredCounter % 7 == 0) {
    $("#hundredAcres").removeClass("opaque");
  }
  else if (hundredCounter % 7 == 1) {
    $("#hundredAcres2").removeClass("hidden");
  }
  else if (hundredCounter % 7 == 2) {
    $("#hundredAcres2").addClass("hidden");
    $("#hundredAcres3").removeClass("hidden");
  }
  else if (hundredCounter % 7 == 3) {
    $("#hundredAcres3").addClass("hidden");
    $("#hundredAcres4").removeClass("hidden");
  }
  else if (hundredCounter % 7 == 4) {
    $("#hundredAcres4").addClass("hidden");
    $("#hundredAcres5").removeClass("hidden");
  }
  else if (hundredCounter % 7 == 5) {
    $("#hundredAcres5").addClass("hidden");
    $("#hundredAcres6").removeClass("hidden");
  }
  else if (hundredCounter % 7 == 6) {
    $("#hundredAcres6").addClass("hidden");
    $("#hundredAcres").addClass("opaque");
  }
  hundredCounter++;
}

function displayValor() {
  if (valorCounter % 2 == 0) {
    $("#valorForm").removeClass("opaque");
  }
  else if (valorCounter % 2 == 1) {
    $("#valorForm").addClass("opaque");
  }
  valorCounter++;
}

function displayWisdom() {
  if (wisdomCounter % 2 == 0) {
    $("#wisdomForm").removeClass("opaque");
  }
  else if (wisdomCounter % 2 == 1) {
    $("#wisdomForm").addClass("opaque");
  }
  wisdomCounter++;
}

function displayLimit() {
  if (limitCounter % 2 == 0) {
    $("#limitForm").removeClass("opaque");
  }
  else if (limitCounter % 2 == 1) {
    $("#limitForm").addClass("opaque");
  }
  limitCounter++;
}

function displayMaster() {
  if (masterCounter % 2 == 0) {
    $("#masterForm").removeClass("opaque");
  }
  else if (masterCounter % 2 == 1) {
    $("#masterForm").addClass("opaque");
  }
  masterCounter++;
}

function displayFinal() {
  if (finalCounter % 2 == 0) {
    $("#finalForm").removeClass("opaque");
  }
  else if (finalCounter % 2 == 1) {
    $("#finalForm").addClass("opaque");
  }
  finalCounter++;
}

function displayFire() {
  if (fireCounter % 4 == 0) {
    $("#fire").removeClass("opaque");
  }
  else if (fireCounter % 4 == 1) {
    $("#fire2").removeClass("hidden");
  }
  else if (fireCounter % 4 == 2) {
    $("#fire2").addClass("hidden");
    $("#fire3").removeClass("hidden");
  }
  else if (fireCounter % 4 == 3) {
    $("#fire3").addClass("hidden");
    $("#fire").addClass("opaque");
  }
  fireCounter++;
}

function displayBlizzard() {
  if (blizzardCounter % 4 == 0) {
    $("#blizzard").removeClass("opaque");
  }
  else if (blizzardCounter % 4 == 1) {
    $("#blizzard2").removeClass("hidden");
  }
  else if (blizzardCounter % 4 == 2) {
    $("#blizzard2").addClass("hidden");
    $("#blizzard3").removeClass("hidden");
  }
  else if (blizzardCounter % 4 == 3) {
    $("#blizzard3").addClass("hidden");
    $("#blizzard").addClass("opaque");
  }
  blizzardCounter++;
}

function displayThunder() {
  if (thunderCounter % 4 == 0) {
    $("#thunder").removeClass("opaque");
  }
  else if (thunderCounter % 4 == 1) {
    $("#thunder2").removeClass("hidden");
  }
  else if (thunderCounter % 4 == 2) {
    $("#thunder2").addClass("hidden");
    $("#thunder3").removeClass("hidden");
  }
  else if (thunderCounter % 4 == 3) {
    $("#thunder3").addClass("hidden");
    $("#thunder").addClass("opaque");
  }
  thunderCounter++;
}

function displayCure() {
  if (cureCounter % 4 == 0) {
    $("#cure").removeClass("opaque");
  }
  else if (cureCounter % 4 == 1) {
    $("#cure2").removeClass("hidden");
  }
  else if (cureCounter % 4 == 2) {
    $("#cure2").addClass("hidden");
    $("#cure3").removeClass("hidden");
  }
  else if (cureCounter % 4 == 3) {
    $("#cure3").addClass("hidden");
    $("#cure").addClass("opaque");
  }
  cureCounter++;
}

function displayReflect() {
  if (reflectCounter % 4 == 0) {
    $("#reflect").removeClass("opaque");
  }
  else if (reflectCounter % 4 == 1) {
    $("#reflect2").removeClass("hidden");
  }
  else if (reflectCounter % 4 == 2) {
    $("#reflect2").addClass("hidden");
    $("#reflect3").removeClass("hidden");
  }
  else if (reflectCounter % 4 == 3) {
    $("#reflect3").addClass("hidden");
    $("#reflect").addClass("opaque");
  }
  reflectCounter++;
}

function displayMagnet() {
  if (magnetCounter % 4 == 0) {
    $("#magnet").removeClass("opaque");
  }
  else if (magnetCounter % 4 == 1) {
    $("#magnet2").removeClass("hidden");
  }
  else if (magnetCounter % 4 == 2) {
    $("#magnet2").addClass("hidden");
    $("#magnet3").removeClass("hidden");
  }
  else if (magnetCounter % 4 == 3) {
    $("#magnet3").addClass("hidden");
    $("#magnet").addClass("opaque");
  }
  magnetCounter++;
}

function displayNonExistent() {
  if (nonExistingCounter % 2 == 0) {
    $("#nonExistent").removeClass("opaque");
  }
  else if (nonExistingCounter % 2 == 1) {
    $("#nonExistent").addClass("opaque");
  }
  nonExistingCounter++;
}

function displayPromise() {
  if (promiseCounter % 2 == 0) {
    $("#promise").removeClass("opaque");
  }
  else if (promiseCounter % 2 == 1) {
    $("#promise").addClass("opaque");
  }
  promiseCounter++;
}

function displayConnections() {
  if (connectionsCounter % 2 == 0) {
    $("#connections").removeClass("opaque");
  }
  else if (connectionsCounter % 2 == 1) {
    $("#connections").addClass("opaque");
  }
  connectionsCounter++;
}

function displayTranquil() {
  if (tranquilCounter % 2 == 0) {
    $("#tranquil").removeClass("opaque");
  }
  else if (tranquilCounter % 2 == 1) {
    $("#tranquil").addClass("opaque");
  }
  tranquilCounter++;
}
