import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {PurchaseTabParams} from '../models/NavigationModel';
import {scale} from '../services/Scale';
import Colors from '../themes/Colors';
import Images from '../themes/Images';
import {Image, StyleSheet, View} from 'react-native';
import Text from '../components/Text';
import {
  HomePurchaseScreen,
  MenuOfferScreen,
  MenuOrderBuyScreen,
  MenuBuyScreen,
  MenuAccountScreen,
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
                  <Image
                    source={Images.iconPesanBeliActive}
                    style={styles.icon}
                  />
                  <Text family="semiBold" color={Colors.primary} size={10.5}>
                    Pesan
                  </Text>
                </View>
              );
            } else {
              return (
                <View style={styles.justifyCenter}>
                  <Image source={Images.iconPesanBeli} style={styles.icon} />
                  <Text
                    family="regular"
                    color={Colors.fontSemiBlack}
                    size={10.5}>
                    Pesan
                  </Text>
                </View>
              );
            }
          } else if (route?.name === 'MenuOfferScreen') {
            if (focused) {
              return (
                <View style={styles.justifyCenter}>
                  <Image source={Images.iconOfferActive} style={styles.icon} />
                  <Text
                    textAlign="center"
                    family="semiBold"
                    color={Colors.primary}
                    size={10.5}>
                    Penawaran
                  </Text>
                </View>
              );
            } else {
              return (
                <View style={styles.justifyCenter}>
                  <Image source={Images.iconOffer} style={styles.icon} />
                  <Text
                    textAlign="center"
                    family="regular"
                    color={Colors.fontSemiBlack}
                    size={10.5}>
                    Penawaran
                  </Text>
                </View>
              );
            }
          } else if (route?.name === 'MenuOrderBuyScreen') {
            if (focused) {
              return (
                <View style={styles.justifyCenter}>
                  <Image
                    source={Images.iconPesanBeliActive}
                    style={styles.icon}
                  />
                  <Text
                    textAlign="center"
                    family="semiBold"
                    color={Colors.primary}
                    size={10.5}>
                    Pesan Beli
                  </Text>
                </View>
              );
            } else {
              return (
                <View style={styles.justifyCenter}>
                  <Image source={Images.iconPesanBeli} style={styles.icon} />
                  <Text
                    textAlign="center"
                    family="regular"
                    color={Colors.fontSemiBlack}
                    size={10.5}>
                    Pesan Beli
                  </Text>
                </View>
              );
            }
          } else if (route?.name === 'MenuBuyScreen') {
            if (focused) {
              return (
                <View style={styles.justifyCenter}>
                  <Image source={Images.iconCartFilled} style={styles.icon} />
                  <Text
                    textAlign="center"
                    family="semiBold"
                    color={Colors.primary}
                    size={10.5}>
                    Pesan Cuci
                  </Text>
                </View>
              );
            } else {
              return (
                <View style={styles.justifyCenter}>
                  <Image source={Images.iconCart} style={styles.icon} />
                  <Text
                    textAlign="center"
                    family="regular"
                    color={Colors.fontSemiBlack}
                    size={10.5}>
                    Pesan Cuci
                  </Text>
                </View>
              );
            }
          } else if (route?.name === 'MenuAccountScreen') {
            if (focused) {
              return (
                <View style={styles.justifyCenter}>
                  <Image
                    source={Images.iconAccountActive}
                    style={styles.icon}
                  />
                  <Text
                    textAlign="center"
                    family="semiBold"
                    color={Colors.primary}
                    size={10.5}>
                    Akun
                  </Text>
                </View>
              );
            } else {
              return (
                <View style={styles.justifyCenter}>
                  <Image source={Images.iconAccount2} style={styles.icon} />
                  <Text
                    textAlign="center"
                    family="regular"
                    color={Colors.fontSemiBlack}
                    size={10.5}>
                    Akun
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
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="MenuOrderBuyScreen"
        component={MenuOrderBuyScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="MenuBuyScreen"
        component={MenuBuyScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="MenuOfferScreen"
        component={MenuOfferScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="MenuAccountScreen"
        component={MenuAccountScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default PurchaseTab;
