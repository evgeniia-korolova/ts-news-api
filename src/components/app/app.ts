import { AppView } from './../view/appView';
import AppController from '../controller/controller';
import ErrorNotifier from 'components/view/notifier/errorNotifier';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;
    private readonly notifier: ErrorNotifier;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
        this.notifier = new ErrorNotifier();
    }

    async start(): Promise<void> {
        const sources = document.querySelector('.sources');

        if (sources instanceof HTMLElement) {
            sources.addEventListener('click', async (e) => {
                try {
                    await this.controller.getNews(e, (data) => this.view.drawNews(data));
                } catch (error) {
                    const msg = error instanceof Error ? error.message : 'Ошибка при загрузке новостей';
                    this.notifier.show(msg);
                    console.error('Ошибка при загрузке новостей:', error);
                }
            });
        } else {
            throw new Error("Критическая ошибка UI: Главный контейнер '.sources' не найден в DOM.");
        }

        try {
            const sourcesData = await this.controller.getSources((data) => this.view.drawSources(data));

            const sources = sourcesData.sources ?? [];
            let activeSourceId = '';

            for (let i = 0; i < sources.length; i++) {
                const currentId = sources[i].id;
                try {
                    const news = await this.controller.getNewsRaw(currentId);

                    if (news.articles && news.articles.length > 0) {
                        activeSourceId = currentId;
                        const activeBtn = document.querySelector(`[data-source-id="${activeSourceId}"]`);
                        if (activeBtn instanceof HTMLElement) {
                            activeBtn.classList.add('source__item_active');
                        }

                        this.view.drawNews(news);

                        break;
                    }
                } catch (err) {
                    console.warn(`Источник ${currentId} пуст или недоступен, проверяем следующий...`, err);
                }
            }
            if (!activeSourceId) {
                throw new Error('Все доступные источники новостей вернули пустой результат.');
            }
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Критическая ошибка при старте приложения';
            this.notifier.show(msg);

            console.error('Критическая ошибка при старте приложения:', error);

            throw error;
        }
    }
}

export default App;
