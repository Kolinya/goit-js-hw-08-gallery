import galleryImages from "./gallery-items.js";
const refs = {
  galleryEl: document.querySelector(".js-gallery"),
  modalEl: document.querySelector(".js-lightbox"),
  modalImageEl: document.querySelector(".lightbox__image"),
};
const galleryImgCard = createImgCard(galleryImages);
refs.galleryEl.insertAdjacentHTML("beforeend", galleryImgCard);

refs.galleryEl.addEventListener("click", toOpenModal);
refs.modalEl.addEventListener("click", closeModal);
window.addEventListener("keydown", onButtonKey);

function createImgCard(galleryImages) {
  return galleryImages
    .map(({ preview, original, description }) => {
      return `<li class="gallery_item">
        <a class="gallery_link" href="${original}">
        <img class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}">
        </a>
        </li>`;
    })
    .join("");
}

function toOpenModal(event) {
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  event.preventDefault();
  refs.modalEl.classList.add("is-open");

  setAttr(
    event.target.getAttribute("data-source"),
    event.target.getAttribute("alt")
  );
}

function toCloseModal() {
  refs.modalEl.classList.remove("is-open");
  setAttr("", "");
}

function closeModal(event) {
  if (event.target.classList.contains("lightbox__overlay")) {
    toCloseModal();
  }

  if (event.target.classList.contains("lightbox__button")) {
    toCloseModal();
  }
}
function onButtonKey(event) {
  if (event.code === "Escape") {
    toCloseModal();
  }
}
function setAttr(src, alt) {
  refs.modalImageEl.src = src;
  refs.modalImageEl.alt = alt;
}
