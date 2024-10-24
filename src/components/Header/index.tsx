import { Image, TextInput, TouchableOpacity, View } from "react-native";
import logoImage from "../../assets/Logo.png";
import { styles } from "./styles";
import { CirclePlus } from "lucide-react-native";
import { theme } from "../../theme";

type HeaderProps = {
  task: string;
  inputRef: React.RefObject<TextInput>;
  onChangeText: (task: string) => void;
  onPress: () => void;
};

export function Header({ task, inputRef, onChangeText, onPress }: HeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <Image source={logoImage} />
      <View style={styles.form}>
        <TextInput
          style={[
            styles.input,
            inputRef.current?.isFocused() && task ? styles.inputFocus : null,
          ]}
          placeholder="Adicione uma nova tarefa"
          placeholderTextColor={theme.colors.base.gray300}
          value={task}
          onChangeText={onChangeText}
          ref={inputRef}
          autoCorrect={false}
          onSubmitEditing={onPress}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <CirclePlus size={16} color={theme.colors.base.gray100} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
