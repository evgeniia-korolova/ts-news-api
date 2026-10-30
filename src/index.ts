import App from './components/app/app';
import './global.css';

(async () => {
    try {
        const burgerBtn = document.querySelector('.burger-btn');
        const sourcesMenu = document.querySelector('.sources');

        if (!burgerBtn) {
            throw new Error("Критический элемент UI '.burger-btn' не найден в DOM.");
        }
        if (!sourcesMenu) {
            throw new Error("Критический контейнер UI '.sources' не найден в DOM.");
        }

        burgerBtn.addEventListener('click', () => {
            burgerBtn.classList.toggle('is-active');
            sourcesMenu.classList.toggle('is-open');
        });

        sourcesMenu.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target.closest('.source__item')) {
                burgerBtn.classList.remove('is-active');
                sourcesMenu.classList.remove('is-open');
            }
        });

        const app = new App();
        app.start();
    } catch (error) {
        // TODO: Вызвать класс отрисовки глобальной ошибки на экране
        console.error('Критическая ошибка инициализации приложения:', error);
    }
})();
