import { get } from '@/i18n';
import { Input, Line, Modal, Select } from '@/ui';
import { isEmptyObject, useEffect, useForm, useStaticCallback } from '@/utils';
import { ModalProps } from 'antd/lib/modal';
import React from 'react';
import './index.scss';

const { Option } = Select;

// 默认密码
const defaultPassword = '******';

interface {{moduleName}}ModalProps extends ModalProps {
  data: [];
  onOk?: (params: any) => void;
  {{namespace}}Data?: any;
}
export const {{moduleName}}Modal = (props: {{moduleName}}ModalProps) => {

  const { data, onOk, {{namespace}}Data, visible, ...modalProps } = props;
  // 是否是编辑模式
  const isEdit = !!{{namespace}}Data;

  const {
    store,
    error,
    getFieldErrorFirstMessage,
    getFieldDecorator,
    resetFields,
    setFields,
    setFieldsValue
  } = useForm();

  useEffect(() => {
    // 如果是编辑，更新数据
    if (visible && isEdit && !!{{namespace}}Data) {
      setFieldsValue({
        {{namespace}}: {{namespace}}Data.{{namespace}}_name,
        password: defaultPassword,
        surePassword: defaultPassword,
        name: {{namespace}}Data.name,
        department: {{namespace}}Data.department,
        role: (
          data.filter(
            (v: any) => v.name === {{namespace}}Data.role)[0] || { id: undefined }
        ).id
      });
    }
  }, [visible, {{namespace}}Data]);

  // 关闭模态框的时候清空数据
  const afterClose = useStaticCallback(() => {
    resetFields();
  });
  // onok事件
  const onOkHandle = useStaticCallback(() => {
    if (onOk) {
      const opts = {
        {{namespace}}_name: store.{{namespace}},
        password: store.password,
        name: store.name,
        department: store.department,
        role_id: store.role,
        role_name: (
          data.filter((v: any) => v.id === store.role)[0] || { name: '' }
        ).name
      };
      if (isEdit) {
        // 编辑时传入的参数,账号名称不能修改
        delete opts.{{namespace}}_name;
        if (opts.password === defaultPassword) {
           delete opts.password;
        }
      } 
      onOk(opts);
    }
  }, [store, data]);
  return (
    <Modal
      {...modalProps}
      afterClose={afterClose}
      visible={visible}
      wrapClassName={'system-{{namespace}}-modal'}
      okButtonProps={{
        // 禁用规则：全部填完且没有错误
        disabled: Object.values(error).some(Boolean) ||
          isEmptyObject(store) ||
          !Object.values(store).every(Boolean) ||
          Object.values(store).length < 6
      }}
      onOk={onOkHandle}
    >
      <Line
        label={get('{{namespace}}.{{namespace}}')}
        isError={!!getFieldErrorFirstMessage('{{namespace}}')}
        error={getFieldErrorFirstMessage('{{namespace}}')}
      >
        {
          getFieldDecorator('{{namespace}}', {
            rules: [

              { required: true, message: get('{{namespace}}.{{namespace}}Required') },
            ]
          })(
            <Input
              maxLength={10}
              placeholder={get('{{namespace}}.{{namespace}}Txt')}
              disabled={isEdit}
            />
          )
        }

      </Line>
      <Line
        label={get('{{namespace}}.password')}
        isError={!!getFieldErrorFirstMessage('password')}
        error={getFieldErrorFirstMessage('password')}
      >
        {
          getFieldDecorator('password', {
            rules: [

              { required: true, message: get('{{namespace}}.passwordRequired') },
              (rule: any, value: string) => {
                const surePassword = store.surePassword;
                const isEqual = value === surePassword;
                if (!isEqual) {
                  setFields({
                    surePassword: {
                      value: store.surePassword,
                      error: [{
                        message: get('{{namespace}}.passwordUnequal'),
                        field: 'surePassword'
                      }]
                    },
                    password: {
                      value,
                      error: []
                    }
                  });
                }
                return [];
              }
            ]
          })(
            <Input
              maxLength={6}
              type="password"
              placeholder={get('{{namespace}}.passwordTxt')}
            />
          )
        }
      </Line>
      <Line
        label={get('{{namespace}}.surePassword')}
        isError={!!getFieldErrorFirstMessage('surePassword')}
        error={getFieldErrorFirstMessage('surePassword')}
      >
        {
          getFieldDecorator('surePassword', {
            rules: [

              { required: true, message: get('{{namespace}}.surePasswordRequired') },
              (rule: any, value: string) => {
                const password = store.password;
                const isEqual = value === password;
                const errors = [];
                if (!isEqual) {
                  errors.push(get('{{namespace}}.passwordUnequal'));
                }
                return errors;
              }
            ]
          })(
            <Input
              placeholder={get('{{namespace}}.surePasswordTxt')}
              maxLength={6}
              type="password"
            />
          )
        }
      </Line>
      <Line label={get('{{namespace}}.name')}>
        {
          getFieldDecorator('name')(
            <Input
              maxLength={50}
              placeholder={get('{{namespace}}.nameTxt')}
            />
          )
        }
      </Line>
      <Line label={get('{{namespace}}.department')}>
        {
          getFieldDecorator('department')(
            <Input
              maxLength={50}
              placeholder={get('{{namespace}}.departmentTxt')}
            />
          )
        }
      </Line>
      <Line label={get('{{namespace}}.role')}>
        {
          getFieldDecorator('role', {
            onChange: v => v
          })(
            <Select
              placeholder={get('{{namespace}}.roleTxt')}
              style={{ width: '100%' }}
            >
              {data.map(
                (v: any) => (<Option key={v.id} value={v.id}>{v.name}</Option>)
              )}
            </Select>
          )
        }
      </Line>
    </Modal>
  );
};
