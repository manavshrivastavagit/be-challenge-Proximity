exports.randomNumber = function( length ) {
    let text = "",
	 possible = "123456789";

    for ( let i = 0; i < length; i++ ) {
        let sup = Math.floor( Math.random() * possible.length );

        text += i > 0 && sup == i ? "0" : possible.charAt( sup );
    }
    return Number( text );
};

exports.randomAlphaNumric = function( length ) {
    let text = "",
	 possible = "abcdefgh123456789ABCDEFGH";

    for ( let i = 0; i < length; i++ ) {
        let sup = Math.floor( Math.random() * possible.length );

        text += i > 0 && sup == i ? "1" : possible.charAt( sup );
    }
    return text;
};
