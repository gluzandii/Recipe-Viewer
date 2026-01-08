import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import "./index.scss"
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from './library/theme.tsx';
import {AuthProvider} from './library/auth.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ThemeProvider>
                    <App/>
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
)
