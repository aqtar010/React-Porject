import { Component } from "react";

import Cardlist from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";


class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  componentWillMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(() => {
          return { monsters: users };
        })
      );
  }

  onSearchChange = (event) => {
    const searchstring = event.target.value.toLowerCase();

    this.setState(() => {
      return { searchField: searchstring };
    });
  };

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredmonsters = monsters.filter((elem) => {
      return elem.name.toLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className="title">Monsters Rolodex</h1>
        <SearchBox
          className="search-box"
          onChangeHandler={onSearchChange}
          placeholder="Search Box"
        />

        <Cardlist monsters={filteredmonsters} />
      </div>
    );
  }
}

export default App;
