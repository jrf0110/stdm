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