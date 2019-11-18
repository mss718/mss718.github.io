//Yahtzee Script
//Mia Schiff
//11/6/19
var roll_button = document.getElementById('roll_button');
var dieArray = [];
var die1;
var die2;
var die3;
var die4;
var die5;
var grandTotal = 0;
var upperTotal = 0;
var lowerTotal = 0;
var dieArray;
var turnNum = 1;
var numOfRolls = 3;
var rollNumberElement = document.getElementById("rollNumber");
var userName = askName();
var acesValue;
var twosValue;
var threesValue;
var foursValue;
var fivesValue;
var sixesValue;
var threeOfaKindTotal;
var fourOfAKindTotal;
var largeStraight;
var yahtzeeValue;
var fullHouseTotal;
var smallStraight;


//function to ask name
function askName(){
  userName = prompt("What is your name:", "Name");
  if(userName == null){
    document.getElementById("yahtzeeHeader").innerHTML = '<h1>' + "A Stranger's Yahtzee Game </h1>"
    return "Stranger";
  }
  if (!/[^a-zA-Z]/.test(userName)){
    document.getElementById("yahtzeeHeader").innerHTML = '<h1>' + userName + "'s Yahtzee Game </h1>"
    if (localStorage.getItem(userName) === null) {

    }
    else{
      var feedback = document.getElementById("scoreFeedback");
      feedback.innerHTML = '<td bgcolor="#00FF00">Press "load" to continue your previous game or start playing a new game! </td>';

    }
  }
  else{
    askName();
  }


  return userName;

}//end of ask name function



//start over button
var startButtonElement = document.getElementById("start_button");
startButtonElement.addEventListener('click', function(){
  location.reload();
});//end of start over button


//Roll the dice button -->update dice array --> update number of rolls
roll_button.addEventListener('click', function(){
  if(numOfRolls > 0){
   numOfRolls--;
    dieArray = [];
    for(i = 0; i <5; i ++){
      var chooseDie = document.getElementById('die_' + i);
      if(chooseDie.getAttribute("class") == "reserved"){
        if(i == 0){
          dieArray.push(die1);
        }
        if(i == 1){
          dieArray.push(die2);
        }

        if(i == 2){
          dieArray.push(die3);
        }
        if(i == 3){
          dieArray.push(die4);
        }
        if(i == 4){
          dieArray.push(die5);
        }
      }

      if(chooseDie.getAttribute("class") == "notReserved"){
        var randomNumber = Math.floor(Math.random() * 6) + 1;
        var dieId = document.getElementById("die_" + i);
        dieId.innerHTML = '<img src= "images/' + randomNumber + '.svg" width="40/">';
        dieArray.push(randomNumber);
        if(i == 0){
          die1 = randomNumber;
        }
        if(i == 1){
          die2 = randomNumber;
        }
        if(i == 2){
          die3 = randomNumber;
        }
        if(i == 3){
          die4 = randomNumber;
        }
        if(i == 4){
          die5 = randomNumber;
        }

      }
    }
    rollNumberElement.innerHTML =  '<p id ="turnNumber">Number of Rolls Left: ' + numOfRolls + '</p>';

  }

});//end of roll dice button


//if clikced set die to reserved
for(i = 0; i<5; i++){
  var chooseDie = document.getElementById('die_' + i);
  chooseDie.addEventListener('click', function(){
    if(this.firstChild.getAttribute("src") != "images/mystery.svg"){
      this.setAttribute("class", "reserved");
    }
  });

}

//if double clicked set die to unreserved
for(i = 0; i<5; i++){
  var chooseDie = document.getElementById('die_' + i);
  chooseDie.addEventListener('dblclick', function(){
    this.setAttribute("class", "notReserved");

  });

}

