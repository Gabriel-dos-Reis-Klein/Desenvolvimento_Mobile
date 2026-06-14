import { StyleSheet, View } from "react-native"
import { COLORS } from "../../theme"

export default function StitchLine({
    style,
    ...props
}) {
    return (
        <View style={[styles.line, style]} {...props}>
          {Array.from({ length: 5 }).map((_, index) => (
            <View
              key={index}
              style={styles.dash}
            />
          ))}
        </View>
    )
}

const styles = StyleSheet.create({
    line: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    dash: {
        width: 15,
        height: 2,
        backgroundColor: COLORS.black,
    },
})