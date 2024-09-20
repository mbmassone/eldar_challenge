import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import LoginScreen from './screen/loginScreen.tsx';
import HomeScreen from './screen/homeScreen.tsx';
import ErrorScreen from './screen/errorScreen.tsx';

import store from './redux/store.ts'
import { Provider } from 'react-redux'
import EditPostScreen from './screen/editPostScreen.tsx';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginScreen />,
    errorElement: <ErrorScreen />,
  },
  {
    path: "/",
    element: <HomeScreen />,
    errorElement: <ErrorScreen />,
  },
  {
    path: "/editPost",
    element: <EditPostScreen />,
    errorElement: <ErrorScreen />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
