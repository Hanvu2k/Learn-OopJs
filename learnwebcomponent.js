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

    curEl.style.backgroundColor = "rgba(0, 0, 0, 0.2)";

    const els = this.querySelectorAll("drag-item:not([is-dragging='true'])");
    els.forEach((el) => {
      el.style.transition = "transform 0.3s";
      el.style.transform = "translateY(0)";
    });

    if (!bottomEl) {
      this.appendChild(curEl);
    } else {
      this.insertBefore(curEl, bottomEl);
      bottomEl.style.transform = "translateY(30px)";
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
    draggedItem.style.backgroundColor = "#ff6c6c";

    const dragListElements = document.querySelectorAll("drag-list");
    dragListElements.forEach((dragList) => {
      const items = dragList.querySelectorAll("drag-item");
      items.forEach((item) => {
        item.style.transition = "none";
        item.style.transform = "none";
      });
    });
  }
}

class DragItem extends HTMLElement {
  constructor() {
    super();
    this.style.display = "block";
    this.setAttribute("draggable", "true");
    this.addEventListener("dragstart", this.dragStart);
  }

  dragStart() {
    this.setAttribute("is-dragging", "true");
  }

  drop() {
    this.setAttribute("is-dragging", "false");
  }
}

customElements.define("drag-container", DragContainer);
customElements.define("drag-list", DragList);
customElements.define("drag-item", DragItem);
