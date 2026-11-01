import { SourceItem } from 'types/types';
import './sources.css';

class Sources {
    draw(data: SourceItem[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');
        const source = document.querySelector('.sources');

        if (!(sourceItemTemp instanceof HTMLTemplateElement)) {
            throw new Error("UI Error: Template '#sourceItemTemp' is not found.");
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true);
            if (!(sourceClone instanceof DocumentFragment)) {
                throw new Error('UI Error: Failed to clone source template.');
            }

            const sourceName = sourceClone.querySelector('.source__item-name');
            if (!(sourceName instanceof HTMLElement)) {
                throw new Error("UI Error: Element '.source__item-name' is missinig in the source template.");
            }
            sourceName.textContent = item.name;

            const sourceItem = sourceClone.querySelector('.source__item');
            if (!(sourceItem instanceof HTMLElement)) {
                throw new Error("UI Error: Element '.source__item' is missinig in the source template.");
            }
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        if (!source) {
            throw new Error("UI Error: Container '.sources' is missing in DOM.");
        }

        source.innerHTML = '';
        source.append(fragment);
    }
}

export default Sources;
