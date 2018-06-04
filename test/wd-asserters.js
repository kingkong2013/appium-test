
import wd from 'wd';  
/**
 * asserters.isAllDisplayed
 *
 * @asserter
 */
var count = 0;

function isAllDisplayed(size) {

  return new wd.asserters.Asserter(
  function(els,cb) {
//     // els.isDisplayed(function(err, displayed) {
//     //   // console.log(displayed);
//     //   if(err) { return cb(err); }
//     //   cb(null, displayed);
//     // });

    els.getTagName(function(err,tagName){
      console.log(tagName);
      if(err) { return cb(err); }
      cb(null,tagName=='XCUIElementTypeOther')

    });

  }
);
}

module.exports = {
  isAllDisplayed: isAllDisplayed
};
