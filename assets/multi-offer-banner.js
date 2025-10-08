function toggleMultiBanner(element){
    let parent_element = element.parentElement;
    let banner_content = parent_element.querySelector('.multi-banner-content');
    if(element.classList.contains('multi-banner--active')){
        element.classList.remove('multi-banner--active');
    } else {
        element.classList.add('multi-banner--active');
    }
    $(banner_content).slideToggle();
}