import { Article } from 'types/types';
import './news.css';
import ErrorNotifier from '../notifier/errorNotifier';

class News {
    private readonly notifier = new ErrorNotifier();

    draw(data: Article[]): void {
        try {
            const fragment = document.createDocumentFragment();
            const newsItemTemp = document.querySelector('#newsItemTemp');
            const newsContainer = document.querySelector('.news');

            if (!(newsContainer instanceof HTMLElement)) {
                throw new Error("Критическая ошибка UI: Контейнер '.news' не найден в DOM или имеет неверный тип.");
            }

            if (data.length === 0) {
                if (newsContainer instanceof HTMLElement) {
                    newsContainer.innerHTML = '';

                    const emptyMessage = document.createElement('div');
                    emptyMessage.classList.add('news__empty');

                    emptyMessage.textContent = "Sorry, this source doesn't contain articles. Please chose another one.";

                    newsContainer.appendChild(emptyMessage);
                }
                return;
            }
            const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

            if (!(newsItemTemp instanceof HTMLTemplateElement)) {
                throw new Error("Template '#newsItemTemp' hasn't been found in DOM.");
            }

            news.forEach((item, idx) => {
                const newsClone = newsItemTemp.content.cloneNode(true);
                if (!(newsClone instanceof DocumentFragment)) {
                    throw new Error('failed to clone template news.');
                }
                const newsItem = newsClone.querySelector('.news__item');
                if (newsItem instanceof HTMLElement && idx % 2) {
                    newsItem.classList.add('alt');
                }

                const newsMetaPhoto = newsClone.querySelector('.news__meta-photo');
                if (newsMetaPhoto instanceof HTMLElement) {
                    newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                }

                const newsAuthor = newsClone.querySelector('.news__meta-author');
                if (newsAuthor instanceof HTMLElement) {
                    newsAuthor.textContent = item.author || item.source.name;
                }

                const newsMetaDate = newsClone.querySelector('.news__meta-date');
                if (newsMetaDate instanceof HTMLElement) {
                    newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                }

                const newsDescrTitle = newsClone.querySelector('.news__description-title');
                if (newsDescrTitle instanceof HTMLElement) {
                    newsDescrTitle.textContent = item.title;
                }

                const newsDescrSource = newsClone.querySelector('.news__description-source');
                if (newsDescrSource instanceof HTMLElement) {
                    newsDescrSource.textContent = item.source.name;
                }

                const newsDescrContent = newsClone.querySelector('.news__description-content');
                if (newsDescrContent instanceof HTMLElement) {
                    newsDescrContent.textContent = item.description;
                }

                const newsReadMore = newsClone.querySelector('.news__read-more a');
                if (newsReadMore instanceof HTMLAnchorElement) {
                    newsReadMore.setAttribute('href', item.url);
                }

                fragment.append(newsClone);
            });

            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Failed to draw news';
            this.notifier.show(msg);
            console.error(error);
        }
    }
}

export default News;
