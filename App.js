import { ThemeProvider } from "../todo-frontend/src/ThemeContext"
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <ThemeProvider>
      <RootNavigator/> {/* Your app navigation */}
    </ThemeProvider>
  );
}
