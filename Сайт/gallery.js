// gallery.js – лайтбокс для галереи изображений
(function() {
    // Создаём элементы модального окна
    const modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    modal.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-content" id="lightbox-img" src="" alt="">
        <div class="lightbox-nav">
            <span class="lightbox-prev">&#10094;</span>
            <span class="lightbox-next">&#10095;</span>
        </div>
    `;
    document.body.appendChild(modal);

    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    let currentIndex = 0;
    let images = []; // будет заполнено при открытии

    // Функция открытия модального окна
    function openLightbox(index, imagesArray) {
        images = imagesArray;
        currentIndex = index;
        lightboxImg.src = images[currentIndex];
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // запрещаем прокрутку фона
    }

    // Закрытие
    function closeLightbox() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // возвращаем прокрутку
    }

    // Переключение на предыдущее изображение
    function prevImage() {
        if (images.length > 0) {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            lightboxImg.src = images[currentIndex];
        }
    }

    // Переключение на следующее изображение
    function nextImage() {
        if (images.length > 0) {
            currentIndex = (currentIndex + 1) % images.length;
            lightboxImg.src = images[currentIndex];
        }
    }

    // Обработчики событий
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    // Закрытие по клику вне изображения (на подложку)
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeLightbox();
        }
    });

    // Навигация с клавиатуры
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('show')) return;
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });

    // Находим все изображения внутри элементов с классом .gallery
    // Предполагаем, что галерея имеет структуру <div class="gallery"> <img src="..."> ... </div>
    const galleryImages = document.querySelectorAll('.gallery img');
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            // Собираем массив src всех изображений галереи (можно ограничиться текущей галереей)
            const parentGallery = this.closest('.gallery');
            if (parentGallery) {
                const imgs = Array.from(parentGallery.querySelectorAll('img')).map(img => img.src);
                openLightbox(index, imgs);
            } else {
                // если изображение не в .gallery, открываем его одно
                openLightbox(0, [this.src]);
            }
        });
    });
})();