import React from "react";
import { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import "./styles/App.css";
import ApiAuth from "../utils/api-auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setisLoading] = React.useState(false);
  const [activeCard, setActiveCard] = React.useState({});
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  const [email, setEmail] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [onSubmit, setOnSubmit] = React.useState(undefined);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = React.useState(false);
  const [isMenu, setIsMenu] = React.useState(false);
  const isOpen =
    isEditAvatarPopupOpen ||
    isAddPlacePopupOpen ||
    isConfirmDeletePopupOpen ||
    isEditProfilePopupOpen ||
    selectedCard.link ||
    onSubmit;

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => setCurrentUser(res))
      .catch(console.error);
    api
      .getInitialCards()
      .then((res) => setCards(res))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (token === null) return;
    ApiAuth.checkToken(token)
      .then((res) => {
        setEmail(res.data.email);
        setLoggedIn(true);
        navigate("/");
      })
      .catch(console.error);
  }, [token]);

  useEffect(() => {
    window.innerWidth < 768 && setIsMobile(true);
    const resize = () => {
      if (window.innerWidth < 768) return setIsMobile(true);
      setIsMenu(false);
      setIsMobile(false);
    };
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  };

  const handleClickCardBin = (card) => {
    setActiveCard(card);
    setIsConfirmDeletePopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCloseAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard({});
    setOnSubmit(undefined);
  };

  const handleSubmit = (request) => {
    setisLoading(true);
    request()
      .then(handleCloseAllPopups)
      .catch(console.error)
      .finally(() => setisLoading(false));
  };

  const handleCardDelete = (evt) => {
    evt.preventDefault();

    function makeRequest() {
      return api
        .deleteCard(activeCard._id)
        .then(() =>
          setCards((state) => state.filter((c) => c._id !== activeCard._id))
        );
    }
    handleSubmit(makeRequest);
  };

  const handleUpdateUser = ({ name, about }) => {
    function makeRequest() {
      return api.changeUserInfo(name, about).then((res) => setCurrentUser(res));
    }
    handleSubmit(makeRequest);
  };
  const handleUpdateAvatar = ({ avatar }) => {
    function makeRequest() {
      return api.changeUserAvatar(avatar).then((res) => setCurrentUser(res));
    }
    handleSubmit(makeRequest);
  };

  const handleAddPlace = ({ title, link }) => {
    function makeRequest() {
      return api
        .addNewCard(title, link)
        .then((res) => setCards([res, ...cards]));
    }
    handleSubmit(makeRequest);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              component={
                <>
                  <Header
                    isMenu={isMenu}
                    isMobile={isMobile}
                    email={email}
                    setLoggedIn={setLoggedIn}
                    headerRightElement={
                      isMobile ? (
                        <button
                          className={`app-header__menu-opener button-hover ${
                            isMenu && "app-header__menu-opener_close"
                          }`}
                          onClick={() => {
                            isMenu ? setIsMenu(false) : setIsMenu(true);
                          }}
                        ></button>
                      ) : (
                        <div className="app-header__right-element">
                          <span className="app-header__email">{email}</span>
                          <NavLink
                            to="/sign-in"
                            onClick={() => {
                              setLoggedIn(false);
                              localStorage.removeItem("token");
                            }}
                            className="app-header__exit button-hover"
                          >
                            Выйти
                          </NavLink>
                        </div>
                      )
                    }
                  />
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={setSelectedCard}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleClickCardBin}
                  />
                  <Footer />
                  <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={handleCloseAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    buttonText={isLoading ? "Сохранение..." : "Сохранить"}
                  />
                  <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={handleCloseAllPopups}
                    onUpdateUser={handleUpdateUser}
                    buttonText={isLoading ? "Сохранение..." : "Сохранить"}
                  />
                  <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={handleCloseAllPopups}
                    onAddPlace={handleAddPlace}
                    buttonText={isLoading ? "Создание..." : "Создать"}
                  />
                  <PopupWithForm
                    title="Вы уверены?"
                    name="confirm"
                    isOpen={isConfirmDeletePopupOpen}
                    onClose={handleCloseAllPopups}
                    isValid={true}
                    buttonText={isLoading ? "Удаление..." : "Да"}
                    onSubmit={handleCardDelete}
                  />
                  <ImagePopup
                    card={selectedCard}
                    onClose={handleCloseAllPopups}
                  />
                </>
              }
            />
          }
        />
        <Route
          path="/sign-in"
          element={<Login setLoggedIn={setLoggedIn} setToken={setToken} />}
        />
        <Route
          path="/sign-up"
          element={<Register setOnSubmit={setOnSubmit} />}
        />
      </Routes>
      <InfoTooltip
        onSubmit={onSubmit}
        setOnSubmit={setOnSubmit}
        isOpen={isOpen}
        onClose={handleCloseAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
