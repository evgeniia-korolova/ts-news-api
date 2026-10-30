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
            await this.controller.getSources((data) => this.view.drawSources(data));
        } catch (error) {
            // TODO: Вызывать класс отрисовки ошибки в UI при сбое стартовой загрузки
            console.error('Ошибка при стартовой загрузке источников:', error);
        }
    }
}

export default App;