//*************************************************************************DATA VALIDATION********************************************************************************************************
//upper section data validation
var inputName;
var feedback = document.getElementById("scoreFeedback");
for(i = 0; i <6; i ++){
  if(i == 0){
    var element = document.getElementById("aces_input");
  }
  if(i == 1){
    var element = document.getElementById("twos_input");
  }
  if(i == 2){
    var element = document.getElementById("threes_input");
  }
  if(i == 3){
    var element = document.getElementById("fours_input");
  }
  if(i == 4){
    var element = document.getElementById("fives_input");
  }
  if(i == 5){
    var element = document.getElementById("sixes_input");
  }


  element.addEventListener('keyup', function(e){
    if (e.keyCode === 13) {
      var numOfDie = 0;
      var category_score = this.parentNode.id.charAt(this.parentNode.id.length - 1);
      var value = this.value;
      for(i = 0; i<5; i++){
        if(dieArray[i] == category_score){
          numOfDie++;
        }
      }

      if(category_score * numOfDie == value || value == 0){
        if(dieArray.length >0){
        feedback.innerHTML = '<td bgcolor="#00FF00">That is a valid score. </td>';
        var sectionToGray = document.getElementById("section_" + category_score);
        sectionToGray.setAttribute("class", "used");
        inputToGray = document.getElementById("upper" + category_score);
        inputToGray.innerHTML =  this.value;
        var valueUpper = parseInt(this.value);
        grandTotal+=valueUpper;
        upperTotal+=valueUpper;
        reset();
      }
      else{
        feedback.innerHTML = '<td bgcolor="#FF0000">Please roll the dice before you enter a score. </td>';

      }
      }
      else{
        feedback.innerHTML = '<td bgcolor="#FF0000">That is not a valid score. Please try entering the correct value. </td>';

      }

      if(category_score == 1){
        acesValue = valueUpper;
      }
      else if(category_score == 2){
        twosValue = valueUpper;
      }
      else if(category_score == 3){
        threesValue = valueUpper;
      }
      else if(category_score == 4){
        foursValue = valueUpper;
      }
      else if(category_score == 5){
        fivesValue = valueUpper;
      }
      else if(category_score == 6){
        sixesValue = valueUpper;
      }
      //updating value variables to use for save and load later


    }
  })

} //end of upper section data validation


//yahtzee data validation
var yahtzeeElement = document.getElementById("yahtzeeInput");

//function to check if all die are equal
function allEqual(arr) {
  for(var i = 1; i < dieArray.length; i++)
  {
    if(dieArray[i] !== dieArray[0])
    return false;
  }
  return true;
}

yahtzeeElement.addEventListener('keyup', function(e){
  if (e.keyCode === 13) {
    if(allEqual(dieArray) || this.value == 0){
      if(dieArray.length > 0){
      if(this.value == 50){
        feedback.innerHTML = '<td bgcolor="#00FF00">That is a valid score. </td>';
        document.getElementById("yahtzeeSection").setAttribute("class", "used");
        document.getElementById("yahtzeeText").innerHTML = this.value;
        lowerTotal+=50;
        grandTotal+=50;
        yahtzeeValue = 50;
        reset();

      }
      else if(this.value == 0){
        feedback.innerHTML = '<td bgcolor="#00FF00">That is a valid score. </td>';
        document.getElementById("yahtzeeSection").setAttribute("class", "used");
        document.getElementById("yahtzeeText").innerHTML = this.value;
        yahtzeeValue = 0;
        reset();
      }

      else{
        feedback.innerHTML = '<td bgcolor="#FF0000">That is not a valid score. Please try entering the correct value. </td>';
      }
    }
    else{
        feedback.innerHTML = '<td bgcolor="#FF0000">Please roll the dice before you enter a score. </td>';
      }
    }
  }
    else{
      feedback.innerHTML = '<td bgcolor="#FF0000">That is not a valid score. Please try entering the correct value. </td>';
    }

}) //end of yahtzee score validation

//chance data validation
var chanceElement = document.getElementById("chance");
var chanceDieAddition = 0;

