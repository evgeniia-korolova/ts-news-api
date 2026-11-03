import ErrorNotifier from 'components/view/notifier/errorNotifier';
import App from './components/app/app';
import './global.css';

(async () => {
    try {
        const burgerBtn = document.querySelector('.burger-btn');
        const sourcesMenu = document.querySelector('.sources');

        if (burgerBtn && sourcesMenu) {
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
        } else {
            console.warn('Mobile menu elements are missing in DOM');
        }

        const app = new App();
        app.start();
    } catch (error) {
        const notifier = new ErrorNotifier();
        const errorMessage = error instanceof Error ? error.message : 'Unknown critical error';
        notifier.show(errorMessage);
        console.error('Critical error upon init:', error);
    }
})();
