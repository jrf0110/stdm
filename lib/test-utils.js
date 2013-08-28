var tu = module.exports = {};

tu.getReq = function(){
  return {
    
  }
};

tu.getRes = function(){
  var res = {
    _called: {}
  , send: function(){
      res._called.send = res._called.send ? res._called.send + 1 : 1;
      return res;
    }
  , status: function( code ){
      res._called.status = res._called.status ? res._called.status + 1 : 1;
      return res;
    }
  };
  return res;
};

tu.resGets = function( fn, field, callback ){
  var req = tu.getReq();
  var res = tu.getRes();

  fn( req, res, function(){
    if ( callback ) callback( field in res );
  });

  if ( !callback ) return field in res;
};


tu.nextWasCalled = function( fn, callback ){
  var wasCalled = false;

  // Ensure next was called
  fn( tu.getReq(), tu.getRes(), function(){
    wasCalled = true;
    if ( callback ) callback( true );
  });

  return callback ? null : wasCalled;
};

// tu.shouldSendStatus = function( fn, status, callback ){
//   var req = tu.getReq();
//   var res = tu.getRes();
//   var assertion = function(){
//     return res._called.status == 1;
//   };

//   fn( req, res, function(){
//     if ( callback ) callback( field in res );
//   });
// };