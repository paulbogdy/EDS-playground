import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const title = block.querySelector('div:first-child');
  const img = block.querySelector('img');
  const description = block.querySelector('div:nth-child(3)');
  const button = block.querySelector('div:nth-child(4)');
  button.className = 'test-card-button';

  const ul = document.createElement('ul');
  const li = document.createElement('li');
  li.className = 'test-card';

  let imageDiv = document.createElement('div');
  imageDiv.className = 'test-card-image';
  imageDiv.append(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));

  let descriptionDiv = document.createElement('div');
  descriptionDiv.className = 'test-card-body';
  descriptionDiv.append(description);

  li.append(title, imageDiv, descriptionDiv, button);
  ul.append(li);
  block.textContent = '';
  block.append(ul);

  button.addEventListener('click', () => {
    const temp = imageDiv.cloneNode(true);
    imageDiv.replaceWith(descriptionDiv.cloneNode(true));
    descriptionDiv.replaceWith(temp);
    imageDiv = descriptionDiv;
    descriptionDiv = temp;
  });
}