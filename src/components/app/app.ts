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
                    const msg = error instanceof Error ? error.message : 'failed to load news';
                    this.notifier.show(msg);
                    console.error('Failed to load news:', error);
                }
            });
        } else {
            throw new Error("UI Error: Container '.sources' is missing in DOM.");
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
                    console.warn(`Source ${currentId} is missing or unavailable...`, err);
                }
            }
            if (!activeSourceId) {
                throw new Error('All sources are empty.');
            }
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Critical error starting app';
            this.notifier.show(msg);

            console.error('Critical error starting app:', error);

            throw error;
        }
    }
}

export default App;
