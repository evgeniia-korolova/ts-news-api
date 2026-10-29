import { AppView } from './../view/appView';
import AppController from '../controller/controller';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sources = document.querySelector('.sources');
        if (sources instanceof HTMLElement) {
            sources.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        }

        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
