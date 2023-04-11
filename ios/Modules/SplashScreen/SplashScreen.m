//
//  SplashScreen.m
//  VsBoilerPlateV2
//
//  Created by Rahmat Zulfikri on 10/02/23.
//

#import <UIKit/UIKit.h>
#import "React/RCTBridgeModule.h"
#import "AppDelegate.h"

#import "SplashScreen.h"

@implementation SplashScreen

RCT_EXPORT_METHOD(show){
  dispatch_async(dispatch_get_main_queue(), ^{
    AppDelegate *appDelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
    [appDelegate showSplashScreen];
  });
}
RCT_EXPORT_METHOD(hide){
  dispatch_async(dispatch_get_main_queue(), ^{
    AppDelegate *appDelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
    [appDelegate dismissSplashScreen];
  });
};

RCT_EXPORT_MODULE();
@end

