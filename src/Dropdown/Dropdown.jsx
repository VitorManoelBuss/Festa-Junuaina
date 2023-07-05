import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const data = [
  { label: 'Quentão pequeno', value: '1', price: 5.00 },
  { label: 'Quentão médio',   value: '2', price: 10.00 },
  { label: 'Quentão grande',  value: '3', price: 15.00 },
  { label: 'Little popcorn',  value: '4', price: 3.00 },
  { label: 'Pipoca média',    value: '5', price: 6.00 },
  { label: 'Pipoca grande',   value: '6', price: 9.00 },
  { label: 'Bolo',            value: '7', price: 4.00 },
  { label: 'Pé de moleque',   value: '8', price: 3.50 },
  { label: 'Cachorro quente', value: '9', price: 6.50 },
];

  const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]); // Novo estado para os itens selecionados
  
  const getTotalItems = () => {
    const totalValue = selectedItems.reduce((total, item) => total + item.price, 0);
    const totalQuantity = selectedItems.length;
    return { totalValue, totalQuantity };
  };

  const renderLabel = () => {
  if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>Dropdown label</Text>
      );
    }
    return null;
  };


  const handleOnChange = (item) => {
    setValue(item.value);
    setIsFocus(false);
    setSelectedItems([...selectedItems, item]); // Adiciona o item selecionado ao estado
  };

  return (
    <View style={styles.container}>
  <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleOnChange}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name="Safety"
            size={20}
          />
        )}
      />
      <View style={styles.selectedItemsContainer}>
        <Text>Selected items:</Text>
        {selectedItems.map((item) => (
          <View key={item.value} style={styles.selectedItem}>
            <Text style={styles.selectedItemLabel}>{item.label}</Text>
            <Text style={styles.selectedItemPrice}>${item.price.toFixed(2)}</Text>
          </View>
        ))}
        <Text>Total items: {getTotalItems().totalQuantity}</Text>
        <Text>Total value: ${getTotalItems().totalValue.toFixed(2)}</Text>
      </View>
    </View>
  );
};






export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selectedItemsContainer: {
    marginTop: 16,
  },
});
