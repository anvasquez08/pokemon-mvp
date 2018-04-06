    class App extends React.Component {

      constructor(props) {
        super(props)
        state = {
          collection: [],
          search: []
        }
        this.searchForPokemon = this.searchForPokemon.bind(this)
        this.addToCollection = this.addToCollection.bind(this)
        this.fetchCollection = this.fetchCollection.bind(this)
      }

      fetchCollection(response) {
        this.setState({
          collection: response
        })

      }
      
      searchForPokemon(search) {
        axios.post('/', search)
          .then( (response) => {
            console.log(response)

            // must slice to make a copy, then push and set state 

            let latestSearch = this.state.unshift(response.body)
            this.setState({
              search : latestSearch
            })
          })
          .catch( (err) => {
            console.log(err)
          })
      }

      addToCollection(newPokemon) { // take out from search too 
        axios.post('/', newPokemon)
          .then( (response)=> {
            console.log(response)
            this.fetchCollection(response)
          })
          .catch( (err) => {
            console.log(err)
          })
      }


      deleteFromCollection(deletePokemon) {
        axios.post('/', )
      }

      render() {
        return (
          <div>hello world</div>
          {
            <searchForPokemon search={this.searchForPokemon} searches={this.state.search}// passdown function 
          }

          )  
      }
    } 



  ReactDOM.render(<App/>, document.getElementById('app'))