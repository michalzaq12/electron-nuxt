import test from 'ava'
import { mergeConfig, baseConfig } from '../../../.electron-nuxt/renderer/nuxt.config'



test('should merge users config with base (objects and arrays)', t => {

  const userConfig = {
    router: {
      middleware: [
        'user-agent', 'check-auth'
      ]
    }
  };

  const config = mergeConfig(userConfig);
  t.deepEqual(
    config.router,
    {
      ...baseConfig.router,
      ...userConfig.router,
    }
  );
  t.false(config.build.extend === undefined);
});




test('should merge users extend function with base', t => {

  const FAKE_WEBPACK_CONFIG = {
    output: {},
    plugins: [],
    resolve: {}
  };

  const OVERRIDE_FIELDS = 'override_fields';

  const userConfig = {
    build: {
      extend(config){
        config.USER_EXTEND_CALLED = true;
        config.target = OVERRIDE_FIELDS;
      }
    }
  };

  const config = mergeConfig(userConfig);
  try{
    const extend = config.build.extend;
    extend(FAKE_WEBPACK_CONFIG, {});
    t.true(FAKE_WEBPACK_CONFIG.USER_EXTEND_CALLED);
    t.is(FAKE_WEBPACK_CONFIG.target, OVERRIDE_FIELDS, OVERRIDE_FIELDS);
  }catch (e) {
    t.fail(e.message);
  }

});
