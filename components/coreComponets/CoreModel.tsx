import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

interface CoreModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  content?: string;
  children?: React.ReactNode;
}

const CoreModal: React.FC<CoreModalProps> = ({
  isVisible,
  onClose,
  title,
  content,
  children,
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
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          <Text style={styles.modalTitle}>{title}</Text>
          {content && <Text style={styles.content}>{content}</Text>}
          {children}

          <TouchableOpacity style={styles.bottomCloseButton} onPress={onClose}>
            <Text style={styles.bottomCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default CoreModal;

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
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
  bottomCloseButton: {
    // marginTop: 20,
    // backgroundColor: "#FF9F1C",
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    // borderRadius: 18,
    marginTop: 20,
    width:"30%",
    backgroundColor: "#FF9F1C",
    paddingVertical: 10, // Adjusted to match bottomCloseButton
    paddingHorizontal: 20,
    borderRadius: 18,
    alignItems: "center",
    marginRight: 10,
  },
  bottomCloseButtonText: {
    color: "#0D2927",
    fontWeight: "bold",
  },
});
