import { useEffect, useState } from "react";
import { CardList } from "../card-list";
import { Footer } from "../footer";
import { Header } from "../header";
import { Sort } from "../sort";
import { dataCard } from "../../data";
import { Logo } from '../logo';
import { Search } from '../search';
import "./styles.css";

export function App() {
  const [cards, setCards] = useState(dataCard);
  const [searchQuery, setSearchQuery] = useState('');

  function handleRequest() {
    const filterCards = dataCard.filter(item => item.name.includes(searchQuery));

    setCards(filterCards);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    handleRequest();
  }


  function handleInputchange(inputData) {
    setSearchQuery(inputData);
  }

  // useEffect (() => {
  //   handleRequest();
  // }, []);

 
  
  return (
      <>
          <Header>
            <Logo/>
            <Search onSubmit = {handleFormSubmit} onChange = {handleInputchange}/>
          </Header>
        <main className="content container">
          <Sort />
          <CardList goods = {cards}/>
        </main>
        <Footer />
      </>
  );
}
