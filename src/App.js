import './App.css';
import Header from './components/header';
import Footer from "./components/footer";
import Argonautelist from "./components/argonaute_list";


function App() {
  return (
    <div className="App mx-auto h-screen">
        <Header/>
        <main className="mt-6 text-center ">



        <Argonautelist/>

        </main>

    <Footer/>
    </div>
  );
}

export default App;
