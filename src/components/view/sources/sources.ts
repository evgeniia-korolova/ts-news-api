import { SourceItem } from 'types/types';
import './sources.css';

class Sources {
    draw(data: SourceItem[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');
        const source = document.querySelector('.sources');

        if (!(sourceItemTemp instanceof HTMLTemplateElement)) {
            throw new Error("Критическая ошибка UI: Шаблон '#sourceItemTemp' не найден в DOM или имеет неверный тип.");
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true);
            if (!(sourceClone instanceof DocumentFragment)) {
                throw new Error('Критическая ошибка UI: Не удалось склонировать шаблон источника.');
            }

            const sourceName = sourceClone.querySelector('.source__item-name');
            if (!(sourceName instanceof HTMLElement)) {
                throw new Error("Критическая ошибка UI: Элемент '.source__item-name' отсутствует в шаблоне источника.");
            }
            sourceName.textContent = item.name;

            const sourceItem = sourceClone.querySelector('.source__item');
            if (!(sourceItem instanceof HTMLElement)) {
                throw new Error("Критическая ошибка UI: Элемент '.source__item' отсутствует в шаблоне источника.");
            }
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        if (!source) {
            throw new Error("Критическая ошибка UI: Контейнер '.sources' для отрисовки не найден в DOM.");
        }

        source.innerHTML = '';
        source.append(fragment);
    }
}

export default Sources;
