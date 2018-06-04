
import path from 'path';
import _ from 'xutil';
import wd from 'wd';

export default (wd) => {

    const asserters = require('./wd-asserters');
    
    wd.addPromiseChainMethod('gotoHomePage', function () {
        return this
            .sleep(10*1000)
            .waitForElementsByClassName('XCUIElementTypeOther',asserters.isAllDisplayed(16),60000,1000)
            .then(function(satisfiedEl) {
                console.log(satisfiedEl.length);
                return satisfiedEl[0];
              })
            .waitForElementByXPath('//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[2]/XCUIElementTypeButton[1]')
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[2]/XCUIElementTypeButton[2]')
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeButton[2]')
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[2]/XCUIElementTypeButton[2]')
            .click()
            .sleep(2000)
    });

    wd.addPromiseChainMethod('customSaveScreenshot', function () {
        const filepath = path.join(__dirname, '..', 'screenshots', `${_.uuid()}.png`);
        _.mkdir(path.dirname(filepath));
        return this.saveScreenshot(filepath);
    });

    wd.addPromiseChainMethod('swipeTo', function (count) {
        for (var i = 0; i < count; i++) {
            this.swipe({
                startX: 10,
                startY: 496,
                endX: 0,
                endY: -300,
                duration: 2000
            })
        }
        return this;
    });

    wd.addPromiseChainMethod('swipe', function (opts) {
        var action = new wd.TouchAction();
        action
            .press({ x: opts.startX, y: opts.startY })
            .wait(opts.duration)
            .moveTo({ x: opts.endX, y: opts.endY })
            .release();
        return this.performTouchAction(action);
    });

}