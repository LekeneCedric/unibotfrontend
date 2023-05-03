import AsyncStorage from "@react-native-async-storage/async-storage";

export async function save(key: string, value: string) {
  return await AsyncStorage.setItem(key, value);
}
export async function get(key: string) {
  return await AsyncStorage.getItem(key);
}
export async function remove(key: string) {
  return await AsyncStorage.removeItem(key);
}
