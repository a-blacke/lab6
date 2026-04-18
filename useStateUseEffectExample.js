import React, { useState, useEffect } from 'react';
import { Text, Button, View } from 'react-native';

function CounterApp() {
  // 1. useState: "count" is the memory, "setCount" is the pen to change it.
  // We start the memory at 0.
  const [count, setCount] = useState(0);

  // 2. useEffect: This runs ONCE when the app first loads.
  useEffect(() => {
    console.log("The screen just opened! Fetching data...");
    
    // This is a "side effect" because it's talking to the outside world.
  }, []); // The empty [] means "only run on start"

  return (
    <View style={{ padding: 50 }}>
      <Text>You clicked {count} times</Text>
      
      <Button 
        title="Click Me" 
        onPress={() => setCount(count + 1)} // Use the "pen" to update memory
      />
    </View>
  );
}