chanceElement.addEventListener('keyup', function(e){
  if (e.keyCode === 13) {
    for(i = 0; i<5; i++){
      chanceDieAddition += dieArray[i];
    }
    if(dieArray.length > 0){
    if(this.value == chanceDieAddition || this.value == 0){
      feedback.innerHTML = '<td bgcolor="#00FF00">That is a valid score. </td>';
      document.getElementById("chanceSection").setAttribute("class", "used");
      document.getElementById("chanceText").innerHTML = this.value;
      lowerTotal+=chanceDieAddition;
      grandTotal+=chanceDieAddition;
      reset();

    }
    else{
      feedback.innerHTML = '<td bgcolor="#FF0000">That is not a valid score. Please try entering the correct value. </td>';
    }
  }
  else{
    feedback.innerHTML = '<td bgcolor="#FF0000">Please roll the dice before you enter a score. </td>';

  }
  }
}); //end of chance data validation

//three of a kind data validation
var threeOfaKindElement = document.getElementById("threeOfaKindInput");

function threeEqual(arr) {
  var numOfAces = 0;
  var numOfTwos = 0;
  var numOfThrees = 0;
  var numOfFours = 0;
  var numOfFives= 0;
  var numOfSixes= 0;
  var arraySum = 0;
  for(i = 0; i<5; i++){
    if(arr[i] == 1){
      numOfAces++;
    }
    if(arr[i] == 2){
      numOfTwos++;
    }
    if(arr[i] == 3){
      numOfThrees++;
    }
    if(arr[i] == 4){
      numOfFours++;
    }
    if(arr[i] == 5){
      numOfFives++;
    }
    if(arr[i] == 6){
      numOfSixes++;
    }
  }

  if(numOfAces >= 3 || numOfTwos >= 3 || numOfThrees >= 3 || numOfFours >= 3 || numOfFives >= 3 || numOfSixes >= 3){
    for(i = 0; i<arr.length; i++){
      arraySum+=arr[i];
    }

  }
  return arraySum;

}
threeOfaKindElement.addEventListener('keyup', function(e){
  if (e.keyCode === 13) {
    var value = this.value;
if(dieArray.length > 0){
    if(threeEqual(dieArray) == value){
      feedback.innerHTML = '<td bgcolor="#00FF00">That is a valid score. </td>';
      document.getElementById("threeOfaKindSection").setAttribute("class", "used");
      document.getElementById("threeOfAKindText").innerHTML = threeEqual(dieArray);
      lowerTotal+=threeEqual(dieArray);
      grandTotal+=threeEqual(dieArray);
      threeOfaKindTotal = threeEqual(dieArray);
      reset();

    }
    else{
      feedback.innerHTML = '<td bgcolor="#FF0000">That is not a valid score. Please try entering the correct value. </td>';
    }
  }
  else{
    feedback.innerHTML = '<td bgcolor="#FF0000">Please roll the dice before you enter a score. </td>';

  }
  }
}) //end of three of a kind data validation

//full house data validation
var fullHouseElement = document.getElementById("fullHouseInput");
// I used JSON.stringify to be able to use == to check equality because that does not work with an array but it does with a string
function fullHouse(arr){
  arr = arr.sort();
  for(i = 0; i < arr.length; i++)
  if(JSON.stringify(arr[0]) == JSON.stringify(arr[1]) && JSON.stringify(arr[1]) != JSON.stringify(arr[2]) && JSON.stringify(arr[2]) == JSON.stringify(arr[3]) && JSON.stringify(arr[3]) == JSON.stringify(arr[4])){
    return true;
  }
  else if(JSON.stringify(arr[0]) == JSON.stringify(arr[1]) && JSON.stringify(arr[1]) == JSON.stringify(arr[2]) && JSON.stringify(arr[2]) != JSON.stringify(arr[3]) && JSON.stringify(arr[3]) == JSON.stringify(arr[4])){
    return true;
  }
  else {
    return false;
  }
}

