import Inspect from 'vite-plugin-inspect';
import {resolve} from 'path';
import handlebars from 'vite-plugin-handlebars';

export default {
    plugins: [
        Inspect(),
        handlebars({
            partialDirectory: resolve(__dirname, 'src/components'),
        }),
    ],
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),
                registration: resolve(__dirname, 'src/pages/registration/registration.html'),
                chatWindow: resolve(__dirname, 'src/pages/chatWindow/chatWindow.html'),
                settingsPage: resolve(__dirname, 'src/pages/settingsPage/settingsPage.html'),
                notFound: resolve(__dirname, 'src/pages/404Page/404Page.html'),
                serverError: resolve(__dirname, 'src/pages/500Page/500Page.html'),
            }
        }
    },
}