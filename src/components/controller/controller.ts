import { NewsResponse, SourcesResponse } from 'types/types';
import AppLoader from './appLoader';
import { isNewsResponse, isSourcesResponse } from 'utils/typeGuards';

class AppController extends AppLoader {
    getSources(callback: (data: SourcesResponse) => void): Promise<SourcesResponse> {
        return super.getResp<SourcesResponse>(
            {
                endpoint: 'sources',
            },
            callback,
            isSourcesResponse
        );
    }

    getNews(e: Event, callback: (data: NewsResponse) => void): Promise<NewsResponse> | undefined {
        const target = e.target;

        const newsContainer = e.currentTarget;
        if (!target || !newsContainer || !(target instanceof HTMLElement) || !(newsContainer instanceof HTMLElement)) {
            // TODO: Вместо молчаливого return выбрасывать критическую ошибку DOM, если элементы не валидны
            return;
        }

        const sourceItem = target.closest('.source__item');

        if (sourceItem instanceof HTMLElement) {
            const sourceId = sourceItem.getAttribute('data-source-id');
            if (!sourceId) return;
            if (newsContainer.getAttribute('data-source') !== sourceId) {
                newsContainer.setAttribute('data-source', sourceId);
                return super.getResp<NewsResponse>(
                    {
                        endpoint: 'everything',
                        options: { sources: sourceId },
                    },
                    callback,
                    isNewsResponse
                );
            }
        }
    }

    getNewsRaw(sourceId: string, callback: (data: NewsResponse) => void = () => {}): Promise<NewsResponse> {
        return super.getResp<NewsResponse>(
            {
                endpoint: 'everything',
                options: { sources: sourceId },
            },
            callback,
            isNewsResponse
        );
    }
}

export default AppController;
