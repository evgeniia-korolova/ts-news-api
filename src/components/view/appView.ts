import { NewsResponse, SourcesResponse } from 'types/types';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsResponse) {
        const values = data?.articles ?? [];
        this.news.draw(values);
    }

    drawSources(data: SourcesResponse) {
        const values = data?.sources ?? [];
        this.sources.draw(values);
    }
}

export default AppView;
