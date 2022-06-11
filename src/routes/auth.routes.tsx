import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from ".";
import { PokemonDetails, FavoriteScreen, Home, Login } from "../scenes";

interface RoutesProps {}

const AppRoutes: React.FC<RoutesProps> = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/home/pokemon/:name" element={<PokemonDetails />} />
            <Route path="/home/favoritos" element={<FavoriteScreen />} />
          </Route>
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default AppRoutes;
