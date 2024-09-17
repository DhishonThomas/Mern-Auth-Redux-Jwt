import React from 'react'
import { createBrowserRouter,Outlet,RouterProvider,useLocation } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import { Provider } from 'react-redux'
import appStore from '../utils/appStore'
import Header from './Header'
import Profile from './Profile'
import RedirectOnAuth from '../utils/redirectOnAuth'
import CheckUserRouter from '../utils/checkUserRouter'
import AdminLogin from './AdminLogin'
import AdminHeader from './AdminHeader'
import AdminHome from './AdminHome'
import AdminView from './AdminView'
import AdminEdit from './AdminEdit'
import AdminAdd from './AdminAdd'
import AdminRedirectOnAuth from '../utils/AdminOnAuth'
import CheckAdminRouter from '../utils/checkAdminRouter'


const Body = () => {

const Applayout=()=>{

  
  const location = useLocation();
  
  
return(<>
  <Provider store={appStore}>
  {location.pathname.startsWith('/admin') ? <AdminHeader /> : <Header />}
  <Outlet/>
  </Provider>

  </>)
}

const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<Applayout/>,
    children:[
      {
        path:"/",
        element: <RedirectOnAuth><Login/></RedirectOnAuth>  
      },{
        path:"/home",
        element:<CheckUserRouter><Home/></CheckUserRouter>
      },
      {
        path:"/profile",
        element:<CheckUserRouter><Profile/></CheckUserRouter>
      },
      {
        path:"/admin",
        element:<AdminRedirectOnAuth><AdminLogin/></AdminRedirectOnAuth>
      },
      {
        path:"/adminHome",
        element:<CheckAdminRouter><AdminHome/></CheckAdminRouter>
      },
      {
        path:"/view/:userId",
        element:<CheckAdminRouter><AdminView/></CheckAdminRouter>
      },
      {
        path:"/edit/:userId",
        element:<CheckAdminRouter><AdminEdit/></CheckAdminRouter>
      },
      {
        path:"/adduser",
        element:<CheckAdminRouter><AdminAdd/></CheckAdminRouter>
      },
    ]
  }
])

return(
  <div>
    <RouterProvider router={appRouter}/>
  </div>
)

}

export default Body