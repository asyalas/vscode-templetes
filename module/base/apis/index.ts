import { useFetch } from '@/utils';

// interface URLOptions {
//   merchant_id: string;
//   acquirer_id: string;
// }

/**
 * 获取角色列表
 */
export const useGetRoleList = () => {
  return useFetch({
    url: '/api/permission/{{namespace}}/role',
    method: 'GET',
    initialData: []
  });
};

/**
 * 获取列表
 */
export const useGet{{moduleName}}List = () => {
  return useFetch({
    url: '/api/permission/{{namespace}}',
    method: 'GET'
  });
};

/**
 * 编辑账号
 */
export const useEdit{{moduleName}} = () => {
  return useFetch({
    url: (id: string) => `/api/permission/{{namespace}}/${id}`,
    method: 'PUT'
  });
};

/**
 * 新增账号
 */
export const useAdd{{moduleName}} = () => {
  return useFetch({
    url: '/api/permission/{{namespace}}',
    method: 'POST'
  });
};

/**
 * 删除账号
 */
export const useDelete{{moduleName}} = () => {
  return useFetch({
    url: (id: string) => `/api/permission/{{namespace}}/${id}`,
    method: 'DELETE'
  });
};

/**
 * 停用账号
 */
export const useStop{{moduleName}} = () => {
  return useFetch({
    url: (id: string) => `/api/permission/{{namespace}}/${id}`,
    method: 'PUT'
  });
};
/**
 * 启用账号
 */
export const useOpen{{moduleName}} = () => {
  return useFetch({
    url: (id: string) => `/api/permission/{{namespace}}/${id}`,
    method: 'PUT'
  });
};