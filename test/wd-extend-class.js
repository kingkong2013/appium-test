
import path from 'path';
import _ from 'xutil';
import wd from 'wd';

export default class IOSCommonPage {

    constructor(wd) {
        this.wd = wd;
        this.gotoHomePage();
        this.customSaveScreenshot();
        this.swipe({});
        this.swipeTo();
    }

    gotoHomePage() {
        this.wd.addPromiseChainMethod('gotoHomePage', function () {
            return this
                .sleep(5000)
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
    }

    customSaveScreenshot() {
        this.wd.addPromiseChainMethod('customSaveScreenshot', function () {
            const filepath = path.join(__dirname, '..', 'screenshots', `${_.uuid()}.png`);
            _.mkdir(path.dirname(filepath));
            return this.saveScreenshot(filepath);
        });
    }
    
    swipeTo() {
        this.wd.addPromiseChainMethod('swipeTo', function (count) {
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
    }

    swipe(opts) {
        this.wd.addPromiseChainMethod('swipe', function(opts) {
        var action = new wd.TouchAction();
        action
          .press({x: opts.startX, y: opts.startY})
          .wait(opts.duration)
          .moveTo({x: opts.endX, y: opts.endY})
          .release();
        return this.performTouchAction(action);
        });
      }
}