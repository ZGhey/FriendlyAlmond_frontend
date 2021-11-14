import router from './router'
import store from './store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import { ACCESS_TOKEN } from '@/store/mutation-types'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const authList = [
  '/my',
  '/my-admin',
  '/dashboard',
  '/orders',
  '/jobs',
  '/jobs-edit',
  '/customers',
  '/customers-edit',
  '/employees',
  '/employees-edit',
  '/account-setting'
]
const loginRoutePath = '/signin'

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  const token = storage.get(ACCESS_TOKEN)
  if (token) {
    store.commit('setToken', token)
    const data = storage.get('user-info')
    store.commit('setFullName', `${data.first_name} ${data.last_name}`)
    if (!store.getters.addRouters.length) {
      store.dispatch('GenerateRoutes', data).then(() => {
        //  add routes dynamicly
        // VueRouter@3.5.0+ New API
        const routers = store.getters.addRouters
        routers.forEach(r => {
          router.addRoute(r)
        })
        // if redirect
        const redirect = decodeURIComponent(from.query.redirect || to.path)
        if (to.path === redirect) {
          // set the replace: true so the navigation will not leave a history record
          next({ ...to, replace: true })
        } else {
          next({ path: redirect })
        }
      })
    } else {
      next()
    }
  } else {
    if (authList.includes(to.fullPath)) {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
