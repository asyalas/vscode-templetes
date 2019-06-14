import { AuthSwitch, LoadableRoute as Route } from '@/router';
import { InitProvider } from '@/utils';
import React from 'react';
import { StoreProvider } from 'react-stores-hooks';
import i18ns from './i18ns';
import * as reducers from './reducers';
const {{moduleName}} = () => {
  return (
    <InitProvider locales={i18ns}>
      <StoreProvider namespace="{{namespace}}" reducers={reducers}>
        <AuthSwitch>
          <Route
            path="/system/{{namespace}}"
            exact={true}
            breads={['menus.system', 'menus.{{namespace}}']}
            loader={() => import('./containers')}
          />
        </AuthSwitch>
      </StoreProvider>
    </InitProvider>
  );
};
export default {{moduleName}};
