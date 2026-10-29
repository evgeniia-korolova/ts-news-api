import { SourceItem } from 'types/types';
import './sources.css';

class Sources {
    draw(data: SourceItem[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');
        const source = document.querySelector('.sources');

        if (!(sourceItemTemp instanceof HTMLTemplateElement)) return;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true);
            if (!(sourceClone instanceof DocumentFragment)) return;

            const sourceName = sourceClone.querySelector('.source__item-name');
            if (sourceName instanceof HTMLElement) {
                sourceName.textContent = item.name;
            }

            const sourceItem = sourceClone.querySelector('.source__item');
            if (sourceItem instanceof HTMLElement) {
                sourceItem.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        if (source) {
            source.innerHTML = '';
            source.append(fragment);
        }
    }
}

export default Sources;
