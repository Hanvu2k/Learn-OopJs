class DragContainer extends HTMLElement {
  #col = this.getAttribute("col");
  #colGap = this.getAttribute("col-gap");
  constructor() {
    super();
    this.style.display = "grid";
    this.style.gridTemplateColumns = `repeat(${this.#col}, 1fr)`;
    this.style.gap = `${this.#colGap || "30"}px`;
  }
}

class DragList extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("dragover", this.dragOver);
    this.addEventListener("dragend", this.dragEnd);
  }

  dragOver(e) {
    e.preventDefault();
    const bottomEl = this.insertAboveElement(e.clientY);
    const curEl = document.querySelector("[is-dragging='true']");

    if (!bottomEl) {
      this.appendChild(curEl);
    } else {
      this.insertBefore(curEl, bottomEl);
    }
  }

  insertAboveElement(y) {
    const els = this.querySelectorAll("drag-item:not([is-dragging='true'])");
    let closestEl = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    els.forEach((el) => {
      const { top } = el.getBoundingClientRect();
      const offset = y - top;

      if (offset < 0 && offset > closestOffset) {
        closestOffset = offset;
        closestEl = el;
      }
    });

    return closestEl;
  }

  dragEnd(e) {
    e.preventDefault();
    const draggedItem = document.querySelector("[is-dragging='true']");
    draggedItem.drop();
  }
}

class DragItem extends HTMLElement {
  constructor() {
    super();
    this.style.display = "block";
    this.setAttribute("draggable", "true");
    this.addEventListener("dragstart", this.dragStart);
  }

  dragStart(e) {
    this.setAttribute("is-dragging", "true");
  }

  drop() {
    this.setAttribute("is-dragging", "false");
  }
}

customElements.define("drag-container", DragContainer);
customElements.define("drag-list", DragList);
customElements.define("drag-item", DragItem);