fullHouseElement.addEventListener('keyup', function(e){
  if (e.keyCode === 13) {
    var value = this.value;

if(dieArray.length > 0){
    if(fullHouse(dieArray) && value == 25){
      feedback.innerHTML = '<td bgcolor="#00FF00">That is a valid score. </td>';
      document.getElementById("fullHouseSection").setAttribute("class", "used");
      document.getElementById("fullHouseText").innerHTML = 25;
      lowerTotal+=25;
      grandTotal+=25;
      fullHouseTotal = 25;
      reset();

    }
    else if(value == 0){
      feedback.innerHTML = '<td bgcolor="#00FF00">That is a valid score. </td>';
      document.getElementById("fullHouseSection").setAttribute("class", "used");
      document.getElementById("fullHouseText").innerHTML = 0;
      fullHouseTotal = 0;
      reset();
    }
    else{
      feedback.innerHTML = '<td bgcolor="#FF0000">That is not a valid score. Please try entering the correct value. </td>';

    }
  }
  else{
    feedback.innerHTML = '<td bgcolor="#FF0000">Please roll the dice before you enter a score. </td>';

  }

  }

}) //end of full house of a kind data validation

//four of a kind data validation
var fourOfaKindElement = document.getElementById("fourOfaKindInput");

function fourEqual(arr) {
  var numOfAces = 0;
  var numOfTwos = 0;
  var numOfThrees = 0;
  var numOfFours = 0;
  var numOfFives= 0;
  var numOfSixes= 0;
  var arraySum = 0;
  for(i = 0; i<5; i++){
    if(arr[i] == 1){
      numOfAces++;
    }
    if(arr[i] == 2){
      numOfTwos++;
    }
    if(arr[i] == 3){
      numOfThrees++;
    }
    if(arr[i] == 4){
      numOfFours++;
    }
    if(arr[i] == 5){
      numOfFives++;
    }
    if(arr[i] == 6){
      numOfSixes++;
    }
  }

  if(numOfAces >= 4 || numOfTwos >= 4 || numOfThrees >= 4 || numOfFours >= 4 || numOfFives >= 4 || numOfSixes >= 4){
    for(i = 0; i<arr.length; i++){
      arraySum+=arr[i];
    }

  }
  return arraySum;

}
fourOfaKindElement.addEventListener('keyup', function(e){
  if (e.keyCode === 13) {
    var value = this.value;
if(dieArray.length > 0){
    if(fourEqual(dieArray) == value){
      feedback.innerHTML = '<td bgcolor="#00FF00">That is a valid score. </td>';
      document.getElementById("fourOfaKindSection").setAttribute("class", "used");
      document.getElementById("fourOfaKindText").innerHTML = fourEqual(dieArray);

      lowerTotal+=fourEqual(dieArray);
      grandTotal+=fourEqual(dieArray);
      fourOfAKindTotal = fourEqual(dieArray);
      reset();

    }

    else{
      feedback.innerHTML = '<td bgcolor="#FF0000">That is not a valid score. Please try entering the correct value. </td>';

    }
  }
  else{
    feedback.innerHTML = '<td bgcolor="#FF0000">Please roll the dice before you enter a score. </td>';

  }

  }

}) //end of four of a kind data validation

//large straight validation
var lgStraightElement = document.getElementById("lgStraight");
var lgStraight1 = [1,2,3,4,5];
var lgStraight2 = [2,3,4,5,6];

