import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import ImageColors from 'react-native-image-colors';

import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {RootStackParams} from '../navigator/Navigator';
import {FadeInImage} from './FadeInImage';

const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon;
}

export const PokemonCard = ({pokemon}: Props) => {
  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  useEffect(() => {
    if (!isMounted.current) {
      return;
    }
    getImgColor();

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getImgColor = async () => {
    const result = await ImageColors.getColors(pokemon.picture, {
      fallback: 'grey',
    });
    switch (result.platform) {
      case 'android':
        setBgColor(result.dominant || 'grey');
        break;
      case 'ios':
        setBgColor(result.background || 'grey');
        break;
      default:
        throw new Error('Unexpected platform key');
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate('PokemonScreen', {
          simplePokemon: pokemon,
          color: bgColor,
        })
      }>
      <View
        style={{
          ...styles.cardContainer,
          width: windowWidth * 0.4,
          backgroundColor: bgColor,
        }}>
        <View>
          <Text style={styles.name}>
            {pokemon.name} {'\n#' + pokemon.id}
          </Text>
        </View>

        <View style={styles.pokeballContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokeball}
          />
        </View>
        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
    textTransform: 'capitalize',
  },
  pokeball: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -25,
    bottom: -25,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
  },
  pokeballContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    opacity: 0.5,
    overflow: 'hidden',
  },
});
