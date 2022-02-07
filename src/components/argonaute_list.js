import React from 'react';

class Argonautelist extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            items: [],
            DataisLoaded: false
        };
        const APIkey = process.env.AIRTBL_API_KEY;


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(e) {
        this.setState({name: e.target.value})
    };

    handleSubmit(e) {
        e.preventDefault();
        try {
            fetch("https://api.airtable.com/v0/appkXhxTVwmskcaPA/argonautes?api_key="+APIkey, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(
                    {
                        "records": [
                            {
                              "fields": {
                                "Name": this.state.name
                              }
                            }],
                    }
                    ),
            }).then(response => response.json())
                .then(data =>
                {
                    this.refreshData();
                    this.setState({name:''});
                });
        } catch (err) {
            console.log(err);
        }
    };

    removeArgonaute(itemID) {
        try {
            console.log(itemID);
            

            fetch("https://api.airtable.com/v0/appkXhxTVwmskcaPA/argonautes/"+itemID+"?api_key="+APIkey, {
                method: "DELETE"                    
                }
        ).then(response => response.json())
                .then(data =>
                {
                    if(data["deleted"]===true) {
                        this.refreshData();
                    }                    
                });
        } catch (err) {
            console.log(err);
        }
    }
    

    componentDidMount() {
        this.refreshData();
    }

    async refreshData() {
        fetch('https://api.airtable.com/v0/appkXhxTVwmskcaPA/argonautes?api_key='+APIkey)
        .then((resp) => resp.json())
        .then(data => {
           this.setState({ items: data.records });
           this.setState({DataisLoaded: true})
        }).catch(err => {
          // Error :(
        });
    };

    render() {
        const { DataisLoaded } = this.state;

        if (!DataisLoaded) return <div>
            <h2 className="font-title text-2xl py-4">Chargement (de la liste hein, pas du bateau encore)</h2>
        </div> ;

        return (

            <div className = "App">
                <h2 className="text-bold text-2xl ">Ajouter un(e) Argonaute</h2>

                <form className="w-full max-w-sm mx-auto py-4" onSubmit={this.handleSubmit}>
                    <div className="flex items-center border-b border-red-400 py-2">
                        <input value={this.state.name}  onChange={this.handleChange} id="name"
                               className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                               type="text" placeholder="Nom de l'argonaute" aria-label="nom"/>
                        <button
                            className="flex-shrink-0 bg-red-400 hover:bg-red-700 border-red-400 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
                            type="submit">
                            Embarquer !
                        </button>

                    </div>
                </form>

                <h2 className="font-title text-2xl py-4">Membres de l'équipage ({this.state.items.length})</h2>
                <section className="grid grid-cols-3">

                    {
                        Object.entries(this.state.items).map(([key, item]) => (
                            <ol key={key} className="capitalize py-2 flex mx-auto" >
                                {item["fields"]["Name"]}
                                <span className="self-center" onClick={() => this.removeArgonaute(item["id"])}>
                                <svg className="h-5 w-5 text-red-400 ml-2"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                </span>
                            </ol>
                        ))
                    }
                </section>
            </div>
        );
    }


}

export default Argonautelist;
