import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./style.css";
import "./i18n";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <Provider store={store}>
    <ThemeProvider>
      <AppWrapper>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            success: {
              style: {
                background: "#172C53",
                color: "#fff",
                zIndex: "99",
              },
            },
            error: {
              style: {
                background: "#D02030",
                color: "#fff",
                zIndex: "99",
              },
            },
          }}
        />
      </AppWrapper>
    </ThemeProvider>
  </Provider>,
);
