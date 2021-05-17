const jwt = require( "express-jwt" );
let moment = require( "moment" );
const secret = process.env.JWT_SECRET;

    authenticate = jwt( {
        "secret": secret,
		algorithms: ['HS256']
    } );

module.exports = authenticate;


// Authentication Middleware
function ensureAuthenticated( req, res, next ) {
	// We can obtain the session token from the requests cookies, which come with every request
	// const token = req.cookies.token

	// if the cookie is not set, return an unauthorized error
	// if (!token) {
	// 	return res.status(401).send( { "error": "TokenMissing" } );
	// }

    if ( !req.headers.authorization ) {
	  return res.status( 401 ).send( { "error": "TokenMissing" } );
    }
    let token = req.headers.authorization.split( " " )[ 1 ];

    // console.log( 'ensureAuthenticated token',token );
  
    let payload = null;

    try {
		jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });
		// console.log(req)
		next();
		// jwt({ secret: secret, algorithms: ['HS256'] }),
		// function(req, res) {
		// 	console.log(req.user)
		// 	if (!req.user.id) return res.sendStatus(401);
		// 	next();
		// }

	// 	console.log('secret', secret)
    //       payload = jwt.decode(token, process.env.JWT_SECRET);
	// 	  console.log('payload', payload)
	//   payload =  jwt.verify(token, secret);
	//   console.log('payload', payload)
	 
    } catch ( err ) {
	  return res.status( 401 ).send( { "error": "TokenInvalid" } );
    }
  
    if ( payload && payload.exp && payload.exp <= moment().unix() ) {
	  return res.status( 401 ).send( { "error": "TokenExpired" } );
    }

    // check if the user exists
    // Person.findById( payload.sub, ( err, person ) => {
	//   if ( !person ) {
    //         return res.status( 401 ).send( { "error": "PersonNotFound" } );
	//   }
    //     req.user = payload.sub;
    //     next();
	  
    // } );
}

// module.exports = ensureAuthenticated;
