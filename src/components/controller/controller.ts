import { NewsResponse, SourcesResponse } from 'types/types';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: (data: SourcesResponse) => void) {
        super.getResp<SourcesResponse>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: (data: NewsResponse) => void) {
        const target = e.target;

        const newsContainer = e.currentTarget;
        if (!target || !newsContainer || !(target instanceof HTMLElement) || !(newsContainer instanceof HTMLElement)) {
            return;
        }

        const sourceItem = target.closest('.source__item');

        if (sourceItem instanceof HTMLElement) {
            const sourceId = sourceItem.getAttribute('data-source-id');
            if (!sourceId) return;
            if (newsContainer.getAttribute('data-source') !== sourceId) {
                newsContainer.setAttribute('data-source', sourceId);
                super.getResp<NewsResponse>(
                    {
                        endpoint: 'everything',
                        options: {
                            sources: sourceId,
                        },
                    },
                    callback
                );
            }
        }
    }
}

export default AppController;
