import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
// common routes
export const constantRouterMap = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/purchase',
    name: 'Purchase',
    component: () => import(/* webpackChunkName: "home" */ '../views/Purchase.vue')
  },
  {
    path: '/models',
    name: 'Models',
    component: () => import(/* webpackChunkName: "models" */ '../views/Models.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "contact" */ '../views/Contact.vue')
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import(/* webpackChunkName: "signin" */ '../views/SignIn.vue')
  },
  {
    path: '/signout',
    name: 'SignOut',
    component: () => import(/* webpackChunkName: "signout" */ '../views/SignOut.vue')
  },
  {
    path: '/create-account',
    name: 'CreateAccount',
    component: () => import(/* webpackChunkName: "createaccount" */ '../views/CreateAccount.vue')
  },
  {
    path: '/order-details/:id',
    name: 'order-details',
    component: () => import(/* webpackChunkName: "order" */ '../views/OrderDetails.vue')
  }
]

const notFoundRouter = [
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
// user routes
const userRoutes = [
  {
    path: '/my',
    name: 'My',
    component: () => import(/* webpackChunkName: "my" */ '../views/My.vue')
  }
]
// admin routes
const adminRoutes = [
  {
    path: '/my',
    name: 'My',
    component: () => import(/* webpackChunkName: "myAdmin" */ '@/views/admin/MyAdmin.vue'),
    children: [
      {
        path: '',
        redirect: '/dashboard'
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "myAdmin" */ '@/views/admin/Dashboard.vue')
      },
      {
        path: '/account-setting',
        name: 'account-setting',
        component: () => import(/* webpackChunkName: "myAdmin" */ '@/views/admin/AccountSetting.vue')
      },
      {
        path: '/orders',
        name: 'orders',
        component: () => import(/* webpackChunkName: "myAdmin" */ '@/views/admin/Orders.vue')
      },
      {
        path: '/jobs',
        name: 'jobs',
        component: () => import(/* webpackChunkName: "myAdmin" */ '@/views/admin/Jobs.vue'),
        children: [
          {
            path: '',
            name: 'jobs-list',
            component: () => import(/* webpackChunkName: "myAdmin" */ '@/views/admin/modules/JobList.vue')
          },
          {
            path: '/jobs-edit',
            name: 'jobs-edit',
            component: () => import(/* webpackChunkName: "myAdmin" */ '@/views/admin/modules/JobEdit.vue')
          }
        ]
      },

      {
        path: '/customers',
        name: 'customers',
        component: () => import(/* webpackChunkName: "myAdmin" */ '@/views/admin/Customers.vue'),
        children: [
          {
            path: '',
            name: 'customers-list',
            component: () => import(/* webpackChunkName: "myAdmin" */ '@/views/admin/modules/CustomersList.vue')
          },
          {
            path: '/customers-edit',
            name: 'customers-edit',
            component: () => import(/* webpackChunkName: "myAdmin" */ '@/views/admin/modules/CustomerEdit.vue')
          }
        ]
      },
      {
        path: '/employees',
        name: 'employees',
        component: () => import(/* webpackChunkName: "myAdmin" */ '@/views/admin/Employees.vue'),
        children: [
          {
            path: '',
            name: 'employees-list',
            component: () => import(/* webpackChunkName: "myAdmin" */ '@/views/admin/modules/EmployeesList.vue')
          },
          {
            path: '/employees-edit',
            name: 'employees-edit',
            component: () => import(/* webpackChunkName: "myAdmin" */ '@/views/admin/modules/EmployeesEdit.vue')
          }
        ]
      }
    ]
  }
]

/**
 * generate router
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = data => {
  return new Promise((resolve, reject) => {
    let routers = []
    if (data && data.is_admin) {
      routers = routers.concat(adminRoutes).concat(notFoundRouter)
      resolve(routers)
    } else {
      routers = routers.concat(userRoutes).concat(notFoundRouter)
      resolve(routers)
    }
  })
}

// hack router push callback
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})

export default router
