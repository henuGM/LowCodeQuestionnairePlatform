import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ManageLayout from "../layouts/ManageLayout";
import QuestionLayout from "../layouts/QuestionLayout";
import List from "../pages/manage/List";
import Star from "../pages/manage/Star";
import Trash from "../pages/manage/Trash";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";

const Edit = lazy(() => import(/* webpackChunkName: "editPage" */ '../pages/question/Edit'))
const Stat = lazy(() => import(/* webpackChunkName: "statPage" */ '../pages/question/Stat'))
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/manage",
        element: <ManageLayout />,
        children: [
          {
            path: "list",
            element: <List />,
          },
          {
            path: "star",
            element: <Star />,
          },
          {
            path: "trash",
            element: <Trash />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "question",
    element: <QuestionLayout />,
    children: [
      { 
        path: "edit/:id", 
        element: <Edit /> },
      {
        path: "stat/:id",
        element: <Stat />,
      },
    ],
  },
]);
export default router;

export const HOME_PATHNAME='/'
export const LOGIN_PATHNAME='/login'
export const REGISTER_PATHNAME='/register'
export const MANAGE_INDEX_PATHNAME='/manage/list'

export function isLoginOrRegister(pathname:string){
  if([LOGIN_PATHNAME,REGISTER_PATHNAME].includes(pathname)) return true;
  return false;
}

export function isNoNeedUserInfo(pathname:string){
  if([HOME_PATHNAME,LOGIN_PATHNAME,REGISTER_PATHNAME].includes(pathname)) return true;
  return false;
}