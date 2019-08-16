(function ($) {
    "use strict"; // Start of use strict

    var oldWidth = null;

    function reduceSidebar() {
        var newWidth = $(window).width();
        if (oldWidth && oldWidth === newWidth) {
            return;
        }

        var $sidebar = $('.sidebar');
        var closeModal = $('.sidebar-close-modal');
        if ($(window).width() < 1350) {
            if (!$sidebar.hasClass('hidden')) $sidebar.addClass('hidden');
            if (!closeModal.hasClass('hidden')) closeModal.addClass('hidden');

            $('.sidebar .collapse').collapse('hide');
        } else if ($(window).width() > 1400 && $sidebar.hasClass('hidden')) {
            $sidebar.removeClass('hidden');
            if (!closeModal.hasClass('hidden')) closeModal.addClass('hidden');
        }
        oldWidth = newWidth;
    }

    reduceSidebar();

    function toggleSidebar() {
        $('.sidebar').toggleClass('hidden');
        $('.sidebar .collapse').collapse('hide');

        var closeModal = $('.sidebar-close-modal');
        if ($(window).width() < 900) {
            closeModal.toggleClass('hidden');
        } else {
            if (!closeModal.hasClass('hidden')) closeModal.addClass('hidden');
        }
    }

    $('.sidebar-toggler,.sidebar-close-modal').on('click', toggleSidebar);

    // Close any open menu accordions when window is resized below 924px
    $(window).resize(reduceSidebar);

    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function (e) {
        if ($(window).width() > 924) {
            var e0 = e.originalEvent,
                delta = e0.wheelDelta || -e0.detail;
            this.scrollTop += (delta < 0 ? 1 : -1) * 30;
            e.preventDefault();
        }
    });

    // Scroll to top button appear
    $(document).on('scroll', function () {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

    // Smooth scrolling using jQuery easing
    $(document).on('click', 'a.scroll-to-top', function (e) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top)
        }, 1000, 'easeInOutExpo');
        e.preventDefault();
    });

})(jQuery); // End of use strict
