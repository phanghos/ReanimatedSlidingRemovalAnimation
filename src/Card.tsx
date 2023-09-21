import React from 'react';
import type { Item } from './types';
import { Text, TouchableOpacity } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

const ANIMATION_DURATION = 750;

type CardProps = {
  item: Item;
  cardWidth: number;
  index: number;
  removingIndex: number | undefined;
  totalItemsCount: number;
  isSecondToLast: boolean;
  onRemove: () => void;
};

export const Card = ({
  item,
  cardWidth,
  index,
  removingIndex,
  totalItemsCount,
  isSecondToLast,
  onRemove,
}: CardProps) => {
  const translateX = useDerivedValue(() => {
    if (removingIndex === undefined) {
      return 0;
    }

    const isRemovingLast = removingIndex === totalItemsCount - 1;

    const isSecondToLastAndIsRemovingLast = isSecondToLast && isRemovingLast;

    const shouldMoveToTheLeft = index >= removingIndex;

    return isSecondToLastAndIsRemovingLast || shouldMoveToTheLeft
      ? isSecondToLastAndIsRemovingLast
        ? withTiming(cardWidth + 8, {
            duration: ANIMATION_DURATION,
            easing: Easing.linear,
          })
        : withTiming(-cardWidth - 8, {
            duration: ANIMATION_DURATION,
            easing: Easing.linear,
          })
      : 0;
  });

  const animatedStyle = useAnimatedStyle(() => ({
    zIndex:
      removingIndex === undefined ? index : index === removingIndex ? 1 : 2,
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          width: cardWidth,
          flexDirection: 'row',
          backgroundColor: '#faf',
          padding: 8,
          borderRadius: 4,
          alignItems: 'center',
        },
        animatedStyle,
      ]}>
      <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold' }}>
        {item.text}
      </Text>
      <TouchableOpacity onPress={onRemove}>
        <Text>X</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
