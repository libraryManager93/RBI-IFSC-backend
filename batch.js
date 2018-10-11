const {Builder, By, Key, until} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const { Options } = require('selenium-webdriver/chrome');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const jsonQuery = require('json-query')

const downloadFolder = 'H:/myProjects/RBI IFSC node batch/bankExcels';
var banks;

(async function example() {

//Converting to JSON
	const result = await excelToJson({
    sourceFile: 'H:/myProjects/RBI IFSC node batch/bankExcels/IFCB2009_46.xlsx',
    header:{
        rows: 1
    },
    columnToKey: {
      A: "BANK",
      B: "IFSC",
      C: "MICR",
      D: "BRANCH",
      E: "ADDRESS",
      F: "CONTACT",
      G: "CITY",
      H: "DISTRICT",
      I: "STATE"
    }
});
	console.log('JSON file is--------->'+JSON.stringify(result));
	var bankDetails={};
	bankDetails.bankDetails=result[Object.keys(result)[0]];

 //copying result content to file
 const data = new Uint8Array(Buffer.from(JSON.stringify(bankDetails)));
 fs.writeFile('H:/myProjects/RBI IFSC node batch/bankExcels/kotak.txt', data, (err) => {
  if (err) console.log(err);
  console.log('The file has been saved!');
});
	
  let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(
	new chrome.Options()
        .setUserPreferences({'download.default_directory': downloadFolder})
		)
    .build();
  try {
	  console.log('opening web...........');
	  /*
    await driver.get('https://www.rbi.org.in/Scripts/bs_viewcontent.aspx?Id=2009');
    //await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('Reserve Bank of India - Database'), 1000);
	
	var tableCells = driver.findElements(By.className('tablebg'));

	tableCells .then(function (elements) {
		
		elements[1].getText().then(function(txt){
			banks=txt;
			//console.log('Printing banks.............'+banks );
			console.log(banks.split("\n"));
			banks=banks.split("\n");
			banks.forEach(function(bank) {

			(driver.findElement(By.linkText(bank))).getAttribute('href').then(function(stbankLinks){
			console.log('printing link--->'+stbankLinks);
			//driver.executeScript('window.open("'+stbankLinks+'");');
			});
			});
	});
		
	});
	

*/
	
  } finally {
    //await driver.quit();
  }
})();