lgStraightElement.addEventListener('keyup', function(e){
  if (e.keyCode === 13) {
    dieArray = dieArray.sort();
    if(dieArray.length > 0){
    if(JSON.stringify(dieArray) == JSON.stringify(lgStraight1) || JSON.stringify(dieArray) == JSON.stringify(lgStraight2) || this.value == 0){
      if(this.value == 40){
        feedback.innerHTML = '<td bgcolor="#00FF00">That is a valid score. </td>';
        document.getElementById("lgStraightSection").setAttribute("class", "used");
        document.getElementById("lgStraightText").innerHTML = this.value;

        grandTotal+=40;
        lowerTotal+=40;
        largeStraight = 40;
        reset();
      }
      else if(this.value == 0){
        feedback.innerHTML = '<td bgcolor="#00FF00">That is a valid score. </td>';
        document.getElementById("lgStraightSection").setAttribute("class", "used");
        document.getElementById("lgStraightText").innerHTML = this.value;
        largeStraight = 0;
        reset();
      }
    }
    else{
      feedback.innerHTML = '<td bgcolor="#FF0000">That is not a valid score. Please try entering the correct value. </td>';

    }
  }
  else {
    feedback.innerHTML = '<td bgcolor="#FF0000">Please roll the dice before you enter a score. </td>';

  }

  }
}) //end of lg straight score validation

//small straight validation
var smStraightElement = document.getElementById("smStraight");

function smStraight(arr){
  arr = arr.sort();
  var sequenceLength=1;
  var lastDie=arr[0];

  if (arr[0] >= 4 || arr[4] <= 3){
    return false;
  }
  for (i = 1; i < 5; i++) {
    if (arr[i] == lastDie+1){
      sequenceLength++;
    }
    else if (arr[i] == lastDie){}
    else{
      sequenceLength=1;
    }

    if (sequenceLength >=4){
      return true;
    }

    lastDie = arr[i];
  }
  return false;

}

smStraightElement.addEventListener('keyup', function(e){
  if (e.keyCode === 13) {
    dieArray = dieArray.sort();
    if(dieArray.length > 0){
    if(smStraight(dieArray) && this.value == 30){
      feedback.innerHTML = '<td bgcolor="#00FF00">That is a valid score. </td>';
      document.getElementById("smStraightSection").setAttribute("class", "used");
      document.getElementById("smStraightText").innerHTML = this.value;

      grandTotal+=30;
      lowerTotal+=30;
      smallStraight = 30;
      reset();
    }
    else if(this.value == 0){
      feedback.innerHTML = '<td bgcolor="#00FF00">That is a valid score. </td>';
      document.getElementById("smStraightSection").setAttribute("class", "used");
      document.getElementById("smStraightText").innerHTML = this.value;
      smallStraight = 0;
      reset();
    }

    else{
      feedback.innerHTML = '<td bgcolor="#FF0000">That is not a valid score. Please try entering the correct value. </td>';

    }
  }
  else{
    feedback.innerHTML = '<td bgcolor="#FF0000">Please roll the dice before you enter a score. </td>';

  }
  }

}); //end of sm straight score validation

//*************************************************************************END OF DATA VALIDATION********************************************************************************************************

//Updating totals and bonus
var bonusAdded = false;
var bonus = 0;

document.body.addEventListener( 'keyup', function (e) {
  if ( e.keyCode == 13 ) {
    if(upperTotal >= 63 && bonusAdded == false){
      bonusAdded = true;
      grandTotal+=35;
      upperTotal+=35;
      bonus+=35;
      document.getElementById("bonusText").innerHTML = "<td>" + 35 + "</td>"

    }

    document.getElementById("totalScoreUpperNoBonus").innerHTML = "<td>" + (upperTotal - bonus) + "</td>"
    document.getElementById("upperTotalNumber1").innerHTML = "<td>" + upperTotal + "</td>"
    document.getElementById("upperTotalNumber2").innerHTML = "<td>" + upperTotal + "</td>"
    document.getElementById("lowerTotalNumber").innerHTML = "<td>" + lowerTotal + "</td>"
    document.getElementById("grandTotalNumber").innerHTML = "<td>" + grandTotal + "</td>"


  }
}); //end of updating totals and bonus

