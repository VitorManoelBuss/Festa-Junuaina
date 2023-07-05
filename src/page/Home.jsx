import {Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

import { useState } from "react";



import { Dropdown } from "react-native-element-dropdown";

export function Home() {

  const [listParticipant, setListParticipant] = useState([])
  const [nameParticipant, setNameParticipant] = useState('')



  function handleParticipantAdd(participant) {
    console.log('funcionando', Dropdown )
    if (listParticipant.includes(participant.trim())) {
      Alert.alert('Ohhhh.... Mané esse nené, já está na lista!!!')
    } else {
      // const str2 = str.charAt(0).toUpperCase() + str.slice(1);
      setListParticipant((prevState) => [...prevState, participant.charAt(0).toUpperCase() + participant.slice(1)]);
    }
  }

  function handleParticipantRemove(participant) {
    Alert.alert("Remover", `Remover o participante ${participant}`, [
      {
        text: 'sim',
        onPress: () => {
          setListParticipant(prevState => prevState.filter(participantName => participantName !== participant))
        }
      }, {
        text: 'não',
        onPress: () => Alert.alert('Mudei de Ideia')
      }])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleEvent}>Nome do Evento</Text>
      <Text style={styles.dateEvent}>Sexta, 2 de junho de 2023</Text>

      <DropdownComponent/>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante..."
          placeholderTextColor={"#6b6b6b"}
          onChangeText={setNameParticipant}
          value={nameParticipant}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={() => handleParticipantAdd(nameParticipant)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={listParticipant}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            participantRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participante a sua lista de presença.
          </Text>
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131016",
    padding: 24,
  },
  titleEvent: {
    color: "#fdfcfe",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 48,
  },
  dateEvent: {
    color: "#6b6b6b",
    fontSize: 16,
  },
  form: {
    width: "100%",
    flexDirection: "row",
    marginTop: 36,
    marginBottom: 42,
    gap: 7,
  },
  input: {
    flex: 1,
    height: 56,
    backgroundColor: "#1f1e25",
    borderRadius: 5,
    color: "#fff",
    padding: 16,
    fontSize: 16,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 5,
    backgroundColor: "#31cf67",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
  },
  listEmptyText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center'
  }
});
