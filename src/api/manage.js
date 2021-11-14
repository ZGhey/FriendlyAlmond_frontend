import request from '@/utils/request'

export function getAction(url, parameter = { headers: null, responseType: null }) {
  return request({
    url: url,
    method: 'get',
    headers: parameter.headers ? parameter.headers : {},
    params: parameter,
    responseType: parameter.responseType ? parameter.responseType : {}
  })
}

export function deleteAction(url, parameter) {
  return request({
    url: url,
    method: 'delete',
    data: parameter
  })
}

export function deleteBatchAction(url, parameter) {
  return request({
    url: url,
    method: 'post',
    data: parameter
  })
}

export function postAction(url, parameter) {
  return request({
    url: url,
    method: 'post',
    data: parameter
  })
}

export function putAction(url, parameter) {
  return request({
    url: url,
    method: 'put',
    data: parameter
  })
}
