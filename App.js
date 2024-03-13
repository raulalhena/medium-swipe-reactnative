import { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import SwipeableCard from './components/SwipeableCard';
import styles from "./styles/styles";
import DEMO_CONTENT from "./data/data";

const App = () => {
  const [noMoreCard, setNoMoreCard] = useState(false);
  const [usersCardArray, setUsersCardArray] = useState(DEMO_CONTENT);
  const [swipeDirection, setSwipeDirection] = useState('--');

  const removeCard = (id) => {
    usersCardArray.splice(usersCardArray.findIndex((item) => item.id == id), 1);
    setUsersCardArray(usersCardArray);
    if (usersCardArray.length == 0) setNoMoreCard(true);
  };

  const lastSwipedDirection = (swipeDirection) => {
    setSwipeDirection(swipeDirection);
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 25, padding: 20, backgroundColor: '#22ffdd' }}>
      <View style={styles.container}>
        {usersCardArray.map((item, key) => (
          <SwipeableCard
            key={key}
            item={item}
            removeCard={() => removeCard(item.id)}
            swipedDirection={lastSwipedDirection}
          />
        ))}
        {noMoreCard ? (
          <Text style={{ fontSize: 22, color: '#000' }}>No hay mas tarjetas.</Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default App;