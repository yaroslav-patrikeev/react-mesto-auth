import React from "react";
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
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [activeCard, setActiveCard] = React.useState({});
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  const [email, setEmail] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [onSubmit, setOnSubmit] = React.useState(undefined);
  const navigate = useNavigate();
  const apiAuth = new ApiAuth();
  const [isMobile, setIsMobile] = React.useState(false);
  const [isMenu, setIsMenu] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) return setIsMobile(true);
      setIsMenu(false);
      setIsMobile(false);
    });

    api
      .getUserInfo()
      .then((res) => setCurrentUser(res))
      .catch(console.error);
    api
      .getInitialCards()
      .then((res) => setCards(res))
      .catch(console.error);
  }, []);

  React.useEffect(() => {
    if (token === null) return;
    apiAuth
      .checkToken(token)
      .then((res) => {
        setEmail(res.data.email);
        setLoggedIn(true);
        navigate("/");
      })
      .catch(console.error);
  }, [token]);

  React.useEffect(() => {});

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

  const handleCardDelete = (evt) => {
    evt.preventDefault();
    api
      .deleteCard(activeCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== activeCard._id));
        handleCloseAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsSubmit(false);
      });
    setIsSubmit(true);
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
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .changeUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        handleCloseAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsSubmit(false);
      });
    setIsSubmit(true);
  };
  const handleUpdateAvatar = ({ avatar }) => {
    api
      .changeUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        handleCloseAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsSubmit(false);
      });
    setIsSubmit(true);
  };

  const handleAddPlace = ({ title, link }) => {
    api
      .addNewCard(title, link)
      .then((res) => {
        setCards([res, ...cards]);
        handleCloseAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsSubmit(false);
      });
    setIsSubmit(true);
  };

  const handleBurgerClick = (e) => {
    if (isMenu) {
      e.target.classList.remove("app-header__menu-opener_close");
      return setIsMenu(false);
    }
    e.target.classList.add("app-header__menu-opener_close");
    setIsMenu(true);
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
                  {isMenu && isMobile && (
                    <div className="app-header__mobile-menu">
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
                  )}
                  <Header
                    headerRightElement={
                      <>
                        {isMobile ? (
                          <button
                            className="app-header__menu-opener button-hover"
                            onClick={handleBurgerClick}
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
                        )}
                      </>
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
                    buttonText={isSubmit ? "Сохранение..." : "Сохранить"}
                  />
                  <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={handleCloseAllPopups}
                    onUpdateUser={handleUpdateUser}
                    buttonText={isSubmit ? "Сохранение..." : "Сохранить"}
                  />
                  <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={handleCloseAllPopups}
                    onAddPlace={handleAddPlace}
                    buttonText={isSubmit ? "Создание..." : "Создать"}
                  />
                  <PopupWithForm
                    title="Вы уверены?"
                    name="confirm"
                    isOpen={isConfirmDeletePopupOpen}
                    onClose={handleCloseAllPopups}
                    isValid={true}
                    buttonText={isSubmit ? "Удаление..." : "Да"}
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
      <InfoTooltip onSubmit={onSubmit} setOnSubmit={setOnSubmit} />
    </CurrentUserContext.Provider>
  );
}

export default App;
