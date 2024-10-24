import { Image, Text, View } from "react-native";
import Clip from "../../assets/Clipboard.png";
import { styles } from "./styles";

export function Empty() {
  return (
    <View style={styles.emptyContainer}>
      <Image source={Clip} style={styles.image} />
      <Text style={styles.emptyTextBold}>
        Você ainda não tem tarefas cadastradas
      </Text>
      <Text style={[styles.emptyTextBold, styles.emptyTextRegular]}>
        Crie tarefas e organize seus itens a fazer
      </Text>
    </View>
  );
}
