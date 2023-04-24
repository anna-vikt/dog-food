import { useContext, useEffect, useState } from "react";
import { CardList } from "../card-list";
import { Footer } from "../footer";
import { Header } from "../header";
import { Sort } from "../sort";
import { dataCard } from "../../data";
import { Logo } from "../logo";
import { Search } from "../search";
import "./styles.css";
// import { Button } from "../button";
import api from "../../utils/api";
import { useDebounce } from "../../hooks/useDebounce";
import { isLiked } from "../../utils/products";
import { CatalogPage } from "../../pages/catalog-page";
import { ProductPage } from "../../pages/product-page";
import FaqPage from "../../pages/faq-page";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import NotFoundPage from "../../pages/not-found-page";
import { UserContext } from "../../contexts/current-user-context";
import { CardsContext } from "../../contexts/card-context";
import { ThemeContext } from "../../contexts/theme-context";
import { themes } from "../../contexts/theme-context";
import { FavoritesPage } from "../../pages/favorite-page";
import { TABS_ID } from "../../utils/constants";
import Modal from "../modal";
import { Link } from "react-router-dom";
import Login from "../login";
import Register from "../register";
import ResetPassword from "../reset-password";

export function App() {
  const [cards, setCards] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [currentSort, setCurrentSort] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const debounceSearchQuery = useDebounce(searchQuery, 300);
  const [theme, setTheme] = useState(themes.light);
  const [modalFormStatus, setModalFormStatus] = useState(false);
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath;
  const navigate = useNavigate();

  const onCloseModalForm = () => {
    setModalFormStatus(false);
  };

  const onCloseRoutingModal = () => {
    navigate(initialPath || '/', { replace: true })
  }

  function handleRequest() {
    // const filterCards = dataCard.filter(item => item.name.includes(searchQuery));

    // setCards(filterCards);
    api.search(debounceSearchQuery).then((dataSearch) => {
      setCards(dataSearch);
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    handleRequest();
  }

  function handleInputchange(inputData) {
    setSearchQuery(inputData);
  }

  function handleProductLike(product) {
    const like = isLiked(product.likes, currentUser._id);
    return api.changeLikeProductStatus(product._id, like).then((updateCard) => {
      const newProducts = cards.map((cardState) => {
        return cardState._id === updateCard._id ? updateCard : cardState;
      });

      setCards(newProducts);

      if (!like) {
        setFavorites((prevState) => [...prevState, updateCard]);
      } else {
        setFavorites((prevState) =>
          prevState.filter((card) => card._id !== updateCard._id)
        );
      }

      return updateCard;
    });
  }

  function handleUpdateUser(dataUserUpdate) {
    api.setUserInfo(dataUserUpdate).then((updateUserFromServer) => {
      setCurrentUser(updateUserFromServer);
    });
  }

  function toggleTheme() {
    theme === themes.dark ? setTheme(themes.light) : setTheme(themes.dark);
  }

  function sortedData(currentSort) {
    console.log(currentSort);

    switch (currentSort) {
      case TABS_ID.CHEAP:
        setCards(cards.sort((a, b) => a.price - b.price));
        break;
      case TABS_ID.LOW:
        setCards(cards.sort((a, b) => b.price - a.price));
        break;
      case TABS_ID.DISCOUNT:
        setCards(cards.sort((a, b) => b.discount - a.discount));
        break;
      default:
        setCards(cards.sort((a, b) => a.price - b.price));
    }
  }

  useEffect(() => {
    handleRequest();
  }, [debounceSearchQuery]);

  useEffect(() => {
    setIsLoading(true);
    api
      .getAllInfo()
      .then(([productsData, userInfoData]) => {
        setCurrentUser(userInfoData);
        setCards(productsData.products);

        const favoriteProducts = productsData.products.filter((item) =>
          isLiked(item.likes, userInfoData._id)
        );
        setFavorites(favoriteProducts);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const cbSubmitFormLoginRegister = (dataForm) => {
    console.log('cbSubmitFormLoginRegister', dataForm);
  }
  const cbSubmitFormLogin = (dataForm) => {
    console.log('cbSubmitFormLogin', dataForm);
  }
  const cbSubmitFormResetPassword = (dataForm) => {
    console.log('cbSubmitFormResetPassword', dataForm);
  }

  const handleClickButtonLogin = (e) => {
    e.preventDefault();
    navigate('/login', { replace: true, state: { backgroundLocation: { ...location, state: null }, initialPath } })
  }
  const handleClickButtonReset = (e) => {
    e.preventDefault();
    navigate('/reset-password', { replace: true, state: { backgroundLocation: { ...location, state: null }, initialPath } })
  }
  const handleClickButtonRegister = (e) => {
    e.preventDefault();
    navigate('/register', { replace: true, state: { backgroundLocation: { ...location, state: null }, initialPath } })
  }
  const handleClickButtonResetNotModal = (e) => {
    e.preventDefault();
    navigate('/reset-password')
  }
  const handleClickButtonRegisterNotModal = (e) => {
    e.preventDefault();
    navigate('/register')
  }
  const handleClickButtonLoginNotModal = (e) => {
    e.preventDefault();
    navigate('/login')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <CardsContext.Provider
        value={{
          cards,
          favorites,
          currentSort,
          handleLike: handleProductLike,
          isLoading,
          onSortData: sortedData,
          setCurrentSort,
        }}
      >
        <UserContext.Provider
          value={{ currentUser, onUpdateUser: handleUpdateUser }}
        >
          <Modal isOpen={modalFormStatus} onClose={onCloseModalForm}>
          </Modal>
          <Header user={currentUser}>
            <Routes location={(backgroundLocation && { ...backgroundLocation, pathname: initialPath }) || location}>
              <Route
                path="/"
                element={
                  <>
                    <Logo />
                    <Search
                      handleFormSubmit={handleFormSubmit}
                      handleInputChange={handleInputchange}
                    />
                  </>
                }
              />
              {/* <Route
                path="/login"
                element={
                  <>
                    Авторизация
                    <Link to="/register">Зарегистрироваться</Link>
                  </>
                }
              />
              <Route
                path="/register"
                element={
                  <>
                    Регистрация
                    <Link to="/login">Авторизоваться</Link>
                  </>
                }
              /> */}
              <Route path="*" element={<Logo href="/" />} />
            </Routes>

          </Header>
          <main
            className="content container"
            style={{ backgroundColor: theme.background }}
          >
            <Routes location={(backgroundLocation && { ...backgroundLocation, pathname: initialPath }) || location}>
              <Route
                path="/"
                element={
                  <CatalogPage
                    handleProductLike={handleProductLike}
                    currentUser={currentUser}
                    isLoading={isLoading}
                  />
                }
              />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route path='/login' element={
                <Login onSubmit={cbSubmitFormLogin} onNavigateRegister={handleClickButtonRegisterNotModal} onNavigateReset={handleClickButtonResetNotModal} />
              } />
              <Route path='/register' element={
                <Register onSubmit={cbSubmitFormLoginRegister} onNavigateLogin={handleClickButtonLoginNotModal} />
              } />
              <Route path='/reset-password' element={
                <ResetPassword onSubmit={cbSubmitFormResetPassword} />
              } />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          {backgroundLocation && <Routes>
            <Route path='/login' element={
              <Modal isOpen onClose={onCloseRoutingModal}>
                <Login onSubmit={cbSubmitFormLogin} onNavigateRegister={handleClickButtonRegister} onNavigateReset={handleClickButtonReset} />
              </Modal>
            } />
            <Route path='/register' element={
              <Modal isOpen onClose={onCloseRoutingModal}>
                <Register onSubmit={cbSubmitFormLoginRegister} onNavigateLogin={handleClickButtonLogin} />
              </Modal>
            } />
            <Route path='/reset-password' element={
              <Modal isOpen onClose={onCloseRoutingModal}>
                <ResetPassword onSubmit={cbSubmitFormResetPassword} />
              </Modal>
            } />
          </Routes>}
        </UserContext.Provider>
      </CardsContext.Provider>
    </ThemeContext.Provider>
  );
}
