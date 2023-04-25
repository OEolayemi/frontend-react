'use strict';


class Formdivision extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "", date: "" ,about:""};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }

  handleSubmit(event) {
    event.preventDefault();

    const recipeUrl =
      "https://mi-linux.wlv.ac.uk/~2051398/c1-demo/public/index.php/CrimeController/savedata";
  
    let mydata = this.state;

    let formData = new FormData();
    formData.append("title", mydata.title);
    formData.append("about", mydata.about);
    formData.append("date", mydata.date);

    fetch(recipeUrl, {
      method: "POST",
      body: formData,
    });

    
  }

  render() {
    return (
      <div class="container">
        crime database form
			  <div class="row">
			  
        <form onSubmit={this.handleSubmit}>
	
          <label>
            Crime title:
            <input class="form-control" type="text" name="title" onChange={this.handleChange} />
          </label>
		 

          <label>
            Date:
            <input  class="form-control"  type="date" name="date" onChange={this.handleChange} />
          </label>

          <label>
            About crime:
            <input  class="form-control"  type="text" name="about" onChange={this.handleChange} />
          </label>


          <input   type="submit" value="Submit" />
        </form>
		</div>
      </div>
    );
  }
}
	
	
class App extends React.Component {

	
	  constructor(props) {
    super(props);
      this.handleClickDelete = this.handleClickDelete.bind(this);
  }

	state = {
		crime: []
	}
	

	  handleClickDelete(e) {

	let id=e.target.id;		
	const recipeUrl = 'https://mi-linux.wlv.ac.uk/~2051398/c1-demo/public/index.php/CrimeController/delete/'+ id;
    const requestMetadata = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(recipeUrl, requestMetadata)
        .then(res => res.json())
        .then(recipes => {
            console.log(recipes);
		
			
		  });
    };
	
	
	
 
	componentDidMount() {
	fetch('https://mi-linux.wlv.ac.uk/~2051398/c1-demo/public/index.php/CrimeController/index')
		.then(res => res.json())
		.then((data) => {
		  this.setState({ crime: data}) 
		})
		.catch(console.log)
	}

	
	render() {
	console.log(this.state.crime);
		return (
			
			<div>
			<Formdivision/>
				<div class=" container table-responsive">
<table class="table">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">title</th>
      <th scope="col">about</th>
      <th scope="col">date</th>
	    <th scope="col">delete</th>
    </tr>
  </thead>
    <tbody>
			{this.state.crime.map((data,index)=>	
					     
						  <tr>
      <th scope="row">{data.id}</th>
	  <td>{data.title}</td>
	        <td>{data.about}</td>
      <td>{data.date}</td>

      <td>   <button type="button" className="btn" id={data.id} 
				>edit</button>
	  
	        <button type="button" className="btn" id={data.id} 
					onClick={this.handleClickDelete}>Delete</button>
			</td>
    </tr>

			
						)}
			</tbody>
			</table>
			</div>
			</div>
		);
	}
}
// display code
ReactDOM.render(
  <App />,
  document.getElementById('root')
);