var turnNumberElement = document.getElementById("turnNumber");
//reset function performed after every successful data validation
function reset(){
  turnNum++;

  if(turnNum == 14){
    restartGame();
  }

  numOfRolls = 3;
  for(i = 0; i < 5; i++){
    var dieId = document.getElementById("die_" + i);
    dieId.innerHTML = '<img src= "images/mystery.svg" width="40/">';
    dieId.setAttribute("class", "notReserved");
  }
  turnNumberElement.innerHTML =  '<p id ="turnNumber">Turn Number: ' + turnNum + '</p>';
  rollNumberElement.innerHTML =  '<p id ="turnNumber">Number of Rolls Left: ' + numOfRolls + '</p>';
  dieArray = [];
}//end of reset function

//restearGame function
function restartGame(){
  var feedback = document.getElementById("scoreFeedback");
  numOfRolls =0;
  feedback.innerHTML = '<td bgcolor="#00FF00">Congratulations! Your final score is ' + grandTotal + '. Press Start Over to begin again.</td>';

}//end of restartGame function

//save button
var saveButtonElement = document.getElementById("save_button");
saveButtonElement.addEventListener('click', function(){
  var userGame = {
    name:userName,
    turnNumber: turnNum,
    numberOfRolls: numOfRolls,
    dice: dieArray,
    aceTotal: acesValue,
    twosTotal: twosValue,
    threesTotal: threesValue,
    foursTotal: foursValue,
    fivesTotal: fivesValue,
    sixesTotal: sixesValue,
    chanceTotal: chanceDieAddition,
    totalUpperScore: (upperTotal - bonus),
    upperTotal: upperTotal,
    lowerTotal: lowerTotal,
    grandTotal: grandTotal,
    bonus: bonus,
    threeOfaKind: threeOfaKindTotal,
    fourOfaKind: fourOfAKindTotal,
    largeStraight: largeStraight,
    yahtzeeValue: yahtzeeValue,
    fullHouse: fullHouseTotal,
    smallStraight: smallStraight


  }
  localStorage.setItem(userName,JSON.stringify(userGame));


});//end of save button

//load button
var loadButtonElement = document.getElementById("load_button");
loadButtonElement.addEventListener('click', function(){
  var userGameObject = JSON.parse(localStorage.getItem(userName));
  if(userGameObject == null){
    var feedback = document.getElementById("scoreFeedback");
    feedback.innerHTML = '<td bgcolor="#ff0000">You have no saved games to load. Press Start Over.</td>';  }

    if(userGameObject.dice.length >0){
      for(i = 0; i < 5; i++){
        var dieId = document.getElementById("die_" + i);
        dieId.innerHTML = '<img src= "images/' + userGameObject.dice[i] + '.svg" width="40/">';
      //  dieId.setAttribute("class", "notReserved");
      }
    }
    else{
      for(i = 0; i < 5; i++){
        var dieId = document.getElementById("die_" + i);
        dieId.innerHTML = '<img src= "images/mystery.svg" width="40/">';
        dieId.setAttribute("class", "notReserved");

      }
    }

    turnNum = userGameObject.turnNumber;
    numOfRolls = userGameObject.numberOfRolls;
    acesValue = userGameObject.aceTotal;
    twosValue = userGameObject.twosTotal;
    threesValue = userGameObject.threesTotal;
    foursValue = userGameObject.foursTotal;
    fivesValue = userGameObject.fivesTotal;
    sixesValue = userGameObject.sixesTotal;
    grandTotal = userGameObject.grandTotal;
    upperTotal = userGameObject.upperTotal;
    lowerTotal = userGameObject.lowerTotal;
    threeOfaKindTotal = userGameObject.threeOfaKind;
    fourOfAKindTotal = userGameObject.fourOfaKind;
    chanceDieAddition= userGameObject.chanceTotal;
    yahtzeeValue = userGameObject.yahtzeeValue;
    largeStraight = userGameObject.largeStraight;
    fullHouseTotal = userGameObject.fullHouse;
    smallStraight = userGameObject.smallStraight;
    bonus = userGameObject.bonus;
    update();

  }); //end of load button

