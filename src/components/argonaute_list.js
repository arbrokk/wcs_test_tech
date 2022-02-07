import React from 'react';
const APIServ="https://wcs-test-api.herokuapp.com"

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
            fetch(APIServ+"/argonaute/add", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({'name': this.state.name}),
            }).then(response => response.json())
                .then(data =>
                {
                    this.refreshData();
                    if(data['code']==="error"){
                        alert("Cet argonaute déjà dans la liste");
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    removeArgonaute(singleItem) {
        try {
            fetch(APIServ+"/argonaute/del", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({'name': singleItem}),
            }).then(
                this.refreshData()
            )

        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount() {
        this.refreshData();
    }

    async refreshData() {
        fetch(
            APIServ+"/argonaute/list")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
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

                <h2 className="font-title text-2xl py-4">Membres de l'équipage ({Object.entries(items).length})</h2>
                <section className="grid grid-cols-3">
                    {
                        Object.entries(items).map(([key, item]) => (
                            <ol key={key} className="capitalize py-2" onClick={() => this.removeArgonaute(item.name)}>
                                { item.name }
                            </ol>
                        ))
                    }</section>
            </div>
        );
    }


}

export default Argonautelist;