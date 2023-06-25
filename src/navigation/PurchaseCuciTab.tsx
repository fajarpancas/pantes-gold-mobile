import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CuciTabParams} from '../models/NavigationModel';
import {scale} from '../services/Scale';
import Colors from '../themes/Colors';
import Images from '../themes/Images';
import {Image, StyleSheet, View} from 'react-native';
import Text from '../components/Text';
import {
  CabangPesanCuciScreen,
  HomeCuciScreen,
  MenuAccountScreen,
  CuciOrderBuyScreen,
} from '../services/bundle_splitter/CuciRegistration';

const Tab = createBottomTabNavigator<CuciTabParams>();
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

const PurchaseCuciTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.fontSemiBlack,
        tabBarIcon: ({focused}) => {
          if (route?.name === 'HomeCuciScreen') {
            if (focused) {
              return (
                <View style={styles.justifyCenter}>
                  <Image
                    source={Images.iconPesanBeliActive}
                    style={styles.icon}
                  />
                  <Text family="semiBold" color={Colors.primary} size={10}>
                    Pesanan Pusat
                  </Text>
                </View>
              );
            } else {
              return (
                <View style={styles.justifyCenter}>
                  <Image source={Images.iconPesanBeli} style={styles.icon} />
                  <Text family="regular" color={Colors.fontSemiBlack} size={10}>
                    Pesanan Pusat
                  </Text>
                </View>
              );
            }
          } else if (route?.name === 'CabangPesanCuciScreen') {
            if (focused) {
              return (
                <View style={styles.justifyCenter}>
                  <Image
                    source={Images.iconPesanBeliActive}
                    style={styles.icon}
                  />
                  <Text
                    style={{textAlign: 'center'}}
                    family="semiBold"
                    color={Colors.primary}
                    size={10}>
                    Pesanan Cabang
                  </Text>
                </View>
              );
            } else {
              return (
                <View style={styles.justifyCenter}>
                  <Image source={Images.iconPesanBeli} style={styles.icon} />
                  <Text
                    style={{textAlign: 'center'}}
                    family="regular"
                    color={Colors.fontSemiBlack}
                    size={10}>
                    Pesanan Cabang
                  </Text>
                </View>
              );
            }
          } else if (route?.name === 'CuciOrderBuyScreen') {
            if (focused) {
              return (
                <View style={styles.justifyCenter}>
                  <Image
                    source={Images.iconPesanBeliActive}
                    style={styles.icon}
                  />
                  <Text family="semiBold" color={Colors.primary} size={10}>
                    Pesan Beli
                  </Text>
                </View>
              );
            } else {
              return (
                <View style={styles.justifyCenter}>
                  <Image source={Images.iconPesanBeli} style={styles.icon} />
                  <Text family="regular" color={Colors.fontSemiBlack} size={10}>
                    Pesan Beli
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
                  <Text family="semiBold" color={Colors.primary} size={10}>
                    Akun
                  </Text>
                </View>
              );
            } else {
              return (
                <View style={styles.justifyCenter}>
                  <Image source={Images.iconAccount2} style={styles.icon} />
                  <Text family="regular" color={Colors.fontSemiBlack} size={10}>
                    Akun
                  </Text>
                </View>
              );
            }
          }
        },
      })}>
      <Tab.Screen
        name="HomeCuciScreen"
        component={HomeCuciScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="CabangPesanCuciScreen"
        component={CabangPesanCuciScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="CuciOrderBuyScreen"
        component={CuciOrderBuyScreen}
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

export default PurchaseCuciTab;