//update function
function update(){
  document.getElementById("yahtzeeHeader").innerHTML = '<h1>' + userName + "'s Yahtzee Game </h1>"
  turnNumberElement.innerHTML =  '<p id ="turnNumber">Turn Number: ' + turnNum + '</p>';
  rollNumberElement.innerHTML =  '<p id ="turnNumber">Number of Rolls Left: ' + numOfRolls + '</p>';
  document.getElementById("totalScoreUpperNoBonus").innerHTML = "<td>" + (upperTotal - bonus) + "</td>"
  document.getElementById("upperTotalNumber1").innerHTML = "<td>" + upperTotal + "</td>"
  document.getElementById("upperTotalNumber2").innerHTML = "<td>" + upperTotal + "</td>"
  document.getElementById("lowerTotalNumber").innerHTML = "<td>" + lowerTotal + "</td>"
  document.getElementById("grandTotalNumber").innerHTML = "<td>" + grandTotal + "</td>"


  if(typeof acesValue !== 'undefined'){
    document.getElementById("upper1").innerHTML =  acesValue;
    document.getElementById("section_1").setAttribute("class", "used");
  }

  if(typeof twosValue !== 'undefined'){
    document.getElementById("upper2").innerHTML =  twosValue;
    document.getElementById("section_2").setAttribute("class", "used");

  }

  if(typeof threesValue !== 'undefined'){
    document.getElementById("upper3").innerHTML =  threesValue;
    document.getElementById("section_3").setAttribute("class", "used");

  }

  if(typeof foursValue !== 'undefined'){
    document.getElementById("upper4").innerHTML =  foursValue;
    document.getElementById("section_4").setAttribute("class", "used");

  }

  if(typeof fivesValue !== 'undefined'){
    document.getElementById("upper5").innerHTML =  fivesValue;
    document.getElementById("section_5").setAttribute("class", "used");

  }

  if(typeof sixesValue !== 'undefined'){
    document.getElementById("upper6").innerHTML = sixesValue;
    document.getElementById("section_6").setAttribute("class", "used");

  }


  if(typeof threeOfaKindTotal !== 'undefined'){
    document.getElementById("threeOfAKindText").innerHTML = threeOfaKindTotal;
    document.getElementById("threeOfaKindSection").setAttribute("class", "used");

  }

  if(typeof fourOfAKindTotal !== 'undefined'){
    document.getElementById("fourOfaKindText").innerHTML = fourOfAKindTotal;
    document.getElementById("fourOfaKindSection").setAttribute("class", "used");

  }
  if(typeof chanceDieAddition !== 'undefined' && chanceDieAddition != 0){
    document.getElementById("chanceText").innerHTML = chanceDieAddition;
    document.getElementById("chanceSection").setAttribute("class", "used");

  }

  if(typeof largeStraight !== 'undefined'){
    document.getElementById("lgStraightText").innerHTML = largeStraight;
    document.getElementById("lgStraightSection").setAttribute("class", "used");

  }

  if(typeof yahtzeeValue !== 'undefined'){
    document.getElementById("yahtzeeText").innerHTML = yahtzeeValue;
    document.getElementById("yahtzeeSection").setAttribute("class", "used");

  }

  if(typeof fullHouseTotal !== 'undefined'){
    document.getElementById("fullHouseText").innerHTML = fullHouseTotal;
    document.getElementById("fullHouseSection").setAttribute("class", "used");

  }

  if(typeof smallStraight !== 'undefined'){
    document.getElementById("smStraightText").innerHTML = smallStraight;
    document.getElementById("smStraightSection").setAttribute("class", "used");
  }

  if(typeof bonus !== 'undefined'){
    document.getElementById("bonusText").innerHTML = bonus;
  }

}//end of update function
