var assert = require('assert');
var stdm = require('../');
var tu = require('../lib/test-utils');

describe('stdm.error', function(){
  it ('should add the properties required', function(){
    var error = stdm.error();

    assert( tu.nextWasCalled( error ) );
    assert( tu.resGets( error, 'error' ) );
  });

  // Actually, we should just fire up an express server
  // it ('should send a 500 if no error was provided', function(){
  //   var error = stdm.error();

  //   assert( tu.shouldSendStatus( error, 500 ) )
  //   assert( tu.shouldSendBody( error, null ) )
  // });
})