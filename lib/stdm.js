var stdm = module.exports = {};

stdm.error = function(){
  return function( req, res, next ){
    res.error = function( error ){
      if ( !error ) return res.status( 500 ).send();
      if ( typeof error == 'number' ) return res.status( error ).send();
      res.status( error.statusCode || 500 ).json({ error: error });
    };

    next();
  };
};

stdm.log = function(){
  var args = Array.prototype.slice.call( arguments, 0 );
  return function( req, res, next ){
    console.log.apply( console, args );
    return next();
  };
};

m.logReq = function(){
  var args = Array.prototype.slice.call( arguments, 0 );
  return function( req, res, next ){
    args.forEach( function( arg ){
      if ( arg in req ) console.log( arg, ":", req[ arg ]);
    });
    return next();
  };
}