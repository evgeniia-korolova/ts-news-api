import App from './components/app/app';
import './global.css';

(async () => {
    try {
        const app = new App();
        app.start();
    } catch (error) {
        // TODO: Вызвать класс отрисовки глобальной ошибки на экране
        console.error('Критическая ошибка инициализации приложения:', error);
    }
})();
