$(function(){
    $('#J-page-box').fullpage({
        loopHorizontal: false,
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {
            let slide = $(this);
            let chart = slide.find('.B-chart');
            let id = chart.attr('id');
            
            window[id] && window[id].call();
        }
    });
    
    $('#J-loading').text('周五分享');
})