# API Key

Nodejs module for generating ```base62``` API keys.


## Install

    $ npm install apikeygen
     
## Usage

    var apikey = require("apikeygen").apikey;
    var key = apikey();  // generates 40 char base64 encoded key
    
### Key Length
The default key length is 40 chars. To change this, call ```apikey``` with the 
new key length

    var key = apikey(30); 
    
## Dependencies
Internally, ```apikey``` uses ```crypto.randomBytes()```.

    
## Tests

    npm test
    

