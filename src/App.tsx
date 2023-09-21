/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItem, SafeAreaView, View } from 'react-native';
import { Item } from './types';
import { Card } from './Card';

const ITEMS: Item[] = [
  { id: 1, text: 'Item #1' },
  { id: 2, text: 'Item #2' },
  { id: 3, text: 'Item #3' },
  { id: 4, text: 'Item #4' },
  { id: 5, text: 'Item #5' },
];

const CARD_WIDTH = 300;

const keyExtractor = (item: Item) => `${item.id}`;

const Separator = () => <View style={{ marginHorizontal: 8 }} />;

const ANIMATION_DURATION = 750;

const App = () => {
  const [items, setItems] = useState(ITEMS);
  const [removingIndex, setRemovingIndex] = useState<number>();

  useEffect(() => {
    setRemovingIndex(undefined);
  }, [items.length]);

  const renderItem: ListRenderItem<Item> = ({ item, index }) => {
    const onRemove = () => {
      setRemovingIndex(index);
      setTimeout(() => {
        setItems(currentItems => currentItems.filter(it => it.id !== item.id));
      }, ANIMATION_DURATION);
    };

    return (
      <Card
        item={item}
        cardWidth={CARD_WIDTH}
        index={index}
        removingIndex={removingIndex}
        totalItemsCount={items.length}
        isSecondToLast={index === items.length - 2}
        onRemove={onRemove}
      />
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={{ padding: 16 }}
        horizontal
        pagingEnabled
        snapToInterval={CARD_WIDTH + 8}
        snapToAlignment="start"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      />
    </SafeAreaView>
  );
};

export default App;
