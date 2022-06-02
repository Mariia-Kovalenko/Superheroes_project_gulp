export const toggleSideNav = () => {
    const nav = document.querySelector('.nav__list');

    const burger = document.querySelector('.nav__burger');
    const close = document.querySelector('.nav__close');
    const body = document.querySelector('body');

    burger.addEventListener('click', (e) => {
        console.log(e.target.tagName);
            if(e.target && e.target.closest('img')){
                nav.style.right = 0;
                body.style.overflow = 'hidden';
                burger.style.display = 'none';
                
                if(close.classList.contains('hide')){
                    close.classList.remove('hide');
                }
            }
    });

    close.addEventListener('click', (e) => {
        if(e.target && e.target.closest('img')){
            nav.style.right = '-100%';
            body.style.overflow = '';
            burger.style.display = 'block';
        }
        if(!close.classList.contains('hide')){
            close.classList.add('hide');
        }
    });
}