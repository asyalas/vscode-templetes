import { get } from '@/i18n';
import { message } from '@/ui';
import { throwErrorMsg } from '@/utils';
import {
  useAdd{{moduleName}},
  useDelete{{moduleName}},
  useEdit{{moduleName}},
  useGet{{moduleName}}List,
  useGetRoleList,
  useOpen{{moduleName}},
  useStop{{moduleName}}
} from '../apis';

interface StoreProps {
  children: any;
  setState: any;
}

// 获取角色列表
export const RoleList = (props: StoreProps) => {
  const { setState, children } = props;
  // 请求列表
  const { doFetch, ...data } = useGetRoleList();

  const getRoleListApi = (params: any) => {
    return doFetch(params).catch((error: any) => {
      throwErrorMsg(error, '{{namespace}}.getRoleListApiError');
      return Promise.reject();
    });
  };

  setState({
    getRoleListApi,
    ...data
  });
  return children;
};

// 获取基本信息
export const List = (props: StoreProps) => {
  const { setState, children } = props;
  // 请求列表
  const { doFetch, ...data } = useGet{{moduleName}}List();

  const get{{moduleName}}ListApi = (params: any) => {
    return doFetch(params).catch((error: any) => {
      throwErrorMsg(error, '{{namespace}}.get{{moduleName}}ListApiError');
      return Promise.reject();
    });
  };

  setState({
    get{{moduleName}}ListApi,
    ...data
  });
  return children;
};

// 启用账号
export const Open = (props: StoreProps) => {
  const { setState, children } = props;
  // 请求列表
  const { doFetch, ...data } = useOpen{{moduleName}}();

  const open{{moduleName}}Api = (params: any) => {
    return doFetch(params).catch((error: any) => {
      throwErrorMsg(error, '{{namespace}}.open{{moduleName}}ApiError');
      return Promise.reject();
    });
  };

  setState({
    open{{moduleName}}Api,
    ...data
  });
  return children;
};

// 停用账号
export const Stop = (props: StoreProps) => {
  const { setState, children } = props;
  // 请求列表
  const { doFetch, ...data } = useStop{{moduleName}}();

  const stop{{moduleName}}Api = (params: any) => {
    return doFetch(params).catch((error: any) => {
      throwErrorMsg(error, '{{namespace}}.stop{{moduleName}}ApiError');
      return Promise.reject();
    });
  };

  setState({
    stop{{moduleName}}Api,
    ...data
  });
  return children;
};
// 编辑账号
export const Edit = (props: StoreProps) => {
  const { setState, children } = props;
  // 请求列表
  const { doFetch, ...data } = useEdit{{moduleName}}();

  const edit{{moduleName}}Api = (params: any) => {
    return doFetch(params).catch((error: any) => {
      throwErrorMsg(error, '{{namespace}}.edit{{moduleName}}ApiError');
      return Promise.reject();
    });
  };

  setState({
    edit{{moduleName}}Api,
    ...data
  });
  return children;
};

// 新增账号
export const Add = (props: StoreProps) => {
  const { setState, children } = props;
  // 请求列表
  const { doFetch, ...data } = useAdd{{moduleName}}();

  const add{{moduleName}}Api = (params: any) => {
    return doFetch(params).catch((error: any) => {
      throwErrorMsg(error, '{{namespace}}.add{{moduleName}}ApiError');
      return Promise.reject();
    });
  };

  setState({
    add{{moduleName}}Api,
    ...data
  });
  return children;
};

// 删除账号
export const Delete = (props: StoreProps) => {
  const { setState, children } = props;
  // 请求列表
  const { doFetch, ...data } = useDelete{{moduleName}}();

  const delete{{moduleName}}Api = (params: any) => {
    return doFetch(params).catch((error: any) => {
      throwErrorMsg(error, '{{namespace}}.delete{{moduleName}}ApiError');
      return Promise.reject();
    });
  };

  setState({
    delete{{moduleName}}Api,
    ...data
  });
  return children;
};
