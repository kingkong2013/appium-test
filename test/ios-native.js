import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import wd from 'wd';  
import common from './wd-extend-function.js';

let should = chai.should();
chai.use(chaiAsPromised);
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

let port = 4723;
let driver = wd.promiseChainRemote('localhost', port);
common(wd);
let asserters = wd.asserters;

describe('StubHub App Test', function () {
    this.timeout(3 * 60 * 1000);
    before(async () => {
        try {
            await driver.init({
                deviceName: 'iPhone 7',
                platformName: 'iOS',
                app: 'http://172.27.51.41:8080/StubHub0424.app.zip',
                automationName: 'XCUITest',
                newCommandTimeout: '600'
            });
        } catch (err) {
            should.not.exist('Error connecting to Appium!', err);
        }
    });

    it('#1 should go to home page', async () => {
        try {
            driver.setImplicitWaitTimeout(30 * 1000);
            await driver.gotoHomePage().customSaveScreenshot();

        } catch (e) {
            should.not.exist('Error during test!', e);
        }
    });

    it('#2 should go into location page', async () => {
        try {
            await driver
                .waitForElementByName('LocationPickerButton')
                .click()
                .sleep(1000)
                .customSaveScreenshot()
                .waitForElementByXPath("//*[@name='LocationPickerSearchField']")
                .click()
                .sendKeys('San Francisco')
                .sleep(2000)
                .customSaveScreenshot()
                .waitForElementsByXPath('//XCUIElementTypeTable[1]/XCUIElementTypeCell')
                .then(function (els) {
                    return els[0];
                })
                .click()
                .sleep(1000)
                .customSaveScreenshot()
                .waitForElementByXPath('//*[@name="Done"]')
                .click()
                .sleep(2000)
        } catch (err) {
            should.not.exist('Error during test!', err);
        }
    });

    it('#3 should go into date page', async () => {
        try {
            await driver
            .waitForElementByName('PickDateButton')
            .click()
            .waitForElementsByClassName('XCUIElementTypeCollectionView')
            .swipeTo(5)
            .customSaveScreenshot()
            .elementByName('25')
            .click()
            .customSaveScreenshot()
            .elementByXPath("//*[@name='Done']")
            .click()
            .sleep(2000)
            .customSaveScreenshot();
        } catch (err) {
            should.not.exist('Error during test!', err);
        }
    });

    after(async () => {
        try {
            await driver.quit();
        } catch (e) {
            should.not.exist('Error quitting!', e);
        }
    });
});
