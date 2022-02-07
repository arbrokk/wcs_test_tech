import React from 'react';

class Argonautelist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            items: [],
            DataisLoaded: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(e) {
        this.setState({name: e.target.value})
    };

    handleSubmit(e) {
        e.preventDefault();
        try {
            fetch("https://api.airtable.com/v0/appkXhxTVwmskcaPA/argonautes?api_key=key4TVWBuan5bRXL5", {
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
                });
        } catch (err) {
            console.log(err);
        }
    };

    removeArgonaute(singleItem) {

    }
    

    componentDidMount() {
        this.refreshData();
    }

    async refreshData() {
        fetch('https://api.airtable.com/v0/appkXhxTVwmskcaPA/argonautes?api_key=key4TVWBuan5bRXL5')
        .then((resp) => resp.json())
        .then(data => {
           this.setState({ items: data.records });
           this.setState({DataisLoaded: true})
           console.log(this.state.items[0]["id"]);
        }).catch(err => {
          // Error :(
        });
    };

    render() {
        const { DataisLoaded, items } = this.state;

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
                            <ol key={key} className="capitalize py-2" >
                                {item["fields"]["Name"]}
                                <span onClick={() => this.removeArgonaute(item["fields"])}>x</span>
                            </ol>
                        ))
                    }
                </section>
            </div>
        );
    }


}

export default Argonautelist;