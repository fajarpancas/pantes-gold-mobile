//
//  ConstantModule.m
//  PantesRequest
//
//  Created by Fajar Panca on 10/04/23.
//

#import <UIKit/UIKit.h>
#import "React/RCTBridgeModule.h"
#import "AppDelegate.h"

#import "ConstantHelper.h"

@implementation ConstantHelper : NSObject

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getConstantForKey: (NSString *)key){
  return [[NSBundle mainBundle] objectForInfoDictionaryKey:key];
}

RCT_EXPORT_MODULE();
@end
