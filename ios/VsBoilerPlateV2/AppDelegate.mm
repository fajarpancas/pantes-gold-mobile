#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <CodePush/CodePush.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"VsBoilerPlateV2";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  [super application:application didFinishLaunchingWithOptions:launchOptions];
  
  [self showSplashScreen];

  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [CodePush bundleURL];
  //  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  return true;
}

- (void)showSplashScreen{
  UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"LaunchScreen" bundle:[NSBundle mainBundle]];
  UIViewController *animatedVc =[storyboard instantiateViewControllerWithIdentifier:@"SplashScreen"];
  [self showVC:animatedVc];
}

- (void)dismissSplashScreen{
  [self hideVC];
}

- (void)hideVC{
  [[self getTopViewController] dismissViewControllerAnimated:NO completion:NULL];
}

-(void)showVC:(UIViewController *)vc{
  if (@available(iOS 13, *)) {
    [vc setModalPresentationStyle: UIModalPresentationFullScreen];
  }
  [[self getTopViewController] presentViewController:vc animated:NO completion:NULL];
}

- (UIViewController*) getTopViewController { // top most ViewController
  UIViewController *topController = [UIApplication sharedApplication].keyWindow.rootViewController;

  while (topController.presentedViewController) {
      topController = topController.presentedViewController;
  }

  return topController;
}

@end
