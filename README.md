# Standard Middleware for Express

I'm sure there are other implementations, but here's mine.

## Docs

So there is no ambiguity in the API, all middleware is returned via a function call. Even though some do not require configuration, ```app.use( stdm.error() )```, I adopt this convention so there is never any doubt on how to obtain the value.

### ```stdm.error()```

Attaches an error function to the ```response``` object. Uses the ```statusCode``` property as a status code. If there are other properties, it will send them along in the response body on a field called ```error```. If the error passed in is existentially false, then stdm sends a 500. If the error is a number, we only send that number as the status code.

__Example__

```javascript
app.use( stdm.error() );

/* ... */

app.get( '/users', function( req, res, next){
  if ( req.someCondition ){
    res.error({
      name: 'INVALID_READ_PERMISSION'
    , statusCode: 403
    , message: 'You do not have sufficient permissions to use this resource'
    });
  }
}, /* ... */);
```

__Response__

```javascript
{
  error: {
    name: 'INVALID_READ_PERMISSION'
  , statusCode: 403
  , message: 'You do not have sufficient permissions to use this resource'
  }
}
```

### ```stdm.log( arg1, arg2, ...)```

Returns a middleware function that will ```console.log``` the arguments passed to ```stdm.log``` when the middleware function is called.

__Example__

```javascript
app.get( '/users'
, stdm.log( "Experimental middleware:" )
, function( req, res, next ){ /* experimental middleware */ }
, stdm.log( "Experimental middleware COMPLETE!" )
, /* ... */
);
```

### ```stdm.logReq( arg1, arg2, ...)```

Returns a middleware function that will log properties on the request object whose names match the arguments passed to ```stdm.logReq```.  

__Example__

```javascript
app.get( '/users'
, stdm.log( "User:" )
, stdm.reqLog( 'user' )
, /* ... */
);
```
