import { get } from '@/i18n';
import { SearchBarTable } from '@/ui/materials';
import {
  useDidMount,
  useEffect,
  useInputState,
  useStaticCallback,
  useTableState
} from '@/utils';
import * as React from 'react';
import { useContext } from 'react-stores-hooks';
import { {{moduleName}}Modal } from '../components';

const {{moduleName}} = () => {
  const {
    state,
    pagination,
    onReload,
    onSearch
  } = useTableState({ key: '' });

  // table列表
  const { response, loading, get{{moduleName}}ListApi } = useContext('{{namespace}}.List');
  // 新增账号
  const { loading: addLoading, add{{moduleName}}Api } = useContext('{{namespace}}.Add');
  // 删除账号
  const {
    loading: deleteLoading,
    delete{{moduleName}}Api
  } = useContext('{{namespace}}.Delete');
  // 编辑账号
  const { loading: editLoading, edit{{moduleName}}Api } = useContext('{{namespace}}.Edit');
  // 停用账号
  const { loading: stopLoading, stop{{moduleName}}Api } = useContext('{{namespace}}.Stop');
  // 启用账号
  const { loading: openLoading, open{{moduleName}}Api } = useContext('{{namespace}}.Open');
  // 获取角色列表
  const { getRoleListApi, response: roleList } = useContext('{{namespace}}.RoleList');

  useDidMount(() => {
    getRoleListApi();
  });

  useEffect(() => {
    get{{moduleName}}ListApi(state);
  }, [state]);

  // 是否为启用状态
  const isOpen = useStaticCallback(
    (record: any) => {
      const openStatus = 1;
      return +record.status === openStatus;
    }
  );

  // 搜索的input
  const [value, , bind] = useInputState(undefined);

  return (
    <SearchBarTable
      extraListProps={[
        {
          type: 'button',
          isModal: true,
          modal: <{{moduleName}}Modal
            data={roleList}
            confirmLoading={addLoading}
            title={get('{{namespace}}.add{{moduleName}}')}
          />,
          modalProps: {
            onOk: (close: any, params: any) => {
              add{{moduleName}}Api(params).then(() => {
                close();
                onReload();
              });
            },
          },
          props: {
            text: get('{{namespace}}.add{{moduleName}}'),
          }
        }
      ]}
      searchListProps={[
        {
          type: 'input',
          props: {
            isSearch: true,
            ...bind,
            placeholder: get('{{namespace}}.searchPlaceholder'),
            onSearch: () => onSearch({ key: value }),
            style: {
              width: 260
            }
          }
        },
        {
          type: 'button',
          props: {
            text: get('{{namespace}}.search'),
            onClick: () => onSearch({ key: value })
          }
        }
      ]}
      tableProps={{
        loading,
        rowKey: (a: any) => a.id,
        pagination: {
          ...pagination,
          total: response.total
        },
        isShowFooter: !!response.total,
        footerTxt: `${get('{{namespace}}.{{namespace}}Num')}:${response.total}`,
        dataSource: response.result,
        columns: [
          {
            title: get('{{namespace}}.No'),
            key: 'No',
            render: (record: any, a: any, index: number) => index + 1
          },
          {
            title: get('{{namespace}}.{{namespace}}Name'),
            key: '{{namespace}}Name',
            dataIndex: '{{namespace}}_name'
          },
          {
            title: get('{{namespace}}.name'),
            key: 'name',
            dataIndex: 'name'
          },
          {
            title: get('{{namespace}}.department'),
            key: 'department',
            dataIndex: 'department'
          },
          {
            title: get('{{namespace}}.role'),
            key: 'role',
            dataIndex: 'role'
          },
          {
            title: get('{{namespace}}.status'),
            key: 'status',
            renderItem: (record: any) => ({
              type: isOpen(record) ? 'blue' : 'red',
              key: 'status',
              render: isOpen(record) ?
                get('{{namespace}}.normal') :
                get('{{namespace}}.stop'),
            })
          },
          {
            key: 'operate',
            title: get('{{namespace}}.op'),
            renderItem: (record: any) => ([
              {
                type: 'blue',
                render: get('{{namespace}}.edit'),
                key: 'edit',
                isModal: true,
                modal: <{{moduleName}}Modal
                  data={roleList}
                  {{namespace}}Data={record}
                  confirmLoading={editLoading}
                  title={get('{{namespace}}.edit{{moduleName}}')}
                />,
                modalProps: {
                  onOk: (close: any, body: any) => {
                    edit{{moduleName}}Api({
                      URLOptions: record.id,
                      body
                    }).then(() => {
                      close();
                      onReload();
                    });
                  },
                }
              },
              {
                type: isOpen(record) ? 'red' : 'blue',
                render: isOpen(record) ?
                  get('{{namespace}}.stop') :
                  get('{{namespace}}.open'),
                isModal: true,
                key: 'stopOrOpen',
                modalProps: ({

                  confirmLoading: openLoading || stopLoading,
                  title: get('{{namespace}}.prompt'),
                  onOk: (close: any) => {
                    const fn = isOpen(record) ? stop{{moduleName}}Api : open{{moduleName}}Api;
                    fn({
                      URLOptions: record.id,
                      body: {
                        // 1 -->启用 2--> 停用
                        status: isOpen(record) ? 2 : 1
                      }
                    }).then(() => {
                      close();
                      onReload();
                    });
                  },
                  content: isOpen(record) ?
                    get('{{namespace}}.openModalTxt') :
                    get('{{namespace}}.stopModalTxt')

                })
              },
              {
                type: 'red',
                render: get('{{namespace}}.delete'),
                isModal: true,
                key: 'delete',
                modalProps: ({
                  title: get('{{namespace}}.prompt'),
                  confirmLoading: deleteLoading,
                  content: get('{{namespace}}.deleteModalTxt'),
                  onOk: (close: any) => {
                    delete{{moduleName}}Api({
                      URLOptions: record.id
                    }).then(() => {
                      close();
                      onReload();
                    });
                  },
                })
              },
            ])
          }
        ],
      }}
    />
  );
};

export default {{moduleName}};
