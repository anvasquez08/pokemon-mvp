const express = require('express');
const mysql   = require('mysql');
const parser  = require('body-parser');
const axios   = require('axios');

let app  = express();
let port = 3000;

app.use(parser.json())
app.use(express.static(__dirname))
app.listen(port, function() { 
	console.log(`Yay! Listening on port ${port}`)
})


app.get('/', (req, res) => {
	console.log('this is get request')
	res.status(201)

})

app.post('/', (req, res) => {
	let pokename = req.body.search.toLowerCase()
	pokemonFetcher(pokename, function(result) {
		console.log('inside post function',result)
		res.json(result)
	})

	//res.send("HELLO GETTING POST'")
})


//GET api/v2/pokemon-species/{id or name} to get family and 
const pokemonFetcher = (pokemon, cb) => {
	axios({
		method: 'GET',
		url: `http://pokeapi.co/api/v2/pokemon/${pokemon}`
	})
	.then(results => {
		var pokeObj = {}

		pokeObj.id = results.data.id
		pokeObj.name = results.data.name 
	    pokeObj.image = results.data.sprites.front_default || null
	    pokeObj.ability = results.data.abilities[0]['ability']['name'] || null

		cb(pokeObj)
	})
	.catch(err => {
		console.log('failed api request',err)
	})
}



/*
- we didn't sort in last sprint??
- get request wasn't console.loging at beginning 
- fix directory to client in dirname
- require  database 
- might need to export app??

*/


/*
FORGOT THE .JSON => 
			app.use(parser.json())
PORT IS NUMBER.  => 
			let port = 3000
ADD PORT TO LISTEN & FUNCTION W/ CONSOLE LOG => 
			app.listen(port, () => console.log(`Listening on port ${port}`))
SERVE STATIC PAGE
*/
