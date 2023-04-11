# VirtualSpirit BoilerPlate V2

This is new boilerplate of VirtualSpirit Mobile.

# Dependencies

1. `react-navigation` as an app navigation
2. `immer` to handle immutablility
3. `zustand` as a store management
4. `react-native-mmkv` as an app local storage
5. `react-native-dropdownalert` to show dropdown alert in the app
6. `reactotron-react-native` to easiy debug/log on development

# Project Structure

- `src/App.tsx` = root app component
- `src/components/` = folder to store any `components`
- `src/config/` = folder to store any javascript configuration. example `reactotron`
- `src/const/` = folder to store any constant, like default/initial value
- `src/images/` = folder to store any images
- `src/models/` = folder to store any type/interface for typescript purpose
- `src/modules/` = folder to store javascript function of native modules
- `src/navigation/` = folder to store any file related to navigation
- `src/screens/` = folder to store screen files
- `src/services/` = folder to store any custom module/services, such as `NavigationServices`, `ApiServices`, `LoadingHelper`, etc
- `src/stores/` = folder to store related to `Zustand` configuration
- `src/themes/` = foldet to store global `color`, `images`, `styles`

# Coding Standard

1. used `snake_case` for any `folder`
2. used `camelCase` for any `file` & `variable`
3. used `Class Component` for any `Screen`, but you can used `Functional Component` in any components of the screen.
4. used `ref` to prevent `re-render` and `re-used` global component if possible. For example check `LoadingHelper` & `LoadingModal`

# How to use

## App Environtment

This project provide three environtment, the environtment will be using any constant that set in native way. check doc below `How to set Constant & env` for more detail.

1. `Debug` For android you can run `npx react-native run-android`. For IOS open Xcode then select schema with name equal to project name `VsBoilerPlateV2`
2. `Staging` For android you can run `npx react-native run-android --variant=ReleaseStaging`. For IOS open Xcode then select schema that start with name `Staging - ...`
3. `Production` For android you can run `npx react-native run-android --variant=Release`. For IOS open Xcode then select schema that start with name `Production - ...`

notes: where is `schema`? next to `play` button in xcode.

## Constant & Env

The env or any important constant is set in native side, then you can used it on Javascript using `ConstantHelper` module. This is to makesure that developer do not mix the constant on different environtment, and will be easy to maintain and more secure.

### Android

check listed file below

1. `android/app/build.gradle` -> scroll to `buildTypes`
2. `android/app/src/.../modules/constanthelper/ConstantHelperModule.java`

### IOS

check this in the xcode project

1. select `the project (VsBoilerPlateV2)` -> select targets `VsBoilerPlateV2` -> choose tab `Build Settings` -> scroll to `User-Defined`
2. open `Info.Plist` file

### Javascript

In the javascript side you can get the constant using `getConstantForKey` method. example `getConstantForKey('BASE_URL')`

## SplashScreen

### Edit SplashScreen

1. `Android`, open `Android Studio` then edit file `android/src/main/.../res/layout/launch_screen.xml`
2. `IOS`, open `Xcode` then edit the view under `LaunScreen.storyboard`

This splashscreen will start whenever app launch at the first time. Then you can hide it using `SplashScreen.hide()` method in javascript side

## Navigation

This project using `react-navigation v6` also using `react-native-bundle-splitter`, meaning whenever you create a new screen you need to register the screen to bundle splitter first, before import it into react-navigation. Check file below

1. `src/services/bundle_splitter/`
2. `src/navigation/`

Beside that, since we're using bundle splitter, we recommended you to use `NavigationServices` to do navigation instead of using `navigation` props from screen

## Zustand

Check `src/stores` folder for zustand/store configuration & setup. Then check `LoginScreen.tsx` to call action from zustand/store, and check `RootNavigation.tsx` to get value from zustand/store.

#### How to call the action from the store?
```javascript
authStore.getState().loginRequest({email: this.email, password: this.password});
```

#### How to subscribe value from the store?
```javascript

// You can access props from here to put it into selector.
const Selectors = (props: any) => ({
  isLogin: useSessionStore((state: SessionModel) => state.isLogin),
  userData: useSessionStore((state: SessionModel) => state.userData[props.id]),
});

export default connect(Selectors)(RootNavigation);
```

#### How to get value without subscribe changes from the store?
```javascript
const isLogin = authStore.getState().isLogin;
```


#### How to do shallow comparison, to prevent rendering same value?
```javascript
import {shallow} from 'zustand/shallow';

export const sessionStore = createStore<SessionModel>()(
  ....
);

// put shallow to do comparison on nextstate and prevstate
const useSessionStore = (selector: any) =>
  useStore(sessionStore, selector, shallow);

export default useSessionStore;
```



## Api Request

You can list any of api under `ApiServices.ts`, by creating a function into that class. Then you can used the api into any files in the app, but we recommend you to use the api request under `ZustandAction`.

# How to contribute

1. create your own branch
2. add anything important
3. add doc into `README.md`
4. `create pull request` and inform the changes
5. ask your friend

# How to config CodePush

1. create your app center project iOS & Android
2. change app_secret in appcenter-config.json with your project app_secret
3. login app center in your vscode, then generate CodePushDeploymentKey staging & production for iOS & Android with run:

- `appcenter codepush deployment add -a ${owner/app-name} ${variant}`

4. change CodePushDeploymentKey iOS & Android with staging & production key that you generate in step 3

- for iOS: open XCode --> select project --> select Build Settings --> search `CODEPUSH_KEY` --> change key value
- for Android: open file `/android/app/build.gradle` --> under buildTypes there is resValue with key `CodePushDeploymentKey` --> change key value --> save

5. how to test:

- make some update in js / ts file
- update iOS staging: run `yarn codepush-ios:staging`
- update iOS production: run `yarn codepush-ios:production`
- update Android staging: run `yarn codepush-android:staging`
- update Android production: run `yarn codepush-android:production`
  notes: you may need adjust script to run codepush update in package.json
