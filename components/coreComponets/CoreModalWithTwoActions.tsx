import React, { useEffect, useRef } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from "react-native";

interface CoreModalWithTwoActionsProps {
    isVisible: boolean;
    title?: string;
    content?: string;
    onClose: () => void;
    onConfirm: () => void;
}

const CoreModalWithTwoActions: React.FC<CoreModalWithTwoActionsProps> = ({
    isVisible,
    title = "Confirm",
    content = "Are you sure you want to proceed?",
    onClose,
    onConfirm,
}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        if (isVisible) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 0.8,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [isVisible]);

    return (
        <Modal visible={isVisible} transparent animationType="none">
            <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
                <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleAnim }] }]}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.content}>{content}</Text>

                    {/* Buttons Styled like CoreModal */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.okButton} onPress={onConfirm}>
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
};

export default CoreModalWithTwoActions;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        alignItems: "center",
        elevation: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    content: {
        fontSize: 14,
        textAlign: "center",
        marginBottom: 20,
        color: "#666",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        marginTop: 15,
    },
    cancelButton: {
        // flex: 1,
        marginTop: 20,
        width: "30%",
        backgroundColor: "#FF9F1C",
        paddingVertical: 10, // Adjusted to match bottomCloseButton
        paddingHorizontal: 20,
        borderRadius: 18,
        alignItems: "center",
        marginRight: 10,
    },
    okButton: {
        // flex: 1,
        marginTop: 20,
        width: "30%",
        backgroundColor: "#0D2927",
        paddingVertical: 10, // Adjusted to match bottomCloseButton
        paddingHorizontal: 20,
        borderRadius: 18,
        alignItems: "center",



    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});
