import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  CartScreen,
  HomeScreen,
} from '../services/bundle_splitter/MainRegistration';
import {MainTabParams, PurchaseTabParams} from '../models/NavigationModel';
import {scale} from '../services/Scale';
import Colors from '../themes/Colors';
import Images from '../themes/Images';
import {Image, StyleSheet, View} from 'react-native';
import Text from '../components/Text';
import Spacer from '../components/Spacer';
import NavigationServices from '../services/NavigationServices';
import {
  HomePurchaseScreen,
  MenuOfferScreen,
} from '../services/bundle_splitter/PurchaseRegistration';
const Tab = createBottomTabNavigator<PurchaseTabParams>();
const styles = StyleSheet.create({
  icon: {
    height: scale(24),
    width: scale(24),
  },
  tabBarLabelStyle: {
    fontSize: 1,
    color: Colors.white,
  },
  tabBarStyle: {
    borderTopColor: Colors.outlineBase,
    borderTopWidth: 1,
    paddingTop: scale(3.5),
    height: scale(60),
  },
  justifyCenter: {
    alignItems: 'center',
  },
  addIcon: {
    height: scale(40),
    width: scale(40),
    resizeMode: 'contain',
  },
  addWrapper: {
    marginTop: scale(-30),
    alignItems: 'center',
  },
});

const PurchaseTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.fontSemiBlack,
        tabBarIcon: ({focused}) => {
          if (route?.name === 'HomePurchaseScreen') {
            if (focused) {
              return (
                <View style={styles.justifyCenter}>
                  <Image source={Images.iconHomeFilled} style={styles.icon} />
                  <Text family="semiBold" color={Colors.primary} size={11.67}>
                    Home
                  </Text>
                </View>
              );
            } else {
              return (
                <View style={styles.justifyCenter}>
                  <Image source={Images.iconHome} style={styles.icon} />
                  <Text
                    family="regular"
                    color={Colors.fontSemiBlack}
                    size={11.67}>
                    Home
                  </Text>
                </View>
              );
            }
          } else if (route?.name === 'MenuOfferScreen') {
            if (focused) {
              return (
                <View style={styles.justifyCenter}>
                  <Image source={Images.iconOfferActive} style={styles.icon} />
                  <Text family="semiBold" color={Colors.primary} size={11.67}>
                    Penawaran
                  </Text>
                </View>
              );
            } else {
              return (
                <View style={styles.justifyCenter}>
                  <Image source={Images.iconOffer} style={styles.icon} />
                  <Text
                    family="regular"
                    color={Colors.fontSemiBlack}
                    size={11.67}>
                    Penawaran
                  </Text>
                </View>
              );
            }
          }
        },
      })}>
      <Tab.Screen
        name="HomePurchaseScreen"
        component={HomePurchaseScreen}
        options={{title: 'Home', headerShown: false}}
      />
      <Tab.Screen
        name="MenuOfferScreen"
        component={MenuOfferScreen}
        options={{title: 'Penawaran', headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default PurchaseTab;
