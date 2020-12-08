import React, { useContext, useLayoutEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./Page/Home";
// import Inputan from "./Main";

import Login from "./User/Login";
import Register from "./User/Register";


// import Movie from "./Pages/Movie_detail";
// import Game from "./Pages/Game_detail";
// import MovieList from './List/Movie';
// import GameList from './List/Game';
// import MovieEditor from './Editor/Movie'
// import GameEditor from './Editor/Game';

// import CreateMovie from './crud/CreateMovie';
// import MovieEdit from './crud/EditMovie'
// import GameEdit from './crud/EditGame';

// import { BaseContext } from './BaseContext'
// import CreateGame from "./crud/CreateGame";

const Routes = () => {
    //   const { token } = useContext(BaseContext);

    // Scroll to top if path changes
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/register">
                <Register />
            </Route>
        </Switch>
    );
};

export default Routes;