
var sampleObj = genSampleData();
var lastDay = -1;
for (var key in sampleObj) {
    if (!sampleObj.hasOwnProperty(key)) continue;
    var obj = sampleObj[key];
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(obj.epoch);
    if(d.getDay()>lastDay){
        lastDay = d.getDay();
        console.log("New Day : "+d.toString());
    }
    //dataArray.push([d, obj.hr, obj.hrDev])
}
// var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
// d.setUTCSeconds(epoch);

function genSampleData() {
    var startUtc = Math.floor((new Date()).getTime() / 1000);
    var lastUtc;
    var historyObject = {};
    var timeIncriment = 300;
    var samplesPerDay = 288; // at 300 seconds interval
    var maxSamples = 512;
    var maxStepsPerInterval = 60;
    var currentSteps = 0;
    var maxHR = 180;
    var maxHRDev = 30;
    var startingBattVolts = 4.20;
    var currentBattVolts;
    var voltsPerSample = 0.00625;

    lastUtc = startUtc;
    currentBattVolts = startingBattVolts;

    for (var i = 0; i < maxSamples; i++) {
        currentSteps = getSteps(currentSteps,maxStepsPerInterval);
        currentBattVolts = getBatteryVoltage(currentBattVolts,voltsPerSample);
        if(currentBattVolts<3.3){
            currentBattVolts = startingBattVolts;
        }
        var newSample = {
            "epoch": lastUtc, // unix timestamp
            "steps": currentSteps,
            "hr": getHR(maxHR),
            "hrDev": getHRDev(maxHRDev),
            "batt": currentBattVolts,
            "aux1": getAux(),
            "aux2": getAux(),
            "aux3": getAux()
        }
        historyObject[lastUtc] = newSample;
        lastUtc += timeIncriment;
    }
    //console.log(JSON.stringify(historyObject));
    return historyObject;
}


function getSteps(steps,maxStepsPerInterval) {
    var newSteps = getRandomInt(0, maxStepsPerInterval);
    return steps + newSteps;
}

function getHR(maxHR) {
    return getRandomInt(0, maxHR);
}

function getHRDev(maxHRDev) {
    return getRandomInt(0, maxHRDev);
}

function getBatteryVoltage(volts,voltsPerSample) {
    var battDecrease = getRandomArbitrary(0, voltsPerSample);
    return (volts - battDecrease).toFixed(3);
}

function getAux() {
    return getRandomInt(0, 255);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
