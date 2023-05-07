import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  AddOrderScreen,
  CartScreen,
  HomeScreen,
} from '../services/bundle_splitter/MainRegistration';
import {MainTabParams} from '../models/NavigationModel';
import {scale} from '../services/Scale';
import Colors from '../themes/Colors';
import Images from '../themes/Images';
import {Image, StyleSheet, View} from 'react-native';
import Text from '../components/Text';
import Spacer from '../components/Spacer';
import NavigationServices from '../services/NavigationServices';
const Tab = createBottomTabNavigator<MainTabParams>();
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

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.fontSemiBlack,
        tabBarIcon: ({focused}) => {
          if (route.name === 'AddOrder') {
            return (
              <View style={styles.addWrapper}>
                <Image source={Images.iconAdd} style={styles.addIcon} />
                <Spacer height={5} />
                <Text family="semiBold" color={Colors.primary} size={11.67}>
                  Pesan
                </Text>
              </View>
            );
          } else if (route.name === 'HomeScreen') {
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
          } else if (route.name === 'CartScreen') {
            if (focused) {
              return (
                <View style={styles.justifyCenter}>
                  <Image source={Images.iconCartFilled} style={styles.icon} />
                  <Text family="semiBold" color={Colors.primary} size={11.67}>
                    Keranjang
                  </Text>
                </View>
              );
            }
          }
          return (
            <View style={styles.justifyCenter}>
              <Image source={Images.iconCart} style={styles.icon} />
              <Text family="regular" color={Colors.fontBlack} size={11.67}>
                Keranjang
              </Text>
            </View>
          );
        },
      })}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title: 'Home', headerShown: false}}
      />
      <Tab.Screen
        name="AddOrder"
        component={HomeScreen}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            NavigationServices.navigate('AddOrderScreen', {}); // <-- Here you put the name where the chat component is declared
          },
        })}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{title: 'Keranjang', headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
