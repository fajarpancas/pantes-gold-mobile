package com.pantesrequest.modules.constanthelper;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactApplicationContext;
import com.pantesrequest.BuildConfig;

public class ConstantHelperModule extends ReactContextBaseJavaModule {
  public ConstantHelperModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "ConstantHelper";
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public String getConstantForKey(String key) {
    switch (key) {
      case "BASE_URL": {
        return BuildConfig.BASE_URL;
      }
      case "ENVIRONTMENT": {
        return BuildConfig.ENVIRONTMENT;
      }
      default: {
        return "";
      }
    }
  }
}
