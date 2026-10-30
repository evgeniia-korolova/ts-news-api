import { AppView } from './../view/appView';
import AppController from '../controller/controller';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    async start(): Promise<void> {
        const sources = document.querySelector('.sources');

        if (sources instanceof HTMLElement) {
            sources.addEventListener('click', async (e) => {
                try {
                    await this.controller.getNews(e, (data) => this.view.drawNews(data));
                } catch (error) {
                    // TODO: Вызывать класс отрисовки ошибки в UI при сбое загрузки новостей
                    console.error('Ошибка при загрузке новостей:', error);
                }
            });
        } else {
            // TODO: Обработка ошибки DOM, если контейнер .sources не найден
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
                        // TODO: Найти в DOM кнопку с этим id и добавить ей класс активности (.source__item_active) и удалить блок
                        if (!activeSourceId) {
                            console.log('Все источники пустые');
                        }

                        this.view.drawNews(news);

                        break;
                    }
                } catch (err) {
                    console.warn(`Источник ${currentId} пуст или недоступен, проверяем следующий...`, err);
                }
            }
        } catch (error) {
            console.error('Критическая ошибка при старте приложения:', error);
            // TODO: Вызвать ErrorNotifier
        }
    }
}

export default App;
